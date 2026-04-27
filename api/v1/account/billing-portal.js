// GET /api/v1/account/billing-portal
// Returns Lemonsqueezy Customer Portal URL for the active subscription.
const cors = require('../_lib/cors');
const { supabaseAdmin, getUser } = require('../_lib/supabase');
const sentry = require('../_lib/sentry');

const LEMON_API_URL = 'https://api.lemonsqueezy.com/v1';

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  var { data: sub, error: subErr } = await supabaseAdmin
    .from('subscriptions')
    .select('lemon_subscription_id, status')
    .eq('user_id', user.id)
    .in('status', ['active', 'past_due', 'cancelled'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

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
