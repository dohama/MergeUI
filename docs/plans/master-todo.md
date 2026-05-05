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

## 🔥 D-5 풀가동 1순위 — Blocks 컴포넌트 라이브러리 (2026-05-01 캡틴 결정)

> **결정 배경**: 랜딩에서 "20+ Components" 약속 + Pro 플랜 가치 핵심. 빈 페이지로 런칭하면 거짓 광고 → 환불·평판 리스크.
> **방향**: 메모리 `project_blocks_product.md` "5/7부터" 일정 폐기. **D-5 안에 핵심 20–25개 풀가동 (B안)**.
> **세부 명세**: `docs/plans/blocks-d5-plan.md` (별도 파일, B/C/E 풀가동 명세)
> **카피 정직화**: 랜딩 "50+ Components" → "20+ Components" + "growing weekly" 완료 (2026-05-01)

| P | 항목 | 담당 | 마감 | 상태 |
|---|------|------|------|------|
| P0 | Blocks 24종 시각 명세 (6카테고리, design/blocks-spec.md) | B(디자인) | 5/2 | [x] 2026-05-01 |
| P0 | Blocks HTML/CSS 코드 변환 + 테마 토큰 매핑 (24개 templates/blocks/) | C(프론트) | 5/4 | [x] 2026-05-01 |
| P0 | components.html 정적 시드 (BC-1) + components-data/loader.js | C(프론트) | 5/4 | [x] 2026-05-01 |
| P0 | components-detail.html 코드 복사 + Pro 마스킹 + Not found (BC-2/3) | C(프론트) | 5/4 | [x] 2026-05-01 |
| P0 | supabase-client.js view/RPC 전환 (BM-3 RLS) | C(프론트)+D | 5/5 | [x] 2026-05-02 |
| P0 | Blocks 24종 QA 베이스라인 사전점검 (Critical 4 / Major 4 / Minor 1) | E(QA) | 5/5 | [x] 2026-05-01 (베이스라인) — 5/4 매트릭스 192건 + 5/5 E2E 3종 대기 |
| P0 | Blocks DB 시드 SQL + RLS 보강 (`server/db/blocks-seed.sql`) | D(백엔드) | 5/5 | [x] 2026-05-01 SQL 작성 — Supabase SQL Editor 실행은 캡틴 액션 |
| P1 | Admin UX 8건 (AD-01~AD-08) prompt() 체인 → AdminModal 통합 (한국어 유지 — 2026-05-03 캡틴 결정, `feedback_admin_korean.md`) | C(프론트) | 5/4 | [x] 2026-05-02 (모달) + [x] 2026-05-03 (한국어 통일) |

**핵심 원칙 (캡틴 결정 2026-05-01)**:
- 양보다 질 — "와" 수준 캡틴 기준 사수 (디자이너 출신)
- 6 카테고리 × 평균 4종 = 24종 목표 (Buttons / Cards / Tables / Forms / Charts / Feedback / Navigation)
- 카피는 D-day 기준으로 정직화. 5/1~5/5 동안은 "launching with day 1" 톤 허용

---

## 👤 캡틴 D-5 잔여 액션 (2026-05-01 추가, 위임 불가)

| P | 항목 | 마감 | 소요 | 상태 |
|---|------|------|------|------|
| P1 | Supabase SQL Editor에서 `server/db/launch-prep-migration.sql` 실행 (D-2/D-3/D-18 효력 발생) | 5/1 | 2분 | [x] 2026-05-01 완료 |
| P1 | Supabase SQL Editor에서 `server/db/email-sends-migration.sql` 실행 (send-email 멱등성) | 5/1 | 1분 | [x] 2026-05-01 완료 |
| P1 | **Supabase SQL Editor에서 `server/db/blocks-seed.sql` 실행** (24종 시드 + RLS 보강 — BM-3 차단) | 5/2 | 3분 | [x] 2026-05-02 완료 |
| P1 | Lemonsqueezy 결제 실전 1회 (Pro Monthly 본인 결제 → 환불 → 라이선스 해제 확인) | 5/2 | 15분 | [ ] |
| P2 | OAuth marketing_consent 정책 결정 (동의 화면 추가 / 그대로) | 5/2 | 5분 | [x] 2026-05-02 — B안 (그대로, marketing_consent=false 디폴트, settings에서 사후 opt-in) |
| P2 | PH Hunter 결정 (셀프 권고) | 5/3 | - | [x] 2026-05-02 — A안 (셀프 헌트) |
| P2 | 갤러리 이미지 5장 최종 선정 (bi_v1 메인 권고) | 5/3 | 30분 | [ ] |
| P3 | PH Maker comment 톤 확정 (F 초안 검토) | 5/4 | 10분 | [x] 2026-05-02 — 3안 (스토리텔링) 선택 |
| P3 | 5/6 KST 4pm~10pm 응대 일정 확보 | 5/5 | - | [ ] |
| P3 | Sentry 알림 룰 3개 등록 (E-15, 아래 단계 참고) | 5/4 | 10분 | [ ] |
| P4 | 사업자등록 + 통신판매업 신고 | 런칭 후 30일 내 | 1시간 | [ ] |
| P5 | 약관/개인정보처리방침 법무 검토 의뢰 (선택) | 런칭 후 | - | [ ] |

