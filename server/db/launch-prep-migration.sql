-- ============================================
-- MergeUi Launch Prep Migration (2026-04-29, D-7)
-- D-2 / D-3 / D-18 통합 — Supabase SQL Editor에서 1회 실행
-- 모든 구문 idempotent (IF NOT EXISTS / OR REPLACE)
-- ============================================

-- ─────────────────────────────────────────────
-- D-2: marketing_consent 컬럼 + handle_new_user 트리거 통합
-- (server/db/schema.sql:217 vs add-marketing-consent.sql 충돌 해결)
-- ─────────────────────────────────────────────

-- 1) profiles.marketing_consent 컬럼 보장 (GDPR 명시적 opt-in)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN NOT NULL DEFAULT false;

-- 2) handle_new_user 트리거 — marketing_consent 기록 + name fallback 유지
--    raw_user_meta_data에서 동의 여부를 읽어 INSERT
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url, marketing_consent)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::boolean, false)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 자체는 schema.sql에 이미 등록되어 있으므로 OR REPLACE만으로 갱신됨

-- ─────────────────────────────────────────────
-- D-3: webhook_events 멱등성 테이블
-- 동일 Lemonsqueezy event_id 재전송 시 중복 처리 차단
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.webhook_events (
  event_id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'lemonsqueezy',
  payload_digest TEXT,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_processed_at
  ON public.webhook_events(processed_at);

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- 일반 사용자는 접근 불가 (service_role만 사용)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'webhook_events'
      AND policyname = 'webhook_events_no_public'
  ) THEN
    EXECUTE 'CREATE POLICY webhook_events_no_public ON public.webhook_events FOR SELECT USING (false)';
  END IF;
END$$;

-- ─────────────────────────────────────────────
-- D-18: 계정 삭제 트랜잭션화 (GDPR right to be forgotten)
-- 단일 트랜잭션 내에서 관련 테이블 + profiles 삭제 보장
-- (auth.users 삭제는 supabaseAdmin.auth.admin.deleteUser 호출로 별도 처리)
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.delete_user_data(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'target_user_id is required';
  END IF;

  -- 단일 트랜잭션: 한 줄이라도 실패하면 전체 롤백
  DELETE FROM public.downloads     WHERE user_id = target_user_id;
  DELETE FROM public.favorites     WHERE user_id = target_user_id;
  DELETE FROM public.license_keys  WHERE user_id = target_user_id;
  DELETE FROM public.subscriptions WHERE user_id = target_user_id;
  DELETE FROM public.orders        WHERE user_id = target_user_id;

  -- inquiries는 user_id 컬럼이 없으므로 email 기반 정리 (해당 시)
  DELETE FROM public.inquiries
   WHERE email = (SELECT email FROM public.profiles WHERE id = target_user_id);

  DELETE FROM public.profiles WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 검증 쿼리 (실행 후 확인용 — 주석 상태)
-- SELECT column_name FROM information_schema.columns WHERE table_name='profiles' AND column_name='marketing_consent';
-- SELECT * FROM information_schema.tables WHERE table_name='webhook_events';
-- SELECT proname FROM pg_proc WHERE proname IN ('handle_new_user','delete_user_data');
