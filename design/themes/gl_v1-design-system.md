# Aurora SaaS (gl_v1) — Design System

> 파스텔 그라디언트 메쉬 배경 · 하얀 글래스모피즘 SaaS 어드민
> 최종 수정: 2026-04-21

---

## 컨셉

- **스타일**: White Glassmorphism (반투명 유리 + 프로스트 블러)
- **분위기**: 몽환적 · 에어리 · 여성적 감성, 파스텔 오로라 무드
- **핵심 가치**: 부드러운 깊이감, 시각적 편안함, Zapier/Linear 같은 모던 SaaS 감성
- **분야**: SaaS 어드민 (프로덕트 관리, 워크스페이스, 팀 협업)
- **차별화**: 기존 ec_v1(다크 글래스)와 반대 방향의 화이트 글래스 — 파스텔 메쉬 + 프로스트 유리

---

## 컬러 팔레트

### 배경 (파스텔 그라디언트 메쉬 고정)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--gl-bg-base` | `#F4F0FF` | 페이지 베이스 (라벤더 틴트) |
| `--gl-bg-mesh-1` | `#FFD9EC` | 메쉬 오브 1 (피치) |
| `--gl-bg-mesh-2` | `#D5F4E6` | 메쉬 오브 2 (민트) |
| `--gl-bg-mesh-3` | `#E0DBFF` | 메쉬 오브 3 (라벤더 딥) |
| `--gl-bg-glass` | `rgba(255,255,255,0.6)` | 유리 카드 배경 |
| `--gl-bg-glass-strong` | `rgba(255,255,255,0.75)` | 모달·드롭다운 |

### 배경 구현 (body)
```css
body {
  background: #F4F0FF;
}
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(at 15% 20%, #FFD9EC 0%, transparent 50%),
    radial-gradient(at 85% 10%, #D5F4E6 0%, transparent 45%),
    radial-gradient(at 50% 80%, #E0DBFF 0%, transparent 50%);
  filter: blur(40px);
  z-index: -1;
}
```

### 텍스트

| 토큰 | HEX | 용도 | 배경 대비 |
|------|-----|------|----------|
| `--gl-text-primary` | `#1E1B3A` | 제목, 핵심 | 12:1 |
| `--gl-text-secondary` | `#4A4566` | 본문 | 7:1 |
| `--gl-text-muted` | `#8A85A8` | 라벨, 메타 | 4.5:1 |
| `--gl-text-on-glass` | `#1E1B3A` | 유리 위 텍스트 (가독성 보장) | 7:1+ |

### 브랜드 컬러

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--gl-primary` (메인) | `#8B7CF0` | Aurora Purple — 주 액센트, CTA, 활성 |
| `--gl-sub` (서브) | `#FF9BC0` | Cherry Blossom — 그라디언트용, 강조 |
| `--gl-third` (서드) | `#8EDCD5` | Mint Breeze — 보조, 성공, 진행바 |

### 그라디언트 CTA
```css
background: linear-gradient(135deg, #8B7CF0 0%, #FF9BC0 100%);
```

### 상태 컬러

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--gl-success` | `#5CC689` | 성공 |
| `--gl-warning` | `#F5B84E` | 경고 |
| `--gl-error` | `#F06B7E` | 에러 |
| `--gl-info` | `#6FB8F2` | 정보 |

### 차트 팔레트 (파스텔 8색)

```
#8B7CF0 → #FF9BC0 → #8EDCD5 → #F5B84E → #6FB8F2 → #C9E8A4 → #FFB8A3 → #B8A9F7
```

---

## 타이포그래피

- **메인 폰트 (전체)**: Plus Jakarta Sans (Google Fonts, OFL)
  - 둥글고 따뜻한 기하학적 산세리프, 글래스모피즘과 완벽 매칭

### 스케일

| 요소 | 크기 | 굵기 | 행간 |
|------|------|------|------|
| H1 (페이지 타이틀) | 28px | 700 | 36px |
| H2 (섹션) | 22px | 700 | 30px |
| Card Title | 17px | 600 | 24px |
| Body | 14px | 500 | 22px |
| Caption/Label | 12px | 600 | 16px |
| Small/Meta | 11px | 500 | 14px |
| KPI Value | 34px | 800 | 42px |

---

## 글래스모피즘 체계

### Card (기본 유리 카드)
```css
background: rgba(255,255,255,0.6);
backdrop-filter: blur(24px) saturate(1.4);
-webkit-backdrop-filter: blur(24px) saturate(1.4);
border: 1px solid rgba(255,255,255,0.7);
border-radius: 20px;
box-shadow:
  0 8px 32px rgba(139,124,240,0.08),
  inset 0 1px 0 rgba(255,255,255,0.9);
```

### Glass Modal (모달·드롭다운)
```css
background: rgba(255,255,255,0.75);
backdrop-filter: blur(40px) saturate(1.6);
border: 1px solid rgba(255,255,255,0.8);
border-radius: 24px;
```

### Glass Button (Secondary)
```css
background: rgba(255,255,255,0.5);
backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.8);
```

### Glass Sidebar (플로팅 사이드바)
```css
position: fixed;
top: 16px; left: 16px; bottom: 16px;
width: 240px;
background: rgba(255,255,255,0.55);
backdrop-filter: blur(28px) saturate(1.5);
border-radius: 20px;
border: 1px solid rgba(255,255,255,0.7);
box-shadow: 0 10px 40px rgba(139,124,240,0.1);
```

