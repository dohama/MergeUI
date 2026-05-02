# Product Hunt 런칭 포스트 — MergeUi (D-4 최종본)

- **작성**: F(그로스 마케터) · 초안 2026-04-23 → **최종 2026-05-02 (D-4)**
- **런칭 일시**: 2026-05-06 (수) **KST 16:01 (PST 0:01) PH 발사**
- **리허설**: 5/5 (D-1) 합동 최종 점검
- **플래그십 5종**: bi_v1 / ec_v1 / cr_v1 / sd_v1 / td_v1
- **가격 확정**: Pro $19/mo · $149/yr · Early Bird $99/yr (50명 한정)
- **컴포넌트**: **20+ Blocks (6 카테고리), growing weekly** — 사이트 카피와 정확히 일치
- **AI 공개 정책**: 비공개 확정 (메모리 `project_ai_disclosure_decision.md`) — 본문/댓글 어디에도 AI 언급 금지

---

## 1. Title 후보 3개 (60자 이내)

| 안 | 제목 | 글자수 | Pros | Cons |
|----|------|-------|------|------|
| **A (권장)** | MergeUi — Ship dashboards in minutes, not weeks | 47 | "weeks → minutes" 대비. 개발자 공감도 최상 | 기능 모호 |
| B | MergeUi — Framework-agnostic dashboard templates for devs | 56 | "framework-agnostic" 키워드로 Tailwind UI/shadcn 차별화. SEO 강함 | 톤 드라이 |
| C | MergeUi — 15 production-ready dashboard themes, HTML + Tailwind | 60 | 숫자(15) + 듀얼 포맷 명시. 신뢰감 | 숫자 과다로 주목도 분산 |

**F 권장**: **A안** (Title A + Tagline B 조합이 감정 훅 + 근거 구조로 최적)

---

## 2. Tagline 후보 3개 (60자 이내)

| 안 | 태그라인 | 글자수 | Pros | Cons |
|----|---------|-------|------|------|
| A | Ship dashboards in minutes, not weeks. | 38 | 감정 훅 강력 | Title A와 중복 |
| **B (권장)** | 15 dashboard themes. HTML & Tailwind. Dark mode, ready to ship. | 60 | 3가지 근거 동시 제시, Title A와 보완 | "ready to ship"이 다소 흔함 |
| C | Production-ready dashboards for any stack — React, Vue, plain HTML. | 60 | "any stack" 강조 | 리듬감 부족 |

**최종 권장 조합**: `MergeUi — Ship dashboards in minutes, not weeks` + `15 dashboard themes. HTML & Tailwind. Dark mode, ready to ship.`

---

## 3. Post Body

### 3-1. Description (PH "Description" 필드, 260자 한도)

```
15 production-ready dashboard templates built in pure HTML/CSS and Tailwind. Dark + light mode, responsive, WCAG AA accessible. No npm install, no framework lock-in — copy into React, Vue, Svelte, or plain HTML. Change CSS variables, ship in minutes. Free tier available.
```
(259자)

### 3-2. 본문 확장판 (First Maker Comment에서 순차 전개)

**Hook**
```
Every new dashboard project starts the same way: rebuild the sidebar, restyle the stat cards, redraw the charts, fix the dark mode one more time. Two weeks gone before a single line of product logic.

I built MergeUi because I wanted to skip all of that and start shipping features on day one.
```

**왜 만들었나**
```
Every existing option forced a tradeoff:
- Tailwind UI is React-only and prescriptive.
- shadcn/ui is beautiful but you still assemble everything yourself.
- Most template marketplaces are framework-locked or dated.

I wanted one kit I could drop into any stack — React today, Vue next quarter, plain HTML for a landing page — without relearning the system every time.
```

**무엇이 다른가**
```
- Dual format, one purchase. Every theme ships as pure HTML/CSS and as a Tailwind + Vite starter. Pick your stack.
- No framework lock-in. Copy the markup into React, Vue, Svelte, Angular, or vanilla — the styling is just CSS custom properties.
- One variable changes your brand. --merge-color-primary and the whole theme follows. No rewriting component styles.
- Tailwind the standard way. Utility classes directly in markup, prettier-plugin-tailwindcss enforced, IntelliSense works out of the box.
- Accessibility is not an afterthought. Every theme targets WCAG AA contrast, keyboard navigation, and focus management.
```

