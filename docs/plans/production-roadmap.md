# MergeUi 실제 서비스 오픈 로드맵

> 작성: 에이전트 A (시니어 PM) | 최초 2026-04-12 | 최종 업데이트 2026-04-20
> 목적: 아이디어에서 실제 수익 발생까지의 전체 액션 플랜 및 기술 가이드
>
> **본 문서의 범위**: 전체 로드맵 + 기술 가이드(인프라, DB 설계, 결제 연동 절차, 비용 계산)
> **실시간 진행상황/TODO**: [master-todo.md](./master-todo.md) 참조
> **과거 진행 기록 + 캡틴 결정사항**: [project-history.md](./project-history.md) 참조

---

## Phase 0: 사전 준비 (Week 0) -- 즉시 실행

### 법적 준비
| 작업 | 설명 | 우선순위 |
|------|------|---------|
| 사업자 등록 | 온라인 통신판매업 (해외 결제 수취 시 필수) | 필수 |
| 이용약관 작성 | 서비스 이용 조건, 라이선스 범위, 면책 조항 | 필수 |
| 개인정보처리방침 | GDPR(유럽 개인정보 보호법) + 국내 개인정보보호법 대응 | 필수 |
| 환불정책 | Lemonsqueezy 정책과 연동, 구독 취소/환불 기준 명시 | 필수 |
| 라이선스 정의 | 개인용/상업용/팀용 사용 범위 명확화 | 필수 |

> 법적 문서는 템플릿 기반으로 초안 작성 후 법률 전문가 검토 권장. 비용: 약 50~100만원

### 도메인/브랜드
| 작업 | 설명 |
|------|------|
| 도메인 구매 | mergeui.com (또는 유사 도메인) |
| 이메일 설정 | support@mergeui.com, team@mergeui.com |
| SNS 계정 확보 | Twitter(X), GitHub Organization, Dev.to |

---

## Phase 1: 기술 기반 구축 (Week 1~2)

### 1-1. 호스팅/인프라 결정

**3안 제안:**

| | 1안: MVP | 2안: Scale-up | 3안: Vision |
|--|---------|--------------|-------------|
| 프론트 호스팅 | Vercel (무료~$20/월) | Vercel Pro ($20/월) | Vercel Enterprise |
| 백엔드 | Supabase 무료 티어 | Supabase Pro ($25/월) | 자체 서버 (AWS/GCP) |
| DB | Supabase PostgreSQL | Supabase PostgreSQL | 자체 PostgreSQL |
| CDN | Vercel 내장 CDN | Cloudflare ($0~20/월) | Cloudflare Pro |
| 파일 저장 | Supabase Storage | Supabase Storage | AWS S3 |
| 월 비용 | $0~20 | $45~65 | $100~300+ |

**권장: 1안(MVP)으로 시작 --> 구독자 100명 돌파 시 2안 전환**

> Supabase를 권장하는 이유: PostgreSQL DB + 인증 + 파일 저장 + API를 한 곳에서 해결. 초기에 관리해야 할 서비스 수를 최소화합니다.

### 1-2. 보안 체계

| 항목 | 구현 방법 | 담당 |
|------|----------|------|
| HTTPS | Vercel 자동 SSL 인증서 | 자동 |
| 비밀번호 암호화 | bcrypt 해싱 (최소 12 라운드) | D(백엔드) |
| CORS 설정 | 허용 도메인 화이트리스트 (mergeui.com만) | D |
| CSRF 방어 | SameSite 쿠키 + CSRF 토큰 | D |
| XSS 방지 | 입력값 새니타이즈(정화) + CSP 헤더 설정 | D, C |
| SQL Injection | Supabase ORM 사용 (파라미터 바인딩) | D |
| Rate Limiting | API 요청 제한 (IP당 100회/분) | D |
| 환경변수 관리 | 모든 시크릿은 .env 파일, 코드에 절대 직접 입력 금지 | 전원 |
| 입력 검증 | 서버 측 유효성 검사 필수 (클라이언트만 믿지 않기) | D |

### 1-3. 인증 시스템

| 항목 | 구현 방법 |
|------|----------|
| GitHub OAuth | Supabase Auth에 내장된 GitHub 프로바이더 사용 |
| Google OAuth | Supabase Auth에 내장된 Google 프로바이더 사용 |
| 이메일/비밀번호 | Supabase Auth 이메일 인증 |
| JWT 관리 | Supabase가 자동 처리 (Access Token + Refresh Token) |
| 세션 유지 | Supabase 클라이언트 SDK가 자동 갱신 |

