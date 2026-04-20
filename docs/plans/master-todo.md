# MergeUi 런칭 마스터 TODO

> **단일 출처 (Single Source of Truth)**
> 보안 / 법적 / 기능 / 마케팅 — 모든 미처리 항목의 통합 관리 파일입니다.
>
> - 최초 작성일: 2026-04-19
> - 작성자: A(PM) 주도 · F(그로스) · D(백엔드) · E(QA) 합동 취합
> - 대상: MergeUi 런칭 및 수익화

---

## 📌 관리 규칙

1. **이 파일이 유일한 TODO 출처** — 다른 MD 파일의 TODO는 여기로 수렴. 중복 기록 금지
2. 작업 완료 시 `[ ]` → `[x]` + 완료 날짜(`2026-MM-DD`) 기록
3. 새 이슈 발견 시 여기에 추가하고 **심각도 분류 필수** (Critical / Major / Minor)
4. 다른 MD 파일(production-roadmap, launch-readiness-report 등)에서 이슈 발견 시 **이 파일로 이전 후 원본에는 "master-todo.md로 이전" 메모**
5. 매주 월요일 A(PM)가 진행 상황 캡틴에게 보고
6. 심각도 정의
   - **🔴 Critical**: 런칭 차단 또는 법적/보안 즉시 위험
   - **🟡 Major**: 런칭 전 강력 권장, 미처리 시 수익·신뢰 하락
   - **🟢 Minor**: 런칭 후 개선 가능

---

## 🎯 현재 상태 요약 (2026-04-21)

| 카테고리 | 🔴 Critical | 🟡 Major | 🟢 Minor | 합계 |
|---------|------------|---------|---------|------|
| 보안 (S) | 0 (+⚠️1) | 5 | 0 | 6 |
| 법적/컴플라이언스 (L) | 4 | 4 | 0 | 8 |
| 백엔드 구축 (B) | 7 | 0 | 0 | 7 |
| 결제/라이선스 (P) | 3 | 4 | 0 | 7 |
| 프론트엔드 (F) | 1 | 11 | 6 | 18 |
| SEO/마케팅 (M) | 0 | 3 | 3 | 6 |
| **합계** | **16** | **27** | **9** | **52** |

> 2026-04-21 감사 결과 보안 Critical 9건 중 **7건은 이미 코드로 완료**, S-08은 오늘 `hasActiveSubscription` 헬퍼 추가로 완료. S-10은 부분 완료(Major 등급으로 재분류 권고). 이에 따라 Critical 8건 감산.
> 2026-04-21 일일 완료: P-03(결제 UI Lemonsqueezy 실연결), M-02(가격 정책), S-03(Supabase URL Config), S-01/02/04/05/06/07/08/09(보안 감사 결과 완료 반영)
> 2026-04-19 완료: GA4 측정 태그, 핵심 전환 이벤트, Consent Mode v2, Search Console 인증 5건 감산

---

# 🔴 Critical — 런칭 차단 요인

