// 인증 미들웨어 — Supabase JWT 검증
const { supabaseAdmin } = require('../supabase');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  // 프로필 조회하여 role, plan 정보 추가
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role, plan, name')
    .eq('id', user.id)
    .single();

  req.user = {
    id: user.id,
    email: user.email,
    role: profile?.role || 'subscriber',
    plan: profile?.plan || 'free',
    name: profile?.name || ''
  };
  req.accessToken = token;
  next();
}

// 관리자 전용
async function requireAdmin(req, res, next) {
  await requireAuth(req, res, function() {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
}

// Pro 이상 구독자 전용
async function requirePro(req, res, next) {
  await requireAuth(req, res, function() {
    if (req.user.plan === 'free') {
      return res.status(403).json({ error: 'Pro subscription required', upgrade_url: '/pricing' });
    }
    next();
  });
}

module.exports = { requireAuth, requireAdmin, requirePro };
