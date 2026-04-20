const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function getUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return null;
  const { data: profile } = await supabaseAdmin.from('profiles').select('role, plan, name').eq('id', user.id).single();
  return { id: user.id, email: user.email, role: profile?.role || 'subscriber', plan: profile?.plan || 'free', name: profile?.name || '' };
}

async function hasActiveSubscription(userId) {
  if (!userId) return false;
  const { data } = await supabaseAdmin
    .from('subscriptions')
    .select('status, current_period_end')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('current_period_end', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data || !data.current_period_end) return false;
  return new Date(data.current_period_end) > new Date();
}

module.exports = { supabaseAdmin, getUser, hasActiveSubscription };
