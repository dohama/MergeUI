# Workspace 95 (w95_v1) — Design System

> Windows 95/98 시스템 UI · Project Management 어드민 테마
> 최종 수정: 2026-04-21

---

## 컨셉

- **스타일**: Windows 95/98 시스템 UI (이중 박스 베벨, 타이틀바, 시스템 그레이)
- **분위기**: 밈·노스탤지어 + 실무 밀도 양립, 아이러니한 친근함
- **핵심 가치**: 정보 밀도 높은 프로젝트 관리 UI가 윈도우 메타포와 자연스럽게 결합
- **분야**: Project Management / Team Workspace
- **차별화**: 98.css 벤치마크지만 "완성된 대시보드 IA + 실데이터 위젯"으로 고급화

---

## 컬러 팔레트

### 시스템 (Win95 하드코딩)
| 토큰 | HEX | 용도 |
|------|-----|------|
| `--w95-bg` | `#008080` | 데스크톱 청록 (바탕화면) |
| `--w95-win-bg` | `#C0C0C0` | 윈도우 배경 (시스템 그레이) |
| `--w95-title-bar` | `#000080` | 네이비 타이틀바 |
| `--w95-bevel-light` | `#FFFFFF` | 베벨 하이라이트 (위·왼) |
| `--w95-bevel-shadow` | `#808080` | 베벨 섀도 (아래·오른) |
| `--w95-bevel-shadow-deep` | `#000000` | 외곽 1px 블랙 |
| `--w95-accent` | `#000080` | 선택 배경 네이비 |

### 텍스트
- 기본 `#000000`, 비활성 `#808080`, 디스에이블 `#A0A0A0`

### 차트 (16색 VGA)
8색 사용: `#000080 / #800000 / #008000 / #808000 / #800080 / #008080 / #C0C0C0 / #404040`

---

## 베벨 체계 (모든 요소의 기초)

### Out-Bevel (돌출 — 버튼·윈도우)
```css
border-top: 2px solid #FFFFFF;
border-left: 2px solid #FFFFFF;
border-right: 2px solid #000000;
border-bottom: 2px solid #000000;
box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #C0C0C0;
```

### In-Bevel (함몰 — 인풋·프로그레스)
`border-top/left: #808080; border-right/bottom: #FFFFFF`

### Pressed (눌림)
버튼 활성 시 베벨 방향 반전

---

## 타이포그래피

- **폰트**: MS Sans Serif (시스템) → 폴백: Pixelify Sans, Tahoma, Geneva
- 기본 크기 11px, 헤딩 22px, 타이틀바 14px
- `-webkit-font-smoothing: none`, `image-rendering: pixelated` 전역 적용

---

## 간격 & Radius

- 간격 2/4/6/8/12/16/24/32px (8px 그리드 + 픽셀 정확성)
- **Radius 전부 0** (샤프한 각 유지)

---

## 컴포넌트 핵심 스펙

### 윈도우 박스
- 타이틀바 파란 그라디언트 `#000080 → #1084D0` + 흰 텍스트
- 우측 상단에 `_ □ ×` 3개 버튼 (모두 베벨 out)
- 메뉴바 (File / Edit / View / Help)
- 바디 영역 `#C0C0C0` 배경

### KPI 박스
- In-bevel 패널 (함몰 느낌)
- 22px 볼드 값 + 10px 라벨 uppercase

### 테이블 (파일 리스트 스타일)
- 헤더: 베벨 컬럼 (File Explorer 느낌)
- 짝수행 `#F5F5F5` zebra
- 호버 시 `#000080` 배경 + 흰 텍스트 (Windows 선택 컬러)

### 프로그레스 바
- In-bevel + 도트 채움 (`repeating-linear-gradient`)

### 태스크바
- 화면 최하단 28px
- Start 버튼 (베벨 out) + 시계 (베벨 in)

---

## 반응형
- 데스크톱 1280+ : 좌 240px 아이콘 그룹 + 메인 (2-col)
- 태블릿 ~1279px : 아이콘 그룹 하단으로
- 모바일 ~767px : 모두 1-col

---

## 액센트 프리셋 (4벌)
- **Classic Win95** (기본): Navy + Cyan Desktop
- Classic Mac OS: 흑백 시스템 7
- Hot Pink 98: 핑크 타이틀바
- Plum: 보라

---

## 파일 구조
```
templates/w95_v1/
├── index.html          # Project Management Overview
├── css/
│   ├── w95-tokens.css
│   └── w95-theme.css
├── js/
│   ├── w95-theme.js
│   └── data.js
└── README.md
```

---

## 시그니처
1. 이중 박스 베벨 + 외곽 블랙 (윈도우 시스템 정체성)
2. 파란 그라디언트 타이틀바 + 3개 윈도우 컨트롤 버튼
3. 하단 Start 태스크바 + 실시간 시계
4. File Explorer 스타일 테이블
5. Radius 전부 0 (샤프한 각)
