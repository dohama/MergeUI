# Pulse Admin v1 — SaaS 어드민 대시보드 테마 디자인 스펙

> B(디자인 디렉터) 작성 | 2026-04-16
> MergeUi 첫 판매용 대시보드 테마

---

## 테마 컨셉

- **이름**: Pulse Admin v1
- **타겟**: SaaS 스타트업의 내부 어드민/분석 대시보드
- **분위기**: 미니멀 + 프리미엄 (불필요한 장식 배제, 데이터 가독성 최우선)
- **핵심 가치**: "5분 내에 적용 가능한 프로덕션 레디 대시보드"

---

## 레이아웃 구조

### 기본 프레임

```
┌──────────────────────────────────────────┐
│ Sidebar   │          Topbar (64px)        │
│ (240px)   │──────────────────────────────│
│           │                              │
│ Logo      │    Main Content Area         │
│ Nav       │    (12-column grid)          │
│ Items     │    (24px gutter)             │
│           │    (max-width: 1440px)       │
│           │                              │
│ Footer    │                              │
└──────────────────────────────────────────┘
```

- **사이드바**: 240px 고정, 접힘 시 64px (아이콘만 표시)
- **탑바**: 64px 높이
- **메인 콘텐츠**: 12컬럼 그리드, 24px 거터, max-width 1440px
- **콘텐츠 패딩**: 32px (데스크톱), 24px (태블릿), 16px (모바일)

### 위젯 배치 맵 (Overview Dashboard)

```
Row 1: [KPI Card] [KPI Card] [KPI Card] [KPI Card]    — 각 3col
Row 2: [Line Chart — 8col]         [Activity — 4col]
Row 3: [Data Table — 12col (full width)]
```

---

## 페이지 구성 (4페이지)

### 1. Overview Dashboard
- KPI 카드 4개 (총 사용자, MRR, 활성률, 이탈률)
- 라인 차트 (매출 추이, 8col)
- 최근 활동 리스트 (4col)
- 데이터 테이블 (최근 주문/구독)

### 2. Analytics
- 에리어 차트 (트래픽)
- 바 차트 (페이지별 조회수)
- 도넛 차트 (트래픽 소스)
- 파이 차트 (디바이스 분포)

### 3. Users/Customers
- 검색 + 필터 바
- 데이터 테이블 (사용자 목록, 정렬/페이지네이션)
- 사용자 상세 슬라이드 패널

### 4. Settings
- 탭 네비게이션 (General / Notifications / Security / Billing)
- 폼 요소: 텍스트 입력, 셀렉트, 토글, 체크박스
- 저장/취소 버튼

---

## 컬러 팔레트

### 라이트 모드

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--pulse-bg-base` | `#FAFAFA` | 페이지 배경 |
| `--pulse-bg-surface` | `#FFFFFF` | 카드, 사이드바 배경 |
| `--pulse-bg-elevated` | `#F4F4F5` | 호버 배경, 인풋 배경 |
| `--pulse-text-primary` | `#18181B` | 주요 텍스트 (대비 15.4:1) |
| `--pulse-text-secondary` | `#3F3F46` | 보조 텍스트 |
| `--pulse-text-muted` | `#71717A` | 비활성 텍스트, 플레이스홀더 |
| `--pulse-border-default` | `#E4E4E7` | 기본 보더 |
| `--pulse-border-strong` | `#A1A1AA` | 강조 보더 |
| `--pulse-primary` | `#6366F1` | 브랜드 Primary (Indigo) |
| `--pulse-primary-hover` | `#4F46E5` | Primary 호버 |
| `--pulse-secondary` | `#8B5CF6` | Secondary (Violet) |
| `--pulse-accent` | `#06B6D4` | 액센트 (Cyan) |
| `--pulse-success` | `#16A34A` | 성공 |
| `--pulse-warning` | `#D97706` | 경고 |
| `--pulse-error` | `#DC2626` | 에러 |
| `--pulse-info` | `#2563EB` | 정보 |

