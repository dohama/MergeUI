/* ============================================
   CRM Pipeline v1 — Sample Data
   ============================================ */

var CRM_DATA = {

  kpi: [
    { label: 'Total Deals',    value: '$284,500', trend: '+12.3%', dir: 'up' },
    { label: 'Won This Month', value: '$68,000',  trend: '+8.1%',  dir: 'up' },
    { label: 'Win Rate',       value: '34.2%',    trend: '+2.4%',  dir: 'up' },
    { label: 'Avg Deal Size',  value: '$23,708',  trend: '-1.2%',  dir: 'down' }
  ],

  pipeline: {
    lead: [
      { title: 'Acme Corp',    amount: '$12,000', contact: 'Sarah Chen',   initials: 'SC', date: 'Apr 22', priority: 'high' },
      { title: 'Nova Labs',    amount: '$8,500',  contact: 'James Wright', initials: 'JW', date: 'Apr 25', priority: 'medium' },
      { title: 'Pixel Studio', amount: '$5,200',  contact: 'Amy Liu',      initials: 'AL', date: 'Apr 28', priority: 'low' }
    ],
    qualified: [
      { title: 'Zenith Tech',  amount: '$32,000', contact: 'Mark Davis',   initials: 'MD', date: 'Apr 20', priority: 'high' },
      { title: 'BlueStar Inc', amount: '$18,500', contact: 'Rachel Kim',   initials: 'RK', date: 'Apr 23', priority: 'medium' },
      { title: 'DataFlow',     amount: '$14,000', contact: 'Tom Harris',   initials: 'TH', date: 'Apr 26', priority: 'medium' }
    ],
    proposal: [
      { title: 'CloudNine SaaS', amount: '$45,000', contact: 'Lisa Park',  initials: 'LP', date: 'Apr 18', priority: 'high' },
      { title: 'GreenTech Co',   amount: '$22,000', contact: 'David Lee',  initials: 'DL', date: 'Apr 21', priority: 'medium' }
    ],
    negotiation: [
      { title: 'MegaCorp', amount: '$78,000', contact: 'Emma Wilson', initials: 'EW', date: 'Apr 15', priority: 'high' }
    ],
    won: [
      { title: 'StartupXYZ', amount: '$28,000', contact: 'Chris Taylor', initials: 'CT', date: 'Apr 10', priority: 'low' },
      { title: 'FinServ Ltd', amount: '$40,000', contact: 'Jenny Wang',  initials: 'JW', date: 'Apr 12', priority: 'medium' }
    ],
    lost: [
      { title: 'OldTech Inc', amount: '$15,300', contact: 'Alex Kim', initials: 'AK', date: 'Apr 8', priority: 'low' }
    ]
  },

  contacts: [
    { name: 'Sarah Chen',   company: 'Acme Corp',      title: 'VP of Engineering', email: 'sarah@acme.com',      phone: '+1 415-555-0101', status: 'Active',   initials: 'SC' },
    { name: 'Mark Davis',   company: 'Zenith Tech',    title: 'CTO',               email: 'mark@zenithtech.com', phone: '+1 415-555-0102', status: 'Active',   initials: 'MD' },
    { name: 'Lisa Park',    company: 'CloudNine SaaS', title: 'CEO',               email: 'lisa@cloudnine.io',   phone: '+1 415-555-0103', status: 'Active',   initials: 'LP' },
    { name: 'Emma Wilson',  company: 'MegaCorp',       title: 'Head of Product',   email: 'emma@megacorp.com',   phone: '+1 415-555-0104', status: 'Active',   initials: 'EW' },
    { name: 'James Wright', company: 'Nova Labs',      title: 'Director of Ops',   email: 'james@novalabs.io',   phone: '+1 415-555-0105', status: 'Active',   initials: 'JW' },
    { name: 'Rachel Kim',   company: 'BlueStar Inc',   title: 'Procurement Lead',  email: 'rachel@bluestar.com', phone: '+1 415-555-0106', status: 'Active',   initials: 'RK' },
    { name: 'Tom Harris',   company: 'DataFlow',       title: 'Engineering Mgr',   email: 'tom@dataflow.dev',    phone: '+1 415-555-0107', status: 'Inactive', initials: 'TH' },
    { name: 'Amy Liu',      company: 'Pixel Studio',   title: 'Creative Director', email: 'amy@pixelstudio.co',  phone: '+1 415-555-0108', status: 'Active',   initials: 'AL' },
    { name: 'David Lee',    company: 'GreenTech Co',   title: 'COO',               email: 'david@greentech.com', phone: '+1 415-555-0109', status: 'Active',   initials: 'DL' },
    { name: 'Chris Taylor', company: 'StartupXYZ',     title: 'Founder',           email: 'chris@startupxyz.io', phone: '+1 415-555-0110', status: 'Active',   initials: 'CT' }
  ],

  deals: [
    { title: 'MegaCorp Enterprise', amount: '$78,000', stage: 'Negotiation', stageType: 'negotiation', owner: 'Emma Wilson',  close: 'Apr 30', priority: 'high' },
    { title: 'CloudNine Annual',    amount: '$45,000', stage: 'Proposal',    stageType: 'proposal',    owner: 'Lisa Park',    close: 'May 5',  priority: 'high' },
    { title: 'FinServ Integration', amount: '$40,000', stage: 'Won',         stageType: 'won',         owner: 'Jenny Wang',   close: 'Apr 12', priority: 'medium' },
    { title: 'Zenith Platform',     amount: '$32,000', stage: 'Qualified',   stageType: 'qualified',   owner: 'Mark Davis',   close: 'May 10', priority: 'high' },
    { title: 'StartupXYZ Package',  amount: '$28,000', stage: 'Won',         stageType: 'won',         owner: 'Chris Taylor', close: 'Apr 10', priority: 'low' },
    { title: 'GreenTech Renewal',   amount: '$22,000', stage: 'Proposal',    stageType: 'proposal',    owner: 'David Lee',    close: 'May 1',  priority: 'medium' },
    { title: 'BlueStar Expansion',  amount: '$18,500', stage: 'Qualified',   stageType: 'qualified',   owner: 'Rachel Kim',   close: 'May 8',  priority: 'medium' },
    { title: 'OldTech Migration',   amount: '$15,300', stage: 'Lost',        stageType: 'lost',        owner: 'Alex Kim',     close: 'Apr 8',  priority: 'low' },
    { title: 'DataFlow Analytics',  amount: '$14,000', stage: 'Qualified',   stageType: 'qualified',   owner: 'Tom Harris',   close: 'May 15', priority: 'medium' },
    { title: 'Acme Corp Pilot',     amount: '$12,000', stage: 'Lead',        stageType: 'lead',        owner: 'Sarah Chen',   close: 'May 20', priority: 'high' },
    { title: 'Nova Labs Trial',     amount: '$8,500',  stage: 'Lead',        stageType: 'lead',        owner: 'James Wright', close: 'May 25', priority: 'medium' },
    { title: 'Pixel Studio Design', amount: '$5,200',  stage: 'Lead',        stageType: 'lead',        owner: 'Amy Liu',      close: 'Jun 1',  priority: 'low' }
  ],

  activities: [
    { type: 'call',    title: 'Discovery call with MegaCorp',    desc: 'Discussed enterprise requirements and pricing.',  person: 'Emma Wilson',  time: '10 min ago' },
    { type: 'email',   title: 'Follow-up to CloudNine',          desc: 'Sent updated proposal with integration pricing.', person: 'Lisa Park',    time: '1 hour ago' },
    { type: 'meeting', title: 'Demo for Zenith Tech',            desc: 'Presented platform to technical team.',           person: 'Mark Davis',   time: '2 hours ago' },
    { type: 'note',    title: 'BlueStar deal strategy',           desc: 'Need competitive analysis before next call.',     person: 'Rachel Kim',   time: '3 hours ago' },
    { type: 'deal',    title: 'FinServ deal closed - Won!',       desc: 'Closed $40,000 annual contract.',                 person: 'Jenny Wang',   time: '5 hours ago' },
    { type: 'call',    title: 'Intro call with Acme Corp',        desc: 'Sarah interested in API integration.',            person: 'Sarah Chen',   time: '6 hours ago' },
    { type: 'email',   title: 'Proposal to GreenTech',            desc: 'Sent renewal proposal with 15% discount.',        person: 'David Lee',    time: 'Yesterday' },
    { type: 'meeting', title: 'Quarterly review StartupXYZ',      desc: 'Reviewed usage and expansion plans.',             person: 'Chris Taylor', time: 'Yesterday' },
    { type: 'note',    title: 'Lost deal analysis: OldTech',      desc: 'Lost to competitor on pricing.',                  person: 'Alex Kim',     time: '2 days ago' },
    { type: 'call',    title: 'Check-in with Nova Labs',          desc: 'James wants trial next month.',                   person: 'James Wright', time: '2 days ago' },
    { type: 'email',   title: 'DataFlow requirements',            desc: 'Tom sent technical requirements.',                person: 'Tom Harris',   time: '3 days ago' },
    { type: 'meeting', title: 'Team pipeline review',             desc: 'Focus on MegaCorp and CloudNine.',                person: 'Team',         time: '3 days ago' },
    { type: 'deal',    title: 'StartupXYZ closed - Won!',         desc: 'Closed $28,000 after 3-week negotiation.',        person: 'Chris Taylor', time: '1 week ago' },
    { type: 'call',    title: 'Cold call to Pixel Studio',        desc: 'Amy interested in design tools.',                 person: 'Amy Liu',      time: '1 week ago' },
    { type: 'note',    title: 'Market research: CRM trends',      desc: '67% of mid-market increasing CRM spend.',         person: 'Team',         time: '1 week ago' }
  ],

  reportKpi: [
    { label: 'Pipeline Value', value: '$284,500', trend: '+12.3%', dir: 'up' },
    { label: 'Deals Won',     value: '8',        trend: '+3',     dir: 'up' },
    { label: 'Win Rate',      value: '34.2%',    trend: '+2.4%',  dir: 'up' },
    { label: 'Avg Cycle',     value: '18 days',  trend: '-2',     dir: 'up' }
  ],

  pipelineFunnel: [
    { stage: 'Lead',        count: 45, color: '#74B9FF' },
    { stage: 'Qualified',   count: 28, color: '#0984E3' },
    { stage: 'Proposal',    count: 15, color: '#6C5CE7' },
    { stage: 'Negotiation', count: 8,  color: '#FFA502' },
    { stage: 'Won',         count: 6,  color: '#2ED573' }
  ],

  monthlyWinRate: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    won:    [5, 7, 4, 8, 6, 9],
    lost:   [3, 2, 5, 3, 4, 2]
  },

  repPerformance: [
    { name: 'Emma Wilson', deals: 12, won: 8, revenue: '$156,000', rate: '67%' },
    { name: 'Lisa Park',   deals: 10, won: 5, revenue: '$89,000',  rate: '50%' },
    { name: 'Mark Davis',  deals: 8,  won: 3, revenue: '$72,000',  rate: '38%' },
    { name: 'David Lee',   deals: 7,  won: 3, revenue: '$48,000',  rate: '43%' },
    { name: 'Sarah Chen',  deals: 6,  won: 2, revenue: '$35,000',  rate: '33%' }
  ],

  revenueByMonth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data:   [42000, 58000, 35000, 68000, 52000, 75000]
  }
};
