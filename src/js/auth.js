/* ============================================
   MergeUi Auth — 공통 인증 모듈
   ============================================ */

(function() {
  'use strict';

  // 프로젝트 루트 경로 자동 계산
  // auth.js는 항상 src/js/auth.js 에 있으므로, script 태그의 src에서 루트를 역산
  function getBasePath() {
    var scripts = document.querySelectorAll('script[src*="auth.js"]');
    if (scripts.length > 0) {
      var src = scripts[0].getAttribute('src');
      // "../../src/js/auth.js" → "../../"
      // "../src/js/auth.js" → "../"
      // "src/js/auth.js" → ""
      return src.replace('src/js/auth.js', '');
    }
    return '';
  }

  var BASE = getBasePath();

  // Session check with error handling
  function getSession() {
    try {
      var raw = localStorage.getItem('mergeui_session');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch(e) {
      localStorage.removeItem('mergeui_session');
      return null;
    }
  }

  // Logout
  window.logout = function() {
    localStorage.removeItem('mergeui_session');
    window.location.href = BASE + 'pages/auth/login.html';
  };

  // Update nav for logged-in state (public pages)
  function updatePublicNav(session) {
    if (!session) return;
    var dashUrl = BASE + 'pages/subscriber/dashboard.html';
    var navRight = document.querySelector('.nav-right');
    if (navRight) {
      navRight.innerHTML = '<a href="' + dashUrl + '" class="nav-cta">My Dashboard</a>';
    }
    var mob = document.getElementById('mobileMenu');
    if (mob) {
      var si = mob.querySelector('a[href*="login"]');
      if (si) { si.textContent = 'My Dashboard'; si.href = dashUrl; }
      var gs = mob.querySelector('a[href*="signup"]');
      if (gs) gs.remove();
    }
  }

  // Update sidebar for logged-in state (subscriber pages)
  function updateSidebar(session) {
    if (!session) return;
    var n = document.querySelector('.sb-user-name');
    if (n) n.textContent = session.name || 'User';
    var p = document.querySelector('.sb-user-plan');
    if (p) p.textContent = (session.plan || 'Free') + ' Plan';
    var a = document.querySelector('.sb-avatar');
    if (a) a.textContent = (session.name || 'U').charAt(0).toUpperCase();
  }

  // Mobile menu toggle (public pages)
  function initMobileMenu() {
    var burger = document.querySelector('.nav-burger');
    var mm = document.getElementById('mobileMenu');
    if (!burger || !mm) return;
    burger.addEventListener('click', function() {
      burger.classList.toggle('active');
      mm.classList.toggle('open');
      document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link').forEach(function(l) {
      l.addEventListener('click', function() {
        burger.classList.remove('active');
        mm.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Theme toggle
  window.toggleTheme = function() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mergeui_theme', next);
  };

  // Apply saved theme
  function applySavedTheme() {
    var saved = localStorage.getItem('mergeui_theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  // 페이지 초기화 함수
  function initPage(session) {
    var path = window.location.pathname;
    var isSubscriberPage = path.indexOf('/subscriber/') !== -1;
    var isAdminPage = path.indexOf('/admin/') !== -1;
    var isProtectedPage = isSubscriberPage || isAdminPage;

    if (isProtectedPage && !session) {
      window.location.href = BASE + 'pages/auth/login.html';
      return;
    }

    // 관리자 페이지 — role 체크
    if (isAdminPage && session && session.role !== 'admin') {
      window.location.href = BASE + 'pages/subscriber/dashboard.html';
      return;
    }

    if (isSubscriberPage || isAdminPage) {
      updateSidebar(session);
    } else {
      updatePublicNav(session);
    }

    // 로그인 상태에 따라 CTA 링크 업데이트 (pricing 등)
    if (session) {
      updateCtaLinks(session);
    }
  }

  // CTA 링크 업데이트 — 로그인 상태면 대시보드/결제로 연결
  function updateCtaLinks(session) {
    var dashUrl = BASE + 'pages/subscriber/dashboard.html';
    // .pc-btn (pricing card button) 등 signup으로 가는 CTA를 대시보드로 변경
    document.querySelectorAll('a[href*="signup"]').forEach(function(link) {
      // nav 영역 제외 (이미 updatePublicNav에서 처리)
      if (link.closest('.nav') || link.closest('.nav-right') || link.closest('#mobileMenu')) return;
      link.href = dashUrl;
    });
  }

  // Init
  var session = getSession();
  applySavedTheme();
  initMobileMenu();

  // OAuth 콜백 중인지 확인 (URL에 access_token 해시가 있으면 OAuth 진행 중)
  var hash = window.location.hash;
  var isOAuthCallback = hash.indexOf('access_token') !== -1 || hash.indexOf('refresh_token') !== -1;

  var path = window.location.pathname;
  var isProtected = path.indexOf('/subscriber/') !== -1 || path.indexOf('/admin/') !== -1;

  if (session) {
    // 세션이 이미 있으면 바로 초기화
    initPage(session);
  } else if (isOAuthCallback) {
    // OAuth 콜백 중 — supabase-client.js가 세션을 저장할 때까지 기다림
    // 리다이렉트하지 않고 이벤트를 기다림
    document.addEventListener('mergeui-session-updated', function() {
      var s = getSession();
      if (s) {
        initPage(s);
      }
    });
  } else if (!isProtected) {
    // 공개 페이지 — 세션 없어도 정상 표시
    initPage(null);
    // 나중에 세션이 생기면 Nav 업데이트
    document.addEventListener('mergeui-session-updated', function() {
      var s = getSession();
      if (s) {
        updatePublicNav(s);
        updateCtaLinks(s);
      }
    });
  } else {
    // 보호 페이지인데 세션 없고 OAuth도 아님 — 로그인으로
    window.location.href = BASE + 'pages/auth/login.html';
  }

  // Expose for external use
  window.MergeAuth = {
    getSession: getSession,
    logout: window.logout,
    toggleTheme: window.toggleTheme,
    basePath: BASE
  };
})();
