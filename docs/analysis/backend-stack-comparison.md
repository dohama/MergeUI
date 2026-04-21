# MergeUi 백엔드 기술 스택 비교 리포트

> 작성: A(PM) · 2026-04-19
> 목적: `master-todo.md` B-01(서버 기술 스택 결정) 해결
> 대상 독자: 캡틴(비개발자) — 전문 용어는 괄호 안에 쉬운 설명 병기

---

## 0. 요약 (TL;DR)

- **추천안: 1안 Supabase (BaaS, Backend-as-a-Service = 백엔드 완제품 관리형 서비스)**
- 근거 3줄:
  1. 비개발자 캡틴이 대시보드에서 직접 DB·유저·파일을 관리 가능 → 운영 리스크 최저
  2. 인증·DB·파일·RLS(행 단위 권한)·Edge Function(소형 서버 로직)이 모두 포함되어 Lemonsqueezy 웹훅·GDPR 삭제 API까지 한 곳에서 구현
  3. 무료 티어(Free tier)로 런칭 가능, Pro 유저 500명 수준까지 월 $25 고정 비용
- **예상 월 비용**: 런칭~MAU 1,000명 = **$0 (Free)**, 유료 전환 안정화 단계 = **$25 (Pro)**

---

## 1. 비교 대상 3안

| 안 | 스택 | 한 줄 설명 |
|----|------|-----------|
| **1안 MVP** | **Supabase** (PostgreSQL + Auth + Storage + Edge Functions) | 백엔드 완제품 관리형 서비스. 코드 최소, 대시보드로 운영 |
| **2안 Scale-up** | **Hono + Turso + Clerk + Cloudflare Workers** | 서버리스(요청 시에만 켜지는 서버) + 분산 DB. 글로벌 초저지연 |
| **3안 Vision** | **Node.js(Fastify) + PostgreSQL(AWS RDS) + Redis + 자체 OAuth** | 풀커스텀 자체 서버. 스타트업 성장 단계용 |

> 제외한 후보와 이유
> - **Firebase**: NoSQL(문서형 DB)로 구독/결제처럼 관계형 데이터가 많은 구조에 부적합. Vendor lock-in(특정 업체 종속) 강함
> - **자체 Express + MongoDB**: 캡틴이 직접 운영 불가, 결제 데이터를 관계형 DB에 두는 것이 감사·세금 처리에 유리

---

## 2. 7대 기준 비교표

| 기준 | 1안 Supabase | 2안 Cloudflare+Turso | 3안 자체 Node+Postgres |
|------|-------------|---------------------|----------------------|
| **개발 공수**(B-01~B-07 기준) | 2~3주 | 5~6주 | 8~10주 |
| **월 고정 비용**(런칭~1천 유저) | $0 → $25 | $5 → $10 | $50 → $150 |
| **보안 기본기**(JWT·HTTPS·CORS·Rate Limit) | 내장 | 부분 내장(Clerk 사용 시) | 직접 구현 |
| **확장성**(트래픽 증가 대응) | 수직 확장(플랜 업) | 글로벌 자동 확장 | 수동 스케일링 |
| **캡틴 운영 난이도**(비개발자 기준) | ★☆☆☆☆(매우 쉬움) | ★★★☆☆(어려움) | ★★★★★(불가) |
| **Lemonsqueezy 웹훅 연동** | Edge Function으로 간단 | Workers 핸들러로 구현 | Express 라우트로 구현 |
| **GDPR(데이터 삭제·다운로드)** | RLS + SQL로 직접 구현 | Turso SQL + Workers로 구현 | 전체 직접 구현 |
| **RLS(행 단위 권한)** | 네이티브 지원 | Turso는 DB-레벨, 앱에서 강제 필요 | 앱 레벨 구현 |

---

## 3. 안별 상세

### 1안 Supabase (MVP, 추천)

**구성**
- **DB**: PostgreSQL(관계형 DB 표준) — 테이블 7종(users, subscriptions, license_keys, themes, downloads, payments, audit_logs)
- **인증**: Supabase Auth — 이메일 로그인, GitHub/Google OAuth 기본 제공, JWT 15분·Refresh 7일 설정 가능
- **파일 저장**: Supabase Storage — 테마 zip 파일 서명된 URL(시간 제한 다운로드 링크) 발급
- **서버 로직**: Edge Function(Deno 기반 소형 서버) — Lemonsqueezy 웹훅 수신·서명 검증·구독 상태 업데이트
- **RLS**: 테이블별 "본인 데이터만" 정책을 대시보드에서 SQL로 설정

**장점**
- 캡틴이 대시보드에서 **구독자·매출·파일을 직접 확인·수정** 가능(비개발자 친화)
- `master-todo.md` S-01~S-10 보안 항목 중 7개가 Supabase 기본 기능으로 해결
- api-spec.md가 이미 Supabase JWT 기반으로 작성됨 → 프론트엔드 재작업 불필요
- 무료 티어: DB 500MB, Storage 1GB, 월 50,000 MAU(월간 활성 사용자)

