# MergeUi 런칭 전 검수 통합 리포트

- 검수일: 2026-04-16
- 검수 참여: 에이전트 A(PM), B(디자인), C(프론트), D(백엔드), E(QA), F(그로스)
- 대상: 전체 40개 HTML 페이지 + 공통 JS/CSS + 서버 코드

---

## 1. 이번 검수에서 수정 완료한 항목 (12건)

| # | 심각도 | 항목 | 수정 내용 | 담당 |
|---|--------|------|-----------|------|
| 1 | Critical | access_token localStorage 노출 | supabase-client.js에서 access_token 필드 제거 | C |
| 2 | Critical | 보호 페이지 8초 무방비 대기 | 즉시 세션 확인 + OAuth 콜백 시 3초로 단축 | C |
| 3 | Critical | 로그아웃 시 Supabase 세션 미정리 | auth.js의 logout에 MergeDB.logout() 연동 | C |
| 4 | Critical | 관리자 페이지 클라이언트 role만 검증 | auth.js에 MergeDB.getProfile() 서버 재검증 추가 | C+D |
| 5 | Major | 푸터 소셜 링크 href="#" (17개 파일) | Twitter/GitHub/Discord 링크 HTML 제거 | C |
| 6 | Major | 로그아웃 후 항상 login.html로 이동 | 공개 페이지에서는 현재 페이지 유지하도록 분기 | C |
| 7 | Major | innerHTML XSS 취약점 (3개 파일) | escapeHtml() 함수 적용 (changelog, detail, components) | C |
| 8 | Major | 브랜드 색상 #6366F1 불일치 (39개 파일) | #6C5CE7로 전체 통일 (favicon SVG, 인라인 rgba 포함) | B |
| 9 | Major | 미사용 CSS 변수 3개 | --merge-glow-accent, --merge-radius-xl, --merge-space-9 제거 | B |
| 10 | Major | Helmet CSP 비활성화 | CSP 정책 활성화 (Supabase, CDN, Fonts 허용) | D |
| 11 | Major | tokens.css 브랜드 파생색 불일치 | brand-light, brand-dark, glow-brand 모두 #6C5CE7 기준으로 재조정 | B |
| 12 | Major | sidebar.css 하드코딩 색상 | rgba(99,102,241,...) → rgba(108,92,231,...) 교체 | B |

---

## 2. 잔여 이슈 — Critical (서비스 불가 수준, 런칭 전 필수)

| # | 페이지 | 이슈 | 담당 |
|---|--------|------|------|
| C-1 | admin 9개 전체 | 로그아웃 버튼 없음 — 관리자가 로그아웃 불가 | C |
| C-2 | admin 9개 전체 | 사이드바에 사용자 정보(이름/role) 표시 없음 | C |
| C-3 | subscriber/settings.html | 사이드바 네비게이션 누락 — 다른 페이지 이동 불가 | C |
| C-4 | subscriber/billing.html | 사이드바 네비게이션 누락 — 다른 페이지 이동 불가 | C |
| C-5 | 8개 공개 페이지 | OG 태그 전체 누락 (pricing, themes/index, components, docs 등) | F+C |
| C-6 | 10개 공개 페이지 | meta description 누락 (components, docs, 404, 500, maintenance, preview, download, components-detail, terms, privacy) | F+C |
| C-7 | 8개 공개 페이지 | canonical URL 누락 (landing만 존재) — SEO 중복 페널티 위험 | F+C |
| C-8 | themes/download.html | 다운로드 버튼/체크박스 JS 핸들러 완전 누락 — 결제 후 다운로드 불가 | C |

---

## 3. 잔여 이슈 — Major (런칭 전 강력 권장)

### 보호 페이지 (subscriber + admin)

