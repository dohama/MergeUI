const cors = require('./_lib/cors');
const csrf = require('./_lib/csrf');
const rateLimit = require('./_lib/rate-limit');
const { supabaseAdmin, getUser, hasActiveSubscription } = require('./_lib/supabase');
const sentry = require('./_lib/sentry');

// D-8: 다운로드 — 10 req/min/IP (라이선스 스캐닝/대량 추출 방지)
var limiter = rateLimit({ windowMs: 60_000, max: 10, keyPrefix: 'download' });

module.exports = async function handler(req, res) {
  sentry.init();
  if (cors(req, res)) return;
  // E-6: CSRF — Origin/Referer 화이트리스트 검증 (POST 상태 변경)
  if (csrf.reject(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // D-8: Rate Limit
  if (await limiter.reject(req, res)) return;

  var user = await getUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  if (user.plan === 'free') return res.status(403).json({ error: 'Pro or Team plan required to download themes' });

  var active = await hasActiveSubscription(user.id);
  if (!active) return res.status(403).json({ error: 'Subscription expired or inactive. Please renew to continue downloading.', code: 'SUBSCRIPTION_EXPIRED' });

  // ─────────────────────────────────────────────
  // E-4 / D-02 BD-1: 라이선스 키 검증 — NULL handling 통일
  // schema (server/db/schema.sql:38-46): license_keys.status NOT NULL DEFAULT 'active',
  //   허용값 ('active', 'revoked'). expires_at 컬럼은 존재하지 않음.
  // 정책:
  //   - status === 'active' 인 키 1개 이상 존재해야 다운로드 허용
  //   - 0 rows (webhook 지연/신규 가입) → LICENSE_PENDING 으로 분리 안내
  //   - status === 'revoked' → LICENSE_INVALID
  // ─────────────────────────────────────────────
  var licResult = await supabaseAdmin
    .from('license_keys')
    .select('id, key, status')
    .eq('user_id', user.id);

  if (licResult.error) {
    console.error('[download] license_keys query failed:', licResult.error.message);
    sentry.captureException(new Error('license_keys query failed: ' + licResult.error.message), {
      tags: { route: 'download', op: 'query_license_keys', severity: 'payment' },
      user: { id: user.id, email: user.email }
    });
    return res.status(500).json({ error: 'License verification failed. Please try again.' });
  }

  var keys = licResult.data || [];
  var hasValidKey = keys.some(function(k) { return k && k.status === 'active'; });

  if (!hasValidKey) {
    if (keys.length === 0) {
      return res.status(403).json({
        error: 'Your license key is being generated. Please wait 1-2 minutes and try again, or contact support@mergeui.com if it persists.',
        code: 'LICENSE_PENDING'
      });
    }
    return res.status(403).json({
      error: 'Your license has been revoked. Please contact support@mergeui.com.',
      code: 'LICENSE_INVALID'
    });
  }

  var theme_slug = (req.body && req.body.theme_slug) || '';
  var slug = theme_slug.replace(/[^a-z0-9-]/gi, '');
  if (!slug) return res.status(400).json({ error: 'theme_slug is required' });

  // ─────────────────────────────────────────────
  // D-9: supabase 결과의 result.error 직접 검사 (catch는 promise reject만 잡음)
  // 다운로드 이력 기록 실패는 본 응답을 막지 않되 반드시 Sentry 보고
  // ─────────────────────────────────────────────
  try {
    var insResult = await supabaseAdmin.from('downloads').insert({
      user_id: user.id, theme_id: slug, version: 'v1', downloaded_at: new Date().toISOString()
    });
    if (insResult && insResult.error) {
      console.error('[download] insert downloads failed:', insResult.error.message);
      sentry.captureException(new Error('downloads insert failed: ' + insResult.error.message), {
        tags: { route: 'download', op: 'insert_downloads' },
        extra: { theme_slug: slug, supabase_error: insResult.error.message },
        user: { id: user.id, email: user.email }
      });
      // 무결성 문제 가능성 — 500 응답으로 호출자에게 실패 알림
      return res.status(500).json({ error: 'Failed to record download. Please try again.' });
    }
  } catch (e) {
    console.error('[download] insert downloads threw:', e && e.message);
    sentry.captureException(e, {
      tags: { route: 'download', op: 'insert_downloads' },
      extra: { theme_slug: slug },
      user: { id: user.id, email: user.email }
    });
    return res.status(500).json({ error: 'Failed to record download. Please try again.' });
  }

  res.json({ download_url: '/templates/' + slug + '-v1/' + slug + '-v1.zip' });
};
