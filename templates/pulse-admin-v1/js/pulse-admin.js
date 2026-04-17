/* ============================================
   Pulse Admin v1 — Interactions
   ============================================ */

// Dark/Light mode toggle
function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme');
  var next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('pulse-theme', next);
  var icon = document.querySelector('.theme-toggle svg');
  if (icon) icon.innerHTML = next === 'light'
    ? '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>'
    : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
}

// Restore theme
(function() {
  var saved = localStorage.getItem('pulse-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// Sidebar collapse (tablet)
function toggleSidebar() {
  var sb = document.querySelector('.sidebar');
  var main = document.querySelector('.main');
  if (!sb) return;
  var isCollapsed = sb.style.width === 'var(--pulse-sidebar-collapsed)' || sb.style.width === '64px';
  sb.style.width = isCollapsed ? '' : '64px';
  main.style.marginLeft = isCollapsed ? '' : '64px';
}

// Simple SVG line chart renderer
function drawLineChart(containerId, data, options) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var w = container.clientWidth, h = container.clientHeight || 240;
  var padding = { top: 16, right: 16, bottom: 32, left: 48 };
  var chartW = w - padding.left - padding.right;
  var chartH = h - padding.top - padding.bottom;
  var max = Math.max.apply(null, data.map(function(d) { return d.value; }));
  var min = 0;
  var range = max - min || 1;

  var points = data.map(function(d, i) {
    var x = padding.left + (i / (data.length - 1)) * chartW;
    var y = padding.top + chartH - ((d.value - min) / range) * chartH;
    return { x: x, y: y, label: d.label, value: d.value };
  });

  var pathD = points.map(function(p, i) { return (i === 0 ? 'M' : 'L') + p.x + ',' + p.y; }).join(' ');
  var areaD = pathD + ' L' + points[points.length-1].x + ',' + (padding.top + chartH) + ' L' + points[0].x + ',' + (padding.top + chartH) + ' Z';
  var color = options && options.color || 'var(--pulse-primary)';

  var gridLines = '';
  for (var i = 0; i <= 4; i++) {
    var gy = padding.top + (i / 4) * chartH;
    var val = Math.round(max - (i / 4) * range);
    gridLines += '<line x1="' + padding.left + '" y1="' + gy + '" x2="' + (w - padding.right) + '" y2="' + gy + '" class="chart-grid"/>';
    gridLines += '<text x="' + (padding.left - 8) + '" y="' + (gy + 4) + '" text-anchor="end" class="chart-axis">' + (val >= 1000 ? (val/1000).toFixed(1) + 'k' : val) + '</text>';
  }

  var labels = points.filter(function(p, i) { return i % Math.ceil(data.length / 6) === 0 || i === data.length - 1; })
    .map(function(p) { return '<text x="' + p.x + '" y="' + (h - 8) + '" text-anchor="middle" class="chart-axis">' + p.label + '</text>'; }).join('');

  container.innerHTML = '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">'
    + gridLines + labels
    + '<path d="' + areaD + '" fill="' + color + '" class="chart-area"/>'
    + '<path d="' + pathD + '" stroke="' + color + '" class="chart-line"/>'
    + '</svg>';
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
});
