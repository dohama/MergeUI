/* ==================================================
   Workspace 95 (w95_v1) — Project Management Data
   ================================================== */
var W95_DATA = {
  kpi: [
    { label: 'Active Projects', value: '14',    trend: '+2 this week' },
    { label: 'Tasks Open',       value: '86',    trend: '-12 vs last week' },
    { label: 'Team Members',     value: '24',    trend: 'Same' },
    { label: 'On-Time Delivery', value: '92.4%', trend: '+3.1%' }
  ],
  projects: [
    { name: 'Gemini Website Redesign',  owner: 'Sarah C.', progress: 78, due: '2026-05-12', status: 'active' },
    { name: 'Mobile App v3.2',           owner: 'Daniel K.', progress: 42, due: '2026-06-03', status: 'active' },
    { name: 'Q2 Marketing Campaign',     owner: 'Nina P.',  progress: 88, due: '2026-04-28', status: 'active' },
    { name: 'Internal Tooling Refresh',  owner: 'Marcus L.',progress: 14, due: '2026-07-15', status: 'pending' },
    { name: 'Legacy System Migration',   owner: 'Yuki T.',  progress: 95, due: '2026-04-25', status: 'active' },
    { name: 'Customer Portal v2',        owner: 'Ivan R.',  progress: 30, due: '—',           status: 'blocked' }
  ],
  tasks: [
    { title: 'Finalize homepage hero copy',         project: 'Gemini Redesign',    due: 'Today',     priority: 'high' },
    { title: 'Review API schema v3.2',              project: 'Mobile App',         due: 'Today',     priority: 'high' },
    { title: 'Brand guidelines PDF export',         project: 'Q2 Marketing',       due: 'Tomorrow',  priority: 'mid' },
    { title: 'Onboarding video storyboard',         project: 'Q2 Marketing',       due: 'Apr 24',    priority: 'mid' },
    { title: 'Test runner upgrade (Jest→Vitest)',   project: 'Tooling Refresh',    due: 'Apr 27',    priority: 'low' },
    { title: 'DB backup verification',              project: 'Legacy Migration',   due: 'Apr 23',    priority: 'high' }
  ],
  team: [
    { name: 'Sarah Chen',  role: 'Design Lead',       load: 85 },
    { name: 'Daniel Kim',   role: 'iOS Engineer',      load: 72 },
    { name: 'Nina Park',    role: 'Marketing Manager', load: 90 },
    { name: 'Marcus Lopez', role: 'Platform Engineer', load: 45 },
    { name: 'Yuki Tanaka',  role: 'DevOps',            load: 60 }
  ]
};
