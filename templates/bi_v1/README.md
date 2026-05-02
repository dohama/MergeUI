# Analytics Studio (bi_v1)

> Premium BI dashboard template — **Bento grid + Auto-narrated story + History scrubber**
> Powered by Chart.js. Zero build step. Drop-in HTML/CSS/JS.

> Internal slug: `bi_v1` · External product name (provisional): **Analytics Studio** (final TBD Day 7)

---

## Signature Features (Rev 2)

| # | Signature | What it does |
|---|---|---|
| 1 | **Bento Grid Layout** | 12-column grid with mixed span-3/4/5/6/7/8 cards and 2-row anchors. Breaks the "same-size card" monotony found in most BI templates. |
| 2 | **Auto-narrate Story (X06)** | A 1-sentence prose summary (`MRR grew 12.4% WoW…`) with highlighted drivers. Copy-to-Slides button. Regenerate cycles through 10 templated narratives keyed to data conditions. |
| 3 | **History Scrubber (X09)** | Drag-the-timeline UX. Keyboard: ← / → ±1d, Shift ±7d, Home/End. Dispatches `bi:timechange` CustomEvent for downstream chart recomputation (Phase γ: full per-date slicing). |

---

## Chart Inventory (10 types)

| # | Chart | Engine | Data |
|---|---|---|---|
| 1 | Line | Chart.js line + area gradient | Revenue 12M vs YoY |
| 2 | Stacked Bar | Chart.js bar (stacked) | Traffic channels |
| 3 | Horizontal Stacked Bar | Chart.js bar (indexAxis:'y') | Cohort retention M1–M6 |
| 4 | Donut | Chart.js doughnut (cutout 68%) | Device share |
| 5 | Pie | Chart.js pie | Plan mix |
| 6 | Stacked Area | Chart.js line (fill) | MAU/WAU/DAU |
| 7 | Scatter (bubble) | Chart.js scatter | LTV vs CAC |
| 8 | Heatmap | HTML grid (7×24) | Day × Hour traffic |
| 9 | Gauge (large + mini) | Inline SVG arc | NPS score |
| 10 | Funnel | HTML bars | Visitor → Retained |

Plus: **Hero sparkline** (inline SVG with hover tooltip), **Top Countries table** with rank badges, **Narrate footnotes** on 5 cards.

---

## File Structure

```
templates/bi_v1/
├── index.html          # Semantic HTML, no inline styles
├── css/
│   ├── bi-tokens.css   # --bi-* design tokens (Navy Premium)
│   └── bi-theme.css    # Layout + components + responsive
└── js/
    ├── data.js         # BI_DATA + narrateTemplates + getDataAt(date)
    └── bi-theme.js     # Renderers + scrubber + narrate runtime
```

---

## Design Tokens (Navy Premium)

All customization happens via `--bi-*` CSS variables. No hex values in markup.

**Core palette:**
```
--bi-bg            #F4F6FB   page background
--bi-bg-white      #FFFFFF   card background
--bi-bg-subtle     #EEF1F7   scrubber/secondary
--bi-text          #0F1629   body
--bi-text-2        #4A5876   secondary
--bi-text-muted    #7A88A3   labels
--bi-primary       #3D5AF5   accent (swap via preset)
--bi-primary-soft  #E9EDFE   hover/mark bg
```

**Chart 8 (deuteranopia-safe):**
`#3D5AF5 · #06B6D4 · #F59E0B · #F43F5E · #10B981 · #8B5CF6 · #F97316 · #64748B`

**Dark mode:** Phase 1 **not** enabled. Dark-column values are kept as comments in `bi-tokens.css` for Phase γ activation.

### Accent Preset Swap

Uncomment one block at the bottom of `bi-tokens.css` to re-tint every `--bi-primary` usage (no other edits needed):

```css
/* === Emerald === */
:root { --bi-primary: #059669; --bi-primary-soft: #D1FAE5; --bi-primary-strong: #047857; }
```

Provided presets: **Indigo (default) · Emerald · Rose · Amber · Charcoal**.

---

## Quick Start

1. Double-click `index.html` (works via `file://` — only external call is the Chart.js CDN + Google Fonts).
2. Or serve: `npx serve .` → open `http://localhost:3000/`.

No npm install. No build.

---

## Customization Recipes

### Change the accent color
Edit `css/bi-tokens.css` → swap `--bi-primary` / `--bi-primary-soft` / `--bi-primary-strong`. Charts, hover states, and scrubber all follow automatically.

### Replace the narrative
Edit `js/data.js` → `narrateTemplates[]`. Each entry has `{ id, condition(snapshot) → bool, html }`. Placeholders `{{key}}` are pulled from `BI_DATA.snapshot` at render time.

### Change chart data
Edit `BI_DATA` in `js/data.js`. Each chart reads its own slice (`BI_DATA.revenueTrend`, `BI_DATA.channelStack`, etc.). The rendering code in `bi-theme.js` picks colors from CSS vars so re-theming works without JS edits.

### Wire scrubber to live data (Phase γ)
`getDataAt(dateStr)` in `data.js` is the single seam — return a snapshot shaped like the global `BI_DATA` for a given ISO date, and each chart's `bi:timechange` listener will pick it up.

---

## Accessibility

- WCAG AA contrast verified for text / primary on all surfaces.
- Scrubber: `role="slider"` + `aria-valuemin/max/now/text`, keyboard (← → Shift Home End PageUp/Down), pointer drag with capture.
- Every `<canvas>` chart has `role="img"` + `aria-label`.
- `prefers-reduced-motion` disables hover elevation, chart animation, and narrate fade.
- Focus ring: `2px solid --bi-primary` with 2px offset. Never suppressed.

---

## Dependencies

- **Chart.js 4** via CDN (`chart.umd.min.js`).
- **Inter + JetBrains Mono** via Google Fonts.
- Zero other runtime dependencies. Bundle < 50KB (excluding Chart.js CDN).

---

## Roadmap

- **Phase γ (post-launch)** — Dark mode toggle, `getDataAt(date)` per-date slicing, Command Palette (⌘K), user-custom widget saving.

---

## License

© 2026 MergeUi. Commercial license per subscription plan.
