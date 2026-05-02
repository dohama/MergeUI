/**
 * MergeUi — Mobile sidebar drawer
 * admin + subscriber 페이지 공통.
 *
 * - 768px 이하에서 .topbar 좌측에 햄버거 버튼 자동 주입
 * - 클릭 시 .sidebar 슬라이드 인 + .sb-overlay 표시
 * - 오버레이 클릭, ESC, 메뉴 항목 클릭 시 닫힘
 *
 * 데스크톱 동작에는 영향 없음 (CSS @media 768px 가드).
 */
(function () {
  'use strict';

  function init() {
    var sidebar = document.querySelector('.sidebar');
    var topbar = document.querySelector('.topbar');
    if (!sidebar || !topbar) return;

    // 이미 주입된 경우 중복 방지
    if (topbar.querySelector('.sb-burger')) return;

    // 햄버거 버튼 생성
    var burger = document.createElement('button');
    burger.type = 'button';
    burger.className = 'sb-burger';
    burger.setAttribute('aria-label', 'Open menu');
    burger.setAttribute('aria-controls', 'merge-sidebar');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<line x1="3" y1="6" x2="21" y2="6"/>' +
      '<line x1="3" y1="12" x2="21" y2="12"/>' +
      '<line x1="3" y1="18" x2="21" y2="18"/>' +
      '</svg>';

    // sidebar에 id 부여 (aria-controls 연결)
    if (!sidebar.id) sidebar.id = 'merge-sidebar';

    // topbar 구조 보존 — topbar-left 그룹이 있으면 그 앞, 없으면 첫 자식 앞에 삽입
    var topbarLeft = topbar.querySelector('.topbar-left');
    if (topbarLeft) {
      topbarLeft.parentNode.insertBefore(burger, topbarLeft);
    } else {
      topbar.insertBefore(burger, topbar.firstChild);
    }

    // 오버레이 생성
    var overlay = document.createElement('div');
    overlay.className = 'sb-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    function open() {
      sidebar.classList.add('is-open');
      overlay.classList.add('is-visible');
      document.body.classList.add('sb-drawer-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
    }

    function close() {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      document.body.classList.remove('sb-drawer-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    }

    function toggle() {
      if (sidebar.classList.contains('is-open')) close();
      else open();
    }

    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });

    overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) close();
    });

    // 메뉴 항목 클릭 시 자동 닫기 (모바일에서 페이지 이동 직후 안정성)
    sidebar.addEventListener('click', function (e) {
      var link = e.target.closest('a.sb-item, a.sb-logo');
      if (!link) return;
      // href가 같은 페이지가 아니라면 닫힘 처리 (페이지 이동 전 깔끔하게)
      close();
    });

    // 데스크톱으로 리사이즈 시 상태 정리
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