**실제 연동 절차 (GitHub OAuth 예시):**
1. GitHub Developer Settings에서 OAuth App 생성
2. Client ID, Client Secret 발급
3. Supabase 대시보드 --> Authentication --> Providers --> GitHub 활성화
4. Client ID, Secret 입력
5. 콜백 URL: `https://[프로젝트].supabase.co/auth/v1/callback`
6. 프론트엔드에서 `supabase.auth.signInWithOAuth({ provider: 'github' })` 호출

### 1-4. DB 설계 (Supabase PostgreSQL)

**핵심 테이블:**

| 테이블 | 주요 컬럼 | 설명 |
|--------|----------|------|
| users | id, email, name, avatar_url, github_id, google_id, created_at | Supabase Auth와 연동 |
| subscriptions | id, user_id, plan(free/pro/team), status, lemon_subscription_id, current_period_end | 구독 상태 |
| license_keys | id, user_id, key, status(active/revoked), created_at | 라이선스 키 |
| themes | id, slug, name, version, description, preview_url, is_public | 테마 메타데이터 |
| components | id, theme_id, name, category, code_html, code_css | 컴포넌트 |
| downloads | id, user_id, theme_id, version, downloaded_at | 다운로드 이력 |
| payments | id, user_id, lemon_order_id, amount, currency, status, created_at | 결제 내역 |

**RLS(Row Level Security, 행 단위 보안):**
- users: 본인 데이터만 읽기/수정 가능
- subscriptions: 본인 구독만 조회 가능
- downloads: 본인 다운로드 이력만 조회 가능
- themes/components: 공개 테마는 누구나 조회, 비공개는 유료 구독자만

---

## Phase 2: 첫 제품 제작 (Week 3~5)

### 2-1. 디자인 시스템 구축 (B 담당)
- 컬러 토큰 (라이트/다크)
- 타이포그래피 스케일
- 간격 스케일 (8px 그리드)
- 컴포넌트 디자인 스펙

### 2-2. 첫 대시보드 테마 (A 기획 --> B 디자인 --> C 구현)
- 타겟: SaaS 어드민 대시보드 (가장 수요가 많은 카테고리)
- 포함 컴포넌트: 사이드바, 탑바, 통계 카드 4개, 라인 차트, 바 차트, 데이터 테이블, 최근 활동 리스트
- 라이트/다크 모드 완전 지원
- 반응형 3단계 (데스크톱/태블릿/모바일)

### 2-3. 핵심 컴포넌트 (B 디자인 --> C 구현)
- 차트 5종 (라인, 바, 파이, 도넛, 에리어)
- 데이터 테이블 (정렬, 필터, 페이지네이션)
- 통계 카드 (숫자 + 트렌드 화살표)
- 폼 요소 (입력, 선택, 체크박스, 토글)
- 모달, 알림(Toast), 뱃지

### 2-4. QA (E 담당)
- 15점 체크리스트 실행
- 크로스 브라우저 테스트
- 접근성 검증

---

## Phase 3: 결제 시스템 (Week 6~7)

### 3-1. Lemonsqueezy 연동

**실제 연동 절차:**

1. **Lemonsqueezy 계정 생성** (lemonsqueezy.com)
   - 스토어 생성
   - 결제 수취 정보 입력 (은행 계좌 또는 PayPal)

2. **상품 생성**
   - Product: "MergeUi Dashboard Kit"
   - Variant 1: "Pro Monthly" - $19/월
   - Variant 2: "Pro Yearly" - $149/년 (연 $79 절약)
   - Variant 3: "Team Monthly" - $49/월
   - Variant 4: "Team Yearly" - $399/년

3. **웹훅 설정**
   - Lemonsqueezy 대시보드 --> Settings --> Webhooks
   - 엔드포인트: `https://mergeui.com/api/webhooks/lemonsqueezy`
   - 수신할 이벤트:
     - `subscription_created` (신규 구독)
     - `subscription_updated` (플랜 변경)
     - `subscription_cancelled` (구독 취소)
     - `subscription_payment_success` (결제 성공)
     - `subscription_payment_failed` (결제 실패)
   - Signing Secret을 .env에 저장

4. **웹훅 처리 로직 (D 담당)**
   - 웹훅 서명 검증 (보안)
   - 이벤트별 DB 업데이트
   - 구독 생성 시 --> subscriptions 테이블 insert + license_keys 생성
   - 구독 취소 시 --> status를 'cancelled'로 변경, 현재 기간 끝까지 접근 유지
   - 결제 실패 시 --> 이메일 알림 발송

