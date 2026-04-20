# MergeUi — SaaS Admin v1 Design System

> Style: Neumorphism (Light)
> Background Tone: Light Gray (#E8ECEF)
> Accent Presets: Blue / Purple / Emerald / Coral

---

## Typography

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | Inter | 32px | 700 (Bold) | 1.25 (40px) | -0.02em |
| H2 | Inter | 24px | 600 (Semibold) | 1.33 (32px) | -0.01em |
| H3 | Inter | 20px | 600 (Semibold) | 1.4 (28px) | -0.01em |
| Body | Inter | 15px | 400 (Regular) | 1.6 (24px) | 0 |
| Caption | Inter | 13px | 500 (Medium) | 1.54 (20px) | 0.01em |
| Small | Inter | 11px | 400 (Regular) | 1.45 (16px) | 0.02em |
| Mono | JetBrains Mono | 13px | 400 | 1.54 (20px) | 0 |

---

## Color Tokens

### Background & Surface
| Token | Light Value | Usage |
|-------|-------------|-------|
| --merge-bg-base | #E8ECEF | Page background |
| --merge-bg-surface | #E8ECEF | Card/widget surface (same as base for neumorphism) |
| --merge-bg-elevated | #F0F4F7 | Elevated elements (modals, dropdowns) |
| --merge-bg-inset | #DDE1E4 | Inset/pressed elements |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| --merge-text-primary | #1A1D21 | Headings, primary text |
| --merge-text-secondary | #4A5568 | Body text, descriptions |
| --merge-text-muted | #8896A6 | Labels, placeholders, meta |
| --merge-text-inverse | #FFFFFF | Text on accent backgrounds |

### Neumorphism Shadows
| Token | Value | Usage |
|-------|-------|-------|
| --merge-shadow-raised | 6px 6px 12px #C8CCD0, -6px -6px 12px #FFFFFF | Raised/convex elements |
| --merge-shadow-inset | inset 4px 4px 8px #C8CCD0, inset -4px -4px 8px #FFFFFF | Pressed/concave elements |
| --merge-shadow-sm | 3px 3px 6px #C8CCD0, -3px -3px 6px #FFFFFF | Small elements (buttons, badges) |

### Accent Color Presets
| Preset | Primary | Primary Hover | Primary Light | Primary Dark |
|--------|---------|---------------|---------------|--------------|
| Blue (default) | #4F6AFF | #3D55E0 | #EBF0FF | #2A3F99 |
| Purple | #7C3AED | #6D28D9 | #F0EAFF | #4C1D95 |
| Emerald | #10B981 | #059669 | #E6FAF2 | #065F46 |
| Coral | #F43F5E | #E11D48 | #FFF1F2 | #9F1239 |

### Status
| Token | Value | Usage |
|-------|-------|-------|
| --merge-status-success | #10B981 | Success states |
| --merge-status-warning | #F59E0B | Warning states |
| --merge-status-error | #EF4444 | Error states |
| --merge-status-info | #3B82F6 | Info states |

### Border
| Token | Value | Usage |
|-------|-------|-------|
| --merge-border-default | rgba(0,0,0,0.06) | Subtle dividers |
| --merge-border-strong | rgba(0,0,0,0.12) | Visible borders |

---

## Spacing Scale (8px Grid)

| Token | Value | Usage |
|-------|-------|-------|
| --merge-space-1 | 4px | Tight spacing (icon-text gap) |
| --merge-space-2 | 8px | Compact elements |
| --merge-space-3 | 12px | Default inner padding |
| --merge-space-4 | 16px | Card padding, input padding |
| --merge-space-5 | 20px | — |
| --merge-space-6 | 24px | Section gaps |
| --merge-space-8 | 32px | Large gaps |
| --merge-space-10 | 40px | — |
| --merge-space-12 | 48px | Section padding |
| --merge-space-16 | 64px | Page-level spacing |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| --merge-radius-sm | 8px | Small elements (badges, chips) |
| --merge-radius-md | 12px | Buttons, inputs |
| --merge-radius-lg | 16px | Cards, widgets |
| --merge-radius-xl | 24px | Large panels, modals |
| --merge-radius-full | 9999px | Circular elements (avatars) |

---

## Layout

### Sidebar
- Width: 260px (fixed)
- Background: same as --merge-bg-base
- Style: Neumorphic raised panel on right edge
- Items: Icon (20px) + Text label
- Active state: Inset shadow + accent color

### Topbar
- Height: 64px
- Background: same as --merge-bg-base
- Contains: Search, notifications, profile
- Style: Neumorphic raised bottom edge

### Content Grid
- Max width: 1200px within content area
- Gap: 24px
- Columns: 12-column grid

### Responsive Breakpoints
| Device | Width | Sidebar |
|--------|-------|---------|
| Desktop | 1280px+ | Fixed 260px sidebar |
| Tablet | 768px–1279px | Collapsible (icon-only 72px) |
| Mobile | –767px | Bottom navigation bar |

---

## Animation & Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| Color/opacity | 200ms | ease-out |
| Transform/shadow | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Layout | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Page transitions | 400ms | ease-in-out |

### Neumorphic Interactions
- Hover: Shadow depth increases slightly
- Active/Press: Transition from raised to inset shadow
- Focus: Accent color ring (2px) outside neumorphic shadow

---

## Icons
- Library: Lucide Icons
- Size: 20px (sidebar, inline), 24px (standalone)
- Stroke: 1.5px
- Color: inherits from text color

## Charts (Chart.js)
- Border radius on bars: 8px
- Line tension: 0.4 (smooth curves)
- Point radius: 0 (hidden by default), 5px on hover
- Grid lines: --merge-border-default
- Font: Inter, 12px