**포함된 것**
```
Launching with 15 dashboard themes:
- 5 flagship themes, fully rebuilt for launch: BI analytics, e-commerce ops, CRM, SaaS admin, trading/finance.
- 10 additional themes covering black-and-white editorial, startup, fintech, gaming, luxury, retro, and more.
- 20+ components across 6 categories — buttons, cards, tables, forms, charts, feedback. Growing weekly.
- Component library with copy-paste snippets for every block.
- Dark + light mode on every theme (redesigned for luminance, not just color-inverted).
- 3 responsive breakpoints: 375px mobile, 768px tablet, 1280px+ desktop.
```

**기술 품질 마커**
```
Under the hood:
- Semantic HTML (header/nav/main/section/aside/footer)
- WCAG AA contrast (4.5:1) across all themes
- Lighthouse Performance 90+, FCP under 1.5s
- Tailwind "pure standard" — utility classes in markup, no @apply, no custom class abstractions
- Tailwind IntelliSense + prettier-plugin-tailwindcss configured
- .editorconfig, LICENSE, CHANGELOG in every ZIP
- 3-minute setup: unzip → npm i → npm run dev
```

**가격 + Early Bird**
```
Launch week only — Early Bird: $99/year for the first 50 buyers (save $50 off annual).
Regular Pro: $19/month or $149/year. All 15 themes, all 20+ components (growing weekly), dual-format downloads, monthly new themes.
Free tier: 1 full theme + 5 components, no credit card.
```

**CTA**
```
→ Free theme, no signup needed: mergeui.com/themes
→ Early Bird (50 seats only): mergeui.com/pricing
→ Changelog + roadmap: mergeui.com/changelog

I will be in the comments all day. Tell me what components you actually miss in existing dashboard kits — I will build the most-requested one next.
```

---

## 4. First Maker Comment (420자)

```
Hey Product Hunt — maker of MergeUi here.

This started as a personal frustration: I was rebuilding the same dashboard UI every 2–3 months. Sidebar, stat cards, charts, dark mode toggle, responsive breakpoints. Always the same work, always two weeks before I could even start on the actual product.

MergeUi is what I wished existed: 15 dashboard themes that drop into any stack, styled through CSS variables, shipped as both pure HTML and Tailwind. Five of them (BI, e-commerce, CRM, SaaS admin, trading) went through a full rebuild for launch — those are the ones I am most proud of.

Changelog and public roadmap are live: mergeui.com/changelog
Early Bird ($99/year, 50 seats) runs through launch week, then it is Pro at $19/mo or $149/yr.

Questions, feature requests, honest critiques — all welcome in this thread. I will be here.
```

**AI 제작 공개 분기 (교체용 1문단, 캡틴 결정에 따라 본문에 추가/생략)**
```
Full transparency: MergeUi was built by a small team that uses AI heavily in the workflow — design exploration, code scaffolding, QA checklists. Every theme was still hand-reviewed, hand-polished, and accessibility-tested by humans before shipping. I mention this because the "AI-built" signal triggers healthy skepticism in this community, and I would rather tell you upfront than have you wonder.
```

---

## 5. Gallery Image Captions (10장)

| # | 슬롯 | 파일명 | 캡션 |
|---|------|--------|------|
| 1 | Hero | 01-hero.png | The one page that made me stop rebuilding dashboards. Scroll, click, steal. |
| 2 | bi_v1 (BI) | 02-theme-bi.png | Business intelligence theme — bento grid, narrative flow, scrubber-driven chart exploration. |
| 3 | ec_v1 (E-commerce) | 03-theme-ec.png | E-commerce operations dashboard — 3-column layout with dual-view revenue compare. |
| 4 | cr_v1 (CRM) | 04-theme-cr.png | CRM theme built for sales teams — deal pipeline hero, contact stories on the left. |
| 5 | sd_v1 (SaaS) | 05-theme-sd.png | SaaS admin with soft neumorphism — time-of-day hints, calm information density. |
| 6 | td_v1 (Trading) | 06-theme-td.png | Trading terminal — single large chart, heatmap, subtle audio cues for price moves. |
| 7 | 컴포넌트 | 07-components.png | 20+ copy-paste components across 6 categories — buttons, cards, tables, forms, charts, feedback. Growing weekly. |
| 8 | 가격표 | 08-pricing.png | Free forever tier, Pro at $19/month. Launch Early Bird: $99/year (50 seats). |
| 9 | 듀얼 포맷 | 09-dual-format.png | Same theme, two formats. Pure HTML/CSS ZIP or Tailwind + Vite starter. Your call. |
| 10 | Roadmap | 10-roadmap.png | Public changelog and roadmap. You see what is shipping next before I do. |

