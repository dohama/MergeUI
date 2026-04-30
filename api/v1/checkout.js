const cors = require('./_lib/cors.js');
const csrf = require('./_lib/csrf.js');
const { getUser } = require('./_lib/supabase.js');
const sentry = require('./_lib/sentry.js');

const LEMON_API_URL = 'https://api.lemonsqueezy.com/v1';

// D-17: 결제 variant 화이트리스트 — ENV에 등록된 3개 variant만 허용
function getAllowedVariants() {
  var ids = [
    process.env.LEMON_VARIANT_PRO_MONTHLY,
    process.env.LEMON_VARIANT_PRO_ANNUAL,
    process.env.LEMON_VARIANT_EARLYBIRD
  ];
  return ids.map(function(v) { return v ? String(v).trim() : ''; }).filter(Boolean);
}

async function lemonFetch(endpoint, options) {
  var res = await fetch(LEMON_API_URL + endpoint, {
    ...options,
    headers: { 'Authorization': 'Bearer ' + process.env.LEMON_API_KEY, 'Content-Type': 'application/vnd.api+json', 'Accept': 'application/vnd.api+json', ...(options?.headers || {}) }
  });
  return res.json();
}

module.exports = async function(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  // D-17/CSRF: 상태 변경(POST)에만 CSRF 검증 적용 (GET 통과)
  if (csrf.reject(req, res)) return;

  // GET — 상품 목록
  if (req.method === 'GET') {
    try {
      var data = await lemonFetch('/products?filter[store_id]=' + process.env.LEMON_STORE_ID);
      var products = (data.data || []).map(function(p) {
        return { id: p.id, name: p.attributes.name, description: p.attributes.description, price: p.attributes.price, buy_now_url: p.attributes.buy_now_url };
      });
      return res.json({ products: products });
    } catch (e) {
      console.error('[checkout][GET] products fetch failed:', e && e.message);
      sentry.captureException(e, { tags: { route: 'checkout', op: 'list_products' } });
      return res.status(500).json({ error: 'Failed to load products' });
    }
  }

  // POST — checkout 세션 생성
  if (req.method === 'POST') {
    var user = await getUser(req);
    if (!user) return res.status(401).json({ error: 'Login required' });

    var variant_id = req.body?.variant_id;
    if (!variant_id) return res.status(400).json({ error: 'variant_id is required' });

    // D-17: variant_id 화이트리스트 검증 — ENV에 등록된 3개 외 차단
    var allowedVariants = getAllowedVariants();
    if (allowedVariants.length === 0) {
      sentry.captureMessage('Checkout variant whitelist not configured', 'error', {
        tags: { route: 'checkout', op: 'variant_whitelist', severity: 'payment' }
      });
      return res.status(500).json({ error: 'Checkout variants not configured' });
    }
    if (allowedVariants.indexOf(String(variant_id)) === -1) {
      sentry.captureMessage('Checkout variant rejected (not in whitelist)', 'warning', {
        tags: { route: 'checkout', op: 'variant_whitelist', severity: 'payment' },
        extra: { variant_id: String(variant_id) },
        user: { id: user.id, email: user.email }
      });
      return res.status(400).json({ error: 'Invalid variant_id' });
    }

    try {
      var origin = process.env.CORS_ORIGIN || 'https://mergeui.com';
      var data = await lemonFetch('/checkouts', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'checkouts',
            attributes: {
              checkout_data: { email: user.email, name: user.name, custom: { user_id: user.id } },
              product_options: {
                redirect_url: origin + '/pages/checkout/success.html',
                receipt_button_text: 'Go to Dashboard',
                receipt_link_url: origin + '/pages/subscriber/dashboard.html'
              }
            },
            relationships: {
              store: { data: { type: 'stores', id: process.env.LEMON_STORE_ID } },
              variant: { data: { type: 'variants', id: String(variant_id) } }
            }
          }
        })
      });
      if (data.data?.attributes?.url) return res.json({ checkout_url: data.data.attributes.url });
      // Lemonsqueezy가 200을 주고도 실패 응답을 본문에 담는 경우 — 결제 직격이라 캡처
      sentry.captureMessage('Checkout creation returned no url', 'error', {
        tags: { route: 'checkout', op: 'create_checkout' },
        extra: { variant_id: String(variant_id), response: data },
        user: { id: user.id, email: user.email }
      });
      return res.status(400).json({ error: 'Failed to create checkout' });
    } catch (e) {
      console.error('[checkout][POST] create failed:', e && e.message);
      sentry.captureException(e, {
        tags: { route: 'checkout', op: 'create_checkout' },
        extra: { variant_id: String(variant_id) },
        user: { id: user.id, email: user.email }
      });
      return res.status(500).json({ error: 'Failed to create checkout' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
