/* ======================================================
   BI Dashboard (bi_v1) — Analytics Data (All 10 charts)
   ====================================================== */
var BI_DATA = {
  kpi: [
    { label: 'Revenue', value: '$284.6K', trend: '+12.4%', dir: 'up', spark: [48,52,56,54,58,62,66,64,68,72,78,82] },
    { label: 'Active Users', value: '48,294', trend: '+8.2%', dir: 'up', spark: [100,108,106,112,118,120,124,128,132,138,144,148] },
    { label: 'Conversion', value: '4.82%', trend: '+0.4pp', dir: 'up', spark: [40,42,41,43,44,42,46,48,47,48,47,48] },
    { label: 'Churn Rate', value: '2.14%', trend: '-0.3pp', dir: 'up', spark: [80,78,76,72,70,68,66,64,60,58,56,52] }
  ],
  // [1] Line — Revenue 12 months
  revenueTrend: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    current:  [182, 194, 206, 228, 220, 238, 252, 268, 278, 282, 296, 310],
    previous: [160, 164, 168, 180, 182, 192, 204, 212, 216, 224, 228, 242]
  },
  // [2] Stacked Bar — Channel split
  channelStack: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    organic: [42,48,52,58,54,60,64,68,72,76,78,82],
    paid:    [30,32,34,36,38,40,42,44,46,48,50,52],
    social:  [18,22,24,26,28,30,32,34,36,38,40,42],
    direct:  [12,14,16,18,20,22,24,26,28,30,32,34]
  },
  // [3] Horizontal Stacked Bar — Cohort retention
  cohortRetention: [
    { cohort: 'Jan 2026', m1: 100, m2: 68, m3: 48, m4: 38, m5: 32, m6: 28 },
    { cohort: 'Feb 2026', m1: 100, m2: 72, m3: 54, m4: 42, m5: 36, m6: 32 },
    { cohort: 'Mar 2026', m1: 100, m2: 74, m3: 56, m4: 46, m5: 40, m6: 0 },
    { cohort: 'Apr 2026', m1: 100, m2: 78, m3: 60, m4: 50, m5: 0, m6: 0 }
  ],
  // [4] Donut — Device
  deviceDonut: {
    labels: ['Desktop','Mobile','Tablet','Smart TV'],
    data:   [52, 38, 8, 2]
  },
  // [5] Pie — Plan
  planPie: {
    labels: ['Free','Pro','Team','Enterprise'],
    data:   [62, 24, 10, 4]
  },
  // [6] Area — MAU/WAU/DAU
  activityArea: {
    labels: ['W36','W37','W38','W39','W40','W41','W42','W43','W44','W45','W46','W47'],
    mau: [42000, 43500, 44800, 45200, 46000, 47400, 48200, 48900, 49600, 50200, 51000, 52400],
    wau: [18000, 18600, 19200, 19400, 19800, 20400, 20800, 21200, 21800, 22200, 22600, 23400],
    dau: [ 6200,  6400,  6600,  6680,  6840,  7020,  7180,  7320,  7480,  7640,  7840,  8120]
  },
  // [7] Scatter — LTV vs Acquisition Cost
  ltvScatter: [
    {x: 24, y: 148, label:'Google', size: 14}, {x: 36, y: 218, label:'LinkedIn', size: 10},
    {x: 18, y: 94,  label:'Twitter', size: 8}, {x: 12, y: 62, label:'Reddit', size: 6},
    {x: 42, y: 268, label:'Industry Event', size: 12}, {x: 58, y: 310, label:'Partner', size: 8},
    {x: 28, y: 142, label:'Instagram', size: 9}, {x: 16, y: 72, label:'Product Hunt', size: 7},
    {x: 20, y: 184, label:'Organic', size: 18}, {x: 48, y: 228, label:'Podcast', size: 6},
    {x: 32, y: 202, label:'Webinar', size: 9}
  ],
  // [8] Heatmap — 7 days × 24 hours
  heatmap: (function(){
    var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var out = [];
    days.forEach(function(d){
      var row = [];
      for (var h = 0; h < 24; h++) {
        // peak 09-11, 14-16, 20-22
        var base = 0;
        if (h >= 9 && h <= 11) base = 4;
        else if (h >= 14 && h <= 16) base = 3;
        else if (h >= 20 && h <= 22) base = 3;
        else if (h >= 7 && h <= 21) base = 2;
        else if (h >= 23 || h <= 6) base = 1;
        if (d === 'Sat' || d === 'Sun') base = Math.max(1, base - 2);
        row.push(Math.max(0, Math.min(4, base + (Math.random() > 0.7 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0))));
      }
      out.push({ day: d, values: row });
    });
    return out;
  })(),
  // [9] Gauge — NPS
  gauge: { value: 72, max: 100, label: 'NPS Score' },
  // [10] Funnel
  funnel: [
    { label: 'Visitors',    count: 124000, pct: 100 },
    { label: 'Signed Up',   count: 28600,  pct: 23.1 },
    { label: 'Activated',   count: 18400,  pct: 14.8 },
    { label: 'Paid',        count: 4820,   pct: 3.9 },
    { label: 'Retained',    count: 3840,   pct: 3.1 }
  ],
  // Top countries (table)
  topCountries: [
    { name: 'United States',  users: 18480, rev: '$84.2K', growth: '+12%' },
    { name: 'United Kingdom', users:  6240, rev: '$32.6K', growth: '+18%' },
    { name: 'Germany',        users:  4920, rev: '$24.1K', growth: '+8%' },
    { name: 'Japan',          users:  3810, rev: '$21.8K', growth: '+22%' },
    { name: 'France',         users:  3420, rev: '$16.4K', growth: '+14%' },
    { name: 'Canada',         users:  3108, rev: '$14.9K', growth: '+9%' },
    { name: 'Australia',      users:  2420, rev: '$11.6K', growth: '+11%' }
  ]
};
