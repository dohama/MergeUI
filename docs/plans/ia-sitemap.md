# MergeUi 정보 구조 (IA) & 사이트맵

> A(PM) 작성 | 최종 업데이트 **2026-05-01 (D-5 메인 직접 검증)**
> 전체 서비스에 필요한 모든 페이지 정의
> Nav 통일: Home | Themes | Components | Pricing | Docs (모든 공개 페이지)
> 와이드 레이아웃: max-width 1600px
> 모바일: 햄버거 메뉴 전 페이지 적용
>
> **2026-05-01 변경**: `pages/public/about.html` 신규 추가 (4/29 F-2 처리), 그 외 39개 페이지는 4/14 사이트맵 그대로 유지·동작

---

## 사이트맵 전체 구조 (실제 파일 경로 매핑)

```
MergeUi/
│
├── 공개 페이지 (비로그인 접근 가능) — Nav: Home | Themes | Components | Pricing | Docs
│   ├── / .......................... landing/index.html .............. [완료]
│   ├── /themes ................... pages/themes/index.html ......... [완료]
│   ├── /themes/:slug ............. pages/themes/detail.html ........ [완료]
│   ├── /themes/:slug/preview ..... pages/themes/preview.html ....... [완료]
│   ├── /themes/:slug/download .... pages/themes/download.html ...... [완료]
│   ├── /components ............... pages/public/components.html ..... [완료]
│   ├── /components/:slug ......... pages/public/components-detail.html [완료]
│   ├── /pricing .................. pages/public/pricing.html ....... [완료]
│   ├── /changelog ................ pages/public/changelog.html ..... [완료]
│   ├── /docs ..................... pages/public/docs.html .......... [완료]
│   ├── /docs/:section ............ docs.html 앵커 링크로 대체 ...... [완료]
│   # /blog 제외 (캡틴 결정 2026-04-14)
│   ├── /contact .................. pages/public/contact.html ....... [완료]
│   ├── /404 ...................... pages/public/404.html ........... [완료]
│   ├── /500 ...................... pages/public/500.html ........... [완료]
│   ├── /maintenance .............. pages/public/maintenance.html ... [완료]
│   ├── /about .................... pages/public/about.html ......... [완료] (2026-05-01 추가)
│   ├── /terms .................... pages/legal/terms.html .......... [완료]
│   ├── /privacy .................. pages/legal/privacy.html ........ [완료]
│   └── /refund ................... pages/legal/refund.html ......... [완료]
│
├── 인증 페이지 — 레이아웃: 왼쪽 비주얼 + 오른쪽 폼 통일
│   ├── /login .................... pages/auth/login.html ........... [완료]
│   ├── /signup ................... pages/auth/signup.html .......... [완료]
│   ├── /forgot-password .......... pages/auth/forgot-password.html . [완료]
│   ├── /reset-password ........... pages/auth/reset-password.html .. [완료]
│   └── /verify-email ............. pages/auth/verify-email.html .... [완료]
│
├── 결제 페이지
│   ├── /checkout/success ......... pages/checkout/success.html ..... [완료]
│   └── /checkout/cancel .......... pages/checkout/cancel.html ...... [완료]
│
├── 구독자 페이지 (로그인 필수) — 사이드바 레이아웃
│   ├── /dashboard ................ pages/subscriber/dashboard.html .. [완료]
│   ├── /dashboard/library ........ pages/subscriber/library.html ... [완료] (테마+컴포넌트+찜 탭 통합)
│   ├── /dashboard/downloads ...... pages/subscriber/downloads.html . [완료]
│   ├── /account .................. pages/subscriber/settings.html .. [완료]
│   └── /account/billing .......... pages/subscriber/billing.html ... [완료] (라이선스 포함)
│
└── 관리자 페이지 (어드민 전용) — 사이드바: Dashboard | Subscribers | Orders | Themes | Components | Releases | Inquiries | Analytics | Settings
    ├── /admin .................... pages/admin/dashboard.html ...... [완료]
    ├── /admin/users .............. pages/admin/subscribers.html .... [완료]
    ├── /admin/orders ............. pages/admin/orders.html ......... [완료]
    ├── /admin/themes ............. pages/admin/themes.html ......... [완료]
    ├── /admin/components ......... pages/admin/components.html ..... [완료]
    ├── /admin/releases ........... pages/admin/releases.html ....... [완료]
    ├── /admin/inquiries .......... pages/admin/inquiries.html ...... [완료]
    ├── /admin/analytics .......... pages/admin/analytics.html ...... [완료]
    └── /admin/settings ........... pages/admin/settings.html ....... [완료]
```