**단점·리스크**
- Vendor lock-in(특정 업체 종속): 이전 시 SQL은 가져가되 Auth·Storage는 재구축 필요 — 단, PostgreSQL이 표준이라 재구축 공수는 2안보다 작음
- Edge Function 콜드 스타트(처음 호출 시 지연) 0.3~0.5초 — 웹훅은 허용 범위, 일반 API는 영향 미미

**월 비용 세부**
| MAU(월간 활성 사용자) | DB 용량 | 플랜 | 월 비용 |
|--------|---------|------|--------|
| ~10,000 | <500MB | Free | $0 |
| ~100,000 | <8GB | Pro | $25 |
| 100,000+ | 커스텀 | Team | $599+ |

> **결제 처리 주체**: Lemonsqueezy가 Merchant of Record(판매 책임자)로서 EU VAT/US Sales Tax 자동 처리. Supabase는 구독 상태 저장·검증만 담당.

---

### 2안 Cloudflare Workers + Turso + Hono + Clerk (Scale-up)

**구성**
- **DB**: Turso(분산 SQLite, 전 세계 엣지에 복제) — 글로벌 읽기 지연 <50ms
- **서버**: Cloudflare Workers(요청 시에만 실행되는 서버리스) + Hono(경량 웹 프레임워크)
- **인증**: Clerk(SaaS 인증 서비스)
- **파일 저장**: Cloudflare R2(S3 호환 객체 스토리지, egress 비용 $0)

**장점**
- 글로벌 타겟에 최적화 — 미국·EU·아시아 방문자 모두 <100ms 응답
- Egress(데이터 전송) 무료 → 테마 zip 대용량 다운로드에 유리
- 확장성 사실상 무제한, 트래픽 급증에 자동 대응

**단점**
- 캡틴이 DB·유저·파일을 **4개 콘솔(Cloudflare, Turso, Clerk, R2)을 오가며 확인**해야 함
- RLS가 네이티브 지원되지 않아 앱 레벨에서 권한 강제 필요 → 보안 버그 위험 증가
- 개발자 의존도 높음, Edge Function 디버깅(오류 추적) 난이도 상승
- 초기 학습 곡선 큼 — B-01~B-07 완료까지 5~6주

**월 비용 세부**
| 구성 요소 | 무료 한도 | 유료 진입 |
|----------|----------|----------|
| Cloudflare Workers | 10만 req/일 | $5/월 |
| Turso | 500 DB, 9GB | $29/월 |
| Clerk | 10,000 MAU | $25/월 |
| R2 Storage | 10GB | $0.015/GB |

**권장 시점**: MAU 10,000명 돌파 후 비용 최적화·글로벌 지연 개선이 필요할 때

---

### 3안 자체 Node.js + PostgreSQL + AWS (Vision)

**구성**
- **서버**: Node.js + Fastify(고성능 웹 프레임워크) / TypeScript
- **DB**: AWS RDS PostgreSQL(관리형 DB) + Redis(캐시·세션)
- **인증**: Passport.js로 직접 OAuth 구현
- **파일 저장**: AWS S3 + CloudFront CDN
- **배포**: AWS ECS(Docker 컨테이너 오케스트레이션) 또는 Fly.io

**장점**
- 100% 커스터마이징 가능, Vendor lock-in 없음
- 기업 고객(Team 플랜) 대응 시 SLA(서비스 보장 계약)·보안 감사 요구 충족 용이
- 대규모 트래픽에서 비용 효율 최고(단, MAU 10만 이상 기준)

**단점**
- **캡틴이 직접 운영 불가** — 개발자 채용 또는 외주 상시 필요
- CI/CD(자동 배포), 모니터링(Datadog 등), 백업, 장애 대응 모두 직접 구축
- 초기 3개월 집중 개발 + 월 유지보수 공수 발생
- 런칭 전 투자 대비 수익 대기 기간이 가장 김

**월 비용 세부(최소 구성)**
- RDS db.t4g.micro: $15
- Redis ElastiCache t4g.micro: $12
- ECS Fargate(1 task): $15
- S3 + CloudFront(1TB): $90
- 도메인·SSL·모니터링: $20
- **합계 약 $150/월(트래픽 無)** + 개발자 인건비

**권장 시점**: MergeUi가 ARR(연간 반복 매출) $500K 돌파 후 엔터프라이즈 고객 확보 단계

---

## 4. MergeUi 상황 적합도 점수 (100점 만점)

| 기준(가중치) | 1안 Supabase | 2안 CF+Turso | 3안 자체 서버 |
|-------------|-------------|--------------|-------------|
| 캡틴 운영 가능성(30) | 30 | 10 | 0 |
| 런칭 속도(25) | 25 | 15 | 5 |
| 초기 비용(20) | 20 | 15 | 5 |
| 보안·GDPR 기본기(15) | 13 | 10 | 10 |
| 확장성(10) | 7 | 10 | 10 |
| **합계** | **95** | **60** | **30** |

