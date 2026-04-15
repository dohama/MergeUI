/* ============================================
   MergeUi — SaaS Admin v1
   Premium Chart & Interaction Config
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initCharts();
});

function initSidebar() {
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.sidebar-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.includes(currentPage)) item.classList.add('active');
  });
}

function initCharts() {
  if (typeof Chart === 'undefined') return;

  const style = getComputedStyle(document.documentElement);
  const primary = '#6C5CE7';
  const secondary = '#00CEC9';
  const accent = '#FD79A8';
  const yellow = '#FDCB6E';
  const muted = '#8892A4';
  const gridColor = 'rgba(0,0,0,0.03)';

  // Global defaults
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.font.weight = 500;
  Chart.defaults.color = muted;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.legend.labels.font = { size: 12, weight: 500, family: "'Inter', sans-serif" };
  Chart.defaults.plugins.tooltip.backgroundColor = '#1A1D26';
  Chart.defaults.plugins.tooltip.titleFont = { size: 13, weight: 600, family: "'Inter', sans-serif" };
  Chart.defaults.plugins.tooltip.bodyFont = { size: 12, weight: 400, family: "'Inter', sans-serif" };
  Chart.defaults.plugins.tooltip.cornerRadius = 12;
  Chart.defaults.plugins.tooltip.padding = { top: 12, right: 16, bottom: 12, left: 16 };
  Chart.defaults.plugins.tooltip.boxPadding = 6;
  Chart.defaults.plugins.tooltip.usePointStyle = true;
  Chart.defaults.plugins.tooltip.displayColors = true;

  // ── Revenue Line Chart ──
  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx) {
    const ctx = revenueCtx.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 300);
    grad.addColorStop(0, 'rgba(108, 92, 231, 0.18)');
    grad.addColorStop(0.7, 'rgba(108, 92, 231, 0.03)');
    grad.addColorStop(1, 'rgba(108, 92, 231, 0)');

    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue',
          data: [4200, 5100, 4800, 6200, 7100, 6800, 8200, 9100, 8700, 10200, 11500, 12800],
          borderColor: primary,
          backgroundColor: grad,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: primary,
          pointHoverBorderWidth: 3,
          borderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: ctx => '  $' + ctx.parsed.y.toLocaleString() }
          }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { padding: 10 } },
          y: {
            grid: { color: gridColor, drawBorder: false },
            border: { display: false },
            ticks: { padding: 14, callback: v => '$' + (v/1000) + 'k' }
          }
        },
        interaction: { intersect: false, mode: 'index' },
      }
    });
  }

  // ── Subscribers Bar Chart ──
  const subsCtx = document.getElementById('subscribersChart');
  if (subsCtx) {
    new Chart(subsCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'New Subscribers',
            data: [32, 45, 38, 52, 48, 61],
            backgroundColor: createBarGradient(subsCtx, primary, 'rgba(108,92,231,0.6)'),
            borderRadius: { topLeft: 8, topRight: 8 },
            barPercentage: 0.45,
            categoryPercentage: 0.7,
          },
          {
            label: 'Churned',
            data: [5, 8, 4, 6, 10, 7],
            backgroundColor: createBarGradient(subsCtx, accent, 'rgba(253,121,168,0.6)'),
            borderRadius: { topLeft: 8, topRight: 8 },
            barPercentage: 0.45,
            categoryPercentage: 0.7,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end' } },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { padding: 10 } },
          y: { grid: { color: gridColor, drawBorder: false }, border: { display: false }, ticks: { padding: 14 } }
        }
      }
    });
  }

  // ── Plan Distribution Doughnut ──
  const planCtx = document.getElementById('planChart');
  if (planCtx) {
    new Chart(planCtx, {
      type: 'doughnut',
      data: {
        labels: ['Pro Monthly', 'Pro Yearly', 'Team', 'Free'],
        datasets: [{
          data: [45, 25, 15, 15],
          backgroundColor: [primary, secondary, accent, '#D5DAE4'],
          hoverBackgroundColor: ['#7D6FF0', '#1AD8D2', '#FF8DB5', '#C5CAD4'],
          borderWidth: 0,
          spacing: 5,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, boxWidth: 12, boxHeight: 12 }
          },
          tooltip: {
            callbacks: { label: ctx => '  ' + ctx.label + ': ' + ctx.parsed + '%' }
          }
        }
      }
    });
  }
}

function createBarGradient(canvas, colorTop, colorBottom) {
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 300);
  grad.addColorStop(0, colorTop);
  grad.addColorStop(1, colorBottom);
  return grad;
}
