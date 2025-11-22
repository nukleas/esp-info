# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive ESP32 reference website with pinout diagrams, variant comparisons, development board guides, circuit examples, and technical reference data. Static React site deployable to any hosting platform.

**Live features:**
- Interactive SVG pinout diagrams for 6 ESP32 variants
- Side-by-side variant comparison table
- Circuit library with 28+ wiring examples and interactive SVG schematics
- Development board database with specs and purchasing info
- Quick reference for formulas, boot modes, and programming commands
- Global search across all content (variants, pins, circuits, boards)

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
```

## Technology Stack

- **Framework:** React 18 with React Router v7
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3.4
- **Graphics:** Custom SVG components for interactive diagrams
- **Fonts:** JetBrains Mono (code), Inter (body) via Google Fonts

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx           # Header, nav, footer with global search
│   ├── GlobalSearch.jsx     # Site-wide search (Cmd/Ctrl+K)
│   ├── VariantCard.jsx      # Home page ESP32 variant cards
│   ├── PinoutDiagram.jsx    # Interactive chip pinout SVG
│   ├── PinDetail.jsx        # Pin information detail panel
│   └── CircuitDiagram.jsx   # Reusable SVG circuit components
├── pages/
│   ├── Home.jsx             # Landing page with variant grid
│   ├── Compare.jsx          # Side-by-side spec comparison table
│   ├── Pinouts.jsx          # Interactive pinout diagrams
│   ├── Circuits.jsx         # Wiring examples library
│   ├── Boards.jsx           # Development board database
│   └── Reference.jsx        # Quick reference (formulas, boot modes)
├── data/
│   ├── variants.js          # ESP32 variant specs (8 variants)
│   ├── pinouts.js           # Pin data for all variants (~600 pins)
│   ├── circuits.js          # Circuit examples (28+ circuits)
│   ├── circuitSchematics.jsx # Interactive SVG circuit diagrams
│   ├── boards.js            # Development board specifications
│   ├── modules.js           # ESP32 module information
│   └── reference.js         # Formulas, boot modes, commands
├── App.jsx                  # Route definitions
├── main.jsx                 # Entry point
└── index.css                # Tailwind config + custom styles
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing page with variant grid |
| `/compare` | Compare | Side-by-side variant comparison |
| `/pinouts` | Pinouts | Variant selector for pinout diagrams |
| `/pinouts/:variantId` | Pinouts | Interactive pinout for specific variant |
| `/circuits` | Circuits | Searchable circuit examples library |
| `/boards` | Boards | Development board database |
| `/reference` | Reference | Quick reference (formulas, boot modes) |

## Adding Content

### Adding a New ESP32 Variant

Edit `src/data/variants.js`:

```javascript
{
  id: 'esp32-xx',           // URL-safe identifier
  name: 'ESP32-XX',         // Display name
  fullName: 'ESP32-XX-WROOM-1',
  tagline: 'Brief description',
  releaseYear: 2024,
  status: 'Active',
  cpu: {
    architecture: 'RISC-V', // or 'Xtensa LX6/LX7'
    cores: 1,
    clockSpeed: 160,        // MHz
  },
  memory: { sram: 400, rom: 384, flash: '4 MB', psram: null },
  wireless: { wifi: '802.11 b/g/n', bluetooth: 'BLE 5.0', zigbee: false, thread: false },
  peripherals: { gpio: 22, adc: { channels: 6, resolution: 12 }, ... },
  power: { voltage: '3.0-3.6V', deepSleep: '5 µA', ... },
  useCases: ['IoT', 'Sensors'],
  pros: ['Low cost', 'Small'],
  cons: ['Single core'],
}
```

### Adding Pinout Data

Edit `src/data/pinouts.js` - add to `pinoutsByVariant`:

```javascript
'esp32-xx': [
  {
    pin: 1,                  // Physical pin number
    name: 'GPIO0',           // Pin name
    type: 'GPIO',            // GPIO, Power, GND, NC
    gpio: 0,                 // GPIO number (if applicable)
    side: 'left',            // left or right (for diagram)
    description: 'Boot mode select',
    altFunctions: [
      { name: 'ADC1_CH0', type: 'ADC' },
      { name: 'TOUCH1', type: 'Touch' },
    ],
    notes: ['Internal pullup', 'Strapping pin'],
    warnings: ['Avoid pulling LOW at boot'],
  },
  // ... more pins
]
```

Also add to `defaultPinsByVariant` and `safeGPIOsByVariant` for complete support.

### Adding Circuit Examples

Edit `src/data/circuits.js`:

```javascript
{
  id: 'category-name',       // URL-safe identifier
  category: 'Power',         // Power, Programming, Input, Output, Communication, Sensors
  title: 'Circuit Title',
  difficulty: 'beginner',    // beginner, intermediate, advanced
  description: 'What this circuit does',
  components: [
    { name: 'R1', type: 'Resistor', value: '10kΩ', note: 'Optional note' },
  ],
  connections: [
    { from: 'GPIO4', to: 'R1', note: 'Pull-up' },
  ],
  code: `// Arduino code example`,
  notes: ['Important note 1', 'Important note 2'],
  warnings: ['Safety warning'],
  tags: ['power', 'beginner'],
}
```

### Adding Interactive Circuit Schematics

Edit `src/data/circuitSchematics.jsx`:

```javascript
'circuit-id': {
  width: 400,
  height: 200,
  render: ({ animated }) => (
    <g>
      <Label x={200} y={20} text="Circuit Title" size={12} />
      <Components.Resistor x={100} y={80} value="10k" label="R1" />
      <Wire points={[{ x: 50, y: 80 }, { x: 100, y: 80 }]} />
      {/* Use AnimatedWire for animated current flow when animated=true */}
    </g>
  ),
}
```

Available components: `Resistor`, `Capacitor`, `LED`, `Diode`, `Ground`, `VCC`, `ESP32Chip`, `IC`

### Adding Development Boards

Edit `src/data/boards.js`:

```javascript
{
  id: 'board-name',
  name: 'Board Display Name',
  manufacturer: 'Manufacturer',
  variant: 'esp32-s3',       // Must match a variant id
  module: 'ESP32-S3-WROOM-1',
  description: 'Board description',
  formFactor: { pins: 38, dimensions: '54.4 x 27.9 mm' },
  features: { usbConnector: 'USB-C', flashSize: '4 MB', ... },
  pinout: { totalPins: 38, gpio: 34, adc: 18 },
  power: { inputVoltage: '5V (USB)' },
  price: '$10-15',
  pros: ['Pro 1', 'Pro 2'],
  cons: ['Con 1'],
}
```

## Design System

Dark cyberpunk theme with neon accents. CSS custom properties in `src/index.css`:

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#0a0e17` | Main background |
| `--bg-secondary` | `#121825` | Cards, header |
| `--bg-tertiary` | `#1a2332` | Elevated surfaces |
| `--accent-blue` | `#00d4ff` | Primary accent (links, highlights) |
| `--accent-cyan` | `#00ffaa` | Secondary accent (success, output) |
| `--text-primary` | `#e2e8f0` | Main text |
| `--text-secondary` | `#94a3b8` | Supporting text |
| `--text-muted` | `#64748b` | Disabled, hints |

