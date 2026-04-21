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
  ],
  hourly: (function(){
    // 24시간 분포 — 오전·오후 피크
    var arr = [];
    for (var h = 0; h < 24; h++) {
      var base = 2;
      if (h >= 9 && h <= 11) base = 9;
      else if (h >= 14 && h <= 17) base = 8;
      else if (h >= 20 && h <= 22) base = 7;
      else if (h >= 7 && h <= 19) base = 5;
      else if (h >= 0 && h <= 5) base = 1;
      arr.push(base + Math.floor(Math.random() * 2));
    }
    return arr;
  })(),
  miniMetrics: [
    { label: 'Page Views',      points: [62,68,72,70,76,82,84,88,86,90,94,98] },
    { label: 'Unique Visitors', points: [48,52,56,54,58,62,66,64,68,72,74,78] },
    { label: 'Avg Session',     points: [32,34,36,34,38,40,42,38,42,44,46,48] },
    { label: 'Bounce Rate',     points: [42,40,38,40,38,36,34,36,34,32,30,28] },
    { label: 'Conversion',      points: [28,30,32,30,32,34,36,38,38,40,42,44] },
    { label: 'Revenue',         points: [22,24,28,30,32,36,38,42,46,48,52,56] },
    { label: 'New Signups',     points: [16,18,20,22,24,26,28,30,32,32,36,40] },
    { label: 'Active Users',    points: [42,44,48,50,54,56,58,60,64,66,68,72] }
  ]
};
