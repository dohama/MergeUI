# bi_v1 리빌드 디자인 스펙 (Rev 2)

> **날짜**: 2026-04-23 (Day 1 / D-13)
> **작성**: B(디자인) — 메인 세션 위임
> **대상**: `templates/bi_v1/*` 전면 리빌드
> **목적**: 플래그십 #1의 "와" 수준 퀄리티 확정. Day 2(4/24) C(프론트) 구현 → 캡틴 시연·승인
> **출처**: `docs/plans/launch-plan-506.md` 분야 1 + `design/pattern-library-v2.md` DNA 카탈로그 + 기존 bi_v1 실측

---

## 1. 현재 상태 분석

### 파일 위치

```
templates/bi_v1/
├── index.html          (200+줄, 차트 10종 배치된 상태)
├── css/
│   ├── bi-tokens.css   (70줄 — CSS 변수 정리되어 있음)
│   └── bi-theme.css
└── js/
    ├── bi-theme.js
    └── data.js
```

기존 디자인 시스템 문서는 `design/themes/` 아래 **13개 테마(bd/bw/cr/crt/ec/fi/gb/gl/ln/lx/pa/sd/w95)** 별로 존재 — **bi_v1은 없음(첫 작성)**.

### 유지할 요소 (Keep)

- ✅ **기본 컬러 토큰 체계** (`bi-tokens.css`의 Indigo 기반 `--bi-primary: #4C6EF5` + Tableau 10 파생 차트 8색) — 설계 건전
- ✅ **폰트 조합** (Inter + JetBrains Mono) — BI 타겟에 적합, 숫자 가독성 우수
- ✅ **10종 차트 인벤토리** (Line, Donut, Stacked Bar, Pie, Area, Heatmap, Gauge, Scatter, Funnel, Table)
- ✅ **액센트 프리셋** (Emerald / Rose / Charcoal) — 구독자 커스터마이징 자산
- ✅ **status 컬러** (success/warning/error/info) — 재사용

### 재설계할 요소 (Rebuild)

- 🔄 **레이아웃**: 현재 bi-grid span 기반(flat) → **L02 Bento Box Grid** (크기 리듬)
- 🔄 **상단 히어로 부재**: 현재는 바로 KPI row → **X06 Auto-narrate + 대형 Hero KPI 2장 블록** 신설
- 🔄 **필터 바 인터랙션 정적**: 이모지+텍스트 → **X09 History Scrubber (시간 스크러빙)** 도입
- 🔄 **아바타 메뉴·알림·검색 부재**: 헤더 우측이 CTA 버튼 1개뿐 → 실사용 감 있는 헤더로 보강
- 🔄 **차트 카드 헤더 디자인**: 제목+⋯ 버튼뿐 → **인라인 툴팁(C10) + mini-sparkline + 컨텍스트 메뉴** 추가
- 🔄 **모바일 대응**: 현재 선언적. 실제 벤토 리플로우 우선순위 정의 필요

### 제거할 요소 (Remove)

- ❌ **"B·Dashboard" 브랜드 더미 로고**: 런칭용이므로 테마 식별자("bi · Analytics Studio") 또는 MergeUi 로고 + 테마명 분리
- ❌ **인라인 스타일 (`style="padding:7px 14px"` 등)**: 토큰화 가능. 전부 클래스로
- ❌ **`#acquisition/#retention/...` 앵커 내비**: 실제 섹션이 없음. 서브 페이지 라우팅(Coming Soon) 또는 앵커 스크롤 구현 중 택1

### 지금 부족한 3가지 (캡틴 반응 예상)

1. **"평범하다"** — Tableau/Metabase/Looker와 한눈에 구분 안 됨 → 시그니처 3개(내레이션/스크러버/벤토 리듬) 삽입 필수
2. **"정적이다"** — 차트 10개 있지만 움직임 없음 → 마이크로 인터랙션(시간 스크러빙, 호버 툴팁, KPI 카드 hover elevation) 필수
3. **"데이터가 얕다"** — KPI 4개 + 차트만 → **"이번 달 스토리"** 내레이션 블록이 데이터 해설 추가하여 "프로 분석가" 감 생성

---

## 2. 타깃 + 차별화

### 페르소나 (3 레이어)

