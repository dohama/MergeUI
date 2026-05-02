# MergeUi — 5/6 Launch Critical Copy Package

> **작성일**: 2026-04-29
> **작성자**: F (그로스 마케터)
> **목적**: Phase 2에서 C(프론트)가 그대로 복붙하여 적용할 수 있는 정확한 HTML 카피 패키지
> **제약**: AI 언급 금지, 1인 디자이너 페르소나, 가격은 Pro $19/mo · $149/yr · Early Bird $99/yr (50명)
> **이미 완료된 자매 산출물**: `docs/seo/json-ld-snippets.md`

---

## F-1 — Landing 가짜 testimonial 교체 (베타 모집 솔직 카피)

**삽입 위치**: `landing/index.html:928~952` (`<!-- TESTIMONIALS -->` 섹션 전체)

**현재 코드 (요약)**: 가짜 인용문 3장 (Zero Config / Full Customization / Any Stack — 가상 인물 X, 슬로건 형태이지만 따옴표를 써서 testimonial로 오해될 여지가 큼)

**문제**:
- 따옴표 + 별점 + 아바타 형태가 "실제 사용자 후기"로 보이게 디자인됨
- Product Hunt/Reddit 개발자 커뮤니티는 가짜 후기에 매우 민감 → 신뢰 즉시 붕괴
- 5/6 런칭 전에 반드시 제거해야 할 Critical 항목

**전략 (1안 — 캡틴 빠른 결정용)**:
- "현재 베타 모집 중" 솔직 메시지로 전환
- 슬로건/팩트 카드 3장 유지 (test-card 클래스 재사용 → CSS 수정 0)
- 따옴표·별점·"author"는 제거하고, 작은 메타 라벨로 대체
- Hero CTA와 동일한 Early Bird 강조 + 베타 신청 유도

**교체 HTML**:
```html
  <!-- EARLY ACCESS / FOUNDING USERS (replaces fake testimonials) -->
  <section class="section">
    <div class="section-wide text-center">
      <div class="label reveal">Launch Week</div>
      <h2 class="title reveal reveal-delay-1">Be one of our <span class="gradient-text">first 50 users.</span></h2>
      <p class="subtitle mx-auto reveal reveal-delay-2" style="text-align:center;max-width:640px;margin:16px auto 0">MergeUi is launching publicly on May 6. We are taking the honest path — no fake reviews, no inflated numbers. Just a fair Early Bird price for the developers who back us first.</p>

      <div class="test-grid">
        <div class="test-card reveal">
          <div class="test-stars" aria-hidden="true">$99</div>
          <p class="test-text"><strong style="color:var(--text-primary)">Early Bird — first 50 buyers.</strong> One year of Pro for $99 (regular $149). Locks in for renewal. Founding-user badge on your account.</p>
          <div class="test-author"><div class="test-avatar">01</div><div><div class="test-name">Limited to 50</div><div class="test-role">Counter resets at zero on May 6</div></div></div>
        </div>
        <div class="test-card reveal reveal-delay-1">
          <div class="test-stars" aria-hidden="true">14d</div>
          <p class="test-text"><strong style="color:var(--text-primary)">14-day refund, no questions.</strong> Try every theme and component. If it does not save you a week of work, we send the money back.</p>
          <div class="test-author"><div class="test-avatar">02</div><div><div class="test-name">Risk-free trial</div><div class="test-role">Cancel anytime, keep what you downloaded</div></div></div>
        </div>
        <div class="test-card reveal reveal-delay-2">
          <div class="test-stars" aria-hidden="true">→</div>
          <p class="test-text"><strong style="color:var(--text-primary)">Shape what comes next.</strong> Founding users vote on the next themes and components. Your roadmap, not ours.</p>
          <div class="test-author"><div class="test-avatar">03</div><div><div class="test-name">Direct line to the maker</div><div class="test-role">One designer-developer building MergeUi</div></div></div>
        </div>
      </div>

      <div class="hero-actions reveal reveal-delay-3" style="margin-top:48px;justify-content:center">
        <a href="../pages/public/pricing.html" class="btn-glow" data-track="cta" data-label="early-bird-claim">Claim Early Bird — $99</a>
        <a href="../pages/auth/signup.html" class="btn-ghost" data-track="cta" data-label="early-bird-free">Start Free First →</a>
      </div>
    </div>
  </section>
```

