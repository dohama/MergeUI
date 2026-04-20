# MergeUi 프로젝트 히스토리

> 초기 구상부터 현재까지의 전체 진행 기록
> 최종 업데이트: 2026-04-15

---

## Day 1 — 2026-04-11 (금) : 프로젝트 탄생

### 에이전트 팀 구성
- **agent-teams-guide.md 작성** — Claude Code 에이전트 팀 운영 레퍼런스 문서 생성
- **6명 AI 에이전트 정의** (.claude/agents/ 폴더):
  - A(PM): 시니어 PM — 사업 설계자 + 캡틴 멘토
  - B(디자인): 디자인 디렉터 — 시각 체계 수호자
  - C(프론트): 프론트엔드 엔지니어 — 화면의 모든 것
  - D(백엔드): 백엔드 엔지니어 — 보이지 않는 엔진
  - E(QA): QA 스페셜리스트 — 품질 문지기
  - F(그로스): 그로스 마케터 — 성장 엔진

### 업무 지시서 (CLAUDE.md) 초안
- 핵심 규칙 10개 정의
- 팀 구성, 역할, 지침 상세화
- 기능별 담당 에이전트 매핑
- 파일 소유권 규칙, 품질 게이트 정의
- 실행 로드맵 (Phase 1~5) 수립

---

## Day 2 — 2026-04-12 (토) : 기획 + 첫 페이지 제작 시작

### 경쟁사 분석
- **competitive-analysis.md 작성** (A+F 협업)
  - Tailwind UI, shadcn/ui, Tremor, daisyUI, CoreUI 5개 경쟁사 분석
  - MergeUi 포지셔닝: "의존성 제로, 순수 HTML/CSS, 구독 모델"

### 캡틴 의사결정
- 랜딩 유지 + Nav 통일 (B안 채택)
- Coming Soon 셸 방식 (A안 채택)
- 로그인/회원가입 왼쪽 비주얼+오른쪽 폼 통일
- 1600px 와이드 레이아웃
- 수익화 최우선 방침 확정

### 첫 페이지 제작 (C 주도)
- 랜딩페이지 완성
- 테마 갤러리 + 테마 상세
- 가격표 페이지
- 404 에러 페이지
- 컴포넌트 라이브러리 (18개 컴포넌트)
- 설치 가이드(docs) (8섹션)
- 로그인/회원가입/비밀번호찾기
- 구독자 대시보드
- Nav 통일, 모바일 햄버거 메뉴 전 페이지 적용
- localStorage 기반 인증 MVP