---

## 레이아웃 구조

```
┌────────────────────────────────────────┐
│ (메쉬 배경 파스텔 오브 3개 블러 처리)  │
│                                        │
│ ┌────┐  ┌──────────────────────────┐ │
│ │    │  │ Topbar (유리 64px)        │ │
│ │ S  │  ├──────────────────────────┤ │
│ │ I  │  │                          │ │
│ │ D  │  │ Main Content             │ │
│ │ E  │  │ (12-col, 24px gutter)    │ │
│ │ B  │  │                          │ │
│ │ A  │  │  [Glass Card] [Glass]    │ │
│ │ R  │  │                          │ │
│ └────┘  └──────────────────────────┘ │
└────────────────────────────────────────┘
```

- **플로팅 사이드바**: 화면 가장자리에서 16px 떨어져 떠있음 (border-radius 20px)
- **탑바**: 메인 영역 상단, 유리 효과, 64px 높이
- **콘텐츠**: 12-column, padding 32px, gutter 24px

---

## 간격 스케일

| 토큰 | 값 |
|------|-----|
| `--gl-space-1` | 4px |
| `--gl-space-2` | 8px |
| `--gl-space-3` | 12px |
| `--gl-space-4` | 16px |
| `--gl-space-5` | 20px |
| `--gl-space-6` | 24px |
| `--gl-space-7` | 32px |
| `--gl-space-8` | 48px |

---

## Border Radius — 부드러운 18~24px

| 요소 | 값 |
|------|-----|
| Small (뱃지, 칩) | 10px |
| Medium (버튼, 인풋) | 14px |
| Card | 20px |
| Large (모달, 사이드바) | 24px |
| XL (특수 히어로 카드) | 28px |
| Full (아바타) | 50% |

---

## 컴포넌트 스펙

### KPI 카드
- Glass Card 기본 스타일
- 패딩 24px, radius 20px
- 아이콘 컨테이너 44x44px, 그라디언트 배경(primary→sub)
- 값 34px 800, 트렌드 13px success/error
- 호버: translateY(-2px) + border 강조

### 차트
- Chart.js 4
- 배경: 투명
- 그리드: rgba(139,124,240,0.08)
- 라인: 3px, 그라디언트 스트로크, 영역 채우기 rgba(139,124,240,0.12)
- 포인트: 5px 솔리드 흰색 + 2px primary 테두리

### Primary 버튼 (그라디언트 CTA)
```css
padding: 12px 24px;
background: linear-gradient(135deg, #8B7CF0, #FF9BC0);
color: white;
border: none;
border-radius: 14px;
box-shadow: 0 6px 20px rgba(139,124,240,0.35);
font-weight: 700;
```

### 데이터 테이블
- Glass Card 내부 배치
- 헤더: 12px 600 uppercase, text-muted
- 행 높이 56px, 호버 `rgba(255,255,255,0.4)` 배경

### 플로팅 사이드바
- 메뉴 항목 14px 600, 높이 44px
- 활성: glass inset + primary text + left 3px primary bar

---

## 반응형

| 디바이스 | 사이드바 | 메쉬 오브 |
|---------|---------|-----------|
| 데스크톱 1280px+ | 플로팅 240px | 3개 전체 |
| 태블릿 768~1279px | 플로팅 72px 아이콘 | 2개 |
| 모바일 ~767px | 하단 glass nav | 1개 대형 |

---

## 액센트 프리셋 4벌

| 프리셋 | 메인 | 서브 | 서드 |
|--------|------|------|------|
| **Aurora Purple** (기본) | #8B7CF0 | #FF9BC0 | #8EDCD5 |
| Cherry Blossom | #FF9BC0 | #FFB8A3 | #F5B84E |
| Mint Breeze | #8EDCD5 | #C9E8A4 | #6FB8F2 |
| Honeydew | #C9E8A4 | #8EDCD5 | #F5B84E |

---

## 유틸리티 클래스

| 클래스 | 효과 |
|--------|------|
| `.gl-glass` | 기본 글래스 카드 |
| `.gl-glass-strong` | 진한 글래스 (모달) |
| `.gl-gradient-cta` | 그라디언트 CTA 버튼 |
| `.gl-mesh-bg` | 배경 메쉬 오브 활성 |
| `.gl-floating` | 플로팅 박스 (사이드바용) |

---

## 파일 구조

```
templates/gl_v1/
├── index.html          # Overview
├── workspaces.html     # 워크스페이스 관리
├── team.html           # 팀·권한
├── integrations.html   # 통합
├── settings.html
├── css/
│   ├── gl-tokens.css
│   └── gl-theme.css
├── js/
│   ├── gl-theme.js
│   └── data.js
└── README.md
```

---

## 시그니처 차별화 포인트

1. **파스텔 메쉬 배경 + 하얀 글래스** — 기존 ec_v1(다크 글래스)와 완전 반대 방향
2. **플로팅 사이드바** — 화면 가장자리에서 떠있는 20px radius 글래스 박스
3. **그라디언트 CTA** — Purple→Pink 135deg, 글래스 배경 위에서 강한 대비
4. **배경 파스텔 오브 3개** — fixed 위치 블러 40px로 몽환 분위기 연출