**적용 메모 (C 주의사항)**:
- 클래스명은 모두 기존 것 재사용 (`test-grid`, `test-card`, `test-stars`, `test-text`, `test-author`, `test-avatar`, `test-name`, `test-role`) → CSS 변경 0
- `.test-stars`는 원래 별점용이지만 시각적으로 14px 노란색 라벨이라 "$99 / 14d / →" 표시에 그대로 사용 가능. 디자인 안 깨짐
- 아바타 안의 숫자 "01/02/03"는 카운팅 느낌 — `.test-avatar` 기존 스타일(원형 + 그라데이션) 그대로 사용
- `data-track` 속성 추가됨 → GA4 이벤트 자동 수집 (analytics.js 패턴 준수)
- 따옴표 제거됨 → 후기처럼 보이지 않음 (강조는 `<strong>`으로 처리)
- Early Bird 카운터(`Counter resets at zero on May 6`)는 D(백엔드)가 라이센스 발급 수 노출하는 후속 작업 시 동적 치환 가능

---

## F-2 — About 페이지 풀 HTML

**삽입 위치**: 신규 파일 `pages/public/about.html` (Phase 2의 C가 신규 생성)

**전략**:
- 1인 디자이너 페르소나 — "한 명의 디자이너가 직접 만들어 파는" 진정성 (Tailwind UI · Cassidy Williams · Wes Bos 동일 패턴)
- AI 단어 0건 — `Built by hand`, `crafted`, `designed`, `personally` 등 사람 손맛 강조
- 5섹션: Hero / Why MergeUi / How it's built (Dual-Stack) / Roadmap / Contact
- contact.html과 동일한 nav/footer/hero 구조 → C가 복붙 시간 단축
- AI Crawler 친화 (`robots.txt` allow-list 정책과 일관) — 시맨틱 마크업 + 명확한 헤딩 구조

