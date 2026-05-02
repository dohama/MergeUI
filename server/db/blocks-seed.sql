-- ============================================
-- MergeUi Blocks 24종 시드 + RLS 보강 (D-5 풀가동, 마감 5/5)
-- 단일 출처: docs/plans/blocks-d5-plan.md
-- 작성: D(백엔드), 2026-05-01 (D-5)
--
-- 적용 방법 (Supabase SQL Editor):
--   1) 본 파일 전체 1회 실행 — 24종 메타 INSERT + RLS 보강 + 뷰/RPC 생성
--   2) C(프론트)가 templates/blocks/{cat}/{slug}.html 24개 작성 완료(5/4) 후
--      "STEP 2: 코드 컬럼 채우기" 의 UPDATE 문 24개를 채워 재실행
--   3) 모든 INSERT 는 ON CONFLICT (slug) DO NOTHING — 재실행 안전
--   4) RLS 정책/함수/뷰는 DROP IF EXISTS + CREATE OR REPLACE — 재실행 안전
--
-- 보안 원칙 (BM-3 결함 차단):
--   - 현행 schema.sql:200 components_public 정책은 is_public=true 만 검사 →
--     anon 사용자도 .from('components').select('code_html, code_css') 호출로
--     Pro 컴포넌트 코드를 그대로 받을 수 있음 → 결제 우회 가능 (비즈니스 모델 직접 붕괴)
--   - 해결:
--     a) has_active_pro() SECURITY DEFINER 함수 — RLS 재귀 회피하며 활성 Pro 판별
--     b) components_public_view (security_invoker=true, CASE WHEN 컬럼 마스킹) — 카드 그리드용
--     c) get_component_code(p_slug) RPC — 단일 컴포넌트 코드 + locked 플래그 반환
--     d) components 테이블 직접 SELECT 정책은 메타만 노출 (코드 노출은 view/RPC 단일 경로)
--   - 클라이언트(supabase-client.js)는 .from('components').select('code_html|code_css') 호출 금지
--     → getComponents 는 components_public_view, getComponent 는 get_component_code RPC 로 전환
-- ============================================


-- ─────────────────────────────────────────────
-- STEP 1: 24종 메타데이터 시드 (Free 5 / Pro 19)
-- code_html / code_css 는 빈 문자열로 초기화 → STEP 2 에서 채움
-- ─────────────────────────────────────────────

-- 1) Buttons (4종) — Free 3 / Pro 1
INSERT INTO public.components (slug, name, category, badge, description, preview_html, code_html, code_css, is_public)
VALUES
  ('btn-primary',     'Primary Button',     'Buttons', 'free', 'Solid CTA button for primary actions.',           '<button class="btn btn-primary">Get started</button>', '', '', true),
  ('btn-secondary',   'Secondary Button',   'Buttons', 'free', 'Outline button for secondary actions.',           '<button class="btn btn-secondary">Learn more</button>', '', '', true),
  ('btn-ghost',       'Ghost Button',       'Buttons', 'free', 'Text-only button for tertiary actions.',          '<button class="btn btn-ghost">Cancel</button>',         '', '', true),
  ('btn-destructive', 'Destructive Button', 'Buttons', 'pro',  'Destructive variant for delete or cancel flows.', '<button class="btn btn-destructive">Delete</button>',   '', '', true)
ON CONFLICT (slug) DO NOTHING;

-- 2) Cards (4종) — Free 1 / Pro 3
INSERT INTO public.components (slug, name, category, badge, description, preview_html, code_html, code_css, is_public)
VALUES
  ('card-kpi',      'KPI Card',      'Cards', 'free', 'Large metric with delta indicator. Dashboard staple.', '<div class="kpi-card"><span class="kpi-label">MRR</span><span class="kpi-value">$12,847</span><span class="kpi-delta up">+12.4%</span></div>', '', '', true),
  ('card-metric',   'Metric Card',   'Cards', 'pro',  'KPI card with embedded sparkline.',                    '<div class="metric-card"><span class="metric-label">Active users</span><span class="metric-value">2,431</span><div class="metric-spark"></div></div>', '', '', true),
  ('card-feature',  'Feature Card',  'Cards', 'pro',  'Icon + title + description for marketing pages.',      '<article class="feature-card"><div class="feature-icon">★</div><h3>Built for speed</h3><p>Ship faster with copy-paste components.</p></article>', '', '', true),
  ('card-stat-row', 'Stat Row Card', 'Cards', 'pro',  'Four-column stats in a single row card.',              '<div class="stat-row"><div><b>2.4k</b><span>Visits</span></div><div><b>312</b><span>Signups</span></div><div><b>$8.2k</b><span>Revenue</span></div><div><b>4.7%</b><span>Conversion</span></div></div>', '', '', true)
ON CONFLICT (slug) DO NOTHING;

-- 3) Tables (3종) — Free 1 / Pro 2
INSERT INTO public.components (slug, name, category, badge, description, preview_html, code_html, code_css, is_public)
VALUES
  ('table-basic',    'Basic Table',    'Tables', 'free', 'Simple table with header and rows.',    '<table class="table"><thead><tr><th>Name</th><th>Plan</th><th>Status</th></tr></thead><tbody><tr><td>Alex</td><td>Pro</td><td>Active</td></tr><tr><td>Sam</td><td>Free</td><td>Trial</td></tr></tbody></table>', '', '', true),
  ('table-sortable', 'Sortable Table', 'Tables', 'pro',  'Table with column sort indicators.',    '<table class="table table-sortable"><thead><tr><th>Name <span class="sort">^</span></th><th>MRR <span class="sort">v</span></th></tr></thead><tbody><tr><td>Acme Co.</td><td>$1,200</td></tr></tbody></table>', '', '', true),
  ('table-actions',  'Actions Table',  'Tables', 'pro',  'Row-level edit/delete action buttons.', '<table class="table table-actions"><thead><tr><th>User</th><th>Role</th><th></th></tr></thead><tbody><tr><td>Alex</td><td>Admin</td><td><button class="row-act">Edit</button><button class="row-act danger">Delete</button></td></tr></tbody></table>', '', '', true)
