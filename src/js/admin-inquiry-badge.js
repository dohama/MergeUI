// admin-inquiry-badge.js
// admin 사이드바 "문의" 메뉴 옆에 미응답(open) 카운트 빨간 배지 표시
// 9개 admin 페이지에서 모두 import. inquiries.html 자체에서도 동작 가능 (자기 카운트).

(function() {
  'use strict';

  function setBadge(count) {
    var badge = document.getElementById('snb-inquiry-count');
    if (!badge) return;
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  async function loadCount() {
    try {
      if (typeof MergeDB === 'undefined' || !MergeDB.client) return;
      var res = await MergeDB.client
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');
      if (res.error) {
        console.warn('[inquiry-badge] count query failed:', res.error.message);
        return;
      }
      setBadge(res.count || 0);
    } catch (e) {
      console.warn('[inquiry-badge] error:', e && e.message);
    }
  }

  // mergedb-ready가 이미 발생했을 수도 있음 → 양쪽 모두 처리
  if (typeof MergeDB !== 'undefined' && MergeDB.client) {
    loadCount();
  } else {
    document.addEventListener('mergedb-ready', loadCount);
  }

  // inquiries.html에서 상태 변경 시 즉시 갱신할 수 있도록 글로벌 노출
  window.refreshInquiryBadge = loadCount;
})();
