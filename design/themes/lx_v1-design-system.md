# Maison Finance (lx_v1) — Design System

> 딥 차콜 + 크림 이중 배경 · 유럽 럭셔리 브랜드 톤의 Finance 대시보드
> 최종 수정: 2026-04-21

---

## 컨셉

- **스타일**: European Luxury (럭셔리 브랜드 · 프라이빗 뱅킹 · 타임리스 엘레강스)
- **분위기**: 절제된 우아함, 앤틱 골드 포인트, 세리프·산스 3종 혼용
- **핵심 가치**: 신뢰·권위·격식, 부유층·HNWI 고객 대상 자산관리 감성
- **분야**: Finance / Wealth Management (프라이빗 뱅킹, 자산 포트폴리오)
- **차별화**: 기존 fi_v1(클레이모피즘 에메랄드)와 완전 분리 — 이중 배경 + 세리프 타이포 + 심메트릭 레이아웃

---

## 컬러 팔레트

### 배경 (이중 톤 — 크림 사이드바 + 딥 차콜 콘텐츠)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--lx-bg-base` | `#1A1815` | 메인 콘텐츠 영역 (딥 차콜) |
| `--lx-bg-sidebar` | `#F5F0E8` | 사이드바 (크림) |
| `--lx-bg-surface` | `#242017` | 카드 배경 (차콜 elevated) |
| `--lx-bg-elevated` | `#2E2A20` | 호버 / 활성 |
| `--lx-bg-inset` | `#100E0B` | 함몰 |

### 텍스트 (2개 존 — 차콜 위 · 크림 위)

| 토큰 | HEX | 용도 | 배경 대비 |
|------|-----|------|----------|
| `--lx-text-on-dark` | `#F5F0E8` | 차콜 위 주 텍스트 | 15:1 |
| `--lx-text-on-dark-2` | `#C9C1AE` | 차콜 위 보조 | 8:1 |
| `--lx-text-on-dark-muted` | `#8F8775` | 차콜 위 라벨 | 4.5:1 |
| `--lx-text-on-light` | `#1A1815` | 크림 위 주 텍스트 | 15:1 |
| `--lx-text-on-light-2` | `#4A4238` | 크림 위 보조 | 8:1 |
| `--lx-text-on-light-muted` | `#8F8775` | 크림 위 라벨 | 4.5:1 |

### 브랜드 컬러 (앤틱 골드)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--lx-primary` | `#C9A961` | Antique Gold — 주 액센트, 포인트, 장식 |
| `--lx-primary-light` | `#DAB97A` | 호버, 그라디언트 |
| `--lx-primary-deep` | `#A68948` | 활성, 하이라이트 |
| `--lx-accent-sub` | `#6B2032` | Burgundy Velvet — 특별 강조 (위험·중요) |

### 골드 장식 그라디언트

```css
/* 골드 쉐이딩 — 하이라이트 */
background: linear-gradient(135deg, #DAB97A 0%, #C9A961 50%, #A68948 100%);

/* 골드 라인 */
border-top: 1px solid #C9A961;
```

### 상태 컬러 (절제된 톤)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--lx-success` | `#5A8A5E` | 성장, 상승 (deep forest) |
| `--lx-warning` | `#C9A961` | 경고 (골드) |
| `--lx-error` | `#8B3A3A` | 에러 (burgundy deep) |
| `--lx-info` | `#5A748A` | 정보 (steel blue) |

### 차트 팔레트 (절제된 럭셔리 8색)

```
#C9A961 → #6B2032 → #5A8A5E → #5A748A → #A68948 → #CFA793 → #A4A5A3 → #8B3A3A
```

---

## 타이포그래피

- **디스플레이 세리프**: Playfair Display (Google Fonts, OFL) — H1·메가 타이틀
- **서브 세리프**: Cormorant Garamond (Google Fonts, OFL) — H2·인용·우아한 포인트
- **본문 산세리프**: Montserrat (Google Fonts, OFL) — Body·라벨·데이터

### 스케일

| 요소 | 크기 | 굵기 | 행간 | 폰트 |
|------|------|------|------|------|
| **Display (Hero)** | 64px | 400 | 1.1 | Playfair Display (italic 포인트) |
| H1 | 42px | 400 | 1.2 | Playfair Display |
| H2 | 28px | 300 italic | 1.3 | Cormorant Garamond (italic 기본) |
| H3 (Card Title) | 18px | 600 | 1.4 | Montserrat |
| Body | 14px | 400 | 1.65 | Montserrat |
| Caption | 11px | 500 | 1.5 | Montserrat uppercase letter-spacing 0.15em |
| Small | 10px | 400 | 1.4 | Montserrat letter-spacing 0.2em |
| KPI Value | 36px | 400 | 1.2 | Playfair Display (세리프 숫자, italic 강조) |

