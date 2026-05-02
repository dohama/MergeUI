# 5/6 D-day 운영 Runbook + 응대 스크립트

- **작성**: F(그로스 마케터) · 2026-05-02 (D-4)
- **목적**: 5/6 (수) PH 발사 직후 6시간 + 첫 24시간 캡틴 운영 부담 최소화
- **사용법**: 캡틴이 D-day에 본 문서를 띄워두고, 질문이 오면 해당 섹션 복사 → 답변창 붙여넣기
- **PH 발사 시각**: **KST 16:01 (PST 0:01)** — PH 데이 시작 직후

---

## 1. 발사 직후 30분 (KST 16:01~16:30) — 캡틴 액션 순서

| 시각 | 액션 | 소요 |
|------|------|------|
| 16:00 | 사전 점검: Sentry/GA4 실시간 / Vercel 상태 / Lemonsqueezy 결제 가능 / Supabase 연결 | 1분 |
| **16:01** | **PH 게시 (Maker Studio "Schedule" 또는 수동 publish)** | 즉시 |
| 16:02 | 첫 First Maker Comment 게시 (`docs/marketing/ph-maker-comment-tones.md`에서 1/2/3 중 1개 복사) | 1분 |
| 16:05 | X/LinkedIn 발사글 동시 게시 (launch-social-posts.md 참조) | 3분 |
| 16:10 | Loops 사전등록 구독자 발송 트리거 확인 (이미 자동화 완료) | 1분 |
| 16:15 | PH 댓글 1차 점검 — 첫 댓글 도착 시 15분 내 응답 (알고리즘 상위 노출 핵심) | - |
| 16:30 | 첫 30분 KPI 스냅샷 기록 (방문/가입/PH upvote 수) | 2분 |

---

## 2. 발사 후 6시간 응대 일정 (KST 16:01~22:00)

> **원칙**: 매시간 0분에 점검 사이클 1회. PH 댓글 응답 SLA 15분 유지.

| 시각 | 1순위 액션 | 2순위 액션 |
|------|-----------|-----------|
| 16:00 | PH 댓글 응대 | X/LinkedIn 멘션 답변 |
| 17:00 | PH 댓글 응대 + Sentry Critical 점검 | 결제 성공 1건 확인 (Lemonsqueezy 대시보드) |
| 18:00 | PH 댓글 응대 + 가입자 추이 (Supabase) | Reddit r/webdev 발사글 게시 (선택) |
| 19:00 | PH 댓글 응대 + Sentry Major burst 점검 | Loops welcome 자동 발송 확인 |
| 20:00 | PH 댓글 응대 + 6시간 KPI 중간 스냅샷 | 다음 6시간 응대 우선순위 재설정 |
| 21:00 | PH 댓글 응대 + 환불 요청 점검 (Lemonsqueezy) | X 후속 트윗 (소감·중간 KPI) |
| 22:00 | 1일차 마감 점검 + Day 2 우선순위 메모 | 캡틴 휴식 |

---

## 3. 응대 우선순위

```
1. PH 댓글 (15분 내 응답 — 알고리즘 상위 노출 직결)
2. 결제 실패/환불 이메일 (1시간 내 — 매출 직결)
3. 일반 support@ 이메일 (4시간 내)
4. X/Twitter 멘션 (4시간 내)
5. Reddit/HN 댓글 (해당 채널 활성 시 1시간 내)
6. LinkedIn 댓글 (24시간 내)
```

**응대 톤 원칙 (전 채널 공통)**:
- 첫 문장은 질문에 직답. 자랑·세일즈 금지
- "Good question" 과사용 금지 (1일 2회 이하)
- 부정·비판: 반박 대신 "You are right about X. Here is what we are doing about it."
- 링크는 문장 끝에만
- 모르는 건 "I do not know yet, will check and reply" — 거짓말 절대 금지

---

## 4. 자주 나올 질문 10개 + 답변 (영어/한국어)

### Q1. How is this different from Tailwind UI / shadcn?

**EN**:
```
Three real differences:

1. Framework-agnostic. Tailwind UI is React-first. shadcn is React + you assemble it. MergeUi ships as pure HTML/CSS AND Tailwind in the same purchase — drop into Vue, Svelte, plain HTML, whatever.

2. CSS variable theming. Change --merge-color-primary and the whole kit follows. No Tailwind config rewrites if you use the HTML version.

3. Dark mode is redesigned, not inverted. Every theme has a separately-tuned dark variant.

Tailwind UI is excellent if you live in React/Next. MergeUi is for teams that move between stacks.

→ Try the free theme: mergeui.com/themes
```