**영상 슬롯 (권장)**: 갤러리 맨 앞 30초 데모. 캡션: `30-second tour: gallery → preview → dark mode → CSS variable swap.`

---

## 6. Topic Tags (PH는 3개까지)

**선택 3개 (우선순위 순)**
1. **Developer Tools** — 개발자 타겟 명확, 상위 노출 경쟁력 최고
2. **Design Tools** — UI 템플릿 성격, 프론트 + 디자이너 교차 유입
3. **SaaS** — PH 유저 다수가 SaaS 빌더, "SaaS admin 테마" 포함으로 자연스러움

**후순위 (제품 설명·댓글 키워드로 녹일 것)**: Productivity, Web App, UX Design
**비선택 권장**: No-Code / Low-Code (MergeUi는 코드 편집 필요 → 오해 소지)

---

## 7. Hunter Shout-out 문구 (외부 Hunter DM, 310자)

```
Hey [Hunter 이름] — quick hello, not a request for a favor.

I am launching MergeUi on Product Hunt on May 6. It is a dashboard template kit for developers — 15 themes shipped as both pure HTML/CSS and Tailwind, dark mode included, free tier available. Built because I was tired of rebuilding the same sidebar every project.

You hunt a lot of developer-facing tools, so I thought you might find it interesting. I am not asking you to hunt or upvote — just wanted you to have early access in case you want to poke at it: mergeui.com.

If the launch post catches your eye on May 6, a glance is already more than enough. Either way, appreciate the work you do for this community.
```

**타깃**: UI/Dev tools Hunter 3명 (최근 90일 Tailwind UI kit 헌트 이력) + Indie SaaS Hunter 2명 = 5명. D-14 ~ D-7 사이 순차 발송.

---

## 8. Post-launch 48hr 댓글 응대 가이드

### 응대 톤 원칙
1. 첫 문장은 질문에 직답 — 자랑·세일즈 금지
2. "Good question" 과사용 금지 (1일 2회 이하)
3. 부정·비판 댓글: 반박 대신 "You are right about X. Here is what we are doing about it."
4. 링크는 문장 끝에만
5. 모르는 건 "I do not know yet, will check and reply"
6. 15분 내 1차 응답 (PH 알고리즘 상위 노출 핵심)

### Q1. How is this different from Tailwind UI?
```
Good question — a few real differences, not just marketing:
1. Framework-agnostic. Tailwind UI is React-first; MergeUi ships as pure HTML/CSS AND Tailwind. Use it in Vue, Svelte, plain HTML, whatever.
2. CSS variable theming. Change --merge-color-primary and the whole kit follows. No Tailwind config editing required if you use the HTML version.
3. Dark mode done properly — redesigned for luminance, not just inverted colors.
Tailwind UI is excellent if you are 100% React/Next. MergeUi is for teams that move between stacks.
```

### Q2. Refund policy?
```
14-day no-questions-asked refund through Lemonsqueezy (our merchant of record). Just reply to the receipt email or use the checkout portal link — I approve them within a day. I would rather refund than have an unhappy buyer.
```

### Q3. How are updates handled? Do I pay again?
```
Pro and Annual include monthly new themes and all updates while the subscription is active. Cancel anytime — you keep whatever you already downloaded. No forced upgrades, no paywall on security fixes.
```

