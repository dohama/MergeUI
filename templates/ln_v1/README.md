# Linea CRM (ln_v1)

> Minimal Line-Only CRM · 웜 아이보리 배경 · 1px 헤어라인 · 문구점 감성
> 디자인 스펙: [`design/themes/ln_v1-design-system.md`](../../design/themes/ln_v1-design-system.md)

## 시그니처
- 웜 아이보리 `#FBFAF6` 배경, Ink Black `#111` 라인
- **그림자 전면 금지** — 오직 1px 헤어라인으로 계층 구현
- Inter + Fraunces 세리프 혼용 (H1·KPI에 Fraunces italic 포인트)
- 미니 사이드바 72px (아이콘 only, 1.25px stroke) + 이중 네비 (Primary Top + Sub Chips)
- 아웃라인 버튼 → 호버 시 Ink 채움 (인장·스탬프 인터랙션)
- Border-radius 4px 또는 2px만

## Quick Start
1. `index.html` 브라우저에서 열기
2. 또는 `npx serve` 후 로컬 호스트 접속

## 커스터마이징
- **액센트 프리셋 전환**: `css/ln-tokens.css` 하단 주석 해제 (Navy · Forest · Terracotta)
- **데이터**: `js/data.js`의 `LN_DATA` 수정

## 라이선스
© 2026 MergeUi. Commercial license included.
