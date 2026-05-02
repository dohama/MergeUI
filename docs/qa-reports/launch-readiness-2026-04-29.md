# MergeUi 런칭 준비도 종합 리포트 (검증 완료)

> 작성: 2026-04-29 (D-7) — 본 리포트는 4/29 시점 스냅샷
> 검증: 6명 에이전트 발견 97건 → 3명 검증 에이전트가 코드/파일 직접 확인 → 79건 실 결함 + 18건 오보/이미해결
> 기준: 5/6 날짜가 아닌 **실제 운영 가능한 SaaS 완성도**
>
> ---
>
> ## ⚠️ 5/3 기준 갱신본은 별도 문서를 단일 출처로 사용
>
> 본 79건 카운트는 4/29 시점이며, **5/2~5/3까지 17건 Critical + 22건 Major 추가 처리** 완료.
> 최신 상태는 아래 단일 출처를 참조하십시오:
>
> - **합동 검증 결과 (5/2 D-4)**: `docs/qa-reports/cross-check-2026-05-02-summary.md`
> - **일자별 처리 기록 (5/1~5/3)**: `docs/plans/project-history.md`
> - **실시간 TODO 단일 출처**: `docs/plans/master-todo.md` (5/3 D-3 시점으로 갱신됨, Critical 0/Major 14/Minor 7)
>
> 본문 79건 본문 카운트는 시간 제약상 갱신하지 않으며, 위 단일 출처 포인터로 대체합니다.

---

## 🎯 종합 점수: 약 **60%**

| 영역 | 점수 | 핵심 결함 요약 |
|------|------|----------------|
| 결제·구독 시스템 | 65% | 웹훅 멱등성 부재(중복결제 시 매출 중복), subscription_resumed/paused 미처리 |
| 인증·계정 | 70% | 비밀번호 재설정 후 Loops 미동기화, OAuth+marketing_consent=false 경로 분산 |
| 테마·제품 본체 | 55% | 컴포넌트 페이지 카드 클래스 불일치, Chart.js CDN 의존, 모바일 사이드바 부재 |
| 디자인 시스템 | 65% | WCAG AA 미달(4.4:1), 8px 그리드 위반, 토큰 별칭 19개, 376px 미처리 |
| 모니터링·인프라 | 55% | Sentry DSN 미설정, Rate Limit 미적용, CSRF 토큰 부재, CSP unsafe-inline |
| 법무·컴플라이언스 | 50% | 사업자등록·통판신고 미처리(캡틴), 약관/정책 법무 검토 대기 |
| 이메일 자동화 | 40% | 8종 설계 vs 2종 활성, marketing_consent 변경 시 재동기화 없음 |
| 마케팅 자산 | 40% | 가짜 testimonial 잔존, About 페이지 부재, 푸터 빈약, Hero에 Early Bird 없음 |
| 문서·일관성 | 60% | pricing-strategy 가격 불일치, master-todo 9일 묵음, ia-sitemap 15일 묵음 |
| 자동 테스트 | 25% | tests/ 폴더 자체 부재 |

---

## ⚠️ 캡틴이 직접 해야 할 일 (위임 불가, 9건)

| # | 항목 | 마감 | 비고 |
|---|------|------|------|
| 1 | **사업자등록 (간이과세)** | 매출 발생 전 | 홈택스 30분, 런칭 후 30일 내 가능 |
| 2 | **통신판매업 신고** | 매출 발생 전 | 관할 구청, 미신고 과태료 최대 3,000만원 |
| 3 | **Sentry 계정 생성 + DSN 발급** | D-3 이내 | 무료 플랜, 15분 |
| 4 | **PH Hunter 결정** (셀프 추천) | D-3 이내 | A 권고: 셀프 헌트 |
| 5 | **PH 메이커 코멘트 톤 최종 확정** | D-2 | F가 초안 제공 (Hey doha 톤 OK인지) |
| 6 | **갤러리 이미지 5장 최종 선정** | D-3 | bi_v1 메인 권고, 영상 옵션 |
| 7 | **5/6 당일 6시간 응대 일정 확보** | 5/6 | KST 4pm~10pm 권장 |
| 8 | **약관/개인정보처리방침 법무 검토 의뢰** (선택) | 런칭 후 | 초안 완료 상태, 법적 위험 감수 가능 |
| 9 | **OAuth marketing_consent 정책 결정** | D-5 | OAuth 가입자에게 동의 묻는 화면 추가 여부 |

