-- ============================================
-- 테스트 데이터 정리 + 런칭 전 상태 점검 SQL
-- 2026-04-21 작성
-- 필요한 부분만 선택 실행 (전체 한 번에 돌리지 말 것)
-- ============================================

-- ============================================
-- [1] ekdmay70@naver.com 테스트 계정 플랜 정리
-- 환불 처리 후에도 subscriptions.plan='pro'로 남아있어 관리자 페이지가 pro로 표시되는 이슈 대응
-- 옵션 A: 구독 상태를 expired로 보정 (추천)
-- ============================================
UPDATE subscriptions
   SET status = 'expired', updated_at = now()
 WHERE user_id = (SELECT id FROM profiles WHERE email = 'ekdmay70@naver.com')
   AND status != 'expired';

UPDATE profiles
   SET plan = 'free', updated_at = now()
 WHERE email = 'ekdmay70@naver.com';

UPDATE license_keys
   SET status = 'revoked'
 WHERE user_id = (SELECT id FROM profiles WHERE email = 'ekdmay70@naver.com')
   AND status = 'active';

UPDATE orders
   SET status = 'refunded'
 WHERE user_id = (SELECT id FROM profiles WHERE email = 'ekdmay70@naver.com')
   AND status != 'refunded';


-- ============================================
-- [2] 테스트 데이터 완전 삭제 (옵션 B)
-- 테스트 결제/구독/라이선스 전부 제거하고 순수 Free 상태로 복구하고 싶을 때만 사용
-- ============================================
-- DELETE FROM orders WHERE user_id = (SELECT id FROM profiles WHERE email = 'ekdmay70@naver.com');
-- DELETE FROM license_keys WHERE user_id = (SELECT id FROM profiles WHERE email = 'ekdmay70@naver.com');
-- DELETE FROM subscriptions WHERE user_id = (SELECT id FROM profiles WHERE email = 'ekdmay70@naver.com');


-- ============================================
-- [3] 런칭 전 더미/고아 데이터 점검
-- 결과가 비어있거나 0이 기대값
-- ============================================

-- 고아 auth.users (profiles 없는 계정) 잔여 확인
SELECT COUNT(*) AS orphan_auth_users
  FROM auth.users u
  LEFT JOIN profiles p ON u.id = p.id
 WHERE p.id IS NULL;

-- profiles.plan != subscriptions.plan 불일치 (active 구독 기준)
SELECT p.email, p.plan AS profile_plan, s.plan AS sub_plan, s.status
  FROM profiles p
  LEFT JOIN subscriptions s ON s.user_id = p.id AND s.status = 'active'
 WHERE (s.id IS NOT NULL AND p.plan != s.plan)
    OR (s.id IS NULL AND p.plan != 'free');

-- 활성 구독 중 만료 지난 것 (자동 만료 누락)
SELECT id, user_id, plan, status, current_period_end
  FROM subscriptions
 WHERE status = 'active'
   AND current_period_end IS NOT NULL
   AND current_period_end < now();


-- ============================================
-- [4] themes / components 테이블 더미 데이터 정리
-- 관리자 페이지에 "있지도 않은 데이터"가 보인다는 캡틴 피드백(2026-04-21)에 따라 전부 삭제
-- 실제 테마는 아래 신규 네이밍 컨벤션(sd_v1, pa_v1 등)으로 재시드 예정
-- ============================================

-- 더미 themes 전부 삭제
DELETE FROM themes;

-- 더미 components 전부 삭제
DELETE FROM components;

-- 확인
SELECT 'themes' AS table_name, COUNT(*) AS remaining FROM themes
UNION ALL
SELECT 'components', COUNT(*) FROM components;


-- ============================================
-- [5] 실제 판매 테마 6종 시드 (신규 네이밍 컨벤션 기준)
-- 2026-04-21 리네임 후 실제 templates/ 하위에 존재하는 테마만 등록
-- ============================================

INSERT INTO themes (slug, name, description, category, tags, version, badge, components_count, pages_count, is_public, file_size)
VALUES
  ('sd_v1', 'SoftDesk', 'Neumorphic SaaS admin dashboard with soft shadows and warm cream background', 'SaaS', ARRAY['SaaS','Neumorphism','Admin'], '1.0.0', 'free', 18, 5, true, '2.4 MB'),
  ('pa_v1', 'Pulse Admin', 'Minimal dark-themed SaaS admin dashboard with clean data tables and revenue charts', 'SaaS', ARRAY['SaaS','Dark','Admin','Minimal'], '1.0.0', 'pro', 20, 4, true, '2.1 MB'),
  ('cr_v1', 'CRM Pipeline', 'Clean flat CRM pipeline dashboard with deal tracker and contact management', 'CRM', ARRAY['CRM','Flat','Pipeline','Sales'], '1.0.0', 'pro', 22, 5, true, '2.6 MB'),
  ('ec_v1', 'E-Commerce Admin', 'Glassmorphism e-commerce admin with coral accents and order management', 'E-Commerce', ARRAY['E-Commerce','Glass','Admin'], '1.0.0', 'pro', 24, 5, true, '2.8 MB'),
  ('fi_v1', 'Finance Dashboard', 'Claymorphism finance & wealth management dashboard with emerald accents', 'Finance', ARRAY['Finance','Clay','Wealth'], '1.0.0', 'pro', 26, 6, true, '3.1 MB')
ON CONFLICT (slug) DO NOTHING;
