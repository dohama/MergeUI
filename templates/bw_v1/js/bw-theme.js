/* Monochrome Analytics — Dashboard Rendering */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.BW_DATA) return;

  // Mega Title Strip
  var mega = document.getElementById('megaMetric');
  if (mega) {
    var m = BW_DATA.megaMetric;
    mega.querySelector('.bw-mega-label').textContent = m.label;
    mega.querySelector('.bw-mega-title').textContent = m.value;
    mega.querySelector('.bw-mega-sub').textContent = m.sub;
  }

  // KPI Grid
  var kpiGrid = document.getElementById('kpiGrid');
  if (kpiGrid) {
    kpiGrid.innerHTML = BW_DATA.kpi.map(function (k) {
      return '<div class="bw-kpi">'
        + '<div class="bw-kpi-label">' + k.label + '</div>'
        + '<div class="bw-kpi-value">' + k.value + '</div>'
        + '<div class="bw-kpi-trend">' + k.trend + '</div>'
        + '</div>';
    }).join('');
  }

  // Top Pages 리스트
  var topList = document.getElementById('topPagesList');
  if (topList) {
    topList.innerHTML = BW_DATA.topPages.map(function (p) {
      return '<div class="bw-list-item">'
        + '<span class="bw-list-rank">' + String(p.rank).padStart(2, '0') + '</span>'
        + '<span class="bw-list-name">' + p.name + '</span>'
        + '<span class="bw-list-value">' + p.views + '</span>'
        + '</div>';
    }).join('');
  }

  // Traffic Sources
  var sourcesBody = document.getElementById('sourcesBody');
  if (sourcesBody) {
    sourcesBody.innerHTML = BW_DATA.sources.map(function (s) {
      return '<tr>'
        + '<td>' + s.name + '</td>'
        + '<td class="num">' + s.value + '</td>'
        + '<td class="num">' + s.pct + '%</td>'
        + '</tr>';
    }).join('');
  }

  // ── [2] Bar — Sessions by Channel (monochrome) ──
  var barEl = document.getElementById('bwBar');
  if (barEl && window.Chart) {
    new Chart(barEl.getContext('2d'), {
      type: 'bar',
      data: {
        labels: BW_DATA.sources.map(function(s){return s.name;}),
        datasets: [{
          data: BW_DATA.sources.map(function(s){return parseInt(s.value.replace(/,/g,''));}),
          backgroundColor: ['#000000','#2C2C2C','#4A4A4A','#6B6B6B','#8A8A8A'],
          borderColor: '#000', borderWidth: 0, borderRadius: 0
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#4A4A4A', font: { family: 'Space Grotesk', size: 10 } } },
          y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#8A8A8A', font: { family: 'JetBrains Mono', size: 10 } } }
        }
      }
    });
  }

  // ── [3] Donut — Device Share (greyscale) ──
  var donutEl = document.getElementById('bwDonut');
  if (donutEl && window.Chart) {
    new Chart(donutEl.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: BW_DATA.devices.map(function(d){return d.name;}),
        datasets: [{
          data: BW_DATA.devices.map(function(d){return d.pct;}),
          backgroundColor: ['#000000','#6B6B6B','#C8C8C8'],
          borderWidth: 2, borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '58%',
        plugins: { legend: { position: 'right', labels: { color: '#1A1A1A', font: { family: 'Space Grotesk', size: 11, weight: '500' }, usePointStyle: true, boxWidth: 8 } } }
      }
    });
  }

  // ── [4] Histogram — Hourly Distribution ──
  var histEl = document.getElementById('bwHist');
  if (histEl && window.Chart) {
    var labels = [];
    for (var h = 0; h < 24; h++) labels.push(h + 'h');
    new Chart(histEl.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: BW_DATA.hourly,
          backgroundColor: '#000000',
          borderWidth: 0, borderRadius: 0,
          barPercentage: 1, categoryPercentage: 0.9
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8A8A8A', font: { family: 'JetBrains Mono', size: 9 }, autoSkip: true, maxRotation: 0 } },
          y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#8A8A8A', font: { family: 'JetBrains Mono', size: 10 } } }
        }
      }
    });
  }

  // ── [5] Mini Sparklines × 8 ──
  var sparksEl = document.getElementById('bwSparks');
  if (sparksEl) {
    sparksEl.innerHTML = BW_DATA.miniMetrics.map(function(m, i){
      var p = m.points, min = Math.min.apply(null, p), max = Math.max.apply(null, p);
      var W = 140, H = 40;
      var pts = p.map(function(v, idx){
        var x = (idx / (p.length - 1)) * W;
        var y = H - ((v - min) / (max - min || 1)) * (H - 6) - 3;
        return x + ',' + y;
      }).join(' ');
      var latest = p[p.length - 1];
      var first = p[0];
      var delta = ((latest - first) / first * 100).toFixed(1);
      var arrow = latest >= first ? '↑' : '↓';
      return '<div style="padding:8px 10px;border:1px solid var(--bw-line-soft)">'
        + '<div style="font-size:9px;color:var(--bw-text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">' + m.label + '</div>'
        + '<div style="font-family:var(--bw-font-mono);font-size:14px;font-weight:900">' + latest + '</div>'
        + '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:28px;display:block;margin-top:4px"><polyline fill="none" stroke="#000" stroke-width="1" points="' + pts + '"/></svg>'
        + '<div style="font-size:9px;color:var(--bw-text-muted);font-family:var(--bw-font-mono);margin-top:2px">' + arrow + ' ' + Math.abs(delta) + '%</div>'
        + '</div>';
    }).join('');
  }

  // Chart — 흑백 라인 + 대쉬
  var chartEl = document.getElementById('trafficChart');
  if (chartEl && window.Chart) {
    var d = BW_DATA.trafficChart;
    new Chart(chartEl.getContext('2d'), {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          { label: 'Sessions', data: d.sessions, borderColor: '#000000', backgroundColor: 'transparent', borderWidth: 2, tension: 0.1, pointBackgroundColor: '#000', pointRadius: 4, pointBorderColor: '#000' },
          { label: 'Conversions', data: d.conversions, borderColor: '#8A8A8A', backgroundColor: 'transparent', borderWidth: 1.5, borderDash: [6, 4], tension: 0.1, pointBackgroundColor: '#8A8A8A', pointRadius: 3, yAxisID: 'y2' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#4A4A4A', font: { family: 'Space Grotesk', size: 12, weight: '500' }, padding: 16 } }
        },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#8A8A8A', font: { family: 'JetBrains Mono', size: 11 } } },
          y: { beginAtZero: false, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#8A8A8A', font: { family: 'JetBrains Mono', size: 11 } } },
          y2: { position: 'right', beginAtZero: false, grid: { display: false }, ticks: { color: '#8A8A8A', font: { family: 'JetBrains Mono', size: 11 } } }
        }
      }
    });
  }
});
