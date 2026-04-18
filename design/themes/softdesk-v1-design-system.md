# SoftDesk v1 — Design System

> 뉴모피즘 SaaS 대시보드 테마
> 최종 수정: 2026-04-18

---

## 컨셉

- **스타일**: Neumorphism (소프트 그림자, 돌출/함몰 효과)
- **분위기**: 따뜻하고 부드러운 크림톤 + 시안 액센트
- **핵심 가치**: 5분 내 적용 가능, 데이터 분리 구조, CSS 변수 원파일 커스터마이징

---

## 컬러 팔레트

### 배경 (라이트 고정 — 다크모드 없음)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--sd-bg-base` | `#DFE4EA` | 페이지 배경 |
| `--sd-bg-surface` | `#DFE4EA` | 카드/사이드바 (배경과 동일 = 뉴모피즘 특성) |
| `--sd-bg-elevated` | `#D5DAE0` | 호버/활성 배경 |

### 텍스트

| 토큰 | HEX | 용도 | 배경 대비 |
|------|-----|------|----------|
| `--sd-text-primary` | `#2D3436` | 주요 텍스트 | 10:1+ |
| `--sd-text-secondary` | `#636E72` | 보조 텍스트, LNB 메뉴 | 5.5:1 |
| `--sd-text-muted` | `#A0AEC0` | 비활성, 라벨 | 3:1 (보조용) |

### 브랜드 컬러 (캡틴 지정)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--sd-primary` (메인) | `#1ACEFF` | 주 액센트 — 버튼, 활성 상태, KPI 아이콘, 차트 |
| `--sd-sub` (서브) | `#44EEEF` | 그라디언트 전용 — 밝아서 본문 자제 |
| `--sd-third` (서드) | `#6C5CE7` | 밸런스 — 보조 차트, 프로젝트 진행바, KPI |

### 상태 컬러

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--sd-success` | `#00B894` | 성공, 완료, 상승 |
| `--sd-warning` | `#FDCB6E` | 경고, 보류 |
| `--sd-error` | `#FF6B6B` | 에러, 지연, 하락 |
| `--sd-info` | `#74B9FF` | 정보 |

### 차트 팔레트 (8색)

```
#1ACEFF → #6C5CE7 → #FF6B6B → #00B894 → #FDCB6E → #74B9FF → #A29BFE → #FD79A8
```

---

## 타이포그래피

- **메인 폰트**: Plus Jakarta Sans (Google Fonts, OFL 라이선스)
- **코드/숫자**: Plus Jakarta Sans (통일)

| 요소 | 크기 | 굵기 | 행간 |
|------|------|------|------|
| H1 (페이지 타이틀) | 20px | 800 | 28px |
| Card Title | 16px | 700 | 24px |
| Body | 14~15px | 500 | 22px |
| Caption/Label | 12px | 600 | 16px |
| Small/Meta | 11px | 500 | 14px |
| KPI Value | 28px | 700 | 36px |

---

## 뉴모피즘 그림자 체계

### Raised (돌출 — 카드, 버튼)
```css
box-shadow: 6px 6px 14px rgba(166,180,200,0.5), -6px -6px 14px rgba(255,255,255,0.8);
```

### Inset (함몰 — 인풋, 활성 메뉴)
```css
box-shadow: inset 4px 4px 8px rgba(166,180,200,0.45), inset -4px -4px 8px rgba(255,255,255,0.75);
```

### Pressed (깊은 눌림 — 버튼 active)
```css
box-shadow: inset 3px 3px 7px rgba(166,180,200,0.5), inset -3px -3px 7px rgba(255,255,255,0.5);
```

### Small Raised (작은 요소)
```css
box-shadow: 3px 3px 8px rgba(166,180,200,0.45), -3px -3px 8px rgba(255,255,255,0.7);
```

---

## 간격 스케일 (8px 그리드)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--sd-space-1` | 4px | 최소 간격 |
| `--sd-space-2` | 8px | 아이콘-텍스트 |
| `--sd-space-3` | 12px | 폼 요소 간, LNB 항목 패딩 |
| `--sd-space-4` | 16px | 카드 내부 |
| `--sd-space-5` | 24px | 카드 패딩, 카드 간 |
| `--sd-space-6` | 32px | 콘텐츠 패딩 |
| `--sd-space-7` | 48px | 페이지 섹션 간 |
| `--sd-space-8` | 64px | 대형 섹션 간 |

---

## Border Radius

| 요소 | 값 |
|------|-----|
| Small (뱃지, 작은 버튼) | 10px |
| Medium (버튼, 인풋, LNB 항목) | 14px |
| Large (카드, KPI) | 20px |
| XL (대형 요소) | 28px |
| Full (아바타) | 50% |

---

## 컴포넌트 스펙

### KPI 카드
- 패딩: 24px
- 아이콘 컨테이너: 48x48px, radius 14px, shadow raised
- 아이콘: 22x22px SVG
- 값: 28px Bold
- 라벨: 14px text-muted
- 트렌드: 13px success/error

### 데이터 테이블
- 헤더: 12px 600 uppercase, text-muted
- 본문: 13px, 높이 56px
- 행 그림자: sm-raised (행 간 분리)
- 호버: translateY(-1px) + raised-hover
- 아바타: 32px circle, sm-raised

### 차트
- Chart.js 4 CDN
- 배경: 투명 (뉴모피즘 카드 위)
- 그리드: rgba(166,180,200,0.15)
- 포인트: 4px, 배경 #DFE4EA (배경색과 동일)

### 사이드바
- 너비: 240px (태블릿 64px)
- 메뉴 항목: 15px, 패딩 12px 16px
- 아이콘: 22px, opacity 0.7
- 활성: shadow inset + primary 색상

---

## 반응형

| 디바이스 | 너비 | 사이드바 | KPI 그리드 |
|---------|------|---------|-----------|
| 데스크톱 | 1280px+ | 240px 고정 | 4열 |
| 태블릿 | 768~1279px | 64px 아이콘만 | 2열 |
| 모바일 | ~767px | 숨김 → 하단 네비 | 1열 |

---

## 유틸리티 클래스

| 클래스 | 효과 |
|--------|------|
| `.neu-raised` | 돌출 카드 |
| `.neu-inset` | 함몰 |
| `.neu-pressed` | 깊은 눌림 |
| `.neu-flat` | 그림자 없음 |
| `.neu-sm-raised` | 작은 돌출 |
| `.neu-sm-inset` | 작은 함몰 |

---

## 액센트 프리셋

| 프리셋 | 메인 | 서브 | 서드 |
|--------|------|------|------|
| **Cyan** (기본) | #1ACEFF | #44EEEF | #6C5CE7 |
| Indigo | #6366F1 | #818CF8 | #1ACEFF |
| Emerald | #10B981 | #34D399 | #1ACEFF |
