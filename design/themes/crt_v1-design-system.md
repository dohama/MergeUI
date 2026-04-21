# Cathode Ray Terminal (crt_v1) — Design System

> 브라운관 CRT 인광 그린 · DevOps / System Monitoring 대시보드
> 최종 수정: 2026-04-21

---

## 컨셉

- **스타일**: 80~90년대 CRT 터미널 + NOC(Network Operations Center) 모니터
- **분위기**: 해커·사이버펑크·서버룸 감성, 살아있는 화면
- **핵심 가치**: 실시간 모니터링 대시보드를 "진짜 CRT에서 돌아가는 것처럼" 재현
- **분야**: DevOps / System Monitoring (Grafana·Datadog 대안)
- **차별화**: 장식용 레트로가 아닌, **실무에도 쓸 수 있는 실용 레트로**

---

## 컬러 팔레트

### 배경
| 토큰 | HEX | 용도 |
|------|-----|------|
| `--crt-bg-deep` | `#000000` | 페이지 바탕 |
| `--crt-bg-panel` | `#0A0A0A` | 카드·패널 배경 |
| `--crt-bg-card` | `#0F0F0F` | 호버 |
| `--crt-bg-elevated` | `#161616` | 중간 |

### 인광 그린 (기본)
| 토큰 | HEX | 용도 |
|------|-----|------|
| `--crt-phosphor` | `#33FF66` | 밝은 인광 그린 (주 텍스트) |
| `--crt-phosphor-dim` | `#22AA44` | 보조 |
| `--crt-phosphor-low` | `#116622` | 라벨·비활성 |
| `--crt-phosphor-glow` | `rgba(51,255,102,0.55)` | text-shadow 글로우 |

### 상태 (RGB 분리)
- Error: `#FF3344` + 붉은 글로우 (깜빡임)
- Warning: `#FFB000` (호박색 인광) + 앰버 글로우
- Info: `#33FFFF` + 시안 글로우

---

## 타이포그래피

- **전역 폰트**: VT323 (Google Fonts, OFL) — 터미널 전용 모노스페이스
- 기본 크기 **18px** (CRT 가독성 고려 일반보다 크게)
- KPI 42px, 헤더 22px
- 모든 텍스트에 `text-shadow: 0 0 4px var(--crt-phosphor-glow)` 글로우

---

## 시그니처 효과

### 스캔라인 오버레이
```css
body::before {
  content: '';
  position: fixed; inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px,
    rgba(0,0,0,0.25) 3px
  );
  pointer-events: none;
  z-index: 100;
  mix-blend-mode: multiply;
}
```

### Vignette (배경 글로우)
```css
body::after {
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
}
```

### Flicker 애니메이션 (2.5s 간헐적 불안정)
```css
@keyframes crt-flicker {
  0%, 19.9%, 22%, 62.9%, 64%, 100% { opacity: 0.99; }
  20%, 21.9%, 63%, 69.9% { opacity: 0.75; }
}
```

### Blink 커서
```css
@keyframes crt-blink { 50% { opacity: 0; } }
```

---

## 간격 & Radius
- 간격 4/8/12/16/24/32/48/64px
- **Radius 전부 0** (터미널은 모두 각)

---

## 컴포넌트 스펙

### KPI 박스 (기술 문서 느낌)
- 1px solid phosphor border
- 좌상단에 `[ SYS-01 ]` 라벨 (작은 식별자)
- 값: 42px + text-shadow glow
- 상태별 색 변화 (warn=amber, err=red 깜빡임)
- 호버 시 `box-shadow: 0 0 20px phosphor-glow`

### 로그 스트림
- 최대 400px 높이, scroll
- 고정폭 `grid-template-columns: 80px 60px 1fr auto`
- ERR=red / WARN=amber / INFO=cyan 레벨별 색
- 레벨 배지 1px 아웃라인
- 소스 이름 phosphor-low

### 서비스 헬스 리스트
- 좌측 3px 색 bar (상태별)
- `[online]` 대괄호 상태 표시
- 지연시간 우측 고정

### ASCII 바 차트
```
SERVICE              CPU%  [0%     50%     100%]
-------------------- ----  --------------------
api-gateway           42%  [████████░░░░░░░░░░░░]
```
- `<pre>` + VT323 + `white-space: pre`

### Chart.js 통합
- `tension: 0` (각진 라인)
- 그리드 `rgba(51,255,102,0.1)`
- 포인트 `pointStyle: 'rect'`
- Dashed 패턴으로 p99 구분

### 버튼
- `[ Button Text ]` 대괄호 스타일
- 호버: 배경 phosphor 채움 + glow shadow

---

## 반응형
- 데스크톱 1280+ : 2-col (차트 넓게 + 로그 좁게)
- 태블릿 : 1-col
- 모바일 : 네비 숨김, KPI 1-col

---

## 액센트 프리셋 (4벌)
- **Green Phosphor** (기본): 전통 터미널 그린
- Amber Phosphor: 1980s IBM·호박색 인광
- Ice Blue: 시안 인광
- Hot Pink: 핑크 인광 (여성적 사이버펑크)

---

## 파일 구조
```
templates/crt_v1/
├── index.html          # System Monitor
├── css/
│   ├── crt-tokens.css
│   └── crt-theme.css
├── js/
│   ├── crt-theme.js
│   └── data.js
└── README.md
```

---

## 시그니처
1. 스캔라인 오버레이 (repeating gradient + multiply)
2. Flicker 애니메이션 (간헐적 2.5s)
3. 깜빡이는 커서 + 에러 블링킹
4. ASCII 바 차트 (진정성)
5. 로그 스트림 색 코딩
6. `[ ID ]` 라벨로 기술 문서 감성
