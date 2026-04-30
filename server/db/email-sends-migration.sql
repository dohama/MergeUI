-- ─────────────────────────────────────────────────────────────
-- D-11: email_sends 테이블 — 발송 멱등성/이력 추적
-- ─────────────────────────────────────────────────────────────
-- 목적:
--   admin/send-email 라우트에서 동일 idempotency_key + recipient_email
--   조합으로 5분 내 재발송을 차단 (재시도 시 중복 발송 방지).
--
-- 캡틴 실행 방법 (Supabase):
--   1. Supabase 대시보드 → 좌측 메뉴 "SQL Editor" 클릭
--   2. 우측 상단 "+ New query" 버튼
--   3. 본 파일 내용 전체 복사 → 붙여넣기
--   4. 우측 하단 "Run" 버튼 (또는 Ctrl+Enter)
--   5. 결과창에 "Success. No rows returned" 가 나오면 완료
--
-- 안전성:
--   - IF NOT EXISTS 로 멱등 — 여러 번 실행해도 안전
--   - 기존 데이터 영향 없음 (신규 테이블)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.email_sends (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  template_id     TEXT,
  status          TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'skipped')),
  sent_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  error           JSONB
);

-- 멱등성 조회용 — (key, email) 빠른 조회
CREATE INDEX IF NOT EXISTS idx_email_sends_idem
  ON public.email_sends (idempotency_key, recipient_email, sent_at DESC);

-- 발송 이력 시간순 조회 (관리자 대시보드)
CREATE INDEX IF NOT EXISTS idx_email_sends_sent_at
  ON public.email_sends (sent_at DESC);

-- RLS — service_role 만 쓰기 (admin handler 가 supabaseAdmin 으로 접근)
ALTER TABLE public.email_sends ENABLE ROW LEVEL SECURITY;

-- 일반 사용자 접근 차단 (SELECT/INSERT/UPDATE/DELETE 모두 service_role 한정)
DROP POLICY IF EXISTS "email_sends_service_only" ON public.email_sends;
CREATE POLICY "email_sends_service_only" ON public.email_sends
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- 코멘트
COMMENT ON TABLE  public.email_sends IS 'D-11: admin/send-email 멱등성 키 + 발송 이력. 5분 내 동일 (idempotency_key, recipient_email) 재발송 차단.';
COMMENT ON COLUMN public.email_sends.idempotency_key IS '클라이언트 제공 또는 서버 자동 생성 (release_id+segment 등).';
COMMENT ON COLUMN public.email_sends.status IS 'sent | failed | skipped (이미 발송됨)';