---

## 레거시 파일 (통합 완료 — 삭제 가능)

| 파일 | 사유 |
|------|------|
| `pages/subscriber/themes.html` | library.html로 통합 |
| `pages/subscriber/components.html` | library.html로 통합 |
| `pages/subscriber/favorites.html` | library.html로 통합 |
| `pages/subscriber/license.html` | billing.html로 통합 |

---

## 전체 진행 현황 (2026-05-03 기준)

**총 41개 페이지 — 전체 완료 (blog 제외, 2026-05-01 about/refund 추가)**

| 카테고리 | 전체 | 완료 | 대기 | 비고 |
|---------|------|------|------|------|
| 공개 페이지 | 18 | 18 | 0 | blog 제외 (캡틴 결정), 2026-05-01 about 추가 |
| 인증 페이지 | 5 | 5 | 0 | 전체 완료 |
| 결제 페이지 | 2 | 2 | 0 | 전체 완료 |
| 구독자 페이지 | 5 | 5 | 0 | 전체 완료 (library로 통합) |
| 관리자 페이지 | 9 | 9 | 0 | 전체 완료 (orders, settings 신규 추가) |
| 법적 페이지 | 3 | 3 | 0 | terms / privacy / refund |

### 페이지별 상태

| 상태 | 페이지 | 파일 경로 |
|------|--------|----------|
| 완료 | `/` 랜딩페이지 | `landing/index.html` |
| 완료 | `/themes` 테마 갤러리 | `pages/themes/index.html` |
| 완료 | `/themes/:slug` 테마 상세 | `pages/themes/detail.html` |
| 완료 | `/themes/:slug/preview` 테마 라이브 데모 | `pages/themes/preview.html` |
| 완료 | `/themes/:slug/download` 테마 다운로드 | `pages/themes/download.html` |
| 완료 | `/components` 컴포넌트 라이브러리 | `pages/public/components.html` |
| 완료 | `/components/:slug` 컴포넌트 상세 | `pages/public/components-detail.html` |
| 완료 | `/pricing` 가격표 | `pages/public/pricing.html` |
| 완료 | `/changelog` 릴리즈 노트 | `pages/public/changelog.html` |
| 완료 | `/docs` 설치 가이드 | `pages/public/docs.html` |
| 완료 | `/docs/:section` 문서 상세 | `pages/public/docs.html` (앵커 링크) |
| 완료 | `/contact` 문의/지원 | `pages/public/contact.html` |
| 완료 | `/404` 에러 페이지 | `pages/public/404.html` |
| 완료 | `/500` 서버 에러 | `pages/public/500.html` |
| 완료 | `/maintenance` 점검 안내 | `pages/public/maintenance.html` |
| 완료 | `/terms` 이용약관 | `pages/legal/terms.html` |
| 완료 | `/privacy` 개인정보처리방침 | `pages/legal/privacy.html` |
| 완료 | `/login` 로그인 | `pages/auth/login.html` |
| 완료 | `/signup` 회원가입 | `pages/auth/signup.html` |
| 완료 | `/forgot-password` 비밀번호 찾기 | `pages/auth/forgot-password.html` |
| 완료 | `/reset-password` 비밀번호 재설정 | `pages/auth/reset-password.html` |
| 완료 | `/verify-email` 이메일 인증 | `pages/auth/verify-email.html` |
| 완료 | `/checkout/success` 결제 완료 | `pages/checkout/success.html` |
| 완료 | `/checkout/cancel` 결제 취소 | `pages/checkout/cancel.html` |
| 완료 | `/dashboard` 구독자 대시보드 | `pages/subscriber/dashboard.html` |
| 완료 | `/dashboard/library` 내 라이브러리 | `pages/subscriber/library.html` |
| 완료 | `/dashboard/downloads` 다운로드 이력 | `pages/subscriber/downloads.html` |
| 완료 | `/account` 계정 설정 | `pages/subscriber/settings.html` |
| 완료 | `/account/billing` 구독/결제 | `pages/subscriber/billing.html` |
| 완료 | `/admin` 관리자 대시보드 | `pages/admin/dashboard.html` |
| 완료 | `/admin/users` 구독자 관리 | `pages/admin/subscribers.html` |
| 완료 | `/admin/orders` 결제/주문 내역 | `pages/admin/orders.html` |
| 완료 | `/admin/themes` 테마 관리 | `pages/admin/themes.html` |
| 완료 | `/admin/components` 컴포넌트 관리 | `pages/admin/components.html` |
| 완료 | `/admin/releases` 릴리즈 노트 관리 | `pages/admin/releases.html` |
| 완료 | `/admin/inquiries` 문의 관리 | `pages/admin/inquiries.html` |
| 완료 | `/admin/analytics` 정성 분석 | `pages/admin/analytics.html` |
| 완료 | `/admin/settings` 사이트 설정 | `pages/admin/settings.html` |

