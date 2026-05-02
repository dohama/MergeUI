// CSRF 방어 — Origin/Referer 헤더 화이트리스트 검증
// 상태 변경 API(POST/PUT/DELETE/PATCH)에 적용. GET/OPTIONS는 통과.
// 웹훅 라우트는 HMAC 서명으로 별도 검증하므로 적용 제외.
//
// 사용법:
//   const csrf = require('./_lib/csrf');
//   if (csrf.reject(req, res)) return;   // 위반 시 403 응답 후 true 반환
//
// 화이트리스트:
//   - https://mergeui.com  (프로덕션 정식 도메인)
//   - https://www.mergeui.com
//   - *.vercel.app         (프리뷰/스테이징)
//   - CSRF_ALLOWED_ORIGINS (콤마 구분, 추가 도메인)
//   - 로컬 개발: http://localhost:3000, http://127.0.0.1:3000 (NODE_ENV !== 'production' 일 때만)

var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true };

function buildAllowList() {
  var list = [
    'https://mergeui.com',
    'https://www.mergeui.com'
  ];
  var extra = process.env.CSRF_ALLOWED_ORIGINS || '';
  extra.split(',').map(function(s) { return s.trim(); }).filter(Boolean).forEach(function(o) {
    if (list.indexOf(o) === -1) list.push(o);
  });
  if ((process.env.NODE_ENV || '') !== 'production') {
    list.push('http://localhost:3000');
    list.push('http://127.0.0.1:3000');
    list.push('http://localhost:4000');
  }
  return list;
}

function originHostMatches(originUrl) {
  if (!originUrl) return false;
  var parsed;
  try { parsed = new URL(originUrl); } catch (e) { return false; }
  var origin = parsed.protocol + '//' + parsed.host;
  var hostname = parsed.hostname;

  var allow = buildAllowList();
  if (allow.indexOf(origin) !== -1) return true;

  // *.vercel.app 와일드카드
  if (parsed.protocol === 'https:' && /\.vercel\.app$/i.test(hostname)) return true;

  return false;
}

function isAllowed(req) {
  var method = (req.method || 'GET').toUpperCase();
  if (SAFE_METHODS[method]) return true;

  var origin = req.headers && req.headers.origin;
  var referer = req.headers && req.headers.referer;

  // Origin 우선, 없으면 Referer로 fallback
  if (origin) return originHostMatches(origin);
  if (referer) return originHostMatches(referer);

  // 둘 다 없으면 거부 (브라우저 fetch 는 대부분 origin 자동 포함)
  return false;
}

// reject(req, res) — 위반 시 403 응답 후 true 반환 (호출 측 early return 패턴)
function reject(req, res) {
  if (isAllowed(req)) return false;
  try {
    res.status(403).json({ error: 'Forbidden — invalid origin' });
  } catch (_) {}
  return true;
}

module.exports = {
  isAllowed: isAllowed,
  reject: reject
};
