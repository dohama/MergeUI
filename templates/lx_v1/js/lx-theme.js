/* Maison Finance — Rendering */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.LX_DATA) return;

  // Hero
  var hero = document.getElementById('hero');
  if (hero) {
    var h = LX_DATA.hero;
    hero.querySelector('.lx-hero-label').textContent = h.label;
    hero.querySelector('.lx-hero-value').textContent = h.value;
    hero.querySelector('.lx-hero-sub').textContent = h.sub;
  }

  // KPI
  var kpiGrid = document.getElementById('kpiGrid');
  if (kpiGrid) {
    kpiGrid.innerHTML = LX_DATA.kpi.map(function (k) {
      return '<div class="lx-kpi">'
        + '<div class="lx-kpi-label">' + k.label + '</div>'
        + '<div class="lx-kpi-value">' + k.value + '</div>'
        + '<div class="lx-kpi-trend">' + k.trend + '</div>'
        + '</div>';
    }).join('');
  }

  // Allocation
  var allocBody = document.getElementById('allocationBody');
  if (allocBody) {
    allocBody.innerHTML = LX_DATA.allocation.map(function (a) {
      return '<tr>'
        + '<td><strong>' + a.class + '</strong></td>'
        + '<td class="num">' + a.amount + '</td>'
        + '<td class="num">' + a.pct + '</td>'
        + '<td><span class="lx-badge ' + a.badge + '">' + a.ytd + '</span></td>'
        + '</tr>';
    }).join('');
  }

  // Transactions
  var txBody = document.getElementById('txBody');
  if (txBody) {
    txBody.innerHTML = LX_DATA.transactions.map(function (t) {
      return '<tr>'
        + '<td>' + t.date + '</td>'
        + '<td><span class="lx-badge gold">' + t.type + '</span></td>'
        + '<td>' + t.asset + '</td>'
        + '<td class="num">' + t.amount + '</td>'
        + '</tr>';
    }).join('');
  }

  // Chart — 골드 스트로크 라인
  var chartEl = document.getElementById('portfolioChart');
  if (chartEl && window.Chart) {
    var ctx = chartEl.getContext('2d');
    var grad = ctx.createLinearGradient(0, 0, 0, 260);
    grad.addColorStop(0, 'rgba(201, 169, 97, 0.2)');
    grad.addColorStop(1, 'rgba(201, 169, 97, 0)');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Portfolio Value ($M)',
            data: [3.82, 3.88, 4.01, 4.08, 4.12, 4.18, 4.14, 4.21, 4.24, 4.26, 4.27, 4.28],
            borderColor: '#C9A961', backgroundColor: grad,
            borderWidth: 2, tension: 0.35, fill: true,
            pointBackgroundColor: '#C9A961', pointBorderColor: '#1A1815',
            pointBorderWidth: 2, pointRadius: 5
          },
          {
            label: 'Benchmark (S&P 500)',
            data: [3.82, 3.81, 3.88, 3.91, 3.95, 3.98, 3.96, 4.00, 4.02, 4.03, 4.04, 4.05],
            borderColor: '#6B2032', borderWidth: 1.5, tension: 0.35, fill: false,
            pointBackgroundColor: '#6B2032', pointRadius: 3, borderDash: [4, 3]
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#C9C1AE', font: { family: 'Montserrat', size: 11, weight: '500' } } } },
        scales: {
          x: { grid: { color: 'rgba(201,169,97,0.04)' }, ticks: { color: '#8F8775', font: { family: 'Montserrat', size: 10 } } },
          y: { grid: { color: 'rgba(201,169,97,0.04)' }, ticks: { color: '#8F8775', font: { family: 'Montserrat', size: 10 } } }
        }
      }
    });
  }
});