## A. 보안 (S-01 ~ S-10)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| S-01 | JWT 만료 시간 미설정 | ✅ 완료 (2026-04-21 감사) | - | D | Supabase가 토큰 발급·만료 전담, 자체 JWT 발급 없음 |
| S-02 | Refresh Token Rotation 미구현 | ✅ 완료 (2026-04-21 감사) | - | D | `src/js/supabase-client.js`에서 `autoRefreshToken: true` 설정됨 |
| S-03 | OAuth 콜백 URL 화이트리스트 설정 | ✅ 완료 (2026-04-21 확인) | - | D+캡틴 | 2026-04-20 코드 측 redirectTo 통일 완료. Supabase 대시보드 Site URL=`https://mergeui.com`, Redirect URLs=mergeui.com/www.mergeui.com login.html 등록 완료 |
| S-04 | localStorage 기반 세션 XSS 취약 | ✅ 완료 (2026-04-21 감사) | - | C+D | localStorage에는 UI 캐시(name/email/plan/role)만 저장, 실제 토큰은 Supabase SDK 전용 저장소(`sb-mergeui-auth`)에 관리됨 |
| S-05 | Admin role 서버 측 미검증 | ✅ 완료 (2026-04-21 감사) | - | D | API 측 `getUser()`가 profile.role 조회 + 관리자 API에서 `user.role !== 'admin'` 거부 + RLS `is_admin()` 정책 다층 검증 |
| S-06 | Lemonsqueezy 웹훅 서명 검증 미구현 | ✅ 완료 (2026-04-21 감사) | - | D | `api/v1/webhooks/lemonsqueezy.js`에서 HMAC-SHA256 + `crypto.timingSafeEqual` 사용, `LEMON_WEBHOOK_SECRET` 필수 |
| S-07 | 결제 상태 클라이언트 변조 방지 미구현 | ✅ 완료 (2026-04-21 감사) | - | D | `subscriptions`·`profiles.plan` UPDATE는 RLS로 전면 차단, Lemon 웹훅(service role)에서만 변경 가능 |
| S-08 | 구독 만료 후 서버 측 접근 차단 미구현 | ✅ 완료 (2026-04-21) | - | D | `api/v1/_lib/supabase.js`에 `hasActiveSubscription(userId)` 헬퍼 추가(status='active' AND `current_period_end > now()` 검증). `api/v1/download.js`에서 호출하여 만료된 구독자 다운로드 거부 |
| S-09 | RLS(Row Level Security) 정책 미설정 | ✅ 완료 (2026-04-21 감사) | - | D | 10개 테이블 전체 RLS 활성화, `server/db/schema.sql` + `server/db/fix-admin-rls.sql`(관리자 조회 정책 추가) 적용 필요 확인 |
| S-10 | 서버 측 입력 검증 미구현 | ⚠️ 부분 완료 | 이메일 형식·배열 크기 미검증 | D | 기본 필드 존재/문자열 sanitize는 있음. 이메일 형식·배치 요청 크기 제한·검증 라이브러리(zod) 도입은 미완. SQL Injection은 Supabase 파라미터 바인딩으로 자동 방어됨 |

## B. 백엔드 전체 미구축 (B-01 ~ B-07)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| B-01 | 서버 기술 스택 결정 미완료 | ⏳ 분석 완료, 캡틴 결정 대기 | 개발 착수 자체가 불가 | A→캡틴 | 2026-04-19 A가 3안 비교 리포트 작성 → **1안 Supabase 추천**. `docs/analysis/backend-stack-comparison.md` 참조 |
| B-02 | DB 스키마 설계 미완료 | ❌ 미착수 | 데이터 저장 불가 | D | users, subscriptions, license_keys, themes, downloads, payments |
| B-03 | 인증 시스템 미구현 | ⚠️ 부분 완료 | 회원가입/로그인 불가 | D | 2026-04-20 OAuth 세션 버그 수정 + Supabase URL Config + admin role SQL 전부 완료(2026-04-21 확인). 이메일 인증 API는 미착수 (런칭 전 필수 여부 재검토 필요) |
| B-04 | 결제 연동 미구현 | ❌ 미착수 | 수익화 불가 | D | Lemonsqueezy 웹훅 수신·처리 |
| B-05 | 다운로드 시스템 미구현 | ❌ 미착수 | 구매 후 테마 제공 불가 | D | 권한 확인 + 서명된 URL 생성 + 다운로드 기록 |
| B-06 | 관리자 백엔드 API 미구현 | ⏳ Phase 5 대기 | 사이트 운영 불가 | D | CRUD, 릴리즈 노트 발행, 정성 분석 |
| B-07 | 개인정보 삭제·다운로드 API 미구현 | ❌ 미착수 | **GDPR 제17·20조 위반 → 과징금 매출 4%** | D | settings 페이지에서 호출 가능해야 함 |

## C. 법적 / 컴플라이언스 (L-01 ~ L-04)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| L-01 | 이용약관 실제 내용 미작성 | ⏳ 초안 완료, 법무 검토 대기 | 분쟁 시 법적 보호 부재 | F→캡틴→법무 | 2026-04-19 F가 16개 섹션 영문+한글 초안 작성 (`terms.html`). 법무 검토 포인트 5건 정리됨 |
| L-02 | 개인정보처리방침 미작성 | ⏳ 초안 완료, 법무 검토 대기 | **GDPR 위반 → 과징금** | F→캡틴→법무 | 2026-04-19 F가 GDPR+PIPA 대응 14개 섹션 초안 작성 (`privacy.html`). EU 대리인 지정 여부 검토 필요 |
| L-03 | 환불 정책 미명시 | ⏳ 초안 완료, 법무 검토 대기 | EU 14일 철회권 분쟁 | F→캡틴→법무 | 2026-04-19 F가 "즉시 이용 개시 동의" 모델 초안 작성 (`docs/marketing/refund-policy.md`). 체크박스 문구 법적 적합성 검토 필요 |
| L-04 | 비밀번호 저장 방식 미확정 | ❌ 미착수 | **평문 저장 시 형사처벌 가능** | D | bcrypt 해싱 필수, Supabase Auth 사용 시 자동 처리 |