Tailwind extends these as `bg-bg-primary`, `text-accent-blue`, etc.

### Component Classes

- `.card` - Standard card with hover glow effect
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.glow-blue` / `.glow-cyan` - Neon glow shadows

### Performance Guidelines

- Animate only `transform` and `opacity` (GPU-accelerated)
- Transitions: 150-300ms with `ease-in-out`
- Debounce search input (built into GlobalSearch)
- SVG diagrams render client-side (no lazy loading needed for current size)

## ESP32 Variants Supported

Currently documented (in priority order):

1. **ESP32** - Original dual-core Xtensa, Bluetooth Classic + BLE
2. **ESP32-S3** - Dual-core with AI acceleration, USB OTG
3. **ESP32-C3** - Single-core RISC-V, budget-friendly
4. **ESP32-S2** - Single-core with USB OTG, no Bluetooth
5. **ESP32-C6** - WiFi 6 + Thread/Zigbee support
6. **ESP32-H2** - Thread/Zigbee only (no WiFi)
7. **ESP32-C5** - Dual-band WiFi 6 RISC-V (newest)
8. **ESP32-P4** - High-performance, no built-in wireless

## Key Implementation Details

### Pinout Diagrams (`PinoutDiagram.jsx`)
- SVG-based interactive chip diagrams
- Hover tooltips with pin information
- Click to select and show detail panel
- Color-coded by pin type (GPIO, Power, ADC, etc.)
- Category filtering support

### Global Search (`GlobalSearch.jsx`)
- Keyboard shortcut: Cmd/Ctrl+K
- Searches: variants, pins, circuits, boards
- Debounced input, keyboard navigation
- Direct navigation to results

### Circuit Schematics (`circuitSchematics.jsx`)
- React components rendering SVG
- Reusable component library (resistors, capacitors, ICs, etc.)
- Optional animation for current flow visualization
- Consistent styling matching site theme

## Data Relationships

```
variants.js ─────────────────┐
    ↓                        │
pinouts.js (pinoutsByVariant)│
    ↓                        │
boards.js (variant field) ───┼→ GlobalSearch indexes all
    ↓                        │
circuits.js ─────────────────┤
    ↓                        │
circuitSchematics.jsx ───────┤
    ↓                        │
reference.js (bootModes by variant)
```

## Common Development Tasks

### Adding a complete new variant
1. Add variant object to `src/data/variants.js`
2. Add pinout data to `src/data/pinouts.js`
3. Add boot mode info to `src/data/reference.js`
4. Update any boards using this variant in `src/data/boards.js`

### Adding a new circuit with schematic
1. Add circuit data to `src/data/circuits.js`
2. Add SVG schematic to `src/data/circuitSchematics.jsx` with matching `id`
3. Circuit page will automatically display the schematic

### Updating the navigation
Edit `navLinks` array in `src/components/Layout.jsx`

## Testing

No test framework currently configured. Manual testing workflow:
1. `npm run dev` - Start dev server
2. Test all routes and interactions
3. `npm run build` - Verify production build succeeds
4. `npm run preview` - Test production build locally

## Deployment

Static site - deploy the `dist/` folder to any static hosting:
- Vercel, Netlify, GitHub Pages, Cloudflare Pages
- No server-side rendering or API routes required