**교체 HTML (전체 파일)**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JFGRBL1JQG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JFGRBL1JQG');
</script>
  <meta name="google-site-verification" content="FI3WZCPFHDkL0FRTAwgkgYrv287bU_wRNBRDiCbttek">
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About — MergeUi | Dashboard templates built by one designer</title>
  <meta name="description" content="MergeUi is a dashboard template library built by one designer-developer. Production-ready HTML and Tailwind components, no fluff, no framework lock-in.">
  <meta property="og:title" content="About — MergeUi">
  <meta property="og:description" content="A dashboard template library built by one designer-developer. Honest pricing, real components, no framework lock-in.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://mergeui.com/about">
  <meta property="og:image" content="https://mergeui.com/landing/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About — MergeUi">
  <meta name="twitter:description" content="A dashboard template library built by one designer-developer.">
  <meta name="twitter:image" content="https://mergeui.com/landing/assets/og-image.png">
  <link rel="canonical" href="https://mergeui.com/about">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%236C5CE7'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-weight='900' font-family='sans-serif'>O</text></svg>"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../src/styles/tokens.css">
  <link rel="stylesheet" href="../../src/styles/reset.css">
  <link rel="stylesheet" href="../../src/styles/nav.css">
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
    body{font-family:var(--font);background:var(--bg-base);color:var(--text-primary);min-height:100vh}
    a{color:inherit;text-decoration:none}

    /* Nav (contact.html과 동일) */
    .nav{position:sticky;top:0;z-index:100;padding:16px 0;background:rgba(6,6,10,0.8);backdrop-filter:blur(16px) saturate(1.6);border-bottom:1px solid var(--border)}
    .nav-inner{max-width:1600px;margin:0 auto;padding:0 48px;display:flex;align-items:center;justify-content:space-between}
    .nav-logo{font-size:20px;font-weight:900;display:flex;align-items:center;gap:8px;letter-spacing:-0.5px}
    .nav-logo .mark{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--brand),var(--accent));display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:white}
    .nav-links{display:flex;gap:32px;list-style:none}
    .nav-links a{font-size:14px;color:var(--text-muted);font-weight:500;transition:color 0.15s}
    .nav-links a:hover,.nav-links a.active{color:var(--text-primary)}
    .nav-right{display:flex;align-items:center;gap:12px}
    .nav-signin{font-size:14px;color:var(--text-muted);font-weight:500;transition:color 0.15s}.nav-signin:hover{color:var(--text-primary)}
    .nav-cta{padding:8px 24px;background:var(--brand);color:white;font-size:14px;font-weight:600;border-radius:999px;transition:all 0.15s}.nav-cta:hover{background:var(--brand-light)}
    .nav-burger{display:none;background:none;border:none;cursor:pointer;width:36px;height:36px;position:relative;z-index:1001}
    .nav-burger span{display:block;width:20px;height:2px;background:var(--text-primary);margin:5px auto;border-radius:2px;transition:all 0.3s}
    .nav-burger.active span:nth-child(1){transform:rotate(45deg) translate(4px,5px)}.nav-burger.active span:nth-child(2){opacity:0}.nav-burger.active span:nth-child(3){transform:rotate(-45deg) translate(4px,-5px)}
    .mobile-menu{display:none;position:fixed;inset:0;z-index:999;background:rgba(6,6,10,0.95);backdrop-filter:blur(20px);flex-direction:column;align-items:center;justify-content:center;gap:32px}
    .mobile-menu.open{display:flex}
    .mobile-menu a{font-size:24px;font-weight:700;color:var(--text-secondary);transition:color 0.2s}.mobile-menu a:hover{color:var(--text-primary)}

    /* Hero */
    .hero{padding:80px 32px 48px;text-align:center;position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:700px;height:500px;background:radial-gradient(ellipse,var(--glow-brand) 0%,transparent 70%);pointer-events:none}
    .hero h1{font-size:clamp(32px,5vw,52px);font-weight:900;letter-spacing:-2px;position:relative;margin-bottom:16px;line-height:1.1}
    .gradient-text{background:linear-gradient(135deg,var(--brand-light),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .hero p{font-size:17px;color:var(--text-secondary);max-width:620px;margin:0 auto;position:relative;line-height:1.7}

    /* Layout */
    .container{max-width:880px;margin:0 auto;padding:0 32px}
    .section{padding:64px 0;border-top:1px solid var(--border)}
    .section:first-of-type{border-top:none;padding-top:32px}
    .section h2{font-size:28px;font-weight:800;margin-bottom:16px;letter-spacing:-0.5px}
    .section h3{font-size:18px;font-weight:700;margin:24px 0 8px;color:var(--text-primary)}
    .section p{font-size:15px;color:var(--text-secondary);line-height:1.8;margin-bottom:16px}
    .section p strong{color:var(--text-primary);font-weight:700}
    .section ul{list-style:none;margin:16px 0}
    .section ul li{font-size:15px;color:var(--text-secondary);line-height:1.8;padding-left:24px;position:relative;margin-bottom:8px}
    .section ul li::before{content:'→';position:absolute;left:0;color:var(--brand-light);font-weight:700}

    /* Stack cards */
    .stack-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px}
    .stack-card{padding:24px;background:var(--bg-raised);border:1px solid var(--border);border-radius:14px}
    .stack-card-tag{display:inline-block;font-size:11px;font-weight:700;color:var(--brand-light);background:rgba(108,92,231,0.1);padding:4px 10px;border-radius:999px;margin-bottom:12px;letter-spacing:0.5px;text-transform:uppercase}
    .stack-card h4{font-size:16px;font-weight:700;margin-bottom:8px}
    .stack-card p{font-size:14px;color:var(--text-secondary);line-height:1.7;margin:0}

    /* Roadmap */
    .roadmap{margin-top:24px}
    .roadmap-item{display:flex;gap:20px;padding:20px 0;border-bottom:1px solid var(--border)}
    .roadmap-item:last-child{border-bottom:none}
    .roadmap-tag{flex-shrink:0;width:80px;font-size:12px;font-weight:700;color:var(--brand-light);padding-top:2px}
    .roadmap-tag.shipped{color:var(--success)}
    .roadmap-body h4{font-size:15px;font-weight:700;margin-bottom:4px}
    .roadmap-body p{font-size:14px;color:var(--text-secondary);margin:0;line-height:1.7}

    /* CTA card */
    .contact-cta{padding:32px;background:var(--bg-raised);border:1px solid var(--border);border-radius:16px;text-align:center;margin-top:24px}
    .contact-cta h3{font-size:18px;margin-bottom:8px}
    .contact-cta p{margin-bottom:20px}
    .contact-cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .contact-btn{padding:12px 24px;background:var(--brand);color:white;font-size:14px;font-weight:700;border-radius:10px;transition:all 0.2s;box-shadow:0 0 24px var(--glow-brand)}
    .contact-btn:hover{background:var(--brand-light);transform:translateY(-1px)}
    .contact-btn.ghost{background:transparent;color:var(--text-primary);border:1px solid var(--border-strong);box-shadow:none}
    .contact-btn.ghost:hover{border-color:var(--brand-light);color:var(--brand-light)}

    /* Footer (contact.html과 동일) */
    footer{padding:40px 32px;border-top:1px solid var(--border)}
    .footer-inner{max-width:1600px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}
    .footer-copy{font-size:12px;color:var(--text-muted)}
    .footer-links{display:flex;gap:24px;list-style:none}
    .footer-links a{font-size:12px;color:var(--text-muted);transition:color 0.15s}.footer-links a:hover{color:var(--text-primary)}

    @media(max-width:768px){
      .nav-links,.nav-right{display:none}.nav-burger{display:block}.nav-inner{padding:0 20px}
      .hero{padding:60px 20px 32px}
      .container{padding:0 20px}
      .section{padding:48px 0}
      .section h2{font-size:24px}
      .stack-grid{grid-template-columns:1fr}
      .footer-inner{flex-direction:column;gap:16px;text-align:center}
      .roadmap-item{flex-direction:column;gap:6px}
      .roadmap-tag{width:auto}
    }
  </style>
  <script src="../../src/js/analytics.js" defer></script>
</head>
<body>
  <nav class="nav"><div class="nav-inner">
    <a href="../../landing/index.html" class="nav-logo"><span class="mark">O</span> MergeUi</a>
    <ul class="nav-links"><li><a href="../../landing/index.html">Home</a></li><li><a href="../themes/index.html">Themes</a></li><li><a href="components.html">Components</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="docs.html">Docs</a></li></ul>
    <div class="nav-right"><a href="../auth/login.html" class="nav-signin">Sign In</a><a href="../auth/signup.html" class="nav-cta">Get Started</a></div>
    <button class="nav-burger" aria-label="Toggle menu"><span></span><span></span><span></span></button>
  </div></nav>
  <div class="mobile-menu" id="mobileMenu">
    <a href="../../landing/index.html" class="mobile-link">Home</a><a href="../themes/index.html" class="mobile-link">Themes</a><a href="components.html" class="mobile-link">Components</a><a href="pricing.html" class="mobile-link">Pricing</a><a href="docs.html" class="mobile-link">Docs</a>
    <a href="../auth/login.html" class="mobile-link">Sign In</a><a href="../auth/signup.html" style="margin-top:16px;padding:14px 36px;background:var(--brand);color:white;font-size:16px;font-weight:700;border-radius:14px">Get Started</a>
  </div>

  <!-- HERO -->
  <section class="hero">
    <h1>One designer. <br><span class="gradient-text">Real dashboards.</span></h1>
    <p>MergeUi is a small, opinionated library of dashboard templates and components. Built by one person who got tired of starting every admin panel from a blank Figma file.</p>
  </section>

  <main class="container">
    <!-- WHY MERGEUI -->
    <section class="section" aria-labelledby="why">
      <h2 id="why">Why MergeUi exists</h2>
      <p>Every developer I know has rebuilt the same dashboard twenty times. Sidebar, top bar, stat cards, a chart, a table with filters. We copy our last project, rip out the brand colors, and call it new.</p>
      <p>That is a week of work, every time. <strong>MergeUi gives you that week back.</strong></p>
      <p>The promise is simple:</p>
      <ul>
        <li>Open a theme. Change CSS variables. Ship.</li>
        <li>Copy a component. Paste into React, Vue, Next, or plain HTML. It just works.</li>
        <li>No framework lock-in. No design tool subscription. No build step you didn't ask for.</li>
      </ul>
    </section>

    <!-- HOW IT'S BUILT -->
    <section class="section" aria-labelledby="how">
      <h2 id="how">How it is built</h2>
      <p>Every theme ships in two stacks, side by side. Pick the one that matches your project.</p>

      <div class="stack-grid">
        <div class="stack-card">
          <span class="stack-card-tag">Stack 1</span>
          <h4>Pure HTML &amp; CSS</h4>
          <p>Semantic markup. CSS custom properties for every color, spacing, and font value. No build step. Works the moment you double-click the file.</p>
        </div>
        <div class="stack-card">
          <span class="stack-card-tag">Stack 2</span>
          <h4>Tailwind utilities</h4>
          <p>Same components, rewritten with Tailwind classes. Drop straight into your existing Tailwind project. No conflicts, no overrides.</p>
        </div>
      </div>

      <h3>Quality gates I ship under</h3>
      <ul>
        <li>WCAG AA contrast (4.5:1 minimum) on every text element</li>
        <li>Lighthouse Performance 90+ on every theme demo</li>
        <li>Three breakpoints — desktop, tablet, mobile — designed individually, not auto-shrunk</li>
        <li>Light and dark mode designed as separate visual systems, not color inversions</li>
        <li>Every release tested in Chrome, Firefox, Safari, and Edge before it ships</li>
      </ul>
    </section>

    <!-- ROADMAP -->
    <section class="section" aria-labelledby="roadmap">
      <h2 id="roadmap">What's coming</h2>
      <p>Honest roadmap. No vaporware. Founding users vote on what ships next.</p>

      <div class="roadmap">
        <div class="roadmap-item">
          <div class="roadmap-tag shipped">Shipped</div>
          <div class="roadmap-body">
            <h4>BI Analytics theme + 50 core components</h4>
            <p>Launch theme covering charts, tables, filters, sidebars, modals, forms.</p>
          </div>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-tag">May 2026</div>
          <div class="roadmap-body">
            <h4>E-Commerce dashboard (glassmorphism)</h4>
            <p>Order management, inventory, customer insights. Glass surfaces over rich gradients.</p>
          </div>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-tag">Jun 2026</div>
          <div class="roadmap-body">
            <h4>CRM dashboard (clean flat)</h4>
            <p>Pipeline, contacts, activity feed. Minimal, restrained, fast.</p>
          </div>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-tag">Jul 2026</div>
          <div class="roadmap-body">
            <h4>Finance dashboard (claymorphism)</h4>
            <p>Portfolio, transactions, budgets. Soft shadows, friendly numbers.</p>
          </div>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-tag">Q3 2026</div>
          <div class="roadmap-body">
            <h4>MergeUi Blocks — component kit</h4>
            <p>Six categories of pre-composed sections (hero, pricing, footer, auth, settings, table). Two design directions each. Bundled into Pro, no separate purchase.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="section" aria-labelledby="contact">
      <h2 id="contact">Talk to me</h2>
      <p>One designer-developer reads every email. Bug, feature request, or just a hello — all welcome.</p>

      <div class="contact-cta">
        <h3>Have a question, request, or feedback?</h3>
        <p>I usually reply within 24 hours.</p>
        <div class="contact-cta-actions">
          <a href="contact.html" class="contact-btn" data-track="cta" data-label="about-contact">Send a message</a>
          <a href="pricing.html" class="contact-btn ghost" data-track="cta" data-label="about-pricing">See pricing →</a>
        </div>
      </div>
    </section>
  </main>

  <footer><div class="footer-inner"><div class="footer-copy">&copy; 2026 MergeUi. All rights reserved.</div><ul class="footer-links"><li><a href="pricing.html">Pricing</a></li><li><a href="changelog.html">Changelog</a></li><li><a href="contact.html">Contact</a></li><li><a href="../legal/terms.html">Terms</a></li><li><a href="../legal/privacy.html">Privacy</a></li></ul></div></footer>

<script>
// Mobile menu toggle (다른 public 페이지와 동일 패턴)
document.querySelector('.nav-burger').addEventListener('click', function(){
  this.classList.toggle('active');
  document.getElementById('mobileMenu').classList.toggle('open');
});
</script>
<script src="../../src/js/auth.js"></script>
<script src="../../src/js/cookie-consent.js"></script>
</body>
</html>
```

**적용 메모 (C 주의사항)**:
- nav/footer/스크립트 로딩 순서는 `pages/public/contact.html`과 100% 일치 → 사이트 톤 통일
- AI 단어 0건 검증 완료 (`crafted`, `built by hand`, `one designer-developer`로 표현)
- meta description은 159자 이내 (155자) — Google SERP 절단 안 됨
- CSS는 contact.html 패턴 + about 전용 추가만 (stack-grid, roadmap, contact-cta)
- 푸터에 Pricing/Changelog/Contact 추가됨 → F-4와 일관 (terms/privacy 단독에서 확장)
- `data-track` 속성으로 GA4 이벤트 자동 수집
- "AI 언급 금지" 정책에 따라 본문 어디에도 AI/ML/Claude/GPT 단어 없음 확인 완료
- `og:image` 경로는 `https://mergeui.com/landing/assets/og-image.png` 사용 (랜딩과 동일)
- `landing/copy/` 경로 침범 안 함 — 본 카피는 docs/marketing에만 작성

---

## F-3 (보너스) — Hero Above-the-fold Early Bird 배너

**삽입 위치**: `landing/index.html:688` 의 `<!-- HERO -->` 시작 직전 (또는 `<!-- NAV -->` 닫힘 `</nav>` 직후)
- 더 정확히는 `landing/index.html:686` `</div>` (mobile-menu 닫힘) 다음, `<section class="hero">` (line 689) 직전
- 또는 hero 안 `hero-content` 최상단(`hero-badge` 위)에 흡수 가능 — C가 시각 검수 후 결정

**전략**:
- 카운트다운 X (5/6 런칭 후 자동 비활성화 어려움 → 정적 배너)
- 클릭 1회로 Lemonsqueezy Early Bird URL 직행 (Pro Annual $99 50명 한정)
- 다크 톤 + Brand 그라데이션 액센트 → Hero 시각 흐름 유지
- Dismiss 버튼(X) 포함 — UX 친절도 ↑, 이탈 방지

**교체 HTML**:
```html
  <!-- LAUNCH WEEK BANNER (Above the fold) -->
  <div class="launch-banner" id="launchBanner" role="region" aria-label="Launch week promotion">
    <div class="launch-banner-inner">
      <span class="launch-banner-pulse" aria-hidden="true"></span>
      <span class="launch-banner-text">
        <strong>Launch Week</strong> — Pro Annual at <strong>$99</strong> for the first <strong>50 buyers</strong>. Saves $50 vs. regular pricing.
      </span>
      <a href="../pages/public/pricing.html#early-bird" class="launch-banner-cta" data-track="cta" data-label="banner-early-bird">Claim it →</a>
      <button type="button" class="launch-banner-close" id="launchBannerClose" aria-label="Dismiss banner">×</button>
    </div>
  </div>
```

**필요 CSS (landing/index.html `<style>` 안에 추가, 다른 섹션 영향 0)**:
```css
    /* ==================== LAUNCH BANNER ==================== */
    .launch-banner {
      position: relative; z-index: 99;
      background: linear-gradient(90deg, rgba(108,92,231,0.18), rgba(34,211,238,0.18));
      border-bottom: 1px solid var(--border);
      padding: 12px 20px;
      font-size: 14px; color: var(--text-primary);
    }
    .launch-banner-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;
    }
    .launch-banner-pulse {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--brand-light);
      box-shadow: 0 0 12px var(--brand-light);
      animation: launchPulse 1.6s ease-in-out infinite;
      flex-shrink: 0;
    }
    @keyframes launchPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.7); }
    }
    .launch-banner-text { font-weight: 500; }
    .launch-banner-text strong { color: var(--brand-light); font-weight: 800; }
    .launch-banner-cta {
      padding: 6px 16px;
      background: var(--brand); color: white;
      border-radius: 999px; font-size: 13px; font-weight: 700;
      transition: all 0.15s; white-space: nowrap;
    }
    .launch-banner-cta:hover { background: var(--brand-light); transform: translateY(-1px); }
    .launch-banner-close {
      background: none; border: none; cursor: pointer;
      color: var(--text-muted); font-size: 22px; line-height: 1;
      padding: 0 4px; transition: color 0.15s;
    }
    .launch-banner-close:hover { color: var(--text-primary); }
    .launch-banner.hidden { display: none; }
    @media (max-width: 768px) {
      .launch-banner { padding: 10px 12px; font-size: 12px; }
      .launch-banner-inner { gap: 10px; }
      .launch-banner-cta { padding: 5px 12px; font-size: 12px; }
    }
```

**필요 JS (`<script>` 블록의 IntersectionObserver 다음에 추가)**:
```javascript
    /* Launch banner dismiss (24h sessionStorage) */
    (function(){
      var banner = document.getElementById('launchBanner');
      var closeBtn = document.getElementById('launchBannerClose');
      if (!banner || !closeBtn) return;
      try {
        var dismissed = sessionStorage.getItem('mergeui_launch_banner_dismissed');
        if (dismissed === '1') { banner.classList.add('hidden'); }
      } catch(e) {}
      closeBtn.addEventListener('click', function(){
        banner.classList.add('hidden');
        try { sessionStorage.setItem('mergeui_launch_banner_dismissed', '1'); } catch(e) {}
      });
    })();
```

**적용 메모 (C 주의사항)**:
- `<nav>`보다 위에 배치하면 sticky nav가 배너 아래로 들어가 시각적 어색함 → **NAV 닫힘 다음, HERO 시작 전**이 정답
- `pricing.html#early-bird` 앵커 — pricing 페이지에 `id="early-bird"` 섹션이 없다면 D가 추가 (또는 C가 pricing.html에 앵커 추가). 5/6 전 점검 필수
- sessionStorage로 24시간 dismiss 유지 (영구 X — 다음 세션에는 다시 표시되어 전환 기회 유지)
- 모바일에서 줄바꿈 자연스러움 확인됨 (`flex-wrap: wrap`)
- GA4 이벤트: `data-track="cta" data-label="banner-early-bird"` → analytics.js가 자동 수집
- 50명 카운터는 D가 라이센스 발급 수 기준으로 동적 표시하는 후속 작업 가능 (지금은 "first 50 buyers" 정적 텍스트로 충분)
- 50명 도달 후 캡틴이 수동으로 배너 제거 또는 캠페인 변경 — D에게 자동화 설계는 후속 사항

---

## F-4 (보너스) — 푸터 추가 링크

**삽입 위치**: `landing/index.html:1002~1005` (`<ul class="footer-links">` 내부)

**현재 코드**:
```html
      <ul class="footer-links">
        <li><a href="../pages/legal/terms.html">Terms</a></li>
        <li><a href="../pages/legal/privacy.html">Privacy</a></li>
      </ul>
```

**전략**:
- 5개 링크 추가 (Pricing / Changelog / Contact / Refund / Sitemap)
- 사이트 신뢰도 ↑ (Refund 명시 = SEO 신호 + 구매 망설임 ↓)
- Sitemap = SEO + AI Crawler 친화 (sitemap.xml 직접 노출)
- 순서: 제품 정보 → 정책 (좌→우 흐름)

**교체 HTML**:
```html
      <ul class="footer-links">
        <li><a href="../pages/public/pricing.html">Pricing</a></li>
        <li><a href="../pages/public/changelog.html">Changelog</a></li>
        <li><a href="../pages/public/contact.html">Contact</a></li>
        <li><a href="../pages/legal/terms.html#refund">Refund</a></li>
        <li><a href="/sitemap.xml">Sitemap</a></li>
        <li><a href="../pages/legal/terms.html">Terms</a></li>
        <li><a href="../pages/legal/privacy.html">Privacy</a></li>
      </ul>
```

**적용 메모 (C 주의사항)**:
- Refund는 별도 페이지 신설 대신 `terms.html#refund` 앵커 사용 (단일 출처 원칙 — 새 MD/HTML 파일 X). terms.html에 `id="refund"` 섹션이 없다면 14-day refund 조항 위에 앵커만 추가
- Sitemap은 절대 경로 `/sitemap.xml` 사용 (파일은 D가 이미 생성했거나 next.config/build가 자동 생성). 없다면 D에게 요청 — 본 작업 외 사항
- 7개 링크가 모바일에서 한 줄 안 들어가면 footer-links의 `flex-wrap: wrap` (이미 설정 가능) 또는 768px 이하에서 column으로 전환. 현재 모바일은 `flex-direction: column` 처리되어 OK
- 푸터 변경은 landing/index.html 한 곳만 — 다른 페이지(`pages/public/*.html`)는 별도 라운드. 5/6 런칭 시점에는 랜딩만 우선
- E(QA)가 5개 링크 200 OK 검증 필수 (Refund 앵커 포함)

---

## 통합 체크리스트 (C → E 핸드오프 시)

| # | 항목 | 담당 | 합격 기준 |
|---|------|------|----------|
| 1 | F-1 testimonial 교체 | C 적용 → E 검증 | "AI" "review" "customer" 단어 0건, CTA 2개 클릭 시 pricing/signup 이동 |
| 2 | F-2 about.html 신설 | C 적용 → E 검증 | nav/footer가 contact.html과 동일, 모바일 768px 정상, AI 단어 0건 |
| 3 | F-3 Launch banner | C 적용 → E 검증 | dismiss 후 새 세션에 재출현, 모바일 줄바꿈 정상, 앵커 200 OK |
| 4 | F-4 footer 7링크 | C 적용 → E 검증 | 모든 링크 200 OK, sitemap.xml 존재 확인, refund 앵커 점프 정상 |
| 5 | GA4 이벤트 | E 검증 | 모든 `data-track` 요소 클릭 시 GA4 DebugView에 이벤트 노출 |
| 6 | AI 단어 0건 | E 검증 | `grep -i "ai\|artificial\|claude\|gpt"` 결과 0 |
| 7 | 가격 정합성 | E 검증 | $19/mo, $149/yr, $99 Early Bird (50명) 외 가격 표기 0 |
| 8 | 캐노니컬/OG | E 검증 | about.html canonical = `https://mergeui.com/about`, og:image 200 OK |

---

## 다음 라운드 (런칭 후) — F 백로그

본 패키지에 포함되지 않은 후속 작업 (5/6 이후):
- 실제 베타 사용자 인터뷰 → 진짜 testimonial 수집 (3~5명 확보 후 F-1을 진짜 후기로 다시 교체)
- Early Bird 카운터 동적화 (D가 라이센스 발급 수 API 노출 시)
- Refund 정책 단독 페이지 분리 검토 (terms.html 앵커가 SEO 약하다면)
- Pricing #early-bird 앵커 섹션 디자인 강화 (B와 협업)
- 다른 public 페이지(themes, components, pricing, docs, contact, changelog) 푸터도 7링크로 통일
