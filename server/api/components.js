const router = require('express').Router();
const { supabaseAdmin } = require('../supabase');

// GET /api/v1/components — 컴포넌트 목록
router.get('/', async (req, res) => {
  const { category } = req.query;
  let query = supabaseAdmin.from('components').select('id, slug, name, description, category, version, badge, preview_html').eq('is_public', true);

  if (category) query = query.eq('category', category);
  query = query.order('name');

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ components: data });
});

// GET /api/v1/components/:slug — 컴포넌트 상세 (코드 포함)
router.get('/:slug', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('components').select('*').eq('slug', req.params.slug).single();

  if (error || !data) return res.status(404).json({ error: 'Component not found' });

  // Pro 컴포넌트인 경우 코드 숨김
  if (data.badge === 'pro') {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      if (user) {
        const { data: profile } = await supabaseAdmin.from('profiles').select('plan').eq('id', user.id).single();
        if (profile?.plan !== 'free') return res.json({ component: data });
      }
    }
    // Free 사용자 또는 비로그인 → 코드 숨김
    data.code_html = null;
    data.code_css = null;
  }

  res.json({ component: data });
});

module.exports = router;