> 캡틴이 "내가 할 거 알려줘" 라고 물으면 이 표가 단일 출처.

### Sentry 알림 룰 등록 단계 (E-15, 2026-05-01 추가)

**경로**: Sentry 대시보드 → 좌측 사이드바 `Alerts` → 우측 상단 `Create Alert Rule` → `Issues` 선택

**룰 1 — 결제 (Critical, 즉시 알림)**
- Name: `Payment errors — immediate`
- When: `A new issue is created` OR `The issue changes state from resolved to unresolved`
- If (Filter): `The event's tags match` → tag key `area`, value `payment`
- Then (Action): `Send a notification to email` → 캡틴 이메일 (rnchf4116) + Slack 연동 시 `#alerts` 채널
- Frequency: `1 minute` (가장 빠른 옵션)

**룰 2 — 인증 (Major, 5분 5건)**
- Name: `Auth errors — burst`
- When: `The issue is seen more than 5 times in 5 minutes`
- If: tag `area` = `auth`
- Then: 이메일 알림
- Frequency: `5 minutes`

**룰 3 — 일반 API (Minor, 30분 10건)**
- Name: `API errors — sustained`
- When: `The issue is seen more than 10 times in 30 minutes`
- If: tag `area` = `api`
- Then: 이메일 알림
- Frequency: `30 minutes`

**검증**: 등록 후 각 룰의 `Test Rule` 버튼 클릭 → 테스트 알림 메일 수신 확인.

---

## 🎯 현재 상태 요약 (2026-05-03 D-3, 5/2 합동 검증 + 5/3 핫픽스 반영)

| 카테고리 | 🔴 Critical | 🟡 Major | 🟢 Minor | 합계 |
|---------|------------|---------|---------|------|
| 보안 (S) | 0 | 4 | 0 | 4 |
| 법적/컴플라이언스 (L) | 0 (법무검토⏳) | 4 | 0 | 4 |
| 백엔드 구축 (B) | 0 (⚠️1 부분) | 0 | 0 | 0~1 |
| 결제/라이선스 (P) | 0 | 2 | 0 | 2 |
| 프론트엔드 (F) | 0 | 4 | 5 | 9 |
| SEO/마케팅 (M) | 0 | 0 | 2 | 2 |
| **합계** | **0 (+⚠️1)** | **14** | **7** | **~22** |

> 4/29 → 5/3 추가 해소 항목: **BC-1~BC-5 Blocks 5건 전체 해결, AD-01~AD-08 Admin UX 모달 + 한국어 통일(5/3 결정), F-04 컴포넌트 상세 탭 완료, F SEO 30건 적용, F 마케팅 D-day 자료 4 .md 신설, M-01·M-02·M-03·M-04 모두 처리, BM-3 RLS column REVOKE 완료(5/3 캡틴 SQL 실행), D-02 BD-1 download.js 치명결함 + NULL handling 통일(5/3), 거짓 광고 통일 50+ → 20+ 4파일(5/2 야간), 결제·인증 페이지 noindex 3종(5/2 야간)** → Critical 0 유지, Major 8건 추가 감산.