ON CONFLICT (slug) DO NOTHING;

-- 4) Forms (4종) — Free 1 / Pro 3
INSERT INTO public.components (slug, name, category, badge, description, preview_html, code_html, code_css, is_public)
VALUES
  ('form-input',    'Text Input',     'Forms', 'free', 'Labeled text input with helper text.',  '<label class="field"><span class="field-label">Email</span><input type="email" class="field-input" placeholder="you@company.com"><span class="field-help">We will never share your email.</span></label>', '', '', true),
  ('form-select',   'Select',         'Forms', 'pro',  'Dropdown select with custom styling.',  '<label class="field"><span class="field-label">Plan</span><select class="field-input"><option>Free</option><option>Pro</option></select></label>', '', '', true),
  ('form-checkbox', 'Checkbox Group', 'Forms', 'pro',  'Multi-select checkbox group.',          '<fieldset class="check-group"><legend>Notifications</legend><label><input type="checkbox" checked> Email</label><label><input type="checkbox"> SMS</label></fieldset>', '', '', true),
  ('form-radio',    'Radio Group',    'Forms', 'pro',  'Single-select radio group.',            '<fieldset class="radio-group"><legend>Plan</legend><label><input type="radio" name="p" checked> Monthly</label><label><input type="radio" name="p"> Annual</label></fieldset>', '', '', true)
ON CONFLICT (slug) DO NOTHING;

-- 5) Charts (4종) — Pro 4
INSERT INTO public.components (slug, name, category, badge, description, preview_html, code_html, code_css, is_public)
VALUES
  ('chart-line',  'Line Chart',  'Charts', 'pro', 'Time-series line chart (Chart.js wrapper).',     '<div class="chart-stub line">Line chart preview</div>',   '', '', true),
  ('chart-bar',   'Bar Chart',   'Charts', 'pro', 'Category comparison bar chart.',                 '<div class="chart-stub bar">Bar chart preview</div>',     '', '', true),
  ('chart-donut', 'Donut Chart', 'Charts', 'pro', 'Distribution donut chart.',                      '<div class="chart-stub donut">Donut chart preview</div>', '', '', true),
  ('chart-area',  'Area Chart',  'Charts', 'pro', 'Stacked area chart for cumulative time-series.', '<div class="chart-stub area">Area chart preview</div>',   '', '', true)
ON CONFLICT (slug) DO NOTHING;

-- 6) Feedback (4종) — Free 1 / Pro 3
INSERT INTO public.components (slug, name, category, badge, description, preview_html, code_html, code_css, is_public)
VALUES
  ('alert-info',  'Alert / Info', 'Feedback', 'free', 'Info / success / warning / error banners.',    '<div class="alert alert-info" role="status">New release v1.2 is available.</div>', '', '', true),
  ('modal-basic', 'Modal',        'Feedback', 'pro',  'Overlay dialog with backdrop and focus trap.', '<div class="modal-stub"><div class="modal-card"><b>Confirm action</b><p>Are you sure you want to delete?</p></div></div>', '', '', true),
  ('toast',       'Toast',        'Feedback', 'pro',  'Top-right transient notification.',            '<div class="toast" role="status">Saved successfully</div>', '', '', true),
  ('badge',       'Badge',        'Feedback', 'pro',  'Inline status / count badge.',                 '<span class="ui-badge">New</span> <span class="ui-badge ok">Active</span> <span class="ui-badge warn">Trial</span>', '', '', true)
ON CONFLICT (slug) DO NOTHING;

-- 7) Navigation (1종) — Pro 1
INSERT INTO public.components (slug, name, category, badge, description, preview_html, code_html, code_css, is_public)
VALUES
  ('tabs', 'Tabs', 'Navigation', 'pro', 'Keyboard-accessible tab navigation.', '<div class="tabs" role="tablist"><button role="tab" aria-selected="true">Overview</button><button role="tab">Activity</button><button role="tab">Settings</button></div>', '', '', true)
ON CONFLICT (slug) DO NOTHING;


-- ─────────────────────────────────────────────
-- STEP 2: 코드 컬럼 채우기 (BC-5 해결 — 2026-05-02)
-- 각 컴포넌트당 사용자가 자기 프로젝트에 붙여넣을 핵심 마크업 + CSS 블록
-- 출처: templates/blocks/{category}/{slug}.html
-- ─────────────────────────────────────────────

-- 1) BUTTONS (4)
UPDATE public.components SET code_html=$code$<button type="button" class="btn btn-primary">Get started</button>$code$, code_css=$code$.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;font-family:inherit;font-size:14px;font-weight:600;line-height:1;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:all .15s ease;-webkit-tap-highlight-color:transparent}.btn:focus-visible{outline:2px solid var(--merge-brand);outline-offset:2px}.btn:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.btn-primary{background:var(--merge-brand);color:#FFFFFF}.btn-primary:hover{background:var(--merge-brand-light)}.btn-primary:active{background:var(--merge-brand-dark)}$code$ WHERE slug='btn-primary';

UPDATE public.components SET code_html=$code$<button type="button" class="btn btn-secondary">Learn more</button>$code$, code_css=$code$.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;font-family:inherit;font-size:14px;font-weight:600;line-height:1;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:all .15s ease}.btn:focus-visible{outline:2px solid var(--merge-brand);outline-offset:2px}.btn:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.btn-secondary{background:transparent;color:var(--merge-text-primary);border-color:var(--merge-border-strong)}.btn-secondary:hover{background:var(--merge-bg-raised);border-color:var(--merge-brand)}.btn-secondary:active{background:var(--merge-bg-surface)}$code$ WHERE slug='btn-secondary';