---

## 변경 이력

### 2026-05-03 업데이트
- admin 9 페이지 한국어 통일 완료 (캡틴 결정, `feedback_admin_korean.md`)
- admin은 한국어, 그 외 페이지는 영어 — 언어 분리 정책 확정
- D-01 BM-3 column REVOKE 완료 (캡틴 Supabase SQL Editor 실행) → 컴포넌트 코드 컬럼 직접 접근 차단
- D-02 BD-1 download.js 치명결함 수정 (Pro 사용자 다운로드 정상화)
- og-image 헤드라인 품질 개선 (폰트 60px·3줄 레이아웃) 후 PNG 재export

### 2026-05-02 업데이트
- F SEO 30건 적용에 따른 페이지 상태 동기화 (admin 9 + subscriber 5에 noindex,nofollow + description 추가)
- pricing/themes-detail/about/landing JSON-LD 적용
- sitemap.xml 5/2 전체 갱신 (28 URL lastmod), robots.txt Allow /about 추가
- legal/refund 페이지 정상 운영 확인
- 합동 검증 결과 41/41 페이지 GO 판정 (`docs/qa-reports/cross-check-2026-05-02-summary.md`)
- 거짓 광고 통일 (50+ → 20+) 4 파일 (landing/pricing/about/json-ld-snippets)
- checkout/success + auth verify-email + reset-password noindex,nofollow 추가

### 2026-05-01 업데이트
- pages/public/about.html 신규 추가 (4/29 F-2 처리)
- pages/legal/refund.html 신규 추가
- 전체 41개 페이지로 증가
- Blocks 24종 templates/blocks/ 신규 디렉토리

### 2026-04-14 업데이트
- 관리자 페이지 7개 구현 완료 (themes, components, releases, inquiries, analytics + orders, settings 신규)
- 관리자 사이드바 통일: Orders, Settings 추가
- 인증 페이지 2개 완료 확인 (reset-password, verify-email)
- 결제 페이지 2개 완료 확인 (success, cancel)
- 구독자 페이지 4개 완료 확인 (library, downloads, settings, billing)
- 레거시 파일 4개 식별 (통합 완료된 구 subscriber 페이지)
- 전체 39/40 완료 (blog만 Phase 5 대기)

