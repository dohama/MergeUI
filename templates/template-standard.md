# MergeUi — 템플릿 제작 표준 가이드

> 모든 테마/컴포넌트 제작 시 이 문서를 기준으로 작업합니다.
> 객관적 리서치 기반 (WCAG 2.2, Material Design 3, Apple HIG, 업계 표준)
> 최종 업데이트: 2026-04-16

---

## 1. 타이포그래피

### 기본 폰트: Inter

선정 이유:
- 영어권 대시보드 UI 폰트 1위 (Untitled UI, FontFYI 조사 기준)
- x-height가 높아 작은 크기에서도 가독성 우수
- 유사 글자(I/l/1, O/0) 명확 구분
- `tabular-nums` 지원 — 데이터 테이블에서 숫자 열 정렬 보장
- Variable Font 지원 — 파일 1개로 모든 굵기 사용, 용량 절약
- Google Fonts 무료 라이선스

### 폰트 스케일

| 요소 | Size | Weight | Line Height | Letter Spacing | 용도 |
|------|------|--------|-------------|----------------|------|
| H1 | 32px | 700 | 1.25 (40px) | -0.02em | 페이지 타이틀 |
| H2 | 24px | 600 | 1.33 (32px) | -0.01em | 섹션 타이틀 |
| H3 | 20px | 600 | 1.4 (28px) | -0.01em | 카드/위젯 타이틀 |
| Body | 16px | 400 | 1.5 (24px) | 0 | 본문 텍스트 |
| Caption | 13px | 500 | 1.54 (20px) | 0.01em | 라벨, 보조 텍스트 |
| Small | 12px | 400 | 1.5 (18px) | 0.02em | 메타 정보 (절대 최소) |

근거:
- 본문 16px — Material Design 3, Apple HIG 권장 최소값
- line-height 1.5 — WCAG 2.2 텍스트 간격 기준 (폰트 크기의 1.5배 이상)
- 12px 미만 금지 — 접근성 업계 최소 기준
- letter-spacing는 큰 크기에서 타이트하게(-0.02em), 작은 크기에서 넓게(+0.02em) — 가독성 연구 기반

### 숫자 표시 규칙
```css
/* 데이터 테이블, 통계 카드 등 숫자 영역에 필수 적용 */
font-variant-numeric: tabular-nums lining-nums;
```
- tabular-nums: 모든 숫자가 동일 너비 → 열 정렬 보장
- lining-nums: 숫자가 베이스라인에 정렬 → 테이블에 적합

### 보조 폰트: JetBrains Mono
- 코드 블록, 라이선스 키, API 키 등 모노스페이스 필요 시
- 13px / 400 / line-height 1.54

---

## 2. 접근성 (WCAG 2.2 기반)

### 색상 대비 — 필수

| 대상 | AA 기준 | AAA 기준 |
|------|---------|----------|
| 일반 텍스트 (< 18px bold, < 24px) | **4.5:1** | 7:1 |
| 큰 텍스트 (≥ 18px bold 또는 ≥ 24px) | **3:1** | 4.5:1 |
| UI 컴포넌트 (버튼 테두리, 입력 필드 등) | **3:1** | — |

MergeUi 목표: **AA 필수, AAA 권장**

### 최소 사이즈

| 대상 | 최소값 | 근거 |
|------|--------|------|
| 본문 폰트 | **16px** | Material Design 3, Apple HIG |
| 절대 최소 폰트 | **12px** | 업계 합의 최소선 |
| 터치 타겟 (모바일) | **44x44px** | WCAG 2.2 Level AA |
| 클릭 타겟 (데스크톱) | **32x32px** | 마우스 정밀도 고려 |

### 포커스 인디케이터

```css
/* 모든 인터랙티브 요소에 적용 */
:focus-visible {
  outline: 2px solid var(--merge-color-primary);
  outline-offset: 2px;
}
```
- 두께: 최소 2px
- 포커스/비포커스 간 대비: 3:1 이상
- `outline-offset`으로 요소와 간격 확보

