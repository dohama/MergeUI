# Neon Market (bd_v1) — Design System

> 네온 차콜 기반 · Y2K 네온 팝 E-Commerce 어드민 (화려 · Bold · Vibrant)
> 최종 수정: 2026-04-21

---

## 컨셉

- **스타일**: Bold Neon Pop (Y2K 리바이벌, 오버사이즈 타이포, 네온 글로우)
- **분위기**: 전기적·미래적·강렬, 클럽 포스터·뮤직 스트리밍 앱 감성
- **핵심 가치**: 주목성·임팩트, 젊은 층 E-Commerce 브랜드에 최적
- **분야**: E-Commerce 어드민 (DTC 패션, 네온 라이프스타일 브랜드)
- **차별화**: 기존 ec_v1(다크 글래스 + 코랄)과 완전 분리 — 네온 치콜 + 오버사이즈 디스플레이

---

## 컬러 팔레트

### 배경 (네온 차콜 고정)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--bd-bg-base` | `#0A0A0A` | 페이지 배경 (neon charcoal) |
| `--bd-bg-surface` | `#141414` | 카드 배경 |
| `--bd-bg-elevated` | `#1F1F1F` | 호버 / 활성 |
| `--bd-bg-inset` | `#050505` | 함몰 |

### 텍스트

| 토큰 | HEX | 용도 | 배경 대비 |
|------|-----|------|----------|
| `--bd-text-primary` | `#FFFFFF` | 제목, 핵심 | 20:1 |
| `--bd-text-secondary` | `#D4D4D4` | 본문 | 13:1 |
| `--bd-text-muted` | `#8A8A8A` | 라벨, 메타 | 4.5:1 |
| `--bd-text-neon` | `#FF2D87` | 네온 강조 텍스트 | 대비 확보 |

### 브랜드 컬러 (네온 3색)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--bd-primary` | `#FF2D87` | Electric Pink — 주 액센트 (CTA, 활성, KPI 강조) |
| `--bd-sub` | `#39F2AE` | Neon Mint — 성공, 성장, 보조 CTA |
| `--bd-third` | `#F3FF4A` | Volt Yellow — 포인트, 알림, 핫 아이템 |
| `--bd-glow-pink` | `rgba(255,45,135,0.5)` | 핑크 글로우 |
| `--bd-glow-mint` | `rgba(57,242,174,0.5)` | 민트 글로우 |

### 그라디언트 시그니처

```css
/* 시그니처 그라디언트 — 보라→핑크→시안 */
background: linear-gradient(135deg, #B43CFF 0%, #FF2D87 50%, #39F2AE 100%);

/* 네온 보더 */
border-image: linear-gradient(135deg, #FF2D87, #39F2AE) 1;

/* 네온 글로우 */
box-shadow: 0 0 24px #FF2D87, 0 0 48px rgba(255,45,135,0.3);
```

### 상태 컬러 (네온 톤)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--bd-success` | `#39F2AE` | 성공 |
| `--bd-warning` | `#F3FF4A` | 경고 |
| `--bd-error` | `#FF3D3D` | 에러 |
| `--bd-info` | `#4AD4FF` | 정보 |

### 차트 팔레트 (네온 8색)

```
#FF2D87 → #39F2AE → #F3FF4A → #B43CFF → #4AD4FF → #FF6B1A → #FFFF00 → #B4FF39
```

---

## 타이포그래피

- **헤드라인**: Unbounded (Google Fonts, OFL) — 둥글고 볼드한 디스플레이
- **본문**: Archivo (Google Fonts, OFL) — 모던 그로테스크, 가독성

### 스케일

| 요소 | 크기 | 굵기 | 행간 | 폰트 |
|------|------|------|------|------|
| **Display (Hero)** | 96px | 900 | 0.9 | Unbounded |
| H1 | 56px | 800 | 1.05 | Unbounded |
| H2 | 36px | 700 | 1.2 | Unbounded |
| H3 (Card Title) | 20px | 700 | 1.3 | Archivo |
| Body | 14px | 500 | 1.6 | Archivo |
| Caption (Label) | 11px | 700 | 1.4 | Archivo uppercase letter-spacing 0.15em |
| KPI Value | 48px | 900 | 1.0 | Unbounded |

### 타이포그래피 규칙
- 디스플레이·KPI는 무조건 Unbounded (크게·진하게)
- letter-spacing을 일반보다 넓게 (`0.05em`~`0.15em`) — 공간감
- 대문자 사용 많음 (라벨·뱃지 전부 uppercase)

---

## 레이아웃 구조

### 마사이너리(Masonry) 카드 그리드 + 탑바 only

```
┌──────────────────────────────────────────────┐
│ Topbar 72px + 네온 bottom border             │
│ [Logo BOLD] [Search] ··· [User]              │
├──────────────────────────────────────────────┤
│                                              │
│ ═══ DISPLAY HERO (96px Unbounded Title) ═══  │
│                                              │
│ ┌──┐  ┌─────┐   ┌──────┐                    │
│ │KP│  │Card │   │ Big  │                    │
│ │  │  │small│   │ Chart│                    │
│ └──┘  └─────┘   │      │                    │
│ ┌──────┐        └──────┘                    │
│ │ Card │  ┌──┐   ┌───────┐                  │
│ │ wide │  │  │   │ table │                  │
│ └──────┘  └──┘   └───────┘                  │
│ (마사이너리 자유 배치, 카드마다 크기 다름)   │
└──────────────────────────────────────────────┘
```

