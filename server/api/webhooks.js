const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { supabaseAdmin } = require('../supabase');

// Lemonsqueezy 웹훅 서명 검증
function verifyWebhookSignature(rawBody, signature) {
  const secret = process.env.LEMON_WEBHOOK_SECRET;
  if (!secret) return false;
  const hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
}

// POST /api/v1/webhooks/lemonsqueezy
router.post('/lemonsqueezy', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['x-signature'];
  const rawBody = req.body.toString();

  // 서명 검증 (프로덕션에서 필수)
  if (process.env.NODE_ENV === 'production' && !verifyWebhookSignature(rawBody, signature)) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  const event = JSON.parse(rawBody);
  const eventName = event.meta?.event_name;
  const data = event.data?.attributes;
  const userEmail = data?.user_email;

  const maskedEmail = userEmail ? userEmail.replace(/^(.)(.*)(@.*)$/, '$1***$3') : 'unknown';
  console.log('Webhook received:', eventName, maskedEmail);

  // 사용자 찾기
  const { data: profile } = await supabaseAdmin
    .from('profiles').select('id').eq('email', userEmail).single();

  if (!profile) {
    console.warn('Webhook: user not found for', maskedEmail);
    return res.json({ received: true });
  }

  switch (eventName) {
    case 'subscription_created': {
      const plan = data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro';
      await supabaseAdmin.from('subscriptions').insert({
        user_id: profile.id,
        plan,
        status: 'active',
        lemon_subscription_id: String(event.data.id),
        lemon_customer_id: String(data.customer_id),
        current_period_start: data.created_at,
        current_period_end: data.renews_at
      });
      await supabaseAdmin.from('profiles').update({ plan }).eq('id', profile.id);

      // 라이선스 키 생성
      const key = 'MERGE-' + plan.toUpperCase() + '-' + crypto.randomBytes(4).toString('hex').toUpperCase();
      await supabaseAdmin.from('license_keys').insert({ user_id: profile.id, key });
      break;
    }

    case 'subscription_updated': {
      const plan = data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro';
      await supabaseAdmin.from('subscriptions')
        .update({ plan, status: data.status, current_period_end: data.renews_at, updated_at: new Date() })
        .eq('lemon_subscription_id', String(event.data.id));
      await supabaseAdmin.from('profiles').update({ plan }).eq('id', profile.id);
      break;
    }

    case 'subscription_cancelled': {
      await supabaseAdmin.from('subscriptions')
        .update({ status: 'cancelled', cancel_at: data.ends_at })
        .eq('lemon_subscription_id', String(event.data.id));
      // plan은 현재 기간 끝날 때까지 유지 (cancel_at 이후 cron으로 free 전환)
      break;
    }

    case 'subscription_payment_success': {
      await supabaseAdmin.from('orders').insert({
        user_id: profile.id,
        lemon_order_id: String(data.order_id || event.data.id),
        plan: data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro',
        amount: parseFloat(data.total) / 100,
        currency: data.currency || 'USD',
        status: 'paid'
      });
      break;
    }

    case 'subscription_payment_failed': {
      await supabaseAdmin.from('subscriptions')
        .update({ status: 'past_due' })
        .eq('lemon_subscription_id', String(event.data.id));
      break;
    }
  }

  res.json({ received: true });
});

module.exports = router;
