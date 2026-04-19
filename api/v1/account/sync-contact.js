// POST /api/v1/account/sync-contact
// 회원가입·프로필 변경 시 Loops에 연락처 업서트
// 클라이언트가 가입 성공 직후 호출
const cors = require('../_lib/cors');
const { supabaseAdmin, getUser } = require('../_lib/supabase');
const loops = require('../_lib/loops');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  // 최신 프로필 조회 — 동의 상태·플랜 확인
  var { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('email, name, plan, role, marketing_consent, created_at')
    .eq('id', user.id)
    .single();

  if (!profile) return res.status(404).json({ error: 'Profile not found' });

  // GDPR: 수신 동의 없으면 연락처 생성하지 않음
  // (트랜잭셔널/계정 관련 이메일은 별도 로직 필요 시 override 가능)
  if (!profile.marketing_consent) {
    return res.json({ synced: false, reason: 'marketing_consent=false' });
  }

  // Loops에 연락처 업서트
  try {
    var result = await loops.upsertContact({
      email: profile.email,
      firstName: (profile.name || '').split(' ')[0] || '',
      lastName: (profile.name || '').split(' ').slice(1).join(' ') || '',
      userGroup: profile.plan || 'free',
      userId: user.id,
      source: 'mergeui-signup',
      subscribed: true,
      signupDate: profile.created_at || new Date().toISOString()
    });
    if (result.skipped) {
      return res.json({ synced: false, reason: 'LOOPS_API_KEY not configured' });
    }
    if (!result.ok) {
      return res.status(502).json({ synced: false, error: result.error });
    }
    return res.json({ synced: true });
  } catch (e) {
    console.error('sync-contact error:', e);
    return res.status(500).json({ error: e.message });
  }
};
