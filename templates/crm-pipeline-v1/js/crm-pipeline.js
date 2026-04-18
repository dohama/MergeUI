/* ============================================
   CRM Pipeline v1 — Interactions
   ============================================ */

/* Sidebar toggle */
function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('collapsed');
}

/* Detail panel */
function openPanel(html) {
  var panel = document.querySelector('.detail-panel');
  var overlay = document.querySelector('.panel-overlay');
  if (panel) {
    var body = panel.querySelector('.detail-panel-body');
    if (body) body.innerHTML = html;
    panel.classList.add('open');
  }
  if (overlay) overlay.classList.add('open');
}

function closePanel() {
  var panel = document.querySelector('.detail-panel');
  var overlay = document.querySelector('.panel-overlay');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

/* Event delegation */
document.addEventListener('click', function(e) {
  /* Sidebar toggle */
  if (e.target.closest('.sidebar-toggle')) toggleSidebar();

  /* Close panel */
  if (e.target.closest('.detail-panel-close') || e.target.closest('.panel-overlay')) closePanel();

  /* Tabs */
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

  /* Table sort (visual only) */
  var th = e.target.closest('.data-table th');
  if (th) {
    var arrow = th.querySelector('.sort-arrow');
    if (arrow) {
      th.closest('thead').querySelectorAll('.sort-arrow').forEach(function(a) { a.textContent = '\u2195'; a.style.opacity = '0.4'; });
      arrow.style.opacity = '1';
      arrow.textContent = arrow.textContent === '\u2191' ? '\u2193' : '\u2191';
    }
  }
});

/* Chart.js defaults for CRM theme */
function applyChartJsDefaults() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.font.family = 'Manrope, sans-serif';
  Chart.defaults.color = '#A0AEC0';
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(26,32,44,0.9)';
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.elements.point.radius = 4;
  Chart.defaults.elements.point.hoverRadius = 6;
  Chart.defaults.elements.point.borderWidth = 2;
  Chart.defaults.elements.point.backgroundColor = '#FFFFFF';
  Chart.defaults.elements.line.tension = 0.4;
  Chart.defaults.elements.line.borderWidth = 2.5;
  Chart.defaults.elements.bar.borderRadius = 6;
}

/* Pipeline board: render from data */
function renderPipeline(data) {
  var stages = ['lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];
  var stageLabels = { lead: 'Lead', qualified: 'Qualified', proposal: 'Proposal', negotiation: 'Negotiation', won: 'Won', lost: 'Lost' };
  var stageColors = { lead: '#74B9FF', qualified: '#0984E3', proposal: '#6C5CE7', negotiation: '#FFA502', won: '#2ED573', lost: '#FF6B6B' };

  stages.forEach(function(stage) {
    var col = document.querySelector('[data-stage="' + stage + '"]');
    if (!col) return;
    var cards = col.querySelector('.pipeline-cards');
    var count = col.querySelector('.count');
    var items = data[stage] || [];
    if (count) count.textContent = items.length;
    if (!cards) return;
    cards.innerHTML = items.map(function(d) {
      return '<div class="deal-card">' +
        '<div class="deal-title">' + d.title + '</div>' +
        '<div class="deal-amount">' + d.amount + '</div>' +
        '<div class="deal-contact"><span class="contact-avatar">' + d.initials + '</span>' + d.contact + '</div>' +
        '<div class="deal-meta"><span class="deal-date">' + d.date + '</span><span class="deal-priority ' + d.priority + '">' + d.priority + '</span></div>' +
      '</div>';
    }).join('');
  });
}

/* Contacts table: render from data */
function renderContacts(data) {
  var tbody = document.querySelector('.contacts-table tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(function(c) {
    return '<tr class="clickable" data-contact="' + c.name + '">' +
      '<td><div class="table-user"><div class="table-avatar">' + c.initials + '</div>' + c.name + '</div></td>' +
      '<td>' + c.company + '</td>' +
      '<td>' + c.title + '</td>' +
      '<td>' + c.email + '</td>' +
      '<td>' + c.phone + '</td>' +
      '<td><span class="badge badge-' + (c.status === 'Active' ? 'success' : 'warning') + '">' + c.status + '</span></td>' +
    '</tr>';
  }).join('');

  /* Click to open detail panel */
  tbody.addEventListener('click', function(e) {
    var row = e.target.closest('tr.clickable');
    if (!row) return;
    var name = row.getAttribute('data-contact');
    var contact = data.find(function(c) { return c.name === name; });
    if (!contact) return;
    openPanel(
      '<div class="detail-avatar">' + contact.initials + '</div>' +
      '<div class="detail-field"><div class="detail-field-label">Name</div><div class="detail-field-value">' + contact.name + '</div></div>' +
      '<div class="detail-field"><div class="detail-field-label">Company</div><div class="detail-field-value">' + contact.company + '</div></div>' +
      '<div class="detail-field"><div class="detail-field-label">Title</div><div class="detail-field-value">' + contact.title + '</div></div>' +
      '<div class="detail-field"><div class="detail-field-label">Email</div><div class="detail-field-value">' + contact.email + '</div></div>' +
      '<div class="detail-field"><div class="detail-field-label">Phone</div><div class="detail-field-value">' + contact.phone + '</div></div>' +
      '<div class="detail-field"><div class="detail-field-label">Status</div><div class="detail-field-value"><span class="badge badge-' + (contact.status === 'Active' ? 'success' : 'warning') + '">' + contact.status + '</span></div></div>'
    );
  });
}

/* Deals table: render from data */
function renderDeals(data) {
  var tbody = document.querySelector('.deals-table tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(function(d) {
    return '<tr>' +
      '<td><strong>' + d.title + '</strong></td>' +
      '<td style="color:var(--crm-third);font-weight:700">' + d.amount + '</td>' +
      '<td><span class="badge badge-' + d.stageType + '">' + d.stage + '</span></td>' +
      '<td>' + d.owner + '</td>' +
      '<td>' + d.close + '</td>' +
      '<td><span class="deal-priority ' + d.priority + '">' + d.priority + '</span></td>' +
    '</tr>';
  }).join('');
}

/* Activities timeline: render from data */
function renderActivities(data) {
  var container = document.querySelector('.timeline');
  if (!container) return;

  var iconSvgs = {
    call:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    email:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    meeting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    note:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    deal:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
  };

  container.innerHTML = data.map(function(a) {
    return '<div class="timeline-item">' +
      '<div class="timeline-icon ' + a.type + '">' + (iconSvgs[a.type] || '') + '</div>' +
      '<div class="timeline-content">' +
        '<div class="timeline-title">' + a.title + '</div>' +
        '<div class="timeline-desc">' + a.desc + '</div>' +
        '<div class="timeline-meta"><span>' + a.person + '</span><span>' + a.time + '</span></div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* KPI cards: bind data */
function bindKpi(data) {
  var cards = document.querySelectorAll('.kpi-card');
  if (!data || cards.length === 0) return;
  data.forEach(function(k, i) {
    if (i >= cards.length) return;
    var card = cards[i];
    var val = card.querySelector('.kpi-value');
    var trend = card.querySelector('.kpi-trend');
    var label = card.querySelector('.kpi-label');
    if (val) val.textContent = k.value;
    if (trend) { trend.textContent = k.trend; trend.className = 'kpi-trend ' + k.dir; }
    if (label) label.textContent = k.label;
  });
}
