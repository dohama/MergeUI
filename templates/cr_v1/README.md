# CRM Pipeline v1

Clean Flat CRM dashboard theme with pipeline kanban board, contacts, deals, activities timeline, and reports.

## Quick Start

1. Open `index.html` in your browser
2. No build step required - pure HTML/CSS/JS

## Files

| File | Description |
|------|-------------|
| `index.html` | Pipeline kanban board with deal cards |
| `contacts.html` | Contact list table + right slide panel |
| `deals.html` | Deals table with stage/priority filters |
| `activities.html` | Activity timeline (calls, emails, meetings, notes) |
| `reports.html` | Pipeline funnel, win/loss chart, revenue, rep performance |
| `css/crm-tokens.css` | Design tokens - edit this to customize |
| `css/crm-pipeline.css` | Component styles |
| `js/data.js` | Sample data - replace with your own |
| `js/crm-pipeline.js` | Interactions (sidebar toggle, panel, charts) |

## Customization

### Colors
Edit `css/crm-tokens.css` and change the `--crm-*` variables. Three accent presets included: Blue (default), Coral, Emerald.

### Data
Edit `js/data.js` and change `CRM_DATA` values. Refresh the browser.

### Pipeline Stages
Stage colors are defined in `crm-tokens.css` as `--crm-stage-*` variables.

## Dependencies

- **Manrope** font (Google Fonts CDN)
- **Chart.js 4** (CDN, reports page only)

## Browser Support

Chrome, Firefox, Safari, Edge (latest 2 versions)

## Responsive

- Desktop: 1280px+ (full sidebar)
- Tablet: 768-1279px (collapsed sidebar)
- Mobile: <768px (bottom navigation)
