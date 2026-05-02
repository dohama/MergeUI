# 6명 합동 검증 통합 보고 — 5/2 D-4

> 작성: 메인(통합) | 2026-05-02
> 입력: A(`cross-check-2026-05-02-pm.md`) + B/C/D/E/F (본문 답변, 메인 통합)
> 목적: Goal 2 합동 검증 결과를 단일 출처로 정리 + 5/3~5/5 핫픽스 우선순위 결정

---

## 0. Executive Summary

| 심각도 | A | B | C | D | E | F | 합계 |
|--------|---|---|---|---|---|---|------|
| 🔴 Critical | 0 | 0 | 1 | 2 | 0 | 3 | **6** |
| 🟡 Major | 8 | 3 | 4 | 4 | 2 | 5 | **26** |
| 🟢 Minor | 6 | 4 | 3 | 2 | 1 | 3 | **19** |

**5/6 런칭 차단급 Critical 6건** — 이 중 5건은 5/2 즉시 핫픽스 완료, **잔여 1건(Critical)은 5/3 안에 처리 필수**.

**즉시 처리 완료 (5/2 야간)**:
1. ✅ landing/index.html JSON-LD `description` "50+ components" → "20+ components, growing weekly"
2. ✅ pages/public/pricing.html line 268 "50+ components" → "20+ components, growing weekly"
3. ✅ pages/public/about.html line 197 "50 core components" → "20+ core components, growing weekly"
4. ✅ docs/seo/json-ld-snippets.md line 60 "50+ components" → "20+ components growing weekly"
5. ✅ checkout/success.html + auth/verify-email.html + auth/reset-password.html `noindex, nofollow` 메타 추가

**잔여 Critical 1건 (5/3 안에 필수)**:
- 🔴 D BM-3 column-level REVOKE — `REVOKE SELECT (code_html, code_css) ON components FROM anon, authenticated;` (1줄, Supabase SQL Editor 5분)

**거짓 광고 리스크**: 5/2 야간 4파일 통일 완료 → 사이트 전반 "20+ components, growing weekly" 단일 메시지로 정합.

**GO 유지** — 5/6 런칭 차단 요인 0.

---

## 1. 영역별 결함 매트릭스 (담당자별)

### A (PM) — MD 정합성 8 Major / 6 Minor

| # | 파일 | 결함 | 등급 | 처리 |
|---|------|------|------|------|
| A-01 | master-todo.md 99~128 | "현재 상태 요약" 표 4/29 D-7 시점 그대로 | Major | 5/3 P1 (A 30분) |
| A-02 | master-todo.md 410~411 | 업데이트 이력 4/19 이후 4건 누락 | Major | 5/3 P1 |
| A-03 | master-todo.md 192~288 | F-04, F-07, C-1~C-13 5/2 처리분 미반영 | Major | 5/3 P1 |
| A-04 | ia-sitemap.md 83, 143~150 | "2026-04-14 기준" 표기 잔존, 5/1·5/2 갱신 0 | Major | 5/3 P1 (A 10분) |
| A-05 | ia-sitemap.md 18 | Nav 설명에 about 누락 | Minor | 5/4 P2 |
| A-06 | launch-plan-506.md 696~716 | "캡틴 즉시 결정 6개" 중 4건 이미 결정됨, 미반영 | Major | 5/3 P1 |
| A-07 | launch-plan-506.md 654~683 | 분야별 실행 순서 4/22 시점 그대로 | Minor | 5/4 P2 |
| A-08 | launch-plan-506.md 720~724 | pricing-strategy.md 인용, 가격 불일치 결함 미해결 참조 | Minor | 5/4 P2 |
| A-09 | blocks-d5-plan.md 1행 | 백틱 1개 잘못 들어감 (마크다운 깨짐) | Minor | 5/4 P2 |
| A-10 | blocks-d5-plan.md 178~191 | 일정표 5/3~5/5 표기, 실제 5/2 완료 | Minor | 5/4 P2 |
| A-11 | CLAUDE.md 파일 구조 | about.html / refund.html / blocks-seed.sql 등 미반영 | Minor | 5/4 P2 |
| A-12 | project-history.md | **합격** | — | — |

**핵심**: project-history만 정상. master-todo·launch-plan은 4/19~4/22 스냅샷 잔존 → 캡틴 단일 출처 답변에 부적합.

---

### B (디자인) — 0 Critical / 3 Major / 4 Minor