UPDATE public.components SET code_html=$code$<button type="button" class="btn btn-ghost">Cancel</button>$code$, code_css=$code$.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;font-family:inherit;font-size:14px;font-weight:600;line-height:1;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:all .15s ease}.btn:focus-visible{outline:2px solid var(--merge-brand);outline-offset:2px}.btn:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.btn-ghost{background:transparent;color:var(--merge-text-secondary)}.btn-ghost:hover{background:var(--merge-bg-raised);color:var(--merge-text-primary)}.btn-ghost:active{background:var(--merge-bg-surface)}$code$ WHERE slug='btn-ghost';

UPDATE public.components SET code_html=$code$<button type="button" class="btn btn-destructive">Delete account</button>$code$, code_css=$code$.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;font-family:inherit;font-size:14px;font-weight:600;line-height:1;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:all .15s ease}.btn:focus-visible{outline:2px solid var(--merge-error);outline-offset:2px}.btn:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.btn-destructive{background:var(--merge-error);color:#FFFFFF}.btn-destructive:hover{background:#DC2626}.btn-destructive:active{background:#B91C1C}$code$ WHERE slug='btn-destructive';

-- 2) CARDS (4)
UPDATE public.components SET code_html=$code$<article class="kpi-card" aria-label="Monthly Revenue KPI"><span class="kpi-label">Monthly Revenue</span><span class="kpi-value">$48,290</span><span class="kpi-delta up">+12.5% <small>vs last month</small></span></article>$code$, code_css=$code$.kpi-card{display:flex;flex-direction:column;gap:4px;min-width:240px;padding:20px 24px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:12px;font-family:inherit}.kpi-label{font-size:12px;font-weight:500;color:var(--merge-text-muted);text-transform:uppercase;letter-spacing:.4px}.kpi-value{font-size:28px;font-weight:800;letter-spacing:-1px;color:var(--merge-text-primary);margin-top:4px}.kpi-delta{font-size:12px;font-weight:600;margin-top:4px}.kpi-delta.up{color:var(--merge-success)}.kpi-delta.down{color:var(--merge-error)}.kpi-delta small{color:var(--merge-text-muted);font-weight:400;margin-left:4px}$code$ WHERE slug='card-kpi';

UPDATE public.components SET code_html=$code$<article class="metric-card" aria-label="Active users metric"><div class="metric-head"><span class="metric-label">Active users</span><span class="metric-delta up">+8.2%</span></div><span class="metric-value">2,431</span><svg class="metric-spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,22 12,18 24,20 36,14 48,16 60,10 72,12 84,6 100,8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></article>$code$, code_css=$code$.metric-card{display:flex;flex-direction:column;gap:8px;min-width:260px;padding:20px 24px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:12px;font-family:inherit}.metric-head{display:flex;align-items:center;justify-content:space-between}.metric-label{font-size:12px;font-weight:500;color:var(--merge-text-muted);text-transform:uppercase;letter-spacing:.4px}.metric-delta{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px}.metric-delta.up{background:rgba(34,197,94,.12);color:var(--merge-success)}.metric-delta.down{background:rgba(239,68,68,.12);color:var(--merge-error)}.metric-value{font-size:28px;font-weight:800;letter-spacing:-1px;color:var(--merge-text-primary)}.metric-spark{width:100%;height:36px;color:var(--merge-brand-light);margin-top:4px}$code$ WHERE slug='card-metric';

UPDATE public.components SET code_html=$code$<article class="feature-card"><div class="feature-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><h3 class="feature-title">Built for speed</h3><p class="feature-desc">Ship faster with copy-paste components and zero runtime cost.</p></article>$code$, code_css=$code$.feature-card{display:flex;flex-direction:column;gap:12px;max-width:320px;padding:24px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:12px;font-family:inherit}.feature-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:rgba(108,92,231,.12);color:var(--merge-brand-light);border-radius:10px}.feature-title{font-size:16px;font-weight:700;color:var(--merge-text-primary);margin:0}.feature-desc{font-size:14px;line-height:1.6;color:var(--merge-text-secondary);margin:0}$code$ WHERE slug='card-feature';

UPDATE public.components SET code_html=$code$<section class="stat-row" aria-label="Site analytics summary"><div class="stat-cell"><b>2,431</b><span>Visits</span></div><div class="stat-cell"><b>312</b><span>Signups</span></div><div class="stat-cell"><b>$8.2k</b><span>Revenue</span></div><div class="stat-cell"><b>4.7%</b><span>Conversion</span></div></section>$code$, code_css=$code$.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;width:100%;max-width:720px;background:var(--merge-border);border:1px solid var(--merge-border);border-radius:12px;overflow:hidden;font-family:inherit}.stat-cell{display:flex;flex-direction:column;align-items:flex-start;gap:4px;padding:16px 20px;background:var(--merge-bg-surface)}.stat-cell b{font-size:22px;font-weight:800;color:var(--merge-text-primary);letter-spacing:-.5px}.stat-cell span{font-size:12px;font-weight:500;color:var(--merge-text-muted);text-transform:uppercase;letter-spacing:.4px}@media (max-width:640px){.stat-row{grid-template-columns:repeat(2,1fr)}}$code$ WHERE slug='card-stat-row';

