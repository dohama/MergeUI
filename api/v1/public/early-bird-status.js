// GET /api/v1/public/early-bird-status
//   F-4: Early Bird 잔여 슬롯 카운터 (50명 한정 yearly $99)
//   - 인증 불필요 (랜딩 페이지에서 비로그인 호출)
//   - 1분 캐시 (Cache-Control: public, max-age=60) — 새로고침 폭주 방지
//   - 데이터 소스 우선순위:
//       1) Lemonsqueezy API: filter[variant_id]=EARLYBIRD&filter[status]=active
//          (정확한 활성 구독 수, refund/cancel 즉시 반영)
//       2) DB fallback: subscriptions.lemon_subscription_id 기반은 variant 식별 불가하므로
//          Lemon API 실패 시에는 claimed=null 로 반환 (랜딩 폴백 표시)
//   - DB 스키마에 variant_id 컬럼이 없어 Lemon API 의존이 불가피.
//     향후 subscriptions에 lemon_variant_id 추가 시 DB 우선 조회로 전환 권장.
//
// 응답 contract (F 그로스가 호출):
//   200 {
//     total_slots: 50,
//     claimed: number | null,
//     remaining: number | null,
//     is_sold_out: boolean,
//     updated_at: ISO8601
//   }
//   에러 시에도 200 + fallback 객체 (랜딩이 깨지지 않도록)

const cors = require('../_lib/cors.js');
const sentry = require('../_lib/sentry.js');

const LEMON_API_URL = 'https://api.lemonsqueezy.com/v1';
const TOTAL_SLOTS = 50;
const CACHE_MAX_AGE = 60; // 1분
const FETCH_TIMEOUT_MS = 4000; // Lemon API 응답 4초 초과 시 fallback

function fallbackPayload() {
  return {
    total_slots: TOTAL_SLOTS,
    claimed: null,
    remaining: null,
    is_sold_out: false,
    updated_at: new Date().toISOString()
  };
}

async function fetchWithTimeout(url, options, timeoutMs) {
  if (typeof AbortController === 'undefined') {
    // Node 16 미만 호환 — 단순 race
    return Promise.race([
      fetch(url, options),
      new Promise(function(_, reject) {
        setTimeout(function() { reject(new Error('Lemon API timeout')); }, timeoutMs);
      })
    ]);
  }
  var ctrl = new AbortController();
  var timer = setTimeout(function() { ctrl.abort(); }, timeoutMs);
  try {
    return await fetch(url, Object.assign({}, options, { signal: ctrl.signal }));
  } finally {
    clearTimeout(timer);
  }
}

// Lemonsqueezy API에서 Early Bird variant의 active 구독 수 조회
// JSON:API 응답의 meta.page.total 또는 data.length를 사용
async function countActiveEarlyBirdFromLemon(variantId) {
  if (!process.env.LEMON_API_KEY || !variantId) return null;

  // page[size]=1 + meta.page.total로 카운트만 가져오기 (네트워크 비용 최소화)
  var url = LEMON_API_URL
    + '/subscriptions'
    + '?filter[variant_id]=' + encodeURIComponent(String(variantId))
    + '&filter[status]=active'
    + '&page[size]=1';

  var resp = await fetchWithTimeout(url, {
    headers: {
      'Authorization': 'Bearer ' + process.env.LEMON_API_KEY,
      'Accept': 'application/vnd.api+json'
    }
  }, FETCH_TIMEOUT_MS);

  if (!resp || !resp.ok) {
    var statusCode = resp && resp.status;
    throw new Error('Lemon API responded ' + statusCode);
  }

  var json = await resp.json();
  // JSON:API: meta.page.total 우선
  if (json && json.meta && json.meta.page && typeof json.meta.page.total === 'number') {
    return json.meta.page.total;
  }
  // fallback: data 길이 (page[size]=1이라 1 이하 — 실제 카운트 부정확하므로 경고)
  if (Array.isArray(json && json.data)) {
    return json.data.length;
  }
  throw new Error('Lemon API: unexpected response shape');
}

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET only' });
  }

  // 1분 CDN/브라우저 캐시 — 새로고침 폭주 방지
  // stale-while-revalidate로 캐시 만료 직후 부드러운 갱신
  res.setHeader('Cache-Control', 'public, max-age=' + CACHE_MAX_AGE + ', s-maxage=' + CACHE_MAX_AGE + ', stale-while-revalidate=300');

  var variantId = process.env.LEMON_VARIANT_EARLYBIRD;
  if (!variantId) {
    // Early Bird variant 미설정 — 운영 미스. fallback + 보고
    sentry.captureMessage('early-bird-status: LEMON_VARIANT_EARLYBIRD not configured', 'warning', {
      tags: { route: 'early_bird_status', op: 'env_check' }
    });
    return res.status(200).json(fallbackPayload());
  }

  try {
    var claimed = await countActiveEarlyBirdFromLemon(variantId);
    if (claimed === null || claimed === undefined || !Number.isFinite(claimed)) {
      throw new Error('Invalid claimed count');
    }
    var safeClaimed = Math.max(0, Math.floor(claimed));
    var remaining = Math.max(0, TOTAL_SLOTS - safeClaimed);
    var isSoldOut = safeClaimed >= TOTAL_SLOTS;

    return res.status(200).json({
      total_slots: TOTAL_SLOTS,
      claimed: safeClaimed,
      remaining: remaining,
      is_sold_out: isSoldOut,
      updated_at: new Date().toISOString()
    });
  } catch (e) {
    console.error('[early-bird-status] Lemon API failed:', e && e.message);
    sentry.captureException(e, {
      tags: { route: 'early_bird_status', op: 'lemon_count', severity: 'marketing' },
      extra: { variant_id: String(variantId) },
      level: 'warning'
    });
    // 랜딩이 깨지지 않도록 200 + fallback (claimed/remaining = null)
    return res.status(200).json(fallbackPayload());
  }
};
