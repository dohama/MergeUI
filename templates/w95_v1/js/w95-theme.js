/* Workspace 95 — Rendering */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.W95_DATA) return;

  // KPI
  var kpiGrid = document.getElementById('kpiGrid');
  if (kpiGrid) {
    kpiGrid.innerHTML = W95_DATA.kpi.map(function (k) {
      var dir = (k.trend || '').indexOf('-') === 0 ? ' down' : '';
      return '<div class="w95-kpi">'
        + '<div class="w95-kpi-label">' + k.label + '</div>'
        + '<div class="w95-kpi-value">' + k.value + '</div>'
        + '<div class="w95-kpi-trend' + dir + '">' + k.trend + '</div>'
        + '</div>';
    }).join('');
  }

  // Projects
  var projectsBody = document.getElementById('projectsBody');
  if (projectsBody) {
    projectsBody.innerHTML = W95_DATA.projects.map(function (p) {
      return '<tr>'
        + '<td>&#128193; ' + p.name + '</td>'
        + '<td>' + p.owner + '</td>'
        + '<td><div class="w95-progress"><div class="w95-progress-bar" style="width:' + p.progress + '%"></div></div></td>'
        + '<td>' + p.due + '</td>'
        + '<td><span class="w95-badge ' + p.status + '">' + p.status + '</span></td>'
        + '</tr>';
    }).join('');
  }

  // Tasks
  var tasksBody = document.getElementById('tasksBody');
  if (tasksBody) {
    tasksBody.innerHTML = W95_DATA.tasks.map(function (t) {
      return '<tr>'
        + '<td>&#128203; ' + t.title + '</td>'
        + '<td>' + t.project + '</td>'
        + '<td>' + t.due + '</td>'
        + '<td><span class="w95-badge ' + (t.priority === 'high' ? 'blocked' : t.priority === 'mid' ? 'pending' : 'active') + '">' + t.priority + '</span></td>'
        + '</tr>';
    }).join('');
  }

  // Team
  var teamBody = document.getElementById('teamBody');
  if (teamBody) {
    teamBody.innerHTML = W95_DATA.team.map(function (m) {
      return '<tr>'
        + '<td>&#128100; ' + m.name + '</td>'
        + '<td>' + m.role + '</td>'
        + '<td><div class="w95-progress"><div class="w95-progress-bar" style="width:' + m.load + '%"></div></div> ' + m.load + '%</td>'
        + '</tr>';
    }).join('');
  }

  // 시계
  function tick() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes(), ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    var clock = document.getElementById('clock');
    if (clock) clock.textContent = h + ':' + String(m).padStart(2, '0') + ' ' + ampm;
  }
  tick(); setInterval(tick, 30000);

  // Chart (System Monitor 스타일)
  var el = document.getElementById('burndownChart');
  if (el && window.Chart) {
    new Chart(el.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'],
        datasets: [
          { label: 'Planned', data: [120,108,96,84,72,60,48,36], borderColor: '#000080', backgroundColor: 'transparent', borderWidth: 2, tension: 0, pointBackgroundColor: '#000080', pointRadius: 4, pointStyle: 'rect' },
          { label: 'Actual',  data: [120,112,99,89,76,68,58,52], borderColor: '#800000', backgroundColor: 'transparent', borderWidth: 2, tension: 0, pointBackgroundColor: '#800000', pointRadius: 4, pointStyle: 'rect', borderDash: [3,2] }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { font: { family: 'MS Sans Serif, Tahoma', size: 11 } } } },
        scales: {
          x: { grid: { color: '#C0C0C0' }, ticks: { font: { family: 'MS Sans Serif, Tahoma', size: 10 } } },
          y: { grid: { color: '#C0C0C0' }, ticks: { font: { family: 'MS Sans Serif, Tahoma', size: 10 } } }
        }
      }
    });
  }
});