### 🎉 5/1~5/3 핵심 마일스톤
- **Blocks 24종 풀가동 완료** (5/5 마감 → 5/2 완료, 3일 앞당김): B 명세 + C 24 templates + D blocks-seed.sql + E 192/192 매트릭스 PASS + E2E 25단계 22 PASS
- **BM-3 RLS 보강 완료** (2026-05-03 D-01 column REVOKE 캡틴 SQL Editor 실행): components_public_view + get_component_code RPC 단일 경로 + code_html/code_css 컬럼 직접 접근 차단
- **D-02 BD-1 결제·다운로드 치명결함 수정** (2026-05-03): download.js schema에 없는 expires_at select 제거 + license_keys NULL 정책 통일 + supabase-client .single()→.maybeSingle() (콘솔 빨간 에러 제거)
- **Admin UX 8건 모달 + 한국어 통일** (5/2 모달 + 5/3 한국어): admin 9 페이지는 캡틴 전용이므로 한국어 유지 (`feedback_admin_korean.md`)
- **F SEO 30건**: pricing/themes-detail/about JSON-LD + 14 description 80~120자 + admin 9 + subscriber 5 noindex,nofollow + sitemap.xml + robots.txt /about
- **F 마케팅 D-day 자료 4 .md**: ph-maker-comment-tones / launch-social-posts / d-day-runbook / product-hunt-launch-post
- **거짓 광고 리스크 완전 차단** (5/2 야간): "50+ components" → "20+ components, growing weekly" 4파일 통일 (landing JSON-LD / pricing / about / json-ld-snippets.md)
- **결제·인증 페이지 noindex** 적용 완료 (checkout/success + auth verify-email + reset-password)
- **og-image 헤드라인 품질 개선** (5/3): 폰트 60px·3줄 레이아웃 + Playwright PNG 재export

### 4/29 검증 리포트(`docs/qa-reports/launch-readiness-2026-04-29.md`) 발견 (5/3 처리 결과)
| 등급 | 4/29 발견 | 5/3 잔존 | 비고 |
|------|----------|---------|------|
| 🔴 Critical | 17건 | **0건** | 5/2~5/3 합동 검증에서 17건 모두 처리 완료 |
| 🟡 Major | 35건 | ~13건 | 5/4~D-1 처리 |
| 🟢 Minor | 11건 | ~7건 | 런칭 후 핫픽스 가능 |

> 5/2 합동 검증 결과는 `docs/qa-reports/cross-check-2026-05-02-summary.md` (단일 출처)에 통합. master-todo는 카테고리 추적만, 검증 리포트의 ID(D-01, C-01, B-01 등)로 직접 참조.

### 남은 부분 완료 항목 (⚠️)
- **S-10**: 서버 입력 검증 — SQL Injection은 Supabase 파라미터 바인딩으로 자동 커버, 이메일 형식·배열 크기 제한은 미완 (Major 등급)
- **B-06**: 관리자 CRUD API — 대시보드 UI는 완성, 추가 CRUD 엔드포인트는 Phase 5 일정
> 2026-04-19 완료(5건 감산): GA4 측정 태그, 핵심 전환 이벤트, Consent Mode v2, Search Console 인증
> 2026-04-29 완료(2건 감산): Loops Welcome event=`signup` + `inquiry_received` transactional, M-01 og:image PNG 변환·배포
> 2026-05-01 완료(다수 감산): Blocks 풀가동 6건 + BM-3 RLS 작성 + 캡틴 P1 launch-prep + email-sends 마이그레이션 실행
> 2026-05-02 완료(다수 감산): Blocks DB 시드 적용 + Admin UX 8건 모달 + F-04 컴포넌트 상세 탭 + F SEO 30건 + F 마케팅 D-day 4 .md + BC-1~BC-5 핫픽스 + 50+ → 20+ 통일 + checkout/auth noindex 3종
> 2026-05-03 완료(다수 감산): D-01 BM-3 column REVOKE (캡틴 SQL) + D-02 BD-1 download.js + supabase-client NULL handling + Admin 9 페이지 한국어 통일(우선순위 1+2+3) + og-image 품질 개선 + 합동 검증 통합 보고서 + 로고 교체 준비 자료

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
| B-01 | 서버 기술 스택 결정 | ✅ 완료 (2026-04-21 감사) | - | A→캡틴 | Supabase + Vercel Serverless(`api/v1/*`) + Express(`server/*`) 병행 구조 확정 및 실제 구동 중 |
| B-02 | DB 스키마 설계 | ✅ 완료 (2026-04-21 감사) | - | D | `server/db/schema.sql` 10개 테이블 전부 구현 + Supabase Auth trigger(`handle_new_user()`) + RLS 정책 적용 |
| B-03 | 인증 시스템 | ✅ 완료 (2026-04-21 감사) | - | D | Supabase Auth + PKCE + GitHub/Google OAuth + 이메일 인증(`verify-email.html`) + admin role 판별 전부 구현·동작 |
| B-04 | 결제 연동 | ✅ 완료 (2026-04-21 감사) | - | D | Lemonsqueezy 웹훅(`webhooks/lemonsqueezy.js`) + Checkout API(`checkout.js`) + Billing Portal(`billing-portal.js`) 전부 구현 |
| B-05 | 다운로드 시스템 | ✅ 완료 (2026-04-21 감사) | - | D | `api/v1/download.js`: 권한 확인 + `hasActiveSubscription` + downloads 기록 전부 구현. 파일 서빙은 `/templates/{slug}-v1/*.zip` public URL 방식 |
| B-06 | 관리자 백엔드 API | ⚠️ 부분 완료 | 관리자 CRUD 일부 누락 | D | 관리자 대시보드 UI 8개 완성 + `admin/send-email.js` 완료. CRUD 전용 API(테마/컴포넌트 수정·삭제 등)는 대시보드가 UI 기반 처리 — 런칭에 필수 아님(Phase 5 정식화 예정) |
| B-07 | 개인정보 삭제·다운로드 API (GDPR) | ✅ 완료 (2026-04-21 감사) | - | D | `api/v1/account.js`: DELETE(6개 테이블 + auth.users 완전 삭제) + GET(사용자 데이터 JSON 다운로드) 구현, settings.html에서 호출 확인 |

