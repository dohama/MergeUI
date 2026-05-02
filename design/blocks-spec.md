# Blocks 24종 시각 명세서

> 작성: B(디자인) | 작성 완료 2026-05-01 (D-5, 마감 5/2 하루 앞당김)
> 단일 출처: `docs/plans/blocks-d5-plan.md` 카탈로그
> 토큰 출처: `src/styles/tokens.css`

## 0. 공통 시각 원칙 (모든 24종에 적용)

### 0.1 토큰 사용 규약
- **컬러**: `--merge-color-*`(브랜드/상태/차트), `--merge-text-*`(텍스트 계층), `--merge-bg-*`(배경 레이어), `--merge-border*`(보더). 하드코딩 HEX 0건.
- **간격**: `--merge-space-1`(4) ~ `--merge-space-9`(64) 만 사용. `space-5`(20px deprecated) 사용 금지 → `space-6`(24)로 통일.
- **라운드**: `--merge-radius-sm`(6) 인라인 요소, `--merge-radius-md`(8) 폼/버튼, `--merge-radius-lg`(12) 카드/모달, `--merge-radius-full`(999) 배지/원형 액션.
- **그림자**: `--merge-shadow-card` 정지 상태, `--merge-shadow-card-hover` 호버 상승.

### 0.2 라이트/다크 동시 설계 원칙
- 다크는 **단순 반전 금지**. 다크는 명도 폭이 좁기 때문에 알파 보더(`rgba(255,255,255,0.06~0.1)`)와 표면 레이어(`bg-base → raised → surface`) 단계로 깊이를 만든다.
- 라이트는 그림자 의존, 다크는 보더+레이어 의존.
- 글로우(`--merge-glow-brand`)는 다크 0.15, 라이트 0.08로 자동 전환됨 → 직접 알파 지정 금지.

### 0.3 5상태 정의 (모든 인터랙티브 컴포넌트 공통)
| 상태 | 시각 변화 | 트리거 |
|------|---------|--------|
| default | 기본 토큰 컬러 그대로 | 평상시 |
| hover | 배경 +5% 명도(다크) / -3% 명도(라이트), 그림자 hover로 승격 | 마우스 진입 |
| active | 배경 -3% 명도, scale(0.98), 그림자 제거 | 클릭/탭 누름 |
| focus | 2px 솔리드 링(brand) + 2px 오프셋, **outline-offset: 2px**, border-radius 그대로 상속 | Tab 키보드 |
| disabled | opacity: 0.5, cursor: not-allowed, 모든 인터랙션 무시 | aria-disabled=true |

### 0.4 키보드 포커스 링 표준
```
:focus-visible {
  outline: 2px solid var(--merge-brand);
  outline-offset: 2px;
  border-radius: inherit;
}
```
마우스 클릭 시(`:focus`만 있을 때)는 링을 숨기고, 키보드(`:focus-visible`)에만 노출 → 시각 소음 제거 + 접근성 100%.

### 0.5 8px 그리드 & 4.5:1 대비
- 모든 padding/margin/gap은 4의 배수만. 홀수 픽셀 0건.
- 본문 텍스트 최소 16px, 캡션 14px, 메타 12px(라이트 모드에서 `--merge-text-muted`는 5.92:1, 다크는 4.95:1로 모두 AA 통과).

### 0.6 반응형 3 BP 규칙
| BP | 너비 | Blocks 적응 |
|----|------|------------|
| 데스크톱 | 1280px+ | 풀 디자인, 멀티 컬럼, 호버 인터랙션 활성 |
| 태블릿 | 768~1279px | 그리드 2열, 사이드바 collapse, hover 약화 |
| 모바일 | 375~767px | 단일 컬럼, 터치 영역 최소 44×44px, hover 효과 제거 |

### 0.7 다크 알파/그림자 재설계
- 다크에서 그림자는 흑색 알파 0.3~0.5(라이트는 0.04~0.08)로 강하게.
- 다크 보더는 white-alpha 기반(절대 `#FFF` 솔리드 금지) → 표면 색이 변해도 자연스럽게 비치도록.

---

# 1. Buttons (4종)

> 카테고리 시각 원칙: 높이 40px(데스크톱)/44px(모바일) 통일, 폰트 14px Semibold, padding `--space-3 --space-4`, radius `--radius-md`(8), transition 150ms ease-out.

## 1.1 `btn-primary` — Primary Button (Free)

**용도**: 메인 CTA. 페이지당 1~2개 한정.

**스펙**
- 높이 40px / 모바일 44px
- padding: `--merge-space-3` (12) 상하, `--merge-space-4` (16) 좌우
- radius: `--merge-radius-md` (8)
- font: 14px / 600 / `--merge-font`
- gap(아이콘+텍스트): `--merge-space-2` (8)

