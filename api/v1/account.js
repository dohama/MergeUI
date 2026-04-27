const cors = require('./_lib/cors');
const { supabaseAdmin, getUser } = require('./_lib/supabase');
const sentry = require('./_lib/sentry');

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  // DELETE — account deletion (GDPR right to be forgotten)
  if (req.method === 'DELETE') {
    var tables = ['downloads', 'favorites', 'license_keys', 'subscriptions', 'orders', 'inquiries'];
    for (var i = 0; i < tables.length; i++) {
      var { error } = await supabaseAdmin.from(tables[i]).delete().eq('user_id', user.id);
      if (error) {
        sentry.captureMessage('account DELETE: table delete failed', 'error', {
          tags: { route: 'account', op: 'delete_table', severity: 'gdpr' },
          extra: { table: tables[i], supabase_error: error.message },
          user: { id: user.id, email: user.email }
        });
        return res.status(500).json({ error: 'Failed to delete data from ' + tables[i] });
      }
    }
    var { error: profileErr } = await supabaseAdmin.from('profiles').delete().eq('id', user.id);
    if (profileErr) {
      sentry.captureMessage('account DELETE: profile delete failed', 'error', {
        tags: { route: 'account', op: 'delete_profile', severity: 'gdpr' },
        extra: { supabase_error: profileErr.message },
        user: { id: user.id, email: user.email }
      });
      return res.status(500).json({ error: 'Failed to delete profile' });
    }
    var { error: authErr } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if (authErr) {
      sentry.captureMessage('account DELETE: auth delete failed', 'error', {
        tags: { route: 'account', op: 'delete_auth', severity: 'gdpr' },
        extra: { supabase_error: authErr.message },
        user: { id: user.id, email: user.email }
      });
      return res.status(500).json({ error: 'Failed to delete auth account' });
    }
    return res.json({ message: 'Account deleted successfully' });
  }

  // GET — data export (GDPR right to portability)
  if (req.method === 'GET') {
    var { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', user.id).single();
    var { data: subscriptions } = await supabaseAdmin.from('subscriptions').select('*').eq('user_id', user.id);
    var { data: downloads } = await supabaseAdmin.from('downloads').select('*').eq('user_id', user.id);
    var { data: license_keys } = await supabaseAdmin.from('license_keys').select('*').eq('user_id', user.id);
    var { data: orders } = await supabaseAdmin.from('orders').select('*').eq('user_id', user.id);
    return res.json({ profile: profile || null, subscriptions: subscriptions || [], downloads: downloads || [], license_keys: license_keys || [], orders: orders || [] });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