### IA 사이트맵 확정
- 39개 페이지 목록 최종 확정 (캡틴 승인)
- 9개 페이지 추가: checkout/*, preview, download, verify-email, contact, 500, maintenance, docs/:section
- 3건 통합: library (테마+컴포넌트+찜), billing (라이선스 포함)
- blog → Phase 5로 이동

### production-roadmap.md 작성
- Phase 0~7 전체 로드맵
- 법적 준비, 인프라 결정, 비용 요약
- Lemonsqueezy 연동 절차 상세
- Supabase 인증/DB 설계
- 런칭 체크리스트

---

## Day 3 — 2026-04-13 (일) : 페이지 대량 생산

### Coming Soon 셸 + 추가 페이지 제작
- 미션 컨트롤 페이지 완성
- 공개 페이지 마무리: 500, maintenance, contact, changelog, preview, download, components-detail
- 법적 페이지: terms, privacy
- 인증 마무리: reset-password (Coming Soon 셸)
- 구독자 페이지 Coming Soon 셸 다수 생성

---

## Day 4 — 2026-04-14 (월) : 전체 완성 + 품질 검증 시작

### 현황 점검
- 캡틴 요청으로 전체 파일 전수 조사 실시
- **발견**: ia-sitemap.md가 오래된 상태 — 실제로는 대부분 페이지가 이미 완성됨
- 문서와 실제 파일 상태 불일치 확인

### 관리자 페이지 7개 신규 구현
- admin/themes — 테마 CRUD 테이블
- admin/components — 컴포넌트 관리
- admin/releases — 릴리즈 노트 카드형
- admin/inquiries — 문의 관리
- admin/analytics — 퍼널 분석 + 세션 리플레이
- admin/orders (신규) — 결제/주문 내역
- admin/settings (신규) — 사이트 설정 5섹션
- 기존 admin 2개 사이드바 업데이트 (Orders, Settings 추가)

### 캡틴 결정
- **blog 완전 제외** (Phase 5에서도 삭제)
- ia-sitemap.md 전면 갱신

### 문서 업데이트
- ia-sitemap.md — 39개 전체 완료 반영
- CLAUDE.md — 파일 구조 + 현황 동기화

### 최종 현황: **39개 페이지 전체 완료**

---

## Day 5 — 2026-04-15 (화) : 합동 검증 + 인프라 개선

### 6명 에이전트 합동 검증 (전체 품질 검수)
캡틴 지시: "에이전트들끼리 모아서 전체적으로 디자인 검수, 퍼블, 백엔드, 기획, 마케팅, QA 전체 확인"

**6명 병렬 투입:**
| 에이전트 | 검수 영역 | 발견 사항 |
|---------|----------|----------|
| B(디자인) | 디자인 토큰, 타이포, 간격, 반응형, 라이트모드 | Critical 3 / Major 4 / Minor 3 |
| C(프론트) | 링크, HTML, CSS, JS, 접근성, 인증 | Critical 3 / Major 6 / Minor 4 |
| D(백엔드) | API 포인트, 인증, 결제, 보안, DB 스키마 | Critical 4 / Major 3 |
| A(PM) | 사용자 여정, 전환 퍼널, MD 파일 | Critical 3 / Major 4 / Minor 2 |
| F(그로스) | SEO, 전환 최적화, 리텐션, 카피 | Critical 3 / Major 6 / Minor 3 |
| E(QA) | 전체 15점 + 보안 5점 체크리스트 | Critical 4 / Major 7 / Minor 6 |

### 캡틴 피드백: "너네는 팀이야!"
- 에이전트 간 크로스 체크 + 합동 검증 원칙 수립
- **CLAUDE.md에 "팀 합동 검증 원칙" 섹션 추가**
- 메모리에 저장: 작업 마무리 시 합동 검증 시간 필수

### 합동 검증 통합 리포트
- Critical 6건 (보안 관련 → 백엔드 연동 시 해결 결정)
- Major 12건 (CSS 분리로 일부 해결)
- 에이전트 간 의견 갈림 3건 식별

### 캡틴 기술 결정
- **Tailwind 전환 불필요** — 순수 CSS 변수 체계가 MergeUi 차별점
- **보안 이슈는 백엔드 개발 시 일괄 처리** (이중 작업 방지)
- **판매 템플릿 1안(MVP)**: HTML/CSS 원본 + 프레임워크별 가이드

### 인프라 개선 작업
1. **CSS 외부 분리** — 4개 공통 CSS 파일 생성:
   - `src/styles/tokens.css` — 디자인 토큰 + 라이트/다크 모드 + 하위호환 별칭
   - `src/styles/reset.css` — 리셋 + 기본 스타일
   - `src/styles/nav.css` — 공개 페이지 Nav + 모바일 메뉴 + 푸터
   - `src/styles/sidebar.css` — subscriber/admin 사이드바 + 모바일 하단 네비

2. **공통 JS 모듈** — 2개 파일 생성:
   - `src/js/auth.js` — 인증 체크(try-catch) + Nav 상태 + 테마 토글
   - `src/js/analytics.js` — GA4 초기화 + 12종 커스텀 이벤트 헬퍼 + data-track 자동 트래킹

3. **일괄 적용 스크립트** (`scripts/apply-common-css.sh`):
   - 38개 파일에 CSS 링크 삽입 (tokens: 37, nav: 17, sidebar: 14)
   - 31개 파일에 auth.js 삽입
   - 28개 파일에 analytics.js 삽입

4. **SEO 메타/OG 태그** — 12개 누락 페이지에 추가:
   - description + og:title/description/type/url/image + twitter:card + canonical

5. **레거시 파일 정리** — 4개 파일 리다이렉트 처리:
   - subscriber/themes → library.html
   - subscriber/components → library.html
   - subscriber/favorites → library.html
   - subscriber/license → billing.html

6. **production-roadmap.md 전면 갱신** — 현재 상태 정확 반영

---

## Day 5 후반 — 2026-04-15 : 백엔드 구축 + 배포 + 브랜드 변경

### 브랜드 리네이밍
- **OozeUi → MergeUi** 전체 변경 (캡틴 결정)
  - 이유: "ooze"가 영어권에서 부정적 인식, "merge"는 개발자 친화적
  - 팀 합의 후 결정
  - HTML 38개 + CSS 4개 + JS 3개 + MD 전체 + 서버 코드 일괄 교체
  - 도메인: mergeui.com 구매 완료

### 백엔드 구축
- **package.json** 초기화 + 의존성 설치 (express, supabase-js, cors, helmet, rate-limit)
- **DB 스키마** 10개 테이블 설계 + Supabase SQL Editor에서 적용 완료
  - profiles, subscriptions, license_keys, themes, components, downloads, orders, inquiries, releases, favorites
  - RLS 보안 정책 + 자동 트리거
- **서버 코드** 작성:
  - app.js (Express 엔트리포인트)
  - supabase.js (클라이언트)
  - middleware/auth.js (JWT 검증 + role 체크)
  - API 6개: auth, themes, components, downloads, inquiries, admin
  - webhooks.js (Lemonsqueezy 5개 이벤트 핸들러)

### 배포
- **GitHub** 레포 생성 (dohama/mergeui) + 코드 푸시
- **Vercel** 프로젝트 생성 + 자동 배포
- **mergeui.com** 도메인 연결 (메일플러그 DNS: A 레코드 + CNAME)
- 3개 도메인 Valid Configuration 확인

### Supabase 연결
- 프로젝트 생성 + .env에 URL/키 연결
- DB 스키마 적용 (10개 테이블 OK 확인)
- **supabase-client.js** 프론트 클라이언트 모듈 생성 (22개 API 함수)
- 로그인/회원가입/비밀번호찾기 → Supabase Auth 연동
- 문의 페이지 → inquiries 테이블 연동
- GitHub/Google OAuth 소셜 로그인 연결 (코드 준비, OAuth 앱 설정은 캡틴 대기)

### Lemonsqueezy
- 스토어 생성 완료 (mergeui.lemonsqueezy.com)
- 캡틴 결정: **결제 연동은 마지막에** — 인증/데이터 연동 먼저 완료 후

### 캡틴 피드백 반영
- 코디네이터 말투 수정 (건방진 톤 → 정중한 안내형)

---

## 현재 상태 요약 (2026-04-15 최종)

| 항목 | 상태 |
|------|------|
| 프론트엔드 페이지 | **39개 전체 완료** |
| CSS 외부 분리 | **완료** (tokens/reset/nav/sidebar) |
| 디자인 토큰 | **완료** (--merge-* + 라이트모드 + 하위호환) |
| GA4 트래킹 | **완료** (28개 페이지) |
| 공통 auth.js | **완료** (31개 페이지) |
| 브랜드 | **MergeUi** (mergeui.com) |
| GitHub | **완료** (dohama/MergeUI) |
| Vercel 배포 | **완료** (mergeui.com 연결) |
| Supabase DB | **완료** (10개 테이블 + 시드 데이터) |
| 백엔드 API 코드 | **완료** (6개 라우트 + 웹훅) |
| 프론트 Supabase 연동 | **21개 페이지 완료** (인증4+공개3+구독자5+관리자9) |
| 관리자 페이지 국문 전환 | **완료** (9개 페이지) |
| 관리자 role 체크 | **완료** (admin 아니면 접근 차단) |
| GitHub OAuth | **미해결** (로그인 후 세션 저장 안 됨 — 다음 세션에서 수정) |
| Lemonsqueezy | **스토어 생성만** (연동은 마지막) |

### 미해결 이슈
1. **GitHub OAuth 로그인** — 로그인은 되지만 세션이 저장 안 되어 로그인 상태 유지 안 됨. 직접 리다이렉트 방식으로 수정 배포했으나 아직 동작 확인 안 됨
2. 캡틴 계정 생성 후 → role='admin' 설정 필요

### 남은 작업 순서 (Day 6에서 이어서)
1. **GitHub OAuth 로그인 수정** — 세션 저장 문제 해결 (최우선)
2. 캡틴 계정 admin 설정
3. 구독자 대시보드에 관리자 페이지 링크 추가 (admin role일 때만)
4. 프론트 전체 수정 (버그 + UI 정리)
5. Lemonsqueezy 결제 연동 (마지막)
6. 최종 QA + 런칭

---

## 파일 생성 타임라인

```
2026-04-11  에이전트 팀 정의 (.claude/agents/), agent-teams-guide.md
2026-04-12  CLAUDE.md 초안, competitive-analysis.md, 첫 HTML 페이지들
2026-04-13  대량 페이지 생성, _mission-control.html
2026-04-14  관리자 7개 신규, ia-sitemap.md 전면 갱신
2026-04-15  CSS 분리(src/styles/), JS 모듈(src/js/), SEO 태그, GA4, 레거시 정리
2026-04-20  문서 일원화(SSoT), 마케팅 통합본 병합, OAuth 세션 유지 버그 수정
```

---

## Day 6 — 2026-04-20 (월) : 문서 일원화 + OAuth 세션 버그 수정

### 문서 정리
- 마케팅 레거시 5개(launch-strategy, pre-launch-plan, product-hunt-launch, social-launch-content, conversion-checklist) → `launch-marketing-plan.md`로 통합 (945→1273줄) 후 물리 삭제
- `refund-policy.md` → `docs/legal/`로 이동 (환불 정책은 법적 문서)
- `production-roadmap.md` 중복 섹션 제거 + 3개 문서 역할 분리 (roadmap = 로드맵·가이드 / master-todo = 실시간 TODO / project-history = 과거 기록)
- CLAUDE.md 핵심 규칙 11번 신설 — "단일 출처 원칙(한 주제당 한 MD 파일)" 명문화

### OAuth 세션 유지 버그 수정 (런칭 최우선 블로커 해결)
**문제**: "GitHub으로 시작하기" 버튼 클릭 → 로그인은 되지만 창 닫고 재접속 시 세션 풀림 → 구독자 이탈 100%

**근본 원인 3가지 (D 진단)**:
1. Supabase 클라이언트 초기화 시 `persistSession`, `autoRefreshToken` 등 세션 저장 옵션 미명시
2. OAuth 콜백 리다이렉트가 보호 페이지(`dashboard.html`)로 바로 가서 SDK 세션 파싱 완료 전에 "세션 없음" 판정 발생 (레이스 컨디션)
3. 세션 복원을 UI 캐시(`mergeui_session`)에만 의존, Supabase 공식 세션(`sb.auth.getSession()`) 무시

**수정 내역**:
- `src/js/supabase-client.js`:
  - createClient에 auth 옵션 명시 (`persistSession: true`, `autoRefreshToken: true`, `detectSessionInUrl: true`, `flowType: 'pkce'`, `storageKey: 'sb-mergeui-auth'`)
  - GitHub/Google OAuth redirectTo를 `login.html`로 변경 (SDK가 안전하게 세션 파싱한 뒤 `onAuthStateChange(SIGNED_IN)` 에서 대시보드로 이동)
  - 보호 페이지 세션 체크를 `sb.auth.getSession()` 우선으로 변경
  - OAuth 콜백 대기 시간 3초 → 5초 + 타임아웃 후 공식 세션 재확인
  - `window.location.href` → `window.location.replace` (뒤로가기로 콜백 URL 재진입 방지)
  - `onAuthStateChange`에 `USER_UPDATED` 이벤트 처리 추가
- `src/js/auth.js`:
  - `verifySession()`을 세션 캐시 유무와 무관하게 항상 호출 (창 재오픈 시 복원 보장)
  - 공식 세션이 있고 UI 캐시가 비어있으면 user_metadata로 최소 정보 복원
  - `window.location.href` → `window.location.replace`

**런칭 전 캡틴 수동 작업 2가지**:
1. Supabase 대시보드 → Authentication → URL Configuration
   - Site URL: `https://mergeui.com`
   - Redirect URLs: `https://mergeui.com/pages/auth/login.html`, `http://localhost:*/pages/auth/login.html`
2. 캡틴 계정 가입 후 SQL Editor에서 `UPDATE profiles SET role = 'admin' WHERE id = (SELECT id FROM auth.users WHERE email = 'weed.conv@gmail.com')`

**관련 master-todo.md 항목 업데이트**:
- F-07 (OAuth 처리 불일치) → ✅ 완료
- B-03 (인증 시스템 미구현) → ⚠️ 부분 완료 (OAuth 세션 유지만 해결, 이메일 인증 API·admin role 설정 미착수)
- S-03 (OAuth 콜백 URL 화이트리스트) → ⏳ 캡틴 대기 (Supabase 대시보드 등록)

---

## Day 7 — 2026-04-21 (화) : SEO 기반 정비 검증 + 가격 정책 확정본 반영

### SEO 배포 검증 (Day 6 커밋 `d198ac3` 후속)
- `https://mergeui.com/pricing`, `/legal/terms|privacy|refund`, `/robots.txt`, `/sitemap.xml` 전부 정상 접속 확인
- 캡틴이 Google Search Console 소유권 추가 인증:
  - `https://www.mergeui.com/` (기존, URL 접두어)
  - `https://mergeui.com/` (신규, URL 접두어 — www 없이) → 메타 태그 자동 인식 성공
  - `mergeui.com` (도메인 속성) — 자동 인증됨
