# Linea CRM (ln_v1) — Design System

> 웜 아이보리 배경 · 1px 헤어라인 미니멀 CRM (문구점 감성)
> 최종 수정: 2026-04-21

---

## 컨셉

- **스타일**: Minimal Line-Only (그림자 전면 금지, 1px 헤어라인만)
- **분위기**: 문구점·서점 감성의 웜 아이보리 배경, 조용한 집중감
- **핵심 가치**: 노이즈 제거, 타이포그래피 중심, 아웃라인 호버 채움 인터랙션
- **분야**: CRM (거래 파이프라인, 연락처, 활동 로그)
- **차별화**: 기존 cr_v1(블루 클린 플랫)과 무드 완전 분리 — 세리프 혼용 + 아이보리 + 초경량 라인

---

## 컬러 팔레트

### 배경 (웜 아이보리 고정)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--ln-bg-base` | `#FBFAF6` | 페이지 배경 (웜 아이보리) |
| `--ln-bg-surface` | `#FBFAF6` | 카드·사이드바 (배경과 동일) |
| `--ln-bg-elevated` | `#F5F2EA` | 호버 미세 단차 |
| `--ln-bg-inset` | `#F2EFE6` | 함몰 (인풋 내부 매우 드물게) |

### 텍스트

| 토큰 | HEX | 용도 | 배경 대비 |
|------|-----|------|----------|
| `--ln-text-primary` | `#111111` | 제목, 핵심 | 17:1 |
| `--ln-text-secondary` | `#2E2C27` | 본문 | 13:1 |
| `--ln-text-tertiary` | `#5A5750` | 보조 | 7:1 |
| `--ln-text-muted` | `#8F8A7F` | 라벨, 메타 | 4.5:1 |

### 브랜드 컬러 (Ink Black 기반)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--ln-primary` | `#111111` | Ink Black — 모든 라인·텍스트·버튼 기본 |
| `--ln-accent` | `#111111` | 활성 상태도 ink black (굵기로 구분) |
| `--ln-line` | `#111111` | 1px 헤어라인 (구분·테두리) |
| `--ln-line-soft` | `#D8D3C5` | 초미묘 라인 (섹션 내부) |

### 상태 (아웃라인으로 표현)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--ln-success` | `#1E4D3A` | Forest — 성공 (오직 라인·글자색으로) |
| `--ln-warning` | `#8B6F1E` | Amber Dark — 경고 |
| `--ln-error` | `#8B2E1E` | Rust — 에러 |
| `--ln-info` | `#1B3A5B` | Navy Deep — 정보 |

> 상태 표현 원칙: 배경 채우기 금지. 오직 텍스트 색 + 1px 아웃라인 뱃지로만.

### 차트 팔레트 (웜 뉴트럴 8단계)

```
#111111 → #5A5750 → #8F8A7F → #B5553A → #1E4D3A → #8B6F1E → #1B3A5B → #5B1B52
```

---

## 타이포그래피

- **본문 폰트**: Inter (Google Fonts, OFL) — 절제된 산세리프
- **헤드라인 폰트**: Fraunces (Google Fonts, OFL) — 현대 세리프 (에디토리얼 강조용)

### 스케일

| 요소 | 크기 | 굵기 | 행간 | 폰트 |
|------|------|------|------|------|
| **H1 (세리프 헤드)** | 36px | 500 | 44px | Fraunces (italic 강조 지점) |
| H2 (섹션 타이틀) | 24px | 600 | 32px | Inter |
| Card Title | 16px | 600 | 22px | Inter |
| **Quote/Strong** | 20px | 400 italic | 28px | Fraunces |
| Body | 14px | 400 | 22px | Inter |
| Caption/Label | 12px | 500 | 16px | Inter |
| Small/Meta | 11px | 400 | 14px | Inter |
| KPI Value | 32px | 500 | 40px | Fraunces (세리프 숫자) |

### 타이포그래피 규칙
- H1은 Fraunces 사용 — 에디토리얼 감성, 이탤릭 포인트
- 본문·표는 Inter
- 세리프는 제목·인용·강조에만 (과용 금지)

---

## 레이아웃 구조

### 이중 네비 (미니 사이드바 + 서브 탑)

```
┌───┬───────────────────────────────────────┐
│   │ Primary Top Nav (48px)                │
│ 72│ [Dashboard] [Deals] [Contacts] [Reports]│
│ S ├───────────────────────────────────────┤
│ I │ Sub Top Nav (40px, 카테고리 세부)     │
│ D │ All | Active | Archived | Favorites   │
│ E ├───────────────────────────────────────┤
│ B │                                       │
│ A │ Main Content                          │
│ R │ (max-width 1400px, 48px padding)     │
│   │                                       │
│ 72│                                       │
└───┴───────────────────────────────────────┘
```

- **미니 사이드바**: 72px, 아이콘 only (1.25px stroke), 라벨 툴팁
- **Primary Top**: 핵심 모듈 네비 (Dashboard / Deals / Contacts / Reports)
- **Sub Top**: 현재 모듈 내 서브 필터 (All / Active / Archived)
- **메인**: max-width 1400px 중앙 정렬, padding 48px

### 미니 사이드바
- 너비 72px
- 아이콘 24px, stroke 1.25px (초경량)
- 각 아이템 높이 56px
- 활성: 좌측 2px ink black bar + 아이콘 opacity 1.0
- 비활성: opacity 0.5