## C. 법적 / 컴플라이언스 (L-01 ~ L-04)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| L-01 | 이용약관 실제 내용 미작성 | ⏳ 초안 완료, 법무 검토 대기 | 분쟁 시 법적 보호 부재 | F→캡틴→법무 | 2026-04-19 F가 16개 섹션 영문+한글 초안 작성 (`terms.html`). 법무 검토 포인트 5건 정리됨 |
| L-02 | 개인정보처리방침 미작성 | ⏳ 초안 완료, 법무 검토 대기 | **GDPR 위반 → 과징금** | F→캡틴→법무 | 2026-04-19 F가 GDPR+PIPA 대응 14개 섹션 초안 작성 (`privacy.html`). EU 대리인 지정 여부 검토 필요 |
| L-03 | 환불 정책 미명시 | ⏳ 초안 완료, 법무 검토 대기 | EU 14일 철회권 분쟁 | F→캡틴→법무 | 2026-04-19 F가 "즉시 이용 개시 동의" 모델 초안 작성 (`docs/marketing/refund-policy.md`). 체크박스 문구 법적 적합성 검토 필요 |
| L-04 | 비밀번호 저장 방식 확정 | ✅ 완료 (2026-04-21 감사) | - | D | Supabase Auth에 전적 위임 — 자체 비밀번호 저장 없음. 프로필 테이블에는 email/name만 저장(비밀번호 미포함). bcrypt 해싱은 Supabase 측 자동 |

## D. 결제 / 라이선스 Critical (P-01 ~ P-04)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| P-01 | Lemonsqueezy 웹훅 처리 | ✅ 완료 (2026-04-21 감사) | - | D | subscription_created/updated/cancelled/expired/payment_success/payment_failed/order_refunded/subscription_payment_refunded 8개 이벤트 전부 처리. HMAC 서명 검증 + GDPR marketing_consent 체크 + Loops 트리거 |
| P-02 | 라이선스 키 발급 시스템 | ✅ 완료 (2026-04-21 감사) | - | D | `subscription_created` 웹훅에서 `MERGE-{PLAN}-{HEX}` 포맷 자동 발급 + `license_keys` 테이블 저장. 검증 API(license/verify)는 현재 UI 사용 시점이 없어 필요 시 추가 |
| P-03 | 결제 UI 실제 동작 | ✅ 완료 (2026-04-21) | - | C+D | Lemonsqueezy 3개 상품 URL 연결 완료 (Pro Monthly $19, Pro Annual $149, Launch Early Bird $99). 캡틴 수동 QA로 결제창 상품·가격·주기 정상 표시 확인 |
| P-04 | 환불 시 라이선스 해제 | ✅ 완료 (2026-04-21) | - | D | `order_refunded` 핸들러: orders=refunded + license_keys=revoked + subscriptions=cancelled + profiles.plan=free + Loops 'subscription_refunded' 이벤트 트리거. `subscription_payment_refunded`는 orders만 refunded 처리 |

## E. 프론트엔드 Critical (F-01)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| F-01 | 테마 다운로드 기능 | ✅ 완료 (2026-04-21 감사) | - | C | `pages/themes/download.html`: 동의 체크박스 + 다운로드 버튼 + `POST /api/v1/download` 호출(Bearer token 포함) + 403(pricing 리다이렉트)/401(login 리다이렉트) 에러 처리 전부 구현 |

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