5. **프론트 결제 UI (C 담당)**
   - Lemonsqueezy Checkout Overlay 사용 (가장 간단)
   - 또는 Hosted Checkout URL로 리다이렉트

### 3-2. 다운로드 시스템

| 항목 | 구현 |
|------|------|
| 다운로드 권한 확인 | API에서 구독 상태 + 라이선스 키 검증 |
| 파일 제공 | Supabase Storage에서 서명된 URL(일정 시간만 유효한 링크) 생성 |
| 다운로드 기록 | downloads 테이블에 로깅 |
| 버전 관리 | 테마별 버전 폴더 구조로 관리 |

---

## Phase 4: 랜딩페이지 + 마케팅 (Week 7~8)

### 4-1. 랜딩페이지 (F 기획 --> B 디자인 --> C 구현)

**필수 섹션:**
1. Hero: 핵심 가치 제안 + CTA(행동 유도 버튼) + 라이브 데모 버튼
2. 라이브 미리보기: 실제 대시보드를 iframe으로 보여주기
3. 컴포넌트 쇼케이스: 주요 컴포넌트 갤러리
4. 가격표: Free / Pro / Team 비교
5. FAQ: 자주 묻는 질문
6. 소셜 프루프(사회적 증거): 사용 후기, GitHub 스타 수 (초기에는 생략 가능)

**SEO 필수:**
- title: "MergeUi - Premium Dashboard Templates for Developers"
- meta description: 80~120자
- OG 태그: 소셜 공유 시 미리보기 이미지
- 시맨틱 HTML: h1~h6 계층 구조

### 4-2. 마케팅 채널

| 채널 | 액션 | 시기 | 비용 |
|------|------|------|------|
| Product Hunt | 런칭 포스트 준비 (스크린샷, GIF, 설명) | 런칭 D-Day | 무료 |
| Twitter(X) | 개발 과정 공유, 빌드인퍼블릭(공개 개발) | 즉시 시작 | 무료 |
| Dev.to | "I built a dashboard template kit" 글 작성 | 런칭 전후 | 무료 |
| Reddit | r/webdev, r/SideProject에 공유 | 런칭 후 | 무료 |
| GitHub | README에 라이브 데모 링크, 무료 컴포넌트 공개 | 즉시 | 무료 |
| SEO | 블로그 포스트 ("Best dashboard templates 2026" 등) | 런칭 후 | 무료 |
| 뉴스레터 | 업데이트 알림, 새 테마 소식 | 구독자 확보 후 | 무료~$29/월 |

---

## Phase 5: 런칭 전 최종 점검 (Week 9)

### 체크리스트

**기능 점검:**
- [ ] 회원가입 (이메일 + GitHub + Google) 정상 작동
- [ ] 로그인/로그아웃 정상
- [ ] Free 플랜 기능 제한 정상 작동
- [ ] Pro 구독 결제 --> 라이선스 발급 --> 다운로드 가능 확인
- [ ] 구독 취소 --> 현재 기간 끝까지 접근 유지 확인
- [ ] 결제 실패 시 적절한 에러 메시지
- [ ] 테마 다운로드 ZIP 파일 정상
- [ ] 다운로드한 테마가 5분 내에 적용 가능한지 확인

**보안 점검:**
- [ ] HTTPS 정상 (SSL 인증서)
- [ ] CORS 설정 (허용 도메인만)
- [ ] Rate Limiting 작동
- [ ] XSS 방어 확인
- [ ] SQL Injection 방어 확인
- [ ] 환경변수에 시크릿이 잘 분리되어 있는지

**법적 점검:**
- [ ] 이용약관 페이지 접근 가능
- [ ] 개인정보처리방침 페이지 접근 가능
- [ ] 환불정책 명시
- [ ] 라이선스 조건 명시
- [ ] 쿠키 동의 배너 (GDPR 대응)

**성능 점검:**
- [ ] Lighthouse Performance 90+
- [ ] FCP(첫 콘텐츠가 화면에 표시되는 시간) 1.5초 이내
- [ ] API 응답 200ms 이내

---

## Phase 6: 런칭 (Week 10)

### 런칭 당일 액션

