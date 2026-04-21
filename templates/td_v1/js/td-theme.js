/* Trading Terminal — Rendering + 7 Chart Types */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.TD_DATA) return;
  var D = TD_DATA;

  // === 상단 티커 스트림 ===
  var stream = document.getElementById('tickerStream');
  if (stream) {
    var html = D.ticker.map(function (t) {
      return '<span class="td-ticker-item"><span class="td-ticker-symbol">' + t.sym + '</span>'
        + '<span class="td-ticker-price">' + t.price + '</span>'
        + '<span class="td-ticker-change ' + t.dir + '">' + t.chg + '</span></span>';
    }).join('');
    stream.innerHTML = html + html; // 루프용 2번 반복
  }

  // === 심볼 헤더 ===
  var s = D.symbol;
  var dir = s.change >= 0 ? 'up' : 'down';
  var arrow = s.change >= 0 ? '▲' : '▼';
  var headName = document.getElementById('symName');
  var headEx   = document.getElementById('symEx');
  var bigPrice = document.getElementById('symBig');
  var bigChg   = document.getElementById('symChg');
  if (headName) headName.textContent = s.name;
  if (headEx)   headEx.textContent   = s.exchange;
  if (bigPrice) { bigPrice.textContent = s.price.toLocaleString(); bigPrice.className = 'td-sym-big td-mono ' + dir; }
  if (bigChg)   { bigChg.textContent = arrow + ' ' + Math.abs(s.change).toFixed(2) + '  (' + s.changePct.toFixed(2) + '%)'; bigChg.className = 'td-sym-chg td-mono ' + dir; }

  // 심볼 stats
  var statsEl = document.getElementById('symStats');
  if (statsEl) {
    var st = D.stats;
    statsEl.innerHTML = ''
      + '<span>Bid <strong class="td-mono">' + st.bid + '</strong></span>'
      + '<span>Ask <strong class="td-mono">' + st.ask + '</strong></span>'
      + '<span>24h Vol <strong class="td-mono">' + st.vol24h + '</strong></span>'
      + '<span>24h High <strong class="td-mono">' + st.high24h + '</strong></span>'
      + '<span>24h Low <strong class="td-mono">' + st.low24h + '</strong></span>'
      + '<span>Mkt Cap <strong class="td-mono">' + st.marketCap + '</strong></span>';
  }

  // === 워치리스트 (sparkline) ===
  var wlEl = document.getElementById('watchlist');
  if (wlEl) {
    wlEl.innerHTML = D.watchlist.map(function (w, i) {
      var active = i === 0 ? ' active' : '';
      return '<div class="td-watch-item' + active + '">'
        + '<div class="td-watch-sym">' + w.sym + '</div>'
        + '<div class="td-watch-price td-mono">' + w.price + '</div>'
        + '<div class="td-watch-change td-mono ' + w.dir + '">' + w.chg + '</div>'
        + '<div class="td-watch-spark" id="wl-spark-' + i + '"></div>'
        + '</div>';
    }).join('');

    // 스파크라인 SVG 렌더
    D.watchlist.forEach(function (w, i) {
      var el = document.getElementById('wl-spark-' + i);
      if (!el) return;
      var pts = w.spark;
      var min = Math.min.apply(null, pts), max = Math.max.apply(null, pts);
      var range = max - min || 1;
      var w0 = 180, h0 = 18;
      var stroke = w.dir === 'up' ? '#22C55E' : '#EF4444';
      var points = pts.map(function (v, idx) {
        var x = (idx / (pts.length - 1)) * w0;
        var y = h0 - ((v - min) / range) * h0;
        return x + ',' + y;
      }).join(' ');
      el.innerHTML = '<svg viewBox="0 0 ' + w0 + ' ' + h0 + '" style="width:100%;height:100%;display:block">'
        + '<polyline fill="none" stroke="' + stroke + '" stroke-width="1.25" points="' + points + '"/>'
        + '</svg>';
    });
  }

  // === [1] 캔들스틱 + 볼륨 (SVG 직접) ===
  renderCandles();

  // === [2] Depth 차트 (area) ===
  renderDepth();

  // === [3] Volume Profile (horizontal bar) ===
  renderVolumeProfile();

  // === [4] 오더북 ===
  renderOrderbook();

  // === [5] 포지션 테이블 ===
  renderPositions();

  // === [6] 뉴스 피드 ===
  renderNews();
});

