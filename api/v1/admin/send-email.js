// POST /api/v1/admin/send-email
// Admin-only batch email trigger via Loops events.
// Body: {
//   filter: { plan?, role? },
//   eventName,
//   eventProperties,
//   mode: 'dryRun'|'send',
//   idempotency_key?: string,    // D-11: 선택. 미제공 시 release_id+segment 로 자동 생성
//   release_id?: string          // D-11: idempotency 자동 생성용 보조 식별자
// }
//
// D-11: 멱등성 + Promise.allSettled + 5초 타임아웃 + 60초 cap
// D-8: Rate Limit — 5 req/min (관리자 토큰 기준)
const cors = require('../_lib/cors');
const csrf = require('../_lib/csrf');
const rateLimit = require('../_lib/rate-limit');
const { supabaseAdmin, getUser } = require('../_lib/supabase');
const loops = require('../_lib/loops');
const sentry = require('../_lib/sentry');

// D-8: 5 req/min — admin 토큰이 있으면 user_id 기준, 없으면 IP 기준
var limiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  keyPrefix: 'admin_send_email',
  // 인증 전 시점이라 fallback 은 IP — getUser 통과 후엔 user.id 가 자연스럽게 다름
  keyFn: function(req) {
    var auth = req.headers && (req.headers.authorization || req.headers.Authorization);
    if (auth) return 'tok:' + String(auth).slice(-24); // 토큰 끝 24자 (PII 최소화)
    return null; // null 반환 시 IP fallback
  }
});

// 멱등성 윈도우 — 동일 키+수신자 조합이 이 시간 내 sent 면 skip
var IDEMPOTENCY_WINDOW_MS = 5 * 60 * 1000; // 5분
var PER_SEND_TIMEOUT_MS = 5_000;            // 단건 5초
var TOTAL_BUDGET_MS = 60_000;               // 전체 60초

