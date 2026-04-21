/* ======================================================
   Maison Finance (lx_v1) — Sample Data
   ====================================================== */
var LX_DATA = {
  hero: {
    label: 'Total Assets Under Management',
    value: '$4,284,600',
    sub: 'Compounded growth of 12.4% year-to-date across five asset classes. Risk-adjusted return ranked top quartile among private wealth accounts.'
  },
  kpi: [
    { label: 'YTD Return', value: '+12.4%',  trend: 'Benchmark +8.2%' },
    { label: 'Risk Score', value: '6.2/10',  trend: 'Moderate · Balanced' },
    { label: 'Monthly Alpha', value: '+1.8%', trend: 'vs S&P 500' },
    { label: 'Liquidity',   value: '$428K',  trend: '10% of portfolio' }
  ],
  allocation: [
    { class: 'Equities',        amount: '$1,713,840', pct: '40.0%', ytd: '+14.2%', badge: 'success' },
    { class: 'Fixed Income',    amount: '$1,285,380', pct: '30.0%', ytd: '+4.8%',  badge: 'gold' },
    { class: 'Real Estate',     amount: '$642,690',   pct: '15.0%', ytd: '+9.1%',  badge: 'success' },
    { class: 'Alternatives',    amount: '$428,460',   pct: '10.0%', ytd: '+18.6%', badge: 'success' },
    { class: 'Cash & Equivalents', amount: '$214,230', pct: '5.0%', ytd: '+2.4%',  badge: 'gold' }
  ],
  transactions: [
    { date: 'Apr 20', type: 'BUY',       asset: 'AAPL · Apple Inc.',           amount: '$24,800' },
    { date: 'Apr 19', type: 'DIVIDEND',  asset: 'MSFT · Quarterly Dividend',   amount: '$1,460' },
    { date: 'Apr 18', type: 'REBALANCE', asset: 'Fixed Income Ladder',          amount: '$120,000' },
    { date: 'Apr 16', type: 'SELL',      asset: 'TSLA · Partial Exit',          amount: '$68,400' },
    { date: 'Apr 14', type: 'DEPOSIT',   asset: 'Capital Contribution',         amount: '$250,000' },
    { date: 'Apr 12', type: 'DIVIDEND',  asset: 'VTI · ETF Quarterly',          amount: '$3,240' }
  ]
};
