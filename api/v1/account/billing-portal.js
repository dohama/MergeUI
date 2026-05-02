// GET /api/v1/account/billing-portal
// Returns Lemonsqueezy Customer Portal URL for the active subscription.
const cors = require('../_lib/cors');
const csrf = require('../_lib/csrf');
const rateLimit = require('../_lib/rate-limit');
const { supabaseAdmin, getUser } = require('../_lib/supabase');
const sentry = require('../_lib/sentry');

const LEMON_API_URL = 'https://api.lemonsqueezy.com/v1';

// D-8: Billing portal — 10 req/min/IP (Lemonsqueezy API 비용/쿼터 보호)
var limiter = rateLimit({ windowMs: 60_000, max: 10, keyPrefix: 'billing_portal' });

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  // E-6: CSRF — 안전 메서드(GET) 는 자동 통과, 향후 메서드 확장 대비
  if (csrf.reject(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  // D-8: Rate Limit
  if (await limiter.reject(req, res)) return;

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  // D-10 + D-04 BD-8: cancelled 구독은 결제 포털 접근 불가 — active/past_due/paused 만 허용
  // 'paused' = Lemonsqueezy 일시정지 상태 (결제 일시 중단, 추후 재개 가능). 사용자가 포털에서 재개해야 하므로 접근 허용 필수.
  var { data: sub, error: subErr } = await supabaseAdmin
    .from('subscriptions')
    .select('lemon_subscription_id, status')
    .eq('user_id', user.id)
    .in('status', ['active', 'past_due', 'paused'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subErr || !sub || !sub.lemon_subscription_id) {
    return res.status(404).json({ error: 'No active subscription. Please subscribe first.' });
  }

  try {
    var lemonRes = await fetch(LEMON_API_URL + '/subscriptions/' + sub.lemon_subscription_id, {
      headers: {
        'Authorization': 'Bearer ' + process.env.LEMON_API_KEY,
        'Accept': 'application/vnd.api+json'
      }
    });
    if (!lemonRes.ok) {
      var errBody = await lemonRes.text().catch(function() { return ''; });
      console.error('Lemonsqueezy API error:', lemonRes.status, errBody);
      sentry.captureMessage('billing-portal: Lemonsqueezy API non-ok', 'error', {
        tags: { route: 'billing_portal', op: 'fetch_subscription' },
        extra: { status: lemonRes.status, lemon_subscription_id: sub.lemon_subscription_id, body: errBody.slice(0, 500) },
        user: { id: user.id, email: user.email }
      });
      return res.status(502).json({ error: 'Payment provider lookup failed. Please try again later.' });
    }
    var payload = await lemonRes.json();
    var portalUrl = payload && payload.data && payload.data.attributes && payload.data.attributes.urls && payload.data.attributes.urls.customer_portal;
    if (!portalUrl) {
      sentry.captureMessage('billing-portal: customer_portal URL missing', 'error', {
        tags: { route: 'billing_portal', op: 'extract_portal_url' },
        extra: { lemon_subscription_id: sub.lemon_subscription_id },
        user: { id: user.id, email: user.email }
      });
      return res.status(502).json({ error: 'Unable to retrieve billing portal URL. Please contact support@mergeui.com.' });
    }
    return res.json({ portal_url: portalUrl });
  } catch (e) {
    console.error('billing-portal error:', e);
    sentry.captureException(e, {
      tags: { route: 'billing_portal', op: 'fetch_subscription' },
      extra: { lemon_subscription_id: sub && sub.lemon_subscription_id },
      user: { id: user.id, email: user.email }
    });
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
