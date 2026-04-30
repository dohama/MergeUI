// POST /api/v1/account/sync-contact
//   Upsert contact in Loops on signup or profile change.
// PATCH /api/v1/account/sync-contact
//   E-9: marketing_consent 토글 시 profiles.marketing_consent UPDATE + Loops subscribed 재동기화
//   body: { marketing_consent: boolean }
//   response: { success: true, marketing_consent: boolean }
const cors = require('../_lib/cors');
const csrf = require('../_lib/csrf');
const rateLimit = require('../_lib/rate-limit');
const { supabaseAdmin, getUser } = require('../_lib/supabase');
const loops = require('../_lib/loops');
const sentry = require('../_lib/sentry');

// D-8: 연락처 동기화 — 10 req/min/IP
var limiter = rateLimit({ windowMs: 60_000, max: 10, keyPrefix: 'sync_contact' });

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  // E-6: CSRF — Origin/Referer 화이트리스트 검증
  if (csrf.reject(req, res)) return;
  if (req.method !== 'POST' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // D-8: Rate Limit
  if (await limiter.reject(req, res)) return;

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  var { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('email, name, plan, role, marketing_consent, created_at')
    .eq('id', user.id)
    .single();

  if (!profile) return res.status(404).json({ error: 'Profile not found' });

  // ─────────────────────────────────────────────
  // PATCH — marketing_consent 변경 시 Loops 재동기화 (E-9)
  // ─────────────────────────────────────────────
  if (req.method === 'PATCH') {
    var body = req.body || {};
    if (typeof body.marketing_consent !== 'boolean') {
      return res.status(400).json({ error: 'marketing_consent (boolean) is required' });
    }
    var nextConsent = body.marketing_consent;

    // 1) profiles.marketing_consent UPDATE
    var { error: updErr } = await supabaseAdmin
      .from('profiles')
      .update({ marketing_consent: nextConsent })
      .eq('id', user.id);
    if (updErr) {
      sentry.captureMessage('sync-contact PATCH: profile update failed', 'error', {
        tags: { route: 'sync_contact', op: 'profile_update', severity: 'gdpr' },
        extra: { supabase_error: updErr.message, marketing_consent: nextConsent },
        user: { id: user.id, email: profile.email }
      });
      return res.status(500).json({ error: 'Failed to update consent' });
    }

    // 2) Loops 재동기화 — true면 구독자로 갱신, false면 unsubscribe
    try {
      var loopsResult = await loops.upsertContact({
        email: profile.email,
        firstName: (profile.name || '').split(' ')[0] || '',
        lastName: (profile.name || '').split(' ').slice(1).join(' ') || '',
        userGroup: profile.plan || 'free',
        userId: user.id,
        subscribed: nextConsent
      });
      if (loopsResult && loopsResult.ok === false) {
        sentry.captureMessage('sync-contact PATCH: Loops resync failed', 'warning', {
          tags: { route: 'sync_contact', op: 'loops_resync' },
          extra: { loops_error: loopsResult.error, status: loopsResult.status, marketing_consent: nextConsent },
          user: { id: user.id, email: profile.email }
        });
        // Loops 실패해도 DB는 이미 UPDATE 완료 → 200 응답하되 동기화 실패 표시
      }
    } catch (e) {
      console.error('sync-contact PATCH loops error:', e && e.message);
      sentry.captureException(e, {
        tags: { route: 'sync_contact', op: 'loops_resync' },
        user: { id: user.id, email: profile.email }
      });
    }

    return res.json({ success: true, marketing_consent: nextConsent });
  }

  // GDPR: do not create contact unless user opted in to marketing.
  if (!profile.marketing_consent) {
    return res.json({ synced: false, reason: 'marketing_consent=false' });
  }

  try {
    var result = await loops.upsertContact({
      email: profile.email,
      firstName: (profile.name || '').split(' ')[0] || '',
      lastName: (profile.name || '').split(' ').slice(1).join(' ') || '',
      userGroup: profile.plan || 'free',
      userId: user.id,
      source: 'mergeui-signup',
      subscribed: true,
      signupDate: profile.created_at || new Date().toISOString()
    });
    if (result.skipped) {
      return res.json({ synced: false, reason: 'LOOPS_API_KEY not configured' });
    }
    if (!result.ok) {
      sentry.captureMessage('sync-contact: Loops upsert failed', 'warning', {
        tags: { route: 'sync_contact', op: 'loops_upsert' },
        extra: { loops_error: result.error, status: result.status },
        user: { id: user.id, email: profile.email }
      });
      return res.status(502).json({ synced: false, error: result.error });
    }

    // 가입 직후(5분 이내) 'signup' 이벤트 1회 트리거 — Loops welcome 메일
    // 멱등성은 Loops 대시보드 "사용자당 1회" 옵션으로 보장
    var createdAt = profile.created_at ? new Date(profile.created_at).getTime() : 0;
    var isFreshSignup = createdAt && (Date.now() - createdAt) < 5 * 60 * 1000;
    if (isFreshSignup) {
      var ev = await loops.sendEvent(profile.email, 'signup', {
        firstName: (profile.name || '').split(' ')[0] || '',
        plan: profile.plan || 'free'
      });
      if (ev && ev.ok === false) {
        sentry.captureMessage('sync-contact: Loops signup event failed', 'warning', {
          tags: { route: 'sync_contact', op: 'loops_event_signup' },
          extra: { loops_error: ev.error },
          user: { id: user.id, email: profile.email }
        });
      }
    }

    return res.json({ synced: true });
  } catch (e) {
    console.error('sync-contact error:', e);
    sentry.captureException(e, {
      tags: { route: 'sync_contact', op: 'loops_upsert' },
      user: { id: user.id, email: profile.email }
    });
    return res.status(500).json({ error: 'Internal server error' });
  }
};