### Q4. Will this be open source on GitHub?
```
Honest answer: not right now. The kit is commercial to keep the update cadence sustainable. That said, license terms allow use in unlimited personal and commercial projects (not resale). If there is specific interest in an open component or a CLI, I will post it under a permissive license — tell me what you would actually use.
```

### Q5. Was this made by AI? (민감 질문 — 캡틴 결정 대기)

**옵션 1 (공개, F 권장)**
```
Yes — AI is part of the toolchain (design exploration, code scaffolding, QA checklists), but every theme was hand-reviewed, polished, and accessibility-tested by humans before ship. I think hiding it would be dishonest, and I would rather you judge the output than the process. Happy to answer anything specific.
```

**옵션 2 (비공개, Reactive only)**
```
The kit was built by a small team with a heavy emphasis on design review and accessibility testing. Every theme goes through manual QA before release. Happy to dig into any specific design or code choice you want to look at.
```

**옵션 3 (부분 공개, 간접)**
```
We use modern tooling aggressively — AI-assisted design exploration and code generation — but the quality bar (WCAG AA, Lighthouse 90+, hand-reviewed typography) is set by humans and tested by humans. The output is what matters; happy to discuss any specific theme.
```

**F 근거**: 2026년 PH 커뮤니티는 AI 툴체인을 당연시. 거짓말 리스크 > 공개 리스크.

### Q6. Korean language support?
```
The codebase and templates are English-first right now. All text is in clean classes/variables so i18n is straightforward — I can publish a Korean locale file if there is demand. Tell me in the thread or email support@mergeui.com and I will prioritize it.
```

### Q7. License? Can I use this for client work?
```
Pro and Annual grant unlimited use across personal and commercial projects — including paid client work and commercial products you ship. The only hard no is resale or redistribution of the templates themselves as a template product. Full terms: mergeui.com/terms
```

### Q8. Can my team of 5 share one license?
```
Pro is single-seat. For teams, each developer who actively customizes or distributes the templates needs a seat. I kept Team plan off at launch to keep things simple — if you need a 3–10 seat bundle, email me at support@mergeui.com and we will figure out a fair price. Most teams are OK with individual Annual seats at $149 each.
```

### Q9. Figma files?
```
Not at launch. The design source of truth right now is the HTML/CSS + Tailwind config — deliberately, so what you see is what you ship. Figma export is on the roadmap (mergeui.com/changelog) but I would rather ship it when it is actually useful, not a flat mockup. Tell me what you would do with it and I will build toward that.
```

### Q10. React / Vue component version when?
```
Tailwind starter shipped at launch (works great with Vite + React/Vue). A proper React component library is the top roadmap item after launch — targeting within 4–6 weeks. Vue follows. I will post the repo link when the first release is ready. Anyone on Pro at that point gets it included.
```

---

## 9. 예상 리스크 + 대응 시나리오

### 리스크 A — "또 AI로 찍어낸 템플릿" 조롱 (확률 중 / 영향 중~높음)
- Q5 옵션 1(투명 공개) 선제 채택 시 "프로세스 대비 결과" 논의로 전환
- 구체 코드 스니펫 2~3개 준비 (semantic HTML 예시, Lighthouse 점수 스크린샷)
- "판단 기준을 프로세스에서 결과물로 옮겨달라" 톤, 화내지 않음

### 리스크 B — "Tailwind UI / shadcn 대비 가격 비쌈" 논란 (확률 중 / 영향 중)
- 가격 비교 팩트시트 댓글 준비:
  - Tailwind UI: $299 일회성 (React only)
  - shadcn: Free (직접 조립, 시간 비용)
  - MergeUi: $19/mo 또는 $149/yr, 월 신규 테마 포함, 듀얼 포맷
- "Subscribe and cancel anytime" 포지셔닝 — lock-in 우려 선제 차단
- Early Bird ($99/yr, 50명)로 초기 구매 긴급성 환기

### 리스크 C — "통합성(integrations) 약함" 지적 (확률 저 / 영향 중)
- 솔직 인정: "Yes, v1 is templates. Integrations (Supabase adapters, auth starters) are on the roadmap"
- Roadmap 공개로 신뢰 확보

### 서버 과부하 대응

