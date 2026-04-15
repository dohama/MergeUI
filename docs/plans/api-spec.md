# MergeUi API 스펙 v1

> D(백엔드) 작성 | 2026-04-16
> 기존 서버 코드(server/) 기반 문서화
> C(프론트)가 mock 데이터로 병렬 작업할 수 있도록 요청/응답 스펙 정의

---

## 기본 정보

- **Base URL**: `/api/v1`
- **인증**: Bearer Token (Supabase JWT) — `Authorization: Bearer <access_token>`
- **응답 형식**: JSON
- **Rate Limit**: IP당 100회/분

---

## 1. 인증 (Auth)

### POST `/api/v1/auth/signup` — 이메일 회원가입
- **인증**: public
- **Request Body**:
```json
{ "email": "user@example.com", "password": "min8chars", "name": "홍길동" }
```
- **Response 201**:
```json
{ "user": { "id": "uuid", "email": "user@example.com" } }
```
- **에러**: 400 (이메일/비밀번호 누락, 비밀번호 8자 미만)

### POST `/api/v1/auth/login` — 이메일 로그인
- **인증**: public
- **Request Body**:
```json
{ "email": "user@example.com", "password": "password123" }
```
- **Response 200**:
```json
{
  "session": {
    "access_token": "jwt...",
    "refresh_token": "refresh...",
    "expires_at": 1718000000
  },
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "홍길동",
    "role": "subscriber",
    "plan": "free",
    "avatar_url": ""
  }
}
```
- **에러**: 401 (잘못된 이메일/비밀번호)

### POST `/api/v1/auth/logout` — 로그아웃
- **인증**: auth (선택적)
- **Response 200**: `{ "message": "Logged out" }`

### POST `/api/v1/auth/forgot-password` — 비밀번호 찾기
- **인증**: public
- **Request Body**: `{ "email": "user@example.com" }`
- **Response 200**: `{ "message": "Password reset email sent" }`

