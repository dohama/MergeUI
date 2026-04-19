// POST /api/v1/admin/send-email
// 관리자 전용 — 필터된 회원에게 Loops 이벤트 트리거 (배치 발송)
// Body: { filter: { plan?, role? }, eventName, eventProperties, mode: 'dryRun'|'send' }
const cors = require('../_lib/cors');
const { supabaseAdmin, getUser } = require('../_lib/supabase');
const loops = require('../_lib/loops');

module.exports = async function handler(req, res) {
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

  // 대상 조회 — marketing_consent=true인 회원만
  var query = supabaseAdmin
    .from('profiles')
    .select('id, email, name, plan, role, marketing_consent')
    .eq('marketing_consent', true);

  if (filter.plan) query = query.eq('plan', filter.plan);
  if (filter.role) query = query.eq('role', filter.role);

  var { data: recipients, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  if (!recipients || recipients.length === 0) {
    return res.json({ count: 0, mode: mode, sent: 0, failed: 0, targets: [] });
  }

  // dryRun — 대상자 미리보기만
  if (mode === 'dryRun') {
    return res.json({
      count: recipients.length,
      mode: 'dryRun',
      targets: recipients.map(function(r) {
        return { email: r.email, name: r.name, plan: r.plan };
      })
    });
  }

  // 실제 발송 — Loops 이벤트 트리거 (Loops 쪽 루프가 이메일 발송)
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
    }
  }

  return res.json({
    count: recipients.length,
    mode: 'send',
    sent: sent,
    failed: failed,
    errors: errors.slice(0, 10) // 최대 10건만 반환
  });
};