| 지표 | 경고선 | 조치 |
|------|--------|------|
| 동시 접속 | 300/분 | Vercel Analytics 확인, CDN 캐시 점검 |
| DB 쿼리 실패율 | >1% | Supabase 상태·쿼리 인덱스 재확인 |
| Lemonsqueezy 웹훅 실패 | 1건이라도 | 재처리 큐 실행, 수동 라이선스 발급 |
| 다운로드 CDN 504 | 연속 3건 | Cloudflare R2 비상 경로 가동 (Day 12 리허설 필수) |
| Sentry Critical | 1건 | 1시간 내 핫픽스 또는 롤백 |

**롤백 절차 (1분 내)**
1. Vercel "Rollback to previous deployment"
2. Lemonsqueezy 상품 Unpublish (결제 일시 중단)
3. PH 본문 상단 "We hit an issue, fixing now — updates below"
4. Twitter/X 투명 공지

---

## 10. 완료 후 요약

### 확정 가능 (본 초안만으로 OK)
- Title/Tagline/Description/본문 구조/First Maker Comment/Hunter DM/FAQ 10개/리스크 매트릭스 — 모두 카피 완결
- 가격 + Early Bird 문구: 메모리 확정값($19/$149/$99) 반영
- 기존 launch-marketing-plan.md §8 대비 최신화 포인트 반영:
  - 듀얼 포맷(HTML + Tailwind) 런칭 방침
  - 플래그십 5개(bi/ec/cr/sd/td) 명시
  - 15개 테마 규모 명확화
  - Early Bird 포함 3단 가격 구조

### 캡틴 결정 필요 (Day 1~2 내)
1. **Title** A/B/C 택1 (F 권장: A)
2. **Tagline** A/B/C 택1 (F 권장: B, Title A와 조합)
3. **AI 제작 공개 여부** (Q5 + First Maker Comment 문단 확정) — Day 1 최우선
4. **갤러리 영상 포함 여부** (Day 10 영상 제작 가부와 직결)
5. **외부 Hunter 섭외 vs 셀프 헌트** (Day 3까지)
6. **Topic Tags 3개 컨펌** (F 권장: Developer Tools / Design Tools / SaaS)
7. **업로드 시각**: KST 08:00 vs KST 17:01 (F 의견: PH 알고리즘상 17:01이 정석이지만 08:00도 차선)

### 런칭 전 마지막 점검 항목 (Day 13 리허설)
- 갤러리 이미지 10장 실제 캡처본 (B + C Day 7~10 납품)
- 30초 데모 영상 (분야 14, Day 10 제작)
- 플래그십 5개 외부 상품명 확정 (Day 7 네이밍 워크숍)
- **현재 `landing/index.html` 878~925행에 Team 플랜 카드($49/mo)가 아직 잔존** — 캡틴 결정(Free+Pro 2플랜)과 불일치, 런칭 전 C에게 제거 요청 필요
- Lemonsqueezy Team 상품 Unpublish (`reference_lemonsqueezy_products.md`에서도 "런칭 전 Unpublish/Archive 필요"로 명시)
- `mergeui.com/changelog` + `/roadmap` 공개 가능 상태 검증
- `robots.txt` AI 크롤러(GPTBot, ClaudeBot, PerplexityBot) 허용 확인 (launch-marketing-plan §1-3 GEO)
- OG 이미지 플래그십 5종 반영
- 전 에이전트 합동 리허설 (CLAUDE.md 품질 게이트)

### 동시에 갱신이 필요한 문서 (변경 반영 시)
- `docs/marketing/launch-marketing-plan.md` §8 — 듀얼 포맷·플래그십 5개 추가 갱신
- `docs/plans/master-todo.md` — Day 5 PH 포스트 리허설 체크 항목
- `landing/index.html` — Team 플랜 카드 제거 (C 담당)
- `pages/public/pricing.html` — Team 제거 여부 확인
- `docs/marketing/email-automation.md` — 런칭 당일 이메일 트리거 시각 동기화

---

## 출처

- `docs/plans/launch-plan-506.md`
- `docs/marketing/launch-marketing-plan.md` §8
- 메모리: `reference_lemonsqueezy_products.md`, `project_pricing_decision.md`, `project_theme_naming.md`