### GET `/api/v1/auth/me` — 현재 사용자 정보
- **인증**: auth
- **Response 200**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "홍길동",
    "role": "subscriber",
    "plan": "pro",
    "avatar_url": "https://...",
    "created_at": "2026-04-01T00:00:00Z",
    "updated_at": "2026-04-15T00:00:00Z"
  }
}
```
- **에러**: 401 (토큰 없음/만료)

---

## 2. 테마 (Themes)

### GET `/api/v1/themes` — 테마 목록
- **인증**: public
- **Query Params**: `category`, `badge` (free/pro/new), `sort` (popular/latest)
- **Response 200**:
```json
{
  "themes": [
    {
      "id": "uuid",
      "slug": "pulse-admin",
      "name": "Pulse Admin",
      "description": "SaaS 어드민 대시보드",
      "category": "admin",
      "tags": ["saas", "analytics"],
      "version": "1.0.0",
      "badge": "pro",
      "components_count": 25,
      "pages_count": 4,
      "downloads_count": 150,
      "is_public": true,
      "preview_url": "/themes/pulse-admin/preview",
      "file_size": "2.4 MB",
      "created_at": "2026-04-01T00:00:00Z"
    }
  ]
}
```

### GET `/api/v1/themes/:slug` — 테마 상세
- **인증**: public
- **Response 200**: `{ "theme": { ... } }` (위와 동일 구조)
- **에러**: 404

### POST `/api/v1/themes/:slug/download` — 테마 다운로드
- **인증**: auth (Pro 이상)
- **Request Body**: `{ "package": "full" }` (optional)
- **Response 200**:
```json
{
  "download_url": "/downloads/pulse-admin-v1.0.0.zip",
  "theme": { "id": "uuid", "slug": "pulse-admin", "name": "Pulse Admin", "version": "1.0.0", "file_size": "2.4 MB" }
}
```
- **에러**: 403 (Free 사용자), 404 (테마 없음)

---

## 3. 컴포넌트 (Components)

### GET `/api/v1/components` — 컴포넌트 목록
- **인증**: public
- **Query Params**: `category`
- **Response 200**:
```json
{
  "components": [
    {
      "id": "uuid",
      "slug": "stat-card",
      "name": "Stat Card",
      "description": "KPI 통계 카드",
      "category": "cards",
      "version": "1.0.0",
      "badge": "free",
      "preview_html": "<div>...</div>"
    }
  ]
}
```

### GET `/api/v1/components/:slug` — 컴포넌트 상세
- **인증**: public (Pro 컴포넌트의 코드는 인증 필요)
- **Response 200**:
```json
{
  "component": {
    "id": "uuid",
    "slug": "stat-card",
    "name": "Stat Card",
    "description": "...",
    "category": "cards",
    "code_html": "<div>...</div>",
    "code_css": ".stat-card { ... }",
    "preview_html": "...",
    "badge": "free"
  }
}
```
- **참고**: Pro 컴포넌트는 Free/비로그인 사용자에게 `code_html`, `code_css`가 null로 반환

---

## 4. 다운로드 이력 (Downloads)

### GET `/api/v1/downloads` — 내 다운로드 이력
- **인증**: auth
- **Response 200**:
```json
{
  "downloads": [
    {
      "id": "uuid",
      "version": "1.0.0",
      "package_type": "full",
      "downloaded_at": "2026-04-15T10:00:00Z",
      "themes": { "name": "Pulse Admin", "slug": "pulse-admin", "version": "1.0.0" },
      "components": null
    }
  ],
  "stats": { "total": 12, "this_month": 3 }
}
```

---

## 5. 문의 (Inquiries)

### POST `/api/v1/inquiries` — 문의 접수
- **인증**: public
- **Request Body**:
```json
{
  "name": "홍길동",
  "email": "user@example.com",
  "category": "billing",
  "subject": "결제 관련 질문",
  "message": "Pro 플랜 환불이 가능한가요?"
}
```
- **Response 201**:
```json
{ "inquiry": { "id": "uuid" }, "message": "Inquiry submitted successfully" }
```
- **에러**: 400 (name, email, message 필수)

---

## 6. 관리자 (Admin) — 모든 엔드포인트 admin 권한 필요

### GET `/api/v1/admin/stats` — 대시보드 KPI
- **Response 200**:
```json
{
  "mrr": 2847,
  "total_revenue": 15420.00,
  "active_subscribers": 150,
  "total_users": 430,
  "open_inquiries": 5
}
```

### GET `/api/v1/admin/subscribers` — 구독자 목록
- **Query Params**: `page`, `limit`, `plan`, `search`
- **Response 200**:
```json
{
  "subscribers": [
    {
      "id": "uuid", "email": "...", "name": "...", "plan": "pro", "created_at": "...",
      "subscriptions": [{ "plan": "pro", "status": "active", "current_period_end": "..." }]
    }
  ],
  "total": 150, "page": 1, "limit": 10
}
```

### GET `/api/v1/admin/orders` — 주문 목록
- **Query Params**: `page`, `limit`
- **Response 200**:
```json
{
  "orders": [
    {
      "id": "uuid", "lemon_order_id": "...", "plan": "pro", "amount": 19.00,
      "currency": "USD", "status": "paid", "created_at": "...",
      "profiles": { "name": "...", "email": "..." }
    }
  ],
  "total": 45
}
```

### GET `/api/v1/admin/themes` — 테마 관리 목록
- **Response 200**: `{ "themes": [...] }`

### POST `/api/v1/admin/themes` — 테마 추가
- **Request Body**: 테마 필드 전체
- **Response 201**: `{ "theme": { ... } }`

### PUT `/api/v1/admin/themes/:id` — 테마 수정
- **Request Body**: 수정할 필드
- **Response 200**: `{ "theme": { ... } }`

### DELETE `/api/v1/admin/themes/:id` — 테마 삭제
- **Response 200**: `{ "message": "Theme deleted" }`

### GET `/api/v1/admin/inquiries` — 문의 목록
- **Query Params**: `status` (open/replied/closed)
- **Response 200**: `{ "inquiries": [...] }`

### PUT `/api/v1/admin/inquiries/:id` — 문의 답변
- **Request Body**: `{ "admin_reply": "답변 내용", "status": "replied" }`
- **Response 200**: `{ "inquiry": { ... } }`

---

## 7. 웹훅 (Webhooks)

### POST `/api/v1/webhooks/lemonsqueezy` — Lemonsqueezy 결제 웹훅
- **인증**: 웹훅 서명 검증 (X-Signature 헤더)
- **처리 이벤트**:
  - `subscription_created` → subscriptions INSERT + profiles plan 업데이트 + license_key 생성
  - `subscription_updated` → subscriptions UPDATE + profiles plan 업데이트
  - `subscription_cancelled` → status='cancelled', cancel_at 설정
  - `subscription_payment_success` → orders INSERT
  - `subscription_payment_failed` → status='past_due'
- **Response 200**: `{ "received": true }`

---

## C(프론트) 연동 가이드

### 인증 흐름
1. 로그인 → `/api/v1/auth/login` → access_token 저장
2. 모든 인증 요청에 `Authorization: Bearer <token>` 헤더 추가
3. 페이지 로드 시 `/api/v1/auth/me`로 세션 확인
4. 만료 시 Supabase SDK의 자동 갱신 사용

### Mock 데이터 사용법
- 위 Response 예시를 그대로 mock 데이터로 사용
- API 연동 시 fetch URL만 교체하면 됨
- 에러 상태도 mock으로 테스트: 401, 403, 404, 500

### 전환 우선순위 (D 제안)
1. 인증 페이지 (login, signup, auth/me)
2. 구독자 대시보드 (dashboard, library, downloads)
3. 테마 갤러리/상세 (themes)
4. 관리자 페이지 (admin)