1. **오전**: 최종 배포 + 모니터링 시작
2. **Product Hunt 게시**: 미리 준비한 포스트 발행
3. **SNS 동시 게시**: Twitter, Dev.to, Reddit
4. **모니터링**: 서버 상태, 에러 로그, 결제 흐름 실시간 확인
5. **문의 대응**: 실시간 피드백 대응 체계 가동

### 런칭 후 1주일

- 매일 지표 확인: 방문자 수, 가입 수, 구독 전환율
- 버그 리포트 즉시 대응
- Product Hunt 댓글 응대
- 사용자 피드백 수집 --> 다음 업데이트 반영

---

## Phase 7: 성장 (Week 11~)

### 월간 루틴

| 작업 | 주기 | 담당 |
|------|------|------|
| 신규 대시보드 테마 1개 추가 | 매월 | A-->B-->C-->E |
| 신규 컴포넌트 3~5개 추가 | 매월 | B-->C-->E |
| 버그 수정 및 개선 | 매주 | C, D, E |
| 구독자 피드백 분석 | 매주 | F, A |
| 비즈니스 지표 리뷰 | 매주 | A |
| SEO 콘텐츠 (블로그) | 격주 | F |
| 뉴스레터 발송 | 매월 | F |

### 핵심 비즈니스 지표 (KPI)

| 지표 | 설명 | 목표 (6개월) |
|------|------|-------------|
| MRR (월간 반복 매출) | 매월 들어오는 구독 수입 | $3,000 (약 400만원) |
| 구독자 수 | 유료 구독자 | 150명 |
| Churn Rate (이탈률) | 매월 구독 취소 비율 | 5% 이하 |
| 전환율 | Free-->Pro 전환 비율 | 5~10% |
| CAC (고객 획득 비용) | 1명의 유료 구독자를 얻는 데 드는 비용 | 초기에는 $0 (오가닉 마케팅) |
| NPS (순추천지수) | 구독자 만족도 (-100~100) | 50 이상 |

---

## 비용 요약

### 초기 비용 (런칭까지)

| 항목 | 비용 | 비고 |
|------|------|------|
| 도메인 | ~$15/년 | .com 기준 |
| 호스팅 (Vercel) | $0~20/월 | 무료 티어로 시작 |
| DB (Supabase) | $0/월 | 무료 티어 (500MB, 50,000행) |
| Lemonsqueezy | 매출의 5% + $0.50/건 | 판매 시에만 수수료 |
| 법률 검토 | ~100만원 | 일회성, 선택 사항 |
| **월 고정비** | **$0~20** | **MVP 기준** |

### 손익분기점 (BEP)

- 월 고정비가 거의 $0이므로, Lemonsqueezy 수수료만 고려
- Pro $19/월 기준: 수수료 $1.45/건 --> 순수익 $17.55/건
- **유료 구독자 10명이면 월 $175 순수익**
- **50명이면 월 $877**
- **150명이면 월 $2,632**

> 초기 비용이 극히 낮기 때문에 리스크가 매우 작은 프로젝트입니다. 핵심은 "좋은 제품을 만들어서 개발자들의 입소문을 타는 것"입니다.

---

## 우선순위 총정리

| 순위 | 작업 | 이유 |
|------|------|------|
| 1 | 첫 대시보드 테마 완성 | 팔 물건이 없으면 사업이 아님 |
| 2 | 랜딩페이지 + 라이브 데모 | 제품을 보여줄 곳이 필요 |
| 3 | 결제 시스템 (Lemonsqueezy) | 돈을 받을 수 있어야 함 |
| 4 | 인증 시스템 (GitHub/Google OAuth) | 구독자 관리의 기본 |
| 5 | 법적 문서 (이용약관, 개인정보) | 서비스 운영의 법적 기반 |
| 6 | Product Hunt 런칭 | 첫 번째 트래픽 폭발 |
| 7 | 두 번째 테마 + 컴포넌트 확장 | 구독 가치 증명 |
| 8 | 관리자 페이지 | 구독자 100명 이후에 |
| 9 | 정성 분석 (Hotjar 스타일) | 구독자 500명 이후에 |

---

## 출처

- [Lemonsqueezy SaaS 구독 설정 가이드](https://docs.lemonsqueezy.com/guides/tutorials/saas-subscription-plans)
- [Lemonsqueezy Next.js 빌링 튜토리얼](https://docs.lemonsqueezy.com/guides/tutorials/nextjs-saas-billing)
- [Supabase 인증 문서](https://supabase.com/docs/guides/auth)
- [Vercel 배포 문서](https://vercel.com/docs)
