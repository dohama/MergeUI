const router = require('express').Router();
const { supabaseAdmin } = require('../supabase');

// POST /api/v1/auth/signup — 이메일 회원가입
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email, password,
    user_metadata: { full_name: name || '' },
    email_confirm: true
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ user: { id: data.user.id, email: data.user.email } });
});

// POST /api/v1/auth/login — 이메일 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const { supabaseAnon } = require('../supabase');
  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: 'Invalid email or password' });

  // 프로필 조회
  const { data: profile } = await supabaseAdmin
    .from('profiles').select('name, role, plan, avatar_url').eq('id', data.user.id).single();

  res.json({
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at
    },
    user: {
      id: data.user.id,
      email: data.user.email,
      name: profile?.name || '',
      role: profile?.role || 'subscriber',
      plan: profile?.plan || 'free',
      avatar_url: profile?.avatar_url || ''
    }
  });
});

// POST /api/v1/auth/logout
router.post('/logout', async (req, res) => {
  // 서버 측에서는 세션 무효화만 처리 (클라이언트에서 localStorage 정리)
  res.json({ message: 'Logged out' });
});

// POST /api/v1/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
    redirectTo: (process.env.CORS_ORIGIN || 'http://localhost:3000') + '/pages/auth/reset-password.html'
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Password reset email sent' });
});

// GET /api/v1/auth/me — 현재 사용자 정보
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  const { data: profile } = await supabaseAdmin
    .from('profiles').select('*').eq('id', user.id).single();

  res.json({ user: { id: user.id, email: user.email, ...profile } });
});

module.exports = router;
