/* ======================================================
   Neon Market (bd_v1) — Sample Data
   ====================================================== */
var BD_DATA = {
  hero: { label: 'Today · April 21', title: 'Electric Sales', sub: 'DTC neon brand hit $24.6K today — up 38% vs last Tuesday. Pink Edition is 3x bestseller of the month.' },
  kpi: [
    { label: 'Revenue Today', value: '$24,600', color: 'pink', trend: '↑ 38.2%' },
    { label: 'Orders', value: '412',     color: 'mint',   trend: '↑ 18 since noon' },
    { label: 'AOV',    value: '$59.7',   color: 'yellow', trend: '↑ $3.4' },
    { label: 'Conv.',  value: '4.82%',   color: 'pink',   trend: '↑ 0.4pp' }
  ],
  products: [
    { name: 'Glow Hoodie · Pink Edition', price: '$84', thumb: 'GH', alt: '' },
    { name: 'Neon Tee / Volt',            price: '$42', thumb: 'NT', alt: 'alt-1', hot: true },
    { name: 'Sunset Cap',                 price: '$36', thumb: 'SC', alt: 'alt-2' },
    { name: 'Electric Tote',              price: '$28', thumb: 'ET', alt: 'alt-3' }
  ],
  orders: [
    { id: '#NM-2084', customer: 'Zoe R.',    items: 2, total: '$126', status: 'paid' },
    { id: '#NM-2083', customer: 'Luis A.',   items: 1, total: '$84',  status: 'paid' },
    { id: '#NM-2082', customer: 'Mira T.',   items: 3, total: '$182', status: 'pending' },
    { id: '#NM-2081', customer: 'Kai L.',    items: 1, total: '$36',  status: 'paid' },
    { id: '#NM-2080', customer: 'Noa S.',    items: 2, total: '$112', status: 'refund' },
    { id: '#NM-2079', customer: 'Ivy M.',    items: 4, total: '$240', status: 'paid' }
  ]
};
