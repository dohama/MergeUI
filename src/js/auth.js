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

  // Logout — Supabase signOut 우선 호출, fallback으로 localStorage 직접 삭제
  window.logout = function() {
    if (window.MergeDB && typeof window.MergeDB.logout === 'function') {
      window.MergeDB.logout();
    } else {
      localStorage.removeItem('mergeui_session');
      var path = window.location.pathname;
      var isProtected = path.indexOf('/subscriber/') !== -1 || path.indexOf('/admin/') !== -1;
      if (isProtected) {
        window.location.href = BASE + 'pages/auth/login.html';
      } else {
        window.location.reload();
      }
    }
  };

  // Reset nav to logged-out state (public pages)
  function resetPublicNav() {
    var navRight = document.querySelector('.nav-right');
    if (navRight) {
      navRight.innerHTML = '<a href="' + BASE + 'pages/auth/login.html" class="nav-signin" style="font-size:14px;color:var(--text-muted);font-weight:500;transition:color 0.15s">Sign In</a><a href="' + BASE + 'pages/auth/signup.html" class="nav-cta">Get Started</a>';
    }
  }

  // Update nav for logged-in state (public pages)
  function updatePublicNav(session) {
    if (!session) return;
    var dashUrl = BASE + 'pages/subscriber/dashboard.html';
    if (session.role === 'admin') dashUrl = BASE + 'pages/admin/dashboard.html';
    var navRight = document.querySelector('.nav-right');
    if (navRight) {
      navRight.innerHTML = '<a onclick="logout()" style="font-size:14px;color:var(--text-muted);cursor:pointer;font-weight:500">Sign Out</a><a href="' + dashUrl + '" class="nav-cta">My Dashboard</a>';
    }
    var mob = document.getElementById('mobileMenu');
    if (mob) {
      var si = mob.querySelector('a[href*="login"]');
      if (si) { si.textContent = 'My Dashboard'; si.href = dashUrl; }
      var gs = mob.querySelector('a[href*="signup"]');
      if (gs) { gs.textContent = 'Sign Out'; gs.href = '#'; gs.onclick = function(e) { e.preventDefault(); logout(); }; gs.style = ''; }
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

    // 로컬 파일 접속 시 세션 체크 우회 (file:// 프로토콜)
    var isLocal = window.location.protocol === 'file:';
    if (isProtectedPage && !session && !isLocal) {
      window.location.href = BASE + 'pages/auth/login.html';
      return;
    }

    // 관리자 페이지 — localStorage role로 1차 체크 (UI 힌트)
    if (isAdminPage && !isLocal && session && session.role !== 'admin') {
      window.location.href = BASE + 'pages/subscriber/dashboard.html';
      return;
    }

    // 관리자 페이지 — 서버에서 role 재검증 (localStorage 조작 방지)
    if (isAdminPage && !isLocal && session) {
      if (window.MergeDB && typeof window.MergeDB.getProfile === 'function') {
        window.MergeDB.getProfile().then(function(profile) {
          if (!profile || profile.role !== 'admin') {
            localStorage.removeItem('mergeui_session');
            window.location.href = BASE + 'pages/auth/login.html';
          }
        });
      }
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

  var path = window.location.pathname;
  var isProtected = path.indexOf('/subscriber/') !== -1 || path.indexOf('/admin/') !== -1;
  var isLocal = window.location.protocol === 'file:';

  // OAuth 콜백 감지 — hash(#access_token) 또는 query(?code=) 둘 다 체크
  var fullUrl = window.location.href;
  var isOAuthCallback = fullUrl.indexOf('access_token') !== -1 ||
                         fullUrl.indexOf('refresh_token') !== -1 ||
                         fullUrl.indexOf('code=') !== -1;

  // 초기 표시: 보호 페이지는 세션 기준, 공개 페이지는 로그아웃 상태로 시작 (검증 후 변경)
  if (isProtected) {
    initPage(session);
  } else {
    initPage(null);
  }

  // Supabase 세션과 동기화 — localStorage에 세션이 있어도 실제 Supabase 세션이 없으면 정리
  function verifySession() {
    if (!window.MergeDB || !window.MergeDB.client) return;
    window.MergeDB.client.auth.getSession().then(function(result) {
      if (!result.data.session) {
        // 세션 만료 — 정리
        localStorage.removeItem('mergeui_session');
        if (isProtected && !isLocal) {
          window.location.href = BASE + 'pages/auth/login.html';
        } else {
          resetPublicNav();
        }
      } else {
        // 세션 유효 — 로그인 상태 UI 표시
        var s = getSession();
        if (s && !isProtected) {
          updatePublicNav(s);
          updateCtaLinks(s);
        }
      }
    }).catch(function() {});
  }
  if (session) {
    if (window.MergeDB && window.MergeDB.client) {
      verifySession();
    } else {
      document.addEventListener('mergedb-ready', verifySession);
    }
  }

  // 세션 업데이트 이벤트 수신
  document.addEventListener('mergeui-session-updated', function() {
    var s = getSession();
    if (s) {
      if (!isProtected) { updatePublicNav(s); updateCtaLinks(s); }
      else { initPage(s); }
    }
  });

  // Supabase SIGNED_OUT 이벤트 수신 — 즉시 nav 복원
  document.addEventListener('mergeui-session-cleared', function() {
    if (!isProtected) {
      resetPublicNav();
    }
  });

  // Expose for external use
  window.MergeAuth = {
    getSession: getSession,
    logout: window.logout,
    toggleTheme: window.toggleTheme,
    basePath: BASE
  };
})();
