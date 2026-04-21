# Monochrome Analytics (bw_v1) — Design System

> 순백 기반 극단 대비 · 에디토리얼 모노크롬 Analytics 대시보드
> 최종 수정: 2026-04-21

---

## 컨셉

- **스타일**: Editorial Monochrome (NYT/FT 신문 감성, 그림자·컬러 금지)
- **분위기**: 차갑고 지적인 순백 배경 + 순흑 잉크, 숫자·타이포그래피로 밀도 구현
- **핵심 가치**: 데이터의 본질에 집중, 색채 혼란 없이 오직 타이포·라인·숫자로 시각 계층 구축
- **분야**: Analytics (지표 리포트, BI, 에디토리얼 데이터 저널리즘)
- **차별화**: 대비 100% 순흑백 + H0 72px 메가 타이틀 + 하드 1px 블랙 라인 (기존 테마 6종 전부와 완전 분리)

---

## 컬러 팔레트

### 배경 (순백 고정, 다크모드 없음)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--bw-bg-base` | `#FFFFFF` | 페이지 배경 (pure white) |
| `--bw-bg-surface` | `#FFFFFF` | 카드·사이드바 (배경과 동일) |
| `--bw-bg-elevated` | `#F5F5F5` | 호버 매우 미세한 단차 |
| `--bw-bg-inset` | `#FAFAFA` | 함몰 영역 (최소한만 사용) |

### 텍스트

| 토큰 | HEX | 용도 | 배경 대비 |
|------|-----|------|----------|
| `--bw-text-primary` | `#000000` | 제목, 핵심 텍스트 | 21:1 (최대) |
| `--bw-text-secondary` | `#1A1A1A` | 본문 | 18:1 |
| `--bw-text-tertiary` | `#4A4A4A` | 보조 정보 | 9:1 |
| `--bw-text-muted` | `#8A8A8A` | 라벨, 메타 | 4.5:1 |

### 브랜드 컬러 (단색 — 컬러 금지 원칙)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--bw-accent` | `#000000` | 모든 액센트는 순흑 — 버튼, 활성 상태, 차트 메인 |
| `--bw-line` | `#000000` | 1px 하드 라인 (구분선·테두리) |
| `--bw-line-soft` | `#E5E5E5` | 초미묘 구분선 (섹션 내부) |

### 상태 (무채색 단계)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--bw-success` | `#1A1A1A` (굵은 글씨 + ↑) | 상승 — 아이콘·볼드로 표현 |
| `--bw-error` | `#1A1A1A` (굵은 글씨 + ↓) | 하락 — 아이콘·볼드로 표현 |
| `--bw-neutral` | `#8A8A8A` | 변화 없음 |

> 모노크롬 원칙: 컬러로 의미 전달 금지. 오직 굵기·크기·아이콘·라인·위치로 시각 계층 구현.

### 차트 팔레트 (흑백 그라디언트 8단계)

```
#000000 → #2C2C2C → #4A4A4A → #6B6B6B → #8A8A8A → #A8A8A8 → #C8C8C8 → #E5E5E5
```

차트 시리즈 구분: 패턴(실선/점선/대쉬) + 굵기(1.5px/2px/3px) + 위치 라벨 (인라인)

---

## 타이포그래피

- **메인 폰트 (헤딩)**: Space Grotesk (Google Fonts, OFL) — 기하학적·지적
- **코드/숫자**: JetBrains Mono (Google Fonts, OFL) — KPI·표·차트의 모든 숫자

### 스케일

| 요소 | 크기 | 굵기 | 행간 | Letter-spacing |
|------|------|------|------|----------------|
| **H0 (Mega Title Strip)** | 72px | 900 | 1.0 | -0.04em |
| H1 (페이지 타이틀) | 48px | 800 | 1.1 | -0.03em |
| H2 (섹션 타이틀) | 32px | 700 | 1.2 | -0.02em |
| H3 (Card Title) | 20px | 700 | 1.3 | -0.01em |
| Body | 15px | 400 | 1.6 | 0 |
| Caption/Label | 12px | 500 | 1.5 | 0.05em (wide) |
| Small/Meta | 11px | 500 | 1.4 | 0.08em (wider) |
| **KPI Value** | 64px | 900 | 1.0 | -0.03em (JetBrains Mono) |