## D. 결제 / 라이선스 Critical (P-01 ~ P-04)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| P-01 | Lemonsqueezy 웹훅 처리 미구현 | ❌ 미착수 | 결제해도 구독 상태 미반영 | D | subscription_created/updated/cancelled/payment_success/failed 전 이벤트 |
| P-02 | 라이선스 키 발급 시스템 미구현 | ❌ 미착수 | 구매자에게 키 전달 불가 | D | 자동 생성/검증/해제 로직 |
| P-03 | 결제 UI 실제 동작 미연동 | ✅ 완료 (2026-04-21) | - | C+D | Lemonsqueezy 3개 상품 URL 연결 완료 (Pro Monthly $19, Pro Annual $149, Launch Early Bird $99). 캡틴 수동 QA로 결제창 상품·가격·주기 정상 표시 확인 |
| P-04 | 환불 시 라이선스 해제 미구현 | ❌ 미착수 | 환불 후에도 다운로드 계속 → 수익 손실 | D | refund 웹훅 수신 시 `license_keys.status = revoked` |

## E. 프론트엔드 Critical (F-01)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| F-01 | 테마 다운로드 기능 미구현 | ❌ 미착수 | 구매자에게 상품 제공 불가 | C | themes/download.html 다운로드 버튼/체크박스 JS 핸들러 완전 누락 |

---

# 🟡 Major — 런칭 전 강력 권장

## F. 보안 Major (S-11 ~ S-15)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| S-11 | CSRF 방어 미구현 | ❌ 미착수 | Cross-Site Request Forgery 공격 | D | SameSite 쿠키 + CSRF 토큰 |
| S-12 | XSS 방지 미완료 | ❌ 미착수 | 악성 스크립트 주입 | C+D | CSP 헤더 + 입력 이스케이프 |
| S-13 | Rate Limiting 미설정 | ❌ 미착수 | API 남용·DDoS | D | 로그인 API 분당 5회, 다운로드 분당 10회 등 |
| S-14 | CORS 설정 미검토 | ❌ 미착수 | 타 도메인 무단 요청 | D | 프로덕션 도메인만 허용 |
| S-15 | 보안 HTTP 헤더 미설정 | ❌ 미착수 | 클릭재킹, MIME 스니핑 | D | X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security |

## G. 법적 / 컴플라이언스 Major (L-05 ~ L-08)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| L-05 | 한국 사업자등록 | ❌ 미착수 | 수익 발생 시 조세 문제 | 캡틴 | 간이과세자로 시작 가능 |
| L-06 | 한국 통신판매업 신고 | ❌ 미착수 | **미신고 시 과태료 최대 3,000만원** | 캡틴 | 관할 구청 신고. 간이과세 기준 초과 시 필수 |
| L-07 | 이메일 마케팅 동의 (CAN-SPAM / GDPR) | ❌ 미착수 | 스팸법 위반 과징금 | F+D | opt-in 체크박스 + 모든 메일에 unsubscribe 링크 (Loops 자동) |
| L-08 | CCPA (캘리포니아) 대응 | ⏳ 런칭 후 | 미국 이용자 증가 시 리스크 | F | GDPR 대응으로 대부분 커버. "Do Not Sell My Info" 링크 별도 |