-- 3) TABLES (3)
UPDATE public.components SET code_html=$code$<table class="table" aria-label="Members list"><thead><tr><th scope="col">Name</th><th scope="col">Plan</th><th scope="col">Status</th></tr></thead><tbody><tr><td>Alex Kim</td><td>Pro</td><td>Active</td></tr><tr><td>Sam Park</td><td>Free</td><td>Trial</td></tr></tbody></table>$code$, code_css=$code$.table{width:100%;border-collapse:collapse;font-family:inherit;font-size:14px;color:var(--merge-text-primary)}.table th{text-align:left;padding:12px 16px;font-size:11px;font-weight:700;color:var(--merge-text-muted);text-transform:uppercase;letter-spacing:.5px;background:var(--merge-bg-surface);border-bottom:1px solid var(--merge-border)}.table td{padding:14px 16px;border-bottom:1px solid var(--merge-border)}.table tbody tr:last-child td{border-bottom:none}.table tbody tr:hover td{background:var(--merge-bg-raised)}$code$ WHERE slug='table-basic';

UPDATE public.components SET code_html=$code$<table class="table table-sortable" aria-label="Customer accounts"><thead><tr><th scope="col"><button type="button" class="sort-btn" aria-sort="ascending">Name <span class="sort-ind">▲</span></button></th><th scope="col"><button type="button" class="sort-btn" aria-sort="none">MRR <span class="sort-ind">▼</span></button></th></tr></thead><tbody><tr><td>Acme Co.</td><td>$1,200</td></tr><tr><td>Globex Ltd.</td><td>$890</td></tr></tbody></table>$code$, code_css=$code$.table{width:100%;border-collapse:collapse;font-family:inherit;font-size:14px;color:var(--merge-text-primary)}.table th{text-align:left;padding:0;background:var(--merge-bg-surface);border-bottom:1px solid var(--merge-border)}.sort-btn{display:flex;align-items:center;gap:6px;width:100%;padding:12px 16px;background:none;border:none;color:var(--merge-text-muted);font-family:inherit;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;cursor:pointer;text-align:left}.sort-btn:hover{color:var(--merge-text-primary)}.sort-btn:focus-visible{outline:2px solid var(--merge-brand);outline-offset:-2px}.sort-btn[aria-sort="ascending"],.sort-btn[aria-sort="descending"]{color:var(--merge-brand-light)}.sort-ind{font-size:10px;opacity:.4}.sort-btn[aria-sort="ascending"] .sort-ind,.sort-btn[aria-sort="descending"] .sort-ind{opacity:1}.table td{padding:14px 16px;border-bottom:1px solid var(--merge-border)}$code$ WHERE slug='table-sortable';

UPDATE public.components SET code_html=$code$<table class="table table-actions" aria-label="Team members"><thead><tr><th scope="col">User</th><th scope="col">Role</th><th scope="col" aria-label="Actions"></th></tr></thead><tbody><tr><td>Alex Kim</td><td>Admin</td><td><div class="row-actions"><button type="button" class="row-act" aria-label="Edit Alex Kim">Edit</button><button type="button" class="row-act danger" aria-label="Delete Alex Kim">Delete</button></div></td></tr></tbody></table>$code$, code_css=$code$.table{width:100%;border-collapse:collapse;font-family:inherit;font-size:14px;color:var(--merge-text-primary)}.table th{text-align:left;padding:12px 16px;font-size:11px;font-weight:700;color:var(--merge-text-muted);text-transform:uppercase;letter-spacing:.5px;background:var(--merge-bg-surface);border-bottom:1px solid var(--merge-border)}.table td{padding:12px 16px;border-bottom:1px solid var(--merge-border)}.row-actions{display:flex;gap:6px;justify-content:flex-end}.row-act{padding:6px 12px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:6px;font-family:inherit;font-size:12px;font-weight:600;color:var(--merge-text-secondary);cursor:pointer;transition:all .12s}.row-act:hover{border-color:var(--merge-brand);color:var(--merge-brand-light)}.row-act:focus-visible{outline:2px solid var(--merge-brand);outline-offset:2px}.row-act.danger{color:#FCA5A5;border-color:rgba(239,68,68,.2)}.row-act.danger:hover{background:rgba(239,68,68,.1);border-color:var(--merge-error);color:var(--merge-error)}$code$ WHERE slug='table-actions';

-- 4) FORMS (4)
UPDATE public.components SET code_html=$code$<label class="field"><span class="field-label">Email</span><input type="email" class="field-input" placeholder="you@company.com" autocomplete="email"><span class="field-help">We will never share your email.</span></label>$code$, code_css=$code$.field{display:flex;flex-direction:column;gap:6px;font-family:inherit;max-width:360px;width:100%}.field-label{font-size:13px;font-weight:600;color:var(--merge-text-primary)}.field-input{padding:10px 14px;background:var(--merge-bg-raised);border:1px solid var(--merge-border-strong);border-radius:8px;font-family:inherit;font-size:14px;color:var(--merge-text-primary);outline:none;transition:border-color .15s,box-shadow .15s}.field-input::placeholder{color:var(--merge-text-muted)}.field-input:focus{border-color:var(--merge-brand);box-shadow:0 0 0 3px rgba(108,92,231,.15)}.field-input:disabled{opacity:.5;cursor:not-allowed}.field-input[aria-invalid="true"]{border-color:var(--merge-error);box-shadow:0 0 0 3px rgba(239,68,68,.15)}.field-help{font-size:12px;color:var(--merge-text-muted)}.field-help.error{color:var(--merge-error)}$code$ WHERE slug='form-input';

