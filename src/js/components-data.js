// 34종 정적 fallback 데이터 — DB 응답 0건 / 네트워크 실패 시 사용
// 작성: C(프론트) | 2026-05-01 (D-5) — 5/5 신규 10개 추가
// 단일 출처: docs/plans/blocks-d5-plan.md
// v1: Buttons 4 / Cards 4 / Tables 3 / Forms 4 / Charts 4 / Feedback 4 / Navigation 1 = 24
// v2 (5/5): Forms +1 (switch) / Feedback +2 (skeleton/empty-state) / Navigation +2 (breadcrumb/pagination)
//          / Display +2 신규 카테고리 (avatar/accordion) / Overlay +3 신규 카테고리 (tooltip/modal-confirm/dropdown) = 10
// 합계 34 (Free 12 / Pro 22). 9 카테고리.
// 토큰: src/styles/tokens.css (--merge-* 변수)
// code_html / code_css 는 비워둔다 — Pro 코드는 RLS 보호된 view/RPC 로만 노출되며,
// 정적 fallback 환경에서는 templates/blocks/{cat}/{slug}.html 파일 자체로 검수·복사 가능.

window.MERGEUI_COMPONENTS_FALLBACK = [
  /* ===== 1. BUTTONS (4) ===== */
  { slug:'btn-primary',     name:'Primary Button',     category:'Buttons',    badge:'free',
    description:'Solid CTA button for primary actions.',
    preview_html:'<button class="btn btn-primary" style="display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;font:600 14px/1 Inter,sans-serif;background:#6C5CE7;color:#fff;border:none;border-radius:8px;cursor:pointer">Get started</button>',
    code_html:'', code_css:'' },
  { slug:'btn-secondary',   name:'Secondary Button',   category:'Buttons',    badge:'free',
    description:'Outline button for secondary actions.',
    preview_html:'<button class="btn btn-secondary" style="display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;font:600 14px/1 Inter,sans-serif;background:transparent;color:#F4F4F5;border:1px solid rgba(255,255,255,.1);border-radius:8px;cursor:pointer">Learn more</button>',
    code_html:'', code_css:'' },
  { slug:'btn-ghost',       name:'Ghost Button',       category:'Buttons',    badge:'free',
    description:'Text-only button for tertiary actions.',
    preview_html:'<button class="btn btn-ghost" style="display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;font:600 14px/1 Inter,sans-serif;background:transparent;color:#A1A1AA;border:none;border-radius:8px;cursor:pointer">Cancel</button>',
    code_html:'', code_css:'' },
  { slug:'btn-destructive', name:'Destructive Button', category:'Buttons',    badge:'pro',
    description:'Destructive variant for delete or cancel flows.',
    preview_html:'<button class="btn btn-destructive" style="display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;font:600 14px/1 Inter,sans-serif;background:#EF4444;color:#fff;border:none;border-radius:8px;cursor:pointer">Delete account</button>',
    code_html:'', code_css:'' },

  /* ===== 2. CARDS (4) ===== */
  { slug:'card-kpi',      name:'KPI Card',      category:'Cards', badge:'free',
    description:'Large metric with delta indicator. Dashboard staple.',
    preview_html:'<div style="display:flex;flex-direction:column;gap:4px;padding:20px 24px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:12px;font-family:Inter,sans-serif;min-width:200px"><span style="font-size:11px;font-weight:600;color:#80808A;text-transform:uppercase;letter-spacing:.4px">Monthly Revenue</span><span style="font-size:26px;font-weight:800;color:#F4F4F5;letter-spacing:-1px;margin-top:4px">$48,290</span><span style="font-size:12px;font-weight:600;color:#22C55E;margin-top:2px">+12.5%</span></div>',
    code_html:'', code_css:'' },
  { slug:'card-metric',   name:'Metric Card',   category:'Cards', badge:'pro',
    description:'KPI card with embedded sparkline.',
    preview_html:'<div style="display:flex;flex-direction:column;gap:6px;padding:20px 24px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:12px;font-family:Inter,sans-serif;min-width:220px"><div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:11px;font-weight:600;color:#80808A;text-transform:uppercase;letter-spacing:.4px">Active users</span><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:rgba(34,197,94,.12);color:#22C55E">+8.2%</span></div><span style="font-size:26px;font-weight:800;color:#F4F4F5;letter-spacing:-1px">2,431</span><svg viewBox="0 0 100 30" preserveAspectRatio="none" style="width:100%;height:30px;color:#8B7CF0;margin-top:2px"><polyline points="0,22 12,18 24,20 36,14 48,16 60,10 72,12 84,6 100,8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>',
    code_html:'', code_css:'' },
  { slug:'card-feature',  name:'Feature Card',  category:'Cards', badge:'pro',
    description:'Icon + title + description for marketing pages.',
    preview_html:'<article style="display:flex;flex-direction:column;gap:10px;padding:22px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:12px;font-family:Inter,sans-serif;max-width:240px"><div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(108,92,231,.14);color:#8B7CF0;border-radius:9px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><h3 style="font-size:15px;font-weight:700;color:#F4F4F5;margin:0">Built for speed</h3><p style="font-size:13px;line-height:1.55;color:#A1A1AA;margin:0">Ship faster with copy-paste components.</p></article>',
    code_html:'', code_css:'' },
  { slug:'card-stat-row', name:'Stat Row Card', category:'Cards', badge:'pro',
    description:'Four-column stats in a single row card.',
    preview_html:'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);border-radius:12px;overflow:hidden;font-family:Inter,sans-serif;min-width:280px"><div style="display:flex;flex-direction:column;gap:2px;padding:12px 14px;background:#16161E"><b style="font-size:18px;font-weight:800;color:#F4F4F5">2.4k</b><span style="font-size:10px;color:#80808A;text-transform:uppercase;letter-spacing:.4px">Visits</span></div><div style="display:flex;flex-direction:column;gap:2px;padding:12px 14px;background:#16161E"><b style="font-size:18px;font-weight:800;color:#F4F4F5">312</b><span style="font-size:10px;color:#80808A;text-transform:uppercase;letter-spacing:.4px">Signups</span></div><div style="display:flex;flex-direction:column;gap:2px;padding:12px 14px;background:#16161E"><b style="font-size:18px;font-weight:800;color:#F4F4F5">$8.2k</b><span style="font-size:10px;color:#80808A;text-transform:uppercase;letter-spacing:.4px">Revenue</span></div><div style="display:flex;flex-direction:column;gap:2px;padding:12px 14px;background:#16161E"><b style="font-size:18px;font-weight:800;color:#F4F4F5">4.7%</b><span style="font-size:10px;color:#80808A;text-transform:uppercase;letter-spacing:.4px">Conv.</span></div></div>',
    code_html:'', code_css:'' },

  /* ===== 3. TABLES (3) ===== */
  { slug:'table-basic',    name:'Basic Table',    category:'Tables', badge:'free',
    description:'Simple table with header and rows.',
    preview_html:'<table style="width:100%;border-collapse:collapse;font-family:Inter,sans-serif;font-size:13px;color:#F4F4F5"><thead><tr><th style="text-align:left;padding:8px 12px;font-size:10px;font-weight:700;color:#80808A;text-transform:uppercase;letter-spacing:.5px;background:#16161E;border-bottom:1px solid rgba(255,255,255,.06)">Name</th><th style="text-align:left;padding:8px 12px;font-size:10px;font-weight:700;color:#80808A;text-transform:uppercase;letter-spacing:.5px;background:#16161E;border-bottom:1px solid rgba(255,255,255,.06)">Plan</th></tr></thead><tbody><tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06)">Alex Kim</td><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06)">Pro</td></tr><tr><td style="padding:8px 12px">Sam Park</td><td style="padding:8px 12px">Free</td></tr></tbody></table>',
    code_html:'', code_css:'' },
  { slug:'table-sortable', name:'Sortable Table', category:'Tables', badge:'pro',
    description:'Table with column sort indicators.',
    preview_html:'<table style="width:100%;border-collapse:collapse;font-family:Inter,sans-serif;font-size:13px;color:#F4F4F5"><thead><tr><th style="text-align:left;padding:8px 12px;font-size:10px;font-weight:700;color:#8B7CF0;text-transform:uppercase;letter-spacing:.5px;background:#16161E;border-bottom:1px solid rgba(255,255,255,.06)">Name &#9650;</th><th style="text-align:left;padding:8px 12px;font-size:10px;font-weight:700;color:#80808A;text-transform:uppercase;letter-spacing:.5px;background:#16161E;border-bottom:1px solid rgba(255,255,255,.06)">MRR &#9660;</th></tr></thead><tbody><tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06)">Acme Co.</td><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06)">$1,200</td></tr><tr><td style="padding:8px 12px">Globex</td><td style="padding:8px 12px">$890</td></tr></tbody></table>',
    code_html:'', code_css:'' },
  { slug:'table-actions',  name:'Actions Table',  category:'Tables', badge:'pro',
    description:'Row-level edit/delete action buttons.',
    preview_html:'<table style="width:100%;border-collapse:collapse;font-family:Inter,sans-serif;font-size:13px;color:#F4F4F5"><thead><tr><th style="text-align:left;padding:8px 12px;font-size:10px;font-weight:700;color:#80808A;text-transform:uppercase;letter-spacing:.5px;background:#16161E;border-bottom:1px solid rgba(255,255,255,.06)">User</th><th style="text-align:right;padding:8px 12px;font-size:10px;font-weight:700;color:#80808A;text-transform:uppercase;letter-spacing:.5px;background:#16161E;border-bottom:1px solid rgba(255,255,255,.06)"></th></tr></thead><tbody><tr><td style="padding:8px 12px">Alex Kim</td><td style="padding:8px 12px;text-align:right"><button style="padding:4px 10px;font:600 11px Inter,sans-serif;background:#16161E;color:#A1A1AA;border:1px solid rgba(255,255,255,.06);border-radius:6px;margin-right:4px">Edit</button><button style="padding:4px 10px;font:600 11px Inter,sans-serif;background:#16161E;color:#FCA5A5;border:1px solid rgba(239,68,68,.2);border-radius:6px">Delete</button></td></tr></tbody></table>',
    code_html:'', code_css:'' },

  /* ===== 4. FORMS (4) ===== */
  { slug:'form-input',    name:'Text Input',     category:'Forms', badge:'free',
    description:'Labeled text input with helper text.',
    preview_html:'<label style="display:flex;flex-direction:column;gap:5px;font-family:Inter,sans-serif;max-width:240px"><span style="font-size:12px;font-weight:600;color:#F4F4F5">Email</span><input type="email" placeholder="you@company.com" style="padding:9px 12px;background:#0E0E14;border:1px solid rgba(255,255,255,.1);border-radius:8px;font:14px Inter,sans-serif;color:#F4F4F5;outline:none"><span style="font-size:11px;color:#80808A">We will never share your email.</span></label>',
    code_html:'', code_css:'' },
  { slug:'form-select',   name:'Select',         category:'Forms', badge:'pro',
    description:'Dropdown select with custom styling.',
    preview_html:'<label style="display:flex;flex-direction:column;gap:5px;font-family:Inter,sans-serif;max-width:240px"><span style="font-size:12px;font-weight:600;color:#F4F4F5">Plan</span><select style="padding:9px 32px 9px 12px;background:#0E0E14;border:1px solid rgba(255,255,255,.1);border-radius:8px;font:14px Inter,sans-serif;color:#F4F4F5;-webkit-appearance:none;appearance:none"><option>Free</option><option>Pro</option><option>Team</option></select></label>',
    code_html:'', code_css:'' },
  { slug:'form-checkbox', name:'Checkbox Group', category:'Forms', badge:'pro',
    description:'Multi-select checkbox group.',
    preview_html:'<fieldset style="display:flex;flex-direction:column;gap:8px;padding:14px 18px;border:1px solid rgba(255,255,255,.06);border-radius:8px;background:#16161E;font-family:Inter,sans-serif;max-width:240px"><legend style="padding:0 6px;font-size:12px;font-weight:600;color:#F4F4F5">Notifications</legend><label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#A1A1AA"><input type="checkbox" checked style="accent-color:#6C5CE7"> Email</label><label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#A1A1AA"><input type="checkbox" style="accent-color:#6C5CE7"> SMS</label></fieldset>',
    code_html:'', code_css:'' },
  { slug:'form-radio',    name:'Radio Group',    category:'Forms', badge:'pro',
    description:'Single-select radio group.',
    preview_html:'<fieldset style="display:flex;flex-direction:column;gap:8px;padding:14px 18px;border:1px solid rgba(255,255,255,.06);border-radius:8px;background:#16161E;font-family:Inter,sans-serif;max-width:240px"><legend style="padding:0 6px;font-size:12px;font-weight:600;color:#F4F4F5">Billing</legend><label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#A1A1AA"><input type="radio" name="bp" checked style="accent-color:#6C5CE7"> Monthly</label><label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#A1A1AA"><input type="radio" name="bp" style="accent-color:#6C5CE7"> Annual</label></fieldset>',
    code_html:'', code_css:'' },

  /* ===== 5. CHARTS (4) — pure SVG, zero deps ===== */
  { slug:'chart-line',  name:'Line Chart',  category:'Charts', badge:'pro',
    description:'Time-series line chart (zero dependency).',
    preview_html:'<svg viewBox="0 0 220 100" preserveAspectRatio="none" style="width:220px;height:100px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px;box-sizing:border-box"><defs><linearGradient id="lf-pv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#818CF8" stop-opacity=".4"/><stop offset="1" stop-color="#818CF8" stop-opacity="0"/></linearGradient></defs><polygon fill="url(#lf-pv)" points="0,100 0,70 36,55 72,62 108,38 144,46 180,28 220,20 220,100"/><polyline fill="none" stroke="#818CF8" stroke-width="2" stroke-linecap="round" points="0,70 36,55 72,62 108,38 144,46 180,28 220,20"/></svg>',
    code_html:'', code_css:'' },
  { slug:'chart-bar',   name:'Bar Chart',   category:'Charts', badge:'pro',
    description:'Category comparison bar chart.',
    preview_html:'<svg viewBox="0 0 220 100" style="width:220px;height:100px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px;box-sizing:border-box"><rect x="14" y="40" width="22" height="60" rx="3" fill="#818CF8"/><rect x="46" y="25" width="22" height="75" rx="3" fill="#22D3EE"/><rect x="78" y="55" width="22" height="45" rx="3" fill="#A78BFA"/><rect x="110" y="18" width="22" height="82" rx="3" fill="#FB7185"/><rect x="142" y="48" width="22" height="52" rx="3" fill="#34D399"/><rect x="174" y="32" width="22" height="68" rx="3" fill="#FBBF24"/></svg>',
    code_html:'', code_css:'' },
  { slug:'chart-donut', name:'Donut Chart', category:'Charts', badge:'pro',
    description:'Distribution donut chart.',
    preview_html:'<svg viewBox="0 0 120 120" style="width:120px;height:120px"><circle cx="60" cy="60" r="44" fill="none" stroke="#0E0E14" stroke-width="16"/><circle cx="60" cy="60" r="44" fill="none" stroke="#818CF8" stroke-width="16" stroke-dasharray="116 276" transform="rotate(-90 60 60)"/><circle cx="60" cy="60" r="44" fill="none" stroke="#22D3EE" stroke-width="16" stroke-dasharray="88 276" stroke-dashoffset="-116" transform="rotate(-90 60 60)"/><circle cx="60" cy="60" r="44" fill="none" stroke="#FB7185" stroke-width="16" stroke-dasharray="44 276" stroke-dashoffset="-204" transform="rotate(-90 60 60)"/><text x="60" y="58" text-anchor="middle" fill="#F4F4F5" font-family="Inter,sans-serif" font-size="16" font-weight="800">2.4k</text><text x="60" y="72" text-anchor="middle" fill="#80808A" font-family="Inter,sans-serif" font-size="9">Users</text></svg>',
    code_html:'', code_css:'' },
  { slug:'chart-area',  name:'Area Chart',  category:'Charts', badge:'pro',
    description:'Stacked area chart for cumulative time-series.',
    preview_html:'<svg viewBox="0 0 220 100" preserveAspectRatio="none" style="width:220px;height:100px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px;box-sizing:border-box"><defs><linearGradient id="af1-pv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#22D3EE" stop-opacity=".55"/><stop offset="1" stop-color="#22D3EE" stop-opacity=".05"/></linearGradient><linearGradient id="af2-pv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#818CF8" stop-opacity=".7"/><stop offset="1" stop-color="#818CF8" stop-opacity=".1"/></linearGradient></defs><polygon fill="url(#af1-pv)" points="0,100 0,55 36,45 72,50 108,32 144,38 180,22 220,28 220,100"/><polygon fill="url(#af2-pv)" points="0,100 0,75 36,65 72,72 108,55 144,62 180,48 220,46 220,100"/></svg>',
    code_html:'', code_css:'' },

  /* ===== 6. FEEDBACK (4) ===== */
  { slug:'alert-info',  name:'Alert / Info', category:'Feedback', badge:'free',
    description:'Info / success / warning / error banners.',
    preview_html:'<div style="display:flex;align-items:flex-start;gap:8px;padding:10px 14px;border:1px solid rgba(59,130,246,.25);border-radius:8px;background:rgba(59,130,246,.10);font-family:Inter,sans-serif;font-size:13px;color:#93C5FD;max-width:260px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><div><strong>Heads up.</strong> v1.2 is now available.</div></div>',
    code_html:'', code_css:'' },
  { slug:'modal-basic', name:'Modal',        category:'Feedback', badge:'pro',
    description:'Overlay dialog with backdrop, focus trap, ESC close.',
    preview_html:'<div style="position:relative;width:240px;height:140px;background:rgba(0,0,0,.5);border-radius:10px;display:flex;align-items:center;justify-content:center"><div style="padding:14px 18px;background:#0E0E14;border:1px solid rgba(255,255,255,.1);border-radius:10px;font-family:Inter,sans-serif;display:flex;flex-direction:column;gap:6px;min-width:180px"><b style="font-size:13px;font-weight:700;color:#F4F4F5">Confirm action</b><span style="font-size:11px;color:#A1A1AA">Are you sure?</span><div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px"><button style="padding:5px 10px;font:600 11px Inter;background:transparent;color:#A1A1AA;border:none;border-radius:5px">Cancel</button><button style="padding:5px 10px;font:600 11px Inter;background:#EF4444;color:#fff;border:none;border-radius:5px">Delete</button></div></div></div>',
    code_html:'', code_css:'' },
  { slug:'toast',       name:'Toast',        category:'Feedback', badge:'pro',
    description:'Top-right transient notification with aria-live.',
    preview_html:'<div style="display:inline-flex;align-items:center;gap:8px;padding:9px 14px;background:#0E0E14;border:1px solid rgba(255,255,255,.1);border-radius:9px;font-family:Inter,sans-serif;font-size:13px;font-weight:500;color:#F4F4F5;box-shadow:0 4px 12px rgba(0,0,0,.2)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Saved successfully</div>',
    code_html:'', code_css:'' },
  { slug:'badge',       name:'Badge',        category:'Feedback', badge:'pro',
    description:'Inline status / count badge.',
    preview_html:'<div style="display:flex;gap:6px;flex-wrap:wrap;font-family:Inter,sans-serif"><span style="display:inline-flex;align-items:center;padding:2px 9px;font-size:10px;font-weight:700;letter-spacing:.3px;background:rgba(108,92,231,.15);color:#8B7CF0;border-radius:999px;text-transform:uppercase">New</span><span style="display:inline-flex;align-items:center;padding:2px 9px;font-size:10px;font-weight:700;letter-spacing:.3px;background:rgba(34,197,94,.15);color:#22C55E;border-radius:999px;text-transform:uppercase">Active</span><span style="display:inline-flex;align-items:center;padding:2px 9px;font-size:10px;font-weight:700;letter-spacing:.3px;background:rgba(251,191,36,.15);color:#FBBF24;border-radius:999px;text-transform:uppercase">Trial</span><span style="display:inline-flex;align-items:center;padding:2px 9px;font-size:10px;font-weight:700;letter-spacing:.3px;background:rgba(239,68,68,.15);color:#FCA5A5;border-radius:999px;text-transform:uppercase">Failed</span></div>',
    code_html:'', code_css:'' },

  /* ===== 7. NAVIGATION (3) — tabs (기존) + breadcrumb + pagination (5/5 신규) ===== */
  { slug:'tabs', name:'Tabs', category:'Navigation', badge:'pro',
    description:'Keyboard-accessible tab navigation (WAI-ARIA tabs pattern).',
    preview_html:'<div style="font-family:Inter,sans-serif;min-width:240px"><div style="display:flex;gap:4px;border-bottom:1px solid rgba(255,255,255,.06)"><button style="padding:8px 14px;background:none;border:none;border-bottom:2px solid #6C5CE7;color:#8B7CF0;font:600 13px Inter;margin-bottom:-1px">Overview</button><button style="padding:8px 14px;background:none;border:none;border-bottom:2px solid transparent;color:#80808A;font:600 13px Inter;margin-bottom:-1px">Activity</button><button style="padding:8px 14px;background:none;border:none;border-bottom:2px solid transparent;color:#80808A;font:600 13px Inter;margin-bottom:-1px">Settings</button></div><div style="padding:14px 4px;font-size:12px;color:#A1A1AA">Project overview content.</div></div>',
    code_html:'', code_css:'' },
  { slug:'breadcrumb', name:'Breadcrumb', category:'Navigation', badge:'free',
    description:'Page hierarchy navigation with home icon and aria-current support.',
    preview_html:'<ol style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;font:13px Inter,sans-serif;color:#80808A;padding:0;margin:0;list-style:none"><li><a style="color:#80808A;text-decoration:none">Dashboard</a></li><li><span style="opacity:.5">/</span></li><li><a style="color:#80808A;text-decoration:none">Projects</a></li><li><span style="opacity:.5">/</span></li><li style="color:#F4F4F5;font-weight:600">Q4 Roadmap</li></ol>',
    code_html:'', code_css:'' },
  { slug:'pagination', name:'Pagination', category:'Navigation', badge:'pro',
    description:'Numbered pagination with prev/next, ellipsis, and active state.',
    preview_html:'<ul style="display:inline-flex;align-items:center;gap:4px;padding:0;margin:0;list-style:none;font-family:Inter,sans-serif"><li><button style="min-width:36px;height:36px;padding:0 10px;background:transparent;border:1px solid rgba(255,255,255,.1);border-radius:8px;font:600 13px Inter;color:#A1A1AA;cursor:pointer;opacity:.4">‹</button></li><li><button style="min-width:36px;height:36px;padding:0 10px;background:#6C5CE7;border:1px solid #6C5CE7;border-radius:8px;font:600 13px Inter;color:#fff;cursor:pointer">1</button></li><li><button style="min-width:36px;height:36px;padding:0 10px;background:transparent;border:1px solid rgba(255,255,255,.1);border-radius:8px;font:600 13px Inter;color:#A1A1AA;cursor:pointer">2</button></li><li><button style="min-width:36px;height:36px;padding:0 10px;background:transparent;border:1px solid rgba(255,255,255,.1);border-radius:8px;font:600 13px Inter;color:#A1A1AA;cursor:pointer">3</button></li><li><span style="min-width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;color:#80808A">…</span></li><li><button style="min-width:36px;height:36px;padding:0 10px;background:transparent;border:1px solid rgba(255,255,255,.1);border-radius:8px;font:600 13px Inter;color:#A1A1AA;cursor:pointer">›</button></li></ul>',
    code_html:'', code_css:'' },

  /* ===== 8. DISPLAY (2) — avatar + accordion (5/5 신규 카테고리) ===== */
  { slug:'avatar', name:'Avatar', category:'Display', badge:'free',
    description:'User avatar with size variants, status dot, and stack composition.',
    preview_html:'<div style="display:inline-flex;align-items:center;gap:12px;font-family:Inter,sans-serif"><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6C5CE7,#8B7CF0);color:#fff;font-weight:600;font-size:12px">DH</span><div style="display:inline-flex"><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6C5CE7,#8B7CF0);color:#fff;font-weight:600;font-size:12px;border:2px solid #16161E">JK</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6C5CE7,#8B7CF0);color:#fff;font-weight:600;font-size:12px;border:2px solid #16161E;margin-left:-10px">DH</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#22232C;color:#A1A1AA;font-weight:600;font-size:12px;border:2px solid #16161E;margin-left:-10px">+4</span></div></div>',
    code_html:'', code_css:'' },
  { slug:'accordion', name:'Accordion', category:'Display', badge:'pro',
    description:'Native <details> accordion with smooth chevron rotation. Perfect for FAQ.',
    preview_html:'<div style="width:280px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:10px;overflow:hidden;font-family:Inter,sans-serif"><div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.06);font:600 13px Inter;color:#F4F4F5">How does licensing work?<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#80808A" stroke-width="2" style="transform:rotate(180deg)"><path d="m6 9 6 6 6-6"/></svg></div><div style="padding:0 16px 14px;font-size:12px;line-height:1.55;color:#A1A1AA">Pro subscription includes a commercial license for unlimited projects.</div><div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;font:600 13px Inter;color:#F4F4F5">Can I cancel anytime?<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#80808A" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div></div>',
    code_html:'', code_css:'' },

  /* ===== 9. OVERLAY (3) — tooltip + modal-confirm + dropdown (5/5 신규 카테고리) ===== */
  { slug:'tooltip', name:'Tooltip', category:'Overlay', badge:'free',
    description:'CSS-only tooltip with top/bottom positioning.',
    preview_html:'<div style="position:relative;display:inline-flex;font-family:Inter,sans-serif;padding:32px 0 8px"><span style="position:absolute;top:0;left:50%;transform:translateX(-50%);padding:5px 10px;background:#F4F4F5;color:#16161E;font:500 12px Inter;border-radius:6px;white-space:nowrap">Helpful hint</span><span style="position:absolute;top:25px;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#F4F4F5"></span><button style="padding:8px 16px;background:#22232C;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#A1A1AA;font:inherit;cursor:pointer">Hover me</button></div>',
    code_html:'', code_css:'' },
  { slug:'modal-confirm', name:'Confirm Modal', category:'Overlay', badge:'pro',
    description:'Destructive confirmation dialog with backdrop blur and Apple-style animation.',
    preview_html:'<div style="width:300px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:12px;font-family:Inter,sans-serif;box-shadow:0 24px 56px -12px rgba(0,0,0,.45)"><div style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.06)"><span style="font:700 14px Inter;color:#F4F4F5">Confirm action</span><span style="color:#80808A;font-size:18px">×</span></div><div style="padding:14px 18px;font-size:12px;line-height:1.5;color:#A1A1AA">Are you sure you want to delete this project? This cannot be undone.</div><div style="display:flex;justify-content:flex-end;gap:6px;padding:12px 18px;border-top:1px solid rgba(255,255,255,.06)"><button style="padding:7px 14px;background:transparent;color:#A1A1AA;border:1px solid rgba(255,255,255,.1);border-radius:7px;font:600 12px Inter;cursor:pointer">Cancel</button><button style="padding:7px 14px;background:#6C5CE7;color:#fff;border:none;border-radius:7px;font:600 12px Inter;cursor:pointer">Delete</button></div></div>',
    code_html:'', code_css:'' },
  { slug:'dropdown', name:'Dropdown Menu', category:'Overlay', badge:'pro',
    description:'Action dropdown with icons, divider, and danger variant.',
    preview_html:'<div style="position:relative;font-family:Inter,sans-serif"><button style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:#22232C;border:1px solid rgba(255,255,255,.1);border-radius:8px;font:600 13px Inter;color:#F4F4F5;cursor:pointer">Options <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform:rotate(180deg)"><path d="m6 9 6 6 6-6"/></svg></button><div style="position:absolute;top:42px;left:0;min-width:160px;background:#16161E;border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:5px;box-shadow:0 12px 32px -8px rgba(0,0,0,.5)"><div style="padding:7px 10px;border-radius:5px;font-size:12px;color:#F4F4F5">Edit</div><div style="padding:7px 10px;border-radius:5px;font-size:12px;color:#F4F4F5">Duplicate</div><div style="height:1px;background:rgba(255,255,255,.06);margin:3px 0"></div><div style="padding:7px 10px;border-radius:5px;font-size:12px;color:#FCA5A5">Delete</div></div></div>',
    code_html:'', code_css:'' },

  /* ===== 추가 — Forms 5번째 (Switch, 5/5 신규) ===== */
  { slug:'form-switch', name:'Toggle Switch', category:'Forms', badge:'free',
    description:'Apple-style toggle with smooth slider animation and disabled state.',
    preview_html:'<label style="display:inline-flex;align-items:center;gap:10px;font-family:Inter,sans-serif;cursor:pointer"><span style="position:relative;width:42px;height:24px;background:#6C5CE7;border:1px solid #6C5CE7;border-radius:9999px;flex-shrink:0"><span style="position:absolute;top:2px;right:2px;width:18px;height:18px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span></span><span style="font-size:13px;color:#F4F4F5">Email notifications</span></label>',
    code_html:'', code_css:'' },

  /* ===== 추가 — Feedback 5번째·6번째 (Skeleton + Empty State, 5/5 신규) ===== */
  { slug:'skeleton', name:'Skeleton Loader', category:'Feedback', badge:'pro',
    description:'Shimmer skeleton placeholders for cards, text, and circles.',
    preview_html:'<div style="width:240px;padding:16px;background:#16161E;border:1px solid rgba(255,255,255,.06);border-radius:10px;font-family:Inter,sans-serif"><div style="display:flex;gap:10px;margin-bottom:14px;align-items:center"><span style="display:block;width:32px;height:32px;border-radius:50%;background:linear-gradient(90deg,#22232C 0%,#2A2B35 50%,#22232C 100%);background-size:200% 100%;animation:sk 1.4s ease-in-out infinite"></span><div style="flex:1"><span style="display:block;height:12px;width:60%;background:linear-gradient(90deg,#22232C 0%,#2A2B35 50%,#22232C 100%);background-size:200% 100%;animation:sk 1.4s ease-in-out infinite;border-radius:5px;margin-bottom:6px"></span><span style="display:block;height:10px;width:40%;background:linear-gradient(90deg,#22232C 0%,#2A2B35 50%,#22232C 100%);background-size:200% 100%;animation:sk 1.4s ease-in-out infinite;border-radius:5px"></span></div></div><span style="display:block;height:60px;width:100%;background:linear-gradient(90deg,#22232C 0%,#2A2B35 50%,#22232C 100%);background-size:200% 100%;animation:sk 1.4s ease-in-out infinite;border-radius:8px"></span><style>@keyframes sk{0%{background-position:200% 0}100%{background-position:-200% 0}}</style></div>',
    code_html:'', code_css:'' },
  { slug:'empty-state', name:'Empty State', category:'Feedback', badge:'free',
    description:'Standard empty state with icon, title, description, and primary action.',
    preview_html:'<div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:32px 24px;background:#16161E;border:1px dashed rgba(255,255,255,.12);border-radius:12px;width:280px;font-family:Inter,sans-serif"><div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:#22232C;border-radius:11px;color:#80808A;margin-bottom:12px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><h3 style="font:700 14px Inter;color:#F4F4F5;margin:0 0 4px">No projects yet</h3><p style="font:13px Inter;color:#80808A;margin:0 0 14px;line-height:1.4">Get started by creating your first project.</p><button style="padding:7px 14px;background:#6C5CE7;color:#fff;border:none;border-radius:7px;font:600 12px Inter;cursor:pointer">+ Create project</button></div>',
    code_html:'', code_css:'' }
];
