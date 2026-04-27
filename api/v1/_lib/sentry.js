// Sentry 초기화 + 캡처 헬퍼
// - SENTRY_DSN 미설정 시 graceful 무동작 (throw 금지) — 로컬/프리뷰에서 깨지지 않음
// - @sentry/node 미설치 시에도 require 실패를 흡수하여 코드 흐름 보호
// - environment: VERCEL_ENV(production|preview|development) 기준 자동 태깅
// - 무료 5,000 events/월 한도 고려: errors=100%, traces=0% (성능 추적 OFF)
//
// 사용법:
//   const sentry = require('./_lib/sentry');
//   sentry.init();                         // 핸들러 진입 시 1회 호출 (이미 초기화돼 있으면 noop)
//   sentry.captureException(err, { tags: { route: 'download' }, user: { id, email } });

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
