/* ==========================================================
   bi_v1 · Analytics Studio — Theme Runtime (Rev 2)
   Spec: design/bi_v1-rebuild-spec.md §4, §5, §13, §14
   - Hero sparkline (inline SVG)
   - Auto-narrate (X06): render · regenerate · copy-to-slides
   - History Scrubber (X09): drag + keyboard + bi:timechange event
   - Chart.js renderers (colors pulled from CSS vars)
   - ARIA + prefers-reduced-motion respect
   ========================================================== */
(function () {
  'use strict';

  var PREFERS_REDUCED = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Resolve CSS variable value from :root (or any element) */
  function cssVar(name, el) {
    var styles = getComputedStyle(el || document.documentElement);
    return styles.getPropertyValue(name).trim();
  }

  /* Month-diff helper for scrubber */
  function monthsBetween(aISO, bISO) {
    var a = new Date(aISO), b = new Date(bISO);
    return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  }

  /* Format "Apr 23, 2026 (Fri)" */
  var DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function formatDate(iso) {
    var d = new Date(iso);
    return MONTH_NAMES[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' (' + DAY_NAMES[d.getDay()] + ')';
  }

  /* Add days to an ISO date, return new ISO */
  function addDaysISO(iso, delta) {
    var d = new Date(iso);
    d.setDate(d.getDate() + delta);
    return d.toISOString().slice(0, 10);
  }

  /* Clamp */
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.BI_DATA) return;

    /* Global Chart.js defaults */
    if (window.Chart) {
      Chart.defaults.font.family = 'Inter, -apple-system, sans-serif';
      Chart.defaults.font.size = 11;
      Chart.defaults.color = cssVar('--bi-text-muted') || '#7A88A3';
      Chart.defaults.plugins.legend.labels.usePointStyle = true;
      Chart.defaults.plugins.legend.labels.boxWidth = 8;
      Chart.defaults.plugins.legend.labels.padding = 12;
      if (PREFERS_REDUCED) Chart.defaults.animation = false;
    }

    renderHero();
    renderScrubber();
    renderCharts();
    renderHeatmap();
    renderGauge();
    renderFunnel();
    renderCountriesTable();
    bindCardMenus();
  });

  /* --------------------------------------------------------
     HERO — Narrate · MRR · Mini NPS
     -------------------------------------------------------- */
  function renderHero() {
    renderNarrate();
    renderHeroKpi();
    renderHeroMini();

    // Regenerate button
    var regen = document.getElementById('narrate-regenerate');
    if (regen) {
      regen.addEventListener('click', function () {
        renderNarrate(true);
      });
    }

    // Copy to Slides
    var copyBtn = document.getElementById('narrate-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var body = document.getElementById('narrate-body');
        if (!body) return;
        var text = body.innerText || body.textContent || '';
        copyToClipboard(text).then(function (ok) {
          var label = copyBtn.querySelector('.bi-copy-label') || copyBtn;
          var original = label.textContent;
          label.textContent = ok ? 'Copied ✓' : 'Copy failed';
          setTimeout(function () { label.textContent = original; }, 1600);
        });
      });
    }
  }

  function renderNarrate(regenerate) {
    var body = document.getElementById('narrate-body');
    if (!body) return;
    var note = window.getNarrative ? window.getNarrative(BI_DATA.snapshot) : null;
    if (!note) return;

    if (regenerate && !PREFERS_REDUCED) {
      body.style.opacity = '0';
      setTimeout(function () {
        body.innerHTML = note.html;
        body.style.opacity = '1';
      }, 180);
    } else {
      body.innerHTML = note.html;
    }
  }

  function renderHeroKpi() {
    var h = BI_DATA.hero.mrr;
    var valueEl = document.getElementById('hero-mrr-value');
    var deltaEl = document.getElementById('hero-mrr-delta');
    var compareEl = document.getElementById('hero-mrr-compare');
    var progressFill = document.getElementById('hero-mrr-progress-fill');
    var progressVal  = document.getElementById('hero-mrr-progress-val');
    var sparkEl = document.getElementById('hero-mrr-spark');

    if (valueEl)   valueEl.textContent = h.display;
    if (deltaEl)   deltaEl.textContent = (h.deltaDir === 'up' ? '↑ ' : '↓ ') + h.delta.toFixed(1) + '%';
    if (compareEl) compareEl.innerHTML = 'vs <span class="bi-mono">' + h.comparePrev + '</span> last week';
    if (progressFill) progressFill.style.width = h.progressPct + '%';
    if (progressVal)  progressVal.textContent = h.progressPct + '% of $' + (h.target/1000).toFixed(0) + 'K target';

    if (sparkEl) {
      sparkEl.innerHTML = buildSparklineSVG(h.spark, {
        stroke: cssVar('--bi-primary') || '#3D5AF5',
        fillOpacity: 0.18,
        withDots: true
      });
      wireSparklineHover(sparkEl, h.spark);
    }
  }

  function renderHeroMini() {
    var n = BI_DATA.hero.nps;
    var valueEl = document.getElementById('hero-nps-value');
    var gaugeEl = document.getElementById('hero-nps-gauge');
    var promEl  = document.getElementById('hero-nps-prom');
    var detrEl  = document.getElementById('hero-nps-detr');
    if (valueEl) valueEl.textContent = n.value;
    if (promEl)  promEl.textContent  = n.prom;
    if (detrEl)  detrEl.textContent  = n.detr;
    if (gaugeEl) {
      gaugeEl.innerHTML = buildMiniArc(n.value, 100);
    }
  }

  /* --------------------------------------------------------
     Sparkline helpers
     -------------------------------------------------------- */
  function buildSparklineSVG(points, opts) {
    opts = opts || {};
    var W = 280, H = 48;
    var min = Math.min.apply(null, points);
    var max = Math.max.apply(null, points);
    var span = (max - min) || 1;
    var coords = points.map(function (v, i) {
      var x = (i / (points.length - 1)) * W;
      var y = H - ((v - min) / span) * (H - 6) - 3;
      return [x, y];
    });
    var line = coords.map(function (c) { return c[0].toFixed(1) + ',' + c[1].toFixed(1); }).join(' ');
    var area = 'M0,' + H + ' L' + line + ' L' + W + ',' + H + ' Z';
    var stroke = opts.stroke || '#3D5AF5';
    var dots = '';
    if (opts.withDots) {
      coords.forEach(function (c, i) {
        dots += '<circle class="bi-spark-pt" data-idx="' + i + '" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="8" fill="transparent" stroke="transparent"/>';
      });
    }
    return (
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="12-month sparkline">' +
        '<defs><linearGradient id="bi-spark-grad" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="' + stroke + '" stop-opacity="' + (opts.fillOpacity || 0.18) + '"/>' +
          '<stop offset="100%" stop-color="' + stroke + '" stop-opacity="0"/>' +
        '</linearGradient></defs>' +
        '<path d="' + area + '" fill="url(#bi-spark-grad)"/>' +
        '<polyline points="' + line + '" fill="none" stroke="' + stroke + '" stroke-width="1.75" stroke-linejoin="round" stroke-linecap="round"/>' +
        dots +
      '</svg>'
    );
  }

  function wireSparklineHover(container, points) {
    var svg = container.querySelector('svg');
    if (!svg) return;
    var labels = BI_DATA.timeline.labels || [];
    var dots = svg.querySelectorAll('.bi-spark-pt');

    var tip = document.createElement('div');
    tip.className = 'bi-tooltip-inline';
    tip.style.display = 'none';
    tip.innerHTML = '<div class="bi-tooltip-dot"></div><div class="bi-tooltip-card"><span id="tip-label"></span>&nbsp;·&nbsp;<span id="tip-val"></span></div>';
    container.style.position = 'relative';
    container.appendChild(tip);

    dots.forEach(function (dot) {
      dot.style.cursor = 'crosshair';
      dot.addEventListener('mouseenter', function () {
        var idx = parseInt(dot.getAttribute('data-idx'), 10);
        var rect = svg.getBoundingClientRect();
        var cx = parseFloat(dot.getAttribute('cx'));
        var cy = parseFloat(dot.getAttribute('cy'));
        var xPct = (cx / 280) * rect.width;
        var yPct = (cy / 48) * rect.height;
        tip.style.left = xPct + 'px';
        tip.style.top  = yPct + 'px';
        tip.style.display = 'block';
        var lbl = labels[idx] || ('M' + (idx + 1));
        tip.querySelector('#tip-label').textContent = lbl;
        tip.querySelector('#tip-val').textContent = '$' + points[idx] + 'K';
      });
      dot.addEventListener('mouseleave', function () {
        tip.style.display = 'none';
      });
    });
  }

  function buildMiniArc(value, max) {
    var W = 180, H = 90, R = 64, CX = 90, CY = 82, sw = 12;
    var pct = clamp(value / max, 0, 1);
    var angle = pct * 180;
    function pt(r, a) {
      var rad = (a - 180) * Math.PI / 180;
      return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
    }
    function arc(r, start, end) {
      var s = pt(r, start), e = pt(r, end);
      var large = end - start > 180 ? 1 : 0;
      return 'M ' + s.x + ' ' + s.y + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + e.x + ' ' + e.y;
    }
    var tip = pt(R, angle);
    var track = cssVar('--bi-border') || '#E1E6EF';
    var fill  = cssVar('--bi-primary') || '#3D5AF5';
    return (
      '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;max-width:160px;height:auto" role="img" aria-label="NPS semi-circle gauge">' +
        '<path d="' + arc(R, 0, 180) + '" fill="none" stroke="' + track + '" stroke-width="' + sw + '" stroke-linecap="round"/>' +
        '<path d="' + arc(R, 0, angle) + '" fill="none" stroke="' + fill + '" stroke-width="' + sw + '" stroke-linecap="round"/>' +
        '<circle cx="' + tip.x + '" cy="' + tip.y + '" r="5" fill="#fff" stroke="' + fill + '" stroke-width="3"/>' +
      '</svg>'
    );
  }

  /* --------------------------------------------------------
     SCRUBBER (X09)
     -------------------------------------------------------- */
  function renderScrubber() {
    var track = document.getElementById('scrubber-track');
    var handle = document.getElementById('scrubber-handle');
    var progress = document.getElementById('scrubber-progress');
    var dateLabel = document.getElementById('scrubber-date');
    if (!track || !handle || !progress || !dateLabel) return;

    var startISO = BI_DATA.timeline.startISO;
    var endISO   = BI_DATA.timeline.endISO;
    var currentISO = BI_DATA.timeline.todayISO;

    var startTs = Date.parse(startISO);
    var endTs   = Date.parse(endISO);
    var spanDays = Math.floor((endTs - startTs) / 86400000);

    function isoToPct(iso) {
      var t = Date.parse(iso);
      return clamp(((t - startTs) / (endTs - startTs)) * 100, 0, 100);
    }
    function pctToISO(pct) {
      var clamped = clamp(pct, 0, 100);
      var days = Math.round((clamped / 100) * spanDays);
      return addDaysISO(startISO, days);
    }

    function apply(iso) {
      currentISO = iso;
      var pct = isoToPct(iso);
      progress.style.width = pct + '%';
      handle.style.left = pct + '%';
      dateLabel.textContent = formatDate(iso);
      handle.setAttribute('aria-valuenow', String(Math.round(pct)));
      handle.setAttribute('aria-valuetext', formatDate(iso));

      // Day 2: dispatch event for downstream chart listeners
      // Day 3 will wire per-date data recomputation.
      document.dispatchEvent(new CustomEvent('bi:timechange', {
        detail: { dateISO: iso, data: window.getDataAt ? window.getDataAt(iso) : null }
      }));
    }

    // Init
    apply(currentISO);
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');

    // Pointer drag
    var dragging = false;
    function pointerPctFromEvent(e) {
      var rect = track.getBoundingClientRect();
      var clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      return ((clientX - rect.left) / rect.width) * 100;
    }
    function startDrag(e) {
      dragging = true;
      handle.classList.add('is-dragging');
      if (e.target && e.target.setPointerCapture && e.pointerId != null) {
        try { e.target.setPointerCapture(e.pointerId); } catch (_) {}
      }
    }
    function onMove(e) {
      if (!dragging) return;
      e.preventDefault();
      apply(pctToISO(pointerPctFromEvent(e)));
    }
    function endDrag() {
      dragging = false;
      handle.classList.remove('is-dragging');
    }

    handle.addEventListener('pointerdown', startDrag);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);

    // Click on track → jump
    track.parentElement.addEventListener('click', function (e) {
      if (e.target === handle) return;
      apply(pctToISO(pointerPctFromEvent(e)));
    });

    // Double-click → reset
    track.parentElement.addEventListener('dblclick', function () {
      apply(BI_DATA.timeline.todayISO);
    });

    // Keyboard: Left/Right 1d, Shift 7d, Home/End
    handle.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 7 : 1;
      var next = null;
      switch (e.key) {
        case 'ArrowLeft':  next = addDaysISO(currentISO, -step); break;
        case 'ArrowRight': next = addDaysISO(currentISO,  step); break;
        case 'Home':       next = startISO; break;
        case 'End':        next = endISO; break;
        case 'PageDown':   next = addDaysISO(currentISO, -30); break;
        case 'PageUp':     next = addDaysISO(currentISO,  30); break;
        default: return;
      }
      if (!next) return;
      e.preventDefault();
      // Clamp inside range
      var nTs = Date.parse(next);
      if (nTs < startTs) next = startISO;
      if (nTs > endTs)   next = endISO;
      apply(next);
    });

    // Reset button
    var reset = document.getElementById('scrubber-reset');
    if (reset) reset.addEventListener('click', function () { apply(BI_DATA.timeline.todayISO); });
  }

  /* --------------------------------------------------------
     CHARTS (Chart.js-based)
     Colors resolved from CSS vars so accent preset swaps just work.
     -------------------------------------------------------- */
  function renderCharts() {
    var palette = [
      cssVar('--bi-chart-1'), cssVar('--bi-chart-2'), cssVar('--bi-chart-3'), cssVar('--bi-chart-4'),
      cssVar('--bi-chart-5'), cssVar('--bi-chart-6'), cssVar('--bi-chart-7'), cssVar('--bi-chart-8')
    ];
    var primary      = cssVar('--bi-primary')       || '#3D5AF5';
    var borderStrong = cssVar('--bi-border-strong') || '#CDD4E2';
    var textMuted    = cssVar('--bi-text-muted')    || '#7A88A3';
    var grid         = 'rgba(15, 22, 41, 0.05)';

    /* [1] Line — Revenue */
    chartInit('revenueChart', function (ctx) {
      var grad = ctx.createLinearGradient(0, 0, 0, 260);
      grad.addColorStop(0, hexToRgba(primary, 0.22));
      grad.addColorStop(1, hexToRgba(primary, 0));
      return {
        type: 'line',
        data: {
          labels: BI_DATA.revenueTrend.labels,
          datasets: [
            { label: '2026', data: BI_DATA.revenueTrend.current, borderColor: primary, backgroundColor: grad, borderWidth: 2.5, tension: 0.4, fill: true, pointBackgroundColor: '#fff', pointBorderColor: primary, pointBorderWidth: 2, pointRadius: 3 },
            { label: '2025', data: BI_DATA.revenueTrend.previous, borderColor: borderStrong, backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 0, borderDash: [4, 3] }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'top', align: 'end' } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { grid: { color: grid }, ticks: { callback: function (v) { return '$' + v + 'K'; } } }
          }
        }
      };
    }, 'Revenue trend, 12 months, line chart');

    /* [2] Stacked bar — Channels */
    chartInit('channelChart', function () {
      return {
        type: 'bar',
        data: {
          labels: BI_DATA.channelStack.labels,
          datasets: [
            { label: 'Organic', data: BI_DATA.channelStack.organic, backgroundColor: palette[0], borderRadius: 2 },
            { label: 'Paid',    data: BI_DATA.channelStack.paid,    backgroundColor: palette[5], borderRadius: 2 },
            { label: 'Social',  data: BI_DATA.channelStack.social,  backgroundColor: palette[1], borderRadius: 2 },
            { label: 'Direct',  data: BI_DATA.channelStack.direct,  backgroundColor: palette[4], borderRadius: 2 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } },
          scales: {
            x: { stacked: true, grid: { display: false } },
            y: { stacked: true, grid: { color: grid } }
          }
        }
      };
    }, 'Traffic channels stacked bar');

    /* [3] Horizontal stacked — Cohort */
    chartInit('cohortChart', function () {
      return {
        type: 'bar',
        data: {
          labels: BI_DATA.cohortRetention.map(function (c) { return c.cohort; }),
          datasets: [
            { label: 'M1', data: BI_DATA.cohortRetention.map(function (c) { return c.m1; }), backgroundColor: palette[0], borderRadius: 2 },
            { label: 'M2', data: BI_DATA.cohortRetention.map(function (c) { return c.m2; }), backgroundColor: hexToRgba(palette[0], 0.78), borderRadius: 2 },
            { label: 'M3', data: BI_DATA.cohortRetention.map(function (c) { return c.m3; }), backgroundColor: hexToRgba(palette[0], 0.58), borderRadius: 2 },
            { label: 'M4', data: BI_DATA.cohortRetention.map(function (c) { return c.m4; }), backgroundColor: hexToRgba(palette[0], 0.42), borderRadius: 2 },
            { label: 'M5', data: BI_DATA.cohortRetention.map(function (c) { return c.m5; }), backgroundColor: hexToRgba(palette[0], 0.28), borderRadius: 2 },
            { label: 'M6', data: BI_DATA.cohortRetention.map(function (c) { return c.m6; }), backgroundColor: hexToRgba(palette[0], 0.16), borderRadius: 2 }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } },
          scales: {
            x: { grid: { color: grid }, ticks: { callback: function (v) { return v + '%'; } } },
            y: { grid: { display: false } }
          }
        }
      };
    }, 'Cohort retention horizontal stacked bar');

    /* [4] Donut — Device */
    chartInit('deviceChart', function () {
      return {
        type: 'doughnut',
        data: {
          labels: BI_DATA.deviceDonut.labels,
          datasets: [{ data: BI_DATA.deviceDonut.data, backgroundColor: [palette[0], palette[5], palette[1], palette[4]], borderWidth: 0 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          cutout: '68%',
          plugins: { legend: { position: 'right' } }
        }
      };
    }, 'Device share donut');

    /* [5] Pie — Plan */
    chartInit('planChart', function () {
      return {
        type: 'pie',
        data: {
          labels: BI_DATA.planPie.labels,
          datasets: [{ data: BI_DATA.planPie.data, backgroundColor: [cssVar('--bi-border'), palette[0], palette[5], palette[2]], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
      };
    }, 'Plan mix pie');

    /* [6] Area — MAU/WAU/DAU */
    chartInit('activityChart', function (ctx) {
      function g(hex) {
        var gr = ctx.createLinearGradient(0, 0, 0, 260);
        gr.addColorStop(0, hexToRgba(hex, 0.25));
        gr.addColorStop(1, hexToRgba(hex, 0));
        return gr;
      }
      return {
        type: 'line',
        data: {
          labels: BI_DATA.activityArea.labels,
          datasets: [
            { label: 'MAU', data: BI_DATA.activityArea.mau, borderColor: palette[0], backgroundColor: g(palette[0]), borderWidth: 2, tension: 0.3, fill: true, pointRadius: 0 },
            { label: 'WAU', data: BI_DATA.activityArea.wau, borderColor: palette[5], backgroundColor: g(palette[5]), borderWidth: 2, tension: 0.3, fill: true, pointRadius: 0 },
            { label: 'DAU', data: BI_DATA.activityArea.dau, borderColor: palette[1], backgroundColor: g(palette[1]), borderWidth: 2, tension: 0.3, fill: true, pointRadius: 0 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'top', align: 'end' } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 9 } } },
            y: { grid: { color: grid }, ticks: { callback: function (v) { return (v / 1000).toFixed(0) + 'k'; } } }
          }
        }
      };
    }, 'Active users area chart');

    /* [7] Scatter — LTV vs CAC */
    chartInit('scatterChart', function () {
      return {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Channel',
            data: BI_DATA.ltvScatter.map(function (p) { return { x: p.x, y: p.y, r: p.size, label: p.label }; }),
            backgroundColor: hexToRgba(primary, 0.55),
            borderColor: primary,
            pointRadius: function (c) { var d = c.raw; return d && d.r ? d.r : 6; }
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: function (c) { return c.raw.label + ' — CAC $' + c.raw.x + ', LTV $' + c.raw.y; } } }
          },
          scales: {
            x: { title: { display: true, text: 'CAC ($)', font: { size: 10 }, color: textMuted }, grid: { color: grid } },
            y: { title: { display: true, text: 'LTV ($)', font: { size: 10 }, color: textMuted }, grid: { color: grid } }
          }
        }
      };
    }, 'LTV vs CAC scatter');

    // Re-render on scrubber change (Day 2: dataset identity unchanged,
    // Day 3 will pass snapshot to getDataAt(iso) and update charts)
    document.addEventListener('bi:timechange', function (e) {
      // Scaffold hook — intentionally light. Day 3 will swap datasets here.
      if (window.__BI_CHART_INSTANCES && e.detail && e.detail.data) {
        // no-op Day 2
      }
    });
  }

  function chartInit(id, cfgFn, ariaLabel) {
    var el = document.getElementById(id);
    if (!el || !window.Chart) return;
    if (ariaLabel) {
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', ariaLabel);
    }
    var ctx = el.getContext('2d');
    var cfg = cfgFn(ctx);
    if (PREFERS_REDUCED) {
      cfg.options = cfg.options || {};
      cfg.options.animation = false;
    }
    var inst = new Chart(ctx, cfg);
    window.__BI_CHART_INSTANCES = window.__BI_CHART_INSTANCES || {};
    window.__BI_CHART_INSTANCES[id] = inst;
  }

  /* --------------------------------------------------------
     HEATMAP (SVG-less HTML grid)
     -------------------------------------------------------- */
  function renderHeatmap() {
    var el = document.getElementById('heatmap');
    if (!el) return;
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'Activity heatmap, 7 days by 24 hours');
    var H = BI_DATA.heatmap;
    var header = '<div></div>';
    for (var h = 0; h < 24; h++) {
      header += '<div class="bi-heat-col-label">' + (h % 3 === 0 ? h : '') + '</div>';
    }
    var rows = H.map(function (row) {
      var cells = row.values.map(function (v, h) {
        return '<div class="bi-heat-cell bi-heat-' + v + '" title="' + row.day + ' ' + h + ':00 — level ' + v + '"></div>';
      }).join('');
      return '<div class="bi-heat-row-label">' + row.day + '</div>' + cells;
    }).join('');
    el.innerHTML = header + rows;
  }

  /* --------------------------------------------------------
     GAUGE (large · NPS card)
     -------------------------------------------------------- */
  function renderGauge() {
    var el = document.getElementById('gauge');
    if (!el) return;
    var g = BI_DATA.gauge;
    var angle = (g.value / g.max) * 180;
    var R = 80, CX = 100, CY = 95;
    function pt(r, a) {
      var rad = (a - 180) * Math.PI / 180;
      return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
    }
    function arc(r, start, end) {
      var s = pt(r, start), e = pt(r, end);
      var large = end - start > 180 ? 1 : 0;
      return 'M ' + s.x + ' ' + s.y + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + e.x + ' ' + e.y;
    }
    var track = cssVar('--bi-border') || '#E1E6EF';
    var fill = cssVar('--bi-primary') || '#3D5AF5';
    el.innerHTML =
      '<div class="bi-gauge">' +
        '<svg viewBox="0 0 200 120" class="bi-gauge-svg" role="img" aria-label="NPS gauge ' + g.value + ' of ' + g.max + '">' +
          '<path d="' + arc(R, 0, 180) + '" fill="none" stroke="' + track + '" stroke-width="14" stroke-linecap="round"/>' +
          '<path d="' + arc(R, 0, angle) + '" fill="none" stroke="' + fill + '" stroke-width="14" stroke-linecap="round"/>' +
          '<circle cx="' + pt(R, angle).x + '" cy="' + pt(R, angle).y + '" r="6" fill="#fff" stroke="' + fill + '" stroke-width="3"/>' +
        '</svg>' +
        '<div class="bi-gauge-value">' + g.value + '</div>' +
        '<div class="bi-gauge-label">' + g.label + '</div>' +
      '</div>';
  }

  /* --------------------------------------------------------
     FUNNEL
     -------------------------------------------------------- */
  function renderFunnel() {
    var funnel = document.getElementById('funnel');
    if (!funnel) return;
    funnel.setAttribute('role', 'img');
    funnel.setAttribute('aria-label', 'Conversion funnel');
    var maxCount = BI_DATA.funnel[0].count;
    funnel.innerHTML = BI_DATA.funnel.map(function (f) {
      var w = (f.count / maxCount) * 100;
      return '<div class="bi-funnel-row">' +
        '<div class="bi-funnel-lbl">' + f.label + '</div>' +
        '<div class="bi-funnel-bar-wrap"><div class="bi-funnel-bar" style="width:' + w + '%">' + f.count.toLocaleString() + '</div></div>' +
        '<div class="bi-funnel-rate">' + f.pct + '%</div>' +
        '</div>';
    }).join('');
  }

  /* --------------------------------------------------------
     TABLE — Top Countries
     -------------------------------------------------------- */
  function renderCountriesTable() {
    var tc = document.getElementById('topCountries');
    if (!tc) return;
    tc.innerHTML = BI_DATA.topCountries.map(function (c, i) {
      var rank = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      return '<tr>' +
        '<td><span class="bi-rank ' + rank + '">' + (i + 1) + '</span></td>' +
        '<td><strong>' + c.name + '</strong></td>' +
        '<td class="num">' + c.users.toLocaleString() + '</td>' +
        '<td class="num">' + c.rev + '</td>' +
        '<td><span class="bi-badge green">' + c.growth + '</span></td>' +
        '</tr>';
    }).join('');
  }

  /* --------------------------------------------------------
     Card menu (stub)
     -------------------------------------------------------- */
  function bindCardMenus() {
    document.querySelectorAll('.bi-card-menu').forEach(function (btn) {
      if (!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label', 'Card options');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        // Day 2: stub. Day γ: open context menu (Save, Export PNG, Fullscreen).
      });
    });
  }

  /* --------------------------------------------------------
     Utilities
     -------------------------------------------------------- */
  function hexToRgba(hex, alpha) {
    if (!hex) return 'rgba(61, 90, 245, ' + alpha + ')';
    hex = hex.trim().replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(hex, 16);
    if (isNaN(n)) return 'rgba(61, 90, 245, ' + alpha + ')';
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallback(); });
    }
    return Promise.resolve(fallback());
    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (_) { return false; }
    }
  }

})();
