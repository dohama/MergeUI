/* ======================================================
   Monochrome Analytics (bw_v1) — Sample Data
   수정하면 대시보드가 바뀝니다.
   ====================================================== */
var BW_DATA = {
  megaMetric: { label: 'TOTAL SESSIONS / THIS WEEK', value: '182,400', sub: '전 주 대비 +12.4% — 역사상 최고 주간 트래픽. 유기적 검색이 44% 기여, 가장 큰 이탈점은 Pricing 페이지 (43.2%).' },
  kpi: [
    { label: 'Page Views', value: '487K', trend: '↑ 8.2%' },
    { label: 'Unique Visitors', value: '62,104', trend: '↑ 11.4%' },
    { label: 'Bounce Rate', value: '38.7%', trend: '↓ 2.1%' },
    { label: 'Avg Session', value: '3:42', trend: '↑ 0:18' }
  ],
  trafficChart: {
    labels: ['Wk 36','Wk 37','Wk 38','Wk 39','Wk 40','Wk 41','Wk 42'],
    sessions:   [142100, 151200, 148900, 162400, 158600, 172300, 182400],
    conversions: [2180, 2440, 2310, 2780, 2610, 3040, 3380]
  },
  sources: [
    { name: 'Organic Search', value: '80,256', pct: 44 },
    { name: 'Direct',          value: '47,424', pct: 26 },
    { name: 'Referral',        value: '25,536', pct: 14 },
    { name: 'Social',          value: '18,240', pct: 10 },
    { name: 'Email',           value: '10,944', pct: 6 }
  ],
  topPages: [
    { rank: 1, name: '/blog/dashboard-patterns', views: '21,840' },
    { rank: 2, name: '/pricing',                  views: '18,220' },
    { rank: 3, name: '/',                         views: '16,108' },
    { rank: 4, name: '/themes',                   views: '14,330' },
    { rank: 5, name: '/docs/getting-started',     views: '12,580' },
    { rank: 6, name: '/components',               views: '10,430' }
  ],
  devices: [
    { name: 'Desktop', pct: 58 },
    { name: 'Mobile',  pct: 34 },
    { name: 'Tablet',  pct: 8 }
  ]
};