- Sitemap 제출 → 현재 "가져올 수 없음" 상태 (구글 처리 대기 중, 수 시간~하루 내 "성공"으로 전환 예상)

### 가격 정책 확정본 반영 (2026-04-19 결정의 구현)
**커밋 `7f52c1f`**: `pages/public/pricing.html` 전면 재설계
- Team 플랜 카드·비교 테이블 열·FAQ 전부 제거 (Free + Pro 2플랜 체계)
- Monthly(`$19/mo`) / Annual(`$99/yr` 얼리버드, 정가 `$149`) 토글 실제 동작 구현
- 상단 Launch Early Bird 배너 신설 (pulse dot + "50 seats only" 강조)
- Annual 선택 시 빨간 점선 박스로 얼리버드 $99 노출 ($149 strike-through 표기)
- 메타 디스크립션 · og 태그 가격 정책 최신화
- FAQ "How does the Launch Early Bird work?" 질문 추가
- JS: Lemonsqueezy URL을 `LEMON_URLS` 객체로 분리 (`monthly`/`annual`/`earlybird`)

### Lemonsqueezy 연간 상품 2종 생성 + 연결 (커밋 `a55eaac`)
캡틴이 Lemonsqueezy 대시보드에서 직접 생성:
- `MergeUI Launch Early Bird` — $99/년 (얼리버드 50명 한정, 현재는 Lemonsqueezy 재고 제한 기능 없어 수동 관리)
  - Checkout: `https://mergeui.lemonsqueezy.com/checkout/buy/5a3d801a-cf05-429d-9be1-febaf375fe08`
