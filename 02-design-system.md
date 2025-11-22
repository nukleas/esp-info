# ESP32 Reference Website - Design System

Create a minimalistic, futuristic aesthetic that's processor-friendly.

## Color Palette

### CSS Variables
```css
--bg-primary: #0a0e17;      /* Near-black background */
--bg-secondary: #121825;    /* Slightly lighter panels */
--bg-tertiary: #1a2332;     /* Card backgrounds */

--accent-blue: #00d4ff;     /* Primary accent - electric blue */
--accent-cyan: #00ffaa;     /* Secondary accent - cyan */
--accent-purple: #b794f6;   /* Optional third accent */

--text-primary: #e2e8f0;    /* Main text */
--text-secondary: #94a3b8;  /* Muted text */
--text-muted: #64748b;      /* Very muted text */

--glow-blue: rgba(0, 212, 255, 0.4);     /* Glow effects */
--glow-cyan: rgba(0, 255, 170, 0.4);     /* Alternative glow */
--border: rgba(0, 212, 255, 0.2);        /* Subtle borders */
```

## Typography

### Font Stack
- **Technical/Code**: JetBrains Mono or Fira Code (from Google Fonts)
- **Body Text**: Inter or Space Grotesk (from Google Fonts)
- **Headings**: Same as body but bold

### Sizes
- H1: 2.5rem (40px)
- H2: 2rem (32px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Small/Caption: 0.875rem (14px)
- Code/Technical: 0.9375rem (15px)

## Visual Effects

### Performance-Friendly Guidelines
All effects must be GPU-accelerated and lightweight:

1. **Use ONLY these CSS properties for animations:**
   - `transform` (translate, scale, rotate)
   - `opacity`
   - Never animate: width, height, top, left, margin, padding

2. **Transitions:**
   - Duration: 200-300ms
   - Easing: `ease-in-out` or `cubic-bezier(0.4, 0, 0.2, 1)`
   - Limit to 3-4 simultaneous animations max

3. **Effects Allowed:**
   - Subtle gradient borders on cards
   - Glow effects on hover (box-shadow, max blur 10-15px)
   - Smooth color transitions
   - SVG-based graphics only (no icon fonts)

4. **Effects to AVOID:**
   - Particle systems
   - Heavy canvas animations
   - backdrop-filter (use sparingly, only on modals)
   - Multiple blur effects
   - Animated gradients (static gradients only)

## Component Styling

### Cards
```
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border)
- Border radius: 8px
- Padding: 1.5rem
- Hover effect: 
  - Subtle glow: box-shadow: 0 0 20px var(--glow-blue)
  - Border brightens: border-color increase alpha to 0.4
```

### Buttons
```
Primary Button:
- Background: var(--accent-blue)
- Text: var(--bg-primary)
- Hover: Glow effect + slight scale (1.05)
- Transition: all 200ms ease-in-out

Secondary Button:
- Background: transparent
- Border: 1px solid var(--accent-blue)
- Text: var(--accent-blue)
- Hover: Background fills with var(--accent-blue) at 20% opacity
```

### Input Fields
```
- Background: var(--bg-secondary)
- Border: 1px solid var(--border)
- Text: var(--text-primary)
- Focus: 
  - Border: var(--accent-blue)
  - Glow: 0 0 10px var(--glow-blue)
  - Terminal-style cursor blink
```

## Layout

### Grid System
- Max width: 1400px
- Padding: 2rem on desktop, 1rem on mobile
- Grid gap: 1.5rem
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Navigation
- Sticky header
- Height: 64px
- Background: var(--bg-secondary) with 90% opacity
- Subtle bottom border: 1px solid var(--border)

### Sections
- Spacing between sections: 4rem (64px)
- Section padding: 3rem (48px) vertical

## Futuristic Touches

### Subtle Effects (Optional)
These should be VERY subtle and not distracting:

1. **Scanning Line Effect:**
   - Thin line (1-2px) that occasionally sweeps across page
   - Very low opacity (0.1-0.15)
   - CSS animation only
   - Duration: 3-4 seconds
   - Runs every 10-15 seconds

2. **Card Corners:**
   - Optional: Use `clip-path` for hexagon or angled corners
   - Keep it minimal (small clips, 4-6px)

3. **Status Indicators:**
   - Pulsing glow for active/enabled states
   - Animation: opacity 0.6 to 1.0, 2s infinite

4. **Code Blocks:**
   - Background: var(--bg-primary)
   - Border-left: 3px solid var(--accent-cyan)
   - Font: monospace
   - Syntax highlighting: Keep it simple (3-4 colors max)

## Background

### Circuit Board Pattern (Optional)
- Very faint grid or circuit lines
- CSS background-image with SVG or linear-gradients
- Opacity: 0.02-0.05 (barely visible)
- Static, no animation

## Performance Checklist

Before finalizing, ensure:
- [ ] All animations use only transform/opacity
- [ ] No JavaScript runs on scroll events
- [ ] Search input is debounced (300ms)
- [ ] Pinout diagrams are lazy-loaded
- [ ] No more than 3-4 box-shadow effects visible at once
- [ ] SVG graphics are optimized
- [ ] No animated GIFs or videos in initial view
- [ ] CSS is consolidated (no repeated rules)