## H. 결제 / 라이선스 Major (P-05 ~ P-08)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| P-05 | Subscriber 구독 취소/변경 미연동 | ❌ 미착수 | 구독자 이탈 시 불편 | C+D | subscriber/billing.html Cancel/Change Plan 버튼 |
| P-06 | Subscriber 비밀번호 변경 미연동 | ❌ 미착수 | 가짜 성공 메시지만 표시 | C+D | subscriber/settings.html |
| P-07 | Admin 설정 저장 미연동 | ❌ 미착수 | 가짜 성공 메시지만 표시 | C+D | admin/settings.html |
| P-08 | Checkout 페이지 하드코딩 | ⚠️ 부분 완료 | 실제 결제 정보 미반영 | C+D | checkout/success.html 라이선스 키/플랜/금액 DB 연동 |

## I. 프론트엔드 Major (F-02 ~ F-12)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| F-02 | Admin 데이터 렌더링 미완료 | ⚠️ 부분 완료 | 관리자 기능 사용 불가 | C | 5개 admin 페이지 console.log만 → UI 렌더링 필요 |
| F-03 | Admin CRUD 버튼 미동작 | ❌ 미착수 | 테마/컴포넌트 관리 불가 | C+D | admin/themes.html, components.html 추가/수정/삭제 |
| F-04 | 컴포넌트 상세 탭 미동작 | ⚠️ 부분 완료 | 코드 복사 불가 → 핵심 UX 상실 | C | HTML/CSS 탭 전환 JS + Copy 버튼 + 파일명 불일치 |
| F-05 | Reset Password API 미호출 | ⚠️ 부분 완료 | 비밀번호 재설정 작동 안 함 | C+D | Supabase `updateUser` 연동 (일부 완료) |
| F-06 | 연락 폼 이메일 미전송 | ❌ 미착수 | 문의 접수 불가 | D | contact.html MergeDB 미로드 시 전송 안 됨 |
| F-07 | OAuth 처리 불일치 | ✅ 완료 (2026-04-20) | - | C+D | redirectTo를 login.html로 통일, onAuthStateChange가 공통 분기 처리 |
| F-08 | CSS 변수 중복 선언 | ❌ 미착수 | 유지보수 지옥, 스타일 충돌 | B+C | tokens.css 링크하면서 각 페이지 :root 재선언 |
| F-09 | 인라인 스타일 다수 | ❌ 미착수 | 일관성 저하, 커스터마이징 어려움 | B+C | admin/subscriber stat-card 등 |
| F-10 | Nav 스타일 충돌 | ❌ 미착수 | 디자인 일관성 저하 | B+C | nav.css 있는데 각 페이지에서 재정의 |
| F-11 | 모바일 사이드바 미대응 | ❌ 미착수 | 모바일 구독자 이탈 | C | admin/subscriber dashboard 768px 이하 대안 네비 없음 |
| F-12 | ARIA 속성 거의 부재 | ❌ 미착수 | 접근성 장애인 차별 소송 가능 | C | aria-label, role 등 전반 추가 필요 |

## J. SEO / 마케팅 Major (M-01 ~ M-04)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| M-01 | og:image 파일 없음 | ⏳ SVG 완료, PNG 변환 필요 | 소셜 공유 시 깨진 이미지 | B(완료)→C | 2026-04-19 B가 1200x630 SVG + HTML 목업 작성, landing/index.html 메타태그 교체 완료. 카카오톡/일부 메일 클라이언트 대응 위해 C가 Playwright로 PNG export 필요 |
| M-02 | 연간 가격 토글 + 가격 정책 반영 | ✅ 완료 (2026-04-21) | - | C | Team 카드·FAQ·비교 테이블 제거, Monthly($19)/Annual($99 얼리버드 50명 한정, 정가 $149) 토글 구현, 얼리버드 배너 추가. Lemonsqueezy 상품은 캡틴이 연간 2개(정가/얼리버드) 생성 후 URL 교체 필요 |
| M-03 | JSON-LD 구조화 데이터 미추가 | ❌ 미착수 | 구글 리치 스니펫 미확보 | C | Product + FAQ 스키마 |
| M-04 | robots.txt AI 크롤러 미설정 | ❌ 미착수 | AI 검색(ChatGPT, Perplexity) 노출 불가 | C+D | GPTBot/ClaudeBot/PerplexityBot 허용 |

---

# 🟢 Minor — 런칭 후 개선

## K. 프론트엔드 Minor (F-13 ~ F-18)

