# MergeUi 이메일 자동화 설계 (Loops)

> F(그로스) + D(백엔드) | 2026-04-18

---

## 아키텍처

```
회원가입 → Supabase → 서버 API → Loops API → 이메일 발송
                                      ↑
                              marketing_consent 확인
```

---

## 자동 이메일 시나리오 (5개)

### 1. 환영 메일 (가입 후 즉시)

**트리거**: Supabase onAuthStateChange → SIGNED_UP
**조건**: marketing_consent = true

```
Subject: Welcome to MergeUi — Here's your free dashboard 🎯

Body:
Hey {name},

Thanks for joining MergeUi! Here's what you can do right now:

→ Browse your free dashboard theme
→ Copy components into your project
→ Customize colors with CSS variables

Your free theme is ready: [View Theme]

Happy building,
MergeUi Team
```

### 2. 무료→Pro 전환 유도 (가입 7일 후)

**트리거**: Loops 자동 (가입일 + 7일)
**조건**: plan = 'free'

```
Subject: Ready to unlock all MergeUi themes?

Body:
Hey {name},

You've been using MergeUi for a week now. Here's what Pro gives you:

✅ All 10+ dashboard themes
✅ Accent color presets
✅ Monthly new themes
✅ Priority support

Start Pro — $19/mo: [Upgrade]
```

### 3. 새 테마 출시 알림

**트리거**: 관리자가 릴리즈 노트 발행 시 API 호출
**조건**: marketing_consent = true

```
Subject: New theme just dropped — {theme_name} 🚀

Body:
Hey {name},

We just released {theme_name} — a {category} dashboard with {feature_highlight}.

[Preview Theme] [Download Now]

This month's update also includes:
- {changelog_item_1}
- {changelog_item_2}
```

### 4. 구독 만료 알림 (만료 7일 전)

**트리거**: Loops 자동 또는 cron job
**조건**: subscription.current_period_end - 7일

```
Subject: Your MergeUi Pro expires in 7 days

Body:
Hey {name},

Your Pro subscription expires on {expiry_date}. After that:
- You keep everything you've downloaded
- New themes and updates won't be accessible

[Renew Subscription]

Questions? Reply to this email.
```

### 5. 재방문 유도 (30일 미방문)

**트리거**: Loops 자동 (마지막 로그인 + 30일)
**조건**: marketing_consent = true

```
Subject: We miss you at MergeUi 👋

Body:
Hey {name},

It's been a while! Here's what's new since your last visit:

🆕 {new_theme_count} new themes added
🧩 {new_component_count} new components
🎨 New accent color presets

[See What's New]
```

---

## GDPR 수신 동의 흐름

```
1. 회원가입 시: "I agree to receive product updates" 체크박스 (opt-in, 기본 OFF)
2. 체크 시: profiles.marketing_consent = true 저장
3. 모든 이메일 하단: [Unsubscribe] 링크 (Loops 자동 제공)
4. Unsubscribe 시: Loops → 웹훅 → profiles.marketing_consent = false
```

---

## Loops 연동 구현 (D 백엔드)

### 서버에서 Loops API 호출
```javascript
// 회원가입 시 Loops에 연락처 추가
async function syncToLoops(user) {
  if (!user.marketing_consent) return;
  await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + process.env.LOOPS_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email, firstName: user.name, userGroup: user.plan })
  });
}
```

### 환경변수
```
LOOPS_API_KEY=          # Loops 대시보드에서 발급
```

---

## 비용

| 규모 | Loops 요금 | 월 발송량 |
|------|-----------|----------|
| ~1,000명 | 무료 | ~5,000통 |
| 1,000~5,000명 | $49/월 | ~25,000통 |