---

## 5. 추천: 1안 Supabase

### 근거 요약
1. **비개발자 캡틴**: Supabase 대시보드가 가장 직관적(구글 시트 수준의 테이블 편집, 유저 관리 UI)
2. **초기 매출 낮음**: 무료 티어로 Pro 플랜 구독자 500명까지 월 $0 가능. 수익이 쌓이면 Pro($25) 업그레이드
3. **글로벌 타겟**: Supabase는 AWS 리전 선택 가능(us-east-1, eu-west-1 등) → 런칭 시 us-east-1, 이후 Read Replica(읽기 전용 복제본) 추가로 지연 개선
4. **Lemonsqueezy 연동 준비 완료**: 웹훅 HMAC 서명 검증 Edge Function 예제 다수, Lemonsqueezy 공식 Supabase 템플릿 존재
5. **GDPR 대응**: RLS로 본인 데이터만 접근 강제, 삭제·다운로드 API는 Edge Function + SQL로 3일 내 구현 가능
6. **기존 자산 재사용**: `api-spec.md`가 이미 Supabase JWT 기반으로 설계되어 프론트엔드 재작업 불필요

### 단, 반드시 지켜야 할 안전장치
- RLS(행 단위 권한)를 **모든 테이블에 예외 없이** 활성화 — D(백엔드)가 S-09 항목으로 관리
- OAuth 콜백 URL 화이트리스트 설정 — S-03
- Lemonsqueezy 웹훅 서명 검증 필수 — S-06
- 서비스 키(service_role)는 서버 측 Edge Function에서만 사용, 프론트 노출 금지

---

## 6. 예상 개발 일정 (1안 기준)

| 주차 | 작업 | 산출물 | 담당 |
|------|------|--------|------|
| Week 1 (4.20~4.26) | Supabase 프로젝트 생성, DB 스키마 설계·마이그레이션, RLS 정책 초안 | B-02, S-09 완료 | D |
| Week 2 (4.27~5.3) | Auth 연동(이메일·GitHub·Google), JWT TTL 설정, Refresh Rotation, 프론트 Auth SDK 전환 | B-03, S-01~S-04 완료 | D + C |
| Week 3 (5.4~5.10) | Lemonsqueezy 웹훅 Edge Function, 구독 상태 동기화, RLS로 결제 변조 차단 | B-04, S-06~S-08 완료 | D |
| Week 4 (5.11~5.17) | Storage 세팅, 다운로드 API(서명된 URL), 다운로드 기록 저장, 다운로드 페이지 연동 | B-05 완료 | D + C |
| Week 5 (5.18~5.24) | GDPR 삭제·다운로드 API, 쿠키 배너 백엔드 연동, settings 페이지 연결 | B-07, L-01~L-04 완료 | D + C |
| Week 6 (5.25~5.31) | E(QA) 합동 검증, 보안 침투 테스트, 결제 5시나리오 E2E | QA 리포트 | E + D + C |

> **총 소요**: 약 6주(42일). 개발자(D) 전담, 프론트(C)는 Week 2·4·5에 연동 작업

### 런칭 연기 최소화를 위한 우선순위
- **Critical 경로**: Week 1~3(DB + Auth + 결제) 완료 시 베타 런칭 가능
- **GDPR(Week 5)**: 런칭 전 반드시 완료 — 미구현 시 과징금 매출 4% 리스크
- **관리자 API(B-06)**: Phase 5로 연기 가능

---

## 7. 리스크 & 대응

| 리스크 | 확률 | 영향 | 대응 |
|-------|------|------|------|
| Supabase 장애(연간 가동률 99.9% 공시) | 낮음 | 서비스 중단 | Status Page 모니터링, 장애 시 공지 페이지(maintenance.html) |
| 무료 티어 한도 초과 | 중간 | 일시 중단 후 Pro 전환 필요 | 사용량 80% 시 알림, 성장 지표 확인 후 사전 업그레이드 |
| Vendor lock-in | 중간 | 향후 마이그레이션 비용 | PostgreSQL 표준 사용, ORM(Drizzle/Prisma)로 앱 코드 Supabase 의존 최소화 |
| RLS 정책 설정 실수 | 낮음 | 타 사용자 데이터 노출 | E(QA)가 권한 테스트 필수, 정기 감사 |

---

## 8. 캡틴 결정 요청 사항

- [ ] **1안 Supabase로 확정** → D가 4/20부터 Week 1 착수
- [ ] 2안·3안 추가 검토 필요
- [ ] 하이브리드(예: Supabase + Cloudflare R2 파일 저장) 검토

---

> 이 문서는 결정 시점(2026-04-19)의 정보 기준이며, 서비스 요금·기능은 각 공급사 공식 페이지에서 최종 확인 후 계약하시기 바랍니다.