function renderCandles() {
  var el = document.getElementById('candleChart');
  if (!el) return;
  var C = TD_DATA.candles;
  var W = 900, H = 320, VH = 60, GAP = 6;
  var cnt = C.length;
  var allH = C.map(function(c){return c.h;});
  var allL = C.map(function(c){return c.l;});
  var max = Math.max.apply(null, allH), min = Math.min.apply(null, allL);
  var range = max - min;
  var pad = range * 0.05;
  max += pad; min -= pad; range = max - min;
  var barW = (W - (cnt - 1) * 2) / cnt - 1;

  function y(v) { return ((max - v) / range) * (H - VH - 10) + 5; }

  // 배경 그리드 + y 라벨
  var gridLines = '';
  for (var i = 1; i <= 4; i++) {
    var yy = ((H - VH - 10) / 4) * i + 5;
    var price = (max - ((max - min) / 4) * i).toFixed(0);
    gridLines += '<line x1="0" y1="' + yy + '" x2="' + W + '" y2="' + yy + '" stroke="#1E2736" stroke-dasharray="2,4"/>';
    gridLines += '<text x="' + (W - 4) + '" y="' + (yy - 2) + '" text-anchor="end" fill="#5F6B80" font-family="JetBrains Mono,monospace" font-size="9">' + Number(price).toLocaleString() + '</text>';
  }

  // 캔들 + 볼륨
  var candles = '';
  var maxV = Math.max.apply(null, C.map(function(c){return c.v;}));
  C.forEach(function (c, i) {
    var x = i * (barW + 2);
    var up = c.c >= c.o;
    var color = up ? '#22C55E' : '#EF4444';
    // wick
    candles += '<line x1="' + (x + barW / 2) + '" y1="' + y(c.h) + '" x2="' + (x + barW / 2) + '" y2="' + y(c.l) + '" stroke="' + color + '" stroke-width="1"/>';
    // body
    var bodyY = y(up ? c.c : c.o);
    var bodyH = Math.max(1, Math.abs(y(c.o) - y(c.c)));
    candles += '<rect x="' + x + '" y="' + bodyY + '" width="' + Math.max(1, barW) + '" height="' + bodyH + '" fill="' + color + '"/>';
    // volume bar (하단)
    var vh = (c.v / maxV) * (VH - 6);
    candles += '<rect x="' + x + '" y="' + (H - vh) + '" width="' + Math.max(1, barW) + '" height="' + vh + '" fill="' + color + '" opacity="0.4"/>';
  });

  // Volume 영역 라벨
  var volLabel = '<line x1="0" y1="' + (H - VH) + '" x2="' + W + '" y2="' + (H - VH) + '" stroke="#2B3548"/>'
    + '<text x="6" y="' + (H - VH + 12) + '" fill="#5F6B80" font-family="JetBrains Mono,monospace" font-size="9" letter-spacing="0.1em">VOLUME</text>';

  el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:100%;display:block" preserveAspectRatio="none">'
    + gridLines + volLabel + candles
    + '</svg>';
}

function renderDepth() {
  var el = document.getElementById('depthChart');
  if (!el) return;
  var D = TD_DATA.depth;
  var W = 400, H = 120;
  var allC = D.bids.map(function(d){return d.c;}).concat(D.asks.map(function(d){return d.c;}));
  var maxC = Math.max.apply(null, allC);

  // bids — 오름차순(가격 낮은 쪽부터), cumulative 감소로 그려야 함 역순
  var bids = D.bids.slice().reverse();
  var asks = D.asks;

  function buildPath(arr, side) {
    var half = W / 2;
    var n = arr.length;
    var pts = arr.map(function (d, i) {
      var x = side === 'bid' ? half - ((n - 1 - i) / (n - 1)) * half : half + (i / (n - 1)) * half;
      var y = H - (d.c / maxC) * (H - 8) - 4;
      return x + ',' + y;
    });
    var first = side === 'bid' ? '0,' + H : W + ',' + H;
    var last  = side === 'bid' ? half + ',' + H : half + ',' + H;
    return 'M' + first + ' L' + pts.join(' L') + ' L' + last + ' Z';
  }

  var bidFill = 'rgba(34,197,94,0.3)', bidStroke = '#22C55E';
  var askFill = 'rgba(239,68,68,0.3)', askStroke = '#EF4444';

  el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:100%;display:block" preserveAspectRatio="none">'
    + '<line x1="' + W/2 + '" y1="0" x2="' + W/2 + '" y2="' + H + '" stroke="#2B3548" stroke-dasharray="2,3"/>'
    + '<path d="' + buildPath(bids, 'bid') + '" fill="' + bidFill + '" stroke="' + bidStroke + '" stroke-width="1.5"/>'
    + '<path d="' + buildPath(asks, 'ask') + '" fill="' + askFill + '" stroke="' + askStroke + '" stroke-width="1.5"/>'
    + '<text x="10" y="14" fill="#22C55E" font-family="Inter" font-weight="700" font-size="10" letter-spacing="0.15em">BIDS</text>'
    + '<text x="' + (W - 10) + '" y="14" text-anchor="end" fill="#EF4444" font-family="Inter" font-weight="700" font-size="10" letter-spacing="0.15em">ASKS</text>'
    + '</svg>';
}