## I-2. Admin UX prompt() → 모달 교체 + 한국어 통일 결정 (2026-05-03 완료)

> **상태**: ✅ 8건 모두 처리 완료 + 9 페이지 한국어 통일 완료 (5/3)
> **결정 정정 (2026-05-03 캡틴, `feedback_admin_korean.md`)**: admin 9 페이지는 캡틴 전용 화면이므로 **한국어 유지**. 이전 일부 영문화 작업은 잘못된 방향이었으며, 5/3에 9 페이지 모두 한국어로 통일 완료.
> **DB 슬러그 정책**: status/badge/category 등 DB 컬럼 값은 영문 슬러그 그대로 (active/published/free/pro 등). 화면 표시만 한국어 매퍼로 변환 → CSS 클래스 매칭 정상 + DB 쿼리 호환.

| # | 페이지 | 처리 내역 | 상태 |
|---|--------|----------|------|
| AD-01 | admin/themes.html | prompt() 8연속 → AdminModal showFormModal + showConfirm + 한국어 통일 | [x] 2026-05-02 (모달) + [x] 2026-05-03 (한국어) |
| AD-02 | admin/releases.html | prompt() 4연속 → AdminModal + 한국어 통일 | [x] 2026-05-02 (모달) + [x] 2026-05-03 (한국어) |
| AD-03 | admin/subscribers.html | Loops 발송 prompt → AdminModal + 한국어 통일 | [x] 2026-05-02 (모달) + [x] 2026-05-03 (한국어) |
| AD-04 | admin/orders.html | Refund 안내 배너 + 상세/환불 버튼 한국어 + 모달 라벨 | [x] 2026-05-02 (모달) + [x] 2026-05-03 (한국어) |
| AD-05 | admin/settings.html | 5개 카드(일반/결제/이메일/SEO/알림) 한국어 통일 + 토글 라벨 | [x] 2026-05-03 |
| AD-06 | admin/analytics.html | GA4 안내 + 전환 퍼널 + 세션 안내 한국어 통일 | [x] 2026-05-03 |
| AD-07 | admin/orders.html | 환불 안내 배너 + Lemonsqueezy 위임 안내 | [x] 2026-05-02 |
| AD-08 | admin CRUD 전반 | prompt() → AdminModal 공통 모듈(`src/js/admin-modal.js`) 통합 | [x] 2026-05-02 |

---

## I. 프론트엔드 Major (F-02 ~ F-12)

| # | 항목 | 현재 상태 | 리스크 발생 시 | 담당 | 비고 |
|---|------|----------|--------------|------|------|
| F-02 | Admin 데이터 렌더링 미완료 | ⚠️ 부분 완료 | 관리자 기능 사용 불가 | C | 5개 admin 페이지 console.log만 → UI 렌더링 필요 |
| F-03 | Admin CRUD 버튼 미동작 | ❌ 미착수 | 테마/컴포넌트 관리 불가 | C+D | admin/themes.html, components.html 추가/수정/삭제 |
| F-04 | 컴포넌트 상세 탭 미동작 | ✅ 완료 (2026-05-02) | - | C | components-detail.html에서 Pro masking + showProGate + 코드 복사 정상 동작 (BC-2/BC-3 처리에 통합) |
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
| M-01 | og:image 파일 | ✅ 완료 (2026-05-03) | - | B→C | 2026-04-19 B가 1200x630 SVG + HTML 목업 작성, sharp 변환 PNG 1차 적용. 2026-05-03 헤드라인이 대시보드 목업과 겹치는 품질 이슈 발견 → 폰트 60px·3줄 레이아웃(`Dashboard / templates that / ship fast.`)으로 og-image.html 수정 후 Playwright MCP로 1200x630 PNG 재export. landing/index.html, pages/public/about.html, pages/public/pricing.html 모두 적용됨 |
| M-02 | 연간 가격 토글 + 가격 정책 반영 | ✅ 완료 (2026-04-21) | - | C | Team 카드·FAQ·비교 테이블 제거, Monthly($19)/Annual($99 얼리버드 50명 한정, 정가 $149) 토글 구현, 얼리버드 배너 추가. Lemonsqueezy 상품은 캡틴이 연간 2개(정가/얼리버드) 생성 후 URL 교체 필요 |
| M-03 | JSON-LD 구조화 데이터 미추가 | ✅ 완료 (2026-05-02) | - | C+F | pricing(Product+Offer) / themes-detail(Product) / about(Organization+BreadcrumbList) / landing JSON-LD 적용. `docs/seo/json-ld-snippets.md` 단일 출처 |
| M-04 | robots.txt AI 크롤러 미설정 | ✅ 완료 (2026-05-02) | - | C+F | sitemap.xml 5/2 전체 갱신 (28 URL) + robots.txt Allow /about 추가. AI 크롤러 허용 정책 별도 검토 |