| # | 페이지 | 이슈 |
|---|--------|------|
| M-1 | subscriber 5개 | 하드코딩 "John Doe", "JD", "Pro Plan" — 로딩 시 깜빡임(FOUC) |
| M-2 | subscriber/dashboard.html | Quick Access 카드 4개 클릭 불가 (onclick/href 없음) |
| M-3 | subscriber/dashboard.html | plan-banner에 "Next billing: May 11, 2026" 하드코딩 |
| M-4 | subscriber/library.html | active 클래스 누락, 빈 상태 UI 중복 표시 |
| M-5 | subscriber/library.html, downloads.html | HTML `<main>` 태그 중첩 (표준 위반) |
| M-6 | subscriber/settings.html | 비밀번호 변경이 서버 연동 없이 가짜 성공 메시지만 표시 |
| M-7 | subscriber/billing.html | Cancel/Change Plan 버튼 핸들러 없음 |
| M-8 | admin 9개 | Supabase 데이터를 console.log만 하고 UI에 미렌더링 — 테이블/카드 항상 빈 상태 |
| M-9 | admin/themes.html, components.html | CRUD 버튼(추가/수정/삭제) 핸들러 전부 없음 |
| M-10 | admin/settings.html | 설정 저장이 서버 연동 없이 가짜 성공 메시지만 |
| M-11 | admin/releases.html | CSS에 한글 클래스명(.명 알림-badge) — 파싱 오류 가능 |

### 공개 페이지 기능

| # | 페이지 | 이슈 |
|---|--------|------|
| M-12 | components-detail.html | 코드 탭(HTML/CSS) 전환 JS 없음 + Copy 버튼 미동작 + DB 셀렉터 불일치 |
| M-13 | reset-password.html | 실제 비밀번호 변경 API(Supabase) 미호출 — 가짜 성공 메시지만 |
| M-14 | checkout/success.html | 라이선스 키/플랜/금액 전부 하드코딩 (MERGE-PRO-A7F2-X9K4, $19.00) |
| M-15 | download.html | 테마 정보 하드코딩, URL 파라미터 처리 JS 없음 |
| M-16 | pricing.html | Team "Contact Us" CTA가 signup으로 연결 (contact.html이어야 함) |
| M-17 | contact.html | MergeDB 미로드 시 성공 메시지만 보여주고 실제 전송 안 됨 |
| M-18 | signup vs login | OAuth 처리 방식 불일치 (login=직접 URL, signup=MergeDB 호출) |

### SEO/마케팅

| # | 페이지 | 이슈 |
|---|--------|------|
| M-19 | pricing, themes/index, detail 등 | CTA에 data-track 이벤트 태깅 없음 — 전환 측정 불가 |
| M-20 | landing hero CTA | data-track 없음 — 퍼널 시작점 측정 불가 |
| M-21 | components.html | title에 키워드 부족 ("Dashboard Components"로 보강 권장) |
| M-22 | landing og:image | og-image.png 파일이 프로젝트에 없음 — 소셜 공유 시 깨진 이미지 |

---

## 4. 잔여 이슈 — Minor

| # | 이슈 |
|---|------|
| m-1 | subscriber/downloads.html — 날짜 필터 select 핸들러 없음 |
| m-2 | subscriber/dashboard.html — `</div>`가 `</main>` 대신 사용 |
| m-3 | subscriber/billing.html — copyKey()에서 "--" 복사 가능 |
| m-4 | subscriber/billing.html — Download All, PDF 링크 핸들러 없음 |
| m-5 | subscriber/settings.html — Delete Account가 서버 미연동 |
| m-6 | admin/subscribers.html — Export CSV, View, 검색/필터 미구현 |
| m-7 | admin/orders.html — Export CSV, Refund 미구현 |
| m-8 | landing meta description 120자 초과 (SERP 잘림 가능) |
| m-9 | admin/dashboard.html — lang="ko" vs subscriber lang="en" 불일치 |

---

## 5. 캡틴 판단 필요 사항

1. **admin 페이지 데이터 렌더링 (M-8)**: 현재 Supabase에서 데이터를 가져오지만 console.log만 합니다. 런칭 전에 실제 UI에 표시해야 하는지, 아니면 관리자 기능은 런칭 후 구현인지?
2. **결제 미연동 상태 (Lemonsqueezy)**: pricing 페이지의 결제 버튼이 실제로 동작하지 않습니다. waitlist 방식으로 전환할지, 런칭 전 연동할지?
3. **subscriber 페이지 가짜 기능들 (M-6, M-7)**: 비밀번호 변경, 구독 취소 등이 서버 연동 없이 가짜 메시지만 표시합니다. 이 상태로 런칭하면 고객 클레임이 발생합니다.

---

## 6. 수정 우선순위 제안 (A-PM 판단)