function renderVolumeProfile() {
  var el = document.getElementById('volProfile');
  if (!el) return;
  // 캔들 가격대별 볼륨 집계 (12개 버킷)
  var C = TD_DATA.candles;
  var lows = C.map(function(c){return c.l;});
  var highs = C.map(function(c){return c.h;});
  var min = Math.min.apply(null, lows), max = Math.max.apply(null, highs);
  var buckets = 12;
  var step = (max - min) / buckets;
  var vols = new Array(buckets).fill(0);
  C.forEach(function (c) {
    var mid = (c.h + c.l) / 2;
    var idx = Math.min(buckets - 1, Math.floor((mid - min) / step));
    vols[idx] += c.v;
  });
  var maxV = Math.max.apply(null, vols);

  // 수평 바
  var W = 400, H = 120, rowH = H / buckets;
  var bars = vols.map(function (v, i) {
    var w = (v / maxV) * (W - 80);
    var y = H - (i + 1) * rowH + 2;
    var price = (min + step * (i + 0.5)).toFixed(0);
    var hot = v === maxV;
    return '<rect x="0" y="' + y + '" width="' + w + '" height="' + (rowH - 3) + '" fill="' + (hot ? '#FF7A00' : '#06B6D4') + '" opacity="' + (hot ? 0.9 : 0.5) + '"/>'
      + '<text x="' + (W - 6) + '" y="' + (y + rowH - 5) + '" text-anchor="end" fill="#5F6B80" font-family="JetBrains Mono,monospace" font-size="9">' + Number(price).toLocaleString() + '</text>';
  }).join('');

  el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:100%;display:block" preserveAspectRatio="none">' + bars + '</svg>';
}

function renderOrderbook() {
  var el = document.getElementById('orderbook');
  if (!el) return;
  var O = TD_DATA.orderbook;
  var maxQ = Math.max.apply(null, O.asks.concat(O.bids).map(function(x){return x.q;}));

  var head = '<div class="td-ob-head"><span>Price</span><span class="q" style="text-align:right">Size</span><span class="t" style="text-align:right">Total</span></div>';
  var asks = O.asks.slice().reverse().map(function (r) {
    var fill = Math.round((r.q / maxQ) * 100);
    return '<div class="td-ob-row sell" style="--fill:' + fill + '%">'
      + '<span class="p td-mono">' + r.p.toFixed(2) + '</span>'
      + '<span class="q td-mono">' + r.q.toFixed(4) + '</span>'
      + '<span class="t td-mono">' + r.t.toLocaleString() + '</span>'
      + '</div>';
  }).join('');
  var spread = '<div class="td-ob-spread td-mono">' + O.spread.toFixed(2)
    + '<div class="td-ob-spread-sub">Spread · ' + ((O.spread / TD_DATA.symbol.price) * 10000).toFixed(1) + ' bps</div></div>';
  var bids = O.bids.map(function (r) {
    var fill = Math.round((r.q / maxQ) * 100);
    return '<div class="td-ob-row buy" style="--fill:' + fill + '%">'
      + '<span class="p td-mono">' + r.p.toFixed(2) + '</span>'
      + '<span class="q td-mono">' + r.q.toFixed(4) + '</span>'
      + '<span class="t td-mono">' + r.t.toLocaleString() + '</span>'
      + '</div>';
  }).join('');

  el.innerHTML = head + asks + spread + bids;
}

function renderPositions() {
  var el = document.getElementById('positionsBody');
  if (!el) return;
  el.innerHTML = TD_DATA.positions.map(function (p) {
    var pnlCls = p.pnl >= 0 ? 'up' : 'down';
    var arrow = p.pnl >= 0 ? '+' : '';
    return '<tr>'
      + '<td><strong>' + p.sym + '</strong></td>'
      + '<td><span class="td-side ' + p.side + '">' + p.side + '</span></td>'
      + '<td class="num">' + p.qty + '</td>'
      + '<td class="num">' + p.entry + '</td>'
      + '<td class="num">' + p.mark + '</td>'
      + '<td class="num td-pnl ' + pnlCls + '">' + arrow + p.pnl.toFixed(2) + '</td>'
      + '<td class="num td-pnl ' + pnlCls + '">' + arrow + p.pnlPct.toFixed(2) + '%</td>'
      + '</tr>';
  }).join('');
}

function renderNews() {
  var el = document.getElementById('newsFeed');
  if (!el) return;
  el.innerHTML = TD_DATA.news.map(function (n) {
    var sentLabel = n.sent === 'pos' ? 'BULLISH' : n.sent === 'neg' ? 'BEARISH' : 'NEUTRAL';
    return '<div class="td-news-item">'
      + '<div class="td-news-meta"><span class="src">' + n.src + '</span>'
      + '<span>' + n.time + ' ago</span>'
      + '<span class="td-news-sent ' + n.sent + '">' + sentLabel + '</span></div>'
      + '<div class="td-news-title">' + n.title + '</div>'
      + '</div>';
  }).join('');
}