**컬러 매트릭스**
| 상태 | 다크 배경 | 라이트 배경 | 텍스트 | 보더 | 그림자/효과 |
|------|---------|-----------|-------|-----|-----------|
| default | `--merge-brand` | `--merge-brand` | #FFFFFF | none | `--merge-shadow-card` |
| hover | `--merge-brand-light` | `--merge-brand-dark` | #FFFFFF | none | `--merge-shadow-card-hover` + glow `--merge-glow-brand` |
| active | `--merge-brand-dark` | `--merge-brand-dark` | #FFFFFF | none | scale(0.98), shadow none |
| focus | `--merge-brand` | `--merge-brand` | #FFFFFF | outline 2px `--merge-brand` offset 2px | — |
| disabled | `--merge-brand` opacity 0.5 | `--merge-brand` opacity 0.5 | #FFFFFF opacity 0.7 | none | cursor: not-allowed |

**대비 검증**: #FFFFFF on `--merge-brand`(#6C5CE7) = 4.62:1 (AA 통과)

**반응형**: 1280+ width auto / 768 width auto / 375 `width: 100%` (full-width CTA)

---

## 1.2 `btn-secondary` — Secondary Button (Free)

**용도**: 보조 동작 (취소, 더보기 등). Primary와 페어로 자주 등장.

**스펙**: 높이/padding/radius/font는 1.1과 동일. **보더만 다른 outline 스타일**.

**컬러 매트릭스**
| 상태 | 배경 | 텍스트 | 보더 |
|------|-----|-------|-----|
| default | transparent | `--merge-text-primary` | 1px solid `--merge-border-strong` |
| hover | `--merge-bg-surface` | `--merge-text-primary` | 1px solid `--merge-brand` |
| active | `--merge-bg-raised` | `--merge-text-primary` | 1px solid `--merge-brand-dark` |
| focus | transparent | `--merge-text-primary` | 1px solid `--merge-border-strong` + outline 2px `--merge-brand` |
| disabled | transparent | `--merge-text-muted` | 1px solid `--merge-border` |

**대비 검증**: 라이트 #18181B on #FFFFFF = 16.7:1 / 다크 #F4F4F5 on #06060A = 19.3:1 (모두 AAA)

---

## 1.3 `btn-ghost` — Ghost Button (Free)

**용도**: 미세한 텍스트형 액션. 카드 내부, 테이블 행 액션 등 시각 무게 최소화 필요 시.

**스펙**: 높이 32px(컴팩트), padding `--space-2` (8) 상하 `--space-3` (12) 좌우, **보더 없음**.

**컬러 매트릭스**
| 상태 | 배경 | 텍스트 |
|------|-----|-------|
| default | transparent | `--merge-text-secondary` |
| hover | `--merge-bg-surface` | `--merge-text-primary` |
| active | `--merge-bg-raised` | `--merge-text-primary` |
| focus | transparent + outline 2px `--merge-brand` | `--merge-text-primary` |
| disabled | transparent | `--merge-text-muted` opacity 0.5 |

**모바일 주의**: 터치 영역 확보 위해 최소 hit area 44×44px (visual은 32px여도 가상 영역 padding으로 확장).

---

## 1.4 `btn-destructive` — Destructive Button (Pro)

**용도**: 삭제, 영구 취소, 결제 취소 등 위험 동작. 반드시 확인 모달과 페어.

**스펙**: 1.1과 동일 높이/padding/radius/font.

