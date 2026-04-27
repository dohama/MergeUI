// POST /api/v1/admin/send-email
// Admin-only batch email trigger via Loops events.
// Body: { filter: { plan?, role? }, eventName, eventProperties, mode: 'dryRun'|'send' }
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
  if (user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

  var body = req.body || {};
  var filter = body.filter || {};
  var eventName = body.eventName;
  var eventProperties = body.eventProperties || {};
  var mode = body.mode || 'dryRun';

  if (!eventName) return res.status(400).json({ error: 'eventName is required' });

  var query = supabaseAdmin
    .from('profiles')
    .select('id, email, name, plan, role, marketing_consent')
    .eq('marketing_consent', true);

  if (filter.plan) query = query.eq('plan', filter.plan);
  if (filter.role) query = query.eq('role', filter.role);

  var { data: recipients, error } = await query;
  if (error) {
    sentry.captureMessage('admin/send-email: recipients query failed', 'error', {
      tags: { route: 'admin_send_email', op: 'query_recipients' },
      extra: { supabase_error: error.message, filter: filter },
      user: { id: user.id, email: user.email }
    });
    return res.status(500).json({ error: error.message });
  }
  if (!recipients || recipients.length === 0) {
    return res.json({ count: 0, mode: mode, sent: 0, failed: 0, targets: [] });
  }

  if (mode === 'dryRun') {
    return res.json({
      count: recipients.length,
      mode: 'dryRun',
      targets: recipients.map(function(r) {
        return { email: r.email, name: r.name, plan: r.plan };
      })
    });
  }

  var sent = 0;
  var failed = 0;
  var errors = [];

  for (var i = 0; i < recipients.length; i++) {
    var r = recipients[i];
    try {
      var result = await loops.sendEvent(r.email, eventName, Object.assign({}, eventProperties, {
        firstName: (r.name || '').split(' ')[0] || '',
        plan: r.plan || 'free'
      }));
      if (result.ok || result.skipped) sent++;
      else { failed++; errors.push({ email: r.email, error: result.error }); }
    } catch (e) {
      failed++;
      errors.push({ email: r.email, error: e.message });
      sentry.captureException(e, {
        tags: { route: 'admin_send_email', op: 'loops_send_event' },
        extra: { event_name: eventName, recipient_email: r.email },
        level: 'warning'
      });
    }
  }

  // Report systemic failure (e.g. >50% failed) so the operator sees it in Sentry too.
  if (failed > 0 && failed >= Math.ceil(recipients.length / 2)) {
    sentry.captureMessage('admin/send-email: high failure rate', 'error', {
      tags: { route: 'admin_send_email', op: 'batch_complete' },
      extra: { event_name: eventName, total: recipients.length, sent: sent, failed: failed, sample_errors: errors.slice(0, 5) },
      user: { id: user.id, email: user.email }
    });
  }

  return res.json({
    count: recipients.length,
    mode: 'send',
    sent: sent,
    failed: failed,
    errors: errors.slice(0, 10)
  });
};
