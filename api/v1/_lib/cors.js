// CORS 헤더 설정 — Vercel preview(*.vercel.app) + 프로덕션 도메인 동시 허용
//
// 화이트리스트 동작:
//   1. CORS_ALLOWED_ORIGINS (콤마 구분)에 명시된 origin
//   2. https://mergeui.com / https://www.mergeui.com (기본)
//   3. https://*.vercel.app (preview/staging) — production env 에서도 허용 (preview 배포 테스트용)
//      차단하려면 CORS_DISABLE_VERCEL_PREVIEW=1 설정
//   4. NODE_ENV=development 일 때만 http://localhost:3000, http://127.0.0.1:3000, http://localhost:4000
//
// fallback: 단일 CORS_ORIGIN 만 설정된 레거시 환경은 그 값 그대로 사용 (브레이킹 체인지 방지)
//
// 요청 Origin 이 화이트리스트 매칭되면 그 값으로 echo, 아니면 첫 번째 기본값.
// Credentials 모드라 와일드카드(*) 사용 불가 — 반드시 단일 origin echo.

var DEFAULT_ALLOW = [
  'https://mergeui.com',
  'https://www.mergeui.com'
];

function buildAllowList() {
  // CORS_ORIGIN(legacy) 단일값이 설정되어 있고 ALLOWED 가 비어있으면 단독 사용
  var legacy = (process.env.CORS_ORIGIN || '').trim();
  var listEnv = (process.env.CORS_ALLOWED_ORIGINS || '').trim();

  var list = DEFAULT_ALLOW.slice();

  if (listEnv) {
    listEnv.split(',').map(function(s) { return s.trim(); }).filter(Boolean).forEach(function(o) {
      if (list.indexOf(o) === -1) list.push(o);
    });
  } else if (legacy && legacy !== 'https://mergeui.com') {
    // 레거시 단일값 (예: localhost) 보존
    if (list.indexOf(legacy) === -1) list.push(legacy);
  }

  if ((process.env.NODE_ENV || '') !== 'production') {
    ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:4000'].forEach(function(o) {
      if (list.indexOf(o) === -1) list.push(o);
    });
  }
  return list;
}

function originAllowed(originHeader) {
  if (!originHeader) return null;
  var parsed;
  try { parsed = new URL(originHeader); } catch (e) { return null; }
  var origin = parsed.protocol + '//' + parsed.host;

  var list = buildAllowList();
  if (list.indexOf(origin) !== -1) return origin;

  // *.vercel.app preview 와일드카드 (안전: hostname.endsWith 체크)
  var allowVercel = process.env.CORS_DISABLE_VERCEL_PREVIEW !== '1';
  if (allowVercel && parsed.protocol === 'https:' && /\.vercel\.app$/i.test(parsed.hostname)) {
    return origin;
  }

  return null;
}

function cors(req, res) {
  var requestOrigin = req.headers && req.headers.origin;
  var matched = originAllowed(requestOrigin);
  // 매칭 실패 시 첫 번째 기본 origin 으로 응답 (preflight 차단 효과 + 정상 도메인은 통과)
  var allowOrigin = matched || DEFAULT_ALLOW[0];

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') { res.status(200).end(); return true; }
  return false;
}

module.exports = cors;
module.exports.originAllowed = originAllowed;
