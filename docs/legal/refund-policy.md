# MergeUi Refund Policy / 환불 정책

> **Draft — Pending Legal Review / 초안 — 법률 전문가 검토 전**
> This document is a working draft prepared by the MergeUi growth team for internal review. It has not been reviewed or approved by a licensed attorney and does not constitute legal advice. A final, counsel-reviewed version will be published before public launch.
>
> 본 문서는 내부 검토용 초안입니다. 변호사 검토 전이며, 법률 자문이 아닙니다. 정식 게시 전 반드시 법무 검토를 거칩니다.

---

**Last updated:** April 19, 2026
**Owner:** F (Growth) — with input from A (PM) and D (Backend)
**Applies to:** Free and Pro plans on mergeui.com (Lemonsqueezy checkout)

---

## 1. Summary / 요약

| Scenario | English | 한글 |
|----------|---------|------|
| Immediate download after purchase | No refund under the standard 14-day withdrawal right — you consent to immediate performance at checkout | 결제 시 즉시 이용 개시에 동의하셨으므로 EU 14일 청약 철회권은 적용되지 않습니다 |
| Duplicate charge | Full refund (up to 30 days) | 전액 환불 (30일 이내) |
| Corrupted / failed download | Full refund or replacement | 전액 환불 또는 재전송 |
| Annual plan — within 14 days, no significant use | Discretionary goodwill refund | 재량적 호의 환불 검토 |
| Renewal charge | No refund once the new period has started and any new content has been downloaded | 갱신 이후 신규 파일 다운로드가 발생한 경우 환불 불가 |
| Subscription cancellation | No refund for current period; access continues until period end | 현 결제 주기 환불 불가, 이용권은 주기 말까지 유지 |

---

## 2. Digital Goods — 14-Day Withdrawal Waiver (EU) / EU 14일 철회권 예외

### Policy rationale

MergeUi Templates are digital goods delivered instantly upon subscription activation. Under **Article 16(m) of EU Directive 2011/83/EU (Consumer Rights Directive)**, the 14-day right of withdrawal does not apply to the supply of digital content not delivered on a tangible medium where:

1. performance has begun with the consumer's **prior express consent**; and
2. the consumer **acknowledges that they thereby lose the right of withdrawal**.

### Implementation

On the Lemonsqueezy checkout page (and the MergeUi confirmation page) we will display a mandatory, unticked checkbox with the following text, in English and Korean:

> [ ] I consent to immediate access to MergeUi templates and acknowledge that, under EU Directive 2011/83/EU Article 16(m), I therefore lose my 14-day right of withdrawal once downloads begin.
>
> [ ] MergeUi 템플릿을 즉시 이용하는 것에 동의하며, EU 소비자보호지침 제16조(m)에 따라 다운로드가 개시되는 순간 14일 청약 철회권이 소멸함을 확인합니다.

> **D (Backend) — action item:** store the consent timestamp (UTC) and IP on the subscription record. This is the evidentiary basis for denying a post-download withdrawal request.

### Korean e-Commerce law equivalent

Under the Korean Act on the Consumer Protection in Electronic Commerce (전자상거래 등에서의 소비자보호에 관한 법률), Article 17(2) allows exclusion of the 7-day right of withdrawal for digital goods where (a) the supply has begun with the consumer's consent, and (b) the seller has clearly indicated the exception before the order. We mirror the EU consent flow to satisfy both regimes.

---

## 3. Exceptions — When We Refund / 환불 제공 사유

We will issue a full or partial refund in the following situations regardless of the 14-day waiver:

### 3.1 Duplicate charge / 중복 결제

If you were charged twice for the same subscription (e.g., browser double-submit, webhook retry bug), contact us within **30 days** at `billing@mergeui.com` with the two order IDs. We will verify in Lemonsqueezy and refund the duplicate within 5 business days.

### 3.2 Failed or corrupted delivery / 다운로드 실패 또는 파일 손상

If the Template archive fails to download, is corrupted, or cannot be unzipped, contact `support@mergeui.com` within **14 days of purchase**. We will first attempt to resolve by providing a replacement link; if we cannot remedy the issue within 7 days, we will refund in full.

### 3.3 Service unavailable at purchase time / 결제 직후 서비스 장애

If the Service is entirely unavailable at the moment of purchase and we cannot restore access within 24 hours, you may request a full refund.

### 3.4 Annual plan goodwill (case-by-case) / 연간 플랜 호의 환불

For the annual Pro plan ($149/yr), if you request a refund within **14 days of the initial purchase** and have downloaded no more than 2 templates, we may grant a goodwill refund at our sole discretion. This is not a right; it is an exception we may withdraw at any time.