### 타이포그래피 규칙
- 숫자는 항상 JetBrains Mono + `font-variant-numeric: tabular-nums`
- 라벨·caption은 대문자(`text-transform: uppercase`) + letter-spacing 확대
- 본문은 라인 높이 1.6 (독서성 우선)

---

## 레이아웃 구조

### 탑바 only (사이드바 없음)

```
┌──────────────────────────────────────────────┐
│ Topbar (64px, 1px bottom border)              │
│ [Logo] [Nav Items] ··· [User Menu]           │
├──────────────────────────────────────────────┤
│                                              │
│ ═══════════════════════════════════════════  │
│ MEGA TITLE STRIP (120px, H0 72px)            │
│ 페이지 대표 숫자 또는 메가 타이틀             │
│ ═══════════════════════════════════════════  │
│                                              │
│ Main Grid (12-column, 32px gutter)          │
│ [ Card ] [ Card ] [ Card ]                   │
│                                              │
└──────────────────────────────────────────────┘
```

### Topbar
- 높이 64px, `border-bottom: 1px solid var(--bw-line)`
- 로고: "W-A/N-A/L-Y-T-I-C-S" Space Grotesk 16px tracked-wide
- 네비: 14px 500, 활성 시 볼드 + 1px underline 4px offset

### Mega Title Strip
- 높이 120px, 상하 1px black 라인
- 페이지별 핵심 숫자(예: `$182,400`) 또는 페이지명(예: `ANALYTICS / WEEK 42`)
- H0 72px 900, letter-spacing -0.04em

### 콘텐츠 그리드
- max-width: 1440px, 중앙 정렬
- padding: 32px 48px
- 12-column grid, gutter 32px
- 카드 간: 1px hard line separator (마진 없음 지향)

---

## 간격 스케일 (8px 그리드)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--bw-space-1` | 4px | 최소 간격 |
| `--bw-space-2` | 8px | 아이콘-텍스트 |
| `--bw-space-3` | 16px | 폼 간, 라벨-값 |
| `--bw-space-4` | 24px | 섹션 내부 |
| `--bw-space-5` | 32px | 카드 패딩, 카드 간 |
| `--bw-space-6` | 48px | 콘텐츠 좌우 여백 |
| `--bw-space-7` | 72px | Mega Title 높이 기준 |
| `--bw-space-8` | 120px | 페이지 섹션 간 |

---

## Border Radius — 0px 또는 2px만

| 요소 | 값 |
|------|-----|
| 전체 기본 | **0px** (하드 엣지) |
| 아바타 | 0px (square) 또는 50% (순원형 대비) |
| 뱃지 | 0px (사각 라벨 스타일) |
| 인풋/버튼 | 0px |
| 단 하나 예외: 이미지 카드 | 2px (미세 완화) |

---

## Border / Line 체계

- 모든 구분선: `1px solid #000000` (하드 블랙) — 기본
- 섹션 내부 미세 구분: `1px solid #E5E5E5` (bw-line-soft)
- 포커스 링: `outline: 2px solid #000; outline-offset: 3px`
- **그림자 금지**: `box-shadow: none !important` 원칙 (hover 상태도 라인만 변화)

---

## 컴포넌트 스펙

