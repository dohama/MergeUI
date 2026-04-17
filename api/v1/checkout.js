const cors = require('./_lib/cors');
const { getUser } = require('./_lib/supabase');

const LEMON_API_URL = 'https://api.lemonsqueezy.com/v1';

async function lemonFetch(endpoint, options) {
  var res = await fetch(LEMON_API_URL + endpoint, {
    ...options,
    headers: { 'Authorization': 'Bearer ' + process.env.LEMON_API_KEY, 'Content-Type': 'application/vnd.api+json', 'Accept': 'application/vnd.api+json', ...(options?.headers || {}) }
  });
  return res.json();
}

module.exports = async function(req, res) {
  if (cors(req, res)) return;

  // GET — 상품 목록
  if (req.method === 'GET') {
    try {
      var data = await lemonFetch('/products?filter[store_id]=' + process.env.LEMON_STORE_ID);
      var products = (data.data || []).map(function(p) {
        return { id: p.id, name: p.attributes.name, description: p.attributes.description, price: p.attributes.price, buy_now_url: p.attributes.buy_now_url };
      });
      return res.json({ products: products });
    } catch (e) { return res.status(500).json({ error: e.message }); }
  }

  // POST — checkout 세션 생성
  if (req.method === 'POST') {
    var user = await getUser(req);
    if (!user) return res.status(401).json({ error: 'Login required' });

    var variant_id = req.body?.variant_id;
    if (!variant_id) return res.status(400).json({ error: 'variant_id is required' });

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
      return res.status(400).json({ error: 'Failed to create checkout', details: data });
    } catch (e) { return res.status(500).json({ error: e.message }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
