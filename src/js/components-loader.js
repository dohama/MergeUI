// 컴포넌트 로더 — DB 우선 + 정적 fallback 분리
// 작성: C(프론트) | 2026-05-01 (D-5)
// 사용처: pages/public/components.html, pages/public/components-detail.html
//
// 호출 흐름:
//   1) MergeDB(supabase) 준비되면 components_public_view 에서 SELECT
//   2) 응답이 0건이거나 에러면 window.MERGEUI_COMPONENTS_FALLBACK 사용
//   3) DOM 이벤트 'mergeui-components-loaded' 발사 + detail.source = 'db' | 'fallback'
//
// detail.html 에서는 loadComponentBySlug(slug) 사용:
//   - DB get_component_code RPC → fallback 매칭 → "Component not found"

(function(){
  if (window.MergeComponentsLoader) return;

  function getFallback(){
    return Array.isArray(window.MERGEUI_COMPONENTS_FALLBACK)
      ? window.MERGEUI_COMPONENTS_FALLBACK
      : [];
  }

  function emit(name, detail){
    try { document.dispatchEvent(new CustomEvent(name, { detail: detail })); }
    catch(e){ /* IE 미지원 — 무시 */ }
  }

  // 카탈로그 (목록) 로드
  function loadAll(){
    var fallback = getFallback();

    function fail(reason){
      emit('mergeui-components-loaded', { source:'fallback', reason: reason, items: fallback });
      return Promise.resolve(fallback);
    }

    if (!window.MergeDB || !window.MergeDB.client) return fail('no-merge-db');

    return window.MergeDB.client
      .from('components_public_view')
      .select('id,slug,name,description,category,badge,version,preview_html,is_public,created_at,updated_at')
      .eq('is_public', true)
      .order('name')
      .then(function(res){
        if (res.error) return fail('db-error:' + res.error.message);
        var data = res.data || [];
        if (data.length === 0) return fail('db-empty');
        emit('mergeui-components-loaded', { source:'db', items: data });
        return data;
      })
      .catch(function(e){ return fail('exception:' + (e && e.message)); });
  }

  // 단일 컴포넌트 (상세 + 코드) 로드
  // 반환: { meta, code: { code_html, code_css, locked }, source }
  function loadBySlug(slug){
    if (!slug) return Promise.resolve(null);
    var fallback = getFallback();
    var fbItem = fallback.find(function(c){ return c.slug === slug; }) || null;

    if (!window.MergeDB || !window.MergeDB.client) {
      return Promise.resolve(fbItem ? wrapFallback(fbItem) : null);
    }
    var sb = window.MergeDB.client;

    // 메타 + 코드 둘 다 RPC 한 번 + view 한 번으로 처리
    return Promise.all([
      sb.from('components_public_view').select('*').eq('slug', slug).maybeSingle(),
      sb.rpc('get_component_code', { p_slug: slug })
    ]).then(function(results){
      var metaRes = results[0];
      var codeRes = results[1];
      var meta = metaRes && metaRes.data;
      var codeRow = codeRes && Array.isArray(codeRes.data) ? codeRes.data[0] : (codeRes && codeRes.data);

      if (!meta && !codeRow) {
        // DB 둘 다 실패 → fallback
        return fbItem ? wrapFallback(fbItem) : null;
      }
      return {
        meta: meta || (fbItem && fbToMeta(fbItem)),
        code: {
          code_html: (codeRow && codeRow.code_html) || (meta && meta.code_html) || (fbItem && fbItem.code_html) || '',
          code_css:  (codeRow && codeRow.code_css)  || (meta && meta.code_css)  || (fbItem && fbItem.code_css)  || '',
          locked:    !!(codeRow && codeRow.locked)
        },
        source: 'db'
      };
    }).catch(function(){
      return fbItem ? wrapFallback(fbItem) : null;
    });
  }

  function fbToMeta(c){
    return {
      slug: c.slug, name: c.name, description: c.description,
      category: c.category, badge: c.badge,
      preview_html: c.preview_html, is_public: true
    };
  }
  function wrapFallback(c){
    // 정적 fallback 에서는 code_html/css 가 비어있을 수 있으므로 lock 판정은 클라이언트 세션 기준
    var session = {};
    try { session = JSON.parse(localStorage.getItem('mergeui_session') || '{}'); } catch(e){}
    var isPro = session && session.plan === 'pro';
    var locked = c.badge === 'pro' && !isPro;
    return {
      meta: fbToMeta(c),
      code: {
        code_html: locked ? '' : (c.code_html || ''),
        code_css:  locked ? '' : (c.code_css  || ''),
        locked: locked
      },
      source: 'fallback'
    };
  }

  window.MergeComponentsLoader = {
    loadAll: loadAll,
    loadBySlug: loadBySlug,
    getFallback: getFallback
  };
})();
