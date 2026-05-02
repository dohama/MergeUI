# 로고 교체 준비 (캡틴 신규 로고 받으면 즉시 적용)

> 작성: A(메인) | 2026-05-02 (D-4)
> 목적: 캡틴이 제작 중인 신규 로고를 받으면 30분 내 사이트 전체 일괄 교체
> 현재 로고: data URI SVG 'O' 마크 (브랜드색 #6C5CE7) — 임시 placeholder

---

## 1. 현재 로고 사용 위치 (실제 grep 결과 검증 완료)

### 1.1 Favicon (data URI SVG) — 39 페이지

```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%236C5CE7'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-weight='900' font-family='sans-serif'>O</text></svg>">
```

**위치 검색 패턴**: `fill='%236C5CE7'`
**적용 페이지**: 모든 사용자 노출 페이지 39개 (auth 5 + checkout 2 + legal 3 + public 9 + subscriber 5 + admin 9 + themes 3 + landing 1 + others 2)

### 1.2 nav-logo .mark — 19 페이지

```html
<a href="..." class="nav-logo"><span class="mark">O</span> MergeUi</a>
```

**위치 검색 패턴**: `class="nav-logo"` 안의 `<span class="mark">O</span>`
**적용 페이지** (19개):
- `landing/index.html`
- `pages/public/{about,changelog,components,components-detail,contact,docs,maintenance,pricing,404,500}.html` (10)
- `pages/checkout/{success,cancel}.html` (2)
- `pages/legal/{privacy,terms,refund}.html` (3)
- `pages/themes/{detail,download,index}.html` (3)

### 1.3 sb-logo (sidebar) — 15 페이지

```html
<a href="..." class="sb-logo"><span class="mark">A</span><span>MergeUi Admin</span></a>
```

**위치 검색 패턴**: `class="sb-logo"`
**적용 페이지** (15개):
- `pages/admin/{analytics,components,dashboard,inquiries,orders,releases,settings,subscribers,themes}.html` (9)
- `pages/subscriber/{billing,dashboard,downloads,library,settings}.html` (5)
- `landing/index.html` (1, mock dashboard 내부 추정)

### 1.4 logo-mark (auth 페이지) — 6 페이지

```html
<span class="logo-mark">O</span>
<span class="logo-text">MergeUi</span>
```

**위치 검색 패턴**: `class="logo-mark"`
**적용 페이지**:
- `pages/auth/{login,signup,forgot-password,reset-password,verify-email}.html` (5)
- `pages/public/og-image.html` (1, OG 이미지 렌더링용)

### 1.5 og:image 메타 — 3 페이지

```html
<meta property="og:image" content="https://mergeui.com/landing/assets/og-image.png">
<meta property="twitter:image" content="https://mergeui.com/landing/assets/og-image.png">
```

**위치 검색 패턴**: `og:image`
**적용 페이지**: `landing/index.html`, `pages/public/about.html`, `pages/public/pricing.html`

---

## 2. 캡틴이 신규 로고 제공 시 받을 형식

| 형식 | 용도 | 권장 사양 |
|------|------|----------|
| **SVG 정사각** | favicon (32×32 / 192×192) | viewBox 32×32, transparent 배경 또는 통합 박스 |
| **SVG 와이드** | nav-logo / auth logo | 마크 + "MergeUi" 텍스트 한 묶음 또는 마크만 분리 가능 |
| **PNG 1200×630** | og:image | 소셜 공유 카드 (Twitter/Facebook/LinkedIn) |
| **PNG 32/180** (선택) | apple-touch-icon, manifest 아이콘 | Retina 대응 |

**저장 위치**: `landing/assets/logo/` 디렉토리 신규 생성 권장
- `logo.svg` (마크 정사각)
- `logo-wide.svg` (마크 + 텍스트)
- `og-image.png` (1200×630, 기존 교체)

---

## 3. 메인이 받으면 즉시 진행할 절차 (예상 30분)

### Step 1: 파일 저장 (2분)
```bash
mkdir -p landing/assets/logo
mv ~/Downloads/logo.svg landing/assets/logo/logo.svg
mv ~/Downloads/logo-wide.svg landing/assets/logo/logo-wide.svg
mv ~/Downloads/og-image.png landing/assets/og-image.png  # 기존 교체
```

### Step 2: Favicon 일괄 치환 (5분, sed 한 줄)
```bash
# 39 페이지 favicon (data URI SVG) → 신규 로고 path
find pages landing -name "*.html" -exec sed -i \
  's|<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg.*</svg>">|<link rel="icon" type="image/svg+xml" href="/landing/assets/logo/logo.svg?v=2">|g' {} \;
```

### Step 3: nav-logo `.mark` 교체 (10분, sed 또는 일괄 Edit)
- 옵션 A: `<span class="mark">O</span>` → `<img src="/landing/assets/logo/logo.svg" alt="MergeUi" width="32" height="32" class="mark">`
- 옵션 B: SVG 인라인 (성능 좋지만 19 페이지 모두 동일 SVG 박힘)
- 옵션 C: 와이드 로고 사용 시 `<span class="mark">O</span> MergeUi` → `<img src="/landing/assets/logo/logo-wide.svg" alt="MergeUi" height="32">`

### Step 4: sb-logo 교체 (5분)
- 동일 패턴으로 15 페이지 sidebar logo 교체

### Step 5: auth logo-mark 교체 (3분)
- 5 auth 페이지 + og-image.html

### Step 6: og:image 교체 (1분)
- 3 페이지 og:image / twitter:image meta는 path 변경 없으면 그대로 (PNG 파일 자체만 교체)
- 캐시 버스팅: `?v=2` 쿼리 추가

### Step 7: 검증 (4분)
- 브라우저로 랜딩 / 1 admin / 1 subscriber / 1 auth / 1 public 페이지 5개 열어서 favicon + nav/sidebar 로고 정상 표시 확인
- DevTools Network 탭에서 logo.svg 200 OK
- og:image https://www.opengraph.xyz/ 또는 https://metatags.io/ 검증

---

## 4. 위험·완화

| 리스크 | 완화 |
|--------|------|
| 캐시 미반영 (사용자 브라우저에 옛 로고) | 파일명 `?v=2` 쿼리 추가, Vercel 배포 후 1주 |
| sed 한국어 경로 문제 | 절대 경로 + 따옴표 escape |
| 로고 SVG 색이 다크/라이트 모드 둘 다 안 어울림 | `currentColor` 사용 권장 (로고 단색일 때) |
| nav 와이드 로고가 모바일에서 너무 큼 | CSS `max-width: 120px; height: auto;` 적용 |
| auth 페이지 좌측 비주얼이 로고 색과 충돌 | 캡틴 로고 받은 후 디자인 리뉴얼 단계에서 함께 조정 |

---

## 5. 신규 로고 적용 후 후속 작업

- 신규 로고 색이 현행 `#6C5CE7` 브랜드와 다르면 → `src/styles/tokens.css`의 `--merge-brand` 검토
- 로고가 깊은 컬러 그라디언트/일러스트면 → favicon 단순화 버전 별도 필요
- og:image PNG 시각이 새 로고와 맞지 않으면 → B(디자인) 디스패치해서 새 og:image 제작

---

## 6. 캡틴 액션 (지금~로고 제작 완료까지)

- [ ] 로고 디자인 시안 메인에게 공유 (방향 / 컬러 / 타입 셋)
- [ ] 최종 SVG + PNG 파일 전달 (위 §2 형식)
- [ ] 메인이 §3 절차 시작 → 30분 내 사이트 전체 적용 → 검증 후 푸시
