# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains prompts and specifications for building an ESP32 reference website - an interactive web application that consolidates ESP32 documentation, pinout diagrams, variant comparisons, and common wiring examples.

**Current state:** Documentation/specification only. No code has been implemented yet.

## Build Commands

Once the project is initialized (React + Vite + Tailwind):

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

## Implementation Order

Follow the phased approach in `00-implementation-guide.md`:

1. **Phase 1:** Project foundation - React/Vite/Tailwind setup, design system, navigation
2. **Phase 2:** Home page with ESP32 variant cards
3. **Phase 3:** Comparison table with sorting/filtering
4. **Phase 4:** Interactive pinout diagrams (most complex feature)
5. **Phase 5:** Common circuits library
6. **Phase 6:** Global search and pin function finder
7. **Phase 7:** Performance optimization and accessibility

## Project Structure (Target)

```
src/
├── components/
│   ├── PinoutDiagram.jsx    # Interactive SVG chip diagrams
│   ├── ComparisonTable.jsx  # Variant comparison with sorting
│   ├── VariantCard.jsx      # Home page cards
│   └── SearchBar.jsx        # Global search
├── pages/
│   ├── Home.jsx
│   ├── VariantDetail.jsx
│   ├── Compare.jsx
│   └── Circuits.jsx
├── data/
│   ├── variants.js          # ESP32 variant specs
│   ├── pinouts.js           # Pin data for each variant
│   └── circuits.js          # Wiring examples
└── App.jsx
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