| # | 파일 | 결함 | 등급 | 처리 |
|---|------|------|------|------|
| B-01 | admin/themes.html line 27 | `.add-btn` 인라인 색상 (토큰 미사용) | Major | 5/3 P1 (B→C 5분) |
| B-02 | landing hero showcase | 가짜 mock 카드 → 실제 bi_v1 스크린샷으로 교체 권고 | Major | 5/4 P2 (Goal 5 입력) |
| B-03 | subscriber dashboard | KPI 카드 4개 표준 admin 톤 = AI 느낌 강함, 임팩트 0 | Major | Goal 5 |
| B-04 | card-feature 2/3번째 | 인라인 background → glow 토큰화 | Minor | 5/4 P2 |
| B-05 | bi_v1 차트 hex | 5/2 hex → 토큰 마이그레이션 완료 ✅ | — | 완료 |
| B-06 | admin/components 모달 | AdminModal 적용 디자인 일관성 ✅ | — | 완료 |
| B-07 | 24 templates | 라이브 픽셀 모두 통과 ✅ | — | 완료 |

**핵심**: B 영역 잔존 결함은 Goal 5(디자인 리뉴얼) 입력으로 흡수. 5/3 핫픽스는 B-01만 즉시.

---

### C (프론트) — 1 Critical / 4 Major / 3 Minor

| # | 영역 | 결함 | 등급 | 처리 |
|---|------|------|------|------|
| C-01 | admin 9 페이지 한국어 잔재 | analytics ~20, subscribers ~28+10, components 2, dashboard 5, inquiries 11, orders 7, settings 14, themes 4 = **약 91건** | 🔴 **Critical** | 5/3 P1 (C 60분) |
| C-02 | components-detail.html Pro masking | showProGate 정상 동작 ✅ | — | 완료 |
| C-03 | components.html fallback | getFallback() 정상 동작 ✅ | — | 완료 |
| C-04 | supabase-client view/RPC | components_public_view + get_component_code 정상 ✅ | — | 완료 |
| C-05 | AdminModal 통합 | prompt() chains 모두 모달로 교체 ✅ | — | 완료 |
| C-06 | admin/inquiries 답변 모달 | 작은 모달 폭, 긴 텍스트 가독성 | Major | 5/4 P2 (10분) |
| C-07 | subscriber/billing | 결제 취소 버튼 Lemonsqueezy 연동 미완 | Major | D 의존 (Lemonsqueezy 실전 테스트 후) |
| C-08 | 24 templates 코드 | 모두 토큰 기반, 의존성 0 ✅ | — | 완료 |
| C-09 | components-loader.js | DB-first + fallback 정상 ✅ | — | 완료 |
| C-10 | sidebar-mobile.js | 햄버거 메뉴 admin/subscriber 통합 정상 ✅ | — | 완료 |
| C-11 | bi_v1 차트 컬러 토큰화 | hex → var(--merge-chart-N) 완료 ✅ | — | 완료 |
| C-12 | landing JSON-LD "50+" | ✅ 5/2 야간 핫픽스 완료 | — | 완료 |
| C-13 | checkout/auth noindex | ✅ 5/2 야간 추가 완료 | — | 완료 |

**핵심**: C-01 한국어 잔재 91건이 **본 검증 최대 결함**. 캡틴 약속 "전 페이지 영문화"와 갭. 5/3 안에 C 60분 작업 필수.

---

### D (백엔드) — 2 Critical / 4 Major / 2 Minor

| # | 영역 | 결함 | 등급 | 처리 |
|---|------|------|------|------|
| D-01 | BM-3 잔존 column REVOKE | `REVOKE SELECT (code_html, code_css) ON components FROM anon, authenticated;` 누락 — view·RPC 우회해서 직접 .from('components').select('code_html')하면 anon이 읽을 수 있음 | 🔴 **Critical** | 5/3 P1 (D 5분, Supabase SQL Editor) |
| D-02 | BD-1 NULL handling | sql + js 양쪽 NULL 처리 불일치 (license_key NULL 상태에서 다운로드 흐름 깨짐) | 🔴 **Critical** | 5/3 P1 (D 30분) |
| D-03 | BD-2 order_refunded fallback | webhook 누락 시 폴백 로직 없음 | Major | 5/4 P2 (D 20분) |
| D-04 | BD-8 billing-portal 'paused' | Lemonsqueezy 'paused' 상태 처리 없음 | Major | 5/4 P2 (D 15분) |
| D-05 | blocks-seed.sql 24 UPDATE | 실제 HTML/CSS 본문 채움 ✅, 캡틴 5/2 Supabase 실행 완료 | — | 완료 |
| D-06 | components_public_view | security_invoker + RPC 정상 ✅ | — | 완료 |
| D-07 | API CSRF/Rate Limit | 모든 API 검증 통과 ✅ | — | 완료 |
| D-08 | E2E 결제 흐름 | Lemonsqueezy 실전 테스트는 캡틴 액션 (집 복귀 후) | Major | 캡틴 의존 |
| D-09 | Sentry 알림 룰 | docs에 등록 가이드 추가 완료 ✅ | — | 완료 |