---

## 간격 스케일

| 토큰 | 값 |
|------|-----|
| `--ln-space-1` | 4px |
| `--ln-space-2` | 8px |
| `--ln-space-3` | 12px |
| `--ln-space-4` | 16px |
| `--ln-space-5` | 24px |
| `--ln-space-6` | 32px |
| `--ln-space-7` | 48px |
| `--ln-space-8` | 64px |

---

## Border Radius — 거의 0 또는 4px만

| 요소 | 값 |
|------|-----|
| 카드 | 4px (극미 완화) |
| 뱃지 | 2px |
| 버튼 | 4px |
| 인풋 | 4px |
| 아바타 | 50% (원형) |

---

## Border / Line 체계 — 초경량 헤어라인

- 기본 구분선: `1px solid #111111` (ink black)
- 섹션 내부: `1px solid #D8D3C5` (웜 아이보리 라인)
- **그림자 전면 금지**: `box-shadow: none` 원칙 (호버도 라인만)
- 포커스: `outline: 1px solid #111; outline-offset: 2px`

---

## 컴포넌트 스펙

### KPI 카드
- 패딩 32px, border 1px solid #111, radius 4px
- 값: 32px Fraunces 500 (세리프 숫자 — 에디토리얼 톤)
- 라벨: 11px 500 uppercase letter-spacing 0.1em, text-muted
- 배경 채우기 없음, 호버 시 배경 아이보리 elevated
- 트렌드: 작은 ↑↓ 글리프 + 색상 텍스트 (라인 볼드 금지)

### 데이터 테이블
- 헤더: 11px 500 uppercase letter-spacing 0.1em, `border-bottom: 1px solid #111`
- 본문: 14px Inter, 행 높이 52px
- 행 구분: `border-bottom: 1px solid #D8D3C5`
- 호버: 배경 #F5F2EA
- 아바타: 28px 원형 + 이니셜 10px

### 차트 (Chart.js 4)
- 배경: 투명
- 축: 1px solid #111
- 그리드: rgba(17,17,17,0.04) 매우 연함
- 라인: 1.5px stroke, 패턴 구분
- 포인트: 3px 흰색 + 1px ink black 테두리

### 버튼 (아웃라인 → 호버 채움)
```css
padding: 10px 24px;
background: transparent;
color: #111;
border: 1px solid #111;
border-radius: 4px;
font-size: 13px;
font-weight: 500;
transition: all 0.15s ease;
```
- 호버: `background: #111; color: #FBFAF6` (인장 효과)
- Primary 변형: 기본부터 채움(`background: #111; color: #FBFAF6`), 호버 시 배경 #2E2C27

### 인풋
- 높이 44px, 패딩 12px 16px
- border: 1px solid #D8D3C5, 포커스 시 #111 1px
- 배경 투명

### 카테고리 칩/뱃지
- 패딩 4px 10px, border 1px solid #111, radius 2px
- 배경 투명, text 11px 500
- 색상 구분은 텍스트·라인 색상으로만 (배경 채우기 금지)

---

## 반응형

| 디바이스 | 사이드바 | Primary Top | Sub Top |
|---------|---------|-------------|---------|
| 데스크톱 1280px+ | 72px 전체 | 노출 | 노출 |
| 태블릿 768~1279px | 72px 전체 | 노출 | 드롭다운 축약 |
| 모바일 ~767px | 하단 네비 | 햄버거 | 현재 필터만 표시 |

---

## 액센트 프리셋 4벌

| 프리셋 | 코드 | 무드 |
|--------|------|------|
| **Ink Black** (기본) | `#111111` | 미니멀, 깔끔 |
| Deep Navy | `#1B2942` | 프리미엄 저널, 신뢰 |
| Forest | `#1E4D3A` | 자연, 성장 |
| Terracotta | `#B5553A` | 빈티지, 따뜻함 |

---

## 인터랙션 원칙

- **그림자 금지**: 모든 컴포넌트 box-shadow none
- **색 변화 최소**: 배경은 elevated 톤만, 텍스트는 기본 ink black 유지
- **라인만 변화**: 호버 시 1px → 2px 굵기 변화, 또는 라인 색 shift
- **애니메이션**: 0.15s ease (절제된)
- **세리프 포인트**: 페이지당 1~2곳에 Fraunces 이탤릭으로 악센트

---

## 파일 구조

```
templates/ln_v1/
├── index.html          # Overview (파이프라인 요약)
├── deals.html          # 거래 관리
├── contacts.html       # 연락처
├── activities.html     # 활동 로그
├── reports.html        # 리포트
├── css/
│   ├── ln-tokens.css
│   └── ln-theme.css
├── js/
│   ├── ln-theme.js
│   └── data.js
└── README.md
```

---

## 시그니처 차별화 포인트

1. **웜 아이보리 + 1px 헤어라인만** — 기존 cr_v1의 블루 플랫과 무드 완전 다름
2. **세리프 혼용 (Inter + Fraunces)** — H1·KPI·인용에 세리프 포인트로 에디토리얼 감성
3. **미니 사이드바 72px + 서브 탑 네비 이중 구조** — 타 테마에 없는 레이아웃
4. **아웃라인 → 호버 채움** — 인장·스탬프 같은 인터랙션, 문구점 감성
5. **그림자 전면 금지 · 색 채우기 최소화** — 절제의 미학