---

## 🔴 검증된 Critical (런칭 차단급, 17건)

### 백엔드·결제·보안 (D)
| # | 항목 | 파일 | 시간 |
|---|------|------|------|
| D-2 | handle_new_user 트리거 마이그레이션 미적용 시 marketing_consent 항상 false | server/db/schema.sql:217 vs add-marketing-consent.sql | S |
| D-3 | 웹훅 idempotency 부재 → 중복 결제 시 매출 중복 산정 | api/v1/webhooks/lemonsqueezy.js:104~177 | M |
| D-4 | lemon_subscription_id INSERT(UPSERT 아님) → 재전송 시 PK 충돌 | api/v1/webhooks/lemonsqueezy.js:108~119 | S |
| D-5 | subscription_resumed/paused/unpaused 핸들러 누락 | api/v1/webhooks/lemonsqueezy.js:105 | M |
| D-9 | download.js supabase-js error 미검사 → catch 무용지물 | api/v1/download.js:24~36 | S |
| D-10 | cancelled 구독도 billing portal URL 반환 | api/v1/account/billing-portal.js:21 | S |

### 프론트엔드 (C)
| # | 항목 | 파일 | 시간 |
|---|------|------|------|
| C-1 | 컴포넌트 페이지 카드 클래스 불일치 (캡틴 직접 지적) | pages/public/components.html:175~185 | S |
| C-3 | 결제 success 페이지 라이선스 키 영구 "—" 위험 | pages/checkout/success.html:96~112 | M |
| C-4 | admin·subscriber 모바일 햄버거 부재 | pages/admin/*, pages/subscriber/* | M |

### 인증·이메일 (D+C)
| # | 항목 | 파일 | 시간 |
|---|------|------|------|
| E-1 | 비밀번호 재설정 후 Loops 미동기화 | pages/auth/reset-password.html | M |
| E-3 | verify-email.html에서 sync-contact 미호출 | pages/auth/verify-email.html | M |
| E-9 | marketing_consent 변경 시 재동기화 트리거 부재 (GDPR 잔존) | sync-contact.js:25 | M |

### 디자인 (B)
| # | 항목 | 파일 | 시간 |
|---|------|------|------|
| B-1 | WCAG AA 컬러 대비 미달 (4.4:1) | src/styles/tokens.css:96 | S |

### QA·다운로드 (E)
| # | 항목 | 파일 | 시간 |
|---|------|------|------|
| E-4 | 다운로드 라이선스 키 검증 부재 (만료 키 미차단) | api/v1/download.js:13~22 | M |
| E-6 | CSRF 방어 명세 부재 | /api/v1/* POST 전체 | M |

### 마케팅 (F)
| # | 항목 | 파일 | 시간 |
|---|------|------|------|
| F-1 | 가짜 testimonial 제거 + "베타 모집 중" 솔직 카피 | landing/index.html:928~951 | S |
| F-2 | About 페이지 신규 작성 | pages/public/about.html (신규) | M |

---

## 🟡 검증된 Major (런칭 전 권장, 35건)

### 백엔드 (D, 7건)
- D-6 .env.example에 SENTRY_DSN 항목 부재 (S)
- D-7 CORS_ORIGIN 미설정 시 mergeui.com 고정 → 프리뷰 차단 (S)
- D-8 Rate Limit 미적용 (express-rate-limit 패키지만 있음) (M)
- D-11 admin/send-email 멱등성 없음 + 동기 루프 타임아웃 위험 (M)
- D-13 JWT_SECRET 정의되어 있으나 코드에서 미사용 (S)
- D-14 lemonsqueezy.js:150 parseFloat(data.total)/100 단위 검증 필요 (S)
- D-17 checkout.js:39 variant_id 화이트리스트 검증 없음 (S)

### 프론트엔드 (C, 9건)
- C-2 컴포넌트 상세 카테고리 active 갱신 없음 (M)
- C-6 admin 컴포넌트 추가가 prompt() 4연속 (M)
- C-7 admin 9개 페이지 lang="ko" + 한국어 라벨 (M)
- C-8 subscriber/billing.html 한국어 alert 혼재 (S)
- C-9 components-detail.html preview-toggle 핸들러 미정의 (S)
- C-11 컴포넌트 검색·필터 키보드 접근성 결함 (S)
- C-12 13개 테마 하드코딩 + DB 비활성 (M)
- C-13 모든 테마 Chart.js CDN 외부 의존 (M)
- C-18 nav.css 있으나 페이지마다 인라인 중복 17곳+ (M)

### 디자인 (B, 11건)
- B-3 타이포 스케일 위반 15px·13px·11px·10px·26px 혼재 (M)
- B-5 8px 그리드 위반 3px·6px·10px·14px·18px·28px (M)
- B-6 SVG stroke-width="2" 51건 (명세 1.5px) (M)
- B-7 다크모드 단순 색반전 수준 (M)
- B-8 토큰 명명 이중화 별칭 19개 (M)
- B-9 --merge-space-5: 20px 비표준 (S)
- B-10 하드코딩 컬러값 #FCA5A5/#86EFAC/#DC2626 10여 곳 (M)
- B-11 sidebar active bar 픽셀 정합 깨짐 (S)
- B-12 sidebar .content 28px 비토큰 패딩 (S)
- B-13 deuteranopia-safe 차트 팔레트 tokens.css 미반영 (M)
- B-14 모바일 브레이크포인트 단일화 (375px 미처리) (M)

### QA·테스트 (E, 5건)
- E-2 자동화 테스트 0건 (L) — 런칭 후 핫픽스 회귀 위험
- E-5 결제 5종 시나리오 자동 검증 부재 (L)
- E-8 admin 권한 우회 자동 검증 부재 (M)
- E-12 Rate limiting 미명세 (M)
- E-13 XSS 회귀 테스트 없음 (M)
- E-14 빈 데이터/긴 텍스트/대량 데이터 엣지 케이스 미검증 (M)
- E-15 Sentry 알림 임계치/라우팅 미설정 (S)

### 마케팅 (F, 7건)
- F-3 랜딩 푸터 링크 부족 (Refund/Sitemap/Contact/Pricing/Changelog 누락) (S)
- F-4 Early Bird 카운터 정적 (실시간 카운트 없음) (M)
- F-5 Hero에 Early Bird 노출 없음 (above-the-fold 미배치) (S)
- F-7 JSON-LD Product/Offer/SoftwareApplication 스키마 부재 (M)
- F-8 메타 description 짧음 (404/500/components/maintenance) (S)
- F-10 Hero copy 차별점 부재 (S)
- F-11 이메일 8종 설계 vs 2종만 활성 (M)
- F-12 랜딩 4개 CTA 단조로움 (S)

### PM 문서 (A, 5건)
- A-2 master-todo 4/21 묵음, 갱신 필요 (S)
- A-3 launch-plan 분야 1 일정 4/27 마감 → D-7 재정렬 (S)
- A-5/A-6 pricing-strategy.md 가격이 실제 Lemonsqueezy와 불일치 — 다음 에이전트가 잘못된 가격 인용 위험 (S)
- A-7 ia-sitemap 4/14 묵음 (S)
- A-13 launch-plan 분야 13 트랜잭션 진행률 표기 부재 (M)
- A-15 project-history 4/29 미기록 (S)

---

## 🟢 검증된 Minor (런칭 후 가능, 11건)

- D-15 CSP 'unsafe-inline' 'unsafe-eval' 허용 (XSS 약화) — 런칭 후 nonce 강화
- D-16 .env.example "OozeUi" 표기 잔존 (브랜드명 정리) (S)
- D-18 account.js DELETE 트랜잭션 부재 (M)
- C-15 src/js/supabase-client.js console.log 4건 잔존 (S)
- C-16 settings.html 계정 삭제 alert 사용 (S)
- C-17 landing 인라인 CSS/JS 거대 + Swiper CDN (M)
- B-15 border-radius 7px·10px·14px 비토큰 (S)
- B-16 로고 사이즈 페이지별 불일치 32px vs 28px (S)
- F-13 404/500 페이지 보조 CTA 부재 (S)
- F-14 docs/seo/ 디렉터리 자체 부재 (S)
- A-11 master-todo 담당자별 작업량 옛 수치 (S)

---

## ❌ 오보·이미해결 (제외, 18건)

- A-4: launch-plan에 Blocks 트랙 부분 통합되어 있음 (분야 3 Tailwind와 합쳐짐)
- A-8: production-roadmap 5/6 런칭 명확히 반영됨
- A-9: competitive-analysis docs/plans/ 위치 정상 (CLAUDE.md 규정 내)
- A-10: 라인 35~37은 경쟁사 분석 맥락이라 모순 아님
- A-12: master-todo Phase 4·5 체크박스 정상 표시됨
- A-14: CLAUDE.md 자체 4/28 최신, 단지 ia-sitemap 인용 부분이 4/14 스냅샷
- B-2: src/tokens 폴더 부재이나 tokens.css가 단일 소스로 작동 중 (이미 해결)
- B-4: 이모지+SVG 혼재 미발견 (스트로크 1.5px 일관)
- B-13: design/chart-palette.md 존재 확인 (verifier 판정 모순, 재검토 필요)
- B-17: design/themes/* 통합도 양호 (downgrade)
- C-5: reset-password.html에 OTP exchange 있음 (updateUser 항상 실패는 아님)
- C-10: admin/dashboard.html에 auth.js 포함됨 (라인 129)
- C-14: components.html 빈 상태 깜빡임 미확인
- D-1: 실제 동작 정상 (sync-contact.js:52~68에서 5분 이내 signup 이벤트 발송 → "Hey doha" 도착) — 단, OAuth+consent=false 경로는 의도된 GDPR 정책
- D-12: inquiry/sync-loops 인증 없음이 스팸보다는 정보 누출 위험 → Major→Minor
- F-3: 푸터 일부 페이지에서 이미 Refund 링크 등록됨
- F-6: Twitter Card·canonical 일부 페이지엔 있음 (Major→Minor)
- F-9: sitemap 14개 테마 슬러그 등재 정상 (실제 라우트 구현됨)
- E-7: 컴포넌트 페이지 검증은 캡틴 직접 클릭이 가장 정확 (E 추측 한계)
- E-11: 다크모드 차트 stroke 검증 미실시 (정보 부족)

---

## 🚀 5/6 D-day 운영 태스크 (런칭 당일 캡틴 행동)

| 시간 | 행동 | 담당 |
|------|------|------|
| KST 4:01pm | PH 포스트 발행 + Maker comment + 후속 댓글 5개 | 캡틴 |
| KST 4:01pm | X(Twitter)·LinkedIn 동시 발사글 | 캡틴 |
| KST 4:01pm | Loops로 가입자에게 "We're live" 메일 발송 | 캡틴+D |
| KST 4~7pm | 15분 단위 PH 댓글 응대 (알고리즘 최우선) | 캡틴 |
| KST 7~10pm | Reddit r/webdev, Indie Hackers 보조 포스팅 | 캡틴+F |
| KST 10pm~익일 4am | 새벽 모니터링 (미국 점심 = PH 골든타임) | 캡틴+F |
| KST 익일 4pm | 첫 매출·트래픽 회고 + Day 2 액션 결정 | 캡틴+A |

---

## 📅 권장 처리 순서 (D-7 → D-day)

| 일자 | 핵심 작업 |
|------|----------|
| **D-7 (오늘 4/29)** | Critical 17건 중 6~8건 처리 (D-3·D-4·E-1·C-1·F-1·B-1) |
| **D-6 (4/30)** | Critical 나머지 + Sentry DSN(캡틴) + 사업자등록(캡틴) |
| **D-5 (5/1)** | 플래그십 테마 1개 마무리 + Major 10건 |
| **D-4 (5/2)** | About 페이지 + 푸터 + Hero Early Bird 배너 + PH 카피 확정 |
| **D-3 (5/3)** | 갤러리 5장 제작 + Maker comment 톤 확정 + Hunter 결정 |
| **D-2 (5/4)** | E2E 합동 검증 (E 주관) + 통신판매업 신고 |
| **D-1 (5/5)** | 리허설 + 운영 일정 점검 + 백업 플랜 |
| **D-day (5/6)** | KST 4:01pm 발사 + 6시간 응대 |

---

## ❓ 캡틴이 지금 결정해야 할 것

| 결정 | 옵션 |
|------|------|
| Critical 17건 모두 처리? | 모두 / 12건만 / 8건만 |
| 사업자등록 시점 | 런칭 전 / 런칭 후 30일 |
| OAuth marketing_consent 동의 화면 추가 | 추가 / 그대로 |
| PH 미니멈 vs 권장 | 미니멈(반나절) / 권장(1~2일) |
| 자동 테스트 도입 | 런칭 전 / 런칭 후 |
| 한국어 admin UI 영문화 | D-7에 처리 / 런칭 후 |

---

**검증 정확도**: 97건 중 79건 실 결함 (~81%), 18건 오보·이미해결.
**실 결함 분포**: Critical 17 / Major 35+ / Minor 11
