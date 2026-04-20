# SoftDesk — Neumorphic SaaS Admin Dashboard

A clean, accessible SaaS admin dashboard built with soft UI principles. Five production-ready pages, three chart types, and four accent color presets. Pure HTML/CSS/JS — no framework lock-in.

---

## Quick Start

1. Download and unzip
2. Open `pages/dashboard.html` in your browser
3. It works immediately — no build step needed

## Customization

### Change Accent Color

Open `assets/css/variables.css` and uncomment the preset you want:

```css
/* Default: Indigo-Violet (active) */
--merge-color-primary: #6C5CE7;

/* Uncomment one of these: */

/* Ocean Blue */
/* --merge-color-primary: #4F6AFF; */

/* Emerald */
/* --merge-color-primary: #10B981; */

/* Coral Rose */
/* --merge-color-primary: #F43F5E; */
```

Save the file — done. The entire theme updates automatically.

### Custom Brand Color

Replace the `--merge-color-primary` value with your own hex color. Update the `-hover`, `-light`, and `-dark` variants to match.

## Pages Included

| Page | File | Description |
|------|------|-------------|
| Dashboard | `pages/dashboard.html` | KPI cards, revenue chart, subscriber growth, plan distribution, activity feed |
| Users | `pages/users.html` | Data table with search, filters, sort, pagination |
| User Detail | `pages/user-detail.html` | Profile card, subscription info, download history, activity timeline |
| Billing | `pages/billing.html` | Plan comparison cards, transaction history, invoices |
| Settings | `pages/settings.html` | Profile form, notification toggles, security, API keys |

## Tech Stack

- **HTML5** — Semantic markup (`<header>`, `<nav>`, `<main>`, `<aside>`)
- **CSS3** — Custom properties (`--merge-*`), no preprocessor needed
- **Vanilla JS** — Chart initialization, sidebar toggle
- **Chart.js 4.x** — Line, bar, doughnut charts (loaded via CDN)
- **Inter** — Google Fonts (free, loaded via CDN)
- **Lucide** — Inline SVG icons (no external dependency)

## Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Desktop | 1280px+ | Full sidebar (260px) |
| Tablet | 768–1279px | Collapsed sidebar (68px, icons only) |
| Mobile | –767px | Hidden sidebar, bottom navigation |

## Accessibility

- WCAG AA color contrast (4.5:1 minimum)
- Keyboard navigable (Tab, Enter, Escape)
- ARIA labels on all interactive elements
- Semantic HTML throughout
- `tabular-nums` for data alignment

## File Structure

```
pa_v1_neu/
├── README.md
├── LICENSE.md
├── CHANGELOG.md
├── design-system.md
├── pages/
│   ├── dashboard.html
│   ├── users.html
│   ├── user-detail.html
│   ├── billing.html
│   └── settings.html
└── assets/
    ├── css/
    │   ├── variables.css    ← customize this
    │   └── theme.css
    ├── js/
    │   └── theme.js
    └── icons/
```

## License

See LICENSE.md for full terms. Pro subscribers may use this template in unlimited commercial projects.

## Support

- Documentation: mergeui.com/docs
- Email: support@mergeui.com
