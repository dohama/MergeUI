# MergeUi E2E 테스트 시나리오

> E(QA) 작성 | 2026-04-16
> 총 27개 시나리오 — 백엔드 구축과 병렬로 사전 준비

---

## 회원가입/로그인 (8개)

| ID | 시나리오 | 사전 조건 | 실행 단계 | 기대 결과 | 심각도 |
|----|---------|----------|----------|----------|--------|
| AUTH-01 | GitHub OAuth 정상 가입 | 미가입 GitHub 계정 | 로그인 > GitHub 버튼 > GitHub 인증 > 콜백 | profiles 테이블에 저장, dashboard로 이동 | Critical |
| AUTH-02 | Google OAuth 정상 가입 | 미가입 Google 계정 | 로그인 > Google 버튼 > Google 인증 > 콜백 | profiles 테이블에 email 저장, dashboard로 이동 | Critical |
| AUTH-03 | 이메일 가입 > 인증 완료 | 미가입 이메일 | 회원가입 폼 > 제출 > 인증 메일 > 링크 클릭 | email_confirmed_at 설정, 로그인 가능 | Critical |
| AUTH-04 | 이메일 가입 > 미인증 접근 제한 | 가입 완료, 미인증 | 로그인 시도 | 로그인 성공하나 구독/결제 차단 | Major |
| AUTH-05 | 로그인 성공 | 인증 완료 계정 | 이메일+비밀번호 입력 > 로그인 | dashboard 이동, 세션 생성 | Critical |
| AUTH-06 | 로그인 실패 | 잘못된 비밀번호 | 이메일+틀린 비밀번호 > 로그인 | 에러 메시지 표시 | Major |
| AUTH-07 | 비밀번호 찾기 > 재설정 | 기존 계정 | forgot-password > 이메일 > 재설정 링크 > 새 비밀번호 | 비밀번호 변경 완료 | Major |
| AUTH-08 | 로그아웃 > 세션 만료 | 로그인 상태 | 로그아웃 클릭 | 세션 삭제, subscriber/ 접근 시 login 리다이렉트 | Critical |

## 결제 (5개)

| ID | 시나리오 | 사전 조건 | 실행 단계 | 기대 결과 | 심각도 |
|----|---------|----------|----------|----------|--------|
| PAY-01 | 결제 성공 | Free 플랜 로그인 | pricing > Pro > Lemonsqueezy checkout > 테스트 카드 | subscriptions.status=active, license_key 발급, success 페이지 | Critical |
| PAY-02 | 결제 실패 (카드 거절) | 로그인 | checkout > 거절 테스트 카드 | 에러 표시, subscriptions 변경 없음 | Critical |
| PAY-03 | 구독 취소 | Pro 활성 | billing > 구독 취소 | status=cancelled, expires_at까지 접근 유지, 이후 차단 | Critical |
| PAY-04 | 중복 결제 시도 | Pro 활성 | pricing > Pro 다시 선택 | "이미 구독 중" 안내, checkout 차단 | Major |
| PAY-05 | 구독 만료 후 갱신 | status=expired | pricing > Pro > 결제 | 새 subscription, status=active | Major |

## 다운로드 (4개)

| ID | 시나리오 | 사전 조건 | 실행 단계 | 기대 결과 | 심각도 |
|----|---------|----------|----------|----------|--------|
| DL-01 | 유료 구독자 다운로드 | Pro 활성 | 테마 > 다운로드 | signed URL 발급, 파일 다운로드, downloads 기록 | Critical |
| DL-02 | 무료 사용자 유료 테마 차단 | Free 플랜 | Pro 전용 테마 > 다운로드 | "Pro 필요" 안내 + pricing 링크 | Critical |
| DL-03 | 만료 구독자 차단 | status=expired | 테마 > 다운로드 | "구독 만료" 안내 | Critical |
| DL-04 | 무료 테마 다운로드 | 비로그인/Free | 무료 테마 > 다운로드 | 비로그인 시 로그인 요구, Free는 즉시 | Major |

## 구독자 페이지 (5개)

| ID | 시나리오 | 사전 조건 | 실행 단계 | 기대 결과 | 심각도 |
|----|---------|----------|----------|----------|--------|
| SUB-01 | 대시보드 데이터 표시 | 로그인, 이력 있음 | subscriber/dashboard 접근 | 플랜, 다운로드 수, 최근 활동 정상 | Major |
| SUB-02 | 라이브러리 탭 전환 | 로그인 | library > 탭 클릭 | 각 탭 데이터 로드, 빈 상태 처리 | Minor |
| SUB-03 | 다운로드 이력 조회 | 이력 존재 | downloads 페이지 | 날짜, 테마명, 버전 정상 | Minor |
| SUB-04 | 계정 설정 변경 | 로그인 | settings > 이름 변경 > 저장 | DB 업데이트, 즉시 반영 | Minor |
| SUB-05 | 구독/결제 관리 | Pro 구독 | billing 페이지 | 플랜, 다음 결제일, 라이선스 키, 취소 버튼 | Major |

## 관리자 (5개)

| ID | 시나리오 | 사전 조건 | 실행 단계 | 기대 결과 | 심각도 |
|----|---------|----------|----------|----------|--------|
| ADM-01 | 관리자 대시보드 KPI | admin role | admin/dashboard 접근 | MRR, 구독자, 이탈률, 매출 DB 기반 | Major |
| ADM-02 | 비관리자 접근 차단 | 일반 사용자 | admin/ URL 직접 접근 | 403 또는 login 리다이렉트 | Critical |
| ADM-03 | 테마 CRUD | admin role | 테마 추가 > 수정 > 삭제 | DB 반영, 갤러리 반영 | Major |
| ADM-04 | 문의 응대 | admin role, 문의 존재 | inquiries > 답변 > 전송 | 답변 저장 | Minor |
| ADM-05 | 매출 통계 | admin role | orders 페이지 | 기간별 매출, 결제 내역, 필터링 | Major |
