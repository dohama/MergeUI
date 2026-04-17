const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');

const LEMON_API_URL = 'https://api.lemonsqueezy.com/v1';

async function lemonFetch(endpoint, options = {}) {
  const res = await fetch(LEMON_API_URL + endpoint, {
    ...options,
    headers: {
      'Authorization': 'Bearer ' + process.env.LEMON_API_KEY,
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      ...options.headers
    }
  });
  return res.json();
}

// GET /api/v1/checkout/products — 상품 목록 조회
router.get('/products', async (req, res) => {
  try {
    const data = await lemonFetch('/products?filter[store_id]=' + process.env.LEMON_STORE_ID);
    const products = (data.data || []).map(p => ({
      id: p.id,
      name: p.attributes.name,
      description: p.attributes.description,
      price: p.attributes.price,
      price_formatted: p.attributes.price_formatted,
      buy_now_url: p.attributes.buy_now_url
    }));
    res.json({ products });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/v1/checkout/create — 결제 세션 생성
router.post('/create', requireAuth, async (req, res) => {
  const { variant_id } = req.body;
  if (!variant_id) return res.status(400).json({ error: 'variant_id is required' });

  try {
    const data = await lemonFetch('/checkouts', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email: req.user.email,
              name: req.user.name,
              custom: {
                user_id: req.user.id
              }
            },
            product_options: {
              redirect_url: (process.env.CORS_ORIGIN || 'https://mergeui.com') + '/pages/checkout/success.html',
              receipt_button_text: 'Go to Dashboard',
              receipt_link_url: (process.env.CORS_ORIGIN || 'https://mergeui.com') + '/pages/subscriber/dashboard.html'
            }
          },
          relationships: {
            store: { data: { type: 'stores', id: process.env.LEMON_STORE_ID } },
            variant: { data: { type: 'variants', id: String(variant_id) } }
          }
        }
      })
    });

    if (data.data?.attributes?.url) {
      res.json({ checkout_url: data.data.attributes.url });
    } else {
      res.status(400).json({ error: 'Failed to create checkout', details: data });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/v1/checkout/variants — 상품의 variant(가격 옵션) 목록
router.get('/variants', async (req, res) => {
  try {
    const data = await lemonFetch('/variants?filter[product_id]=' + (req.query.product_id || ''));
    const variants = (data.data || []).map(v => ({
      id: v.id,
      name: v.attributes.name,
      price: v.attributes.price,
      interval: v.attributes.interval,
      is_subscription: v.attributes.is_subscription
    }));
    res.json({ variants });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
