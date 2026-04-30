// POST /api/v1/inquiry/sync-loops
// 새 문의가 도착하면 ADMIN_EMAIL 수신자에게 Loops 트랜잭셔널 알림 발송.
// contact.html submitInquiry 직후 best-effort fetch로 호출.
const cors = require('../_lib/cors');
const csrf = require('../_lib/csrf');
const rateLimit = require('../_lib/rate-limit');
const loops = require('../_lib/loops');
const sentry = require('../_lib/sentry');

// D-8: 문의 알림 발송 — 5 req/min/IP (스팸/남용 방지)
var limiter = rateLimit({ windowMs: 60_000, max: 5, keyPrefix: 'inq_sync' });

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  // E-6: CSRF — Origin/Referer 화이트리스트 검증
  if (csrf.reject(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  // D-8: Rate Limit
  if (await limiter.reject(req, res)) return;

  var body = req.body || {};
  var name = (body.name || '').toString().slice(0, 100);
  var email = (body.email || '').toString().slice(0, 200);
  var category = (body.category || 'general').toString().slice(0, 50);
  var subject = (body.subject || '').toString().slice(0, 200);
  var message = (body.message || '').toString().slice(0, 4000);

  if (!email || !message) {
    return res.status(400).json({ error: 'email and message are required' });
  }

  var tid = process.env.LOOPS_TID_INQUIRY;
  var adminEmail = process.env.ADMIN_EMAIL;
  if (!tid || !adminEmail) {
    // 환경변수 미설정 시 graceful fail — 문의 자체는 이미 저장됨
    return res.json({ sent: false, reason: 'LOOPS_TID_INQUIRY or ADMIN_EMAIL not configured' });
  }

  try {
    var result = await loops.sendTransactional(tid, adminEmail, {
      name: name || '(unknown)',
      email: email,
      category: category,
      subject: subject || category,
      message: message,
      submittedAt: new Date().toISOString()
    });
    if (result.skipped) {
      return res.json({ sent: false, reason: 'LOOPS_API_KEY not configured' });
    }
    if (!result.ok) {
      sentry.captureMessage('inquiry/sync-loops: send failed', 'warning', {
        tags: { route: 'inquiry_sync_loops' },
        extra: { loops_error: result.error, status: result.status }
      });
      return res.status(502).json({ sent: false, error: result.error });
    }
    return res.json({ sent: true });
  } catch (e) {
    console.error('inquiry/sync-loops error:', e);
    sentry.captureException(e, { tags: { route: 'inquiry_sync_loops' } });
    return res.status(500).json({ error: 'Internal server error' });
  }
};