### KPI 카드 (Pure Number Block)
- 패딩: 32px
- border: 1px solid #000 (bw-line)
- 값: 64px 900 JetBrains Mono (KPI Value 스타일)
- 라벨: 12px 500 uppercase letter-spacing wide, text-muted
- 트렌드: 16px 900 + arrow glyph (↑ ↓) 같은 색(#000), 숫자만 볼드로 강조
- 배경: 순백, 호버 시 배경 #F5F5F5 (elevated)로만 변화

### 데이터 테이블
- 헤더: 11px 500 uppercase letter-spacing 0.08em, text-muted, `border-bottom: 1px solid #000`
- 본문: 14px JetBrains Mono(숫자) + Space Grotesk(텍스트), 행 높이 56px
- 행 구분: `border-bottom: 1px solid #E5E5E5`
- 호버: 배경 #FAFAFA 만, 그림자 금지
- 아바타: 32px square 0 radius, 모노 이니셜

### 차트 (Chart.js 4)
- 배경: 투명
- 축 라인: 1px solid #000
- 그리드: `rgba(0,0,0,0.05)` — 매우 연함
- 라인 차트: 2px stroke, 패턴(solid/dashed) 구분, 포인트 4px square
- 바 차트: 모노그라디언트 8단계, 테두리 1px #000
- 레전드: 인라인 텍스트 + 패턴 샘플 8px × 8px

### 버튼
- 패딩: 12px 24px
- 폰트: 12px 700 uppercase letter-spacing 0.1em
- Primary: `background:#000; color:#FFF; border:1px solid #000`
- Secondary: `background:#FFF; color:#000; border:1px solid #000`
- 호버: Primary → `background:#1A1A1A`, Secondary → `background:#F5F5F5`

### 인풋
- 높이 44px, 패딩 12px 16px
- border: 1px solid #000, 배경 투명
- 포커스: `border-width: 2px; outline: none`

---

## 반응형

| 디바이스 | 너비 | 탑바 | Mega Title | 그리드 |
|---------|------|------|-----------|--------|
| 데스크톱 | 1280px+ | 전체 표시 | H0 72px | 12-col 32px gutter |
| 태블릿 | 768~1279px | 축소 메뉴 | H0 56px | 8-col 24px gutter |
| 모바일 | ~767px | 햄버거 메뉴 | H0 40px | 4-col 16px gutter |

---

## 액센트 프리셋 4벌

| 프리셋 | 코드 | 무드 |
|--------|------|------|
| **Pure Mono** (기본) | `#000000` | 절대 순흑, 에디토리얼 오리지널 |
| Warm Gray | `#4A4240` | 세피아 뉘앙스, 아카이브 감성 |
| Cool Steel | `#3B4754` | 냉정한 기술 저널리즘 톤 |
| Archive Sepia | `#6B5D48` | 빈티지 뉴스페이퍼 느낌 |

> 프리셋은 텍스트·라인·아이콘의 최고 대비 색을 한 벌로 묶어서 전환

---

## 인터랙션 원칙

- **그림자 금지**: 모든 트랜지션은 라인/배경만 변화 (hover도 line-weight·background만)
- **색 변화 금지**: 호버·활성은 볼드 처리·밑줄·1px→2px 라인 굵기로 구현
- **애니메이션**: 0.12s linear (절제된 컷 전환)
- **포커스**: 2px 순흑 outline + 3px offset (접근성 WCAG AAA 수준)

---

## 파일 구조 (배포 패키지)

```
templates/bw_v1/
├── index.html          # Overview Dashboard (Mega Title + KPI strip)
├── analytics.html      # 지표 상세
├── reports.html        # 리포트 리스트
├── data.html           # 데이터 테이블 메인
├── settings.html       # 설정
├── css/
│   ├── bw-tokens.css   # CSS 변수 (커스터마이징)
│   └── bw-theme.css    # 전체 스타일
├── js/
│   ├── bw-theme.js     # 인터랙션
│   └── data.js         # 더미 데이터
└── README.md
```

---

## 시그니처 차별화 포인트

1. **H0 72px Mega Title Strip** — 다른 모든 대시보드 테마와 즉시 구분되는 대담한 헤드라인
2. **순흑 1px 하드 라인** — 그림자 대신 라인만으로 계층 구현 (에디토리얼 DNA)
3. **JetBrains Mono 숫자** — 표·차트·KPI 숫자의 완벽한 정렬 (탭기반)
4. **컬러 제로** — 오직 흑백 + 8단계 그레이, 색맹·고대비 모두 완벽 대응
