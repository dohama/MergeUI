-- ============================================
-- MergeUi Blocks v2 시드 — 10개 신규 컴포넌트 (총 24 → 34개)
-- 단일 출처: docs/plans/master-todo.md (5/5 캡틴 추가 지시)
-- 작성: D(백엔드), 2026-05-05 (D-1)
--
-- 적용 방법 (Supabase SQL Editor):
--   1) 본 파일 전체 1회 실행 — 10개 신규 컴포넌트 INSERT (메타 + code_html + code_css)
--   2) ON CONFLICT (slug) DO UPDATE — 재실행 시 기존 row 갱신
--
-- 신규 카테고리: display, overlay (기존 7개 + 2개 = 9개 카테고리)
-- Free 5 / Pro 5 분배
-- ============================================

INSERT INTO public.components (slug, name, category, badge, description, preview_html, code_html, code_css, is_public)
VALUES
  -- 1) Avatar (display, free) — 사용자 프로필 아이콘 + stack
  ('avatar', 'Avatar', 'Display', 'free',
   'User avatar with size variants, status dot, and stack composition.',
   '<span class="avatar">DH</span>',
   E'<span class="avatar avatar-sm">JK</span>\n<span class="avatar">DH</span>\n<span class="avatar avatar-lg">MR</span>\n<span class="avatar avatar-with-status">AL<span class="status-dot"></span></span>\n<div class="avatar-stack">\n  <span class="avatar">JK</span>\n  <span class="avatar">DH</span>\n  <span class="avatar avatar-more">+4</span>\n</div>',
   E'.avatar{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--merge-brand),var(--merge-brand-light));color:#FFFFFF;font-weight:600;font-size:14px;overflow:hidden;flex-shrink:0;user-select:none}\n.avatar img{width:100%;height:100%;object-fit:cover}\n.avatar-sm{width:28px;height:28px;font-size:11px}\n.avatar-lg{width:56px;height:56px;font-size:20px}\n.avatar-xl{width:80px;height:80px;font-size:28px}\n.avatar-with-status{position:relative}\n.avatar-with-status .status-dot{position:absolute;bottom:0;right:0;width:10px;height:10px;border-radius:50%;background:var(--merge-success);border:2px solid var(--merge-bg-base)}\n.avatar-stack{display:inline-flex}\n.avatar-stack .avatar{margin-left:-10px;border:2px solid var(--merge-bg-base)}\n.avatar-stack .avatar:first-child{margin-left:0}\n.avatar-stack .avatar-more{background:var(--merge-bg-surface);color:var(--merge-text-secondary)}',
   true),

  -- 2) Tooltip (overlay, free) — hover 안내
  ('tooltip', 'Tooltip', 'Overlay', 'free',
   'CSS-only tooltip with top/bottom positioning.',
   '<span class="tooltip" data-tip="Helpful hint"><button class="tip-btn">Hover me</button></span>',
   E'<span class="tooltip" data-tip="Helpful hint here">\n  <button class="tip-btn">Hover me</button>\n</span>\n<span class="tooltip tooltip-bottom" data-tip="Tooltip below">\n  <button class="tip-btn">Bottom tip</button>\n</span>',
   E'.tooltip{position:relative;display:inline-flex}\n.tooltip[data-tip]:hover::after,.tooltip[data-tip]:focus-visible::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);padding:6px 10px;background:var(--merge-text-primary);color:var(--merge-bg-base);font-size:12px;font-weight:500;border-radius:6px;white-space:nowrap;pointer-events:none;z-index:10;animation:tip-in .15s ease-out}\n.tooltip[data-tip]:hover::before,.tooltip[data-tip]:focus-visible::before{content:'''';position:absolute;bottom:calc(100% + 2px);left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:var(--merge-text-primary);pointer-events:none;z-index:10}\n.tooltip-bottom[data-tip]:hover::after{bottom:auto;top:calc(100% + 8px)}\n.tooltip-bottom[data-tip]:hover::before{bottom:auto;top:calc(100% + 2px);border-top-color:transparent;border-bottom-color:var(--merge-text-primary)}\n@keyframes tip-in{from{opacity:0;transform:translate(-50%,4px)}to{opacity:1;transform:translate(-50%,0)}}\n.tip-btn{padding:8px 16px;background:var(--merge-bg-surface);border:1px solid var(--merge-border);border-radius:8px;cursor:pointer;font:inherit;color:inherit}',
   true),

  -- 3) Modal Confirm (overlay, pro) — 확인 다이얼로그
  ('modal-confirm', 'Confirm Modal', 'Overlay', 'pro',
   'Destructive confirmation dialog with backdrop blur and Apple-style animation.',
   '<div class="modal-backdrop"><div class="modal">…</div></div>',
   E'<div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="m-title">\n  <div class="modal">\n    <div class="modal-header">\n      <h2 id="m-title">Confirm action</h2>\n      <button class="modal-close" aria-label="Close">×</button>\n    </div>\n    <div class="modal-body">\n      Are you sure you want to delete this project? This cannot be undone.\n    </div>\n    <div class="modal-footer">\n      <button class="modal-btn modal-btn-secondary">Cancel</button>\n      <button class="modal-btn modal-btn-primary">Delete project</button>\n    </div>\n  </div>\n</div>',
   E'.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:24px;z-index:1000;animation:fade-in .18s ease-out}\n.modal{background:var(--merge-bg-raised);border:1px solid var(--merge-border);border-radius:14px;max-width:480px;width:100%;box-shadow:0 24px 56px -12px rgba(0,0,0,.45);animation:modal-in .2s cubic-bezier(.16,1,.3,1)}\n.modal-header{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid var(--merge-border)}\n.modal-header h2{margin:0;font-size:16px;font-weight:700}\n.modal-close{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;color:var(--merge-text-muted);border-radius:6px;cursor:pointer;font-size:20px;line-height:1}\n.modal-close:hover{background:var(--merge-bg-surface);color:var(--merge-text-primary)}\n.modal-body{padding:20px 24px;color:var(--merge-text-secondary);font-size:14px;line-height:1.55}\n.modal-footer{display:flex;justify-content:flex-end;gap:8px;padding:16px 24px;border-top:1px solid var(--merge-border)}\n.modal-btn{padding:9px 16px;border-radius:8px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;border:1px solid transparent}\n.modal-btn-secondary{background:transparent;color:var(--merge-text-secondary);border-color:var(--merge-border-strong)}\n.modal-btn-secondary:hover{background:var(--merge-bg-surface)}\n.modal-btn-primary{background:var(--merge-brand);color:#FFFFFF}\n.modal-btn-primary:hover{background:var(--merge-brand-light)}\n@keyframes fade-in{from{opacity:0}to{opacity:1}}\n@keyframes modal-in{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}',
   true),

  -- 4) Dropdown (overlay, pro) — 메뉴 드롭다운
  ('dropdown', 'Dropdown Menu', 'Overlay', 'pro',
   'Action dropdown with icons, divider, and danger variant.',
   '<div class="dropdown"><button class="dropdown-toggle">Options</button>…</div>',
   E'<div class="dropdown" data-open="true">\n  <button class="dropdown-toggle">Options <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>\n  <div class="dropdown-menu" role="menu">\n    <a class="dropdown-item" role="menuitem">Edit</a>\n    <a class="dropdown-item" role="menuitem">Duplicate</a>\n    <a class="dropdown-item" role="menuitem">Share</a>\n    <div class="dropdown-divider"></div>\n    <a class="dropdown-item dropdown-item-danger" role="menuitem">Delete</a>\n  </div>\n</div>',
   E'.dropdown{position:relative;display:inline-block}\n.dropdown-toggle{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;background:var(--merge-bg-surface);border:1px solid var(--merge-border-strong);border-radius:8px;font:inherit;font-size:13px;font-weight:600;color:var(--merge-text-primary);cursor:pointer}\n.dropdown-toggle:hover{border-color:var(--merge-brand-light)}\n.dropdown-toggle svg{transition:transform .15s ease}\n.dropdown[data-open="true"] .dropdown-toggle svg{transform:rotate(180deg)}\n.dropdown-menu{position:absolute;top:calc(100% + 6px);left:0;min-width:200px;background:var(--merge-bg-raised);border:1px solid var(--merge-border);border-radius:10px;box-shadow:0 12px 32px -8px rgba(0,0,0,.35);padding:6px;z-index:50;opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .15s ease,transform .15s ease,visibility .15s}\n.dropdown[data-open="true"] .dropdown-menu{opacity:1;visibility:visible;transform:translateY(0)}\n.dropdown-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;font-size:13px;color:var(--merge-text-primary);cursor:pointer;text-decoration:none}\n.dropdown-item:hover{background:var(--merge-bg-surface)}\n.dropdown-divider{height:1px;background:var(--merge-border);margin:4px 0}\n.dropdown-item-danger{color:#EF4444}',
   true),

  -- 5) Accordion (display, pro) — FAQ 접기/펴기
  ('accordion', 'Accordion', 'Display', 'pro',
   'Native <details> accordion with smooth chevron rotation. Perfect for FAQ.',
   '<details class="accordion-item"><summary class="accordion-summary">Question</summary><div class="accordion-content">Answer</div></details>',
   E'<div class="accordion">\n  <details class="accordion-item" open>\n    <summary class="accordion-summary">How does licensing work?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></summary>\n    <div class="accordion-content">Pro subscription includes a commercial license for unlimited projects.</div>\n  </details>\n  <details class="accordion-item">\n    <summary class="accordion-summary">Can I cancel anytime?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></summary>\n    <div class="accordion-content">Yes. Cancel from your billing portal at any time.</div>\n  </details>\n</div>',
   E'.accordion{width:100%;max-width:560px;background:var(--merge-bg-raised);border:1px solid var(--merge-border);border-radius:12px;overflow:hidden}\n.accordion-item{border-bottom:1px solid var(--merge-border)}\n.accordion-item:last-child{border-bottom:none}\n.accordion-summary{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;cursor:pointer;list-style:none;font-size:14px;font-weight:600;transition:background .12s ease}\n.accordion-summary::-webkit-details-marker{display:none}\n.accordion-summary:hover{background:var(--merge-bg-surface)}\n.accordion-summary svg{flex-shrink:0;transition:transform .2s ease;color:var(--merge-text-muted)}\n.accordion-item[open] .accordion-summary svg{transform:rotate(180deg)}\n.accordion-content{padding:0 20px 18px;font-size:13px;line-height:1.6;color:var(--merge-text-secondary)}',
   true),

  -- 6) Breadcrumb (navigation, free) — 경로 표시
  ('breadcrumb', 'Breadcrumb', 'Navigation', 'free',
   'Page hierarchy navigation with home icon and aria-current support.',
   '<ol class="breadcrumb">…</ol>',
   E'<nav aria-label="Breadcrumb">\n  <ol class="breadcrumb">\n    <li><a href="#" class="breadcrumb-home"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></a></li>\n    <li><span class="breadcrumb-sep">/</span></li>\n    <li><a href="#">Dashboard</a></li>\n    <li><span class="breadcrumb-sep">/</span></li>\n    <li><a href="#">Projects</a></li>\n    <li><span class="breadcrumb-sep">/</span></li>\n    <li aria-current="page">Q4 Roadmap</li>\n  </ol>\n</nav>',
   E'.breadcrumb{display:flex;align-items:center;flex-wrap:wrap;gap:6px;font-size:13px;color:var(--merge-text-muted);padding:0;margin:0;list-style:none}\n.breadcrumb li{display:inline-flex;align-items:center;gap:6px}\n.breadcrumb a{color:var(--merge-text-muted);text-decoration:none;padding:3px 6px;border-radius:4px;transition:color .12s ease,background .12s ease}\n.breadcrumb a:hover{color:var(--merge-text-primary);background:var(--merge-bg-surface)}\n.breadcrumb li[aria-current="page"]{color:var(--merge-text-primary);font-weight:600}\n.breadcrumb-sep{color:var(--merge-text-muted);opacity:.5;flex-shrink:0}\n.breadcrumb-home{display:inline-flex;align-items:center}',
   true),

  -- 7) Pagination (navigation, pro) — 페이지 번호
  ('pagination', 'Pagination', 'Navigation', 'pro',
   'Numbered pagination with prev/next, ellipsis, and active state.',
   '<ul class="pagination">…</ul>',
   E'<nav aria-label="Pagination">\n  <ul class="pagination">\n    <li><button class="page-btn" disabled>‹</button></li>\n    <li><button class="page-btn active" aria-current="page">1</button></li>\n    <li><button class="page-btn">2</button></li>\n    <li><button class="page-btn">3</button></li>\n    <li><span class="page-ellipsis">…</span></li>\n    <li><button class="page-btn">12</button></li>\n    <li><button class="page-btn">›</button></li>\n  </ul>\n</nav>',
   E'.pagination{display:inline-flex;align-items:center;gap:4px;padding:0;margin:0;list-style:none}\n.pagination .page-btn{min-width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;padding:0 10px;background:transparent;border:1px solid var(--merge-border);border-radius:8px;font:inherit;font-size:13px;font-weight:600;color:var(--merge-text-secondary);cursor:pointer;transition:all .12s ease}\n.pagination .page-btn:hover:not([disabled]):not(.active){border-color:var(--merge-brand-light);color:var(--merge-text-primary)}\n.pagination .page-btn.active{background:var(--merge-brand);border-color:var(--merge-brand);color:#FFFFFF}\n.pagination .page-btn[disabled]{opacity:.4;cursor:not-allowed}\n.pagination .page-ellipsis{min-width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;color:var(--merge-text-muted)}',
   true),

  -- 8) Switch (forms, free) — 토글 (Apple 스타일)
  ('form-switch', 'Toggle Switch', 'Forms', 'free',
   'Apple-style toggle with smooth slider animation and disabled state.',
   '<label class="switch"><input type="checkbox" checked><span class="switch-slider"></span></label>',
   E'<label class="switch">\n  <input type="checkbox" checked>\n  <span class="switch-slider"></span>\n  <span class="switch-label">Enable email notifications</span>\n</label>\n<label class="switch">\n  <input type="checkbox">\n  <span class="switch-slider"></span>\n  <span class="switch-label">Marketing emails<span class="switch-desc">Receive product updates and tips</span></span>\n</label>',
   E'.switch{display:inline-flex;align-items:center;gap:12px;cursor:pointer;user-select:none}\n.switch input{position:absolute;opacity:0;pointer-events:none}\n.switch-slider{position:relative;width:44px;height:24px;background:var(--merge-bg-surface);border:1px solid var(--merge-border-strong);border-radius:9999px;transition:background .2s ease,border-color .2s ease;flex-shrink:0}\n.switch-slider::after{content:'''';position:absolute;top:2px;left:2px;width:18px;height:18px;background:var(--merge-text-muted);border-radius:50%;transition:transform .2s cubic-bezier(.16,1,.3,1),background .2s ease}\n.switch input:checked + .switch-slider{background:var(--merge-brand);border-color:var(--merge-brand)}\n.switch input:checked + .switch-slider::after{transform:translateX(20px);background:#FFFFFF}\n.switch input:focus-visible + .switch-slider{outline:2px solid var(--merge-brand);outline-offset:2px}\n.switch input:disabled + .switch-slider{opacity:.5;cursor:not-allowed}\n.switch-label{font-size:14px;font-weight:500}\n.switch-desc{display:block;font-size:12px;color:var(--merge-text-muted);font-weight:400;margin-top:2px}',
   true),

  -- 9) Skeleton (feedback, pro) — 로딩 placeholder
  ('skeleton', 'Skeleton Loader', 'Feedback', 'pro',
   'Shimmer skeleton placeholders for cards, text, and circles. Reduces perceived load time.',
   '<div class="skeleton-card">…</div>',
   E'<div class="skeleton-card" role="status" aria-label="Loading">\n  <div class="skeleton-card-header">\n    <span class="skeleton skeleton-circle"></span>\n    <div class="skeleton-card-meta">\n      <span class="skeleton skeleton-title"></span>\n      <span class="skeleton skeleton-text-sm"></span>\n    </div>\n  </div>\n  <span class="skeleton skeleton-rect"></span>\n  <div style="margin-top:14px">\n    <span class="skeleton skeleton-text"></span>\n    <span class="skeleton skeleton-text-sm"></span>\n  </div>\n</div>',
   E'.skeleton{display:block;background:linear-gradient(90deg,var(--merge-bg-surface) 0%,var(--merge-bg-raised) 50%,var(--merge-bg-surface) 100%);background-size:200% 100%;animation:skeleton-shimmer 1.4s ease-in-out infinite;border-radius:6px}\n@keyframes skeleton-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}\n.skeleton-text{height:14px;width:100%;margin-bottom:8px}\n.skeleton-text-sm{height:12px;width:60%}\n.skeleton-title{height:20px;width:50%;margin-bottom:12px}\n.skeleton-circle{width:40px;height:40px;border-radius:50%}\n.skeleton-rect{width:100%;height:120px;border-radius:10px}\n.skeleton-card{width:320px;padding:20px;background:var(--merge-bg-raised);border:1px solid var(--merge-border);border-radius:12px}\n.skeleton-card-header{display:flex;gap:12px;margin-bottom:16px;align-items:center}\n.skeleton-card-meta{flex:1}',
   true),

  -- 10) Empty State (feedback, free) — 빈 상태 표준
  ('empty-state', 'Empty State', 'Feedback', 'free',
   'Standard empty state with icon, title, description, and primary action. Use when lists or data are empty.',
   '<div class="empty-state">…</div>',
   E'<div class="empty-state">\n  <div class="empty-state-icon">\n    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>\n  </div>\n  <h3 class="empty-state-title">No projects yet</h3>\n  <p class="empty-state-desc">Get started by creating your first project. Invite teammates and track progress.</p>\n  <button class="empty-state-action">+ Create project</button>\n</div>',
   E'.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:64px 32px;background:var(--merge-bg-raised);border:1px dashed var(--merge-border-strong);border-radius:14px;max-width:480px}\n.empty-state-icon{width:56px;height:56px;display:flex;align-items:center;justify-content:center;background:var(--merge-bg-surface);border-radius:14px;color:var(--merge-text-muted);margin-bottom:16px}\n.empty-state-title{font-size:16px;font-weight:700;color:var(--merge-text-primary);margin:0 0 6px}\n.empty-state-desc{font-size:13px;line-height:1.55;color:var(--merge-text-muted);margin:0 0 20px;max-width:36ch}\n.empty-state-action{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;background:var(--merge-brand);color:#FFFFFF;border:none;border-radius:8px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none}\n.empty-state-action:hover{background:var(--merge-brand-light)}',
   true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  badge = EXCLUDED.badge,
  description = EXCLUDED.description,
  preview_html = EXCLUDED.preview_html,
  code_html = EXCLUDED.code_html,
  code_css = EXCLUDED.code_css,
  is_public = EXCLUDED.is_public;
