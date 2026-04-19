-- ============================================
-- Migration: profiles.marketing_consent 컬럼 추가
-- 2026-04-20 | Loops 이메일 자동화 연동을 위한 GDPR 동의 상태 저장
-- ============================================

-- 1. 컬럼 추가 (기본값 false — GDPR 원칙: 명시적 opt-in만)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN NOT NULL DEFAULT false;

-- 2. 기존 신규 사용자 트리거에 marketing_consent 지원 추가 (user_metadata에서 읽기)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, avatar_url, marketing_consent)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::boolean, false)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. 검증 쿼리
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'profiles' AND column_name = 'marketing_consent';