**KR**:
```
실질적인 차이 3가지입니다.

1. 프레임워크 독립성 — Tailwind UI는 React 전용, shadcn은 React + 직접 조립. MergeUi는 한 번 구매로 순수 HTML/CSS와 Tailwind 양쪽 ZIP을 받아 Vue/Svelte/Next 어디든 붙여넣기 가능.

2. CSS 변수 기반 테마 — `--merge-color-primary` 하나만 바꾸면 전체 테마가 따라옵니다. HTML 버전은 Tailwind config 수정도 필요 없습니다.

3. 다크 모드는 색 반전이 아니라 별도 디자인 — 명도·채도 재설계.

스택이 React에 100% 묶여 있으면 Tailwind UI도 좋습니다. 여러 스택을 오가는 팀이라면 MergeUi가 더 맞습니다.

→ 무료 테마 체험: mergeui.com/themes
```

---

### Q2. Why $19/mo vs $99 one-time?

**EN**:
```
Honest tradeoff. $99 one-time looks cheaper today, but you get the kit frozen at v1. With Pro you keep getting the new themes and components I ship every week — currently 20+ blocks, growing.

If you only need one dashboard once, the Free tier (1 theme + components) might be enough. If you ship multiple projects per year, $19/mo or $149/yr pays for itself in saved hours.

Cancel anytime, keep what you downloaded. No lock-in.

→ Pricing: mergeui.com/pricing
```

**KR**:
```
솔직한 트레이드오프입니다. $99 일회성은 오늘은 싸 보이지만 v1 시점에 멈춥니다. Pro는 매주 추가되는 신규 테마·컴포넌트를 계속 받습니다 (현재 20+ 블록, 매주 증가).

대시보드 한 개만 필요하시면 Free(테마 1개 + 컴포넌트) 만으로도 충분할 수 있습니다. 연간 여러 프로젝트를 출시하신다면 $19/mo 또는 $149/yr가 절약 시간 기준으로 회수됩니다.

언제든 취소 가능하며 다운로드한 자료는 그대로 유지됩니다. 락인 없습니다.

→ 가격표: mergeui.com/pricing
```

---

### Q3. Is Pro really 20+ components?

**EN**:
```
Yes — 20+ blocks across 6 categories (buttons, cards, tables, forms, charts, feedback) at launch, with new ones shipping every week. The component browser shows the exact list and code for each one. Free tier gets a handful so you can verify the quality before deciding.

→ Browse: mergeui.com/components
```

**KR**:
```
네, 런칭 기준 6개 카테고리(버튼·카드·테이블·폼·차트·피드백)에 20+ 블록이 있고, 매주 신규 추가됩니다. 컴포넌트 브라우저에서 정확한 목록과 코드를 확인하실 수 있습니다. Free 플랜에서도 일부 공개되어 결제 전에 품질을 검증하실 수 있습니다.

→ 둘러보기: mergeui.com/components
```

---

### Q4. Can I use these in my React app?

**EN**:
```
Absolutely. Two paths:

A) Pure HTML/CSS path — copy the markup into your JSX, change `class` to `className`, done. The styling is just CSS custom properties; it works in any React app, no Tailwind config needed.

B) Tailwind path — use the Tailwind ZIP, copy the utility classes directly. Plays well with any Tailwind-based React/Next setup.

A proper React component library is on the roadmap (4-6 weeks post-launch). Pro subscribers get it included.

→ Roadmap: mergeui.com/changelog
```

**KR**:
```
네, 가능합니다. 두 가지 경로가 있습니다.

A) 순수 HTML/CSS 경로 — 마크업을 JSX에 붙여넣고 `class`를 `className`으로만 바꾸면 끝. 스타일은 CSS 변수 기반이라 어떤 React 앱에서도 작동, Tailwind config 불필요.

B) Tailwind 경로 — Tailwind ZIP의 유틸리티 클래스를 그대로 사용. 모든 Tailwind 기반 React/Next 환경과 호환.

별도의 React 컴포넌트 라이브러리는 런칭 후 4~6주 내 출시 예정. Pro 구독자에게 포함됩니다.

→ 로드맵: mergeui.com/changelog
```

---

### Q5. Refund policy?

**EN**:
```
14-day no-questions-asked refund through Lemonsqueezy (our merchant of record). Reply to the receipt email or use the checkout portal link — I approve refunds within a day. I would rather refund than have an unhappy buyer.

→ Refund details: mergeui.com/terms#refund
```

**KR**:
```
14일 무조건 환불 보장 (Lemonsqueezy가 직접 처리). 영수증 메일에 회신하시거나 체크아웃 포털 링크에서 요청하시면 24시간 내 승인됩니다. 불만족한 구매자보다 환불이 낫다는 원칙입니다.

→ 환불 정책: mergeui.com/terms#refund
```

---

### Q6. Will you keep adding components?

**EN**:
```
Yes — that is the core promise of Pro. New components ship weekly, new full themes ship monthly. Public changelog and roadmap show exactly what is next, and Pro subscribers vote on priorities.

→ Public roadmap: mergeui.com/changelog
```

