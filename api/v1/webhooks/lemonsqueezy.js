const crypto = require('crypto');
const { supabaseAdmin } = require('../_lib/supabase.js');

function verifySignature(rawBody, signature) {
  var secret = process.env.LEMON_WEBHOOK_SECRET;
  if (!secret) return false;
  var hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature)); }
  catch(e) { return false; }
}

module.exports = async function(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  var rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  var signature = req.headers['x-signature'];

  if (!verifySignature(rawBody, signature)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  var event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  var eventName = event.meta?.event_name;
  var data = event.data?.attributes;
  var userEmail = data?.user_email;

  var maskedEmail = userEmail ? userEmail.replace(/^(.)(.*)(@.*)$/, '$1***$3') : 'unknown';
  console.log('Webhook:', eventName, maskedEmail);

  var { data: profile } = await supabaseAdmin.from('profiles').select('id').eq('email', userEmail).single();
  if (!profile) { console.warn('User not found:', maskedEmail); return res.json({ received: true }); }

  switch (eventName) {
    case 'subscription_created': {
      var plan = data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro';
      await supabaseAdmin.from('subscriptions').insert({
        user_id: profile.id, plan: plan, status: 'active',
        lemon_subscription_id: String(event.data.id),
        lemon_customer_id: String(data.customer_id),
        current_period_start: data.created_at, current_period_end: data.renews_at
      });
      await supabaseAdmin.from('profiles').update({ plan: plan }).eq('id', profile.id);
      var key = 'MERGE-' + plan.toUpperCase() + '-' + crypto.randomBytes(4).toString('hex').toUpperCase();
      await supabaseAdmin.from('license_keys').insert({ user_id: profile.id, key: key });
      break;
    }
    case 'subscription_updated': {
      var plan = data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro';
      await supabaseAdmin.from('subscriptions').update({ plan: plan, status: data.status, current_period_end: data.renews_at }).eq('lemon_subscription_id', String(event.data.id));
      await supabaseAdmin.from('profiles').update({ plan: plan }).eq('id', profile.id);
      break;
    }
    case 'subscription_cancelled': {
      await supabaseAdmin.from('subscriptions').update({ status: 'cancelled' }).eq('lemon_subscription_id', String(event.data.id));
      break;
    }
    case 'subscription_expired': {
      await supabaseAdmin.from('subscriptions').update({ status: 'expired' }).eq('lemon_subscription_id', String(event.data.id));
      await supabaseAdmin.from('profiles').update({ plan: 'free' }).eq('id', profile.id);
      break;
    }
    case 'subscription_payment_success': {
      await supabaseAdmin.from('orders').insert({
        user_id: profile.id, lemon_order_id: String(data.order_id || event.data.id),
        plan: data.variant_name?.toLowerCase().includes('team') ? 'team' : 'pro',
        amount: parseFloat(data.total) / 100, currency: data.currency || 'USD', status: 'paid'
      });
      break;
    }
    case 'subscription_payment_failed': {
      await supabaseAdmin.from('subscriptions').update({ status: 'past_due' }).eq('lemon_subscription_id', String(event.data.id));
      break;
    }
  }

  res.json({ received: true });
};

module.exports.config = { api: { bodyParser: false } };
