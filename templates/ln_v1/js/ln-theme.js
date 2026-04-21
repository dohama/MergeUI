/* Linea CRM — Rendering */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.LN_DATA) return;

  // KPI
  var kpiGrid = document.getElementById('kpiGrid');
  if (kpiGrid) {
    kpiGrid.innerHTML = LN_DATA.kpi.map(function (k) {
      return '<div class="ln-kpi">'
        + '<div class="ln-kpi-label">' + k.label + '</div>'
        + '<div class="ln-kpi-value">' + k.value + '</div>'
        + '<div class="ln-kpi-trend">' + k.trend + '</div>'
        + '</div>';
    }).join('');
  }

  // 파이프라인
  var pipeWrap = document.getElementById('pipelineWrap');
  if (pipeWrap) {
    var html = '';
    Object.keys(LN_DATA.pipeline).forEach(function (stage) {
      var deals = LN_DATA.pipeline[stage];
      html += '<div class="ln-pipe-col">'
        + '<div class="ln-pipe-head"><span>' + stage + '</span><span>' + deals.length + '</span></div>'
        + deals.map(function (d) {
          return '<div class="ln-deal">'
            + '<div class="ln-deal-name">' + d.name + '</div>'
            + '<div class="ln-deal-company">' + d.company + '</div>'
            + '<div class="ln-deal-value">' + d.value + '</div>'
            + '</div>';
        }).join('')
        + '</div>';
    });
    pipeWrap.innerHTML = html;
  }

  // 타임라인
  var tl = document.getElementById('timeline');
  if (tl) {
    tl.innerHTML = LN_DATA.activities.map(function (a) {
      return '<div class="ln-tl-item">'
        + '<div class="ln-tl-type">' + a.type + '</div>'
        + '<div class="ln-tl-text">' + a.text + '</div>'
        + '<div class="ln-tl-time">' + a.time + '</div>'
        + '</div>';
    }).join('');
  }
});
