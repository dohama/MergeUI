/* ======================================================
   Trading Terminal (td_v1) — Desk Data
   ====================================================== */

// 캔들스틱 30개 생성 (가짜 랜덤워크)
function tdGenCandles() {
  var candles = []; var price = 42800;
  for (var i = 0; i < 50; i++) {
    var open = price;
    var change = (Math.random() - 0.48) * 420;
    var close = Math.max(38000, open + change);
    var hi = Math.max(open, close) + Math.random() * 180;
    var lo = Math.min(open, close) - Math.random() * 180;
    candles.push({ o: +open.toFixed(2), h: +hi.toFixed(2), l: +lo.toFixed(2), c: +close.toFixed(2), v: Math.round(800 + Math.random() * 2400) });
    price = close;
  }
  return candles;
}

var TD_DATA = {
  symbol: { name: 'BTC/USD', exchange: 'COINBASE', price: 43187.20, change: 482.60, changePct: 1.13 },
  ticker: [
    { sym: 'BTC/USD', price: '43,187.20', chg: '+1.13%', dir: 'up' },
    { sym: 'ETH/USD', price: '2,384.50',  chg: '+0.84%', dir: 'up' },
    { sym: 'AAPL',    price: '184.62',    chg: '-0.32%', dir: 'down' },
    { sym: 'TSLA',    price: '242.18',    chg: '+2.41%', dir: 'up' },
    { sym: 'NVDA',    price: '874.30',    chg: '+3.82%', dir: 'up' },
    { sym: 'SPY',     price: '518.42',    chg: '-0.12%', dir: 'down' },
    { sym: 'QQQ',     price: '438.91',    chg: '+0.22%', dir: 'up' },
    { sym: 'GOLD',    price: '2,341.40',  chg: '-0.44%', dir: 'down' },
    { sym: 'USD/KRW', price: '1,382.50',  chg: '+0.18%', dir: 'up' },
    { sym: 'EUR/USD', price: '1.0842',    chg: '-0.08%', dir: 'down' }
  ],
  watchlist: [
    { sym: 'BTC/USD', price: '43,187.20', chg: '+1.13%', dir: 'up',   spark: [100,102,99,104,106,104,108,111,114,112,115,118] },
    { sym: 'ETH/USD', price: '2,384.50',  chg: '+0.84%', dir: 'up',   spark: [100,99,101,103,102,104,106,105,108,110,109,112] },
    { sym: 'SOL/USD', price: '134.82',    chg: '+4.21%', dir: 'up',   spark: [100,101,103,108,112,116,120,124,121,126,130,132] },
    { sym: 'DOGE',    price: '0.1842',    chg: '-2.14%', dir: 'down', spark: [100,102,101,99,96,95,93,95,94,92,90,88] },
    { sym: 'AAPL',    price: '184.62',    chg: '-0.32%', dir: 'down', spark: [100,101,100,99,100,98,97,98,99,98,97,99] },
    { sym: 'TSLA',    price: '242.18',    chg: '+2.41%', dir: 'up',   spark: [100,98,96,99,102,104,103,106,108,107,110,112] },
    { sym: 'NVDA',    price: '874.30',    chg: '+3.82%', dir: 'up',   spark: [100,102,104,106,108,112,114,116,118,120,122,125] },
    { sym: 'META',    price: '508.14',    chg: '+0.92%', dir: 'up',   spark: [100,101,102,101,103,104,105,106,107,108,108,109] },
    { sym: 'AMZN',    price: '184.92',    chg: '-0.21%', dir: 'down', spark: [100,101,100,99,100,99,98,99,100,99,98,99] },
    { sym: 'MSFT',    price: '416.84',    chg: '+0.41%', dir: 'up',   spark: [100,100,101,101,102,101,102,103,103,102,103,104] }
  ],
  stats: { bid: '43,186.10', ask: '43,188.30', vol24h: '8.41B', high24h: '43,482.00', low24h: '42,516.30', marketCap: '847.2B' },
  candles: tdGenCandles(),
  depth: {
    bids: [
      { p: 43186, c: 12.4 }, { p: 43180, c: 30.1 }, { p: 43175, c: 62.8 }, { p: 43170, c: 108.5 },
      { p: 43165, c: 168.3 }, { p: 43160, c: 245.0 }, { p: 43155, c: 342.7 }, { p: 43150, c: 462.8 },
      { p: 43145, c: 610.4 }, { p: 43140, c: 784.2 }
    ],
    asks: [
      { p: 43190, c: 14.2 }, { p: 43195, c: 38.5 }, { p: 43200, c: 72.6 }, { p: 43205, c: 124.8 },
      { p: 43210, c: 188.4 }, { p: 43215, c: 270.6 }, { p: 43220, c: 374.5 }, { p: 43225, c: 502.8 },
      { p: 43230, c: 660.2 }, { p: 43235, c: 848.6 }
    ]
  },
  orderbook: {
    asks: [
      { p: 43192.40, q: 0.2418, t: 10440 },
      { p: 43191.20, q: 0.3840, t: 16591 },
      { p: 43190.50, q: 1.2062, t: 52129 },
      { p: 43189.80, q: 0.8541, t: 36889 },
      { p: 43189.10, q: 0.1204, t: 5202  },
      { p: 43188.60, q: 2.4082, t: 103994 },
      { p: 43188.30, q: 0.5720, t: 24709 }
    ],
    bids: [
      { p: 43186.10, q: 0.9402, t: 40605 },
      { p: 43185.40, q: 1.8204, t: 78609 },
      { p: 43184.80, q: 0.3118, t: 13465 },
      { p: 43184.20, q: 2.0512, t: 88577 },
      { p: 43183.60, q: 0.5048, t: 21802 },
      { p: 43183.00, q: 1.3421, t: 57967 },
      { p: 43182.10, q: 0.7209, t: 31141 }
    ],
    spread: 2.20
  },
  positions: [
    { sym: 'BTC/USD', side: 'L', qty: 0.5, entry: '42,108.00', mark: '43,187.20', pnl: 539.60, pnlPct: 1.28 },
    { sym: 'ETH/USD', side: 'L', qty: 4.0, entry: '2,412.50',  mark: '2,384.50',  pnl: -112.00, pnlPct: -1.16 },
    { sym: 'NVDA',    side: 'L', qty: 12,  entry: '812.40',     mark: '874.30',    pnl: 742.80, pnlPct: 7.62 },
    { sym: 'TSLA',    side: 'S', qty: 20,  entry: '238.10',     mark: '242.18',    pnl: -81.60, pnlPct: -1.71 },
    { sym: 'SOL/USD', side: 'L', qty: 40,  entry: '128.40',     mark: '134.82',    pnl: 256.80, pnlPct: 5.00 }
  ],
  news: [
    { src: 'Bloomberg', time: '2m', sent: 'pos', title: 'Spot Bitcoin ETF inflows cross $1B in single day — largest since January' },
    { src: 'Reuters',   time: '18m', sent: 'neu', title: 'Fed minutes signal no rate cuts before Q3 2026, markets unchanged' },
    { src: 'CoinDesk',  time: '42m', sent: 'pos', title: 'SEC approves spot Ethereum ETF applications from 3 asset managers' },
    { src: 'WSJ',       time: '1h',  sent: 'neg', title: 'Tesla Q1 delivery miss: 382K vs estimate 452K, stock down in pre-market' },
    { src: 'CNBC',      time: '2h',  sent: 'pos', title: 'NVIDIA data center revenue up 200% YoY — AI demand remains strong' },
    { src: 'Bloomberg', time: '3h',  sent: 'neu', title: 'Japan yen hits 34-year low vs USD, BOJ intervention watch intensifies' }
  ]
};
