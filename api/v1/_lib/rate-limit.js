// D-8: Rate Limit — 메모리 LRU 기반 sliding window
//
// 외부 의존성 없는 1차 방어. Vercel serverless 멀티 인스턴스에서는
// 인스턴스별로 카운터가 분리되므로 정확도가 100%는 아니지만
// brute-force/스팸을 효과적으로 차단하기에는 충분.
//
// 트래픽이 50 req/min을 초과하기 시작하면 Upstash Redis
// (REDIS_URL 환경변수)로 업그레이드 권장. 동일 인터페이스 유지 가능.
//
// 사용법:
//   const rateLimit = require('./_lib/rate-limit');
//   const limiter = rateLimit({ windowMs: 60_000, max: 10, keyPrefix: 'checkout' });
//   if (await limiter.reject(req, res)) return;

var BUCKET_TTL_MS = 10 * 60 * 1000; // 10분 (메모리 누수 방지용 GC 기준)
var MAX_BUCKETS = 5000;             // LRU 상한 (인스턴스 RAM 보호)

// 모듈 단위 단일 저장소 — 모든 limiter 가 공유
// key = `${prefix}:${ip}` -> { hits: number[], expiresAt: number }
var store = new Map();

function gc() {
  if (store.size <= MAX_BUCKETS) return;
  var now = Date.now();
  var toDelete = [];
  // 1차: 만료된 키 제거
  store.forEach(function(v, k) {
    if (v.expiresAt < now) toDelete.push(k);
  });
  toDelete.forEach(function(k) { store.delete(k); });
  // 2차: 여전히 초과면 가장 오래된 순 (Map insertion order = LRU 근사)으로 제거
  if (store.size > MAX_BUCKETS) {
    var excess = store.size - MAX_BUCKETS;
    var iter = store.keys();
    for (var i = 0; i < excess; i++) {
      var k = iter.next().value;
      if (k !== undefined) store.delete(k);
    }
  }
}

// Vercel/일반 프록시 환경에서 클라이언트 IP 추출
// X-Forwarded-For 는 콤마 구분 — 첫 항목이 원 IP
function getClientIp(req) {
  var h = (req && req.headers) || {};
  var xff = h['x-forwarded-for'] || h['X-Forwarded-For'];
  if (xff) {
    var first = String(xff).split(',')[0].trim();
    if (first) return first;
  }
  var real = h['x-real-ip'] || h['X-Real-IP'];
  if (real) return String(real).trim();
  return (req && req.socket && req.socket.remoteAddress) || 'unknown';
}

// sliding window 카운트 — 현재 시각 기준 windowMs 이내 hit 수 반환
function countAndPush(key, windowMs, now) {
  var entry = store.get(key);
  var threshold = now - windowMs;

  if (!entry) {
    entry = { hits: [], expiresAt: now + Math.max(windowMs, BUCKET_TTL_MS) };
    store.set(key, entry);
  } else {
    // LRU: 재삽입으로 insertion order 갱신
    store.delete(key);
    store.set(key, entry);
  }

  // 윈도우 밖 hit 제거
  while (entry.hits.length && entry.hits[0] <= threshold) entry.hits.shift();

  entry.hits.push(now);
  entry.expiresAt = now + Math.max(windowMs, BUCKET_TTL_MS);
  return entry.hits.length;
}

// 추가 hit 없이 현재 카운트만 확인 (admin handler 용 — 추가 키 활용)
function peek(key, windowMs, now) {
  var entry = store.get(key);
  if (!entry) return 0;
  var threshold = now - windowMs;
  while (entry.hits.length && entry.hits[0] <= threshold) entry.hits.shift();
  return entry.hits.length;
}

function setHeaders(res, max, remaining, resetEpoch) {
  try {
    res.setHeader('X-RateLimit-Limit', String(max));
    res.setHeader('X-RateLimit-Remaining', String(Math.max(0, remaining)));
    res.setHeader('X-RateLimit-Reset', String(resetEpoch));
  } catch (_) {}
}

// 팩토리 — 라우트별 limiter 인스턴스 생성
// opts: { windowMs, max, keyPrefix, keyFn?(req)->string }
function rateLimit(opts) {
  var windowMs = (opts && opts.windowMs) || 60_000;
  var max = (opts && opts.max) || 60;
  var keyPrefix = (opts && opts.keyPrefix) || 'rl';
  var keyFn = (opts && opts.keyFn) || null;

  function buildKey(req) {
    if (keyFn) {
      try {
        var custom = keyFn(req);
        if (custom) return keyPrefix + ':' + custom;
      } catch (_) {}
    }
    return keyPrefix + ':' + getClientIp(req);
  }

  // reject(req, res) — 초과 시 429 응답 후 true 반환 (early return 패턴)
  async function reject(req, res) {
    var now = Date.now();
    var key = buildKey(req);
    var hits = countAndPush(key, windowMs, now);
    gc();

    var remaining = max - hits;
    var resetEpoch = Math.ceil((now + windowMs) / 1000);

    if (hits > max) {
      var retryAfterSec = Math.ceil(windowMs / 1000);
      setHeaders(res, max, 0, resetEpoch);
      try {
        res.setHeader('Retry-After', String(retryAfterSec));
        res.status(429).json({
          error: 'Too many requests. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED',
          retry_after: retryAfterSec
        });
      } catch (_) {}
      return true;
    }

    setHeaders(res, max, remaining, resetEpoch);
    return false;
  }

  return {
    reject: reject,
    peek: function(req) {
      return peek(buildKey(req), windowMs, Date.now());
    }
  };
}

module.exports = rateLimit;
module.exports.getClientIp = getClientIp;