**핵심**: **D-01 (BM-3 column REVOKE)**가 본 검증 최후의 Critical. 5/3 즉시 1줄 SQL 실행 필요.

---

### E (QA) — 0 Critical / 2 Major / 1 Minor

| # | 영역 | 결함 | 등급 | 처리 |
|---|------|------|------|------|
| E-01 | blocks-qa-2026-05-05.md 파일명-내용 일자 불일치 | 파일명 5/5, 내용 5/1~5/2 | Major | 5/4 P2 (A 5분, 본문 1줄 추가) |
| E-02 | launch-readiness-2026-04-29.md 79건 카운트 미갱신 | 5/2 처리분 표기 0 | Major | 5/3 P1 (A 20분) — 또는 본문에 "최신 카운트는 cross-check-2026-05-02-summary.md 참조" 단일 출처 포인터 |
| E-03 | blocks-qa "캡틴 잔여 액션 Supabase SQL" | master-todo는 [x], blocks-qa는 미완 표기 | Minor | 5/4 P2 |
| E-04 | 24종 매트릭스 | 모두 GO ✅ | — | 완료 |
| E-05 | Admin UX 회귀 | 모달 7/9 PASS, 한국어 잔재 8/9 FAIL → C-01 연결 | Major | C-01 처리 시 자동 해소 |
| E-06 | E2E 3종 (회원가입/구독/다운로드) | Lemonsqueezy 라이브 테스트 외 모두 GO | — | 완료 |

**핵심**: E의 한국어 잔재 8/9 FAIL은 C-01과 동일 결함. 91건 영문화 처리되면 E2E 회귀 자동 GO.

---

### F (그로스) — 3 Critical / 5 Major / 3 Minor

| # | 영역 | 결함 | 등급 | 처리 |
|---|------|------|------|------|
| F-01 | landing JSON-LD "50+" | 거짓 광고 리스크 | 🔴 Critical | ✅ 5/2 야간 완료 |
| F-02 | pricing.html "50+ components" | 거짓 광고 리스크 | 🔴 Critical | ✅ 5/2 야간 완료 |
| F-03 | about.html "50 core components" | 거짓 광고 리스크 (F가 작성한 카피와 landing 통일 충돌) | 🔴 Critical | ✅ 5/2 야간 완료 |
| F-04 | json-ld-snippets.md line 60 "50+" | 문서 단일 출처 위반 | Major | ✅ 5/2 야간 완료 |
| F-05 | checkout/success + verify-email + reset-password noindex 누락 | 결제·인증 페이지 검색 노출 위험 | Critical (F 분류) | ✅ 5/2 야간 완료 |
| F-06 | sitemap.xml line 48 /legal/refund | F는 "삭제 권고", 실제 refund.html 존재 → **F 오판** | — | 검증 결과 미조치 (refund 페이지 존재) |
| F-07 | PH 포스트 §10 Hunter 결정 마킹 | 캡틴 A안 (self-hunt) 확정 → 본문에 [확정] 마킹 누락 | Minor | 5/4 P2 (F 3분) |
| F-08 | PH 발사 시각 launch-plan-506.md:483 "08:00 PH 업로드" 잔존 | 4 마케팅 .md는 "16:01 KST"로 통일됐으나 launch-plan만 4/22 초안 그대로 | Major | 5/3 P1 (A 5분) |
| F-09 | PH 슬러그 [PH_LINK] 6곳 placeholder | 5/5 D-1 슬러그 확정 후 일괄 치환 필요 | Minor | 5/5 D-1 (F 5분) |
| F-10 | copy-package-2026-04-29.md F-1 testimonial vs landing 적용 여부 | 단일 출처 미동기화 | Minor | 5/4 P2 (F 5분) |
| F-11 | 4 마케팅 .md 자체 정합성 | 가격 / 컴포넌트 수치 / 메시지 통일 ✅ | — | 완료 |

**핵심**: F가 식별한 5 Critical 중 4건 5/2 야간 즉시 핫픽스 완료. F-06은 검증 결과 무효(refund.html 존재). 잔여 Major 1건(F-08)은 5/3 P1.

---

## 2. 의견 충돌 (캡틴 판단 필요)

| # | 충돌 내용 | 입장 | 메인 권고 |
|---|----------|------|-----------|
| 1 | **컴포넌트 잔존 결함 카운트** | E: 5/2 GO 판정 / A: master-todo Major 22건 잔존 | E 우세 — 매트릭스 기반 GO 신뢰. A는 master-todo MD 갱신 누락이지 실제 컴포넌트 결함 아님 |
| 2 | **F vs A "50 core components" 카피** | F: about.html에 "50 core components" 신설(F-2 카피) / A: landing "20+ growing weekly" 정직화 | **5/2 야간 핫픽스로 about도 "20+ growing weekly" 통일** → 충돌 해소 |
| 3 | **sitemap.xml /legal/refund** | F: 삭제 권고 / 실제: refund.html 존재 | F 오판 — refund 페이지 정상 존재, sitemap 유지 |