**KR**:
```
네, 그것이 Pro의 핵심 약속입니다. 신규 컴포넌트는 매주, 신규 풀 테마는 매월 추가됩니다. 공개 changelog와 로드맵에서 다음 출시 항목을 확인하실 수 있고, Pro 구독자가 우선순위 투표에 참여합니다.

→ 공개 로드맵: mergeui.com/changelog
```

---

### Q7. Why early bird $99? When does it end?

**EN**:
```
First 50 buyers only, launch week. After that, regular Pro Annual is $149/yr. The $99 tier locks in for renewal — meaning if you join Early Bird, your renewal next year is also $99 as long as you do not cancel.

I priced it at $99 because the people backing this on day one are taking on more risk than buyers who show up in month six. They deserve the discount.

Counter resets when 50 seats are sold or the launch week ends, whichever first.

→ Claim: mergeui.com/pricing
```

**KR**:
```
런칭 주간 첫 50명 한정입니다. 그 이후 Pro 연간은 정가 $149/yr입니다. $99는 갱신 가격까지 고정 — Early Bird로 가입하시면 취소하지 않는 한 다음 해 갱신도 $99입니다.

런칭 첫날 백업하시는 분들은 6개월 뒤에 합류하는 분들보다 더 큰 리스크를 감수하시는 것이라 그만큼 할인을 받으실 자격이 있다는 원칙입니다.

50석 모두 소진 또는 런칭 주간 종료 중 먼저 도래하는 시점에 종료됩니다.

→ 신청: mergeui.com/pricing
```

---

### Q8. What stack does this support?

**EN**:
```
Out of the box, anything that renders HTML and CSS. That includes:

- Plain HTML (just open index.html)
- React / Next.js (paste markup into JSX, change class to className)
- Vue / Nuxt (paste markup, change class binding syntax)
- Svelte / SvelteKit
- Astro
- Angular (template syntax)
- Laravel Blade, Rails ERB, any server-rendered templating

The Tailwind ZIP gives you a Vite + Tailwind starter if you want a ready dev environment. The HTML ZIP has zero build step.

Native React/Vue component packages are on the roadmap.

→ Docs: mergeui.com/docs
```

**KR**:
```
HTML과 CSS를 렌더링하는 모든 환경을 지원합니다. 구체적으로:

- 순수 HTML (index.html 더블클릭)
- React / Next.js (JSX에 붙여넣고 class → className)
- Vue / Nuxt (마크업 붙여넣고 class 바인딩 문법만 변경)
- Svelte / SvelteKit
- Astro
- Angular
- Laravel Blade, Rails ERB 등 서버 렌더링 템플릿

Tailwind ZIP은 Vite + Tailwind 스타터를 포함합니다. HTML ZIP은 빌드 단계가 0입니다.

네이티브 React/Vue 컴포넌트 패키지는 로드맵에 있습니다.

→ 문서: mergeui.com/docs
```

---

### Q9. Free plan limits?

**EN**:
```
Free is genuinely useful, not bait:
- 1 full dashboard theme (your pick from the gallery)
- A handful of components from the library
- Both HTML and Tailwind ZIPs
- No credit card, no time limit

Pro unlocks the other 14 themes, all 20+ components (growing weekly), and every future addition while subscribed.

→ Start free: mergeui.com/themes
```

**KR**:
```
Free는 미끼가 아니라 실제로 쓸 수 있게 설계했습니다.
- 풀 대시보드 테마 1개 (갤러리에서 선택)
- 컴포넌트 라이브러리 일부
- HTML과 Tailwind ZIP 양쪽 제공
- 카드 등록 없음, 기한 제한 없음

Pro는 나머지 14개 테마 + 20+ 컴포넌트 전체 (매주 증가) + 구독 중 추가되는 모든 신규 자료를 잠금 해제합니다.

→ 무료 시작: mergeui.com/themes
```

---

### Q10. Discord/Slack community?

**EN**:
```
Not at launch, deliberately. I would rather have one good support inbox (support@mergeui.com, replies in 24h) than a half-active Discord. If demand picks up after launch, I will spin up a community channel and invite Pro subscribers first.

For now: tell me here, on Twitter, or by email — I read everything personally.

→ Contact: mergeui.com/contact
```

**KR**:
```
런칭 시점에는 일부러 운영하지 않습니다. 반활성 상태의 Discord보다 하나의 잘 운영되는 지원 메일함(support@mergeui.com, 24시간 내 답변)이 낫다는 판단입니다. 런칭 후 수요가 확인되면 Pro 구독자 먼저 초대하는 커뮤니티 채널을 개설할 예정입니다.

당분간은 PH 댓글, Twitter, 이메일 어디서든 알려주세요. 직접 읽고 답변드립니다.

→ 문의: mergeui.com/contact
```