- **탑바**: 72px (일반보다 큼), 하단 네온 그라디언트 라인
- **Display Hero**: 페이지 최상단 96px 메가 디스플레이 타이틀
- **마사이너리 그리드**: 카드마다 다양한 크기·비율 혼합, CSS Grid `grid-auto-flow: dense`

---

## 간격 스케일

| 토큰 | 값 |
|------|-----|
| `--bd-space-1` | 4px |
| `--bd-space-2` | 8px |
| `--bd-space-3` | 12px |
| `--bd-space-4` | 16px |
| `--bd-space-5` | 24px |
| `--bd-space-6` | 32px |
| `--bd-space-7` | 48px |
| `--bd-space-8` | 72px |

---

## Border Radius — 다양 혼용

| 요소 | 값 | 의도 |
|------|-----|------|
| 기본 카드 | 6px | 세련 |
| 큰 히어로 | 24px | 둥글 |
| 버튼 | 0px (각 형태) | 포스터 감성 |
| Pill 버튼 | 9999px | 캡슐형 |
| 인풋 | 6px | |
| 아바타 | 50% |
| **포인트**: 한 페이지에 여러 radius 혼용 — 비대칭 구성 |

---

## 컴포넌트 스펙

### KPI 카드 (Glow Card)
- 배경 `--bd-bg-surface`
- 2px solid 그라디언트 보더 (core 시그니처)
- 패딩 28px, radius 6px 또는 24px (랜덤 느낌)
- 값: 48px Unbounded 900, primary 컬러 강조
- 라벨: 11px 700 uppercase letter-spacing 0.15em
- 호버: `box-shadow: 0 0 32px var(--bd-glow-pink)` (네온 글로우)

### Primary CTA 버튼
```css
padding: 14px 32px;
background: linear-gradient(135deg, #B43CFF, #FF2D87, #39F2AE);
color: white;
border: none;
border-radius: 9999px;
font-family: Unbounded;
font-weight: 800;
font-size: 13px;
text-transform: uppercase;
letter-spacing: 0.1em;
box-shadow: 0 8px 32px rgba(255,45,135,0.4);
```
- 호버: transform scale(1.03) + 글로우 증가

### Secondary 버튼
- 배경 투명, 2px neon pink border, radius 9999px pill
- 호버: 배경 pink 채움

### 데이터 테이블
- 헤더: 11px 700 uppercase, border-bottom 2px neon gradient
- 본문: 14px Archivo, 행 높이 60px (넓음)
- 호버: `background: rgba(255,45,135,0.08)` + 좌측 3px neon pink bar

### 차트 (Chart.js 4)
- 배경: 투명
- 그리드: rgba(255,255,255,0.06)
- 라인: 3~4px stroke, 네온 컬러, glow filter 적용
- 영역 채우기: 네온 그라디언트 반투명
- 포인트: 8px, 네온 색 + 외곽 글로우

### 이미지 카드 (상품 썸네일)
- radius 6px
- 호버 시 네온 보더 강조 + scale(1.02)
- 배지 오버레이 (핫·세일) — absolute top-right

---

## 반응형

| 디바이스 | 레이아웃 | Display Hero |
|---------|---------|-------------|
| 데스크톱 1280px+ | 마사이너리 전체 | 96px |
| 태블릿 768~1279px | 마사이너리 2-col | 64px |
| 모바일 ~767px | 단일 컬럼 | 40px |

---

## 액센트 프리셋 4벌

| 프리셋 | 코드 | 무드 |
|--------|------|------|
| **Electric Pink** (기본) | #FF2D87 | Y2K 팝 |
| Cyber Yellow | #F3FF4A | 전기 네온 옐로우, 시선 극대화 |
| Toxic Green | #B4FF39 | 독성·사이버펑크 그린 |
| Ultraviolet | #B43CFF | 보라 디스코, 클럽 감성 |

---

## 유틸리티 클래스

| 클래스 | 효과 |
|--------|------|
| `.bd-neon-glow` | 네온 글로우 섀도우 |
| `.bd-gradient-border` | 그라디언트 보더 |
| `.bd-gradient-text` | 그라디언트 텍스트 |
| `.bd-pill` | pill 버튼 |
| `.bd-masonry` | 마사이너리 그리드 컨테이너 |

---

## 인터랙션 원칙

- **글로우 on hover** — 모든 인터랙티브 요소는 호버 시 네온 글로우 증가
- **scale 1.02~1.03** — 클릭 가능 요소는 호버 시 미세 확대
- **애니메이션**: 0.2s cubic-bezier(0.16,1,0.3,1) (바운시)
- **그라디언트 대량 사용** — 보더·텍스트·배경 자유롭게

---

## 파일 구조

```
templates/bd_v1/
├── index.html          # Overview (Display Hero + 마사이너리)
├── products.html       # 상품 관리
├── orders.html         # 주문
├── customers.html      # 고객
├── marketing.html      # 마케팅 캠페인
├── css/
│   ├── bd-tokens.css
│   └── bd-theme.css
├── js/
│   ├── bd-theme.js
│   └── data.js
└── README.md
```

---

## 시그니처 차별화 포인트

1. **Display Hero 96px Unbounded** — 어떤 E-Commerce 템플릿에도 없는 대담한 헤더
2. **마사이너리 그리드** — 카드마다 다른 크기·radius, 포스터 같은 구성
3. **네온 글로우 + 그라디언트 보더** — 네온 치콜 배경 위 전기적 시그니처
4. **Unbounded + Archivo 듀오** — 둥글 볼드 디스플레이 + 모던 그로테스크 본문
5. **Y2K 네온 팝 무드** — 2025년 E-Commerce 트렌드 DTC 패션에 최적