| # | 항목 | 현재 상태 | 담당 | 비고 |
|---|------|----------|------|------|
| F-13 | 다운로드 필터/검색 미동작 | ❌ 미착수 | C | subscriber/downloads.html 날짜 필터 핸들러 |
| F-14 | 라이선스 키 복사 로직 허점 | ❌ 미착수 | C | "--" 복사 가능. 빈 값 체크 필요 |
| F-15 | Export / Refund 기능 미구현 | ❌ 미착수 | C+D | admin/subscribers.html Export CSV, orders.html Refund |
| F-16 | 계정 삭제 미연동 | ❌ 미착수 | C+D | subscriber/settings.html Delete Account |
| F-17 | 키보드 포커스 스타일 미정의 | ❌ 미착수 | C | Tab 탐색 시 포커스 위치 불명확 |
| F-18 | 언어 설정 불일치 | ❌ 미착수 | C | admin/dashboard.html `lang="ko"` vs subscriber `lang="en"` |

## L. SEO 기타 (M-05 ~ M-07)

| # | 항목 | 현재 상태 | 담당 | 비고 |
|---|------|----------|------|------|
| M-05 | 메타 디스크립션 초과 | ❌ 미착수 | F+C | landing meta description 120자 초과 |
| M-06 | 실제 고객 로고 미추가 | ❌ 런칭 후 | F+C | 초기엔 고객 없으므로 런칭 후 축적 필요 |
| M-07 | 비교 페이지 미제작 | ⏳ 런칭 후 | F+C | MergeUi vs Tailwind UI vs shadcn/ui (AI 검색 최적화) |

---

# ✅ 최근 완료 항목 (2026-04-19 기준 최근 7일)

| 완료일 | 항목 | 담당 | 커밋 |
|--------|------|------|------|
| 2026-04-19 | GA4 측정 태그 전 페이지 삽입 | F+C | 596eb44 |
| 2026-04-19 | GA4 핵심 전환 이벤트 추적 | F+C | e0960ba |
| 2026-04-19 | GA4 Consent Mode v2 + 쿠키 배너 | F+C | 9715709 |
| 2026-04-19 | Google Search Console 인증 | F+C | f2edad9 |
| 2026-04-16 | 테마 컬러 전략 확정 (배경 고정 + 액센트 프리셋) | B+캡틴 | - |
| 2026-04-19 | 가격 확정 Free + Pro ($19/mo, $149/yr) | A+F+캡틴 | - |
| 2026-04-19 | 백엔드 스택 3안 비교 리포트 (Supabase 추천) | A | 분석 완료, 캡틴 결정 대기 |
| 2026-04-19 | 이용약관/개인정보처리방침/환불정책 초안 작성 | F | 법무 검토 대기 |
| 2026-04-19 | og:image SVG + HTML 목업 제작 + landing 메타 교체 | B | PNG 변환만 남음 |

---

# 📋 담당자별 작업량 요약

## D(백엔드) — 28건 (Critical 21 + Major 7)
**런칭 차단 주요 원인**. 최소 6~8주 집중 투입 필수.

1. 기술 스택 결정(Supabase vs 자체) — 캡틴 결정 대기
2. DB 스키마 + RLS 설계
3. 보안 기반 (JWT, 웹훅 서명, 입력 검증)
4. 인증 시스템 (OAuth + 이메일)
5. 결제/라이선스 (Lemonsqueezy)
6. 다운로드 API
7. GDPR 삭제·다운로드 API
8. Admin CRUD API
9. 이메일 API (Contact, 비밀번호 재설정)

## C(프론트엔드) — 18건 (Critical 1 + Major 11 + Minor 6)
약 3~4주. D와 병렬 진행 가능한 부분 많음.

1. 테마 다운로드 기능 (Critical)
2. CSS 변수/인라인 스타일 정리
3. Admin/Subscriber DB 연동
4. 컴포넌트 상세 탭 + 복사
5. 모바일 대응 + 접근성
6. 가격 토글 + JSON-LD
7. og:image 제작

## F(그로스) — 7건 + 법적 문서 3건
약 2주 + 법무 검토 별도.

1. 이용약관 초안 → 법무 검토
2. 개인정보처리방침 초안 → 법무 검토
3. 환불 정책 명시
4. 이메일 opt-in 문구 작성
5. 비교 페이지 콘텐츠 (런칭 후)
6. robots.txt 설정 협의