### 즉시 수정 (1~2시간)
- C-1~C-4: admin 로그아웃 + 사이드바, subscriber 네비 복원
- C-5~C-7: OG 태그 + meta description + canonical URL 추가
- M-1: 하드코딩 "John Doe" 제거

### 런칭 전 수정 (반나절)
- M-2~M-7: subscriber 페이지 버튼/폼 연동
- M-8~M-10: admin 데이터 렌더링 (캡틴 결정에 따라)
- M-12~M-13: 이벤트 트래킹 태깅

### 런칭 후 개선
- m-1~m-9: Minor 이슈들
- admin CRUD 완성

---

## 7. 2차 수정 완료 항목 (2026-04-17)

| # | 항목 | 수정 내용 |
|---|------|-----------|
| 13 | 공개 페이지 Sign Out 버튼 없음 | auth.js updatePublicNav에 Sign Out 추가 |
| 14 | admin 9개 로그아웃 불가 (C-1) | 9개 파일 사이드바에 sb-footer + Sign Out 추가 |
| 15 | admin 9개 사용자 정보 없음 (C-2) | 9개 파일에 아바타/이름/role 표시 추가 |
| 16 | subscriber settings/billing 네비 누락 (C-3,4) | 사이드바 네비게이션 5개 링크 복원 |
| 17 | subscriber 5개 하드코딩 더미 (M-1) | "John Doe"→"User", "Pro"→"Free" 등 전부 제거 |
| 18 | subscriber library active 누락 (M-4) | active 클래스 추가 |
| 19 | subscriber library/downloads main 중첩 (M-5) | `<main>` 중첩 → `<div>` 변경 |
| 20 | admin 5개 DB 데이터 미렌더링 (M-8) | console.log → 실제 테이블/카드 렌더링 + 빈 상태 UI |
| 21 | components-detail 코드탭/Copy (M-12) | JS 핸들러 추가 + DB 셀렉터 불일치 수정 |
| 22 | reset-password API 미호출 (M-13) | Supabase updateUser 연동 |
| 23 | checkout/success 하드코딩 (M-14) | 플랜/금액/라이선스 키 DB 연동 + 기본값 "--" |
| 24 | download.html JS 누락 (C-8) | 체크박스/라디오/다운로드 버튼 + URL 파라미터 테마 로드 |
| 25 | pricing Team CTA 잘못된 링크 (M-16) | signup→contact.html 변경 |
| 26 | contact.html 가짜 성공 (M-17) | MergeDB 없으면 에러 메시지 표시 |
| 27 | SEO meta description 10개 (C-6) | 10개 공개 페이지에 추가 |
| 28 | SEO OG 태그 8개 (C-5) | 8개 페이지에 og:title/desc/type/url 추가 |
| 29 | SEO canonical URL 15개 (C-7) | 15개 공개 페이지에 추가 |
| 30 | components.html title 보강 (M-21) | "Dashboard Components — MergeUi" |

---

## 8. QA 최종 판정 (2차 수정 후)

**현재 상태: 조건부 배포 가능**

- Critical: 0건 (전부 해결)
- Major 잔여: 약 5건 (아래 참조)
- Minor 잔여: 약 9건

### 잔여 Major
| # | 이슈 | 비고 |
|---|------|------|
| M-6 | subscriber/settings 비밀번호 변경 서버 미연동 | 결제 연동과 함께 처리 권장 |
| M-7 | subscriber/billing Cancel/Change Plan 핸들러 | 결제 연동 시 함께 구현 |
| M-9 | admin themes/components CRUD 핸들러 | 테마 업로드 시 함께 구현 |
| M-10 | admin/settings 가짜 저장 | 서버 연동 시 함께 구현 |
| M-22 | landing og:image 파일 없음 | 스크린샷 준비 후 추가 |

→ 위 5건은 모두 **결제 연동/테마 업로드 작업과 함께** 해결될 항목입니다.

### 런칭 가능 조건
1. 공개 페이지: 모든 링크 정상, SEO 태그 완비, Sign Out 동작
2. 인증: 로그인/로그아웃/role 검증 정상
3. subscriber: 빈 상태 UI 표시, 네비게이션 완전
4. admin: 로그아웃 가능, DB 데이터 렌더링, 빈 상태 UI
5. 잔여 Major는 결제/테마 작업과 함께 해결 예정
