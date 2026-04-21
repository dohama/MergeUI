# Workspace 95 (w95_v1)

> Windows 95/98 시스템 UI 감성 · **Project Management / Team Workspace** 테마
> 디자인 스펙: [`design/themes/bw_v1` 계열 참고](../../design/themes/) | 전용 스펙 문서 예정

## 카테고리 매칭
이 테마는 **프로젝트 매니지먼트 어드민에 최적화**됩니다.
- Windows 95 Explorer 감성이 폴더 구조 · 파일 리스트 · 윈도우 중첩 UX와 자연스럽게 연결
- 정보 밀도 높은 테이블 · 베벨 UI는 전통 어드민 밀도와 구조적으로 맞음
- "농담처럼 쓸 수 있는" 레트로 — 진지한 프로젝트 관리에도 어울림

## 시그니처
- **이중 박스 베벨** (`#fff` 위·왼 / `#808080` 아래·오른, 외곽 `#000` 1px)
- Windows 95 타이틀바 (파란 그라디언트 `#000080 → #1084D0`)
- 시스템 그레이 `#C0C0C0` 배경
- 점선 포커스 (dotted outline)
- MS Sans Serif 계열 폰트 (fallback: Pixelify Sans)
- border-radius 0 (모든 요소 각지게)
- 하단 Start 태스크바 + 실시간 시계

## Quick Start
1. `index.html` 브라우저에서 열기
2. 또는 `npx serve`

## 커스터마이징
- **액센트 프리셋**: `css/w95-tokens.css` 하단 주석 해제 (Classic Mac · Hot Pink 98 · Plum)
- **데이터**: `js/data.js`의 `W95_DATA` 수정

## 라이선스
© 2026 MergeUi. Commercial license.