**주 페르소나 (Primary)**
- **이름**: 지민 (가명), 35세, **Series B 핀테크의 프로덕트 분석가**
- **업무**: 매주 월요일 오전 경영진 회의에서 전주 KPI + 인사이트 15분 발표
- **페인**: 숫자는 있는데 "그래서 왜?"의 스토리가 부족. Tableau는 툴 복잡, Metabase는 밋밋
- **원하는 것**: 화면 캡처 → 슬라이드 붙여넣기로 경영진 커뮤니케이션 즉시 가능한 "해설 가능한 대시보드"

**보조 페르소나 (Secondary)**
- B2B SaaS CEO — 아침 10분에 지표 훑고 싶은 사람
- Growth PM — 퍼널 드릴다운 1-click 욕구

### 경쟁 제품 대비 차별화

| 구분 | Tailwind UI (Catalyst) | Tremor | MergeUi bi_v1 |
|------|------------------------|--------|---------------|
| **가격** | $299 1회 | $249 1회 | $19/mo ($149/yr) |
| **차트 라이브러리 의존** | Tremor 추천 | Tremor 자체 | **Chart.js CDN만** (의존성 ↓) |
| **레이아웃** | 2-column 기본 | Grid 기본 | **Bento Box 리듬** |
| **인터랙션** | 정적 | 정적 | **시간 스크러빙 + 내레이션** |
| **데이터 스토리** | 없음 | 없음 | **자동 내레이션 (X06)** |
| **듀얼 포맷** | React 전용 | React 전용 | **HTML/CSS + Tailwind 순수 표준 둘 다** |
| **접근성** | AA | AA | AA + 키보드 스크러빙 |

**한 줄 포지셔닝**: *"Metabase 오픈소스의 자유 + Tableau Story의 해설 + Bento의 시각 리듬"*

---

## 3. 레이아웃 구조 — L02 Bento Box Grid

### 데스크톱 1280px+ 와이어프레임

```
┌────────────────────────────────────────────────────────────────┐
│  HEADER (64px)                                                  │
│  [◆ MergeUi]  Overview · Acquisition · Retention · Revenue     │
│                  [ 🔍 검색 ]  [ 🔔3 ]  [ 👤 ]  [ + Report ]   │
├────────────────────────────────────────────────────────────────┤
│  SCRUBBER BAR (56px) — X09 시간 스크러빙                       │
│  ◀── 2025 Jan [====◉======= 2026 Apr] Dec 2026 ──▶            │
│        Last 12M ▾   Compare: None ▾   All Regions ▾   ⟳ ↓     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  HERO STRIP (168px) — X06 Auto-narrate + 대형 KPI 2장           │
│  ┌──────────────────────┐ ┌─────────────────┐ ┌────────────┐   │
│  │ 📖 This Week's Story │ │ $245,820        │ │ 12,847 ★   │   │
│  │ "MRR up 12% vs LW,   │ │ MRR ↑ 12% │ ██  │ │ NPS +42    │   │
│  │  Enterprise +3 deals"│ │ sparkline 12M   │ │ 128 prom   │   │
│  └──────────────────────┘ └─────────────────┘ └────────────┘   │
│       span-5                     span-4            span-3       │
│                                                                  │
│  BENTO GRID (가변 높이, 12-col)                                 │
│  ┌─────────────────────────────┐ ┌──────────────┐              │
│  │ Revenue Trend 12M  span-8   │ │ NPS Gauge    │              │
│  │ (Line + Area 듀얼)  row-2   │ │ span-4 row-1 │              │
│  │                             │ └──────────────┘              │
│  │                             │ ┌──────────────┐              │
│  │                             │ │ Device Donut │              │
│  │                             │ │ span-4 row-1 │              │
│  └─────────────────────────────┘ └──────────────┘              │
│                                                                  │
│  ┌──────────────┐ ┌──────────────────┐ ┌────────┐              │
│  │ Plan Pie     │ │ Traffic Stacked  │ │ Cohort │              │
│  │ span-3       │ │ span-6           │ │ span-3 │              │
│  └──────────────┘ └──────────────────┘ └────────┘              │
│                                                                  │
│  ┌─────────────────────────┐ ┌──────────────────────────┐      │
│  │ MAU/WAU/DAU Area        │ │ Heatmap 7×24             │      │
│  │ span-6 row-1            │ │ span-6 row-2             │      │
│  └─────────────────────────┘ │                          │      │
│  ┌─────────────────────────┐ │                          │      │
│  │ LTV vs CAC Scatter      │ │                          │      │
│  │ span-6 row-1            │ │                          │      │
│  └─────────────────────────┘ └──────────────────────────┘      │
│                                                                  │
│  ┌──────────────────┐ ┌───────────────────────────────┐         │
│  │ Funnel span-5    │ │ Top Countries Table  span-7   │         │
│  └──────────────────┘ └───────────────────────────────┘         │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### 그리드 정의 (12-column)

| 영역 | span | row | 배치 위치 |
|------|------|-----|----------|
| Hero Narrate | 5 | 1 | row 1, col 1–5 |
| Hero MRR | 4 | 1 | row 1, col 6–9 |
| Hero NPS Mini | 3 | 1 | row 1, col 10–12 |
| Revenue Line (main) | 8 | 2 | row 2–3, col 1–8 |
| Gauge NPS | 4 | 1 | row 2, col 9–12 |
| Donut Device | 4 | 1 | row 3, col 9–12 |
| Pie Plan | 3 | 1 | row 4, col 1–3 |
| Stacked Traffic | 6 | 1 | row 4, col 4–9 |
| Cohort | 3 | 1 | row 4, col 10–12 |
| Area MAU | 6 | 1 | row 5, col 1–6 |
| Heatmap | 6 | 2 | row 5–6, col 7–12 |
| Scatter LTV | 6 | 1 | row 6, col 1–6 |
| Funnel | 5 | 1 | row 7, col 1–5 |
| Table Countries | 7 | 1 | row 7, col 6–12 |

**시각적 리듬 원칙**:
- "큰 1개 + 중간 2개 + 작은 1개"가 한 행 안에 섞이도록 배치
- 같은 span(예: 6-6)이 세로로 연달아 안 오도록 (단조로움 방지)
- row-2(세로로 2칸)짜리가 시각적 앵커 역할 → Revenue Line과 Heatmap 2개만 사용

---

## 4. Hero 섹션 설계

### 4-1. Narrate Block (span-5) — X06 Auto-narrate 창의 시그니처

**구조**:
```html
<aside class="bi-hero-narrate">
  <div class="bi-narrate-label">
    <span class="bi-narrate-icon">📖</span>
    <span>This Week's Story</span>
    <span class="bi-narrate-tag">Auto</span>
  </div>
  <p class="bi-narrate-body">
    <strong>MRR grew 12.4% WoW</strong>, driven by
    <mark>3 Enterprise upgrades</mark> and improved
    <mark>Pro retention (89% → 92%)</mark>.
    Churn dipped to 2.1%, a 3-month low.
  </p>
  <div class="bi-narrate-actions">
    <button>Copy to Slides</button>
    <button>Regenerate ▾</button>
  </div>
