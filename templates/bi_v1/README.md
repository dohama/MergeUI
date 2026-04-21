# BI Dashboard (bi_v1)

> Looker Studio · Metabase · Tableau 스타일 · **차트 10종 동시 표시**
> Business Intelligence / Analytics 대시보드

## 🎯 차트 10종 시그니처

한 화면에 BI 툴 표준 차트 10종이 동시에 렌더링됩니다.

| # | 차트 | 타입 | 용도 |
|---|---|---|---|
| 1 | **Line Chart** | Chart.js line + 그라디언트 영역 | Revenue 12M vs 전년 |
| 2 | **Stacked Bar** | Chart.js bar (vertical stacked) | 채널별 트래픽 분해 |
| 3 | **Horizontal Stacked Bar** | Chart.js bar (indexAxis:'y') | 코호트 리텐션 M1~M6 |
| 4 | **Donut** | Chart.js doughnut (cutout 68%) | 디바이스 분포 |
| 5 | **Pie** | Chart.js pie | 플랜 mix |
| 6 | **Area (Stacked)** | Chart.js line stacked fill | MAU/WAU/DAU |
| 7 | **Scatter Plot** | Chart.js scatter + 가변 포인트 크기 | LTV vs CAC (버블) |
| 8 | **Heatmap** | SVG 직접 (7×24 그리드, 5단계) | 요일×시간 트래픽 밀도 |
| 9 | **Gauge** | SVG arc path (반원형) | NPS 점수 |
| 10 | **Funnel** | HTML + CSS (수평 바) | 전환 퍼널 |

추가 + Sparkline × 4 (KPI 상단) + Top Countries 테이블 + 배지·랭크

## 디자인
- **Light BI 톤**: 배경 `#F6F8FB`, 카드 순백, 경계 `#E4E9F0`
- **Indigo 5 액센트** `#4C6EF5` (Tableau·Metabase 스타일)
- 12-column grid (bi-span-N 시스템)
- Inter body + JetBrains Mono 숫자
- 절제된 shadow (`0 2px 8px rgba(16,24,40,0.06)`)
- 4 액센트 프리셋 (Indigo/Emerald/Rose/Charcoal)

## Quick Start
1. `index.html` 브라우저로 열기
2. 또는 `npx serve`

## 커스터마이징
- **액센트 프리셋**: `css/bi-tokens.css` 하단 주석 해제
- **데이터**: `js/data.js`의 `BI_DATA` 수정

## 의존성
- Chart.js 4 (CDN)
- Google Fonts Inter + JetBrains Mono

## 라이선스
© 2026 MergeUi. Commercial license.
