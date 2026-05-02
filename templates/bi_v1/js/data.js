/* ==========================================================
   bi_v1 · Analytics Studio — Data Layer (Rev 2)
   Spec: design/bi_v1-rebuild-spec.md §4, §5, §10
   - 12-month timeline (Apr 2025 → Apr 2026)
   - Narrate templates (X06)
   - getDataAt(date) scaffold for X09 scrubber
   ========================================================== */
var BI_DATA = {
  /* -----------------------------------------------------
     Timeline — 12 month labels + period bounds
     ----------------------------------------------------- */
  timeline: {
    startISO: '2025-04-01',
    endISO:   '2026-04-23',
    todayISO: '2026-04-23',
    labels: ['Apr 25','May 25','Jun 25','Jul 25','Aug 25','Sep 25','Oct 25','Nov 25','Dec 25','Jan 26','Feb 26','Mar 26','Apr 26']
  },

  /* -----------------------------------------------------
     Hero KPIs
     ----------------------------------------------------- */
  hero: {
    mrr: {
      value: 245820, display: '$245,820',
      delta: 12.4, deltaDir: 'up',
      comparePrev: '$218,700',
      spark: [168, 174, 182, 186, 193, 201, 208, 212, 219, 225, 231, 238, 245],
      target: 280000, progressPct: 88
    },
    nps: {
      value: 42, prom: 128, detr: 34, passive: 58,
      tag: '★ Good'
    },
    growth: {
      revenueYoY: 38.2,
      churnPct: 2.1,
      topDriver: '3 Enterprise upgrades',
      retentionProImprove: { from: 89, to: 92 }
    }
  },

  /* -----------------------------------------------------
     KPI row — retained for legacy or small-card reuse
     ----------------------------------------------------- */
  kpi: [
    { label: 'Revenue',      value: '$284.6K', trend: '+12.4%', dir: 'up', spark: [48,52,56,54,58,62,66,64,68,72,78,82] },
    { label: 'Active Users', value: '48,294',  trend: '+8.2%',  dir: 'up', spark: [100,108,106,112,118,120,124,128,132,138,144,148] },
    { label: 'Conversion',   value: '4.82%',   trend: '+0.4pp', dir: 'up', spark: [40,42,41,43,44,42,46,48,47,48,47,48] },
    { label: 'Churn Rate',   value: '2.14%',   trend: '-0.3pp', dir: 'up', spark: [80,78,76,72,70,68,66,64,60,58,56,52] }
  ],

  /* -----------------------------------------------------
     Charts
     ----------------------------------------------------- */
  revenueTrend: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    current:  [182, 194, 206, 228, 220, 238, 252, 268, 278, 282, 296, 310],
    previous: [160, 164, 168, 180, 182, 192, 204, 212, 216, 224, 228, 242]
  },
  channelStack: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    organic: [42,48,52,58,54,60,64,68,72,76,78,82],
    paid:    [30,32,34,36,38,40,42,44,46,48,50,52],
    social:  [18,22,24,26,28,30,32,34,36,38,40,42],
    direct:  [12,14,16,18,20,22,24,26,28,30,32,34]
  },
  cohortRetention: [
    { cohort: 'Jan 2026', m1: 100, m2: 68, m3: 48, m4: 38, m5: 32, m6: 28 },
    { cohort: 'Feb 2026', m1: 100, m2: 72, m3: 54, m4: 42, m5: 36, m6: 32 },
    { cohort: 'Mar 2026', m1: 100, m2: 74, m3: 56, m4: 46, m5: 40, m6: 0 },
    { cohort: 'Apr 2026', m1: 100, m2: 78, m3: 60, m4: 50, m5: 0, m6: 0 }
  ],
  deviceDonut: {
    labels: ['Desktop','Mobile','Tablet','Smart TV'],
    data:   [52, 38, 8, 2]
  },
  planPie: {
    labels: ['Free','Pro','Team','Enterprise'],
    data:   [62, 24, 10, 4]
  },
  activityArea: {
    labels: ['W36','W37','W38','W39','W40','W41','W42','W43','W44','W45','W46','W47'],
    mau: [42000, 43500, 44800, 45200, 46000, 47400, 48200, 48900, 49600, 50200, 51000, 52400],
    wau: [18000, 18600, 19200, 19400, 19800, 20400, 20800, 21200, 21800, 22200, 22600, 23400],
    dau: [ 6200,  6400,  6600,  6680,  6840,  7020,  7180,  7320,  7480,  7640,  7840,  8120]
  },
  ltvScatter: [
    {x: 24, y: 148, label:'Google', size: 14}, {x: 36, y: 218, label:'LinkedIn', size: 10},
    {x: 18, y: 94,  label:'Twitter', size: 8}, {x: 12, y: 62, label:'Reddit', size: 6},
    {x: 42, y: 268, label:'Industry Event', size: 12}, {x: 58, y: 310, label:'Partner', size: 8},
    {x: 28, y: 142, label:'Instagram', size: 9}, {x: 16, y: 72, label:'Product Hunt', size: 7},
    {x: 20, y: 184, label:'Organic', size: 18}, {x: 48, y: 228, label:'Podcast', size: 6},
    {x: 32, y: 202, label:'Webinar', size: 9}
  ],
  heatmap: (function(){
    var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var out = [];
    // deterministic pseudo-random seeded pattern for stability
    function seed(d, h){ return (d*31 + h*7) % 13 / 13; }
    days.forEach(function(d, dayIdx){
      var row = [];
      for (var h = 0; h < 24; h++) {
        var base = 0;
        if (h >= 9 && h <= 11) base = 4;
        else if (h >= 14 && h <= 16) base = 3;
        else if (h >= 20 && h <= 22) base = 3;
        else if (h >= 7 && h <= 21) base = 2;
        else if (h >= 23 || h <= 6) base = 1;
        if (d === 'Sat' || d === 'Sun') base = Math.max(1, base - 2);
        var jitter = seed(dayIdx, h) > 0.75 ? 1 : (seed(dayIdx, h) < 0.15 ? -1 : 0);
        row.push(Math.max(0, Math.min(4, base + jitter)));
      }
      out.push({ day: d, values: row });
    });
    return out;
  })(),
  gauge: { value: 72, max: 100, label: 'NPS Score' },
  funnel: [
    { label: 'Visitors',    count: 124000, pct: 100 },
    { label: 'Signed Up',   count: 28600,  pct: 23.1 },
    { label: 'Activated',   count: 18400,  pct: 14.8 },
    { label: 'Paid',        count: 4820,   pct: 3.9 },
    { label: 'Retained',    count: 3840,   pct: 3.1 }
  ],
  topCountries: [
    { name: 'United States',  users: 18480, rev: '$84.2K', growth: '+12%' },
    { name: 'United Kingdom', users:  6240, rev: '$32.6K', growth: '+18%' },
    { name: 'Germany',        users:  4920, rev: '$24.1K', growth: '+8%' },
    { name: 'Japan',          users:  3810, rev: '$21.8K', growth: '+22%' },
    { name: 'France',         users:  3420, rev: '$16.4K', growth: '+14%' },
    { name: 'Canada',         users:  3108, rev: '$14.9K', growth: '+9%' },
    { name: 'Australia',      users:  2420, rev: '$11.6K', growth: '+11%' }
  ],

  /* -----------------------------------------------------
     Narrate Templates (X06) · spec §4-1
     placeholders replaced at render time
     ----------------------------------------------------- */
  narrateTemplates: [
    {
      id: 'mrr-growth-enterprise',
      condition: function(s){ return s.mrrDelta > 10 && s.enterpriseUpgrades >= 2; },
      html: '<strong>MRR grew {{mrrDelta}}% WoW</strong>, driven by <mark>{{enterpriseUpgrades}} Enterprise upgrades</mark> and improved <mark>Pro retention ({{retFrom}}% → {{retTo}}%)</mark>. Churn dipped to {{churn}}%, a 3-month low.'
    },
    {
      id: 'churn-low',
      condition: function(s){ return s.churn < 2.5; },
      html: '<strong>Churn fell to {{churn}}%</strong>, the lowest in <mark>6 quarters</mark>. Customer Success saved <mark>7 at-risk accounts</mark> through proactive outreach.'
    },
    {
      id: 'acquisition-strong',
      condition: function(s){ return s.newSignups > 800; },
      html: 'Acquisition accelerated with <strong>{{newSignups}} new signups</strong>, led by <mark>Product Hunt launch</mark> (+412) and <mark>organic search (+267)</mark>. CAC held steady at <mark>$28</mark>.'
    },
    {
      id: 'activation-improvement',
      condition: function(s){ return s.activationRate > 64; },
      html: 'Activation rate hit <strong>{{activationRate}}%</strong> this week, up <mark>+4pp</mark> after the onboarding checklist rollout. <mark>Median time-to-value: 8 minutes</mark>.'
    },
    {
      id: 'expansion-revenue',
      condition: function(s){ return s.expansionMrr > 20000; },
      html: '<strong>Expansion revenue hit ${{expansionMrrK}}K</strong> — <mark>2.1× baseline</mark>. Team-plan upgrades accounted for <mark>63% of expansion MRR</mark>, signaling strong product-market fit in the 5–20 seat segment.'
    },
    {
      id: 'cohort-winner',
      condition: function(s){ return s.bestCohortM3 > 88; },
      html: 'The <strong>February cohort held {{bestCohortM3}}% at M3</strong> — best in <mark>6 quarters</mark>. Suggests the revamped activation flow is converting to habit faster than prior cohorts.'
    },
    {
      id: 'weekend-spike',
      condition: function(s){ return s.weekendSessions > 20; },
      html: 'Saturday sessions jumped <strong>+{{weekendSessions}}%</strong>, driven by <mark>Asia-Pacific organic traffic</mark>. Worth investigating whether <mark>weekend onboarding</mark> converts at the same rate as weekdays.'
    },
    {
      id: 'enterprise-pipeline',
      condition: function(s){ return s.enterprisePipeline > 5; },
      html: 'Enterprise pipeline widened with <strong>{{enterprisePipeline}} new deals in discovery</strong>. <mark>Average contract value: $4,800/mo</mark>. Expected close window: <mark>Q3</mark>.'
    },
    {
      id: 'conversion-optimization',
      condition: function(s){ return s.conversionDelta > 0.3; },
      html: 'Pricing-page conversion improved <strong>+{{conversionDelta}}pp WoW</strong> after the <mark>annual-plan A/B test</mark>. Projected <mark>+$18K MRR</mark> if the lift holds.'
    },
    {
      id: 'nps-high',
      condition: function(s){ return s.nps > 40; },
      html: '<strong>NPS lifted to {{nps}}</strong> this cycle. Promoters cite <mark>onboarding speed</mark> and <mark>dashboard depth</mark>. Detractors mostly <mark>requested deeper integrations</mark>.'
    }
  ],

  /* -----------------------------------------------------
     Snapshot — used by getNarrative + Hero renders
     ----------------------------------------------------- */
  snapshot: {
    mrrDelta: 12.4,
    enterpriseUpgrades: 3,
    retFrom: 89, retTo: 92,
    churn: 2.1,
    newSignups: 842,
    activationRate: 67,
    expansionMrr: 24200, expansionMrrK: 24.2,
    bestCohortM3: 89,
    weekendSessions: 24,
    enterprisePipeline: 7,
    conversionDelta: 0.4,
    nps: 42
  }
};