### 키보드 네비게이션 — 필수

| 요구사항 | 구현 방법 |
|----------|----------|
| 모든 인터랙티브 요소 Tab 접근 | `tabindex` 순서 보장 |
| 논리적 Tab 순서 | DOM 순서 = 시각 순서 |
| Enter/Space로 활성화 | 버튼, 링크, 토글 등 |
| Escape로 닫기 | 모달, 드롭다운, 사이드 패널 |
| 화살표 키 네비게이션 | 탭, 메뉴, 라디오 그룹 내부 |

### ARIA 필수 요소

| 컴포넌트 | 필수 ARIA |
|----------|----------|
| 사이드바 | `role="navigation"`, `aria-label="Main navigation"` |
| 탑바 | `role="banner"` |
| 메인 콘텐츠 | `role="main"` |
| 차트 | `role="img"`, `aria-label="차트 설명"` |
| 테이블 | `<table>` 시맨틱 사용, `<th scope="col">` |
| 알림/뱃지 | `aria-live="polite"` |
| 토글 | `role="switch"`, `aria-checked` |
| 모달 | `role="dialog"`, `aria-modal="true"`, 포커스 트랩 |

---

## 3. 레이아웃 표준

### 사이드바

| 상태 | 너비 | 비고 |
|------|------|------|
| 확장 | **260px** | 아이콘 + 텍스트 |
| 축소 (태블릿) | **68px** | 아이콘 온리 |
| 숨김 (모바일) | 0px | 하단 네비게이션으로 대체 |

사이드바 아이템 높이:
- 데스크톱: **36px** (마우스 정밀도)
- 태블릿: **44px** (터치 타겟)

### 탑바

| 항목 | 값 |
|------|-----|
| 높이 | **64px** |
| position | sticky, top: 0 |
| z-index | 50 |

### 콘텐츠 영역

| 항목 | 값 |
|------|-----|
| max-width | **제한 없음 (100%)** — 대시보드 업계 표준 |
| padding | **32px** (데스크톱), **16px** (모바일) |
| 그리드 gap | **24px** |

### 반응형 브레이크포인트

| 구간 | 너비 | 사이드바 | 그리드 |
|------|------|---------|--------|
| 모바일 | ~767px | 숨김 + 하단 네비 | 1열 |
| 태블릿 | 768~1279px | 축소 68px | 2열 |
| 데스크톱 | 1280px+ | 확장 260px | 4열 |
| 디자인 기준 | 1440px | — | — |

### 컴포넌트 사이즈

| 컴포넌트 | 값 | 비고 |
|----------|-----|------|
| 카드 padding | **24px** | |
| 카드 border-radius | **16px** | |
| 테이블 행 높이 | **48px** | 데이터 밀도 중간 기준 |
| 차트 최소 높이 | **250px** | 가독성 확보 최소선 |
| 버튼 높이 | **40px** (기본), **32px** (소형) | |
| 입력 필드 높이 | **40px** | |
| 아이콘 | **20px** (인라인), **24px** (독립) | |
| 아바타 | **32px** (기본), **24px** (소형), **48px** (대형) | |

### 간격 스케일 (8px 그리드)

```
4px / 8px / 12px / 16px / 20px / 24px / 32px / 40px / 48px / 64px
```
모든 간격은 4의 배수로 유지합니다.

---

## 4. 색상 체계

### 필수 토큰 (모든 테마에 공통)

```css
/* 액센트 */
--merge-color-primary
--merge-color-primary-hover
--merge-color-primary-light
--merge-color-primary-dark

/* 배경 */
--merge-bg-base          /* 페이지 배경 */
--merge-bg-surface       /* 카드/위젯 배경 */
--merge-bg-elevated      /* 모달/드롭다운 */
--merge-bg-inset         /* 오목한 요소 */

/* 텍스트 */
--merge-text-primary     /* 제목, 핵심 텍스트 */
--merge-text-secondary   /* 본문 */
--merge-text-muted       /* 라벨, 메타 */
--merge-text-inverse     /* 액센트 배경 위 텍스트 */

/* 상태 */
--merge-status-success / -light
--merge-status-warning / -light
--merge-status-error / -light
--merge-status-info / -light

/* 테두리 */
--merge-border-default   /* 은은한 구분선 */
--merge-border-strong    /* 명확한 테두리 */

/* 차트 팔레트 */
--merge-chart-1 ~ --merge-chart-8
```