function buildIdempotencyKey(body, eventName) {
  if (body.idempotency_key) return String(body.idempotency_key).slice(0, 128);
  // 자동 생성: eventName + release_id + filter 직렬화 (segment 식별)
  var seg = JSON.stringify({
    e: eventName,
    r: body.release_id || null,
    f: body.filter || {}
  });
  // 단순 해시 (FNV-1a 32bit) — DB 인덱스 키로 충분
  var h = 2166136261;
  for (var i = 0; i < seg.length; i++) {
    h ^= seg.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return 'auto:' + (body.release_id || eventName) + ':' + h.toString(16);
}

function withTimeout(promise, ms, label) {
  var timer;
  var timeout = new Promise(function(_, reject) {
    timer = setTimeout(function() {
      reject(new Error('Timeout after ' + ms + 'ms (' + label + ')'));
    }, ms);
  });
  return Promise.race([promise, timeout]).finally(function() {
    clearTimeout(timer);
  });
}

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  // E-6: CSRF — Origin/Referer 화이트리스트 검증
  if (csrf.reject(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  // D-8: Rate Limit
  if (await limiter.reject(req, res)) return;

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
    return res.json({ count: 0, mode: mode, sent: 0, failed: 0, skipped_idempotent: 0, targets: [] });
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

  // ─────────────────────────────────────────────
  // D-11: 멱등성 — 동일 (key, email) 가 5분 내 sent 인 수신자는 제외
  // ─────────────────────────────────────────────
  var idemKey = buildIdempotencyKey(body, eventName);
  var sinceIso = new Date(Date.now() - IDEMPOTENCY_WINDOW_MS).toISOString();
  var emails = recipients.map(function(r) { return r.email; });

  var { data: existing, error: idemErr } = await supabaseAdmin
    .from('email_sends')
    .select('recipient_email')
    .eq('idempotency_key', idemKey)
    .eq('status', 'sent')
    .gte('sent_at', sinceIso)
    .in('recipient_email', emails);

  if (idemErr) {
    // 테이블 부재 등 — 멱등성 검사 실패해도 발송은 진행 (graceful)
    sentry.captureMessage('admin/send-email: idempotency check failed', 'warning', {
      tags: { route: 'admin_send_email', op: 'idempotency_check' },
      extra: { supabase_error: idemErr.message, idempotency_key: idemKey }
    });
    existing = [];
  }
  var alreadySent = new Set((existing || []).map(function(r) { return r.recipient_email; }));
  var skipped_idempotent = 0;
  var pending = [];
  recipients.forEach(function(r) {
    if (alreadySent.has(r.email)) {
      skipped_idempotent++;
    } else {
      pending.push(r);
    }
  });

  if (pending.length === 0) {
    return res.json({
      count: recipients.length,
      mode: 'send',
      sent: 0,
      failed: 0,
      skipped_idempotent: skipped_idempotent,
      idempotency_key: idemKey,
      errors: []
    });
  }

  // ─────────────────────────────────────────────
  // D-11: 병렬 발송 — Promise.allSettled + 단건 5초 타임아웃 + 전체 60초 cap
  // ─────────────────────────────────────────────
  var startedAt = Date.now();
  var globalDeadline = startedAt + TOTAL_BUDGET_MS;

  var sendOne = function(r) {
    // 전체 cap 초과 시 빠르게 실패 처리
    var remaining = globalDeadline - Date.now();
    if (remaining <= 0) {
      return Promise.resolve({ email: r.email, ok: false, error: 'Total budget exceeded' });
    }
    var timeoutMs = Math.min(PER_SEND_TIMEOUT_MS, remaining);
    return withTimeout(
      loops.sendEvent(r.email, eventName, Object.assign({}, eventProperties, {
        firstName: (r.name || '').split(' ')[0] || '',
        plan: r.plan || 'free'
      })),
      timeoutMs,
      'loops.sendEvent ' + r.email
    ).then(function(result) {
      var ok = !!(result && (result.ok || result.skipped));
      return { email: r.email, ok: ok, error: ok ? null : (result && result.error) || 'unknown' };
    }).catch(function(e) {
      return { email: r.email, ok: false, error: (e && e.message) || String(e) };
    });
  };

  var settled = await Promise.allSettled(pending.map(sendOne));

  var sent = 0;
  var failed = 0;
  var errors = [];
  var ledger = []; // email_sends INSERT 용

  settled.forEach(function(s) {
    var v = s.status === 'fulfilled' ? s.value : { email: 'unknown', ok: false, error: (s.reason && s.reason.message) || 'rejected' };
    if (v.ok) {
      sent++;
      ledger.push({ idempotency_key: idemKey, recipient_email: v.email, template_id: eventName, status: 'sent', sent_at: new Date().toISOString(), error: null });
    } else {
      failed++;
      errors.push({ email: v.email, error: v.error });
      ledger.push({ idempotency_key: idemKey, recipient_email: v.email, template_id: eventName, status: 'failed', sent_at: new Date().toISOString(), error: { message: String(v.error || '').slice(0, 1000) } });
      sentry.captureMessage('admin/send-email: single send failed', 'warning', {
        tags: { route: 'admin_send_email', op: 'loops_send_event' },
        extra: { event_name: eventName, recipient_email: v.email, error: v.error },
        level: 'warning'
      });
    }
  });

  // 발송 이력 기록 (실패해도 응답은 진행)
  if (ledger.length > 0) {
    try {
      var { error: insErr } = await supabaseAdmin.from('email_sends').insert(ledger);
      if (insErr) {
        sentry.captureMessage('admin/send-email: ledger insert failed', 'warning', {
          tags: { route: 'admin_send_email', op: 'ledger_insert' },
          extra: { supabase_error: insErr.message, count: ledger.length, idempotency_key: idemKey }
        });
      }
    } catch (e) {
      sentry.captureException(e, {
        tags: { route: 'admin_send_email', op: 'ledger_insert' },
        extra: { idempotency_key: idemKey }
      });
    }
  }

  // 시스템적 실패 감지 (>50%) 시 추가 보고
  if (failed > 0 && failed >= Math.ceil(pending.length / 2)) {
    sentry.captureMessage('admin/send-email: high failure rate', 'error', {
      tags: { route: 'admin_send_email', op: 'batch_complete' },
      extra: {
        event_name: eventName,
        total: pending.length,
        sent: sent,
        failed: failed,
        skipped_idempotent: skipped_idempotent,
        sample_errors: errors.slice(0, 5),
        elapsed_ms: Date.now() - startedAt
      },
      user: { id: user.id, email: user.email }
    });
  }

  return res.json({
    success: true,
    count: recipients.length,
    mode: 'send',
    sent: sent,
    failed: failed,
    skipped_idempotent: skipped_idempotent,
    idempotency_key: idemKey,
    errors: errors.slice(0, 10),
    elapsed_ms: Date.now() - startedAt
  });
};
