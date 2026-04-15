# 상태 UI 스펙 — 로딩 / 에러 / 빈 상태

> B(디자인 디렉터) 작성 | 2026-04-16
> C(프론트) 요청에 따라 API 전환 시 필요한 상태 UI 정의

---

## 1. 로딩 스켈레톤

### 공통 스타일
- 배경: `--pulse-bg-elevated`
- 애니메이션: shimmer (좌→우 gradient sweep, 1.5s infinite)
- 라이트 shimmer: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.04) 50%, transparent 100%)`
- 다크 shimmer: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)`
- Border Radius: 실제 컴포넌트와 동일

### 컴포넌트별 스켈레톤

| 컴포넌트 | 구조 | 높이 |
|---------|------|------|
| KPI Card | 40x40 circle + 2 lines (60%/40% width) | 120px |
| Chart | Title line (30% width) + rectangle fill (차트 영역) | 300px |
| Table Header | Full-width bar | 48px |
| Table Row | checkbox 18x18 + 4 text bars (다양한 width) | 56px, 5행 반복 |
| Activity Item | 32px circle + 2 lines (70%/50%) | 48px, 5개 반복 |
| Sidebar Menu | 8개 bar (80% width) | 40px 각 |

---

## 2. 에러 상태

```
┌─────────────────────────────┐
│       [AlertCircle 48x48]   │  아이콘: --pulse-error
│                             │
│    Something went wrong     │  H3 (20px Semibold), --pulse-text-primary
│  We couldn't load this data.│  Caption (14px), --pulse-text-muted
│                             │
│       [ Try Again ]         │  버튼: 36px height, 8px radius, --pulse-primary
└─────────────────────────────┘
```

### 간격
- 아이콘 → 타이틀: 16px
- 타이틀 → 설명: 8px
- 설명 → 버튼: 24px
- 전체: 수직/수평 중앙 정렬
- 컨테이너 패딩: 48px

### 에러 유형별 메시지
| 유형 | 타이틀 | 설명 |
|------|--------|------|
| 네트워크 | Connection failed | Please check your internet connection and try again. |
| 서버 | Something went wrong | Our servers are having issues. Please try again later. |
| 권한 | Access denied | You don't have permission to view this content. |
| 타임아웃 | Request timed out | The request took too long. Please try again. |

---

## 3. 빈 데이터 상태

```
┌─────────────────────────────┐
│    [Illustration 120x120]   │  단색 line art SVG
│                             │
│       No data yet           │  H3 (20px Semibold)
│  Start by creating your     │  Caption (14px), --pulse-text-muted
│  first item to see data.    │  max-width: 320px, text-align: center
│                             │
│     [ + Create Item ]       │  Primary 버튼
└─────────────────────────────┘
```

### 간격
- 일러스트 → 타이틀: 24px
- 타이틀 → 설명: 8px
- 설명 → 버튼: 24px
- 전체: 수직/수평 중앙 정렬

### 일러스트 변형
| 위젯 | 일러스트 설명 |
|------|-------------|
| Table | 빈 목록 (3줄 점선 + 빈 체크박스) |
| Chart | 빈 그래프 (축만 있고 데이터 없음) |
| Activity | 빈 타임라인 (점선 + 빈 원) |
| Downloads | 빈 폴더 |
| Favorites | 빈 하트 |

### 일러스트 스타일
- 크기: 120x120px
- 색상: `--pulse-text-muted` (단색)
- 스트로크: 1.5px
- 배경: 없음 (투명)
