const router = require('express').Router();
const { supabaseAdmin } = require('../supabase');
const { requireAuth, requirePro } = require('../middleware/auth');

// GET /api/v1/themes — 테마 목록
router.get('/', async (req, res) => {
  const { category, badge, sort } = req.query;
  let query = supabaseAdmin.from('themes').select('*').eq('is_public', true);

  if (category) query = query.eq('category', category);
  if (badge) query = query.eq('badge', badge);
  if (sort === 'popular') query = query.order('downloads_count', { ascending: false });
  else query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ themes: data });
});

// GET /api/v1/themes/:slug — 테마 상세
router.get('/:slug', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('themes').select('*').eq('slug', req.params.slug).single();

  if (error || !data) return res.status(404).json({ error: 'Theme not found' });
  res.json({ theme: data });
});

// POST /api/v1/themes/:slug/download — 테마 다운로드 (Pro 전용)
router.post('/:slug/download', requirePro, async (req, res) => {
  const { data: theme } = await supabaseAdmin
    .from('themes').select('id, slug, name, version, file_size').eq('slug', req.params.slug).single();

  if (!theme) return res.status(404).json({ error: 'Theme not found' });

  // 다운로드 기록
  await supabaseAdmin.from('downloads').insert({
    user_id: req.user.id,
    theme_id: theme.id,
    version: theme.version,
    package_type: req.body.package || 'full'
  });

  // 다운로드 카운트 증가
  await supabaseAdmin.rpc('increment_downloads', { theme_slug: req.params.slug });

  // TODO: Supabase Storage에서 signed URL 생성
  res.json({
    download_url: '/downloads/' + theme.slug + '-v' + theme.version + '.zip',
    theme: theme
  });
});

module.exports = router;
