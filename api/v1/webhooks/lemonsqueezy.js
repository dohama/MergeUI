const crypto = require('crypto');
const { supabaseAdmin } = require('../_lib/supabase.js');
const loops = require('../_lib/loops.js');
const sentry = require('../_lib/sentry.js');

function verifySignature(rawBody, signature) {
  var secret = process.env.LEMON_WEBHOOK_SECRET;
  if (!secret) return false;
  var hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature)); }
  catch(e) { return false; }
}

function readRawBody(req) {
  return new Promise(function(resolve, reject) {
    if (typeof req.body === 'string') return resolve(req.body);
    if (Buffer.isBuffer(req.body)) return resolve(req.body.toString('utf8'));
    var chunks = [];
    req.on('data', function(chunk) { chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)); });
    req.on('end', function() { resolve(Buffer.concat(chunks).toString('utf8')); });
    req.on('error', reject);
  });
}

// D-14: 결제 금액 안전 파싱 — Lemonsqueezy total은 cents 정수 문자열, NaN/음수/비정상값 차단
function safeParseAmount(raw) {
  if (raw === null || raw === undefined || raw === '') return null;
  var n = parseFloat(raw);
  if (!Number.isFinite(n) || n < 0) return null;
  return n / 100;
}

function reportSupabaseError(opName, result, ctx) {
  if (result && result.error) {
    console.error('[webhook][' + opName + '] supabase error:', result.error.message);
    sentry.captureMessage('Webhook supabase op failed: ' + opName, 'error', {
      tags: { route: 'webhook_lemonsqueezy', op: opName, severity: 'payment' },
      extra: Object.assign({ supabase_error: result.error.message }, ctx || {})
    });
  }
}

// Lemonsqueezy event_id 추출 — meta.webhook_id 우선, 없으면 X-Event-Id 헤더, 최종 fallback은 payload digest
function extractEventId(req, event, rawBody) {
  var metaId = event && event.meta && (event.meta.webhook_id || event.meta.event_id);
  if (metaId) return String(metaId);
  var headerId = req.headers && (req.headers['x-event-id'] || req.headers['x-lemon-event-id']);
  if (headerId) return String(headerId);
  // 최종 fallback: 요청 본문 SHA-256 — 동일 페이로드 재전송 차단
  return 'digest:' + crypto.createHash('sha256').update(rawBody).digest('hex');
}

