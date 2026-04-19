-- ============================================
-- Fix: Admin 전체 회원 조회 RLS 정책 수정
-- 2026-04-20
-- 문제: 관리자도 본인 profile 1건만 보임
-- 원인: profiles_admin_select 정책의 EXISTS 서브쿼리가 RLS 재귀로 인해 제대로 작동 안 함
-- 해결: SECURITY DEFINER 함수로 role 체크 후 정책 재작성
-- ============================================

-- 1. 관리자 체크 함수 (SECURITY DEFINER — RLS 우회해서 안전하게 role 확인)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE((SELECT role = 'admin' FROM public.profiles WHERE id = auth.uid()), false);
$$;

-- 2. 기존 admin 정책 제거 후 재작성
DROP POLICY IF EXISTS profiles_admin_select ON public.profiles;
CREATE POLICY profiles_admin_select ON public.profiles FOR SELECT
  USING (public.is_admin());

-- 3. 다른 테이블에도 admin 조회 권한 (주문·구독·문의 전체 조회용)
DROP POLICY IF EXISTS subscriptions_admin_select ON public.subscriptions;
CREATE POLICY subscriptions_admin_select ON public.subscriptions FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS orders_admin_select ON public.orders;
CREATE POLICY orders_admin_select ON public.orders FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS inquiries_admin_select ON public.inquiries;
CREATE POLICY inquiries_admin_select ON public.inquiries FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS inquiries_admin_update ON public.inquiries;
CREATE POLICY inquiries_admin_update ON public.inquiries FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS downloads_admin_select ON public.downloads;
CREATE POLICY downloads_admin_select ON public.downloads FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS license_keys_admin_select ON public.license_keys;
CREATE POLICY license_keys_admin_select ON public.license_keys FOR SELECT
  USING (public.is_admin());

-- 4. 검증 쿼리 — 실행 후 3건이 나오면 성공
-- SELECT p.id, u.email, p.role FROM profiles p JOIN auth.users u ON p.id = u.id;
