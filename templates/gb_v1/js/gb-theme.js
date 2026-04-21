/* Gameboy DMG — Rendering */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.GB_DATA) return;

  // XP 바
  var xpFill = document.getElementById('xpFill');
  var xpLabel = document.getElementById('xpLabel');
  if (xpFill && xpLabel) {
    var pct = Math.round((GB_DATA.hero.xpCurrent / GB_DATA.hero.xpMax) * 100);
    xpFill.style.width = pct + '%';
    xpLabel.textContent = 'LV.' + GB_DATA.hero.level + ' · ' + GB_DATA.hero.xpCurrent + '/' + GB_DATA.hero.xpMax + ' XP';
  }

  // KPI
  var kpiGrid = document.getElementById('kpiGrid');
  if (kpiGrid) {
    kpiGrid.innerHTML = GB_DATA.kpi.map(function (k) {
      return '<div class="gb-kpi">'
        + '<div class="gb-kpi-icon">' + k.icon + '</div>'
        + '<div class="gb-kpi-label">' + k.label + '</div>'
        + '<div class="gb-kpi-value">' + k.value + '</div>'
        + '</div>';
    }).join('');
  }

  // Quests
  var quests = document.getElementById('questsList');
  if (quests) {
    quests.innerHTML = GB_DATA.quests.map(function (q) {
      return '<div class="gb-quest' + (q.done ? ' done' : '') + '">'
        + '<div class="gb-quest-checkbox"></div>'
        + '<div class="gb-quest-name">' + q.name + '</div>'
        + '<div class="gb-quest-xp">+' + q.xp + ' XP</div>'
        + '</div>';
    }).join('');
  }

  // Heatmap (30일)
  var heat = document.getElementById('heatmap');
  if (heat) {
    heat.innerHTML = GB_DATA.heatmap.map(function (v) {
      return '<div class="gb-heatmap-cell' + (v ? ' l' + v : '') + '" title="' + v + '"></div>';
    }).join('');
  }

  // Achievements
  var ach = document.getElementById('achievements');
  if (ach) {
    ach.innerHTML = GB_DATA.achievements.map(function (a) {
      return '<div class="gb-ach-card' + (a.unlocked ? '' : ' locked') + '">'
        + '<div class="gb-ach-icon">' + a.icon + '</div>'
        + '<div class="gb-ach-name">' + a.name + '</div>'
        + '</div>';
    }).join('');
  }

  // 간단한 클릭 이벤트 (퀘스트 토글)
  document.addEventListener('click', function (e) {
    var quest = e.target.closest('.gb-quest');
    if (quest) quest.classList.toggle('done');
  });
});
