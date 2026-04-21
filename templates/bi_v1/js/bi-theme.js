/* BI Dashboard — Rendering (10 chart types via Chart.js + SVG) */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.BI_DATA) return;
  var D = BI_DATA;

  // Chart.js 글로벌 기본값
  if (window.Chart) {
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.font.size = 11;
    Chart.defaults.color = '#718096';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.boxWidth = 8;
    Chart.defaults.plugins.legend.labels.padding = 12;
  }

  // KPI + Sparkline
  var kpiRow = document.getElementById('kpiRow');
  if (kpiRow) {
    kpiRow.innerHTML = D.kpi.map(function(k, i){
      var arrow = k.dir === 'up' ? '↑' : '↓';
      return '<div class="bi-kpi">'
        + '<div>'
        + '<div class="bi-kpi-label">' + k.label + '</div>'
        + '<div class="bi-kpi-val">' + k.value + '</div>'
        + '<div class="bi-kpi-trend ' + k.dir + '">' + arrow + ' ' + k.trend + ' vs prev</div>'
        + '</div>'
        + '<div class="bi-kpi-spark" id="spark-' + i + '"></div>'
        + '</div>';
    }).join('');
    // 스파크라인 SVG
    D.kpi.forEach(function(k, i){
      var el = document.getElementById('spark-' + i);
      if (!el) return;
      var p = k.spark;
      var min = Math.min.apply(null, p), max = Math.max.apply(null, p);
      var W = 100, H = 48;
      var color = k.dir === 'up' ? '#12B76A' : '#F04438';
      var pts = p.map(function(v, idx){
        var x = (idx / (p.length - 1)) * W;
        var y = H - ((v - min) / (max - min || 1)) * (H - 6) - 3;
        return x + ',' + y;
      }).join(' ');
      var area = 'M0,' + H + ' L' + pts + ' L' + W + ',' + H + ' Z';
      el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:100%;display:block">'
        + '<path d="' + area + '" fill="' + color + '" fill-opacity="0.15"/>'
        + '<polyline fill="none" stroke="' + color + '" stroke-width="1.5" points="' + pts + '"/>'
        + '</svg>';
    });
  }

  // [1] Line chart — Revenue
  chartInit('revenueChart', function(ctx){
    var grad = ctx.createLinearGradient(0, 0, 0, 260);
    grad.addColorStop(0, 'rgba(76,110,245,0.22)');
    grad.addColorStop(1, 'rgba(76,110,245,0)');
    return {
      type: 'line',
      data: {
        labels: D.revenueTrend.labels,
        datasets: [
          { label:'2026', data: D.revenueTrend.current,  borderColor:'#4C6EF5', backgroundColor: grad, borderWidth: 2.5, tension: 0.4, fill: true, pointBackgroundColor: '#fff', pointBorderColor:'#4C6EF5', pointBorderWidth: 2, pointRadius: 3 },
          { label:'2025', data: D.revenueTrend.previous, borderColor:'#CDD4DE', backgroundColor:'transparent', borderWidth: 2, tension: 0.4, pointRadius: 0, borderDash: [4, 3] }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end' } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: function(v){ return '$' + v + 'K'; } } }
        }
      }
    };
  });

  // [2] Stacked bar — Channels
  chartInit('channelChart', function(){
    return {
      type: 'bar',
      data: {
        labels: D.channelStack.labels,
        datasets: [
          { label: 'Organic', data: D.channelStack.organic, backgroundColor: '#4C6EF5', borderRadius: 2 },
          { label: 'Paid',    data: D.channelStack.paid,    backgroundColor: '#A855F7', borderRadius: 2 },
          { label: 'Social',  data: D.channelStack.social,  backgroundColor: '#06B6D4', borderRadius: 2 },
          { label: 'Direct',  data: D.channelStack.direct,  backgroundColor: '#12B76A', borderRadius: 2 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, grid: { color: 'rgba(0,0,0,0.04)' } }
        }
      }
    };
  });

  // [3] Horizontal stacked — Cohort retention
  chartInit('cohortChart', function(){
    return {
      type: 'bar',
      data: {
        labels: D.cohortRetention.map(function(c){return c.cohort;}),
        datasets: [
          { label:'M1', data: D.cohortRetention.map(function(c){return c.m1;}), backgroundColor: '#4338CA', borderRadius: 2 },
          { label:'M2', data: D.cohortRetention.map(function(c){return c.m2;}), backgroundColor: '#4C6EF5', borderRadius: 2 },
          { label:'M3', data: D.cohortRetention.map(function(c){return c.m3;}), backgroundColor: '#8A9DF5', borderRadius: 2 },
          { label:'M4', data: D.cohortRetention.map(function(c){return c.m4;}), backgroundColor: '#C7D2FE', borderRadius: 2 },
          { label:'M5', data: D.cohortRetention.map(function(c){return c.m5;}), backgroundColor: '#E0E7FF', borderRadius: 2 },
          { label:'M6', data: D.cohortRetention.map(function(c){return c.m6;}), backgroundColor: '#EEF1FE', borderRadius: 2 }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: function(v){return v + '%';} } },
          y: { grid: { display: false } }
        }
      }
    };
  });

  // [4] Donut — Device
  chartInit('deviceChart', function(){
    return {
      type: 'doughnut',
      data: { labels: D.deviceDonut.labels, datasets: [{ data: D.deviceDonut.data, backgroundColor: ['#4C6EF5','#A855F7','#06B6D4','#12B76A'], borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { position: 'right' } } }
    };
  });

  // [5] Pie — Plan
  chartInit('planChart', function(){
    return {
      type: 'pie',
      data: { labels: D.planPie.labels, datasets: [{ data: D.planPie.data, backgroundColor: ['#E4E9F0','#4C6EF5','#A855F7','#F79009'], borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
    };
  });

  // [6] Area — DAU/WAU/MAU
  chartInit('activityChart', function(ctx){
    function g(color){ var gr = ctx.createLinearGradient(0,0,0,260); gr.addColorStop(0, color); gr.addColorStop(1, 'rgba(0,0,0,0)'); return gr; }
    return {
      type: 'line',
      data: {
        labels: D.activityArea.labels,
        datasets: [
          { label: 'MAU', data: D.activityArea.mau, borderColor: '#4C6EF5', backgroundColor: g('rgba(76,110,245,0.25)'), borderWidth: 2, tension: 0.3, fill: true, pointRadius: 0 },
          { label: 'WAU', data: D.activityArea.wau, borderColor: '#A855F7', backgroundColor: g('rgba(168,85,247,0.25)'), borderWidth: 2, tension: 0.3, fill: true, pointRadius: 0 },
          { label: 'DAU', data: D.activityArea.dau, borderColor: '#06B6D4', backgroundColor: g('rgba(6,182,212,0.25)'), borderWidth: 2, tension: 0.3, fill: true, pointRadius: 0 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end' } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 9 } } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: function(v){ return (v/1000).toFixed(0) + 'k'; } } } }
      }
    };
  });

  // [7] Scatter — LTV vs CAC
  chartInit('scatterChart', function(){
    var max = Math.max.apply(null, D.ltvScatter.map(function(p){return p.size;}));
    return {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Channel',
          data: D.ltvScatter.map(function(p){ return { x: p.x, y: p.y, r: p.size, label: p.label }; }),
          backgroundColor: 'rgba(76,110,245,0.55)',
          borderColor: '#4C6EF5',
          pointRadius: function(c){ var d = c.raw; return d && d.r ? d.r : 6; }
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function(c){ return c.raw.label + ' — CAC $' + c.raw.x + ', LTV $' + c.raw.y; } } }
        },
        scales: {
          x: { title: { display: true, text: 'CAC ($)', font: { size: 10 }, color: '#718096' }, grid: { color: 'rgba(0,0,0,0.04)' } },
          y: { title: { display: true, text: 'LTV ($)', font: { size: 10 }, color: '#718096' }, grid: { color: 'rgba(0,0,0,0.04)' } }
        }
      }
    };
  });

  // [8] Heatmap — SVG 직접
  renderHeatmap();

  // [9] Gauge — SVG 직접
  renderGauge();

  // [10] Funnel — HTML
  var funnel = document.getElementById('funnel');
  if (funnel) {
    var maxCount = D.funnel[0].count;
    funnel.innerHTML = D.funnel.map(function(f){
      var w = (f.count / maxCount) * 100;
      return '<div class="bi-funnel-row">'
        + '<div class="bi-funnel-lbl">' + f.label + '</div>'
        + '<div class="bi-funnel-bar-wrap"><div class="bi-funnel-bar" style="width:' + w + '%">' + f.count.toLocaleString() + '</div></div>'
        + '<div class="bi-funnel-rate">' + f.pct + '%</div>'
        + '</div>';
    }).join('');
  }

  // Top Countries Table
  var tc = document.getElementById('topCountries');
  if (tc) {
    tc.innerHTML = D.topCountries.map(function(c, i){
      var rank = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      return '<tr>'
        + '<td><span class="bi-rank ' + rank + '">' + (i+1) + '</span></td>'
        + '<td><strong>' + c.name + '</strong></td>'
        + '<td class="num">' + c.users.toLocaleString() + '</td>'
        + '<td class="num">' + c.rev + '</td>'
        + '<td><span class="bi-badge green">' + c.growth + '</span></td>'
        + '</tr>';
    }).join('');
  }
});

