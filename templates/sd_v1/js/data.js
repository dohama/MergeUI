/* ============================================
   SoftDesk v1 — Sample Data
   ============================================
   이 파일의 값만 수정하면 대시보드 데이터가 바뀝니다.
   HTML을 직접 수정할 필요가 없습니다.

   사용법:
   1. 아래 SOFTDESK_DATA 객체의 값을 본인 데이터로 교체
   2. 브라우저 새로고침
   ============================================ */

var SOFTDESK_DATA = {

  /* ===== Overview 페이지 ===== */

  // KPI 카드 4개
  kpi: [
    { label: 'Total Users',     value: '2,847',  trend: '+12.5%', dir: 'up',   icon: 'users' },
    { label: 'Monthly Revenue', value: '$18.2k',  trend: '+8.3%',  dir: 'up',   icon: 'dollar' },
    { label: 'Active Rate',     value: '94.2%',   trend: '+2.1%',  dir: 'up',   icon: 'activity' },
    { label: 'Churn Rate',      value: '1.8%',    trend: '-0.4%',  dir: 'down', icon: 'churn' }
  ],

  // 매출 추이 차트
  revenueChart: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    data: [8200, 9100, 8800, 10200, 11500, 12100, 13400, 14200, 15100, 16300, 17500, 18200]
  },

  // 최근 활동
  recentActivity: [
    { user: 'Sarah Chen',   action: 'upgraded to Pro plan',       time: '2 min ago',   color: 'success' },
    { user: 'Mike Johnson', action: 'signed up',                  time: '15 min ago',  color: 'primary' },
    { user: 'Alex Kim',     action: 'submitted a support ticket', time: '1 hour ago',  color: 'warning' },
    { user: 'Emma Wilson',  action: 'exported monthly report',    time: '2 hours ago', color: 'accent' },
    { user: 'David Lee',    action: 'cancelled subscription',     time: '3 hours ago', color: 'error' },
    { user: 'Lisa Park',    action: 'upgraded to Team plan',      time: '5 hours ago', color: 'success' }
  ],

  // 최근 주문 테이블
  recentOrders: [
    { name: 'Sarah Chen',   initials: 'SC', plan: 'Pro',  amount: '$19.00', status: 'Paid',    statusType: 'success', date: 'Apr 17, 2026' },
    { name: 'Mike Johnson', initials: 'MJ', plan: 'Pro',  amount: '$19.00', status: 'Paid',    statusType: 'success', date: 'Apr 16, 2026' },
    { name: 'Lisa Park',    initials: 'LP', plan: 'Team', amount: '$49.00', status: 'Paid',    statusType: 'success', date: 'Apr 16, 2026' },
    { name: 'Alex Kim',     initials: 'AK', plan: 'Pro',  amount: '$19.00', status: 'Pending', statusType: 'warning', date: 'Apr 15, 2026' },
    { name: 'Emma Wilson',  initials: 'EW', plan: 'Pro',  amount: '$19.00', status: 'Paid',    statusType: 'success', date: 'Apr 15, 2026' }
  ],

  /* ===== Analytics 페이지 ===== */

  analyticsKpi: [
    { label: 'Page Views',      value: '48.2k',   trend: '+18.2%', dir: 'up' },
    { label: 'Unique Visitors', value: '12.8k',   trend: '+9.4%',  dir: 'up' },
    { label: 'Avg. Session',    value: '3m 42s',  trend: '',       dir: '' },
    { label: 'Bounce Rate',     value: '34.1%',   trend: '-2.3%',  dir: 'down' }
  ],

  trafficChart: {
    labels: ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6','Week 7','Week 8'],
    visitors: [3200, 4100, 3800, 5200, 4800, 6100, 5900, 7200],
    pageViews: [6400, 8200, 7600, 10400, 9600, 12200, 11800, 14400]
  },

  topPages: {
    labels: ['/home', '/pricing', '/themes', '/docs', '/blog', '/login', '/signup'],
    data:   [4500,    3600,       3250,      2400,    1750,    1400,     1000]
  },

  trafficSources: {
    labels: ['Direct', 'Organic', 'Social', 'Referral'],
    data:   [40,       25,        20,       15]
  },

  devices: {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    data:   [64,        28,       8]
  },

  browsers: {
    labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
    data:   [58,       22,       10,        7,      3]
  },

  /* ===== Users 페이지 ===== */

  users: [
    { name: 'Sarah Chen',     email: 'sarah@example.com',    role: 'Admin',  plan: 'Pro',  status: 'Active',   joined: 'Mar 15, 2026' },
    { name: 'Mike Johnson',   email: 'mike@example.com',     role: 'User',   plan: 'Pro',  status: 'Active',   joined: 'Mar 20, 2026' },
    { name: 'Lisa Park',      email: 'lisa@example.com',     role: 'User',   plan: 'Team', status: 'Active',   joined: 'Feb 10, 2026' },
    { name: 'Alex Kim',       email: 'alex@example.com',     role: 'User',   plan: 'Free', status: 'Inactive', joined: 'Jan 5, 2026' },
    { name: 'Emma Wilson',    email: 'emma@example.com',     role: 'Editor', plan: 'Pro',  status: 'Active',   joined: 'Mar 1, 2026' },
    { name: 'David Lee',      email: 'david@example.com',    role: 'User',   plan: 'Free', status: 'Inactive', joined: 'Dec 20, 2025' },
    { name: 'Jenny Wang',     email: 'jenny@example.com',    role: 'Admin',  plan: 'Team', status: 'Active',   joined: 'Feb 28, 2026' },
    { name: 'Tom Harris',     email: 'tom@example.com',      role: 'User',   plan: 'Pro',  status: 'Active',   joined: 'Mar 25, 2026' },
    { name: 'Rachel Green',   email: 'rachel@example.com',   role: 'Editor', plan: 'Pro',  status: 'Active',   joined: 'Apr 1, 2026' },
    { name: 'Chris Taylor',   email: 'chris@example.com',    role: 'User',   plan: 'Free', status: 'Pending',  joined: 'Apr 10, 2026' }
  ],

  /* ===== Projects 페이지 ===== */

  projects: [
    { title: 'Website Redesign',  desc: 'Complete overhaul of the marketing website with new branding.',  progress: 72, status: 'In Progress', statusType: 'primary', team: ['SC','MJ','LP'], due: 'Apr 30' },
    { title: 'Mobile App v2',     desc: 'Native mobile app for iOS and Android with offline support.',    progress: 35, status: 'On Hold',     statusType: 'warning', team: ['AK','EW'],      due: 'May 15' },
    { title: 'API Integration',   desc: 'Third-party API integrations for payment and analytics.',        progress: 100,status: 'Completed',   statusType: 'success', team: ['DL','JW','TN'], due: 'Completed' },
    { title: 'Design System',     desc: 'Comprehensive design system with tokens and components.',        progress: 58, status: 'In Progress', statusType: 'primary', team: ['SC','LP'],      due: 'May 1' },
    { title: 'Data Pipeline',     desc: 'Real-time data processing for analytics and reporting.',         progress: 45, status: 'In Progress', statusType: 'info',    team: ['MJ','DL','AK','RG'], due: 'Jun 10' },
    { title: 'Security Audit',    desc: 'Penetration testing and compliance review.',                     progress: 88, status: 'Overdue',     statusType: 'error',   team: ['EW','CS'],      due: 'Overdue 3 days' }
  ]
};
