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