UPDATE public.components SET code_html=$code$<label class="field"><span class="field-label">Plan</span><select class="field-input field-select"><option>Free</option><option selected>Pro</option><option>Team</option></select></label>$code$, code_css=$code$.field{display:flex;flex-direction:column;gap:6px;font-family:inherit;max-width:360px;width:100%}.field-label{font-size:13px;font-weight:600;color:var(--merge-text-primary)}.field-input{padding:10px 14px;background:var(--merge-bg-raised);border:1px solid var(--merge-border-strong);border-radius:8px;font-family:inherit;font-size:14px;color:var(--merge-text-primary);outline:none;transition:border-color .15s,box-shadow .15s}.field-input:focus{border-color:var(--merge-brand);box-shadow:0 0 0 3px rgba(108,92,231,.15)}.field-input:disabled{opacity:.5;cursor:not-allowed}.field-select{-webkit-appearance:none;appearance:none;padding-right:36px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2380808A' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;cursor:pointer}$code$ WHERE slug='form-select';

UPDATE public.components SET code_html=$code$<fieldset class="check-group"><legend class="cg-legend">Notifications</legend><label class="check-item"><input type="checkbox" checked> <span>Email updates</span></label><label class="check-item"><input type="checkbox"> <span>SMS alerts</span></label><label class="check-item"><input type="checkbox" checked> <span>Push notifications</span></label></fieldset>$code$, code_css=$code$.check-group{display:flex;flex-direction:column;gap:10px;padding:16px 20px;border:1px solid var(--merge-border);border-radius:8px;font-family:inherit;background:var(--merge-bg-surface);max-width:360px;width:100%}.cg-legend{padding:0 6px;font-size:13px;font-weight:600;color:var(--merge-text-primary)}.check-item{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--merge-text-secondary);cursor:pointer}.check-item input[type="checkbox"]{width:16px;height:16px;accent-color:var(--merge-brand);cursor:pointer}.check-item input[type="checkbox"]:focus-visible{outline:2px solid var(--merge-brand);outline-offset:2px;border-radius:3px}.check-item:hover span{color:var(--merge-text-primary)}.check-item input[type="checkbox"]:disabled + span{opacity:.5;cursor:not-allowed}$code$ WHERE slug='form-checkbox';

UPDATE public.components SET code_html=$code$<fieldset class="radio-group"><legend class="rg-legend">Billing cycle</legend><label class="radio-item"><input type="radio" name="cycle" checked> <span>Monthly — $19/mo</span></label><label class="radio-item"><input type="radio" name="cycle"> <span>Annual — $149/yr (save 35%)</span></label></fieldset>$code$, code_css=$code$.radio-group{display:flex;flex-direction:column;gap:10px;padding:16px 20px;border:1px solid var(--merge-border);border-radius:8px;font-family:inherit;background:var(--merge-bg-surface);max-width:360px;width:100%}.rg-legend{padding:0 6px;font-size:13px;font-weight:600;color:var(--merge-text-primary)}.radio-item{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--merge-text-secondary);cursor:pointer}.radio-item input[type="radio"]{width:16px;height:16px;accent-color:var(--merge-brand);cursor:pointer}.radio-item input[type="radio"]:focus-visible{outline:2px solid var(--merge-brand);outline-offset:2px;border-radius:50%}.radio-item:hover span{color:var(--merge-text-primary)}.radio-item input[type="radio"]:checked + span{color:var(--merge-text-primary);font-weight:500}$code$ WHERE slug='form-radio';

-- 5) CHARTS (4) — pure SVG, zero deps
UPDATE public.components SET code_html=$code$<article class="chart-card" aria-label="Monthly revenue chart"><div class="chart-head"><span class="chart-title">Monthly Revenue</span><span class="chart-value">$48,290</span></div><svg class="chart-svg" viewBox="0 0 320 180" preserveAspectRatio="none" role="img" aria-label="Revenue trending up"><defs><linearGradient id="mu-line-grad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#818CF8" stop-opacity="0.45"/><stop offset="1" stop-color="#818CF8" stop-opacity="0"/></linearGradient></defs><line class="chart-axis" x1="0" y1="40" x2="320" y2="40"/><line class="chart-axis" x1="0" y1="90" x2="320" y2="90"/><line class="chart-axis" x1="0" y1="140" x2="320" y2="140"/><polygon class="chart-fill" points="0,160 0,120 45,100 90,108 135,72 180,82 225,52 270,40 320,32 320,160"/><polyline class="chart-line" points="0,120 45,100 90,108 135,72 180,82 225,52 270,40 320,32"/></svg></article>$code$, code_css=$code$.chart-card{padding:20px 24px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:12px;font-family:inherit}.chart-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px}.chart-title{font-size:13px;font-weight:600;color:var(--merge-text-muted);text-transform:uppercase;letter-spacing:.4px}.chart-value{font-size:22px;font-weight:800;color:var(--merge-text-primary);letter-spacing:-.5px}.chart-svg{width:100%;height:180px;display:block;overflow:visible}.chart-axis{stroke:var(--merge-border);stroke-width:1}.chart-line{fill:none;stroke:#818CF8;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}.chart-fill{fill:url(#mu-line-grad);stroke:none}$code$ WHERE slug='chart-line';

UPDATE public.components SET code_html=$code$<article class="chart-card" aria-label="Sales by category"><div class="chart-head"><span class="chart-title">Sales by Category</span><span class="chart-value">12,408</span></div><svg class="chart-svg" viewBox="0 0 320 180" role="img"><line class="chart-axis" x1="0" y1="160" x2="320" y2="160"/><rect class="chart-bar" x="14" y="60" width="32" height="100" rx="4" fill="#818CF8"/><rect class="chart-bar" x="62" y="40" width="32" height="120" rx="4" fill="#22D3EE"/><rect class="chart-bar" x="110" y="80" width="32" height="80" rx="4" fill="#A78BFA"/><rect class="chart-bar" x="158" y="30" width="32" height="130" rx="4" fill="#FB7185"/><rect class="chart-bar" x="206" y="70" width="32" height="90" rx="4" fill="#34D399"/><rect class="chart-bar" x="254" y="50" width="32" height="110" rx="4" fill="#FBBF24"/></svg></article>$code$, code_css=$code$.chart-card{padding:20px 24px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:12px;font-family:inherit}.chart-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px}.chart-title{font-size:13px;font-weight:600;color:var(--merge-text-muted);text-transform:uppercase;letter-spacing:.4px}.chart-value{font-size:22px;font-weight:800;color:var(--merge-text-primary);letter-spacing:-.5px}.chart-svg{width:100%;height:200px;display:block}.chart-axis{stroke:var(--merge-border);stroke-width:1}.chart-bar{transition:opacity .12s}.chart-bar:hover{opacity:.85}$code$ WHERE slug='chart-bar';