## B(디자인) — 3건
1. og:image 제작
2. CSS 토큰 최종 정리 (C와 협업)
3. 인라인 스타일 → 클래스 전환 가이드

## E(QA) — 상시
- D의 모든 API 보안 리뷰 (AI 생성 코드 취약점 탐지)
- 런칭 전 전체 E2E 테스트
- 결제 흐름 5가지 시나리오 (성공/실패/취소/중복/만료)

## 캡틴 — 의사결정 5건 + 법적 등록 2건
1. 백엔드 기술 스택 최종 결정
2. 법무 검토 위탁 예산 ($500K~$1M 추정)
3. Admin 페이지 런칭 포함 여부
4. 결제 연동 런칭 포함 여부 (Waitlist 전환 옵션)
5. 정성 분석 구현 시점 (구독자 100명 이후 권장)
6. 사업자등록
7. 통신판매업 신고

---

# 📅 Phase별 런칭 로드맵

## Phase 1 — 기반 구축 (Week 1)
- [ ] 백엔드 기술 스택 결정 (캡틴)
- [ ] Supabase 환경 구축 (D)
- [ ] DB 스키마 + RLS 설계 (D)
- [ ] 법무 검토 의뢰 시작 (캡틴 + F)
- [ ] og:image 제작 (B)
- [ ] CSS 정리 착수 (B+C)

## Phase 2 — 핵심 기능 (Week 2~3)
- [ ] 인증 API 구현 (D)
- [ ] Lemonsqueezy 웹훅 + 라이선스 (D)
- [ ] 다운로드 API + 테마 다운로드 UI (D+C)
- [ ] GDPR 삭제·다운로드 API (D)
- [ ] 보안 헤더/CSRF/Rate Limiting (D)

## Phase 3 — UI 연동 (Week 4)
- [ ] Admin/Subscriber 페이지 DB 연동 (C+D)
- [ ] 컴포넌트 상세 탭 + 복사 (C)
- [ ] 가격 토글 + JSON-LD (C)
- [ ] Checkout/Reset Password 연동 (C+D)

## Phase 4 — QA + 마케팅 (Week 5)
- [ ] 전체 E2E 테스트 (E)
- [ ] 보안 코드 리뷰 (E)
- [ ] 이용약관/개인정보처리방침 최종화 (F+캡틴)
- [ ] 사업자등록 + 통신판매업 신고 (캡틴)
- [ ] Loops 이메일 자동화 (D+F)

## Phase 5 — 런칭
- [ ] 최종 합동 검증
- [ ] Product Hunt 런칭 (F)

## Phase 6 — 런칭 후
- [ ] 비교 페이지 제작 (F+C)
- [ ] 관리자 페이지 고도화 (C+D)
- [ ] 정성 분석 시스템 (D+C+F, 구독자 100명 이후)
- [ ] CCPA 대응 (F)

---

# 📝 업데이트 이력

| 날짜 | 내용 | 작성자 |
|------|------|--------|
| 2026-04-19 | 최초 작성. 10개 MD 파일 취합 + 법적 리스크 추가 + 최근 커밋 반영 | A(PM) 주도 합동 |
| 2026-04-19 | B-01(백엔드 스택) / L-01~L-03(법적 문서) / M-01(og:image) 상태 업데이트. A·F·B 병렬 착수 결과 반영 | A(PM) |

---

# 🔗 참조 원본 문서

이 파일에 통합된 원본 문서들 (세부 맥락 필요 시 참고):

- `docs/qa-reports/security-design-review.md` — 보안 설계 리뷰
- `docs/qa-reports/launch-readiness-report.md` — 런칭 준비 QA 리포트
- `docs/qa-reports/frontend-remaining-issues.md` — 프론트 잔여 이슈
- `docs/plans/production-roadmap.md` — 전체 로드맵
- `docs/plans/ia-sitemap.md` — 페이지 IA/사이트맵
- `docs/plans/api-spec.md` — API 명세
- `docs/marketing/conversion-checklist.md` — 전환 체크리스트
- `docs/marketing/launch-marketing-plan.md` — 런칭 마케팅 플랜
- `docs/seo/` — SEO 문서
- `CLAUDE.md` — 팀 업무 지시서