---

## 5. 첫 24시간 모니터링 체크리스트 (매시간)

| 채널 | 확인 항목 | 도구 / URL | 정상 기준 | 이상 시 액션 |
|------|----------|----------|----------|-------------|
| **PH 댓글** | 신규 댓글, 응답 누락 여부 | Product Hunt 게시글 | 15분 내 응답 | 즉시 응답 (Q1~Q10 템플릿 활용) |
| **PH 순위** | Day rank, upvote 수 | PH 게시글 | 24h 내 Top 10 목표 | Top 20 밖이면 X/LinkedIn 후속 트윗 |
| **가입자** | Free 신규 가입 / Email 인증 | Supabase users 테이블 | 1시간당 5+ 목표 | 0건 1시간 시 가입 플로우 동작 점검 |
| **결제** | Pro 신규 결제 / Early Bird | Lemonsqueezy 대시보드 | 6시간 내 첫 결제 목표 | 첫 결제 발생 시 Loops welcome 자동 발송 확인 |
| **Sentry Critical** | payment area 태그 에러 | Sentry → Issues | 0건 | 1건이라도 즉시 핫픽스 또는 Vercel rollback |
| **Sentry Major** | auth area 5분 5건 이상 | Sentry → Alerts | 알림 0건 | 알림 수신 시 30분 내 원인 파악 |
| **랜딩 트래픽** | 실시간 동시 접속 | GA4 Realtime | PH 발사 후 30분 내 50+ | 5명 이하 1시간 시 X 트윗 부스트 |
| **이메일 문의** | support@ 도착 메일 | Gmail (weed.conv) | 4시간 내 답변 | 첫 응답 → FAQ 페이지 보강 검토 |
| **환불 요청** | Lemonsqueezy refund | LS 대시보드 | 24시간 내 0건 목표 | 1건 발생 시 1시간 내 승인 + 사유 메모 |
| **Webhook 실패** | LS → 우리 서버 webhook | LS → Webhooks tab | 100% 성공 | 실패 시 수동 라이선스 발급 (D 백엔드 매뉴얼) |

---

## 6. 응대 우선순위 매트릭스 (충돌 시)

```
PH 댓글 도착 + 결제 에러 동시 → 결제 에러 먼저 (매출 보호)
PH 댓글 + 일반 이메일 동시 → PH 댓글 먼저 (알고리즘)
이메일 + X 멘션 동시 → 이메일 먼저 (구매 의향 높음)
부정 PH 댓글 + 긍정 PH 댓글 동시 → 부정 먼저 (퍼널 방어)
```

---

## 7. 비상 시나리오 빠른 참조

| 상황 | 1순위 액션 | 2순위 액션 |
|------|-----------|-----------|
| 결제 buy 버튼 404 | Lemonsqueezy 상품 활성 상태 확인 → 즉시 활성화 | PH 댓글에 "Fixing now" 공지 |
| 사이트 다운 (Vercel) | Vercel 대시보드 → "Rollback to previous deployment" | X에 투명 공지 + ETA |
| Webhook 실패 → 라이선스 미발급 | LS 대시보드에서 webhook 재전송 | 구매자에게 직접 라이선스 키 이메일 |
| 부정 PH 댓글 폭주 | 반박 금지. "You are right about X. Here is what we are doing." | PH 본문에 업데이트 노트 추가 |
| Sentry Critical 1건 | 1시간 내 핫픽스 또는 Vercel rollback | Sentry 이슈 → 캡틴 메일 자동 알림 (E-15 룰) |
| Loops welcome 미발송 | LS webhook → Loops 트리거 로그 확인 | 수동 발송 + Day 2 후속 점검 |

---

## 8. 24시간 마감 KPI 기록 (D+1 06:00 KST)

| KPI | 최소 성공 | 목표 | Stretch | 실제 |
|-----|----------|------|---------|------|
| PH upvote | 100 | 300 | 500 | __ |
| 사이트 UV | 500 | 1,500 | 5,000 | __ |
| 신규 가입 | 30 | 80 | 200 | __ |
| Pro 결제 | 1 | 5 | 15 | __ |
| Early Bird 잔여 | 49 | 45 | 35 | __ |
| 환불 요청 | 0 | 0 | 0 | __ |
| Sentry Critical | 0 | 0 | 0 | __ |

---

## 9. 단일 출처 (이 문서가 모든 것)

- PH 본문/댓글: `docs/marketing/product-hunt-launch-post.md`
- Maker Comment 톤: `docs/marketing/ph-maker-comment-tones.md`
- X/LinkedIn 발사글: `docs/marketing/launch-social-posts.md`
- 응대 스크립트 + Runbook (본 문서)
- 캡틴 D-day 잔여 액션: `docs/plans/master-todo.md` "캡틴 D-5 잔여 액션" 섹션