- `MergeUI Pro Annual` — $149/년 (정식 연간, 무제한)
  - Checkout: `https://mergeui.lemonsqueezy.com/checkout/buy/cf97bf55-c983-487f-88c3-56222c63b54b`
- 기존 `MergeUI Pro` 월간($19/mo) URL은 유지

### 최종 결제 연결 검증 (캡틴 수동 QA)
- Monthly $19 결제창: ✅ OK (`MergeUI Pro` / $19 / per month 정상)
- Annual 얼리버드 $99 결제창: ✅ OK (`MergeUI Launch Early Bird` / $99 / per year 정상)
- 모바일 레이아웃: ✅ OK (카드 2개 세로 배치)

### 레거시 정리 대기 (런칭 전 또는 후 가능)
- Lemonsqueezy 대시보드에 남아있는 기존 `MergeUI Team` ($49/mo) 상품 → Unpublish/Archive 필요
- 현재 사이트 UI에서는 이미 노출 제거됨, 상품만 존재

### 관련 master-todo.md 항목 업데이트
- M-02 (연간 가격 토글 + 가격 정책 반영) → ✅ 완료 (2026-04-21)
- P-03 (결제 UI 실제 동작 미연동) → ✅ 완료 (2026-04-21) — Lemonsqueezy 3개 상품 URL 실제 연결
- P-01 ~ P-04 중 웹훅/라이선스/환불 해제는 여전히 별도 검증 필요