UPDATE public.components SET code_html=$code$<article class="chart-card" aria-label="Plan distribution"><svg class="donut-svg" viewBox="0 0 160 160" role="img" aria-label="Plan share"><circle class="donut-track" cx="80" cy="80" r="60"/><circle class="donut-arc" cx="80" cy="80" r="60" stroke="#818CF8" stroke-dasharray="158 377"/><circle class="donut-arc" cx="80" cy="80" r="60" stroke="#22D3EE" stroke-dasharray="120 377" stroke-dashoffset="-158"/><circle class="donut-arc" cx="80" cy="80" r="60" stroke="#A78BFA" stroke-dasharray="60 377" stroke-dashoffset="-278"/><circle class="donut-arc" cx="80" cy="80" r="60" stroke="#FB7185" stroke-dasharray="39 377" stroke-dashoffset="-338"/><text class="donut-center v" x="80" y="78">2.4k</text><text class="donut-center l" x="80" y="96">Total users</text></svg><ul class="legend"><li class="legend-item"><span class="legend-dot" style="background:#818CF8"></span>Free <span class="legend-pct">42%</span></li><li class="legend-item"><span class="legend-dot" style="background:#22D3EE"></span>Pro <span class="legend-pct">32%</span></li><li class="legend-item"><span class="legend-dot" style="background:#A78BFA"></span>Team <span class="legend-pct">16%</span></li><li class="legend-item"><span class="legend-dot" style="background:#FB7185"></span>Trial <span class="legend-pct">10%</span></li></ul></article>$code$, code_css=$code$.chart-card{padding:24px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:12px;font-family:inherit;display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:center}.donut-svg{width:140px;height:140px;display:block}.donut-track{fill:none;stroke:var(--merge-bg-raised);stroke-width:22}.donut-arc{fill:none;stroke-width:22;transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset .4s ease-out}.donut-center{font-family:inherit;text-anchor:middle}.donut-center .v{fill:var(--merge-text-primary);font-size:20px;font-weight:800}.donut-center .l{fill:var(--merge-text-muted);font-size:10px}.legend{display:flex;flex-direction:column;gap:8px;list-style:none;padding:0;margin:0}.legend-item{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--merge-text-secondary)}.legend-dot{width:10px;height:10px;border-radius:3px;flex-shrink:0}.legend-pct{margin-left:auto;font-weight:600;color:var(--merge-text-primary)}$code$ WHERE slug='chart-donut';

UPDATE public.components SET code_html=$code$<article class="chart-card" aria-label="Daily active users"><div class="chart-head"><span class="chart-title">Daily Active Users</span><div class="chart-legend"><span><i style="background:#818CF8"></i>Pro</span><span><i style="background:#22D3EE"></i>Free</span></div></div><svg class="chart-svg" viewBox="0 0 320 180" preserveAspectRatio="none" role="img"><defs><linearGradient id="mu-area-1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#22D3EE" stop-opacity="0.55"/><stop offset="1" stop-color="#22D3EE" stop-opacity="0.05"/></linearGradient><linearGradient id="mu-area-2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#818CF8" stop-opacity="0.7"/><stop offset="1" stop-color="#818CF8" stop-opacity="0.1"/></linearGradient></defs><line class="chart-axis" x1="0" y1="40" x2="320" y2="40"/><line class="chart-axis" x1="0" y1="90" x2="320" y2="90"/><line class="chart-axis" x1="0" y1="140" x2="320" y2="140"/><polygon fill="url(#mu-area-1)" stroke="#22D3EE" stroke-width="1.5" points="0,160 0,90 45,75 90,82 135,55 180,65 225,40 270,45 320,38 320,160"/><polygon fill="url(#mu-area-2)" stroke="#818CF8" stroke-width="1.5" points="0,160 0,125 45,108 90,118 135,92 180,102 225,80 270,76 320,72 320,160"/></svg></article>$code$, code_css=$code$.chart-card{padding:20px 24px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:12px;font-family:inherit}.chart-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px}.chart-title{font-size:13px;font-weight:600;color:var(--merge-text-muted);text-transform:uppercase;letter-spacing:.4px}.chart-legend{display:flex;gap:12px;font-size:11px;color:var(--merge-text-muted)}.chart-legend span{display:inline-flex;align-items:center;gap:6px}.chart-legend i{width:8px;height:8px;border-radius:2px;display:inline-block}.chart-svg{width:100%;height:180px;display:block;overflow:visible}.chart-axis{stroke:var(--merge-border);stroke-width:1}$code$ WHERE slug='chart-area';

