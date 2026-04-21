/* Neon Market — Rendering */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.BD_DATA) return;

  // Hero
  var hero = document.getElementById('hero');
  if (hero) {
    var h = BD_DATA.hero;
    hero.querySelector('.bd-hero-label').textContent = h.label;
    hero.querySelector('.bd-hero-title').textContent = h.title;
    hero.querySelector('.bd-hero-sub').textContent = h.sub;
  }

  // KPI
  var kpiSlots = document.querySelectorAll('.bd-kpi-slot');
  BD_DATA.kpi.forEach(function (k, i) {
    if (!kpiSlots[i]) return;
    var valClass = 'bd-kpi-value';
    if (k.color === 'mint') valClass += ' neon-mint';
    if (k.color === 'yellow') valClass += ' neon-yellow';
    kpiSlots[i].innerHTML = ''
      + '<div class="bd-kpi-label">' + k.label + '</div>'
      + '<div class="' + valClass + '">' + k.value + '</div>'
      + '<div class="bd-kpi-trend">' + k.trend + '</div>';
  });

  // 상품 카드들
  var productSlots = document.querySelectorAll('.bd-product-slot');
  BD_DATA.products.forEach(function (p, i) {
    if (!productSlots[i]) return;
    var hot = p.hot ? '<div class="bd-hot-badge">Hot</div>' : '';
    productSlots[i].innerHTML = ''
      + '<div class="bd-product">'
      +   '<div class="bd-product-thumb ' + (p.alt || '') + '">' + p.thumb + hot + '</div>'
      +   '<div class="bd-product-name">' + p.name + '</div>'
      +   '<div class="bd-product-price">' + p.price + '</div>'
      + '</div>';
  });

  // 주문 테이블
  var ordersBody = document.getElementById('ordersBody');
  if (ordersBody) {
    ordersBody.innerHTML = BD_DATA.orders.map(function (o) {
      return '<tr>'
        + '<td><strong>' + o.id + '</strong></td>'
        + '<td>' + o.customer + '</td>'
        + '<td>' + o.items + '</td>'
        + '<td>' + o.total + '</td>'
        + '<td><span class="bd-pill ' + o.status + '">' + o.status + '</span></td>'
        + '</tr>';
    }).join('');
  }

  // Chart — 네온 라인
  var chartEl = document.getElementById('revenueChart');
  if (chartEl && window.Chart) {
    var ctx = chartEl.getContext('2d');
    var grad = ctx.createLinearGradient(0, 0, 0, 200);
    grad.addColorStop(0, 'rgba(255, 45, 135, 0.4)');
    grad.addColorStop(1, 'rgba(255, 45, 135, 0)');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          { label: 'Revenue', data: [14200, 18400, 16800, 21400, 24600, 28200, 26400], borderColor: '#FF2D87', backgroundColor: grad, borderWidth: 4, tension: 0.4, fill: true, pointBackgroundColor: '#FF2D87', pointBorderColor: '#FFFFFF', pointBorderWidth: 2, pointRadius: 6 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8A8A8A', font: { family: 'Archivo', size: 11 } } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8A8A8A', font: { family: 'Archivo', size: 11 } } }
        }
      }
    });
  }
});