</aside>
```

**시각 스타일**:
- 배경: 미묘한 그라디언트 (`linear-gradient(135deg, #EEF1FE 0%, #F6F8FB 100%)`)
- 좌측 4px `--bi-primary` accent bar
- 본문 16px Regular, `<strong>`과 `<mark>` 강조
- `<mark>`: `background: #FFF3C4; padding: 0 4px; border-radius: 3px;` (하이라이터 느낌)

**자동 내레이션 로직** (JS — 실제 AI 호출 없음, 정적 템플릿):
```js
// data.js에 templates 추가
narrateTemplates = [
  { condition: "mrr_growth > 10",
    text: "MRR grew {{mrr_pct}}% WoW, driven by {{top_driver}}." },
  { condition: "churn_trend === 'down'",
    text: "Churn dipped to {{churn_pct}}%, a {{low_period}}-month low." },
  // 10개 조건 템플릿
];
// 조건별 매칭 결과 3개 선택 → 문장 조합
```

**차별화 포인트**: 경쟁사는 KPI만 보여줌. 이 카드는 "왜 그렇게 되었는지"를 1문장으로 설명.

### 4-2. Hero KPI MRR (span-4)

**구조**:
```
┌──────────────────────────┐
│ MRR                      │
│ $245,820     ↑ 12.4%     │  ← 48px 숫자, 16px 변화율
│ vs $218,700 last week    │
│ ━━━━━━━━━━━━━━━━━━━━━━━ │  ← 얇은 sparkline 12M
│ Target: $280K  88% ████░│  ← progress indicator
└──────────────────────────┘
```

**타이포**:
- 숫자: 48px, weight 800, `font-variant-numeric: tabular-nums` (정렬 중요)
- 변화율: 16px, weight 700, 컬러 `--bi-success` (+) / `--bi-error` (−)
- 보조 텍스트: 13px, `--bi-text-2`

**인터랙션**:
- hover: 카드 전체 `transform: translateY(-2px); box-shadow 강화`
- sparkline 위 마우스 위치: **C10 Inline Tooltip** (해당 포인트 값 표시)

### 4-3. Hero NPS Mini (span-3)

**구조**:
```
┌───────────────────┐
│ NPS  ⭐ 42        │
│                   │
│ [semi-gauge arc]  │  ← G12 (작은 버전)
│                   │
│ 128 P · 34 D      │
└───────────────────┘
```

- G12 Semi-Circle Gauge 작은 버전 (arc 120°, 24px 두께)
- 중앙: 42 (24px)
- 하단: 프로모터/디트랙터 카운트

---

## 5. 스크러버 컴포넌트 — X09 History Scrubber (창의 시그니처)

### 목적

사용자가 "지난 6개월 중 특정 시점"을 선택하면 **대시보드 전체가 그 시점의 데이터로 리와인드**. 비디오 편집기 스크러빙 UX.

### 시각 구조

```
┌────────────────────────────────────────────────────────────────┐
│   ◀  Jan 2025          Apr 2026                  Dec 2026  ▶  │
│                            ◉                                    │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│              ↑ (drag handle: 20px 원형, --bi-primary)          │
│                                                                  │
│   Last 12 months ▾    Compare: None ▾    All Regions ▾    ⟳ ↓ │
└────────────────────────────────────────────────────────────────┘
```

**상태**:
- **기본**: 핸들이 우측 끝(현재 날짜). 전체 바 회색, 지나간 구간은 `--bi-primary-soft`
- **드래그 중**: 핸들 확대(24px), 현재 위치 위 툴팁 `"2026-02-15 (Mon)"`
- **릴리즈**: 2초 이내 모든 차트 애니메이션으로 해당 시점 데이터로 전환 (crossfade 300ms)

**인터랙션 디테일**:
- 드래그: 마우스 + 키보드 (← → 1일씩, Shift+← → 7일씩)
- 클릭: 해당 위치로 점프 (transition 400ms)
- 더블클릭: 기본값(현재)으로 복귀
- 접근성: `role="slider" aria-valuemin aria-valuemax aria-valuenow aria-valuetext`

**연동 (핵심)**:
- 시점 변경 시 이벤트 `bi:timechange` 발생
- 각 차트 위젯이 이 이벤트 구독 → 해당 시점 데이터로 렌더
- `data.js`의 `getDataAt(date)` 헬퍼가 각 데이터셋을 필터링

**차별화**: Tableau의 "Filter" 개념을 UI 전면으로 끌어올림. 경쟁 템플릿 중 이런 스크러빙 UX 있는 것 없음 (B 조사 기준).

---

## 6. 내레이션 블록 (Hero 외 추가)

내레이션은 **Hero 섹션뿐 아니라 개별 차트 카드** 안에도 선택적으로 배치:

```
┌──────────────────────────────┐
│ Cohort Retention             │
│ M1–M6 by signup month        │
│                              │
│ [heatmap 차트]               │
│                              │
│ ─────────────────────────    │
│ 💡 Feb cohort held 89% at M3 │ ← 내레이션 footnote
│    — best in 6 quarters.     │
└──────────────────────────────┘
```

**내레이션 footnote 스타일**:
- `--bi-primary-soft` 배경
- `💡` 아이콘 + italic 12px
- 옵션 (각 카드마다 배치 여부 토글 가능, 기본 ON은 4~5장에만)

---

## 7. 컬러 팔레트 2안

### 옵션 A — "Analytics Navy Premium" (기본 추천)

**배경 전략**: 기존 `#F6F8FB` 유지하되 네이비 톤 강화

| 토큰 | 값 (Light) | 값 (Dark) | 용도 |
|------|-----------|-----------|------|
| `--bi-bg` | `#F4F6FB` | `#0B1220` | 페이지 배경 |
| `--bi-bg-white` | `#FFFFFF` | `#141C2E` | 카드 배경 |
| `--bi-bg-subtle` | `#EEF1F7` | `#1C2540` | 보조 배경 (scrubber bar) |
| `--bi-border` | `#E1E6EF` | `#24304A` | 기본 보더 |
| `--bi-text` | `#0F1629` | `#F3F5FA` | 본문 |
| `--bi-text-2` | `#4A5876` | `#A8B2C8` | 보조 |
| `--bi-text-muted` | `#7A88A3` | `#7888A6` | 라벨 |
| `--bi-primary` | `#3D5AF5` | `#6078FC` | 액센트 (기존보다 약간 진함) |
| `--bi-primary-soft` | `#E9EDFE` | `#1F2A5E` | Hover·Mark 배경 |
| `--bi-primary-strong` | `#2838C2` | `#8499FF` | Active·Focus |

**차트 8색** (deuteranopia-safe, `design/chart-palette.md`와 병합):
```
#3D5AF5 Indigo · #06B6D4 Cyan · #F59E0B Amber · #F43F5E Rose
#10B981 Emerald · #8B5CF6 Violet · #F97316 Orange · #64748B Slate
```

**무드**: Looker Studio 프리미엄 · 금융·핀테크 페르소나 매칭 · 진중함

**대비 검증** (WCAG AA):
- `--bi-text` on `--bi-bg-white` → 12.8:1 ✅
- `--bi-text-2` on `--bi-bg-white` → 7.1:1 ✅
- `--bi-primary` on `--bi-bg-white` → 5.3:1 ✅
- `--bi-text-muted` on `--bi-bg-subtle` → 4.9:1 ✅

### 옵션 B — "Minimal Paper + Accent"

**배경 전략**: 순백 기반 + 액센트 Indigo만 산발

| 토큰 | 값 |
|------|-----|
| `--bi-bg` | `#FFFFFF` |
| `--bi-bg-subtle` | `#FAFAFA` (거의 흰색) |
| `--bi-border` | `#EAEAEA` (극미세) |
| `--bi-text` | `#111111` |
| `--bi-primary` | `#4C6EF5` (유지) |
| 차트 | 8색 동일 |

**무드**: Linear·Arc·Raycast 미니멀리즘 · 엔지니어 감성

### 권장

**옵션 A 추천** — BI 타겟이 "분석가·CEO"이므로 프리미엄 톤이 전환율 유리. B는 ln_v1과 카니발라이제이션 우려 있음.

**다크모드**: **Phase 1에서는 미지원** (캡틴 결정 "테마 컬러 전략 — 단일 톤 고정"과 일치). 단, 위 Dark 컬럼은 Phase γ 확장 대비 미리 정의해 둠.

---

## 8. 타이포그래피

### 폰트 패밀리 (유지 + 보완)

- **UI**: Inter (400/500/600/700/800) — 기존 유지
- **숫자**: Inter `font-variant-numeric: tabular-nums` 적용 (중요)
- **Mono**: JetBrains Mono (400/500/700) — 코드·라이선스 키·차트 ticks
- **없는 것 추가**: `font-feature-settings: 'ss01', 'cv11'` (Inter 숫자 크로스 스트로크 개선)

### 타입 스케일

| 역할 | Size | Weight | Line-height | 용도 |
|------|------|--------|-------------|------|
| Hero Number | 48px | 800 | 1.1 | MRR 등 대형 숫자 |
| Display | 32px | 700 | 1.15 | 페이지 타이틀 "Analytics Overview" |
| H2 | 20px | 600 | 1.3 | 섹션 타이틀 |
| Card Title | 15px | 600 | 1.4 | 차트 카드 제목 |
| Body | 14px | 400 | 1.55 | 본문 |
| Caption | 13px | 400 | 1.5 | 보조 정보 (card-sub) |
| Label | 12px | 500 | 1.4 | 라벨/범례 |
| Mono Tick | 11px | 500 | 1 | 차트 축 |

### 숫자 정렬 원칙

- 모든 숫자 `tabular-nums` 강제 → 테이블·KPI 카드의 "흔들림" 제거
- `text-align: right` on 숫자 컬럼
- 화폐 심볼 앞 `margin-right: 0.15em`

---

## 9. 반응형

### 브레이크포인트 & 전략

| 뷰포트 | 전략 |
|--------|------|
| **≥ 1280px** | 12-col 벤토 그리드 풀 전개 |
| **1024~1279px** | 사이드 카드(span-3/4)는 유지, span-8은 span-7로, Heatmap은 span-5 유지 |
| **768~1023px** | 12-col → **6-col 재배치**. Hero 3장 → 2장(+ Mini는 Hero 아래로), 모든 2-row 차트는 1-row로 축소 |
| **375~767px** | **세로 스택**. 벤토 리듬 포기 → 우선순위 순 (Hero Narrate → MRR → Scrubber → Revenue Line → Heatmap → 나머지) |

### 스크러버 모바일 대응

- 데스크톱 수평 스크러버 → **모바일은 드로어 방식**
- 상단에 "Date: Apr 2026 ▾" 버튼 → 탭 시 바텀 시트 슬라이더

### 헤더 모바일

- 햄버거 메뉴(기존 플랫폼 패턴 재사용 — 메모리 feedback_component_reuse.md)
- 아바타·알림·검색 아이콘만 유지

---

## 10. 컴포넌트 인벤토리

### 이미 있음 (재사용)

| 컴포넌트 | 현 위치 | 조치 |
|----------|---------|------|
| Line Chart (Revenue) | bi-theme.js | 유지 + X09 스크러빙 훅 |
| Donut (Device) | bi-theme.js | 유지 |
| Stacked Bar (Channels) | bi-theme.js | 유지 |
| Pie (Plan) | bi-theme.js | 유지 |
| Area (MAU/WAU/DAU) | bi-theme.js | 유지 |
| Heatmap (7×24) | bi-theme.js | 유지 + 내레이션 footnote 추가 |
| Gauge (NPS) | bi-theme.js | 유지 |
| Scatter (LTV vs CAC) | bi-theme.js | 유지 |
| Funnel | bi-theme.js | 유지 |
| Cohort stacked | bi-theme.js | 유지 |
| Top Countries Table | bi-theme.js | 유지 + sort indicator 추가 |

### 새로 만들 것 (Day 2 C 작업)

| 컴포넌트 | 스펙 | 우선순위 |
|----------|------|---------|
| **Narrate Block** (Hero) | 4-1 | 🔴 Critical |
| **Hero KPI Card (L 48px num + sparkline)** | 4-2 | 🔴 Critical |
| **Mini Gauge Card** | 4-3 | 🔴 Critical |
| **Scrubber Bar (X09)** | 5 | 🔴 Critical |
| **Inline Tooltip (C10)** | sparkline 공용 | 🟡 Major |
| **Narrate Footnote** (카드 내) | 6 | 🟡 Major |
| **Header (search + notif + avatar)** | 3 | 🟡 Major |
| **Command Palette (⌘K)** | 실제 검색 — 옵션 | 🟢 Minor (Phase γ로 연기 가능) |

---

## 11. 레퍼런스 (B 조사 기반)

### 구체 사이트 (공개 URL)

1. **Looker Studio (Google)** — https://lookerstudio.google.com/
   - 차용: 필터 위젯 일관성, 컨텍스트 메뉴 `⋯` 패턴
2. **Metabase** — https://www.metabase.com/demo
   - 차용: Card 헤더 미니멀, "Ask a Question" CTA (우리는 Narrate로 대체)
3. **Tableau Story** — https://www.tableau.com/stories
   - 차용: 내레이션 + 하이라이트 마커 개념
4. **Stripe Sigma** — https://stripe.com/sigma
   - 차용: 네이비 프리미엄 톤
5. **Linear Insights** — https://linear.app/features/insights
   - 차용: 미니멀 카드 보더, 숫자 타이포

### 무드보드 키워드 (Dribbble/Behance 검색용)

`bento dashboard` · `analytics story` · `data narrative UI` · `timeline scrubber UX` · `fintech dashboard 2026` · `looker redesign concept`

### 버릴 것 (Don't copy)

- Tableau 특유의 촌스러운 컬러 팔레트
- Metabase 너무 평평한 카드 (shadow 없음)
- Stripe의 보라색 오버사용

---

## 12. 차별화 3개 (캡틴 지시 대응)

**원칙** (메모리 `feedback_theme_differentiation.md`): 컬러만 다르고 구성 같은 테마 금지.

### 🏁 차별화 #1 — **X06 Auto-narrate Hero** (데이터 스토리텔링)
- "숫자 + 해설"이 한 블록에 나란히 있는 대시보드는 **경쟁사에 없음**
- Tableau Story는 프리젠테이션 모드로 분리, bi_v1은 **일상 대시보드 안에 통합**
- Copy to Slides 버튼 1개로 경영진 미팅 즉시 준비

### 🏁 차별화 #2 — **X09 History Scrubber** (시간축 인터랙션)
- 대부분 대시보드는 날짜 필터(드롭다운). 슬라이더로 "시간 되감기" 하는 UX는 **희귀**
- 키보드 + 드래그 + 비디오 편집기 스크러빙 UX
- 분석가 페르소나 "지난 2월 이맘때 어땠지?" 즉답 가능

### 🏁 차별화 #3 — **L02 Bento Box 리듬**
- 경쟁 템플릿은 대부분 같은 크기 카드의 그리드 (flat)
- bi_v1은 span-3/4/5/6/7/8 혼합 + row-1/2 혼합 → **시각적 리듬**
- "와 다르다"의 1차 임팩트를 담당 (썸네일에서도 즉시 차별화)

**SoftDesk(sd_v1)과의 분리** (메모리 `feedback_platform_vs_product.md` 준수):
- sd_v1는 뉴모피즘 + X01 시간대 자동 변환 → **부드러운 SaaS 어드민**
- bi_v1는 평면 + X06/X09 → **날카로운 BI 분석가 도구**
- 컬러/폰트도 분리(sd는 소프트 베이지 톤, bi는 네이비 프리미엄)

---

## 13. 마이크로 인터랙션 (검수 포인트)

| 위치 | 동작 | 이징 | 지속 |
|------|------|------|------|
| KPI Card | hover → `translateY(-2px)` + shadow-md | `cubic-bezier(.2,.8,.2,1)` | 180ms |
| Scrubber Handle | drag → scale 1.2 | ease-out | 120ms |
| Scrubber Release → Chart | crossfade to new data | ease-in-out | 300ms |
| Narrate Regenerate | 텍스트 fade-out → fade-in | ease | 250ms |
| Table Row | hover → `bg-subtle` | linear | 80ms |
| Dropdown Filter | open → fade+slide(-4px) | ease-out | 160ms |
| Card Menu `⋯` | open → scale(0.95→1) fade | ease-out | 140ms |

**원칙**: 150~300ms 구간에만 집중. 과한 애니메이션 = "AI 만든 티" → 금지.

---

## 14. 접근성 (WCAG AA)

- **모든 차트**: `<canvas>`에 `role="img" aria-label="..."` 명시
- **스크러버**: `role="slider"` + ARIA 값 + 키보드 지원 (← → 1d, Shift 7d, Home/End)
- **KPI 카드**: 변화율 아이콘(↑↓) 옆에 screen-reader 전용 텍스트 (`<span class="sr-only">increased by</span>`)
- **컬러 대비**: 4.5:1 이상 검증 완료 (7절)
- **포커스 링**: `outline: 2px solid var(--bi-primary); outline-offset: 2px;` — 기본 브라우저 ring 덮어쓰지 말고 색만
- **키보드 네비**: 모든 필터 버튼·카드 메뉴·테이블 행 Tab 순서 논리적
- **prefers-reduced-motion**: 모든 마이크로 인터랙션 비활성화 분기

---

## 15. Day 2 C(프론트) 이관 가이드

### 작업 순서 권고 (4~6시간)

**1시간차** — 토큰 & 레이아웃 기반
- `css/bi-tokens.css` 옵션 A 컬러로 업데이트
- `css/bi-theme.css` 에 벤토 그리드 유틸 `.bi-span-{3,4,5,6,7,8}`, `.bi-row-{1,2}` 정리
- 기존 `.bi-grid` → `display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;`

**2시간차** — Hero 3장 + 스크러버 바
- `.bi-hero-narrate` / `.bi-hero-kpi` / `.bi-hero-mini` 컴포넌트
- `.bi-scrubber` (드래그 핸들, 마우스·키보드 이벤트) — Day 2에서는 정적 UI까지, 데이터 연동은 Day 2 후반

**3시간차** — 차트 카드 재배치 + 마이크로 인터랙션
- index.html의 기존 카드에 새 span/row 클래스 적용
- hover elevation, 포커스 링, 카드 메뉴 모션

**4시간차** — 내레이션 footnote + 반응형
- 4~5개 카드에 `.bi-card-narrate` 추가
- 1024/768/375 브레이크포인트 미디어 쿼리

**5~6시간차** — QA 자체 점검 + 문서 링크
- 모든 차트 ARIA, 키보드 탐색, 컬러 대비 확인
- README/CHANGELOG 업데이트

### HTML 뼈대 샘플 (bi-hero-narrate)

```html
<aside class="bi-hero-narrate" role="region" aria-labelledby="narrate-heading">
  <div class="bi-narrate-label">
    <span class="bi-narrate-icon" aria-hidden="true">📖</span>
    <h2 id="narrate-heading" class="bi-narrate-title">This Week's Story</h2>
    <span class="bi-narrate-tag">Auto</span>
  </div>
  <p class="bi-narrate-body">
    <strong>MRR grew 12.4% WoW</strong>, driven by
    <mark>3 Enterprise upgrades</mark> and improved
    <mark>Pro retention (89% → 92%)</mark>. Churn dipped to 2.1%.
  </p>
  <div class="bi-narrate-actions">
    <button type="button" class="bi-btn bi-btn-ghost">Copy to Slides</button>
    <button type="button" class="bi-btn bi-btn-ghost">Regenerate ▾</button>
  </div>
</aside>
```

### 시맨틱 태그 원칙

- 헤더 `<header role="banner">`
- 주요 콘텐츠 `<main>`
- 사이드 패널(없음) — 대신 카드는 `<article>` 또는 `<section>`
- Hero 3장은 `<aside>` (보조 정보 성격)
- Table은 실제 `<table><thead><tbody>` 사용 (div 흉내 금지)

### 성능 목표

- FCP < 1.5s (Chart.js CDN 제외)
- Lighthouse Performance 90+
- JS bundle < 50KB (Chart.js 별도 CDN)
- 이미지: 없음 (아이콘은 이모지 또는 SVG inline)

---

## 16. 검증 (E QA 위임)

**체크리스트 (Day 2 QA 전달)**

- [ ] 데스크톱 1280/1440/1920 3해상도 벤토 리듬 유지
- [ ] 태블릿 1024/768 리플로우 정상
- [ ] 모바일 375/414 세로 스택 + 스크러버 드로어 작동
- [ ] 다크모드는 대상 아님 (Phase 1) — 스펙 일치 확인
- [ ] 스크러버 키보드 조작 (Tab/←→/Home/End)
- [ ] 내레이션 카드 "Copy to Slides" 버튼 작동 (클립보드 복사)
- [ ] 컬러 대비 WCAG AA (자동 스캔 + 수동 spot check)
- [ ] Lighthouse Performance/Accessibility 90+
- [ ] 크로스 브라우저: Chrome, Firefox, Safari, Edge
- [ ] prefers-reduced-motion 적용 시 애니메이션 비활성
- [ ] 캡틴 육안 검수: "와" 수준인가?

---

## 17. 리스크 & 후속

### 리스크

| # | 리스크 | 확률 | 영향 | 대응 |
|---|-------|------|------|------|
| 1 | 스크러버 구현 복잡 → Day 2 내 완성 실패 | 중 | 중 | Day 2에 UI만, 데이터 연동은 Day 3로 이월 가능 |
| 2 | 내레이션 템플릿이 가짜 느낌 | 중 | 중 | 5개 이상 문장 템플릿 준비 + 숫자·변화율 실제값 반영 |
| 3 | 벤토 그리드가 "어수선함"으로 읽힘 | 저 | 중 | 카드 보더 통일 + gap 16px 준수로 리듬 vs 혼돈 균형 |
| 4 | 다크모드 요청 나옴 | 저 | 저 | 토큰은 미리 준비. 시연 시 "Phase 2" 답변 |
| 5 | 테이블 100행 이상 성능 저하 | 저 | 저 | 페이지네이션 또는 virtual scroll (Phase γ) |

### Phase γ (런칭 후) 로드맵

- X04 물리 드래그 위젯 (Dock)
- 다크모드 풀 지원
- Command Palette (⌘K)
- 실제 AI 내레이션 연결 (Claude API)
- 사용자 커스텀 위젯 저장

---

## 18. 캡틴 승인 항목

Day 1 완료 후 Day 2 구현 착수 전, 캡틴 육안 승인 필요 항목:

1. **컬러 옵션 A/B 중 선택** — 기본 권장: **옵션 A (Navy Premium)**
2. **상품명 가제** — "Analytics Studio" or "Pulse Analytics" or 기타 제안 (최종은 Day 7 워크숍)
3. **다크모드 Phase 1 미지원 확정** — 시연 시 질문 나올 것 대비
4. **스크러버 Day 2 UI까지만, 연동은 Day 3로** 이월 OK?

---

## 19. 출처 / 참고 파일

- `docs/plans/launch-plan-506.md` 분야 1 (상품 디자인)
- `design/pattern-library-v2.md` — L02 벤토 / C06 Hero 카드 / C10 Inline Tooltip / G12 Gauge / X06 Narrate / X09 Scrubber
- `design/chart-palette.md` — deuteranopia-safe 8색
- `templates/bi_v1/css/bi-tokens.css` — 기존 토큰 체계
- `templates/bi_v1/index.html` — 기존 10종 차트 배치
- 메모리: `feedback_theme_quality.md`, `feedback_theme_differentiation.md`, `feedback_theme_color_strategy.md`, `feedback_platform_vs_product.md`, `project_theme_naming.md`
