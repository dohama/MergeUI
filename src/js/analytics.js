/* ============================================
   MergeUi Analytics — GA4 + 커스텀 이벤트 트래킹
   F(그로스) 정의 핵심 이벤트
   ============================================ */

// GA4 Measurement ID — .env 또는 백엔드에서 주입 예정
// 런칭 전 실제 ID로 교체 필요
window.MERGE_GA_ID = window.MERGE_GA_ID || 'G-XXXXXXXXXX';

// gtag 초기화
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', window.MERGE_GA_ID);

// GA4 스크립트 동적 로드
(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.MERGE_GA_ID;
  document.head.appendChild(s);
})();

/* ============================================
   커스텀 이벤트 트래킹 헬퍼
   ============================================ */

window.OozeTrack = {
  // CTA 클릭
  cta: function(label, location) {
    gtag('event', 'cta_click', {
      event_label: label,
      event_location: location || document.title
    });
  },

  // 가격표 조회
  pricingView: function(plan) {
    gtag('event', 'pricing_view', {
      plan_type: plan || 'all'
    });
  },

  // 월간/연간 토글
  billingToggle: function(period) {
    gtag('event', 'billing_toggle', {
      billing_period: period
    });
  },

  // 회원가입 시작
  signupStart: function(method) {
    gtag('event', 'sign_up_start', {
      method: method || 'email'
    });
  },

  // 회원가입 완료
  signupComplete: function(method) {
    gtag('event', 'sign_up', {
      method: method || 'email'
    });
  },

  // 테마 데모 클릭
  themeDemo: function(themeName) {
    gtag('event', 'theme_demo_click', {
      theme_name: themeName
    });
  },

  // 테마 다운로드
  themeDownload: function(themeName, version) {
    gtag('event', 'theme_download', {
      theme_name: themeName,
      theme_version: version || ''
    });
  },

  // 컴포넌트 코드 복사
  codeCopy: function(componentName) {
    gtag('event', 'code_copy', {
      component_name: componentName
    });
  },

  // Pro 업그레이드 유도 클릭
  upgradePrompt: function(location) {
    gtag('event', 'upgrade_prompt_click', {
      event_location: location || document.title
    });
  },

  // 결제 시작
  checkoutStart: function(plan, price) {
    gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: price,
      items: [{ item_name: plan }]
    });
  },

  // 결제 완료
  purchase: function(plan, price, orderId) {
    gtag('event', 'purchase', {
      currency: 'USD',
      value: price,
      transaction_id: orderId,
      items: [{ item_name: plan }]
    });
  },

  // 페이지 섹션 스크롤 도달
  sectionView: function(sectionName) {
    gtag('event', 'section_view', {
      section_name: sectionName
    });
  },

  // 문의 제출
  contactSubmit: function(category) {
    gtag('event', 'contact_submit', {
      inquiry_category: category || 'general'
    });
  }
};

/* ============================================
   자동 트래킹 — data-track 속성 기반
   사용법: <button data-track="cta" data-label="Get Started">
   ============================================ */
document.addEventListener('click', function(e) {
  var el = e.target.closest('[data-track]');
  if (!el) return;

  var type = el.getAttribute('data-track');
  var label = el.getAttribute('data-label') || el.textContent.trim().substring(0, 50);

  switch(type) {
    case 'cta':
      OozeTrack.cta(label);
      break;
    case 'theme-demo':
      OozeTrack.themeDemo(label);
      break;
    case 'download':
      OozeTrack.themeDownload(label);
      break;
    case 'code-copy':
      OozeTrack.codeCopy(label);
      break;
    case 'upgrade':
      OozeTrack.upgradePrompt(label);
      break;
    default:
      gtag('event', type, { event_label: label });
  }
});