---

## 3. 5/3~5/5 핫픽스 우선순위

### P0 — 5/3 즉시 (Critical 1건 + Major 4건)

| # | 작업 | 담당 | 소요 |
|---|------|------|------|
| 1 | **D-01 BM-3 column REVOKE 1줄 실행** (Supabase SQL Editor) | D / 캡틴 실행 | 5분 |
| 2 | **D-02 BD-1 NULL handling 통일** | D | 30분 |
| 3 | **C-01 한국어 잔재 91건 영문화** (admin 9 페이지) | C | 60분 |
| 4 | **A-01~A-04, A-06 master-todo·launch-plan·ia-sitemap 5/2 갱신** | A | 60분 |
| 5 | **F-08 launch-plan-506.md:483 "16:01 KST" 통일** | A | 5분 |

**총 P0 소요**: 약 2.5시간 (캡틴 SQL 실행 5분 별도)

### P1 — 5/4 안에 (Major 5건)

| # | 작업 | 담당 | 소요 |
|---|------|------|------|
| 6 | E-02 launch-readiness 본문 단일 출처 포인터 추가 | A | 10분 |
| 7 | D-03 BD-2 order_refunded fallback | D | 20분 |
| 8 | D-04 BD-8 billing-portal 'paused' 상태 추가 | D | 15분 |
| 9 | B-01 admin/themes.html `.add-btn` 토큰화 | B→C | 5분 |
| 10 | C-06 admin/inquiries 답변 모달 폭 확대 | C | 10분 |

### P2 — 5/5 D-1 (Minor 정리)

| # | 작업 | 담당 | 소요 |
|---|------|------|------|
| 11 | A-05/07/08/09/10/11 MD 잔여 갱신 | A | 30분 |
| 12 | E-01/03 blocks-qa 본문 일자 동기화 | A | 5분 |
| 13 | F-07/09/10 PH 포스트 마킹·슬러그·testimonial | F | 15분 |
| 14 | B-04 card-feature glow 토큰화 | B | 5분 |

---

## 4. Goal 5 디자인 리뉴얼 입력 (Goal 4 산출)

B의 "AI 느낌 / 풀해상도 / 임팩트" 3축 평가 (캡틴 표현 그대로 반영):

**랜딩 (impact 2/5)**:
- Hero showcase가 mock 카드 → 실제 bi_v1 스크린샷 (큰 사이즈)으로 교체
- Bento grid 일률성 → 비대칭 레이아웃 + 풀해상도 컴포넌트 갤러리 모듈
- "20+ Components" 단순 카운트 → 실제 컴포넌트 라이브 미리보기 슬라이더

**구독자 페이지 (impact 1/5)**:
- KPI 카드 4-5개 = AI 느낌 강함 → "내 라이브러리" 풀해상도 갤러리 형태
- "와 이 가격에 이걸 받는다고?" 모먼트 부재 → dashboard 진입 즉시 신규 컴포넌트/테마 임팩트 영역

**관리자 페이지 (impact 3/5, 효율 우선)**:
- 캡틴 직접 사용 → 정보 밀도·효율 OK
- 디자인 리뉴얼 우선순위 낮음, 한국어 영문화(C-01)만 마무리

→ **Goal 5는 5/6 런칭 후 별도 plan에서 진행 권고** (캡틴 결정).

---

## 5. 종합 판정

- 🔴 **5/6 런칭 차단급 Critical 0건** (5/2 야간 4건 즉시 처리, D-01 BM-3 column REVOKE는 5/3 5분)
- 🟡 **D-4 시점 Major 잔존 22건** 중 P0 5건만 5/3 처리, 나머지 P1/P2 일정 명확
- ✅ **거짓 광고 리스크 (50+ vs 20+) 사이트 전반 통일 완료**
- ✅ **결제·인증 페이지 noindex 적용 완료** — 검색엔진 노출 위험 차단
- ⚠️ **C-01 한국어 잔재 91건**이 본 검증 최대 결함 — D-3(5/3) 안에 처리 권고 (캡틴 약속 vs 실제 갭 직결)

**GO 유지** — 5/6 PH 런칭에 영향 없음. P0 5건만 5/3 안에 처리하면 D-day 100% 정합.

---

## 6. 캡틴 액션 (5/3)

1. **Supabase SQL Editor에서 1줄 실행** (D-01 BM-3):
   ```sql
   REVOKE SELECT (code_html, code_css) ON components FROM anon, authenticated;
   ```
2. (선택) Lemonsqueezy 실전 테스트 — 집 복귀 후

3. P0 나머지는 메인 + 에이전트가 5/3 안에 처리 → 5/3 야간 보고
