# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive ESP32 reference website with pinout diagrams, variant comparisons, and common wiring examples. Static React site deployable to any hosting.

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
```

## Technology Stack

- **Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Graphics:** SVG for interactive diagrams
- **Fonts:** JetBrains Mono (code), Inter (body) from Google Fonts

## Adding Content

**Variants:** Edit `src/data/variants.js` - follow the existing object structure with cpu, memory, wireless, peripherals, and power fields.

**Circuits:** Add to the `circuits` array in `src/pages/Circuits.jsx` - includes id, category, title, difficulty, description, components, optional code, and notes.

**Pinouts:** Pin data will live in `src/data/pinouts.js` (not yet created) - see `03-pinout-diagrams.md` for data structure.

## Remaining Work

See `00-implementation-guide.md` for full details:
- Interactive SVG pinout diagrams (placeholder exists)
- Global search functionality
- More circuit examples with SVG schematics

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx         # Header, nav, footer wrapper
│   └── VariantCard.jsx    # Home page ESP32 cards
├── pages/
│   ├── Home.jsx           # Landing page with variant grid
│   ├── Compare.jsx        # Side-by-side spec table
│   ├── Pinouts.jsx        # Interactive diagrams (WIP)
│   └── Circuits.jsx       # Wiring examples library
├── data/
│   └── variants.js        # ESP32 variant specs (easy to edit)
├── App.jsx                # Routes
├── main.jsx               # Entry point
└── index.css              # Tailwind + custom styles
```

## Design System

Dark theme only. Key CSS variables defined in `02-design-system.md`:

- Backgrounds: `#0a0e17`, `#121825`, `#1a2332`
- Accents: `#00d4ff` (electric blue), `#00ffaa` (cyan)
- Text: `#e2e8f0` (primary), `#94a3b8` (secondary)

**Performance rules:**
- Animate only `transform` and `opacity` (GPU-accelerated)
- Transitions: 200-300ms with `ease-in-out`
- Debounce search input (300ms)
- Lazy load SVG diagrams

## ESP32 Variants to Support

Priority order: ESP32-WROOM-32, ESP32-S3, ESP32-C3, ESP32-S2, ESP32-C6, ESP32-H2

## Key Feature Details

**Pinout Diagrams (`03-pinout-diagrams.md`):**
- SVG-based interactive chip diagrams
- Hover tooltips, click-to-select detail panel
- Category filtering (GPIO, I2C, SPI, ADC, etc.)
- Color-coding by pin type

**Comparison Table (`04-comparison-table.md`):**
- Sortable columns, filter dropdowns
- Desktop: full table; Mobile: card-based view
- "Best For" recommendations section

**Circuits Library (`05-common-circuits.md`):**
- Categories: power supply, programming, boot mode, I2C/SPI, sensors, outputs
- Each circuit: schematic (SVG), parts list, code snippet
- Difficulty indicators and tags