/* --------------------------------------------------------
   Helpers
   -------------------------------------------------------- */

/**
 * Choose a narrative from templates matching current snapshot.
 * Returns rendered HTML string (safe: only our own template strings).
 */
function getNarrative(state, preferId) {
  var s = state || BI_DATA.snapshot;
  var tpls = BI_DATA.narrateTemplates;
  var pool;
  if (preferId) {
    pool = tpls.filter(function(t){ return t.id === preferId; });
  } else {
    pool = tpls.filter(function(t){ try { return t.condition(s); } catch(_) { return false; } });
  }
  if (!pool.length) pool = tpls;
  var pick = pool[Math.floor(Math.random() * pool.length)];
  return {
    id: pick.id,
    html: pick.html.replace(/\{\{(\w+)\}\}/g, function(_, k){ return (s[k] !== undefined) ? s[k] : '—'; })
  };
}

/**
 * Return data snapshot for a given date (Day 2: static passthrough,
 * Day 3 will wire per-day slicing). Shape stays consistent so chart
 * renderers can call it without branching.
 */
function getDataAt(dateStr) {
  // Day 2 scaffold — reserved shape for Day 3 scrubber-data rewiring.
  return {
    dateISO: dateStr || BI_DATA.timeline.todayISO,
    revenueTrend: BI_DATA.revenueTrend,
    channelStack: BI_DATA.channelStack,
    cohortRetention: BI_DATA.cohortRetention,
    deviceDonut: BI_DATA.deviceDonut,
    planPie: BI_DATA.planPie,
    activityArea: BI_DATA.activityArea,
    ltvScatter: BI_DATA.ltvScatter,
    heatmap: BI_DATA.heatmap,
    gauge: BI_DATA.gauge,
    funnel: BI_DATA.funnel,
    topCountries: BI_DATA.topCountries,
    snapshot: BI_DATA.snapshot
  };
}

/* Expose for non-module scripts */
window.BI_DATA = BI_DATA;
window.getNarrative = getNarrative;
window.getDataAt = getDataAt;
