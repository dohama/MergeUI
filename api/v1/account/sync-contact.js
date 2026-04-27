// POST /api/v1/account/sync-contact
// Upsert contact in Loops on signup or profile change.
const cors = require('../_lib/cors');
const { supabaseAdmin, getUser } = require('../_lib/supabase');
const loops = require('../_lib/loops');
const sentry = require('../_lib/sentry');

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  var { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('email, name, plan, role, marketing_consent, created_at')
    .eq('id', user.id)
    .single();

  if (!profile) return res.status(404).json({ error: 'Profile not found' });

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
