# Monochrome Analytics (bw_v1)

> Editorial Monochrome · 순백 배경 · H0 72px 메가 타이틀 · 1px 하드 블랙 라인
> 디자인 스펙: [`design/themes/bw_v1-design-system.md`](../../design/themes/bw_v1-design-system.md)

## 시그니처
- 순백 `#FFFFFF` + 순흑 `#000000` 완전 대비 (중간색 금지)
- H0 72px Mega Title Strip (JetBrains Mono 900) 상단 필수
- **그림자 전면 금지** — 1px hard black line만으로 계층 구현
- Space Grotesk (헤딩) + JetBrains Mono (숫자 tabular-nums)
- Border-radius 0px 또는 2px만

## Quick Start
1. 폴더 압축 해제 → `index.html` 브라우저에서 열기
2. 또는 `npx serve` 실행 후 `http://localhost:3000`

## 커스터마이징
- **액센트 전환**: `css/bw-tokens.css` 하단의 주석된 프리셋(Warm Gray · Cool Steel · Archive Sepia) 중 하나 주석 해제
- **데이터 변경**: `js/data.js`의 `BW_DATA` 수정

## 라이선스
© 2026 MergeUi. Commercial license included.