### 다크 모드 (명도/채도 재설계)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--pulse-bg-base` | `#09090B` | 페이지 배경 |
| `--pulse-bg-surface` | `#18181B` | 카드, 사이드바 배경 |
| `--pulse-bg-elevated` | `#27272A` | 호버 배경 |
| `--pulse-text-primary` | `#FAFAFA` | 주요 텍스트 (대비 17.1:1) |
| `--pulse-text-secondary` | `#D4D4D8` | 보조 텍스트 |
| `--pulse-text-muted` | `#A1A1AA` | 비활성 텍스트 |
| `--pulse-border-default` | `#27272A` | 기본 보더 |
| `--pulse-border-strong` | `#52525B` | 강조 보더 |
| `--pulse-primary` | `#818CF8` | 브랜드 Primary (밝게 조정) |
| `--pulse-primary-hover` | `#6366F1` | Primary 호버 |
| `--pulse-success` | `#22C55E` | 성공 (밝게) |
| `--pulse-warning` | `#FBBF24` | 경고 (밝게) |
| `--pulse-error` | `#EF4444` | 에러 (밝게) |
| `--pulse-info` | `#3B82F6` | 정보 (밝게) |

---

## 타이포그래피

- **본문 폰트**: Inter (가변 폰트)
- **수치/코드 폰트**: JetBrains Mono

| 요소 | 크기 | 굵기 | Line Height | 용도 |
|------|------|------|------------|------|
| H1 | 32px | Bold (700) | 40px | 페이지 타이틀 |
| H2 | 24px | Semibold (600) | 32px | 섹션 타이틀 |
| H3 | 20px | Semibold (600) | 28px | 카드/위젯 타이틀 |
| Body | 16px | Regular (400) | 24px | 본문 텍스트 |
| Caption | 14px | Regular (400) | 20px | 보조 텍스트, 라벨 |
| Small | 12px | Regular (400) | 16px | 메타 정보 |
| KPI Value | 28px | Bold (700) | 36px | KPI 숫자 (JetBrains Mono) |
| Table Header | 12px | Semibold (600) | 16px | 테이블 헤더 (uppercase) |

---

## 컴포넌트 스펙

### KPI 카드

```
┌─────────────────────────────┐
│ [Icon 40x40]                │
│                             │
│ $2,847          ↑ 12.5%     │  KPI Value + Trend
│ Monthly Revenue             │  Caption, text-muted
└─────────────────────────────┘
```

- 크기: 그리드 3col (반응형 조절)
- 패딩: 24px
- 아이콘 컨테이너: 40x40px, 8px radius, primary/10% 배경
- 아이콘-값 간격: 16px
- 값-라벨 간격: 4px
- 트렌드: success(↑)/error(↓) 색상, Caption 크기
- Border Radius: 12px

### 차트 공통

- 스트로크 굵기: 2px
- 범례 도트: 8px 원형
- 툴팁: Level 2 그림자, 8px radius, 12px 패딩
- Y축 레이블: Small (12px), text-muted
- X축 레이블: Small (12px), text-muted
- 그리드 라인: border-default, 1px dashed
- 차트 영역 패딩: 상 16px, 하 32px (X축 라벨), 좌 48px (Y축 라벨), 우 16px

### 데이터 테이블

- 헤더 행 높이: 48px
- 본문 행 높이: 56px
- 헤더 배경: bg-elevated
- 헤더 텍스트: 12px Semibold uppercase, text-muted
- 호버 행: bg-elevated
- 셀 패딩: 좌우 16px
- 페이지네이션: 하단 우측, 32px 높이 버튼

### 사이드바

- 메뉴 항목 높이: 40px
- 아이콘-텍스트 간격: 12px
- 아이콘: 20x20px
- 좌측 패딩: 16px
- 항목 Border Radius: 8px
- 활성 상태: primary 배경(10%), primary 텍스트, 좌측 3px 인디케이터
- 호버: bg-elevated
- 그룹 라벨: 12px uppercase, text-muted, 상단 24px 마진

### 탑바

- 높이: 64px
- 검색바: max-width 480px, 40px 높이, 8px radius
- 알림 벨: 32x32px 영역, 도트 인디케이터 8px (error 색상)
- 아바타: 32px 원형
- 요소 간격: 16px

---

