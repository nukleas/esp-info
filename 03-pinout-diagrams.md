# Feature: Interactive Pinout Diagrams

Create detailed, interactive pinout diagrams for each ESP32 variant.

## Requirements

### Visual Representation
- SVG-based chip diagram (recommended for scalability and interactivity)
- Show chip in realistic form factor (DIP-style layout for dev boards)
- Pin numbers clearly labeled
- Pin names/functions visible

### Interactivity

#### Hover State
- Pin highlights on hover
- Tooltip appears showing:
  - Pin number
  - Primary function
  - Alternate functions
  - Voltage level
  - Special notes

#### Click State
- Pin remains highlighted
- Detailed panel opens (sidebar or modal) with:
  - All alternate functions
  - Pull-up/pull-down information
  - Boot mode behavior
  - Safe/unsafe to use notes
  - Example code snippets (if applicable)

#### Category Filtering
Toggle buttons to highlight pin groups:
- All Pins (default)
- Power (VCC, GND, 3V3, EN)
- GPIO (general purpose)
- ADC (analog input capable)
- DAC (analog output capable)
- Touch Sensors
- I2C (SDA, SCL)
- SPI (MOSI, MISO, CLK, CS)
- UART (TX, RX)
- PWM capable
- Strapping/Boot pins (highlight in warning color)

### Pin Status Indicators
Color-code pins:
- **Power**: Red/Orange
- **Ground**: Black/Dark gray
- **GPIO**: Blue/Cyan (accent colors)
- **Special Function Active**: Cyan glow
- **Strapping/Warning**: Yellow/Orange warning color
- **Input Only**: Purple accent
- **Reserved/Avoid**: Red warning

### Data Structure

Example pin data format:
```javascript
{
  pin: 1,
  name: "3V3",
  type: "power",
  voltage: "3.3V",
  description: "Power supply output",
  notes: "Can provide up to 500mA",
  category: ["power"]
},
{
  pin: 2,
  name: "EN",
  type: "input",
  voltage: "3.3V",
  description: "Enable (CHIP_PU)",
  alternateFunctions: ["Reset"],
  notes: "Active high. Pull high to enable chip. Connect 10kΩ pull-up to 3V3.",
  category: ["power", "special"]
},
{
  pin: 15,
  name: "GPIO13",
  type: "gpio",
  voltage: "3.3V",
  description: "General Purpose I/O",
  alternateFunctions: ["ADC2_CH4", "TOUCH4", "RTC_GPIO14", "MTCK", "HSPID", "SD_DATA3", "EMAC_RX_ER"],
  notes: "Safe to use. Supports PWM.",
  category: ["gpio", "adc", "touch", "spi"],
  strapping: false
}
```

### Variants to Support

Create diagrams for these ESP32 variants (prioritize in this order):
1. **ESP32-WROOM-32** (38-pin, most common)
2. **ESP32-WROOM-32D** (38-pin)
3. **ESP32-DevKitC** (30-pin development board)
4. **ESP32-S3-WROOM-1** (44-pin)
5. **ESP32-C3-MINI-1** (22-pin)
6. **ESP32-S2-MINI-1** (28-pin)

### Layout

```
┌─────────────────────────────────────┐
│  ESP32-WROOM-32 Pinout              │
├─────────────────────────────────────┤
│                                     │
│  [Filters: All | GPIO | I2C | ...]  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │    [SVG Chip Diagram]         │  │
│  │    Interactive pins            │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │
│  Selected Pin Details:              │
│  ┌─────────────────────────────┐   │
│  │ GPIO13 (Pin 15)             │   │
│  │ Voltage: 3.3V               │   │
│  │ Functions:                  │   │
│  │  • ADC2_CH4                 │   │
│  │  • TOUCH4                   │   │
│  │  • MTCK                     │   │
│  │ Notes: Safe to use          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## Performance Considerations

- Lazy load SVG diagrams
- Use CSS transforms for hover effects (not position changes)
- Debounce hover tooltips (100ms delay)
- Keep SVG DOM simple (minimal groups/paths)
- Cache pin lookup in JavaScript

## Responsive Design

### Desktop (>1024px)
- Diagram on left (60%)
- Details panel on right (40%)

### Tablet (640-1024px)
- Diagram full width
- Details panel below

### Mobile (<640px)
- Simplified diagram (larger touch targets)
- Details in modal/bottom sheet
- Fewer filter buttons (dropdown instead)

## Accessibility

- Keyboard navigation support
- ARIA labels for pins
- High contrast mode support
- Screen reader descriptions for each pin
