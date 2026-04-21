/* Aurora SaaS — Dashboard Interactions */
document.addEventListener('DOMContentLoaded', function () {
  // KPI 카드 렌더
  var kpiGrid = document.getElementById('kpiGrid');
  if (kpiGrid && window.GL_DATA) {
    kpiGrid.innerHTML = GL_DATA.kpi.map(function (k) {
      var arrow = k.trendDir === 'up' ? '↑' : '↓';
      return '<div class="gl-kpi">'
        + '<div class="gl-kpi-icon">' + k.icon + '</div>'
        + '<div class="gl-kpi-label">' + k.label + '</div>'
        + '<div class="gl-kpi-value">' + k.value + '</div>'
        + '<div class="gl-kpi-trend ' + k.trendDir + '">' + arrow + ' ' + k.trend + ' vs last week</div>'
        + '</div>';
    }).join('');
  }

  // 활동 리스트
  var actList = document.getElementById('activityList');
  if (actList && window.GL_DATA) {
    actList.innerHTML = GL_DATA.recentActivity.map(function (a) {
      return '<div class="gl-activity-item">'
        + '<span class="gl-act-dot ' + a.dot + '"></span>'
        + '<div class="gl-act-info">'
        +   '<div class="gl-act-text">' + a.text + '</div>'
        +   '<div class="gl-act-time">' + a.time + '</div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  // 워크스페이스 테이블
  var wsBody = document.getElementById('workspacesBody');
  if (wsBody && window.GL_DATA) {
    wsBody.innerHTML = GL_DATA.workspaces.map(function (w) {
      return '<tr>'
        + '<td><strong>' + w.name + '</strong></td>'
        + '<td>' + w.members + '</td>'
        + '<td>' + w.plan + '</td>'
        + '<td><span class="gl-pill ' + w.status + '">' + w.status + '</span></td>'
        + '<td>' + w.activity + '</td>'
        + '</tr>';
    }).join('');
  }

  // 차트 (Chart.js 필요)
  var chartEl = document.getElementById('activityChart');
  if (chartEl && window.Chart && window.GL_DATA) {
    var d = GL_DATA.activityChart;
    var ctx = chartEl.getContext('2d');

    // 그라디언트 생성
    var grad1 = ctx.createLinearGradient(0, 0, 0, 260);
    grad1.addColorStop(0, 'rgba(139,124,240,0.35)');
    grad1.addColorStop(1, 'rgba(139,124,240,0)');

    var grad2 = ctx.createLinearGradient(0, 0, 0, 260);
    grad2.addColorStop(0, 'rgba(255,155,192,0.3)');
    grad2.addColorStop(1, 'rgba(255,155,192,0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          { label: 'API Calls', data: d.series1, borderColor: '#8B7CF0', backgroundColor: grad1, borderWidth: 3, tension: 0.4, fill: true, pointBackgroundColor: '#fff', pointBorderColor: '#8B7CF0', pointBorderWidth: 2, pointRadius: 5 },
          { label: 'Active Users', data: d.series2, borderColor: '#FF9BC0', backgroundColor: grad2, borderWidth: 3, tension: 0.4, fill: true, pointBackgroundColor: '#fff', pointBorderColor: '#FF9BC0', pointBorderWidth: 2, pointRadius: 5, yAxisID: 'y2' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#4A4566', font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } } } },
        scales: {
          x: { grid: { color: 'rgba(139,124,240,0.06)' }, ticks: { color: '#8A85A8' } },
          y: { beginAtZero: true, grid: { color: 'rgba(139,124,240,0.06)' }, ticks: { color: '#8A85A8' } },
          y2: { position: 'right', beginAtZero: true, grid: { display: false }, ticks: { color: '#8A85A8' } }
        }
      }
    });
  }
});
