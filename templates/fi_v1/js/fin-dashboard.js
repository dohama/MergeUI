/* ============================================
   Finance Dashboard v1 — Interactions
   ============================================ */

// Tab switching
document.addEventListener('click', function(e) {
  var tab = e.target.closest('.tab');
  if (tab) {
    tab.parentElement.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');
    var target = tab.getAttribute('data-tab');
    if (target) {
      document.querySelectorAll('.tab-content').forEach(function(c) { c.style.display = 'none'; });
      var el = document.getElementById(target);
      if (el) el.style.display = 'block';
    }
  }
});

// Table sort arrow toggle (visual only)
document.addEventListener('click', function(e) {
  var th = e.target.closest('.data-table th');
  if (!th) return;
  var arrow = th.querySelector('.sort-arrow');
  if (!arrow) return;
  th.closest('thead').querySelectorAll('.sort-arrow').forEach(function(a) { a.textContent = '\u2195'; a.style.opacity = '0.4'; });
  arrow.style.opacity = '1';
  arrow.textContent = arrow.textContent === '\u2191' ? '\u2193' : '\u2191';
});

// Chart.js claymorphism defaults
function getFinChartDefaults() {
  var style = getComputedStyle(document.documentElement);
  function cv(name, fallback) {
    var v = style.getPropertyValue(name);
    return (v && v.trim()) ? v.trim() : fallback;
  }
  return {
    fontFamily: cv('--fin-font', 'Outfit, sans-serif'),
    textMuted: cv('--fin-text-muted', '#8395A7'),
    gridColor: 'rgba(0,0,0,0.06)',
    chart1: cv('--fin-chart-1', '#00B894'),
    chart2: cv('--fin-chart-2', '#FDCB6E'),
    chart3: cv('--fin-chart-3', '#E17055'),
    chart4: cv('--fin-chart-4', '#74B9FF'),
    chart5: cv('--fin-chart-5', '#A29BFE'),
    chart6: cv('--fin-chart-6', '#00CEC9'),
    chart7: cv('--fin-chart-7', '#FD79A8'),
    chart8: cv('--fin-chart-8', '#636E72')
  };
}

function applyFinChartDefaults() {
  if (typeof Chart === 'undefined') return;
  var d = getFinChartDefaults();
  Chart.defaults.font.family = d.fontFamily;
  Chart.defaults.color = d.textMuted;
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(45,52,54,0.9)';
  Chart.defaults.plugins.tooltip.cornerRadius = 12;
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.elements.point.radius = 4;
  Chart.defaults.elements.point.hoverRadius = 6;
  Chart.defaults.elements.point.borderWidth = 2;
  Chart.defaults.elements.point.backgroundColor = '#F0F4F3';
  Chart.defaults.elements.line.tension = 0.4;
  Chart.defaults.elements.line.borderWidth = 2.5;
  Chart.defaults.elements.bar.borderRadius = 8;
}

// Format currency
function formatCurrency(n) {
  return '$' + n.toLocaleString('en-US');
}
