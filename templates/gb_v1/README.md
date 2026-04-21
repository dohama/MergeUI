# Gameboy DMG (gb_v1)

> 1989년 Nintendo Gameboy LCD 4톤 그린 · **Habit Tracker / Gamified Personal Dashboard** 테마
> 픽셀 아트 + RPG 감성의 습관·할일 관리

## 카테고리 매칭
이 테마는 **개인 습관 추적·게임화 대시보드에 최적**입니다.
- 4색 LCD 제약 = 극도의 시각 단순함 → 습관 체크리스트에 이상적
- XP 바·레벨·업적 시스템 = 게임화(gamification) UX 자연스러움
- 30일 streak 히트맵 = 레트로 느낌의 성취 시각화
- D-Pad·A/B 버튼 장식 = 진짜 게임보이를 만지는 듯한 몰입감
- 인디 게임 개발자·뉴스레터 크리에이터·Twitter 바이럴 최상

## 시그니처
- **4톤 LCD 그린 팔레트 전용** (`#0F380F / #306230 / #8BAC0F / #9BBC0F`)
- Press Start 2P (Google Fonts 8bit 폰트)
- **디바이스 케이스 프레임** (실제 게임보이 모양 구현)
- XP 바 (픽셀 도트 채움)
- 업적 잠금/해제 시스템
- 30일 streak 히트맵 (4단계 채움)
- **D-Pad + A/B 버튼** 하단 장식
- 전원 LED (깜빡임)
- Border-radius 0 (모든 요소 각 픽셀)
- `image-rendering: pixelated` 전역

## Quick Start
1. `index.html` 브라우저로 열기
2. 또는 `npx serve`

## 커스터마이징
- **액센트 프리셋 전환**: `css/gb-tokens.css` 하단 주석 해제
  - Pocket (실버 흑백)
  - Color (레드)
  - Advance (블루)
  - Virtual Boy (빨강 단색)
- **데이터 변경**: `js/data.js`의 `GB_DATA` 수정

## 인터랙션
- 퀘스트 클릭 → 완료/미완료 토글

## 라이선스
© 2026 MergeUi. Commercial license.
