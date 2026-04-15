# 프론트엔드 잔여 이슈 (샘플링 검증)

> E(QA) 작성 | 2026-04-16
> 5개 페이지 샘플링: landing/index.html, auth/login.html, subscriber/dashboard.html, admin/dashboard.html, themes/index.html

---

## Critical (2건)

| # | 파일 | 이슈 | 설명 |
|---|------|------|------|
| C-1 | admin/dashboard.html | **admin 접근 제어가 localStorage만으로 수행** | role 체크 없이 세션 존재만 확인. 아무 로그인 사용자가 admin 접근 가능. 백엔드 전환 시 서버 측 role 검증 필수 |
| C-2 | 전체 인증 페이지 | **localStorage 기반 세션은 XSS에 취약** | Supabase Auth 전환 시 해결 예정이나 현재 Critical |

## Major (6건)

| # | 파일 | 이슈 | 설명 |
|---|------|------|------|
| M-1 | admin/dashboard.html | **인라인 style 다수** | stat-card 아이콘에 `style="background:rgba(99,102,241,0.1)"` 등. CSS 클래스로 분리 필요 |
| M-2 | subscriber/dashboard.html | **인라인 style 다수** | stat-card, plan-banner 등에서 반복 |
| M-3 | admin/dashboard.html | **lang 불일치** | 관리자만 lang="ko", 다른 페이지는 lang="en". 일관성 필요 |
| M-4 | 전체 | **CSS 변수 중복 선언** | tokens.css 링크하면서 각 페이지 `<style>` 내에 동일 :root 변수 재선언. tokens.css만 사용해야 함 |
| M-5 | landing/index.html | **nav 스타일 충돌** | nav.css 링크하면서 `<style>` 내에 nav 스타일 재정의 |
| M-6 | themes/index.html | **nav 스타일 인라인 중복** | nav.css 로드하면서 `.nav`, `.nav-inner` 등 `<style>`에서 재정의 |

## Minor (6건)

| # | 파일 | 이슈 | 설명 |
|---|------|------|------|
| m-1 | 전체 | **ARIA 속성 거의 부재** | aria-label, aria-describedby, role 등 접근성 속성 미관찰 |
| m-2 | subscriber/admin dashboard | **차트 접근성 대안 없음** | 차트에 텍스트 대안이나 aria-label 없음 |
| m-3 | admin/dashboard.html | **모바일 사이드바 미대응** | 768px 이하에서 sidebar display:none, 대안 네비게이션 없음 |
| m-4 | subscriber/dashboard.html | **동일 모바일 사이드바 미대응** | 사이드바 숨김만 처리, 대안 없음 |
| m-5 | 전체 | **키보드 포커스 스타일 미정의** | Tab 탐색 시 포커스 위치 불명확 |
| m-6 | admin/dashboard.html | **하드코딩된 더미 데이터** | MRR $2,847 등 정적 데이터. API 전환 시 로딩/에러 상태 필요 |

---

## 요약: Critical 2 / Major 6 / Minor 6
- Critical 2건은 Supabase Auth 전환 시 자동 해결
- Major M-4(CSS 변수 중복)는 tokens.css 일원화로 해결 가능 — 백엔드 연동 전 처리 권장
