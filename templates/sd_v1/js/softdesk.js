/* ============================================
   SoftDesk v1 — Interactions
   ============================================ */

// Sidebar toggle
function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('collapsed');
}

// Toggle elements
document.addEventListener('click', function(e) {
  var toggle = e.target.closest('.form-toggle');
  if (toggle) toggle.classList.toggle('on');

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

  // Sidebar toggle button
  var sidebarToggle = e.target.closest('.sidebar-toggle');
  if (sidebarToggle) toggleSidebar();
});

// Table sort arrow toggle (visual only)
document.addEventListener('click', function(e) {
  var th = e.target.closest('.data-table th');
  if (!th) return;
  var arrow = th.querySelector('.sort-arrow');
  if (!arrow) return;
  var current = arrow.textContent;
  // Reset all arrows in this table
  th.closest('thead').querySelectorAll('.sort-arrow').forEach(function(a) { a.textContent = '\u2195'; a.style.opacity = '0.4'; });
  arrow.style.opacity = '1';
  arrow.textContent = current === '\u2191' ? '\u2193' : '\u2191';
});

// Chart.js neumorphism defaults
function getChartDefaults() {
  var style = getComputedStyle(document.documentElement);
  function cv(name, fallback) {
    var v = style.getPropertyValue(name);
    return (v && v.trim()) ? v.trim() : fallback;
  }
  return {
    fontFamily: cv('--sd-font', 'Plus Jakarta Sans, sans-serif'),
    textMuted: cv('--sd-text-muted', '#A0AEC0'),
    gridColor: 'rgba(166,180,200,0.2)',
    primary: cv('--sd-primary', '#1ACEFF'),
    accent: cv('--sd-accent', '#1ACEFF'),
    chart1: cv('--sd-chart-1', '#1ACEFF'),
    chart2: cv('--sd-chart-2', '#6C5CE7'),
    chart3: cv('--sd-chart-3', '#FF6B6B'),
    chart4: cv('--sd-chart-4', '#00B894'),
    chart5: cv('--sd-chart-5', '#FDCB6E'),
    chart6: cv('--sd-chart-6', '#74B9FF'),
    chart7: cv('--sd-chart-7', '#A29BFE')
  };
}

function applyChartJsDefaults() {
  if (typeof Chart === 'undefined') return;
  var d = getChartDefaults();
  Chart.defaults.font.family = d.fontFamily;
  Chart.defaults.color = d.textMuted;
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(45,55,72,0.9)';
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.elements.point.radius = 4;
  Chart.defaults.elements.point.hoverRadius = 6;
  Chart.defaults.elements.point.borderWidth = 2;
  Chart.defaults.elements.point.backgroundColor = '#DFE4EA';
  Chart.defaults.elements.line.tension = 0.4;
  Chart.defaults.elements.line.borderWidth = 2.5;
  Chart.defaults.elements.bar.borderRadius = 6;
}
