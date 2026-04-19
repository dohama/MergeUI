// GET /api/v1/account/billing-portal
// Lemonsqueezy Customer Portal URL 반환 — 구독 취소·결제수단 변경·인보이스 조회 경로
const cors = require('../_lib/cors');
const { supabaseAdmin, getUser } = require('../_lib/supabase');

const LEMON_API_URL = 'https://api.lemonsqueezy.com/v1';

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  // 본인의 활성 구독 조회
  var { data: sub, error: subErr } = await supabaseAdmin
    .from('subscriptions')
    .select('lemon_subscription_id, status')
    .eq('user_id', user.id)
    .in('status', ['active', 'past_due', 'cancelled']) // cancelled도 포함 — 기간 끝까지는 관리 가능
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (subErr || !sub || !sub.lemon_subscription_id) {
    return res.status(404).json({ error: '활성 구독이 없습니다. 결제 후 이용하세요.' });
  }

  // Lemonsqueezy API로 구독 상세 조회 → customer_portal URL 추출
  try {
    var lemonRes = await fetch(LEMON_API_URL + '/subscriptions/' + sub.lemon_subscription_id, {
      headers: {
        'Authorization': 'Bearer ' + process.env.LEMON_API_KEY,
        'Accept': 'application/vnd.api+json'
      }
    });
    if (!lemonRes.ok) {
      var errBody = await lemonRes.text().catch(function() { return ''; });
      console.error('Lemonsqueezy API error:', lemonRes.status, errBody);
      return res.status(502).json({ error: '결제 시스템 조회 실패. 잠시 후 다시 시도해주세요.' });
    }
    var payload = await lemonRes.json();
    var portalUrl = payload?.data?.attributes?.urls?.customer_portal;
    if (!portalUrl) {
      return res.status(502).json({ error: '구독 관리 페이지 URL을 가져올 수 없습니다. support@mergeui.com에 문의해주세요.' });
    }
    return res.json({ portal_url: portalUrl });
  } catch (e) {
    console.error('billing-portal error:', e);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};
