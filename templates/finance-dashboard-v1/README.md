# Finance Dashboard v1 — Claymorphism

Personal finance dashboard with a clay/3D aesthetic. 5 pages, Chart.js 4, pure CSS variables.

## Quick Start

1. Open `index.html` in your browser
2. No build step needed — works immediately

## Customization

### Change colors
Edit `css/fin-tokens.css` — swap accent presets by uncommenting Blue or Coral blocks.

### Change data
Edit `js/data.js` — all KPIs, transactions, charts, and budgets pull from `FIN_DATA`.

### Key CSS variables
```css
--fin-primary: #00B894;      /* Main accent */
--fin-sub: #FDCB6E;          /* Secondary accent */
--fin-bg-base: #F0F4F3;      /* Page background */
--fin-bg-surface: #FFFFFF;   /* Card background */
```

## Pages

| File | Content |
|------|---------|
| `index.html` | Overview — KPIs, income/expense chart, recent transactions, budget progress |
| `transactions.html` | Full transaction list with filters |
| `portfolio.html` | Investment portfolio — performance chart, allocation donut, holdings |
| `budget.html` | Budget vs actual chart, category budgets with progress bars |
| `reports.html` | Annual summary, monthly trend, category breakdown |

## Structure

```
css/fin-tokens.css    — Design tokens (colors, spacing, shadows)
css/fin-dashboard.css — All component styles
js/data.js            — Sample data (edit this)
js/fin-dashboard.js   — Chart defaults + interactions
```

## Clay utility classes

- `.clay-card` — Raised card with inner highlight
- `.clay-btn` — Gradient button with clay shadow
- `.clay-inset` — Sunken/recessed surface
- `.clay-btn-outline` — Outline variant
- `.clay-btn-sm` — Small button

## Dependencies

- [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts CDN)
- [Chart.js 4](https://www.chartjs.org/) (CDN)

## Browser Support

Chrome, Firefox, Safari, Edge (latest 2 versions)

## License

Part of MergeUi subscription.