### 타이포그래피 규칙
- 제목·숫자에 세리프(Playfair·Cormorant) — 에디토리얼 럭셔리
- 본문에는 Montserrat (가독성·모던)
- Cormorant italic은 H2·인용에만 한정 사용
- 대문자 라벨은 wide letter-spacing (0.15~0.2em)

---

## 레이아웃 구조

### 센터 심메트릭 (크림 사이드바 + 차콜 콘텐츠 + 센터 심메트릭 탑)

```
┌──────────┬────────────────────────────────┐
│  CREAM   │  CHARCOAL                      │
│          │                                │
│  ⸻⸻⸻     │   (상단 센터 심메트릭 Logo/Nav)│
│   Mon    │  ─────MAISON·FINANCE─────      │
│   Navi   │   [Overview][Portfolio][Rpts] │
│   Gold   │                                │
│   ⸻⸻⸻     │   ═══════════════════════      │
│          │                                │
│   [  ]   │   Display 64px Playfair Hero  │
│   [  ]   │                                │
│   [  ]   │   ···  ═══  ···                │
│          │                                │
│   ⸻⸻⸻     │   Grid (2-col symmetric)      │
│          │   [Card]  ···  [Card]          │
│          │                                │
└──────────┴────────────────────────────────┘
```

- **사이드바 (크림)**: 260px, 좌측 고정, 배경 #F5F0E8
- **메인 (차콜)**: flex 1, 배경 #1A1815
- **상단 센터 네비**: 로고 중앙, 네비 좌우 대칭 (··· MAISON ··· 형태)
- **점 3개(···) 디바이더**: 섹션 간 구분 (심메트릭 톤)
- **L-shape 골드 코너**: 카드 좌상단·우하단에 골드 L자 장식 (5px × 5px)

### 사이드바
- 크림 배경, 차콜 텍스트
- 메뉴 아이템 높이 48px, 패딩 16px 24px
- 활성: 좌측 2px 골드 bar + 텍스트 골드
- 로고 영역: 상단 80px, Playfair Display "M·F" (이니셜 세리프)

---

## 간격 스케일

| 토큰 | 값 |
|------|-----|
| `--lx-space-1` | 4px |
| `--lx-space-2` | 8px |
| `--lx-space-3` | 16px |
| `--lx-space-4` | 24px |
| `--lx-space-5` | 32px |
| `--lx-space-6` | 48px |
| `--lx-space-7` | 64px |
| `--lx-space-8` | 96px |

---

## Border Radius — 거의 0 또는 4px만

| 요소 | 값 | 의도 |
|------|-----|------|
| 카드 | 0 또는 4px | 샤프한 클래식 |
| 뱃지 | 0 | 편지 봉인 스타일 |
| 버튼 | 2px | 미묘한 완화 |
| 인풋 | 2px | |
| 아바타 | 50% 원형 |

> 럭셔리 브랜드는 샤프함에서 격이 나옴 — 과도한 radius 금지

---

## 골드 장식 체계

### L-shape 골드 코너
```css
.lx-card {
  position: relative;
}
.lx-card::before, .lx-card::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #C9A961;
}
.lx-card::before {
  top: -1px; left: -1px;
  border-right: none;
  border-bottom: none;
}
.lx-card::after {
  bottom: -1px; right: -1px;
  border-left: none;
  border-top: none;
}
```

### 점 3개 디바이더 (···)
```html
<div class="lx-divider">···</div>
```
```css
.lx-divider {
  color: #C9A961;
  letter-spacing: 0.5em;
  text-align: center;
  padding: 32px 0;
  font-size: 18px;
}
```

### 골드 라인 (섹션 구분)
`border-top: 1px solid #C9A961` — 아주 얇게, 절제된 사용

---

## 컴포넌트 스펙

### KPI 카드
- 배경 #242017 (차콜 surface)
- 패딩 32px, radius 4px
- L-shape 골드 코너 장식 (시그니처)
- 값: 36px Playfair Display 400 italic (세리프 이탤릭 숫자 — 핵심 포인트)
- 라벨: 11px Montserrat 500 uppercase letter-spacing 0.15em, gold primary
- 트렌드: small caps 스타일 (↑ +2.4%)
- 호버: 배경 elevated + 골드 코너 두께 1px → 1.5px

