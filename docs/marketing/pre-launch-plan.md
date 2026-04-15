# MergeUi — Pre-Launch Plan (결제 연동 전 사전 공개)

> F(그로스 마케터) 작성 | 2026-04-16
> 목표: 결제 연동 전에 관심 개발자 500명 이메일 수집

---

## 1. 얼리 액세스 신청

### 구현 방법
- 랜딩페이지 Hero에 이메일 입력 + "Get Early Access" 버튼 추가
- 외부 이메일 서비스(Buttondown/ConvertKit/Mailchimp 무료 티어)로 form action
- 백엔드 불필요

### 랜딩 카피 변경
- 배지: "Coming soon — join the waitlist" (녹색 점 애니메이션)
- Primary CTA: "Join the Waitlist — Free" (이메일 입력 + 버튼)
- Secondary CTA: "Browse Preview" (테마 갤러리 링크)

### 인센티브
- "First 100 signups get 50% off Pro for life"
- 긴급감 조성 (정직한 방식)

---

## 2. 이메일 시퀀스 (자동화)

| 순서 | 시점 | 내용 |
|------|------|------|
| 1 | 즉시 | "You're on the list. Here's a sneak peek." + 스크린샷 2~3장 |
| 2 | D+3 | 개발 마일스톤 공유. "50+ components ready." |
| 3 | D+7 | 기능 딥다이브. "CSS variable system" |
| 4 | D-3 | "We launch in 3 days. Your exclusive early access link." |
| 5 | D-0 | "We're live. Your 50% discount is waiting." |

### 추적 지표
- 가입율 (방문자 → 이메일 가입): 목표 5%
- 이메일 오픈율: 목표 40%+
- 런칭 이메일 클릭률: 목표 15%+

---

## 3. SNS 티저 전략 (런칭 4주 전)

### Twitter/X (주 2회 게시)

**Week 1: 문제 인식**
- "Every new project: 2 weeks building the same dashboard UI. Building something to fix this."
- 지저분한 CSS 파일 스크린샷. "This is 'just build a quick admin panel'. We can do better."

**Week 2: 솔루션 티저**
- 블러 처리된 대시보드 스크린샷. "Pure HTML + CSS. No framework lock-in."
- 다크모드 토글 짧은 영상. "Soon."

**Week 3: 기능 공개**
- 컴포넌트 라이브러리 스크린샷. "50+ dashboard components. Copy-paste into any stack."
- CSS 변수 데모. "Change one line, entire theme updates."

**Week 4: 카운트다운**
- "Launching next week. First 100 get 50% off Pro for life." [링크]
- "Tomorrow. mergeui.com"

### 해시태그
#webdev #buildinpublic #css #dashboardui (절제해서 사용)

---

## 4. 커뮤니티 피드백 수집

### 게시 장소
- Twitter/X (#buildinpublic)
- r/webdev "Showoff Saturday"
- Indie Hackers
- Dev.to 짧은 글

### 질문 로테이션
1. "What's the most annoying part of building dashboard UI?"
2. "When you buy a UI template, what makes you actually use it vs abandon it?"
3. "CSS variables vs Tailwind classes for theming — what do you prefer?"
4. "What dashboard components do you rebuild most often?"
5. "Would you pay $19/mo for a dashboard component subscription? Why or why not?"

### 피드백 활용
- 응답을 스프레드시트에 기록
- Top 3 페인포인트 식별 → 랜딩페이지가 해결하는지 확인
- 가격 우려 30% 이상이면 연간 할인 강조
- 기능 요청은 A(PM) 백로그로

---

## 5. GitHub 프레즌스

- public repo + README (social-launch-content.md 참조)
- 무료 테마 1개를 오픈소스로 공개 → 신뢰 구축
- "Star this repo" 소프트 CTA → GitHub 스타 = 소셜 프루프
- 랜딩페이지 푸터에서 링크 (현재 # 플레이스홀더 교체)

---

## 6. 타임라인

| 주차 | 포커스 | 산출물 |
|------|--------|--------|
| W1 | 세팅 | 이메일 서비스 연동, 웨이트리스트 폼, 첫 트윗 2개 |
| W2 | 콘텐츠 | 티저 트윗 2개, r/webdev 첫 게시, Dev.to 소개글 |
| W3 | 모멘텀 | 기능 공개 트윗, 커뮤니티 피드백, GitHub repo 공개 |
| W4 | 런칭 준비 | 마지막 티저, 런칭 자산 완비, 이메일 시퀀스 로드 |
| W5 | 런칭 | Product Hunt + 소셜 전면 공개 + 이메일 발송 |

---

## 7. 성공 지표 (Pre-Launch)

| 지표 | 목표 |
|------|------|
| 이메일 가입 | 500+ |
| Twitter 팔로워 증가 | 200+ |
| GitHub 스타 | 100+ |
| 커뮤니티 피드백 응답 | 50+ |
| 랜딩페이지 방문 | 5,000+ |
