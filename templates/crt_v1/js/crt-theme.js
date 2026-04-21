/* Cathode Ray Terminal — Rendering */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.CRT_DATA) return;

  // SYSBAR
  var sysbar = document.getElementById('sysbar');
  if (sysbar) {
    sysbar.innerHTML = CRT_DATA.sysbar.map(function (s) {
      return '<span>' + s.label + ': <strong>' + s.value + '</strong></span>';
    }).join('');
  }

  // KPI
  var kpiGrid = document.getElementById('kpiGrid');
  if (kpiGrid) {
    kpiGrid.innerHTML = CRT_DATA.kpi.map(function (k) {
      return '<div class="crt-kpi" data-id="' + k.id + '">'
        + '<div class="crt-kpi-label">' + k.label + '</div>'
        + '<div class="crt-kpi-value ' + (k.state || '') + '">' + k.value + '</div>'
        + '<div class="crt-kpi-trend">' + k.trend + '</div>'
        + '</div>';
    }).join('');
  }

  // Services
  var svcList = document.getElementById('servicesList');
  if (svcList) {
    svcList.innerHTML = CRT_DATA.services.map(function (s) {
      var cls = s.state ? s.state : '';
      return '<div class="crt-service ' + cls + '">'
        + '<span class="crt-service-name">' + s.name + '</span>'
        + '<span class="crt-service-status">[' + s.status + ']</span>'
        + '<span class="crt-service-latency">' + s.latency + '</span>'
        + '</div>';
    }).join('');
  }

  // Logs
  var logs = document.getElementById('logs');
  if (logs) {
    logs.innerHTML = CRT_DATA.logs.map(function (l) {
      var cls = l.level === 'ERR' ? 'err' : l.level === 'WARN' ? 'warn' : 'info';
      return '<div class="crt-log-row ' + cls + '">'
        + '<span class="crt-log-time">' + l.time + '</span>'
        + '<span class="crt-log-lvl">' + l.level + '</span>'
        + '<span class="crt-log-msg">' + l.msg + '</span>'
        + '<span class="crt-log-src">' + l.src + '</span>'
        + '</div>';
    }).join('');
  }

  // ASCII 바 차트 (서비스 CPU 사용률 가상)
  var asciiEl = document.getElementById('asciiCpu');
  if (asciiEl) {
    var bars = [
      { name: 'api-gateway        ', pct: 42 },
      { name: 'auth-service       ', pct: 28 },
      { name: 'db-primary         ', pct: 68 },
      { name: 'db-replica-02      ', pct: 84 },
      { name: 'webhook-dispatcher ', pct: 18 },
      { name: 'notification-worker', pct: 22 },
      { name: 'search-index       ', pct: 96 },
      { name: 'cache-redis        ', pct: 54 }
    ];
    var out = 'SERVICE              CPU%  [0%     50%     100%]\n';
    out    += '-------------------- ----  --------------------\n';
    bars.forEach(function (b) {
      var w = Math.round(b.pct / 5);
      var bar = Array(w + 1).join('█') + Array(20 - w + 1).join('░');
      out += b.name + ' ' + String(b.pct).padStart(3, ' ') + '%  [' + bar + ']\n';
    });
    asciiEl.textContent = out;
  }

  // Chart.js — 인광 라인
  var el = document.getElementById('latencyChart');
  if (el && window.Chart) {
    var d = CRT_DATA.latencyChart;
    new Chart(el.getContext('2d'), {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          { label: 'p50 latency (ms)', data: d.p50, borderColor: '#33FF66', backgroundColor: 'transparent', borderWidth: 2, tension: 0, pointBackgroundColor: '#33FF66', pointRadius: 3, pointStyle: 'rect' },
          { label: 'p99 latency (ms)', data: d.p99, borderColor: '#FFB000', backgroundColor: 'transparent', borderWidth: 2, tension: 0, pointBackgroundColor: '#FFB000', pointRadius: 3, pointStyle: 'rect', borderDash: [4, 2] }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { color: '#33FF66', font: { family: 'VT323, Courier New', size: 16 } } } },
        scales: {
          x: { grid: { color: 'rgba(51,255,102,0.1)' }, ticks: { color: '#22AA44', font: { family: 'VT323, Courier New', size: 13 } } },
          y: { grid: { color: 'rgba(51,255,102,0.1)' }, ticks: { color: '#22AA44', font: { family: 'VT323, Courier New', size: 13 } } }
        }
      }
    });
  }
});
