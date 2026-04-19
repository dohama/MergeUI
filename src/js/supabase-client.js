/* ============================================
   MergeUi Supabase Client (프론트엔드용)
   anon key 사용 — RLS 적용됨
   ============================================ */

// Supabase CDN 로드
(function() {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  script.onload = function() { initMergeSupabase(); };
  document.head.appendChild(script);
})();

function initMergeSupabase() {
  var SUPABASE_URL = (window.MERGE_CONFIG && window.MERGE_CONFIG.SUPABASE_URL) || 'https://agugcvugqjcetiulezim.supabase.co';
  var SUPABASE_ANON_KEY = (window.MERGE_CONFIG && window.MERGE_CONFIG.SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndWdjdnVncWpjZXRpdWxlemltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxODc4ODMsImV4cCI6MjA5MTc2Mzg4M30.u2Z7nLkZe14_ng21hvX-NSv4DGXnG6JIB2GEhtPhxEI';

  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
      storageKey: 'sb-mergeui-auth',
      flowType: 'pkce'
    }
  });

  // onAuthStateChange — 세션이 생기면 저장, 로그아웃되면 삭제
  console.log('[MergeAuth] Supabase client initialized');
  sb.auth.onAuthStateChange(async function(event, session) {
    console.log('[MergeAuth] Event:', event, 'Session:', session ? 'YES' : 'NO');
    if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
      // 1단계: 기본 세션 즉시 저장 (프로필 조회 전에)
      var basicSession = {
        name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
        email: session.user.email,
        plan: 'free',
        role: 'subscriber',
        avatar_url: session.user.user_metadata?.avatar_url || ''
      };
      localStorage.setItem('mergeui_session', JSON.stringify(basicSession));
      document.dispatchEvent(new Event('mergeui-session-updated'));

      // 2단계: 프로필 조회 후 세션 업데이트 (실패해도 기본 세션은 유지)
      try {
        var { data: profile, error: profileError } = await sb.from('profiles').select('name, role, plan, avatar_url').eq('id', session.user.id).single();
        console.log('[MergeAuth] Profile query result:', profile, 'Error:', profileError);
        if (profile) {
          var fullSession = {
            name: profile.name || basicSession.name,
            email: session.user.email,
            plan: profile.plan || 'free',
            role: profile.role || 'subscriber',
            avatar_url: profile.avatar_url || basicSession.avatar_url
          };
          localStorage.setItem('mergeui_session', JSON.stringify(fullSession));
          document.dispatchEvent(new Event('mergeui-session-updated'));
        }
      } catch (e) {
        // 프로필 조회 실패해도 기본 세션은 이미 저장됨 — 문제없음
      }

      // OAuth 로그인 완료 — 공개 페이지/로그인 페이지에 있으면 대시보드로 이동
      if (event === 'SIGNED_IN') {
        var path = window.location.pathname;
        var isAlreadyInApp = path.indexOf('/subscriber/') !== -1 || path.indexOf('/admin/') !== -1;
        if (!isAlreadyInApp) {
          // role에 따라 관리자/구독자 대시보드 분기
          var savedSession = JSON.parse(localStorage.getItem('mergeui_session') || '{}');
          var dest = savedSession.role === 'admin' ? '/pages/admin/dashboard.html' : '/pages/subscriber/dashboard.html';
          window.location.replace(window.location.origin + dest);
        }
      }

      if (event === 'USER_UPDATED') {
        document.dispatchEvent(new Event('mergeui-session-updated'));
      }
    }

    if (event === 'SIGNED_OUT') {
      localStorage.removeItem('mergeui_session');
      document.dispatchEvent(new Event('mergeui-session-cleared'));
    }
  });

  // 보호 페이지 접근 제어 — 즉시 세션 확인 후 판단
  var path = window.location.pathname;
  var isProtected = path.indexOf('/subscriber/') !== -1 || path.indexOf('/admin/') !== -1;
  if (isProtected && window.location.protocol !== 'file:') {
    var fullUrl = window.location.href;
    var isOAuthCallback = fullUrl.indexOf('access_token') !== -1 ||
                           fullUrl.indexOf('refresh_token') !== -1 ||
                           fullUrl.indexOf('code=') !== -1;

    if (!isOAuthCallback) {
      // OAuth 콜백이 아닌 경우: Supabase 공식 세션 우선 확인
      sb.auth.getSession().then(function(result) {
        var session = result.data.session;
        if (!session) {
          localStorage.removeItem('mergeui_session');
          window.location.replace(window.location.origin + '/pages/auth/login.html');
        }
      });
    } else {
      // OAuth 콜백: SDK가 코드 교환 완료할 때까지 5초 대기 후 공식 세션 재확인
      setTimeout(function() {
        sb.auth.getSession().then(function(result) {
          if (!result.data.session) {
            window.location.replace(window.location.origin + '/pages/auth/login.html');
          }
        });
      }, 5000);
    }
  }

  window.MergeDB = {
    client: sb,

    // ========== AUTH ==========

    // 이메일 회원가입
    signup: async function(email, password, name) {
      var { data, error } = await sb.auth.signUp({
        email: email,
        password: password,
        options: { data: { full_name: name } }
      });
      if (error) throw error;
      return data;
    },

    // 이메일 로그인
    login: async function(email, password) {
      var { data, error } = await sb.auth.signInWithPassword({ email: email, password: password });
      if (error) throw error;

      // 프로필 조회하여 세션에 저장
      var profile = await MergeDB.getProfile();
      var session = {
        name: profile.name || email.split('@')[0],
        email: email,
        plan: profile.plan || 'free',
        role: profile.role || 'subscriber',
        avatar_url: profile.avatar_url || ''
      };
      localStorage.setItem('mergeui_session', JSON.stringify(session));
      return session;
    },

    // GitHub OAuth 로그인 — 로그인 페이지로 돌아와서 세션 파싱 후 onAuthStateChange에서 이동
    loginWithGitHub: async function() {
      var { data, error } = await sb.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: window.location.origin + '/pages/auth/login.html' }
      });
      if (error) throw error;
      return data;
    },

    // Google OAuth 로그인 — 로그인 페이지로 돌아와서 세션 파싱 후 onAuthStateChange에서 이동
    loginWithGoogle: async function() {
      var { data, error } = await sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/pages/auth/login.html' }
      });
      if (error) throw error;
      return data;
    },

    // 로그아웃 — 보호 페이지면 로그인으로, 공개 페이지면 현재 페이지 유지
    logout: async function() {
      await sb.auth.signOut();
      localStorage.removeItem('mergeui_session');
      var path = window.location.pathname;
      var isProtected = path.indexOf('/subscriber/') !== -1 || path.indexOf('/admin/') !== -1;
      if (isProtected) {
        window.location.href = '/pages/auth/login.html';
      } else {
        window.location.reload();
      }
    },

    // 현재 유저
    getUser: async function() {
      var { data: { user } } = await sb.auth.getUser();
      return user;
    },

    // 비밀번호 재설정 이메일
    resetPassword: async function(email) {
      var { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/pages/auth/reset-password.html'
      });
      if (error) throw error;
    },

    // ========== PROFILE ==========

    getProfile: async function() {
      var user = await MergeDB.getUser();
      if (!user) return null;
      var { data, error } = await sb.from('profiles').select('*').eq('id', user.id).single();
      if (error) return { name: '', plan: 'free', role: 'subscriber' };
      return data;
    },

    updateProfile: async function(updates) {
      var user = await MergeDB.getUser();
      if (!user) throw new Error('Not authenticated');
      var { data, error } = await sb.from('profiles').update(updates).eq('id', user.id).select().single();
      if (error) throw error;
      // 로컬 세션도 업데이트
      var session = JSON.parse(localStorage.getItem('mergeui_session') || '{}');
      if (updates.name) session.name = updates.name;
      if (updates.plan) session.plan = updates.plan;
      localStorage.setItem('mergeui_session', JSON.stringify(session));
      return data;
    },

    updatePassword: async function(newPassword) {
      var { data, error } = await sb.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return data;
    },

    // ========== THEMES ==========

    getThemes: async function(filters) {
      var query = sb.from('themes').select('*').eq('is_public', true);
      if (filters && filters.category) query = query.eq('category', filters.category);
      if (filters && filters.sort === 'popular') query = query.order('downloads_count', { ascending: false });
      else query = query.order('created_at', { ascending: false });
      var { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    getTheme: async function(slug) {
      var { data, error } = await sb.from('themes').select('*').eq('slug', slug).single();
      if (error) throw error;
      return data;
    },

    // ========== COMPONENTS ==========

    getComponents: async function(category) {
      var query = sb.from('components').select('*').eq('is_public', true);
      if (category) query = query.eq('category', category);
      query = query.order('name');
      var { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    getComponent: async function(slug) {
      var { data, error } = await sb.from('components').select('*').eq('slug', slug).single();
      if (error) throw error;
      return data;
    },

    // ========== DOWNLOADS ==========

    getMyDownloads: async function() {
      var user = await MergeDB.getUser();
      if (!user) return [];
      var { data, error } = await sb.from('downloads')
        .select('*, themes(name, slug, version), components(name, slug)')
        .eq('user_id', user.id)
        .order('downloaded_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    recordDownload: async function(themeId, version) {
      var user = await MergeDB.getUser();
      if (!user) throw new Error('Not authenticated');
      var { error } = await sb.from('downloads').insert({
        user_id: user.id,
        theme_id: themeId,
        version: version
      });
      if (error) throw error;
    },

    // ========== FAVORITES ==========

    getMyFavorites: async function() {
      var user = await MergeDB.getUser();
      if (!user) return [];
      var { data, error } = await sb.from('favorites')
        .select('*, themes(name, slug), components(name, slug)')
        .eq('user_id', user.id);
      if (error) throw error;
      return data || [];
    },

    toggleFavorite: async function(themeId, componentId) {
      var user = await MergeDB.getUser();
      if (!user) throw new Error('Not authenticated');

      var query = sb.from('favorites').select('id').eq('user_id', user.id);
      if (themeId) query = query.eq('theme_id', themeId);
      if (componentId) query = query.eq('component_id', componentId);
      var { data: existing } = await query;

      if (existing && existing.length > 0) {
        await sb.from('favorites').delete().eq('id', existing[0].id);
        return false; // removed
      } else {
        var insert = { user_id: user.id };
        if (themeId) insert.theme_id = themeId;
        if (componentId) insert.component_id = componentId;
        await sb.from('favorites').insert(insert);
        return true; // added
      }
    },

    // ========== CHECKOUT ==========

    getCheckoutUrl: async function(variantId) {
      var session = await sb.auth.getSession();
      var token = session.data.session?.access_token;
      if (!token) throw new Error('Please log in first');
      var res = await fetch('/api/v1/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ variant_id: variantId })
      });
      var data = await res.json();
      if (data.checkout_url) return data.checkout_url;
      throw new Error(data.error || 'Failed to create checkout');
    },

    // ========== INQUIRIES ==========

    submitInquiry: async function(name, email, category, subject, message) {
      var { data, error } = await sb.from('inquiries').insert({
        name: name, email: email, category: category || 'general',
        subject: subject || '', message: message
      });
      if (error) throw error;
      return true;
    },

    // ========== SUBSCRIPTION ==========

    getMySubscription: async function() {
      var user = await MergeDB.getUser();
      if (!user) return null;
      var { data, error } = await sb.from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      if (error) return null;
      return data;
    },

    getMyLicenseKey: async function() {
      var user = await MergeDB.getUser();
      if (!user) return null;
      var { data, error } = await sb.from('license_keys')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      if (error) return null;
      return data;
    },

    getMyOrders: async function() {
      var user = await MergeDB.getUser();
      if (!user) return [];
      var { data, error } = await sb.from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    // ========== RELEASES ==========

    getReleases: async function() {
      var { data, error } = await sb.from('releases')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  };

  // Supabase 준비 완료 이벤트
  document.dispatchEvent(new Event('mergedb-ready'));
}