module.exports = async function(req, res) {
  sentry.init();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  var rawBody;
  try { rawBody = await readRawBody(req); }
  catch (e) {
    sentry.captureException(e, { tags: { route: 'webhook_lemonsqueezy', op: 'read_body' } });
    return res.status(400).json({ error: 'Unable to read body' });
  }

  var signature = req.headers['x-signature'];

  if (!signature || !verifySignature(rawBody, signature)) {
    sentry.captureMessage('Webhook signature invalid', 'warning', {
      tags: { route: 'webhook_lemonsqueezy', op: 'verify_signature' }
    });
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  var event;
  try { event = JSON.parse(rawBody); }
  catch (e) {
    sentry.captureException(e, { tags: { route: 'webhook_lemonsqueezy', op: 'parse_json' } });
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  var eventName = event.meta && event.meta.event_name;
  var data = event.data && event.data.attributes;
  var userEmail = data && data.user_email;

  var maskedEmail = userEmail ? userEmail.replace(/^(.)(.*)(@.*)$/, '$1***$3') : 'unknown';
  console.log('Webhook:', eventName, maskedEmail);

  // ─────────────────────────────────────────────
  // D-3: 멱등성 가드 — webhook_events 에 event_id INSERT (ON CONFLICT DO NOTHING)
  // 0 rows 반환 = 이미 처리된 이벤트 → 즉시 200 OK
  // ─────────────────────────────────────────────
  var eventId = extractEventId(req, event, rawBody);
  var idemIns = await supabaseAdmin
    .from('webhook_events')
    .insert({
      event_id: eventId,
      event_name: eventName || 'unknown',
      source: 'lemonsqueezy',
      payload_digest: crypto.createHash('sha256').update(rawBody).digest('hex')
    }, { count: 'exact' })
    .select('event_id');

  if (idemIns && idemIns.error) {
    // unique_violation(23505) = 중복 → 이미 처리됨, 200 반환
    if (idemIns.error.code === '23505' || /duplicate key/i.test(idemIns.error.message || '')) {
      console.log('[webhook] duplicate event skipped:', eventId);
      return res.json({ received: true, duplicate: true });
    }
    // 그 외 DB 오류는 보고 후 진행 (멱등성 실패가 결제 처리를 막지 않도록)
    reportSupabaseError('idempotency.insert', idemIns, { event_id: eventId, event_name: eventName });
  } else if (idemIns && Array.isArray(idemIns.data) && idemIns.data.length === 0) {
    // ON CONFLICT DO NOTHING 으로 0 rows — 중복
    console.log('[webhook] duplicate event (0 rows):', eventId);
    return res.json({ received: true, duplicate: true });
  }

  var profileQuery = await supabaseAdmin.from('profiles').select('id, name, marketing_consent').eq('email', userEmail).single();
  var profile = profileQuery.data;
  if (!profile) {
    console.warn('User not found:', maskedEmail);
    sentry.captureMessage('Webhook received for unknown user', 'warning', {
      tags: { route: 'webhook_lemonsqueezy', op: 'user_lookup', severity: 'payment' },
      extra: { event_name: eventName, masked_email: maskedEmail }
    });
    return res.json({ received: true });
  }

  async function syncLoopsAndEvent(newPlan, eventNameInner) {
    if (!profile.marketing_consent) return;
    try {
      await loops.upsertContact({
        email: userEmail,
        firstName: (profile.name || '').split(' ')[0] || '',
        userGroup: newPlan,
        userId: profile.id
      });
      if (eventNameInner) {
        await loops.sendEvent(userEmail, eventNameInner, {
          plan: newPlan,
          firstName: (profile.name || '').split(' ')[0] || ''
        });
      }
    } catch (e) {
      console.error('[Loops sync]', e.message);
      sentry.captureException(e, {
        tags: { route: 'webhook_lemonsqueezy', op: 'loops_sync', severity: 'marketing' },
        extra: { event_name: eventNameInner, plan: newPlan, user_id: profile.id },
        level: 'warning'
      });
    }
  }

  try {
    switch (eventName) {
      case 'subscription_created': {
        var plan = data.variant_name && data.variant_name.toLowerCase().includes('team') ? 'team' : 'pro';
        // D-4: INSERT → upsert(onConflict: lemon_subscription_id)
        // 동일 구독 ID 재수신/재전송 시 중복 row 방지
        var subIns = await supabaseAdmin.from('subscriptions').upsert({
          user_id: profile.id, plan: plan, status: 'active',
          lemon_subscription_id: String(event.data.id),
          lemon_customer_id: String(data.customer_id),
          current_period_start: data.created_at, current_period_end: data.renews_at
        }, { onConflict: 'lemon_subscription_id' });
        reportSupabaseError('subscription_created.upsert', subIns, { user_id: profile.id, lemon_id: String(event.data.id) });
        var profUpd = await supabaseAdmin.from('profiles').update({ plan: plan }).eq('id', profile.id);
        reportSupabaseError('subscription_created.profile_update', profUpd, { user_id: profile.id });
        var key = 'MERGE-' + plan.toUpperCase() + '-' + crypto.randomBytes(4).toString('hex').toUpperCase();
        var licIns = await supabaseAdmin.from('license_keys').insert({ user_id: profile.id, key: key });
        reportSupabaseError('subscription_created.license_insert', licIns, { user_id: profile.id });
        await syncLoopsAndEvent(plan, 'subscription_started');
        break;
      }
      case 'subscription_updated': {
        var plan2 = data.variant_name && data.variant_name.toLowerCase().includes('team') ? 'team' : 'pro';
        var subUpd = await supabaseAdmin.from('subscriptions').update({ plan: plan2, status: data.status, current_period_end: data.renews_at }).eq('lemon_subscription_id', String(event.data.id));
        reportSupabaseError('subscription_updated.update', subUpd, { user_id: profile.id, lemon_id: String(event.data.id) });
        var profUpd2 = await supabaseAdmin.from('profiles').update({ plan: plan2 }).eq('id', profile.id);
        reportSupabaseError('subscription_updated.profile_update', profUpd2, { user_id: profile.id });
        await syncLoopsAndEvent(plan2, 'subscription_updated');
        break;
      }
      // ─────────────────────────────────────────────
      // D-5: resumed / paused / unpaused 이벤트 핸들러 추가
      // resumed → active, paused → paused, unpaused → active
      // ─────────────────────────────────────────────
      case 'subscription_resumed': {
        var subRes = await supabaseAdmin.from('subscriptions').update({
          status: 'active',
          current_period_end: data.renews_at || null
        }).eq('lemon_subscription_id', String(event.data.id));
        reportSupabaseError('subscription_resumed.update', subRes, { user_id: profile.id, lemon_id: String(event.data.id) });
        var planResumed = data.variant_name && data.variant_name.toLowerCase().includes('team') ? 'team' : 'pro';
        var profRes = await supabaseAdmin.from('profiles').update({ plan: planResumed }).eq('id', profile.id);
        reportSupabaseError('subscription_resumed.profile_update', profRes, { user_id: profile.id });
        await syncLoopsAndEvent(planResumed, 'subscription_resumed');
        break;
      }
      case 'subscription_paused': {
        var subPaused = await supabaseAdmin.from('subscriptions').update({
          status: 'paused'
        }).eq('lemon_subscription_id', String(event.data.id));
        reportSupabaseError('subscription_paused.update', subPaused, { user_id: profile.id, lemon_id: String(event.data.id) });
        await syncLoopsAndEvent('free', 'subscription_paused');
        break;
      }
      case 'subscription_unpaused': {
        var subUnp = await supabaseAdmin.from('subscriptions').update({
          status: 'active'
        }).eq('lemon_subscription_id', String(event.data.id));
        reportSupabaseError('subscription_unpaused.update', subUnp, { user_id: profile.id, lemon_id: String(event.data.id) });
        var planUnp = data.variant_name && data.variant_name.toLowerCase().includes('team') ? 'team' : 'pro';
        var profUnp = await supabaseAdmin.from('profiles').update({ plan: planUnp }).eq('id', profile.id);
        reportSupabaseError('subscription_unpaused.profile_update', profUnp, { user_id: profile.id });
        await syncLoopsAndEvent(planUnp, 'subscription_unpaused');
        break;
      }
      case 'subscription_cancelled': {
        var subCanc = await supabaseAdmin.from('subscriptions').update({ status: 'cancelled' }).eq('lemon_subscription_id', String(event.data.id));
        reportSupabaseError('subscription_cancelled.update', subCanc, { user_id: profile.id, lemon_id: String(event.data.id) });
        await syncLoopsAndEvent('pro', 'subscription_cancelled');
        break;
      }
      case 'subscription_expired': {
        var subExp = await supabaseAdmin.from('subscriptions').update({ status: 'expired' }).eq('lemon_subscription_id', String(event.data.id));
        reportSupabaseError('subscription_expired.update', subExp, { user_id: profile.id, lemon_id: String(event.data.id) });
        var profExp = await supabaseAdmin.from('profiles').update({ plan: 'free' }).eq('id', profile.id);
        reportSupabaseError('subscription_expired.profile_update', profExp, { user_id: profile.id });
        await syncLoopsAndEvent('free', 'subscription_expired');
        break;
      }
      case 'subscription_payment_success': {
        // D-14: parseFloat NaN 가드 — 비정상 total 수신 시 0으로 기록 + 경고 보고
        var amountSafe = safeParseAmount(data.total);
        if (amountSafe === null) {
          sentry.captureMessage('Webhook payment_success: invalid total value', 'warning', {
            tags: { route: 'webhook_lemonsqueezy', op: 'parse_amount', severity: 'payment' },
            extra: { raw_total: String(data.total), event_name: eventName, user_id: profile.id }
          });
          amountSafe = 0;
        }
        var ordIns = await supabaseAdmin.from('orders').insert({
          user_id: profile.id, lemon_order_id: String(data.order_id || event.data.id),
          plan: data.variant_name && data.variant_name.toLowerCase().includes('team') ? 'team' : 'pro',
          amount: amountSafe, currency: data.currency || 'USD', status: 'paid'
        });
        reportSupabaseError('subscription_payment_success.insert', ordIns, { user_id: profile.id, lemon_order_id: String(data.order_id || event.data.id) });
        break;
      }
      case 'subscription_payment_failed': {
        var subFail = await supabaseAdmin.from('subscriptions').update({ status: 'past_due' }).eq('lemon_subscription_id', String(event.data.id));
        reportSupabaseError('subscription_payment_failed.update', subFail, { user_id: profile.id, lemon_id: String(event.data.id) });
        break;
      }
      case 'order_refunded': {
        var ordRef = await supabaseAdmin.from('orders').update({ status: 'refunded' }).eq('lemon_order_id', String(event.data.id));
        reportSupabaseError('order_refunded.orders', ordRef, { user_id: profile.id, lemon_order_id: String(event.data.id) });
        var licRev = await supabaseAdmin.from('license_keys').update({ status: 'revoked' }).eq('user_id', profile.id).eq('status', 'active');
        reportSupabaseError('order_refunded.license_revoke', licRev, { user_id: profile.id });
        var subRef = await supabaseAdmin.from('subscriptions').update({ status: 'cancelled' }).eq('user_id', profile.id).in('status', ['active', 'past_due']);
        reportSupabaseError('order_refunded.sub_cancel', subRef, { user_id: profile.id });
        var profRef = await supabaseAdmin.from('profiles').update({ plan: 'free' }).eq('id', profile.id);
        reportSupabaseError('order_refunded.profile_demote', profRef, { user_id: profile.id });
        await syncLoopsAndEvent('free', 'subscription_refunded');
        break;
      }
      case 'subscription_payment_refunded': {
        var payRef = await supabaseAdmin.from('orders').update({ status: 'refunded' }).eq('lemon_order_id', String(data.order_id || event.data.id));
        reportSupabaseError('subscription_payment_refunded.update', payRef, { user_id: profile.id, lemon_order_id: String(data.order_id || event.data.id) });
        break;
      }
    }
  } catch (e) {
    console.error('[webhook] case handler exception:', e && e.message);
    sentry.captureException(e, {
      tags: { route: 'webhook_lemonsqueezy', op: 'case_handler', severity: 'payment' },
      extra: { event_name: eventName, user_id: profile && profile.id }
    });
  }

  res.json({ received: true });
};

module.exports.config = { api: { bodyParser: false } };