### 2026-04-12 캡틴 승인
- 9개 페이지 추가 (checkout/*, preview, download, verify-email, contact, 500, maintenance, docs/:section)
- 3건 통합 (library, billing에 license 통합)
- blog Phase 5로 이동

---

## 페이지별 상세 정의

### 1. 공개 페이지

#### `/` — 랜딩페이지 (메인)
- **상태**: 완료 (landing/index.html)
- **목적**: 방문자 → 가입/구독 전환
- **담당**: F(기획), B(디자인), C(프론트)

#### `/themes` — 테마 갤러리
- **상태**: 완료
- **목적**: 전체 대시보드 테마 탐색
- **주요 요소**: 카테고리/스타일 필터, 그리드/리스트 뷰, Free/Pro 표시

#### `/themes/:slug` — 테마 상세 뷰
- **상태**: 완료
- **목적**: 개별 테마 상세 확인 + 구매/다운로드 유도

#### `/themes/:slug/preview` — 테마 라이브 데모
- **상태**: 완료
- **목적**: 풀스크린 라이브 데모로 구매 전환 유도

#### `/themes/:slug/download` — 테마 다운로드
- **상태**: 완료
- **목적**: 라이선스 확인 후 패키지 다운로드

#### `/components` — 컴포넌트 라이브러리
- **상태**: 완료
- **목적**: 개별 컴포넌트 탐색 및 코드 복사

#### `/components/:slug` — 컴포넌트 상세
- **상태**: 완료
- **목적**: 개별 컴포넌트 상세 + 사용법

#### `/pricing` — 가격표 페이지
- **상태**: 완료
- **목적**: 플랜 비교 + 구매 전환

#### `/changelog` — 릴리즈 노트
- **상태**: 완료
- **목적**: 업데이트 투명성 + 구독 가치 증명

#### `/docs` — 문서
- **상태**: 완료
- **목적**: 설치/사용법 안내

#### `/contact` — 문의/지원
- **상태**: 완료
- **목적**: FAQ + 이메일 문의 폼

#### `/404`, `/500`, `/maintenance` — 에러/점검 페이지
- **상태**: 완료

#### `/terms`, `/privacy` — 법적 페이지
- **상태**: 완료

### 2. 인증 페이지

- `/login` — 완료 (Google/GitHub OAuth + 이메일)
- `/signup` — 완료 (소셜 가입 + 이메일 가입)
- `/forgot-password` — 완료 (이메일 입력 → 재설정 링크)
- `/reset-password` — 완료 (토큰 기반 비밀번호 변경 폼)
- `/verify-email` — 완료 (성공/만료/에러 3상태)

### 3. 결제 페이지

- `/checkout/success` — 완료 (주문 카드 + 라이선스 키 + 대시보드 링크)
- `/checkout/cancel` — 완료 (실패 사유 안내 + 재시도 CTA)

### 4. 구독자 페이지

- `/dashboard` — 완료 (플랜 상태, 최근 다운로드, 새 테마 알림)
- `/dashboard/library` — 완료 (테마/컴포넌트/찜 3탭 통합)
- `/dashboard/downloads` — 완료 (통계 + 검색/필터 + 다운로드 테이블)
- `/account` — 완료 (프로필/비밀번호/소셜 연결/계정 삭제)
- `/account/billing` — 완료 (플랜 + 라이선스 + 결제 수단 + 청구 내역)

### 5. 관리자 페이지

- `/admin` — 완료 (MRR/구독자/이탈률/매출 KPI + 매출 차트 + 활동 로그 + 플랜 분포 + Top 테마)
- `/admin/users` — 완료 (구독자 테이블 + 검색/필터/정렬 + 페이지네이션)
- `/admin/orders` — 완료 (주문/결제 내역 + 매출 통계 + 환불 처리)
- `/admin/themes` — 완료 (테마 CRUD + 상태/접근 관리 + 다운로드 수)
- `/admin/components` — 완료 (컴포넌트 CRUD + 카테고리/태그 + 사용 테마 수)
- `/admin/releases` — 완료 (릴리즈 노트 카드형 + 변경사항 태그 + 알림 발송)
- `/admin/inquiries` — 완료 (문의 목록 + 우선순위 + 상태 관리)
- `/admin/analytics` — 완료 (퍼널 분석 + Top 페이지 + 세션 리플레이 + 피드백 위젯)
- `/admin/settings` — 완료 (일반/결제/이메일/SEO/알림 설정)

---

## 작업 우선순위 (완료 기준 — 2026-04-14)

| 순서 | 페이지 | 상태 |
|------|--------|------|
| 1 | 랜딩페이지 `/` | 완료 |
| 2 | 로그인/회원가입 | 완료 |
| 3 | 테마 갤러리/상세 | 완료 |
| 4 | 가격표 `/pricing` | 완료 |
| 5 | 컴포넌트 라이브러리 | 완료 |
| 6 | 설치 가이드 `/docs` | 완료 |
| 7 | 구독자 대시보드 | 완료 |
| 8 | 결제 시스템 `/checkout/*` | 완료 |
| 9 | 테마 라이브 데모/다운로드 | 완료 |
| 10 | 구독자 라이브러리/다운로드 | 완료 |
| 11 | 계정/결제 관리 | 완료 |
| 12 | 관리자 페이지 전체 | 완료 |
| — | 블로그 | 제외 (캡틴 결정) |
