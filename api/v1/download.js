const cors = require('./_lib/cors');
const { supabaseAdmin, getUser, hasActiveSubscription } = require('./_lib/supabase');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  if (user.plan === 'free') return res.status(403).json({ error: 'Pro or Team plan required to download themes' });

  var active = await hasActiveSubscription(user.id);
  if (!active) return res.status(403).json({ error: 'Subscription expired or inactive. Please renew to continue downloading.', code: 'SUBSCRIPTION_EXPIRED' });

  var theme_slug = (req.body && req.body.theme_slug) || '';
  var slug = theme_slug.replace(/[^a-z0-9-]/gi, '');
  if (!slug) return res.status(400).json({ error: 'theme_slug is required' });

  try {
    await supabaseAdmin.from('downloads').insert({
      user_id: user.id, theme_id: slug, version: 'v1', downloaded_at: new Date().toISOString()
    });
  } catch (_) {}

  res.json({ download_url: '/templates/' + slug + '-v1/' + slug + '-v1.zip' });
};