### 얼리버드 50명 소진 대응 계획 (후속)
1. 캡틴이 Lemonsqueezy에서 `MergeUI Launch Early Bird` Total Sales 50 도달 확인
2. 해당 상품 Status → `Unpublished`로 변경
3. 캡틴이 Claude에게 "얼리버드 마감" 통보
4. Claude가 `pricing.html`의 `currentLemonUrl()` 내 annual 분기를 `LEMON_URLS.earlybird` → `LEMON_URLS.annual` 로 교체 후 배포

### Team 상품 Unpublish (2026-04-21 오후)
- 캡틴이 Lemonsqueezy 대시보드에서 `MergeUI Team` ($49/mo) → Draft/Unpublish 처리 완료
- Claude가 Lemon API로 대신 처리 시도했으나 `LEMON_API_KEY`가 401 Unauthenticated → 캡틴이 수동 처리
- 후속 과제: `.env`의 `LEMON_API_KEY` 재발급(관리 API 권한 포함) 필요 — 런칭 블로커 아님

### 캡틴 피드백 — 반복 질문에 강한 불만 표시
- Claude가 Supabase URL Config 등록·admin role SQL 등 **이미 완료된 작업**을 문서(master-todo.md)만 보고 다시 시킴
- 캡틴이 스크린샷으로 "이미 등록돼있다" 지적 → Claude가 즉시 문서 일괄 최신화 + 메모리에 **캡틴이 이미 완료한 작업 목록** 저장
- 신규 메모리 2건:
  - `project_captain_done_actions.md` — 반복 질문 방지용 단일 출처
  - `feedback_verify_before_ask.md` — 블로커 보고 전 실제 상태 검증 필수

