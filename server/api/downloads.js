const router = require('express').Router();
const { supabaseAdmin } = require('../supabase');
const { requireAuth } = require('../middleware/auth');

// GET /api/v1/downloads — 내 다운로드 이력
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('downloads')
    .select('*, themes(name, slug, version), components(name, slug)')
    .eq('user_id', req.user.id)
    .order('downloaded_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const stats = {
    total: data.length,
    this_month: data.filter(d => {
      var now = new Date();
      var dl = new Date(d.downloaded_at);
      return dl.getMonth() === now.getMonth() && dl.getFullYear() === now.getFullYear();
    }).length
  };

  res.json({ downloads: data, stats });
});

module.exports = router;
