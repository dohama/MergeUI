# Trading Terminal (td_v1)

> Bloomberg · TradingView 스타일 프로 퀀트 데스크 · **차트 7종 동시 표시**
> 주식 / 암호화폐 트레이딩 터미널

## 카테고리 매칭
이 테마는 **실시간 트레이딩·금융 데이터·퀀트 대시보드에 최적**입니다.
- 한 화면에 차트 7종 + 포지션 테이블 + 뉴스 피드 = 정보 밀도 최대
- 다크 프로 무드 (네이비 `#0A0E14` + 오렌지 액센트)
- Bull/Bear 컬러 시스템 (`#22C55E` / `#EF4444`)

## 🎯 차트 7종 시그니처

| # | 차트 | 타입 | 위치 |
|---|---|---|---|
| 1 | **캔들스틱 + 볼륨** | OHLC SVG + 볼륨 바 (하단) | 메인 영역 |
| 2 | **Depth Chart** | Bids/Asks 누적 Area 좌우 대칭 | 하단 좌 |
| 3 | **Volume Profile** | 수평 바 (가격대별 볼륨) | 하단 우 |
| 4 | **Sparklines × 10** | 워치리스트 종목별 미니 라인 | 왼쪽 사이드바 |
| 5 | **Order Book** | Bids/Asks Depth 시각화 (fill bar) | 오른쪽 사이드바 |
| 6 | **News Sentiment** | Bullish/Bearish/Neutral 배지 | 뉴스 피드 |
| 7 | **실시간 Ticker** | 상단 스크롤 스트림 | 최상단 |

## 시그니처
- **3열 레이아웃** (워치리스트 240px · 메인 flex · 오더북 280px)
- 상단 **스크롤 티커** (CSS keyframe infinite)
- 캔들스틱 **SVG 직접 렌더** (Chart.js financial 플러그인 불필요)
- 오더북 행마다 **비례 fill bar** (볼륨 시각화)
- 포지션 테이블 P&L 컬러 (up=녹/down=적)
- **JetBrains Mono** 숫자 tabular-nums
- Bloomberg 오렌지 `#FF7A00` 시그니처

## Quick Start
1. `index.html` 브라우저로 열기
2. 또는 `npx serve`

## 커스터마이징
- **액센트 프리셋**: `css/td-tokens.css` 하단 주석 해제
  - Forest (green)
  - Midnight Violet (purple)
  - Pure Mono (흑백)
- **데이터**: `js/data.js`의 `TD_DATA` 수정

## 라이선스
© 2026 MergeUi. Commercial license.