function chartInit(id, cfgFn) {
  var el = document.getElementById(id);
  if (!el || !window.Chart) return;
  var ctx = el.getContext('2d');
  new Chart(ctx, cfgFn(ctx));
}

function renderHeatmap() {
  var el = document.getElementById('heatmap');
  if (!el) return;
  var H = BI_DATA.heatmap;
  var header = '<div></div>';
  for (var h = 0; h < 24; h++) {
    header += '<div style="text-align:center;color:#A0AEC0;font-size:9px">' + (h % 3 === 0 ? h : '') + '</div>';
  }
  var rows = H.map(function(row){
    var cells = row.values.map(function(v){
      return '<div class="bi-heat-cell bi-heat-' + v + '" title="' + row.day + ' ' + v + '"></div>';
    }).join('');
    return '<div class="bi-heat-row-label">' + row.day + '</div>' + cells;
  }).join('');
  el.innerHTML = header + rows;
}

function renderGauge() {
  var el = document.getElementById('gauge');
  if (!el) return;
  var g = BI_DATA.gauge;
  var angle = (g.value / g.max) * 180;
  var R = 80, CX = 100, CY = 95;
  function polarToXY(r, a) {
    var rad = (a - 180) * Math.PI / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  }
  function arcPath(r, startA, endA) {
    var s = polarToXY(r, startA), e = polarToXY(r, endA);
    var large = endA - startA > 180 ? 1 : 0;
    return 'M ' + s.x + ' ' + s.y + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + e.x + ' ' + e.y;
  }
  el.innerHTML = ''
    + '<div class="bi-gauge">'
    +   '<svg viewBox="0 0 200 120" class="bi-gauge-svg">'
    +     '<path d="' + arcPath(R, 0, 180) + '" fill="none" stroke="#E4E9F0" stroke-width="14" stroke-linecap="round"/>'
    +     '<path d="' + arcPath(R, 0, angle) + '" fill="none" stroke="#4C6EF5" stroke-width="14" stroke-linecap="round"/>'
    +     '<circle cx="' + polarToXY(R, angle).x + '" cy="' + polarToXY(R, angle).y + '" r="6" fill="#fff" stroke="#4C6EF5" stroke-width="3"/>'
    +   '</svg>'
    +   '<div class="bi-gauge-value">' + g.value + '</div>'
    +   '<div class="bi-gauge-label">' + g.label + '</div>'
    + '</div>';
}
