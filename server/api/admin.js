const router = require('express').Router();
const { supabaseAdmin } = require('../supabase');
const { requireAdmin } = require('../middleware/auth');

// 모든 admin 라우트는 관리자 인증 필수
router.use(requireAdmin);

// GET /api/v1/admin/stats — 대시보드 KPI
router.get('/stats', async (req, res) => {
  try {
  const [
    { count: totalUsers },
    { count: activeSubscribers },
    { data: revenueData },
    { count: openInquiries }
  ] = await Promise.all([
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabaseAdmin.from('orders').select('amount').eq('status', 'paid'),
    supabaseAdmin.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'open')
  ]);

  const totalRevenue = (revenueData || []).reduce((sum, o) => sum + parseFloat(o.amount), 0);
  // 플랜별 금액: Pro=$19, Team=$49
  const { data: subData } = await supabaseAdmin.from('subscriptions').select('plan').eq('status', 'active');
  const mrr = (subData || []).reduce(function(sum, s) { return sum + (s.plan === 'team' ? 49 : 19); }, 0);

  res.json({
    mrr,
    total_revenue: totalRevenue,
    active_subscribers: activeSubscribers,
    total_users: totalUsers,
    open_inquiries: openInquiries
  });
  } catch(e) { res.status(500).json({ error: e.message || 'Failed to load stats' }); }
});

// GET /api/v1/admin/subscribers — 구독자 목록
router.get('/subscribers', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const { plan, status, search } = req.query;
  const offset = (page - 1) * limit;

  let query = supabaseAdmin.from('profiles')
    .select('*, subscriptions(plan, status, current_period_end)', { count: 'exact' });

  if (plan) query = query.eq('plan', plan);
  if (search) {
    const sanitized = search.replace(/[%_,().*]/g, '');
    if (sanitized) query = query.or(`name.ilike.%${sanitized}%,email.ilike.%${sanitized}%`);
  }

  const { data, count, error } = await query.range(offset, offset + limit - 1).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });

  res.json({ subscribers: data, total: count, page: Number(page), limit: Number(limit) });
});

// GET /api/v1/admin/orders — 주문 목록
router.get('/orders', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const { data, count, error } = await supabaseAdmin.from('orders')
    .select('*, profiles(name, email)', { count: 'exact' })
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ orders: data, total: count });
});

// GET /api/v1/admin/themes — 테마 관리 목록
router.get('/themes', async (req, res) => {
  const { data, error } = await supabaseAdmin.from('themes').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ themes: data });
});

// POST /api/v1/admin/themes — 테마 추가
router.post('/themes', async (req, res) => {
  const { slug, name, description, category, badge, is_public, preview_url, download_url, version, features, tech_stack, pages_count, components_count, price } = req.body;
  const allowed = { slug, name, description, category, badge, is_public, preview_url, download_url, version, features, tech_stack, pages_count, components_count, price };
  Object.keys(allowed).forEach(k => allowed[k] === undefined && delete allowed[k]);
  const { data, error } = await supabaseAdmin.from('themes').insert(allowed).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ theme: data });
});

// PUT /api/v1/admin/themes/:id — 테마 수정
router.put('/themes/:id', async (req, res) => {
  const { slug, name, description, category, badge, is_public, preview_url, download_url, version, features, tech_stack, pages_count, components_count, price } = req.body;
  const allowed = { slug, name, description, category, badge, is_public, preview_url, download_url, version, features, tech_stack, pages_count, components_count, price };
  Object.keys(allowed).forEach(k => allowed[k] === undefined && delete allowed[k]);
  const { data, error } = await supabaseAdmin.from('themes').update(allowed).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ theme: data });
});

// DELETE /api/v1/admin/themes/:id — 테마 삭제
router.delete('/themes/:id', async (req, res) => {
  const { error } = await supabaseAdmin.from('themes').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Theme deleted' });
});

// GET /api/v1/admin/inquiries — 문의 목록
router.get('/inquiries', async (req, res) => {
  const { status } = req.query;
  let query = supabaseAdmin.from('inquiries').select('*');
  if (status) query = query.eq('status', status);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ inquiries: data });
});

// PUT /api/v1/admin/inquiries/:id — 문의 답변
router.put('/inquiries/:id', async (req, res) => {
  const { admin_reply, status } = req.body;
  const { data, error } = await supabaseAdmin.from('inquiries')
    .update({ admin_reply, status: status || 'replied' })
    .eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ inquiry: data });
});

module.exports = router;
