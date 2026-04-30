// Sentry 초기화 + 캡처 헬퍼
// - SENTRY_DSN 미설정 시 graceful 무동작 (throw 금지) — 로컬/프리뷰에서 깨지지 않음
// - @sentry/node 미설치 시에도 require 실패를 흡수하여 코드 흐름 보호
// - environment: VERCEL_ENV(production|preview|development) 기준 자동 태깅
// - 무료 5,000 events/월 한도 고려: errors=100%, traces=0% (성능 추적 OFF)
//
// 사용법:
//   const sentry = require('./_lib/sentry');
//   sentry.init();                         // 핸들러 진입 시 1회 호출 (이미 초기화돼 있으면 noop)
//   sentry.captureException(err, { tags: { area: 'payment', route: 'webhook' }, user: { id, email } });
//
// === 알림 라우팅용 태그 규칙 (E-15, 2026-05-01) ===
// 모든 captureException/captureMessage 호출은 반드시 `tags.area` 를 포함해야 함.
// Sentry 대시보드 Alert Rule 은 이 태그 기준으로 라우팅:
//
//   area=payment   → 결제/구독/라이선스/웹훅 (Lemonsqueezy, orders, license_keys)
//                    임계치: 1건 즉시 알림 (매출 직결, 한 건도 놓치면 안 됨)
//   area=auth      → 로그인/회원가입/세션/이메일 인증 (Supabase Auth, OAuth 콜백)
//                    임계치: 5분에 5건 이상 (무차별 시도 또는 시스템 장애 신호)
//   area=api       → 그 외 일반 API (테마/컴포넌트/문의/검색/계정 설정)
//                    임계치: 30분에 10건 이상 (정상 운영 노이즈 임계치)
//
// 추가 권장 태그 (선택):
//   - route: 'checkout' | 'download' | 'webhook' | 'sync-loops' | ... (라우트별 구분)
//   - level: 'fatal' | 'error' | 'warning' | 'info'
//   - user: { id, email } — PII 최소화. sendDefaultPii=false 설정으로 자동 마스킹

var initialized = false;
var Sentry = null;
var enabled = false;

function tryRequireSentry() {
  try {
    return require('@sentry/node');
  } catch (e) {
    if (process.env.SENTRY_DSN) {
      console.warn('[Sentry] SENTRY_DSN is set but @sentry/node is not installed. Run: npm install @sentry/node');
    }
    return null;
  }
}

function init() {
  if (initialized) return enabled;
  initialized = true;

  var dsn = process.env.SENTRY_DSN;
  if (!dsn) return false;

  Sentry = tryRequireSentry();
  if (!Sentry) return false;

  try {
    Sentry.init({
      dsn: dsn,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
      release: process.env.VERCEL_GIT_COMMIT_SHA || undefined,
      tracesSampleRate: 0,
      sampleRate: (process.env.VERCEL_ENV === 'production') ? 1.0 : 0.5,
      sendDefaultPii: false
    });
    enabled = true;
    return true;
  } catch (e) {
    console.warn('[Sentry] init failed:', e.message);
    return false;
  }
}

function captureException(err, context) {
  if (!initialized) init();
  if (!enabled || !Sentry) return;
  try {
    Sentry.withScope(function(scope) {
      if (context && context.tags) scope.setTags(context.tags);
      if (context && context.extra) scope.setExtras(context.extra);
      if (context && context.user) scope.setUser({
        id: context.user.id,
        email: context.user.email
      });
      if (context && context.level) scope.setLevel(context.level);
      Sentry.captureException(err);
    });
  } catch (_) {}
}

function captureMessage(message, level, context) {
  if (!initialized) init();
  if (!enabled || !Sentry) return;
  try {
    Sentry.withScope(function(scope) {
      if (context && context.tags) scope.setTags(context.tags);
      if (context && context.extra) scope.setExtras(context.extra);
      if (context && context.user) scope.setUser({ id: context.user.id, email: context.user.email });
      Sentry.captureMessage(message, level || 'info');
    });
  } catch (_) {}
}

function wrap(handler, route) {
  return async function(req, res) {
    init();
    try {
      return await handler(req, res);
    } catch (err) {
      captureException(err, { tags: { route: route || 'unknown' } });
      throw err;
    }
  };
}

module.exports = {
  init: init,
  captureException: captureException,
  captureMessage: captureMessage,
  wrap: wrap,
  isEnabled: function() { return enabled; }
};
