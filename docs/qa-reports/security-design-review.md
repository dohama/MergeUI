# MergeUi 보안 설계 검토 체크리스트

> E(QA) 작성 | 2026-04-16
> D(백엔드)가 구현 전에 설계 단계에서 검증할 보안 항목

---

## 인증/인가 (Authentication/Authorization)

| # | 항목 | 검증 기준 | 통과 조건 | 리스크 |
|---|------|----------|----------|--------|
| A-1 | JWT 만료 시간 | Supabase Auth 기본 JWT TTL 확인 | Access Token 15분 이하, Refresh Token 7일 이하 | **Critical** |
| A-2 | Refresh Token Rotation | Refresh 사용 시 이전 토큰 무효화 | Supabase 설정에서 rotation 활성화 확인 | **Critical** |
| A-3 | OAuth 콜백 URL 화이트리스트 | Supabase 대시보드에서 허용 URL만 등록 | 프로덕션 도메인 + localhost(개발용만) | **Critical** |
| A-4 | 세션 저장 방식 | 현재 localStorage 사용 중 (XSS 취약) | Supabase Auth SDK의 기본 세션 관리 사용 | **Critical** |
| A-5 | admin role 서버 측 검증 | 현재 클라이언트에서만 localStorage 체크 | RLS 또는 미들웨어에서 role 검증. 클라이언트 체크는 UX용만 | **Critical** |
| A-6 | 비밀번호 정책 | Supabase Auth 기본 설정 확인 | 최소 8자, 영문+숫자 조합 | **Major** |
| A-7 | 이메일 인증 강제 | 미인증 사용자의 접근 범위 제한 | email_confirmed_at 없으면 구독/결제 차단 | **Major** |

## 결제/구독 (Payment/Subscription)

| # | 항목 | 검증 기준 | 통과 조건 | 리스크 |
|---|------|----------|----------|--------|
| P-1 | 웹훅 서명 검증 | Lemonsqueezy HMAC 서명 검증 | 모든 웹훅 요청에서 X-Signature 헤더 검증. 실패 시 400 반환 | **Critical** |
| P-2 | 결제 상태 클라이언트 변조 방지 | plan/status를 클라이언트에서 변경 불가 | RLS로 subscriptions UPDATE 차단. 웹훅에서만 변경 | **Critical** |
| P-3 | 구독 만료 후 접근 차단 | expires_at 이후 유료 리소스 차단 | 다운로드 API에서 서버 측 expires_at 체크 | **Critical** |
| P-4 | 중복 결제 방지 | 동일 사용자의 동시 결제 요청 | 이미 활성 구독이면 checkout 차단 | **Major** |
| P-5 | 환불 시 라이선스 해제 | refund 웹훅 수신 시 처리 | license_keys.status를 revoked로 변경 | **Major** |

## 데이터 보안 (Data Security)

| # | 항목 | 검증 기준 | 통과 조건 | 리스크 |
|---|------|----------|----------|--------|
| D-1 | RLS 정책 | 모든 테이블에 RLS 활성화 | 본인 데이터만 접근. 관리자는 service_role key로만 | **Critical** |
| D-2 | 서버 측 입력 검증 | 모든 입력 검증 | 이메일 형식, 문자열 길이, 숫자 범위. 클라이언트 검증은 UX용만 | **Critical** |
| D-3 | SQL Injection 방어 | Supabase JS SDK 사용 확인 | 직접 SQL 문자열 결합 금지 | **Critical** |
| D-4 | XSS 방지 | CSP 헤더 설정 | script-src 'self'; 사용자 입력 HTML 이스케이프 | **Critical** |
| D-5 | CSRF 방어 | SameSite 쿠키 + Origin 체크 | SameSite=Lax 이상. 상태 변경 API에 Origin 검증 | **Major** |
| D-6 | Rate Limiting | API 요청 제한 | 인증: IP당 10회/분. 일반: 100회/분. 다운로드: 사용자당 30회/시간 | **Major** |
| D-7 | CORS 화이트리스트 | 허용 도메인만 접근 | mergeui.com + localhost:3000(개발). 와일드카드(*) 금지 | **Major** |

## 파일/다운로드 (File/Download)

| # | 항목 | 검증 기준 | 통과 조건 | 리스크 |
|---|------|----------|----------|--------|
| F-1 | 서명된 URL 사용 | Supabase Storage signed URL | 직접 Storage URL 노출 금지 | **Critical** |
| F-2 | URL 만료 시간 | signed URL TTL | 최대 5분. 재다운로드 시 새 URL 발급 | **Major** |
| F-3 | 다운로드 권한 서버 검증 | 구독 상태 확인 후 URL 발급 | active 구독 + expires_at 미경과 확인 | **Critical** |

---

## 요약: Critical 10건, Major 7건