### 3.5 Fraudulent or unauthorized charge / 부정 결제

If your card was used without authorization, contact your card issuer first to open a chargeback, and email `billing@mergeui.com` with your account email and approximate charge date. We will cooperate with the Lemonsqueezy investigation.

---

## 4. Subscription Cancellation (Not the Same as Refund) / 구독 해지 ≠ 환불

Canceling a subscription and requesting a refund are different things.

- **Cancel = stop future renewals.** The current billing period continues and you keep Pro access until the period end date. No refund is issued for the current period.
- **Refund = reverse a charge.** Only granted under Section 3 above.

### How to cancel

You can cancel your subscription anytime:

1. Go to **Account → Billing** (or use the link in any Lemonsqueezy receipt email).
2. Click **Cancel subscription**. Cancellation takes effect at the end of the current billing period.
3. You will receive a confirmation email from Lemonsqueezy. Templates already downloaded remain usable under the license terms granted during your active subscription (see Terms §5.4).

---

## 5. Renewal Charges / 자동 갱신 환불

Subscriptions renew automatically on the billing anniversary unless canceled before that date. Because we send a renewal reminder email 7 days before renewal (Loops automation), renewal charges are generally **not eligible for refund** once:

- the renewal period has started, **and**
- at least one new or updated template has been downloaded under the renewed subscription.

If you were charged for a renewal and have **not** downloaded anything new in the renewed period, contact us within **7 days** of the renewal charge. We will evaluate a goodwill refund at our discretion.

---

## 6. How to Request a Refund / 환불 요청 방법

| Step | Action |
|------|--------|
| 1 | Email `billing@mergeui.com` from the account's registered email address |
| 2 | Include: order ID (from Lemonsqueezy receipt), reason for refund, any supporting screenshots |
| 3 | We acknowledge receipt within 2 business days |
| 4 | We respond with a decision within 7 business days |
| 5 | Approved refunds are processed by Lemonsqueezy (original payment method) within 5–10 business days |

### Lemonsqueezy processing

All refunds are issued by **Lemonsqueezy**, our Merchant of Record. The refund will appear as a reversal of the original charge on your card or payment-method statement. Currency conversion differences between the charge date and the refund date are borne by your card issuer.

---

## 7. What We Cannot Refund / 환불 불가 항목

- Subscription periods where significant usage has occurred (more than 3 template downloads or commercial deployment detected via license checks).
- Purchases made more than 30 days before the refund request (unless a specific exception in Section 3 applies).
- Charges disputed via chargeback without prior contact with our support team — we reserve the right to contest these chargebacks with Lemonsqueezy and present the consent-to-immediate-performance record.
- Taxes (VAT, GST, sales tax) already remitted by Lemonsqueezy to the relevant authority — these are refunded only when required by the tax jurisdiction.

---

## 8. Policy Hierarchy / 약관 우선순위

In case of conflict between this Refund Policy and the MergeUi Terms of Service §9 (Refunds), **this document governs** for all Lemonsqueezy-processed transactions. Mandatory consumer-protection laws in your country of residence take precedence over both and are not waived by this Policy.

---

## 9. Changes to This Policy / 본 정책 변경

We may update this Refund Policy. The current version will always be available at `/legal/refund` (to be published) and linked from checkout. Material changes apply only to purchases made **after** the effective date of the change.

---

## 10. Contact / 문의처

| Topic | Email |
|-------|-------|
| Refund requests | `billing@mergeui.com` |
| Subscription questions | `support@mergeui.com` |
| Legal / policy | `legal@mergeui.com` |

Mail: [COMPANY_NAME], [COMPANY_ADDRESS]

---

## Internal Notes (for launch)

- [ ] **D (Backend):** implement consent checkbox logging on Lemonsqueezy checkout success webhook. Store `immediate_performance_consent_at` + IP on the `subscriptions` row.
- [ ] **C (Frontend):** add a plain-language refund summary box on the pricing page and the checkout confirmation page, linking to this policy.
- [ ] **F (Growth):** draft customer-facing /legal/refund.html page mirroring this policy once counsel-reviewed.
- [ ] **A (PM):** confirm that Lemonsqueezy's default refund window/UX aligns with Sections 3–4 and adjust webhook handlers accordingly.
- [ ] **E (QA):** add E2E test — "user cannot complete checkout without ticking the immediate-performance consent checkbox."
- [ ] **Legal review focus:** Section 2 wording of the consent checkbox, Section 3.5 chargeback posture, Section 7 grounds for refusal.