-- 6) FEEDBACK (4)
UPDATE public.components SET code_html=$code$<div class="alert alert-info" role="status"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><div><strong>Heads up.</strong> A new release v1.2 is now available.</div></div>$code$, code_css=$code$.alert{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border:1px solid transparent;border-radius:8px;font-family:inherit;font-size:14px;line-height:1.5}.alert svg{flex-shrink:0;margin-top:2px}.alert strong{font-weight:700;margin-right:4px}.alert-info{background:rgba(59,130,246,.10);border-color:rgba(59,130,246,.25);color:#93C5FD}.alert-success{background:rgba(34,197,94,.10);border-color:rgba(34,197,94,.25);color:#86EFAC}.alert-warning{background:rgba(251,191,36,.10);border-color:rgba(251,191,36,.25);color:#FCD34D}.alert-error{background:rgba(239,68,68,.10);border-color:rgba(239,68,68,.25);color:#FCA5A5}$code$ WHERE slug='alert-info';

UPDATE public.components SET code_html=$code$<dialog id="myModal" class="modal" aria-labelledby="modalTitle" aria-describedby="modalDesc"><form method="dialog" class="modal-card"><h3 id="modalTitle" class="modal-title">Delete this item?</h3><p id="modalDesc" class="modal-body">This action cannot be undone.</p><div class="modal-actions"><button type="submit" value="cancel" class="btn btn-ghost">Cancel</button><button type="submit" value="ok" class="btn btn-destructive">Delete</button></div></form></dialog>$code$, code_css=$code$.modal{padding:0;background:transparent;border:none;color:var(--merge-text-primary)}.modal::backdrop{background:rgba(0,0,0,.6);backdrop-filter:blur(4px);animation:mu-fade .15s ease-out}.modal[open]{animation:mu-pop .18s ease-out}.modal-card{min-width:320px;max-width:480px;padding:24px;background:var(--merge-bg-raised);border:1px solid var(--merge-border-strong);border-radius:14px;font-family:inherit;display:flex;flex-direction:column;gap:12px}.modal-title{margin:0;font-size:18px;font-weight:700;color:var(--merge-text-primary)}.modal-body{margin:0;font-size:14px;line-height:1.6;color:var(--merge-text-secondary)}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}@keyframes mu-fade{from{opacity:0}to{opacity:1}}@keyframes mu-pop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}$code$ WHERE slug='modal-basic';

UPDATE public.components SET code_html=$code$<div class="toast-host"></div><script>(function(){var host=document.querySelector(".toast-host");function show(msg,opts){opts=opts||{};var variant=opts.variant||"info";var t=document.createElement("div");t.className="toast "+variant;t.setAttribute("role",variant==="error"?"alert":"status");t.setAttribute("aria-live",variant==="error"?"assertive":"polite");t.textContent=msg;host.appendChild(t);setTimeout(function(){t.classList.add("leaving");t.addEventListener("animationend",function(){t.remove()},{once:true})},opts.duration||3000)}window.MergeToast={show:show}})();</script>$code$, code_css=$code$.toast-host{position:fixed;top:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none}.toast{display:inline-flex;align-items:center;gap:10px;padding:10px 16px;background:var(--merge-bg-raised);border:1px solid var(--merge-border-strong);border-radius:10px;font-family:inherit;font-size:14px;font-weight:500;color:var(--merge-text-primary);box-shadow:var(--merge-shadow-card-hover);pointer-events:auto;animation:toast-in .18s ease-out}.toast.success{border-color:rgba(34,197,94,.25)}.toast.error{border-color:rgba(239,68,68,.25)}.toast.leaving{animation:toast-out .18s ease-in forwards}@keyframes toast-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}@keyframes toast-out{from{opacity:1;transform:none}to{opacity:0;transform:translateX(20px)}}$code$ WHERE slug='toast';

