# Gameboy DMG (gb_v1) — Design System

> 1989 Nintendo Gameboy LCD 4톤 그린 · Habit Tracker / Gamified Personal Dashboard
> 최종 수정: 2026-04-21

---

## 컨셉

- **스타일**: Nintendo Gameboy DMG 오리지널 LCD (4색 그린 제약)
- **분위기**: 귀여움·노스탤지어·게임화, 해야 할 일이 "퀘스트"가 되는 느낌
- **핵심 가치**: 극한의 색 제약으로 시각적 집중도 확보 + 게임 메타포로 동기부여
- **분야**: Habit Tracker / Personal Dashboard (Gamification)
- **차별화**: 개인 대시보드·습관 관리 앱은 모던 톤 일색 — 본 테마는 **레트로 게임화**로 완전 분리

---

## 컬러 팔레트 — 4톤 전용

### Gameboy LCD 오리지널
| 토큰 | HEX | 용도 |
|------|-----|------|
| `--gb-lcd-0` | `#0F380F` | 가장 어두움 — 텍스트·테두리 |
| `--gb-lcd-1` | `#306230` | 어두움 — 버튼·강조 |
| `--gb-lcd-2` | `#8BAC0F` | 중간 — 활성·경고 |
| `--gb-lcd-3` | `#9BBC0F` | 밝음 — LCD 배경 |

**제약 원칙**: 이 4색 외 추가 색 사용 금지. 모든 UI 계층은 이 4단계 안에서 해결.

### 디바이스 케이스 (LCD 밖 영역)
- `--gb-case`: `#B8B8A0` (회색 케이스)
- `--gb-case-dark`: `#5B5B4A`
- `--gb-case-purple`: `#5A3E8C` (A/B 버튼 — Gameboy Color 감성)

---

## 타이포그래피

- **폰트**: Press Start 2P (Google Fonts, OFL) — 8bit 픽셀 폰트
- 기본 크기 11px, 타이틀 16px, KPI 14px
- 라벨은 uppercase + letter-spacing 0.05~0.1em
- `image-rendering: pixelated`, `font-smoothing: none` 전역

---

## 레이아웃 구조 — 디바이스 프레임

화면 전체를 "실제 Gameboy" 모양으로 감쌈:

```
┌────────────────────────────┐
│ QUEST-BOY  [●○]  (전원 LED)│
├────────────────────────────┤
│                            │
│  ┌──────────────────┐     │
│  │                  │     │
│  │    LCD SCREEN    │     │
│  │                  │     │
│  │   [Dashboard]    │     │
│  │                  │     │
│  └──────────────────┘     │
│                            │
│   ▲           ( A )        │
│  ◀●▶         ( B )         │
│   ▼                        │
│                            │
└────────────────────────────┘
```

- 디바이스 박스: 회색 케이스 + inset box-shadow (하이라이트·섀도)
- LCD 영역: 밝은 LCD-3 배경 + 외곽 2px LCD-0 테두리
- 하단에 **D-Pad + A/B 버튼** (장식용)

---

## 간격 & Radius
- 픽셀 단위 `--gb-px: 4px`
- 간격 4/8/12/16/24/32/48/64px
- **Radius 전부 0** (픽셀 정확성)

---

## 컴포넌트 스펙

### XP 바 (상단 게이지)
- 중간톤 LCD-2 배경 + 2px LCD-0 테두리
- 채움은 `repeating-linear-gradient` 도트 패턴 (픽셀 느낌)
- 라벨: `LV.14 · 420/600 XP`

### KPI 박스 (스테이터스 블록)
- 인셋 box-shadow 2px LCD-0
- 이모지 아이콘 (⚔ ★ ♥ ◆) 18px
- 라벨 8px uppercase + 값 14px

### 퀘스트 리스트 (체크리스트)
- LCD-3 배경 + 2px LCD-0 테두리
- 좌측 체크박스 14px × 14px
- 우측 XP 뱃지 (`+20 XP`)
- 완료 시: LCD-2 배경 + 취소선 + 체크박스 `✕` 표시
- 클릭으로 토글 (이벤트 핸들러 구현됨)

### 30일 Streak 히트맵
- `grid-template-columns: repeat(30, 1fr)` 2px gap
- 각 셀 4단계:
  - 0: 빈 셀 (LCD-3 배경 + LCD-1 1px inset)
  - l1: LCD-2 (가벼운 활동)
  - l2: LCD-1 (중간)
  - l3: LCD-0 (완벽한 날)

### 업적 카드 (4x2 그리드)
- 아이콘 22px (이모지) + 이름 9px uppercase
- 잠금 상태: opacity 0.4 + grayscale(1) + contrast(0.5)

### 버튼 (3가지)
- **Primary**: LCD-0 배경 + LCD-3 텍스트, 9px uppercase
- **Secondary**: LCD-3 배경 + 2px LCD-0 인셋 테두리
- **D-Pad**: 회색 케이스 다크 배경 + 장식용 (클릭 가능)
- **A/B 라운드**: 40×40 원형 + 보라 케이스 컬러 + inset shadow

---

## 인터랙션

- **퀘스트 토글**: 리스트 항목 클릭 시 완료/미완료 전환
- **버튼 눌림**: `transform: translate(1px, 1px)` (미세 픽셀 이동)
- **애니메이션**: 없음 또는 최소한 (Gameboy는 전환이 거의 없음)

---

## 반응형
- 데스크톱: 4-col KPI + 2-col (히트맵 + 업적)
- 태블릿: 2-col KPI + 1-col
- 모바일: 1-col, 히트맵 15-col로 2줄 분리

---

## 액센트 프리셋 (4벌)

| 프리셋 | 주 컬러 | 분위기 |
|--------|--------|--------|
| **DMG Green** (기본) | 4톤 LCD 그린 | 오리지널 89 |
| Pocket | 흑백 그레이스케일 | 1996 실버 |
| Color | 레드 팔레트 | 1998 포켓몬 핑크 |
| Advance | 블루 팔레트 | 2001 GBA |
| Virtual Boy | 빨강 단색 | 1995 실험적 |

---

## 파일 구조
```
templates/gb_v1/
├── index.html          # Habit Tracker (Quest Log)
├── css/
│   ├── gb-tokens.css
│   └── gb-theme.css
├── js/
│   ├── gb-theme.js
│   └── data.js
└── README.md
```

---

## 시그니처
1. **4톤 LCD 그린 전용** (컬러 제약의 미학)
2. 실제 Gameboy 디바이스 프레임 (화면을 둘러싼 케이스 + D-Pad + A/B 버튼)
3. XP 바·레벨·업적 시스템 (RPG 게임화)
4. 30일 Streak 히트맵 (4단계 채움)
5. Press Start 2P 픽셀 폰트 + `image-rendering: pixelated`
6. 퀘스트 토글 (클릭으로 완료 체크)
7. 전원 LED (깜빡이는 도트)
