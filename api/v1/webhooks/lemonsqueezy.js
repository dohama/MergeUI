const crypto = require('crypto');
const { supabaseAdmin } = require('../_lib/supabase.js');
const loops = require('../_lib/loops.js');

function verifySignature(rawBody, signature) {
  var secret = process.env.LEMON_WEBHOOK_SECRET;
  if (!secret) return false;
  var hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature)); }
  catch(e) { return false; }
}

// Vercel Node 함수: bodyParser:false 설정 상태에서 원본 바이트 스트림을 직접 읽어와야
// Lemonsqueezy가 서명한 그대로의 바이트열로 HMAC 검증이 가능하다. (JSON.stringify 재구성은 공백/정렬 차이로 401을 유발)
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

module.exports = async function(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  var rawBody;
  try { rawBody = await readRawBody(req); }
  catch (e) { return res.status(400).json({ error: 'Unable to read body' }); }

  var signature = req.headers['x-signature'];

  // 서명 검증 — 실패 시 거부
  if (!signature || !verifySignature(rawBody, signature)) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  var event;
  try { event = JSON.parse(rawBody); }
  catch (e) { return res.status(400).json({ error: 'Invalid JSON' }); }
  var eventName = event.meta?.event_name;
  var data = event.data?.attributes;
  var userEmail = data?.user_email;

  var maskedEmail = userEmail ? userEmail.replace(/^(.)(.*)(@.*)$/, '$1***$3') : 'unknown';
  console.log('Webhook:', eventName, maskedEmail);

  var { data: profile } = await supabaseAdmin.from('profiles').select('id, name, marketing_consent').eq('email', userEmail).single();
  if (!profile) { console.warn('User not found:', maskedEmail); return res.json({ received: true }); }

  // Loops 동기화 유틸 (plan 변경 시 userGroup 업데이트 + 이벤트 트리거)
  async function syncLoopsAndEvent(newPlan, eventName) {
    if (!profile.marketing_consent) return; // GDPR
    try {
      await loops.upsertContact({
        email: userEmail,
        firstName: (profile.name || '').split(' ')[0] || '',
        userGroup: newPlan,
        userId: profile.id
      });
      if (eventName) {
        await loops.sendEvent(userEmail, eventName, {
          plan: newPlan,
          firstName: (profile.name || '').split(' ')[0] || ''
        });
      }
    } catch (e) { console.error('[Loops sync]', e.message); }
  }

  switch (eventName) {
    case 'subscription_created': {
      var plan = data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro';
      await supabaseAdmin.from('subscriptions').insert({
        user_id: profile.id, plan: plan, status: 'active',
        lemon_subscription_id: String(event.data.id),
        lemon_customer_id: String(data.customer_id),
        current_period_start: data.created_at, current_period_end: data.renews_at
      });
      await supabaseAdmin.from('profiles').update({ plan: plan }).eq('id', profile.id);
      var key = 'MERGE-' + plan.toUpperCase() + '-' + crypto.randomBytes(4).toString('hex').toUpperCase();
      await supabaseAdmin.from('license_keys').insert({ user_id: profile.id, key: key });
      await syncLoopsAndEvent(plan, 'subscription_started');
      break;
    }
    case 'subscription_updated': {
      var plan = data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro';
      await supabaseAdmin.from('subscriptions').update({ plan: plan, status: data.status, current_period_end: data.renews_at }).eq('lemon_subscription_id', String(event.data.id));
      await supabaseAdmin.from('profiles').update({ plan: plan }).eq('id', profile.id);
      await syncLoopsAndEvent(plan, 'subscription_updated');
      break;
    }
    case 'subscription_cancelled': {
      await supabaseAdmin.from('subscriptions').update({ status: 'cancelled' }).eq('lemon_subscription_id', String(event.data.id));
      // plan은 아직 변경하지 않음 — 기간 끝까지는 Pro 유지. 이탈 방지 캠페인 트리거
      await syncLoopsAndEvent('pro', 'subscription_cancelled');
      break;
    }
    case 'subscription_expired': {
      await supabaseAdmin.from('subscriptions').update({ status: 'expired' }).eq('lemon_subscription_id', String(event.data.id));
      await supabaseAdmin.from('profiles').update({ plan: 'free' }).eq('id', profile.id);
      await syncLoopsAndEvent('free', 'subscription_expired');
      break;
    }
    case 'subscription_payment_success': {
      await supabaseAdmin.from('orders').insert({
        user_id: profile.id, lemon_order_id: String(data.order_id || event.data.id),
        plan: data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro',
        amount: parseFloat(data.total) / 100, currency: data.currency || 'USD', status: 'paid'
      });
      break;
    }
    case 'subscription_payment_failed': {
      await supabaseAdmin.from('subscriptions').update({ status: 'past_due' }).eq('lemon_subscription_id', String(event.data.id));
      break;
    }
    case 'order_refunded': {
      // 주문 전액 환불 — 라이선스 해제 + 구독 취소 + 프로필 Free 강등
      await supabaseAdmin.from('orders').update({ status: 'refunded' }).eq('lemon_order_id', String(event.data.id));
      await supabaseAdmin.from('license_keys').update({ status: 'revoked' }).eq('user_id', profile.id).eq('status', 'active');
      await supabaseAdmin.from('subscriptions').update({ status: 'cancelled' }).eq('user_id', profile.id).in('status', ['active', 'past_due']);
      await supabaseAdmin.from('profiles').update({ plan: 'free' }).eq('id', profile.id);
      await syncLoopsAndEvent('free', 'subscription_refunded');
      break;
    }
    case 'subscription_payment_refunded': {
      // 특정 결제 환불 — 해당 주문만 refunded 처리, 라이선스는 order_refunded 이벤트에서 일괄 해제됨
      await supabaseAdmin.from('orders').update({ status: 'refunded' }).eq('lemon_order_id', String(data.order_id || event.data.id));
      break;
    }
  }

  res.json({ received: true });
};

module.exports.config = { api: { bodyParser: false } };
