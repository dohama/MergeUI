# E-Commerce Admin v1 - ShopDesk

Glassmorphism e-commerce admin dashboard template.

## Quick Start

1. Open `index.html` in a browser
2. Navigate between pages using the top navigation
3. All pages work standalone with no build step required

## Pages

| File | Description |
|------|-------------|
| `index.html` | Overview - KPI cards, revenue chart, top products, recent orders |
| `orders.html` | Order management - table with status filters and search |
| `products.html` | Product catalog - card grid with category filters |
| `customers.html` | Customer list - table with search |
| `analytics.html` | Analytics - revenue trend, category/region breakdown, charts |

## Customization

### Colors

Edit `css/ec-tokens.css` to change brand colors:

```css
--ec-coral: #FF6B6B;   /* Main accent */
--ec-orange: #FFA502;  /* Secondary */
--ec-mint: #2ED573;    /* Success/tertiary */
```

### Data

Edit `js/data.js` to change all dummy data (KPI values, orders, products, customers, chart data). The HTML pages automatically bind to `EC_DATA`.

### Glass Effect

Adjust glass intensity in `css/ec-tokens.css`:

```css
--ec-bg-surface: rgba(255, 255, 255, 0.06);  /* Card opacity */
--ec-glass-blur: blur(20px);                  /* Blur amount */
--ec-glass-border: rgba(255, 255, 255, 0.12); /* Border opacity */
```

## Dependencies

- **DM Sans** (Google Fonts) - loaded via CDN
- **Chart.js 4** - loaded via CDN (only on pages with charts)

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions). Backdrop-filter requires modern browsers.

## Responsive Breakpoints

- Desktop: 1280px+
- Tablet: 768px - 1279px
- Mobile: below 767px (hamburger menu + bottom navigation)