---

# 🟢 Minor — 런칭 후 개선

## K. 프론트엔드 Minor (F-13 ~ F-18)

| # | 항목 | 현재 상태 | 담당 | 비고 |
|---|------|----------|------|------|
| F-13 | 다운로드 필터/검색 미동작 | ❌ 미착수 | C | subscriber/downloads.html 날짜 필터 핸들러 |
| F-14 | 라이선스 키 복사 로직 허점 | ❌ 미착수 | C | "--" 복사 가능. 빈 값 체크 필요 |
| F-15 | Export / Refund 기능 미구현 | ⚠️ 부분 완료 (2026-05-02~03) | C+D | admin/orders.html Refund 안내 + Refund 버튼 + Lemonsqueezy 위임 추가. Export CSV는 admin/subscribers/inquiries/orders 모두 적용됨 |
| F-16 | 계정 삭제 미연동 | ❌ 미착수 | C+D | subscriber/settings.html Delete Account |
| F-17 | 키보드 포커스 스타일 미정의 | ❌ 미착수 | C | Tab 탐색 시 포커스 위치 불명확 |
| F-18 | 언어 설정 불일치 | ✅ 결정 완료 (2026-05-03) | C | admin은 한국어 유지(캡틴 결정, `feedback_admin_korean.md`), 그 외 페이지(landing/public/auth/checkout/subscriber/themes/legal)는 영어. 언어 분리 정책 확정 + 9 페이지 한국어 통일 완료 |

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
- [x] Loops 이메일 자동화 (D+F) — 2026-04-29 완료 (Welcome Loop event=`signup` + inquiry_received transactional + Vercel env vars 3종 등록·재배포 + 실전 가입/문의 양 흐름 검증 완료)

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
| 2026-04-21 | 보안 9건 + 백엔드 6건 + 결제 4건 + F-01/F-07 전수 감사 결과 반영. M-02 가격 토글 + P-03 결제 UI 연동 + P-04 환불 핸들러 완료 마킹 | A(PM) |
| 2026-04-29 | 4/29 launch-readiness 검증 리포트 79건 발견 반영 + Loops Welcome/inquiry_received 자동화 완료 + M-01 og:image PNG 변환 완료 | A(PM) |
| 2026-05-01 | D-5 풀가동 1순위 Blocks 섹션 신설 (BM-3 RLS / BC-1~BC-5 / Admin UX AD-01~AD-08 추가). 캡틴 D-5 잔여 액션 13건 표 추가 + Sentry 알림 룰 등록 단계 명시. Blocks 풀가동 6건 [x] 마킹 + Supabase 마이그레이션 2건 캡틴 [x] 마킹 | A(PM) |
| 2026-05-02 | 5/2 합동 검증 + 5/2 후반 핫픽스 반영. AD-01~AD-08 [x] (모달 교체) + F-04/M-01/M-02/M-03/M-04 [x], F-15 부분 완료, 거짓 광고 50+ → 20+ 통일 완료 마킹, checkout/auth noindex 3종 추가 | A(PM) |
| 2026-05-03 | D-3 시점 재집계(Critical 0, Major 14, Minor 7). I-2 admin 한국어 유지 결정 정정 + 9 페이지 한국어 통일 완료 마킹. F-18 결정 완료. 5/3 D-01 BM-3 column REVOKE + D-02 BD-1 download.js 치명결함 수정 + admin 9 페이지 한국어 통일 + og-image 품질 개선 완료 마킹 | A(PM) |
| 2026-05-04 | D-2 admin SNB inquiry 빨간 배지 (9 페이지) + admin/inquiries 답변/상태 변경 폼 추가 + ZIP 빌드 인프라 신규 (build-zips.js + archiver) — 캡틴 직접 지시 3건 처리 | A(PM) |
| 2026-05-05 | D-1 컴포넌트 10개 추가 (24→34, 신규 카테고리 display+overlay) + 6명 합동 검증 + 카탈로그 미리보기 동일 버그 수정 (components-preview.css 신규) + 카피 숫자 표현 제거 (9 파일) + library.html Pro 묶음 다운로드 카드 추가 | A(PM) |

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