### 차트 팔레트 규칙
- 최대 8색
- 색약 대응 (deuteranopia-safe) — 빨강/초록 동시 사용 시 형태/패턴으로 구분
- 인접 색상 간 명도 차이 확보

### 액센트 프리셋 (모든 테마에 4벌 제공)
- variables.css에 주석 처리된 프리셋으로 포함
- 구독자가 주석 해제만으로 전환 가능

---

## 5. 국제화

### RTL 대응 — CSS Logical Properties 사용

```css
/* ✅ 올바른 방법 (RTL 자동 대응) */
margin-inline-start: 16px;
padding-inline-end: 8px;
text-align: start;

/* ❌ 피할 방법 (RTL에서 수동 수정 필요) */
margin-left: 16px;
padding-right: 8px;
text-align: left;
```

처음부터 Logical Properties를 쓰면 RTL 대응 비용이 거의 제로입니다.

### 날짜/숫자 포맷
- 하드코딩 금지 — `Intl.DateTimeFormat()`, `Intl.NumberFormat()` 사용
- 데모 데이터는 ISO 형식(YYYY-MM-DD) 또는 미국 형식(MMM DD, YYYY) 사용

### 텍스트 길이 변동 대응
- 번역 시 텍스트 길이 30~200% 변동 가능
- 고정 너비 레이아웃 피하기
- `text-overflow: ellipsis` + 툴팁 조합 권장

---

## 6. 성능

### 목표 지표

| 지표 | 목표값 |
|------|--------|
| Lighthouse Performance | **90+** |
| FCP | **1.8초 이하** |
| LCP | **2.5초 이하** |
| INP | **200ms 이하** |
| CLS | **0.1 이하** |

### 번들 사이즈 목표 (gzipped)

| 리소스 | 목표 |
|--------|------|
| CSS (theme.css + variables.css) | **30KB 이내** |
| JS (theme.js) | **10KB 이내** (Chart.js 제외) |
| 폰트 (Inter Variable) | **~100KB** |
| Chart.js (외부 CDN) | CDN 캐시 활용 |

### 성능 규칙
- 외부 의존성 최소화 (Chart.js만 허용)
- 아이콘은 인라인 SVG (HTTP 요청 절약)
- 이미지는 WebP 우선, 필요 시 PNG fallback
- CSS 애니메이션 사용 (`transform`, `opacity` 위주 — GPU 가속)

---

## 7. 코드 규칙

### HTML
- 시맨틱 태그 필수: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`
- `lang` 속성 필수: `<html lang="en">`
- 모든 `<img>`에 `alt` 속성
- 모든 `<input>`에 `<label>` 연결 또는 `aria-label`

### CSS
- 모든 값은 CSS 변수(`--merge-*`)로 정의
- 변수명 규칙: `--merge-{카테고리}-{속성}` (예: `--merge-bg-surface`)
- 단위: px (고정), rem 사용 안 함 (일관성 + 대시보드 특성)
- 미디어 쿼리: 모바일 퍼스트 아님, 데스크톱 기본 + 축소 방향

### JS
- 최소한의 바닐라 JS만 사용
- 프레임워크 의존성 없음
- 이벤트 위임 활용
- `DOMContentLoaded` 후 초기화

---

## 출처

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Material Design 3](https://m3.material.io/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [web.dev Core Web Vitals](https://web.dev/articles/vitals)
- [Untitled UI 폰트 가이드](https://www.untitledui.com/blog/best-free-fonts)
- [MDN font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