### Primary CTA 버튼
```css
padding: 12px 36px;
background: transparent;
color: #C9A961;
border: 1px solid #C9A961;
border-radius: 2px;
font-family: Montserrat;
font-weight: 500;
font-size: 12px;
text-transform: uppercase;
letter-spacing: 0.2em;
```
- 호버: 배경 #C9A961 + 텍스트 #1A1815 (골드 채움)

### Secondary 버튼 / Tertiary
- 밑줄 텍스트 스타일 (링크 같은 우아함): `text-decoration: underline; text-underline-offset: 4px`

### 데이터 테이블
- 헤더: 10px Montserrat 500 uppercase letter-spacing 0.2em, 골드 색
- 헤더 아래 골드 1px 라인
- 본문: 14px Montserrat, 행 높이 56px (넓게)
- 행 구분: `border-bottom: 1px solid rgba(201,169,97,0.1)` (아주 얇은 골드)
- 호버: 배경 #2E2A20 + 좌측 2px 골드 bar

### 차트 (Chart.js 4)
- 배경: 투명
- 축 라인: 1px solid #C9A961 (골드)
- 그리드: rgba(201,169,97,0.06)
- 라인 차트: 2px stroke, 골드 또는 버건디
- 영역 채우기: 골드 그라디언트 매우 연함 (rgba(201,169,97,0.08))
- 포인트: 5px, 골드 + 차콜 테두리

### 인풋
- 배경 투명, 하단 1px 골드 라인 (플로팅 라벨 스타일)
- 포커스: 라인 1px → 1.5px + 골드 saturated

### 뱃지 / 칩
- 패딩 4px 12px, 1px 골드 border, radius 0
- 배경 투명, 텍스트 골드

---

## 반응형

| 디바이스 | 레이아웃 | 사이드바 |
|---------|---------|---------|
| 데스크톱 1280px+ | 이중 배경 전체 | 크림 사이드바 260px |
| 태블릿 768~1279px | 이중 배경 유지 | 크림 사이드바 72px |
| 모바일 ~767px | 단일 차콜 배경 | 상단 크림 드로어 |

---

## 액센트 프리셋 4벌

| 프리셋 | 메인 | 서브 | 보조 |
|--------|------|------|------|
| **Antique Gold** (기본) | #C9A961 | #6B2032 | #5A8A5E |
| Rose Gold | #CFA793 | #8B5A4A | #5A748A |
| Platinum | #A4A5A3 | #6B6A68 | #5A8A5E |
| Burgundy Velvet | #6B2032 | #C9A961 | #3A3A3A |

---

## 인터랙션 원칙

- **우아한 fade** — 0.3s ease, 절제된 트랜지션
- **golden shimmer** — 특수 호버에만 golden gradient 흐름 (CTA 등)
- **letter-spacing 확대** — 호버 시 라벨 letter-spacing 0.15em → 0.2em (책등 글자 느낌)
- **애니메이션 금지**: 바운시·스케일 금지 (절제)

---

## 파일 구조

```
templates/lx_v1/
├── index.html          # Overview (Wealth Summary)
├── portfolio.html      # 포트폴리오
├── transactions.html   # 거래 내역
├── reports.html        # 리포트
├── settings.html
├── css/
│   ├── lx-tokens.css
│   └── lx-theme.css
├── js/
│   ├── lx-theme.js
│   └── data.js
└── README.md
```

---

## 시그니처 차별화 포인트

1. **이중 배경 (크림 사이드바 + 딥 차콜 콘텐츠)** — 고유 레이아웃, 어떤 테마에도 없는 극적 대비
2. **Playfair + Cormorant + Montserrat 3종 혼용** — 디스플레이 세리프·이탤릭 세리프·본문 산세리프
3. **앤틱 골드 + L-shape 코너** — 편지 봉인 같은 고전적 장식, 카드마다 시그니처
4. **··· 점 3개 디바이더** — 타 대시보드엔 없는 우아한 섹션 구분자
5. **유럽 럭셔리 브랜드 톤** — 프라이빗 뱅킹·와인·주얼리 브랜드 감성으로 finance UI 차별화
6. **radius 거의 0** — 샤프한 클래식, 럭셔리의 본질