UPDATE public.components SET code_html=$code$<span class="ui-badge">New</span> <span class="ui-badge ok">Active</span> <span class="ui-badge warn">Trial</span> <span class="ui-badge danger">Failed</span> <span class="ui-badge info">Beta</span> <span class="ui-badge solid">Pro</span>$code$, code_css=$code$.ui-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;background:rgba(108,92,231,.15);color:var(--merge-brand-light);font-family:inherit;font-size:11px;font-weight:700;letter-spacing:.3px;border-radius:999px;text-transform:uppercase;vertical-align:middle}.ui-badge.ok{background:rgba(34,197,94,.15);color:var(--merge-success)}.ui-badge.warn{background:rgba(251,191,36,.15);color:var(--merge-warning)}.ui-badge.danger{background:rgba(239,68,68,.15);color:#FCA5A5}.ui-badge.info{background:rgba(59,130,246,.15);color:#93C5FD}.ui-badge.neutral{background:var(--merge-bg-surface);color:var(--merge-text-secondary);border:1px solid var(--merge-border)}.ui-badge.solid{background:var(--merge-brand);color:#FFFFFF}.ui-badge.dot::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block}.ui-badge.count{padding:0 6px;min-width:18px;height:18px;justify-content:center;font-size:10px}$code$ WHERE slug='badge';

-- 7) NAVIGATION (1)
UPDATE public.components SET code_html=$code$<div class="tabs"><div role="tablist" class="tabs-list" aria-label="Project sections"><button role="tab" id="t1" class="tabs-tab" aria-selected="true" aria-controls="p1" tabindex="0">Overview</button><button role="tab" id="t2" class="tabs-tab" aria-selected="false" aria-controls="p2" tabindex="-1">Activity</button><button role="tab" id="t3" class="tabs-tab" aria-selected="false" aria-controls="p3" tabindex="-1">Settings</button></div><div role="tabpanel" id="p1" class="tabs-panel" aria-labelledby="t1" tabindex="0">Overview content.</div><div role="tabpanel" id="p2" class="tabs-panel" aria-labelledby="t2" tabindex="0" hidden>Activity content.</div><div role="tabpanel" id="p3" class="tabs-panel" aria-labelledby="t3" tabindex="0" hidden>Settings content.</div></div><script>(function(){document.querySelectorAll(".tabs").forEach(function(root){var tabs=Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));function activate(tab,focus){tabs.forEach(function(t){var sel=t===tab;t.setAttribute("aria-selected",String(sel));t.tabIndex=sel?0:-1;var panelId=t.getAttribute("aria-controls");var panel=panelId?root.querySelector("#"+panelId):null;if(panel)panel.hidden=!sel});if(focus!==false)tab.focus()}tabs.forEach(function(tab,i){tab.addEventListener("click",function(){activate(tab)});tab.addEventListener("keydown",function(e){var next=null;if(e.key==="ArrowRight")next=tabs[(i+1)%tabs.length];else if(e.key==="ArrowLeft")next=tabs[(i-1+tabs.length)%tabs.length];else if(e.key==="Home")next=tabs[0];else if(e.key==="End")next=tabs[tabs.length-1];if(next){e.preventDefault();activate(next)}})})})})();</script>$code$, code_css=$code$.tabs{font-family:inherit}.tabs-list{display:flex;gap:4px;border-bottom:1px solid var(--merge-border);position:relative}.tabs-tab{padding:10px 16px;background:none;border:none;border-bottom:2px solid transparent;color:var(--merge-text-muted);font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:color .15s,border-color .25s ease;margin-bottom:-1px}.tabs-tab:hover{color:var(--merge-text-primary)}.tabs-tab:focus-visible{outline:2px solid var(--merge-brand);outline-offset:2px;border-radius:4px 4px 0 0}.tabs-tab[aria-selected="true"]{color:var(--merge-brand-light);border-bottom-color:var(--merge-brand)}.tabs-panel{padding:20px 4px;font-size:14px;line-height:1.6;color:var(--merge-text-secondary);animation:tabs-fade .18s ease-out}.tabs-panel[hidden]{display:none}@keyframes tabs-fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}$code$ WHERE slug='tabs';


-- ─────────────────────────────────────────────
-- STEP 3: RLS 보강 — Free/Pro 차등 코드 노출 (BM-3 결함 차단)
-- ─────────────────────────────────────────────

-- 3-1) Active Pro/Team 구독자 판별 함수
CREATE OR REPLACE FUNCTION public.has_active_pro()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
      FROM public.subscriptions s
     WHERE s.user_id = auth.uid()
       AND s.status = 'active'
       AND s.plan IN ('pro', 'team')
       AND (s.current_period_end IS NULL OR s.current_period_end > now())
  );
$$;

GRANT EXECUTE ON FUNCTION public.has_active_pro() TO anon, authenticated;

-- 3-2) 메타 + 코드 마스킹 뷰
CREATE OR REPLACE VIEW public.components_public_view
WITH (security_invoker = true) AS
SELECT
  c.id,
  c.slug,
  c.name,
  c.description,
  c.category,
  c.badge,
  c.version,
  c.preview_html,
  CASE
    WHEN c.badge = 'free' THEN c.code_html
    WHEN public.has_active_pro() THEN c.code_html
    ELSE NULL
  END AS code_html,
  CASE
    WHEN c.badge = 'free' THEN c.code_css
    WHEN public.has_active_pro() THEN c.code_css
    ELSE NULL
  END AS code_css,
  c.is_public,
  c.created_at,
  c.updated_at
FROM public.components c
WHERE c.is_public = true;

GRANT SELECT ON public.components_public_view TO anon, authenticated;

-- 3-3) 단일 컴포넌트 코드 RPC
CREATE OR REPLACE FUNCTION public.get_component_code(p_slug TEXT)
RETURNS TABLE(slug TEXT, badge TEXT, code_html TEXT, code_css TEXT, locked BOOLEAN)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.slug,
    c.badge,
    CASE WHEN c.badge = 'free' OR public.has_active_pro() THEN c.code_html ELSE NULL END AS code_html,
    CASE WHEN c.badge = 'free' OR public.has_active_pro() THEN c.code_css  ELSE NULL END AS code_css,
    (c.badge = 'pro' AND NOT public.has_active_pro()) AS locked
  FROM public.components c
  WHERE c.slug = p_slug
    AND c.is_public = true
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_component_code(TEXT) TO anon, authenticated;

-- 3-4) components 테이블 SELECT 정책 — 메타만 공개 (코드 노출은 view/RPC 가 담당)
DROP POLICY IF EXISTS components_public ON public.components;
DROP POLICY IF EXISTS components_meta_select ON public.components;
CREATE POLICY components_meta_select ON public.components FOR SELECT USING (is_public = true);

-- 3-5) Admin 전체 컴포넌트 관리
DROP POLICY IF EXISTS components_admin_all ON public.components;
CREATE POLICY components_admin_all ON public.components FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ─────────────────────────────────────────────
-- STEP 4: 검증 쿼리 (5/5 E 합동 검증용 — 주석 상태)
-- ─────────────────────────────────────────────
-- a) SELECT count(*) FROM public.components WHERE is_public = true;             -- 24
-- b) SELECT category, count(*) FROM public.components GROUP BY category;         -- 7개 카테고리
-- c) SELECT badge, count(*) FROM public.components GROUP BY badge;               -- free=5, pro=19
-- d) SET ROLE anon; SELECT slug, badge, code_html IS NOT NULL FROM public.components_public_view; RESET ROLE;
-- e) SELECT * FROM public.get_component_code('btn-destructive');                  -- locked=true (anon)
-- f) SELECT * FROM public.get_component_code('btn-primary');                      -- locked=false