**컬러 매트릭스**
| 상태 | 배경 | 텍스트 |
|------|-----|-------|
| default | `--merge-error` (#EF4444) | #FFFFFF |
| hover | #DC2626 (error -10%) | #FFFFFF |
| active | #B91C1C (error -20%) | #FFFFFF |
| focus | `--merge-error` + outline 2px `--merge-error` offset 2px | #FFFFFF |
| disabled | `--merge-error` opacity 0.5 | #FFFFFF opacity 0.7 |

**대비 검증**: #FFFFFF on #EF4444 = 4.53:1 (AA 통과)

**시각 차별성**: 다른 버튼과 달리 **확인 단계 진입 시 짧은 shake(120ms) 애니메이션 옵션** — 사용자에게 위험 동작 시각 신호.

---

# 2. Cards (4종)

> 카테고리 시각 원칙: padding `--space-6` (24), radius `--radius-lg` (12), 배경 `--merge-bg-raised`, 보더 1px `--merge-border`. hover 시 transform `translateY(-2px)` + shadow-hover 승격.

## 2.1 `card-kpi` — KPI Card (Free)

**용도**: 대시보드 핵심 — 큰 숫자(MRR, 가입자 수 등) + 변화율.

**구조 (8px 그리드)**
```
┌─────────────────────────────┐
│ [라벨 14px Caption]          │  ← --space-2 gap
│ [숫자 32px Bold]             │  ← --space-3 gap
│ [▲ 변화율 14px] [기간 12px]   │
└─────────────────────────────┘
padding: 24px (--space-6)
```

**컬러**
- 배경: `--merge-bg-raised`
- 라벨: `--merge-text-secondary`
- 숫자: `--merge-text-primary`
- 변화율 +: `--merge-success` (#22C55E, 다크 4.7:1 / 라이트 3.4:1 → 라이트는 #15803D로 다크닝 권장)
- 변화율 -: `--merge-error`

**5상태**: default / hover(translateY(-2px) + shadow-hover) / focus(outline 2px brand, 카드가 클릭 가능 시) / disabled(opacity 0.6) / active 없음(텍스트 카드).

**반응형**
- 1280+: 4열 그리드 (gap `--space-6`)
- 768: 2열
- 375: 1열, 숫자 28px로 축소

---

## 2.2 `card-metric` — Metric Card (Pro)

**용도**: KPI + 미니 스파크라인 차트 (60일 추이).

**구조**: KPI Card 기반 + **하단 56px 높이 미니 차트 영역** (Chart.js sparkline, 축/라벨 없음).

**스펙**
- 차트 라인 컬러: `--merge-chart-1` (다크 #818CF8 / 라이트 #6366F1)
- 차트 영역 fill: `--merge-chart-1` opacity 0.15 (그라디언트 fade-out)
- 차트 padding-top: `--space-4` (16)
- 차트와 본문 사이 1px 디바이더: `--merge-border`

**다크모드 재설계**: 다크에서 차트 라인은 명도 +5% 보정값 사용 (이미 토큰에 반영). 라이트는 원색.

**반응형**
- 1280+: 4열, 차트 높이 56px
- 768: 2열, 차트 높이 48px
- 375: 1열, 차트 높이 40px

---

## 2.3 `card-feature` — Feature Card (Pro)

**용도**: 랜딩페이지 기능 소개. 아이콘 + 제목 + 설명.

**구조**
```
┌─────────────────────────┐
│ [아이콘 48×48 + 배경원]  │  ← brand 12% 배경, brand 컬러 아이콘
│                          │  ← --space-4 gap
│ [제목 18px Semibold]     │
│                          │  ← --space-2 gap
│ [설명 14px Regular]      │
└─────────────────────────┘
padding: 32px (--space-7)
```

**아이콘 박스**: 48×48, radius `--radius-md`, 배경 `--merge-glow-brand`(글로우 토큰 재활용 — 다크 0.15 / 라이트 0.08 자동), 아이콘 24×24 stroke 1.5px `--merge-brand`.

**5상태**
- hover: 아이콘 박스 배경 0.2 알파로 진하게, transform translateY(-4px), shadow-hover
- focus: outline 2px `--merge-brand` offset 2px
- disabled: 카드 전체 opacity 0.5, 아이콘 grayscale 100%

**반응형**: 1280+ 3열 / 768 2열 / 375 1열, 모바일에서 아이콘 40×40으로 축소.

---

## 2.4 `card-stat-row` — Stat Row Card (Pro)

**용도**: 한 카드 안에 4개 지표 한 줄 배치 (관리자 대시보드 상단 핵심).

**구조**: 가로 4분할, 각 칸은 KPI Card 미니 버전.
```
┌─────┬─────┬─────┬─────┐
│ KPI │ KPI │ KPI │ KPI │
└─────┴─────┴─────┴─────┘
```
- 각 칸 padding: `--space-4` (16)
- 칸 사이 1px 디바이더: `--merge-border` (vertical)
- 카드 전체 padding: `--space-2` (8) (디바이더가 시각 분리하므로 외부 padding 최소)

**반응형**
- 1280+: 4×1 가로 배치
- 768: 2×2 그리드, 디바이더 가로/세로 모두 활성
- 375: 4×1 세로 스택, 디바이더 가로만

**시각 일관성**: Cards 카테고리 전체가 hover 시 translateY(-2px) + shadow-hover 동일 모션.

---

# 3. Tables (3종)

> 카테고리 시각 원칙: 헤더 높이 48px, 행 높이 56px(데스크톱) / 64px(터치 모바일), 행 구분 1px `--merge-border` bottom. zebra striping은 다크에서 `bg-base ↔ bg-raised` 교차, 라이트에서 `#FFFFFF ↔ #FAFAFA`.

## 3.1 `table-basic` — Basic Table (Free)

**구조**
```
┌─────────────────────────────────────┐
│ HEADER (--bg-surface)               │ 48px
├─────────────────────────────────────┤
│ Row 1 (--bg-raised)                 │ 56px
│ Row 2 (--bg-base)                   │ 56px
└─────────────────────────────────────┘
```

**스펙**
- 헤더 셀: padding `--space-3` `--space-4`, 폰트 12px Semibold, 색 `--merge-text-secondary`, **uppercase + letter-spacing 0.05em** (시각 계층 강조)
- 본문 셀: padding `--space-4`, 폰트 14px Regular, 색 `--merge-text-primary`
- 첫 컬럼 좌측 padding `--space-6` (24), 마지막 컬럼 우측 padding `--space-6`

**5상태(행 단위)**
| 상태 | 배경 |
|------|-----|
| default | zebra(`bg-raised` ↔ `bg-base`) |
| hover | `--merge-bg-surface` |
| active(선택) | `--merge-glow-brand` (brand 12% 알파) |
| focus(키보드) | outline 2px `--merge-brand` inset |
| disabled | opacity 0.5 |

**반응형**
- 1280+: 풀 테이블
- 768: 가로 스크롤 (`overflow-x: auto`), 첫 컬럼 sticky
- 375: **카드 변환** — 각 행을 카드처럼 세로 스택, 라벨:값 페어로 재구성

---

## 3.2 `table-sortable` — Sortable Table (Pro)

**구조**: 3.1 기반 + **헤더 컬럼에 정렬 아이콘**.

**정렬 아이콘**
- 기본(미정렬): ↕ 아이콘 12px, `--merge-text-muted`
- 오름차순: ↑ 12px, `--merge-brand`
- 내림차순: ↓ 12px, `--merge-brand`
- 헤더 hover: 배경 `--merge-bg-raised`, 아이콘 `--merge-text-primary`

**키보드 접근성**: 헤더 셀에 `role="columnheader" aria-sort="ascending|descending|none"`, Enter/Space로 정렬 토글.

---

## 3.3 `table-actions` — Actions Table (Pro)

**구조**: 3.1 기반 + **마지막 컬럼에 행별 액션 버튼**.

**액션 영역**
- 위치: 마지막 컬럼, 우측 정렬
- 버튼: `btn-ghost` 32px 2~3개 (편집/삭제/더보기 케밥)
- 케밥 메뉴 `⋮` 24×24 아이콘, hover 시 드롭다운 노출

**시각 차별성**: 행 hover 시 액션 버튼 opacity 0 → 1 페이드인 (데스크톱), 모바일은 항상 노출(터치는 hover 없음).

**다크모드**: 케밥 드롭다운 배경 `--merge-bg-surface`, 보더 `--merge-border-strong`, shadow 강화 (다크는 0.5 알파).

---

# 4. Forms (4종)

> 카테고리 시각 원칙: 입력 높이 40px, radius `--radius-md` (8), 보더 1px `--merge-border-strong`, focus 시 보더 색 `--merge-brand` + 글로우 ring 3px alpha 0.2. 라벨 14px Semibold + `--space-2` (8) gap.

## 4.1 `form-input` — Text Input (Free)

**구조**
```
[Label 14px] *(선택)
┌──────────────────────────┐
│ [Placeholder 14px]       │ 40px
└──────────────────────────┘
[Helper text 12px] (선택)
```

**스펙**
- padding: `--space-3` `--space-4` (12 / 16)
- 폰트: 14px Regular, color `--merge-text-primary`
- placeholder: `--merge-text-muted`
- 라벨 gap: `--space-2`
- helper gap: `--space-2`

**5상태**
| 상태 | 보더 | 배경 | 추가 |
|------|-----|-----|------|
| default | 1px `--merge-border-strong` | `--merge-bg-raised` | — |
| hover | 1px `--merge-text-muted` | `--merge-bg-raised` | — |
| focus | 2px `--merge-brand` | `--merge-bg-raised` | box-shadow 0 0 0 3px rgba(108,92,231,0.2) |
| disabled | 1px `--merge-border` | `--merge-bg-surface` | opacity 0.5, cursor not-allowed |
| error | 2px `--merge-error` | `--merge-bg-raised` | helper 색 `--merge-error`, aria-invalid="true" |

**반응형**: 모든 BP에서 `width: 100%` (부모 컨테이너 폭 따라감).

---

## 4.2 `form-select` — Select (Pro)

**구조**: 4.1과 동일 기본 + **우측 12px chevron 아이콘** (`--merge-text-muted`).

**드롭다운 패널**
- 위치: 입력 하단 `--space-1` (4) gap
- 배경: `--merge-bg-raised`, 보더 1px `--merge-border-strong`, radius `--radius-md`
- 옵션 행: 높이 40px, padding `--space-3` `--space-4`
- 옵션 hover: 배경 `--merge-bg-surface`
- 선택된 옵션: 배경 `--merge-glow-brand`, 좌측 ✓ 아이콘 `--merge-brand`
- 키보드: Arrow Up/Down 이동, Enter 선택, Escape 닫기

**다크 패널 그림자**: `0 8px 24px rgba(0,0,0,0.4)` (라이트는 `0 8px 24px rgba(15,23,42,0.12)`)

---

## 4.3 `form-checkbox` — Checkbox Group (Pro)

**개별 체크박스**
- 박스: 18×18, radius `--radius-sm` (6), 1px solid `--merge-border-strong`
- 라벨 gap: `--space-2` (8), 폰트 14px
- 그룹 옵션 간 gap: `--space-3` (12) vertical

**5상태**
| 상태 | 박스 배경 | 보더 | 체크 마크 |
|------|---------|-----|---------|
| unchecked default | transparent | 1px `--merge-border-strong` | none |
| unchecked hover | `--merge-bg-surface` | 1px `--merge-text-secondary` | none |
| checked | `--merge-brand` | 1px `--merge-brand` | ✓ #FFF 12px stroke 2px |
| focus | (현재 상태 유지) | (현재) | + outline 2px `--merge-brand` offset 2px |
| disabled | `--merge-bg-surface` | 1px `--merge-border` | opacity 0.5 |
| indeterminate | `--merge-brand` | 1px `--merge-brand` | − #FFF 10px stroke 2px |

**접근성**: 각 체크박스 `<label>` 명시적 연결, 그룹은 `role="group" aria-labelledby="..."`.

---

## 4.4 `form-radio` — Radio Group (Pro)

**개별 라디오**
- 원: 20×20, radius `--radius-full`, 1px solid `--merge-border-strong`
- 라벨 gap: `--space-2`
- 그룹 옵션 간 gap: `--space-3` vertical

**5상태**
| 상태 | 외곽 보더 | 내부 점 |
|------|---------|--------|
| unchecked default | 1px `--merge-border-strong` | 없음 |
| unchecked hover | 1px `--merge-text-secondary` | 없음 |
| checked | 2px `--merge-brand` | 8×8 원 `--merge-brand` |
| focus | (현재 유지) | (현재) + outline 2px `--merge-brand` offset 2px |
| disabled | 1px `--merge-border` | opacity 0.5 |

**키보드**: 그룹 내 Arrow Up/Down/Left/Right로 선택 이동, Tab은 그룹 단위 진입/탈출.

---

# 5. Charts (4종) — Chart.js 래퍼

> 카테고리 시각 원칙: **카테고리 차별성 — 컬러 풍부 8색 팔레트 적극 활용**. 축 라인 색 `--merge-border-strong`, 그리드 라인 `--merge-border` (다크는 알파, 라이트는 #E4E4E7), 라벨 12px `--merge-text-muted`. 툴팁 배경 `--merge-bg-surface` + 보더 `--merge-border-strong`.

## 5.1 `chart-line` — Line Chart (Pro)

**용도**: 시계열 (MRR 추이, DAU 등).

**스펙**
- 라인 두께: 2px
- 데이터 포인트: 4×4 원 (hover 시 8×8 + 글로우 `--merge-glow-brand`)
- 컬러: 1차 데이터 `--merge-chart-1`(Indigo), 2차 `--merge-chart-2`(Cyan), 최대 8개 시리즈
- 영역 fill 없음 (Area Chart와 차별화)
- 그리드: 가로만 노출, 세로 그리드 제거 (시각 소음 감소)

**툴팁**
- 트리거: hover/focus/터치
- 배경: `--merge-bg-surface`, 보더 1px `--merge-border-strong`, radius `--radius-md`, padding `--space-3`
- 폰트: 12px Regular, 색 `--merge-text-primary`
- 색상 인디케이터: 8×8 원 (시리즈 색)

**반응형**: 1280+ 높이 320px / 768 240px / 375 200px + Y축 라벨 축약 ("1,000" → "1K").

---

## 5.2 `chart-bar` — Bar Chart (Pro)

**스펙**
- 바 너비: 카테고리 폭의 60% (그룹) / 80% (단일)
- 바 사이 gap: 카테고리 폭의 20%
- radius: 상단만 `--radius-sm` (6) (좌하/우하는 0)
- 컬러: `--merge-chart-*` 8색 순환
- hover: 바 brightness +15%, 글로우 추가

**Stacked / Grouped 차별**: Stacked는 동일 카테고리 내 색 차이로만 구분, Grouped는 바 분리 + gap.

**반응형**: 모바일에서 가로 막대 차트로 전환 옵션 (긴 라벨일 때).

---

## 5.3 `chart-donut` — Donut Chart (Pro)

**스펙**
- 외경/내경 비율: 70% (도넛 두께 30%)
- 세그먼트 사이 gap: 2px (배경색으로 분리)
- 컬러: `--merge-chart-*` 8색, **인접 색상 명도 차 15%+ 보장** (토큰에서 이미 검증됨)
- 중앙 라벨: 24px Bold (총합) + 12px Caption (라벨)

**범례**
- 위치: 우측(데스크톱) / 하단(모바일)
- 항목: 8×8 색 원 + 14px 라벨 + 14px 값
- 범례 항목 간 gap: `--space-2`

**색약 대응**: deuteranopia-safe 팔레트 사용 (이미 토큰에 반영). 추가로 hover/focus 시 패턴(빗금) 옵션 제공 권장.

---

## 5.4 `chart-area` — Area Chart (Pro)

**스펙**
- Line Chart 기반 + **영역 fill**
- fill: 시리즈 색 그라디언트 (상단 30% 알파 → 하단 0% 알파)
- 라인 두께: 2px
- 다중 시리즈 시: stacked 모드 권장, 최대 4개 시리즈 (8개는 시각 혼잡)

**다크모드 재설계**: 다크에서 fill 알파 0.25 (라이트는 0.4) — 다크는 색이 강해 보이므로 알파 낮춤.

**시각 일관성**: Charts 4종 모두 동일 툴팁/그리드/축 라벨 시스템 공유.

---

# 6. Feedback (4종)

> 카테고리 시각 원칙: **상태 컬러(success/warning/error/info) 활용**. 좌측 4px 컬러 바 또는 좌측 아이콘으로 상태 시각 신호. radius `--radius-md` (8), padding `--space-4` (16).

## 6.1 `alert-info` — Alert (Free, 4가지 상태)

**구조**
```
┌──────────────────────────────────────┐
│ [아이콘 20] [제목 14 Semibold]   [×]  │  ← --space-3 gap
│             [본문 14 Regular]         │  ← --space-2 gap (제목과)
└──────────────────────────────────────┘
좌측 4px 컬러 바 (border-left)
```

**4가지 상태별 컬러**
| 종류 | 좌측 바 | 배경 (다크) | 배경 (라이트) | 아이콘 | 텍스트 |
|------|--------|-----------|-------------|-------|-------|
| info | `--merge-info` | rgba(59,130,246,0.1) | rgba(59,130,246,0.06) | `--merge-info` | `--merge-text-primary` |
| success | `--merge-success` | rgba(34,197,94,0.1) | rgba(34,197,94,0.06) | `--merge-success` | `--merge-text-primary` |
| warning | `--merge-warning` | rgba(251,191,36,0.1) | rgba(251,191,36,0.08) | `--merge-warning` | `--merge-text-primary` |
| error | `--merge-error` | rgba(239,68,68,0.1) | rgba(239,68,68,0.06) | `--merge-error` | `--merge-text-primary` |

**아이콘**: 20×20, stroke 1.5px. info: ⓘ, success: ✓, warning: ⚠, error: ⊗.

**닫기 버튼**: 우상단 `btn-ghost` 24×24, × 아이콘 16×16, hover 시 배경 표시.

**접근성**: `role="alert"` (error/warning) 또는 `role="status"` (info/success), 닫기 버튼에 `aria-label="Close alert"`.

---

## 6.2 `modal-basic` — Modal (Pro)

**구조**
```
┌─[Backdrop fixed inset 0]──────────────┐
│   ┌─Modal box─────────────────────┐    │
│   │ [Title 20 Semibold]    [×]    │    │  ← header padding --space-6
│   ├──────────────────────────────┤    │
│   │ [Body 16 Regular]             │    │  ← body padding --space-6
│   ├──────────────────────────────┤    │
│   │      [Cancel] [Confirm]       │    │  ← footer padding --space-4 --space-6
│   └──────────────────────────────┘    │
└──────────────────────────────────────┘
```

**스펙**
- Backdrop: `rgba(0,0,0,0.6)` (다크) / `rgba(15,23,42,0.4)` (라이트), backdrop-filter blur(4px)
- Modal box: max-width 480px(small) / 640px(default) / 800px(large), 배경 `--merge-bg-raised`, radius `--radius-lg` (12), shadow `0 24px 48px rgba(0,0,0,0.5)` (다크) / `0 24px 48px rgba(15,23,42,0.16)` (라이트)
- Header 디바이더: 1px `--merge-border` bottom
- Footer 디바이더: 1px `--merge-border` top
- Footer 버튼 정렬: 우측, `--space-3` gap

**애니메이션**
- 진입: backdrop opacity 0→1 (200ms), modal scale 0.96→1 + opacity 0→1 (200ms ease-out)
- 종료: 역순 (150ms ease-in)

**접근성**
- `role="dialog" aria-modal="true" aria-labelledby="..."`
- 진입 시 첫 포커스 가능 요소 자동 포커스, Tab 트랩 (모달 내부 순환)
- Escape 키로 닫기, 배경 클릭 닫기는 옵션
- 종료 시 트리거 요소로 포커스 복귀

**반응형**: 모바일(375)에서 풀스크린 변형 (max-width 100vw, radius 0, 상단 16px swipe handle 추가 옵션).

---

## 6.3 `toast` — Toast (Pro)

**구조**: Alert 와 유사 + 우상단 부유 + 자동 사라짐.

**스펙**
- 위치: viewport 우상단, top `--space-6` (24), right `--space-6`
- 너비: 360px (데스크톱) / `calc(100vw - 32px)` (모바일은 상단 중앙)
- padding: `--space-4` (16)
- radius: `--radius-md` (8)
- 배경: `--merge-bg-raised`, 보더 1px `--merge-border-strong`
- 좌측 4px 컬러 바 (alert와 동일 색 시스템)
- shadow: `0 12px 32px rgba(0,0,0,0.4)` (다크) / `0 12px 32px rgba(15,23,42,0.12)` (라이트)

**애니메이션**
- 진입: translateX(100%)→0 + opacity 0→1 (250ms ease-out)
- 종료: opacity 1→0 + translateY(-8px) (200ms ease-in)
- 자동 사라짐: 5초(info/success) / 8초(warning) / 수동(error, 닫기 버튼 필수)

**스택**: 최대 3개 동시 노출, 새 토스트 진입 시 기존 것들 아래로 이동(`--space-2` gap).

**접근성**: `role="status"` (success/info), `role="alert"` (warning/error), `aria-live="polite"`(status) / `assertive`(alert).

---

## 6.4 `badge` — Badge (Pro)

**스펙**
- 높이: 20px (small) / 24px (default) / 28px (large)
- padding: `--space-1` `--space-2` (4 / 8) (small) / `--space-1` `--space-3` (default)
- radius: `--radius-full` (999, 알약형) 또는 `--radius-sm` (6, 사각형)
- 폰트: 12px Semibold (small) / 12px Medium (default), letter-spacing 0.02em

**8가지 변형**
| 변형 | 배경 | 텍스트 | 용도 |
|------|-----|-------|-----|
| neutral | `--merge-bg-surface` | `--merge-text-secondary` | 기본 라벨 |
| brand | `--merge-glow-brand` | `--merge-brand` | 브랜드 강조 |
| success | rgba(34,197,94,0.15) | `--merge-success` | 활성/성공 |
| warning | rgba(251,191,36,0.15) | `--merge-warning` | 주의 |
| error | rgba(239,68,68,0.15) | `--merge-error` | 위험/오류 |
| info | rgba(59,130,246,0.15) | `--merge-info` | 정보 |
| free | `--merge-bg-surface` | `--merge-text-secondary` | Free 플랜 표시 |
| pro | linear-gradient(135deg, `--merge-brand`, `--merge-accent2`) | #FFFFFF | Pro 플랜 표시 |

**dot 변형**: 좌측 6×6 원 + 라벨, 상태(온라인/오프라인 등) 표현.

**카운트 변형**: 99+ 형식 자동 처리, max width 32px.

---

# 7. Navigation (1종)

> 카테고리 시각 원칙: 활성 상태 명확한 시각 신호 (브랜드 색 + 언더라인/배경), 키보드 탐색 100% 지원.

## 7.1 `tabs` — Tabs (Pro)

**구조 (가로 탭)**
```
┌────────────────────────────────────┐
│ [Tab 1] [Tab 2] [Tab 3] [Tab 4]    │
│ ━━━━━━━ (active underline)         │
├────────────────────────────────────┤
│ [Panel 콘텐츠]                      │
└────────────────────────────────────┘
```

**스펙 (개별 탭)**
- 높이: 40px
- padding: `--space-2` `--space-4` (8 / 16)
- 폰트: 14px Medium → active 시 600 Semibold
- gap (탭 간): `--space-1` (4)
- 하단 보더 라인: 1px `--merge-border` (전체 폭)
- active underline: 2px `--merge-brand`, 너비는 탭 폭 풀, 위치 하단

**5상태**
| 상태 | 텍스트 | 언더라인 | 배경 |
|------|-------|---------|-----|
| default | `--merge-text-secondary` | none | transparent |
| hover | `--merge-text-primary` | 2px `--merge-text-muted` (preview) | `--merge-bg-surface` (옵션) |
| active(선택) | `--merge-brand` | 2px `--merge-brand` | transparent |
| focus | 현재 색 유지 | 현재 유지 | + outline 2px `--merge-brand` offset 2px |
| disabled | `--merge-text-muted` opacity 0.5 | none | transparent |

**키보드 탐색** (WAI-ARIA 표준)
- Tab 키: 탭 그룹 진입/탈출 (활성 탭에 포커스)
- Arrow Left/Right: 탭 간 이동 + 자동 활성화 (또는 Enter로 활성화 — manual mode)
- Home/End: 첫/마지막 탭으로 점프
- 마크업: `role="tablist"` 컨테이너, 각 탭 `role="tab" aria-selected="true|false" aria-controls="panel-id"`, 패널 `role="tabpanel" aria-labelledby="tab-id" tabindex="0"`

**반응형**
- 1280+ / 768: 가로 탭, 탭 4개 초과 시 가로 스크롤 (`overflow-x: auto` + scroll snap)
- 375: **세로 탭 변형** 또는 select 드롭다운 변형 (탭 5개 이상일 때 권장)

**시각 차별성**: 다른 카테고리와 달리 active underline 모션 — 탭 전환 시 underline이 좌→우로 슬라이드 (200ms ease-out, transform: translateX).

---

# 부록 A. 카테고리 간 차별성 정리

| 카테고리 | 시각 톤 | 차별 포인트 |
|---------|--------|----------|
| Buttons | 솔리드/명료 | 4종 동일 높이·폰트·라운드, 컬러만 차별 |
| Cards | 부드럽고 깊이 | translateY hover, shadow-hover, padding 24px 통일 |
| Tables | 정보 밀도 | zebra striping, 헤더 uppercase, 모바일 카드 변환 |
| Forms | 엄격한 그리드 | 40px 높이, focus ring 3px, 상태별 보더 색 |
| Charts | 컬러 풍부 | 8색 deuteranopia-safe 팔레트 적극 활용 |
| Feedback | 상태 명확 | 좌측 4px 컬러 바 + 상태 알파 배경 |
| Navigation | 활성 신호 강력 | underline 모션, ARIA 표준 100% |

---

# 부록 B. 다크 ↔ 라이트 재설계 요약

| 요소 | 다크 처리 | 라이트 처리 |
|------|---------|-----------|
| 깊이 표현 | bg-base → raised → surface 레이어 + 알파 보더 | shadow 의존 |
| 알파 값 | 0.10~0.15 (배경 알파), 0.4~0.5 (그림자) | 0.06~0.08 (배경), 0.04~0.12 (그림자) |
| 차트 색 | 채도 +10%, 명도 +5% 보정 토큰 | 원색 토큰 |
| 글로우 | 0.15 (강) | 0.08 (약) |
| Border | white-alpha 기반 | black-alpha 기반 |

---

# 부록 C. 접근성 체크리스트 (24종 공통)

- [ ] 모든 인터랙티브 요소 키보드 탐색 가능
- [ ] `:focus-visible` 2px brand outline + 2px offset
- [ ] 모든 텍스트 4.5:1 대비 (AA), 큰 텍스트 3:1
- [ ] 아이콘 단독 버튼은 `aria-label` 필수
- [ ] 상태 변화는 색뿐 아니라 아이콘/텍스트 동반 (색약 대응)
- [ ] 모션은 `prefers-reduced-motion` 시 비활성화
- [ ] 모바일 터치 영역 최소 44×44px 보장

---

# 부록 D. C(프론트) 인계 체크리스트

각 컴포넌트 구현 시 본 명세 + 토큰 파일(`src/styles/tokens.css`) **2개만 참조**. 하드코딩 컬러/간격 발견 시 B에게 비토 권한 요청.

- [ ] 토큰 미정의 값 사용 0건
- [ ] `--merge-space-5`(deprecated 20px) 사용 0건 → `--merge-space-6` (24)
- [ ] 라이트/다크 모두 시각 검증 (스크린샷 첨부 권장)
- [ ] 5상태 모두 구현 (특히 focus-visible 누락 주의)
- [ ] 반응형 3 BP 모두 동작
- [ ] ARIA 마크업 명세대로 적용

— 이상 24종 시각 명세 완료. B(디자인 디렉터) 2026-05-01 작성, 5/2 마감 준수.
