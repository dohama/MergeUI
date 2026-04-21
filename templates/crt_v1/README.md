# Cathode Ray Terminal (crt_v1)

> CRT 브라운관 인광 그린 감성 · **DevOps / System Monitoring** 테마
> Grafana·Datadog 대시보드의 레트로 대안

## 카테고리 매칭
이 테마는 **실시간 시스템 모니터링·DevOps 대시보드에 최적**입니다.
- 인광 그린 + 스캔라인 = 서버룸·NOC(Network Operations Center) 감성
- 깜빡이는 커서·로그 스트림·ASCII 바 차트가 실제 터미널 경험 재현
- 홈랩·사이드프로젝트 운영자가 Grafana 대신 쓸 만한 실용적 레트로
- DevOps 엔지니어 (30~45세) 타겟, HN·r/selfhosted 바이럴 가능

## 시그니처
- **CRT 스캔라인 오버레이** (`::before` + `mix-blend-mode: multiply`)
- **Flicker 애니메이션** (2.5s 간헐적 불안정, 진짜 CRT 느낌)
- 인광 그린 `#33FF66` + text-shadow glow
- 깜빡이는 커서(`_`) + 블링킹 ERR 인디케이터
- VT323 모노스페이스 폰트 (터미널 전용)
- 로그 컬러 코딩 (ERR=red, WARN=amber, INFO=cyan)
- ASCII 바 차트 (`█░` 블록)
- KPI 박스 상단에 `[ SYS-01 ]` 라벨 (기술 문서 느낌)

## Quick Start
1. `index.html` 브라우저로 열기
2. 또는 `npx serve`

## 커스터마이징
- **액센트 프리셋** (인광 색): `css/crt-tokens.css` 하단 주석 해제
  - Amber Phosphor (호박색 인광)
  - Ice Blue (시안)
  - Hot Pink
- **데이터**: `js/data.js`의 `CRT_DATA` 수정

## 의존성
- Chart.js 4 (CDN, 인광 테마로 커스텀)
- VT323 (Google Fonts OFL)

## 라이선스
© 2026 MergeUi. Commercial license.