## 간격/여백 (8px 그리드)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--pulse-space-1` | 4px | 인라인 요소 간 최소 간격 |
| `--pulse-space-2` | 8px | 관련 요소 간 (아이콘-텍스트) |
| `--pulse-space-3` | 12px | 폼 요소 간 |
| `--pulse-space-4` | 16px | 카드 내부 요소 간 |
| `--pulse-space-5` | 24px | 카드 패딩, 섹션 내 간격 |
| `--pulse-space-6` | 32px | 섹션 간, 콘텐츠 패딩 |
| `--pulse-space-7` | 48px | 페이지 섹션 간 |
| `--pulse-space-8` | 64px | 대형 섹션 간 |

- **카드 간 간격**: 24px
- **Row 간 간격**: 24px
- **사이드바-메인 간격**: 0px (보더로 구분)

---

## 그림자 (Elevation)

### 라이트 모드

| Level | 용도 | box-shadow |
|-------|------|-----------|
| Level 1 | 카드, 위젯 | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` |
| Level 2 | 드롭다운, 툴팁 | `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` |
| Level 3 | 모달, 다이얼로그 | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` |

### 다크 모드

| Level | box-shadow |
|-------|-----------|
| Level 1 | `0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)` |
| Level 2 | `0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)` |
| Level 3 | `0 10px 15px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.3)` |

---

## Border Radius

| 요소 | 값 |
|------|-----|
| 카드/위젯 | 12px |
| 버튼 | 8px |
| 입력 필드 | 8px |
| 아바타 | 50% (원형) |
| 뱃지/태그 | 6px |
| 툴팁 | 8px |
| 사이드바 항목 | 8px |
| 체크박스 | 4px |

---

## 반응형 동작

### 데스크톱 (1280px+)
- 사이드바 240px 고정
- KPI 4열 (각 3col)
- 차트 8col + 활동 4col
- 테이블 풀 너비

### 태블릿 (768px ~ 1279px)
- 사이드바 접힘 (64px, 아이콘만)
- KPI 2열 (각 6col)
- 차트 풀 너비 (12col)
- 활동 풀 너비
- 테이블 수평 스크롤

### 모바일 (~767px)
- 사이드바 숨김 → 하단 네비게이션 (56px 높이, 5개 아이콘)
- KPI 1열 (풀 너비), 카드 뷰로 전환
- 차트 풀 너비, 범례 아래 배치
- 테이블 → 카드 리스트 뷰 전환

---

## 애니메이션

| 요소 | 동작 | Duration | Easing |
|------|------|----------|--------|
| 사이드바 접힘/펼침 | width 전환 | 200ms | ease-in-out |
| 차트 진입 | draw-in (선 그리기) | 600ms | ease-out |
| 카드 호버 | translateY(-2px) + Level 2 그림자 | 150ms | ease |
| 버튼 호버 | 배경색 전환 | 150ms | ease |
| 다크모드 전환 | 전체 색상 전환 | 200ms | ease |
| 모달 진입 | opacity 0→1, scale 0.95→1 | 200ms | ease-out |
| 토스트 알림 | slideIn from right | 300ms | ease-out |
| 드롭다운 | opacity + translateY(-8px→0) | 150ms | ease-out |

---

## 파일 구조 (배포 패키지)

```
templates/pa_v1/
├── index.html            # Overview Dashboard
├── analytics.html        # Analytics 페이지
├── users.html            # Users/Customers 페이지
├── settings.html         # Settings 페이지
├── css/
│   ├── pulse-tokens.css  # 디자인 토큰 (커스터마이징 포인트)
│   └── pulse-admin.css   # 전체 스타일
├── js/
│   └── pulse-admin.js    # 인터랙션 (사이드바, 다크모드, 차트)
└── README.md             # 설치/커스터마이징 가이드
```

---

## C(프론트)에게 전달 사항

1. 모든 색상/간격/폰트는 CSS 변수(`--pulse-*`)로 정의할 것
2. 구독자가 `pulse-tokens.css`만 수정하면 전체 테마가 커스터마이징되어야 함
3. 차트는 외부 라이브러리 없이 CSS + SVG로 구현 우선, 복잡한 차트만 Chart.js 허용
4. 디자인 스펙과 1px도 다르면 수정 요청합니다
