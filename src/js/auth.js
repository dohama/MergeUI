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

  // Init
  var session = getSession();
  applySavedTheme();

  // Page type detection
  var path = window.location.pathname;
  var isSubscriberPage = path.indexOf('/subscriber/') !== -1;
  var isAdminPage = path.indexOf('/admin/') !== -1;
  var isProtectedPage = isSubscriberPage || isAdminPage;

  if (isProtectedPage && !session) {
    window.location.href = BASE + 'pages/auth/login.html';
    return;
  }

  if (isSubscriberPage || isAdminPage) {
    updateSidebar(session);
  } else {
    updatePublicNav(session);
    initMobileMenu();
  }

  // Expose for external use
  window.OozeAuth = {
    getSession: getSession,
    logout: window.logout,
    toggleTheme: window.toggleTheme,
    basePath: BASE
  };
})();