### master-todo.md 항목 업데이트 (2건 추가 감산)
- S-03 (OAuth 콜백 URL 화이트리스트) → ✅ 완료 (2026-04-21 확인)
- B-03 비고 — admin role SQL 완료 명시
- 현재 상태 요약: Critical 25→24, 합계 61→60

### 보안 Critical 9건 전수 감사 (2026-04-21 오후)
커밋 `6284913` — Explore 에이전트로 코드·SQL·설정 전수 검증:
- **S-01 JWT 만료**: Supabase 자동 관리, 자체 JWT 발급 없음 → ✅ 완료
- **S-02 Refresh Token Rotation**: `autoRefreshToken: true` 확인 → ✅ 완료
- **S-04 localStorage XSS**: UI 캐시만 저장, 토큰은 `sb-mergeui-auth` SDK 저장소 → ✅ 완료
- **S-05 Admin role 서버 검증**: API getUser + RLS `is_admin()` 다층 검증 → ✅ 완료
- **S-06 Lemonsqueezy 웹훅 서명**: HMAC-SHA256 + `crypto.timingSafeEqual` → ✅ 완료
- **S-07 결제 상태 변조 방지**: RLS로 subscriptions UPDATE 차단, 웹훅 service role만 → ✅ 완료
- **S-09 RLS 정책**: 10개 테이블 전부 RLS + 정책 다수 적용 → ✅ 완료
- **S-08 구독 만료 접근 차단** (신규): `api/v1/_lib/supabase.js`에 `hasActiveSubscription(userId)` 헬퍼 추가(status='active' + current_period_end > now()), download.js에서 호출 → ✅ 완료
- **S-10 서버 입력 검증**: 기본 필드 검증 + 문자열 정제 + SQL Injection 자동 방어 있음, 이메일 형식·배열 크기 제한 미완 → ⚠️ 부분 (Major 재분류)

→ 보안 Critical 9건 전부 해소. master-todo S-섹션 대대적 갱신.

### P-04 환불 시 라이선스 해제 추가 (2026-04-21)
커밋 `1f4556b` — `api/v1/webhooks/lemonsqueezy.js`에 2개 이벤트 추가:
- `order_refunded`: orders=refunded + license_keys=revoked + subscriptions=cancelled + profiles.plan=free + Loops 이벤트
- `subscription_payment_refunded`: 해당 주문만 refunded (부분 환불 대응)

### Critical 16건 전수 감사 (2026-04-21 오후)
Explore 에이전트 두 번째 감사 — 백엔드/결제/법적/프론트 영역:
- **B-01 ~ B-05, B-07**: ✅ 완료 (Supabase + Vercel + Express, schema.sql 10테이블, Supabase Auth PKCE, Lemon 웹훅·체크아웃·Billing Portal, download API, account.js GDPR 삭제/다운로드)
- **B-06**: ⚠️ 부분 (관리자 대시보드 UI 8개 완성, CRUD API는 Phase 5)
- **P-01 ~ P-04**: ✅ 완료 (오늘 P-04로 환불 핸들러 추가하며 전부 완료)
- **L-01 ~ L-03**: ✅ 초안 완료 (법무 검토 대기이지만 런칭엔 가능)
- **L-04**: ✅ 완료 (Supabase Auth 전적 위임, 자체 비밀번호 저장 없음)
- **F-01**: ✅ 완료 (themes/download.html 다운로드 버튼·JS·에러 처리 전부 구현)

**Critical 블로커 사실상 전부 해소** (B-06, S-10 부분완료만 남음 — 둘 다 런칭 비필수).

### 문서 정리
- `docs/agent-teams-guide.md` (426줄) 삭제 — 프로젝트와 무관한 Claude Code 일반 레퍼런스
- 남은 중복 의심 2건(`template-standard.md` vs `product-standards.md`, `saas-admin-v1-spec.md` vs `saas-admin-v1/design-system.md`)은 캡틴 판단 대기
- master-todo.md Critical 섹션 전면 재작성 (16→0(+부분2))
