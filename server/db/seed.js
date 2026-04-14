// MergeUi DB 시드 데이터 — 테마/컴포넌트/릴리즈 초기 데이터
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { createClient } = require('@supabase/supabase-js');

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  console.log('Seeding MergeUi database...');

  // 1. Themes
  const themes = [
    { slug: 'analytics-pro', name: 'Analytics Pro', description: 'Data-heavy dashboard with real-time charts, KPIs, and advanced filtering.', category: 'analytics', tags: ['Analytics','Charts'], version: '2.1.0', badge: 'new', components_count: 28, pages_count: 6, downloads_count: 1240, file_size: '3.2 MB' },
    { slug: 'storefront', name: 'StoreFront', description: 'E-commerce dashboard with order management, inventory, and customer insights.', category: 'ecommerce', tags: ['E-Commerce','Orders'], version: '1.4.0', badge: 'pro', components_count: 32, pages_count: 8, downloads_count: 980, file_size: '3.8 MB' },
    { slug: 'findash', name: 'FinDash', description: 'Financial reports, transaction logs, portfolio analytics, and risk metrics.', category: 'finance', tags: ['Finance','Reports'], version: '3.0.0', badge: 'pro', components_count: 24, pages_count: 5, downloads_count: 870, file_size: '4.1 MB' },
    { slug: 'relatehub', name: 'RelateHub', description: 'Contact management, sales pipeline, team collaboration, and deal tracking.', category: 'crm', tags: ['CRM','Pipeline'], version: '1.2.0', badge: 'free', components_count: 22, pages_count: 5, downloads_count: 1560, file_size: '2.8 MB' },
    { slug: 'taskflow', name: 'TaskFlow', description: 'Kanban boards, timeline views, workload tracking, and sprint planning.', category: 'project', tags: ['Project','Kanban'], version: '1.2.0', badge: 'pro', components_count: 20, pages_count: 4, downloads_count: 1100, file_size: '2.9 MB' },
    { slug: 'saas-kit', name: 'SaaS Kit', description: 'All-in-one admin panel with user management, billing, and settings.', category: 'saas', tags: ['SaaS','Admin'], version: '2.0.0', badge: 'pro', components_count: 35, pages_count: 10, downloads_count: 2100, file_size: '5.2 MB' },
    { slug: 'devops-monitor', name: 'DevOps Monitor', description: 'Server monitoring, deployment logs, uptime tracking, and alert management.', category: 'analytics', tags: ['DevOps','Monitoring'], version: '2.0.0', badge: 'new', components_count: 18, pages_count: 4, downloads_count: 640, file_size: '2.4 MB' },
    { slug: 'marketing-hub', name: 'Marketing Hub', description: 'Campaign analytics, SEO tracking, social media metrics, and A/B test results.', category: 'analytics', tags: ['Marketing','SEO'], version: '1.1.0', badge: 'pro', components_count: 26, pages_count: 6, downloads_count: 780, file_size: '3.5 MB' },
    { slug: 'inventory-mgr', name: 'Inventory Manager', description: 'Stock tracking, supplier management, purchase orders, and warehouse views.', category: 'ecommerce', tags: ['Inventory','Warehouse'], version: '1.0.0', badge: 'free', components_count: 19, pages_count: 5, downloads_count: 920, file_size: '2.6 MB' },
    { slug: 'crypto-dash', name: 'Crypto Dashboard', description: 'Portfolio tracker, real-time prices, trading charts, and wallet overview.', category: 'finance', tags: ['Crypto','Trading'], version: '1.0.0', badge: 'new', components_count: 16, pages_count: 3, downloads_count: 1340, file_size: '2.2 MB' },
    { slug: 'helpdesk', name: 'HelpDesk', description: 'Ticket management, customer chat, knowledge base, and SLA tracking.', category: 'crm', tags: ['Support','Tickets'], version: '1.0.0', badge: 'pro', components_count: 21, pages_count: 5, downloads_count: 690, file_size: '3.0 MB' },
    { slug: 'agile-board', name: 'Agile Board', description: 'Scrum boards, burndown charts, velocity tracking, and retrospective tools.', category: 'project', tags: ['Agile','Scrum'], version: '1.0.0', badge: 'free', components_count: 15, pages_count: 3, downloads_count: 850, file_size: '2.1 MB' }
  ];

  const { error: thErr } = await sb.from('themes').upsert(themes, { onConflict: 'slug' });
  console.log('Themes:', thErr ? 'ERROR ' + thErr.message : '12 seeded');

  // 2. Components
  const components = [
    { slug: 'line-chart', name: 'Line Chart', description: 'Responsive line chart with multiple datasets, tooltips, and animations.', category: 'chart', version: '1.4.2', badge: 'free', code_html: '<div class="merge-line-chart">...</div>', code_css: '.merge-line-chart { ... }', preview_html: '<div style="height:120px;background:var(--merge-bg-surface);border-radius:8px;display:flex;align-items:flex-end;gap:2px;padding:12px"><div style="flex:1;height:40%;background:var(--merge-brand);border-radius:2px 2px 0 0"></div><div style="flex:1;height:60%;background:var(--merge-brand);border-radius:2px 2px 0 0"></div><div style="flex:1;height:45%;background:var(--merge-brand);border-radius:2px 2px 0 0"></div><div style="flex:1;height:80%;background:var(--merge-brand);border-radius:2px 2px 0 0"></div><div style="flex:1;height:55%;background:var(--merge-brand);border-radius:2px 2px 0 0"></div></div>' },
    { slug: 'bar-chart', name: 'Bar Chart', description: 'Vertical/horizontal bar chart with grouped and stacked options.', category: 'chart', version: '1.3.0', badge: 'free', code_html: '<div class="merge-bar-chart">...</div>', code_css: '.merge-bar-chart { ... }' },
    { slug: 'data-table', name: 'Data Table', description: 'Sortable, filterable data table with pagination and row selection.', category: 'data', version: '2.0.1', badge: 'free', code_html: '<table class="merge-table">...</table>', code_css: '.merge-table { ... }' },
    { slug: 'stat-card', name: 'Stat Card', description: 'KPI card with value, label, trend indicator, and icon.', category: 'widget', version: '1.0.3', badge: 'free', code_html: '<div class="merge-stat-card">...</div>', code_css: '.merge-stat-card { ... }' },
    { slug: 'modal', name: 'Modal', description: 'Accessible modal dialog with backdrop, close button, and animations.', category: 'overlay', version: '1.1.0', badge: 'free', code_html: '<div class="merge-modal">...</div>', code_css: '.merge-modal { ... }' },
    { slug: 'toast', name: 'Toast', description: 'Notification toast with success/error/warning variants and auto-dismiss.', category: 'feedback', version: '1.0.0', badge: 'free', code_html: '<div class="merge-toast">...</div>', code_css: '.merge-toast { ... }' },
    { slug: 'toggle', name: 'Toggle', description: 'Toggle switch with on/off states and smooth animations.', category: 'form', version: '1.0.0', badge: 'free', code_html: '<label class="merge-toggle">...</label>', code_css: '.merge-toggle { ... }' },
    { slug: 'dropdown', name: 'Dropdown', description: 'Dropdown menu with search, multi-select, and keyboard navigation.', category: 'form', version: '1.2.0', badge: 'free', code_html: '<div class="merge-dropdown">...</div>', code_css: '.merge-dropdown { ... }' },
    { slug: 'pie-chart', name: 'Pie Chart', description: 'Animated pie/donut chart with legend and percentage labels.', category: 'chart', version: '1.0.0', badge: 'pro', code_html: '<div class="merge-pie-chart">...</div>', code_css: '.merge-pie-chart { ... }' },
    { slug: 'area-chart', name: 'Area Chart', description: 'Gradient area chart with smooth curves and multi-series support.', category: 'chart', version: '1.0.0', badge: 'pro', code_html: '<div class="merge-area-chart">...</div>', code_css: '.merge-area-chart { ... }' },
    { slug: 'date-picker', name: 'Date Picker', description: 'Calendar date picker with range selection and localization.', category: 'form', version: '0.8.0', badge: 'pro', code_html: '<div class="merge-datepicker">...</div>', code_css: '.merge-datepicker { ... }' },
    { slug: 'color-picker', name: 'Color Picker', description: 'Color picker with hex/rgb input, presets, and opacity slider.', category: 'form', version: '0.5.0', badge: 'pro', code_html: '<div class="merge-colorpicker">...</div>', code_css: '.merge-colorpicker { ... }' },
    { slug: 'sidebar', name: 'Sidebar', description: 'Collapsible sidebar navigation with groups, icons, and badges.', category: 'navigation', version: '1.2.0', badge: 'free', code_html: '<aside class="merge-sidebar">...</aside>', code_css: '.merge-sidebar { ... }' },
    { slug: 'breadcrumb', name: 'Breadcrumb', description: 'Breadcrumb navigation with separator icons and current page highlight.', category: 'navigation', version: '1.0.0', badge: 'free', code_html: '<nav class="merge-breadcrumb">...</nav>', code_css: '.merge-breadcrumb { ... }' },
    { slug: 'avatar', name: 'Avatar', description: 'User avatar with fallback initials, status indicator, and group stack.', category: 'widget', version: '1.0.0', badge: 'free', code_html: '<div class="merge-avatar">...</div>', code_css: '.merge-avatar { ... }' },
    { slug: 'progress-bar', name: 'Progress Bar', description: 'Animated progress bar with label, percentage, and color variants.', category: 'feedback', version: '1.0.0', badge: 'free', code_html: '<div class="merge-progress">...</div>', code_css: '.merge-progress { ... }' },
    { slug: 'badge', name: 'Badge', description: 'Status badges and notification dots with color variants.', category: 'widget', version: '1.0.0', badge: 'free', code_html: '<span class="merge-badge">...</span>', code_css: '.merge-badge { ... }' },
    { slug: 'tabs', name: 'Tabs', description: 'Tabbed interface with horizontal/vertical layouts and lazy content loading.', category: 'navigation', version: '1.1.0', badge: 'free', code_html: '<div class="merge-tabs">...</div>', code_css: '.merge-tabs { ... }' }
  ];

  const { error: coErr } = await sb.from('components').upsert(components, { onConflict: 'slug' });
  console.log('Components:', coErr ? 'ERROR ' + coErr.message : '18 seeded');

  // 3. Releases
  const releases = [
    { version: 'v2.4.0', title: 'Analytics Pro v2.1 + New Components', body: 'Major update with improved charts and new form components.', changes: JSON.stringify([{type:'new',text:'Analytics Pro theme updated to v2.1'},{type:'new',text:'Added Date Picker and Color Picker'},{type:'improve',text:'Enhanced dark mode contrast'},{type:'fix',text:'Fixed sidebar collapse on tablet'}]), status: 'published', published_at: '2026-04-10T00:00:00Z', notified_count: 148 },
    { version: 'v2.3.0', title: 'FinDash v3.0 Launch', body: 'Complete financial dashboard redesign.', changes: JSON.stringify([{type:'new',text:'FinDash theme v3.0 redesigned'},{type:'new',text:'Donut Chart and Area Chart components'},{type:'fix',text:'Mobile navigation overlap fixed'}]), status: 'published', published_at: '2026-03-28T00:00:00Z', notified_count: 142 },
    { version: 'v2.2.0', title: 'StoreFront Update + Accessibility', body: 'WCAG AA compliance and keyboard navigation improvements.', changes: JSON.stringify([{type:'improve',text:'StoreFront now WCAG AA compliant'},{type:'improve',text:'ARIA labels on all elements'},{type:'fix',text:'Keyboard navigation in dropdowns'}]), status: 'published', published_at: '2026-03-15T00:00:00Z', notified_count: 136 }
  ];

  const { error: relErr } = await sb.from('releases').insert(releases);
  console.log('Releases:', relErr ? 'ERROR ' + relErr.message : '3 seeded');

  console.log('Done!');
}

seed();
