// Supabase 클라이언트 (서버용 — service_role 키 사용)
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠ Supabase credentials not set. Check .env file.');
}

// Admin client (서버 내부용 — RLS 우회)
const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceKey || '', {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Public client (사용자 토큰 기반 — RLS 적용)
function createUserClient(accessToken) {
  return createClient(supabaseUrl || '', supabaseAnonKey || '', {
    global: { headers: { Authorization: 'Bearer ' + accessToken } }
  });
}

// Anon client (로그인용 — RLS 적용)
const supabaseAnon = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: { autoRefreshToken: false, persistSession: false }
});

module.exports = { supabaseAdmin, supabaseAnon, createUserClient };
