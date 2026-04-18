# SoftDesk v1 — Neumorphism Dashboard Template

Production-ready SaaS admin dashboard with soft neumorphic design.

## Quick Start

1. Download and unzip
2. Open `index.html` in your browser
3. Done — no build tools, no dependencies

## Customization

### Change Colors (1 file)

Open `css/softdesk-tokens.css` and modify the color variables:

```css
--sd-primary: #1ACEFF;      /* Main accent color */
--sd-success: #00B894;      /* Success states */
--sd-warning: #FDCB6E;      /* Warning states */
--sd-error: #FF6B6B;        /* Error states */
```

Save the file and refresh — the entire theme updates instantly.

### Accent Color Presets

Pre-built color presets are included as comments in `softdesk-tokens.css`.
Uncomment a preset block to switch the entire theme:

- **Cyan** (default)
- **Indigo**
- **Emerald**

### Change Data (1 file)

Open `js/data.js` and replace the sample data with your own:

```javascript
var SOFTDESK_DATA = {
  kpi: [
    { label: 'Your Metric', value: '1,234', trend: '+5%', dir: 'up' },
    // ...
  ],
  revenueChart: {
    labels: ['Jan', 'Feb', ...],
    data: [1000, 2000, ...]
  }
};
```

### Change Font

In `softdesk-tokens.css`:

```css
--sd-font: 'Your Font', sans-serif;
```

Update the Google Fonts link in each HTML file's `<head>`.

### Change Spacing / Radius

```css
--sd-radius-lg: 20px;    /* Card corners */
--sd-space-5: 24px;       /* Card padding */
```

## File Structure

```
softdesk-v1/
├── index.html            Overview dashboard
├── analytics.html        Analytics & charts
├── users.html            User management
├── projects.html         Project tracker
├── settings.html         App settings
├── css/
│   ├── softdesk-tokens.css   ★ Edit this for customization
│   └── softdesk.css          Main styles (usually no need to edit)
├── js/
│   ├── data.js               ★ Edit this for your data
│   └── softdesk.js           Interactions
└── README.md
```

## Neumorphism Utility Classes

Use these anywhere in your HTML:

| Class | Effect |
|-------|--------|
| `neu-raised` | Raised/elevated card |
| `neu-inset` | Pressed inward |
| `neu-pressed` | Deeply pressed (active state) |
| `neu-flat` | Flat, no shadow |
| `neu-sm-raised` | Small raised element |
| `neu-sm-inset` | Small inset element |

Example:
```html
<div class="neu-raised" style="padding: 24px;">
  Your content here
</div>
```

## Pages

| Page | Description |
|------|-------------|
| Overview | KPI cards, revenue chart, activity feed, orders table |
| Analytics | Traffic trends, top pages, sources, device & browser stats |
| Users | User list with search, filter, and detail panel |
| Projects | Project cards with progress, team, and status |
| Settings | General, notifications, security tabs |

## Tech

- HTML5 + CSS3 + Vanilla JS
- Font: Plus Jakarta Sans (Google Fonts, free)
- Charts: Chart.js 4 (CDN)
- No build tools required
- Framework independent (React, Vue, Angular, Svelte, plain HTML)

## License

Licensed under MergeUi Pro license. See your account for details.
