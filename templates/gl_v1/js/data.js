/* ===================================================
   Aurora SaaS (gl_v1) — Sample Data
   이 파일의 값을 수정하면 대시보드 데이터가 바뀝니다.
   =================================================== */
var GL_DATA = {
  kpi: [
    { label: 'Active Workspaces', value: '847', trend: '+12.5%', trendDir: 'up', icon: '🗂' },
    { label: 'Team Members', value: '2,104', trend: '+8.3%', trendDir: 'up', icon: '👥' },
    { label: 'API Calls (24h)', value: '3.2M', trend: '+24%', trendDir: 'up', icon: '⚡' },
    { label: 'Uptime (30d)', value: '99.98%', trend: '+0.02', trendDir: 'up', icon: '✨' }
  ],
  activityChart: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series1: [8200, 9100, 8800, 10200, 11500, 9600, 8400], // API calls
    series2: [620, 720, 690, 810, 940, 780, 650]            // Active users
  },
  recentActivity: [
    { dot: 'primary', text: 'Sarah Chen invited 3 members to "Marketing" workspace', time: '2m ago' },
    { dot: 'sub',     text: 'Zapier integration triggered 47 automations', time: '14m ago' },
    { dot: 'third',   text: 'Product team deployed v2.3.1 to production', time: '1h ago' },
    { dot: 'primary', text: 'Billing plan upgraded — Team to Business', time: '3h ago' },
    { dot: 'sub',     text: 'New workspace "Q2 Planning" created', time: '5h ago' },
    { dot: 'third',   text: 'Slack notification rule updated by admin', time: '6h ago' },
  ],
  workspaces: [
    { name: 'Marketing Ops',   members: 12, plan: 'Business', status: 'active',   activity: 'High' },
    { name: 'Engineering',     members: 38, plan: 'Business', status: 'active',   activity: 'High' },
    { name: 'Design System',   members: 7,  plan: 'Team',     status: 'active',   activity: 'Med'  },
    { name: 'Q2 Planning',     members: 4,  plan: 'Free',     status: 'warning',  activity: 'Low'  },
    { name: 'Legal & Compliance', members: 3, plan: 'Team',   status: 'active',   activity: 'Low'  },
    { name: 'Archived Research', members: 0, plan: 'Free',    status: 'error',    activity: '—'    },
  ],
  integrations: [
    { name: 'Slack',   runs: '12.4k/day', status: 'connected' },
    { name: 'GitHub',  runs: '3.1k/day',  status: 'connected' },
    { name: 'Notion',  runs: '890/day',   status: 'connected' },
    { name: 'Linear',  runs: '620/day',   status: 'connected' },
    { name: 'Figma',   runs: '—',         status: 'paused' },
  ]
};
