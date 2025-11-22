# Feature: ESP32 Variant Comparison Table

Create a comprehensive comparison matrix for all ESP32 variants.

## Specifications to Compare

### CPU & Processing
- CPU Architecture (Xtensa LX6, LX7, RISC-V)
- Number of cores (1 or 2)
- Clock frequency (MHz)
- SRAM (KB)
- ROM (KB)
- Flash (embedded or external)
- PSRAM support (Yes/No, max size)

### Wireless Connectivity
- WiFi (802.11 b/g/n)
- WiFi 6 support
- Bluetooth Classic
- Bluetooth Low Energy (BLE) version
- Zigbee/Thread support
- Long Range (LR) support

### Peripherals
- GPIO count
- ADC channels (number and resolution)
- DAC channels
- Touch sensor channels
- SPI interfaces
- I2C interfaces
- I2S interfaces
- UART interfaces
- PWM channels
- LED PWM channels
- CAN/TWAI interfaces
- USB support (Yes/No, USB-OTG/Serial-JTAG)
- Ethernet MAC
- SD/MMC host
- Camera interface

### Security
- Flash encryption
- Secure boot
- AES/SHA/RSA accelerators
- RNG (Random Number Generator)
- HMAC
- Digital signature

### Power
- Operating voltage (V)
- Typical power consumption (mA)
- Deep sleep current (μA)
- Light sleep current (mA)
- Power modes available

### Physical
- Package types available
- Operating temperature range
- Pin count

### Other
- Release year
- Current status (Active, NRND)
- Typical use cases
- Price range (approximate)

## Data Structure

```javascript
const variants = [
  {
    id: "esp32",
    name: "ESP32",
    fullName: "ESP32-WROOM-32",
    cpu: {
      architecture: "Xtensa LX6",
      cores: 2,
      clockSpeed: 240
    },
    memory: {
      sram: 520,
      rom: 448,
      flash: "4-16 MB (external)",
      psram: "Up to 8 MB"
    },
    wireless: {
      wifi: "802.11 b/g/n",
      bluetooth: "Classic + BLE 4.2",
      zigbee: false,
      thread: false
    },
    peripherals: {
      gpio: 34,
      adc: { channels: 18, resolution: "12-bit" },
      dac: 2,
      touch: 10,
      spi: 4,
      i2c: 2,
      uart: 3,
      pwm: 16,
      can: 1,
      usb: false,
      ethernet: true,
      camera: true
    },
    power: {
      voltage: "3.0-3.6V",
      active: "80-260 mA",
      deepSleep: "10 μA"
    },
    features: {
      flashEncryption: true,
      secureBoot: true,
      aesAccel: true
    },
    releaseYear: 2016,
    status: "Active",
    useCases: ["IoT", "Wearables", "General Purpose"],
    priceRange: "$2-4"
  },
  // ... more variants
];
```

## Table Features

### Sorting
- Click column headers to sort
- Ascending/descending toggle
- Visual indicator (arrow icon) for sort direction
- Default sort: by release year (newest first)

### Filtering
- Search box to filter by variant name
- Dropdown filters for:
  - WiFi support (All, WiFi 4, WiFi 6)
  - Bluetooth (All, Classic, BLE only, Both)
  - USB (All, With USB, Without)
  - Status (All, Active, NRND)
  - Use case tags

### Highlighting
- Hover row to highlight
- Click row to pin/highlight for comparison
- Select multiple rows (checkbox) for side-by-side view
- Color-code: Best value in each column (e.g., most GPIO, lowest power)

### Responsive Design
- Desktop: Full table
- Tablet: Horizontal scroll or accordion view
- Mobile: Card-based view (stack columns vertically per variant)

## Layout

### Desktop View
```
┌──────────────────────────────────────────────────┐
│  ESP32 Variant Comparison                        │
│  [Search: ___________]  [Filter ▼] [Filter ▼]   │
├──────────────────────────────────────────────────┤
│ Variant  │ CPU   │ Cores│ RAM │ WiFi │ BLE │...│
├──────────┼───────┼──────┼─────┼──────┼─────┼───┤
│ ESP32    │ LX6   │  2   │ 520 │  ✓   │ 4.2 │...│
│ ESP32-S2 │ LX7   │  1   │ 320 │  ✓   │  ✗  │...│
│ ESP32-S3 │ LX7   │  2   │ 512 │  ✓   │ 5.0 │...│
│ ESP32-C3 │RISC-V │  1   │ 400 │  ✓   │ 5.0 │...│
└──────────┴───────┴──────┴─────┴──────┴─────┴───┘
```

### Mobile Card View
```
┌─────────────────────────┐
│ ESP32-WROOM-32          │
├─────────────────────────┤
│ CPU: Xtensa LX6 (2 core)│
│ RAM: 520 KB             │
│ WiFi: 802.11 b/g/n      │
│ Bluetooth: Classic + BLE│
│ GPIO: 34 pins           │
│ USB: No                 │
│ Status: Active          │
└─────────────────────────┘
```

## Special Features

### "Best For" Recommendations
Add a quick guide at the top:
```
┌────────────────────────────────────────┐
│ Quick Recommendations:                 │
│ • Most GPIO pins → ESP32-S3            │
│ • Lowest power → ESP32-C6              │
│ • USB built-in → ESP32-S2/S3/C3        │
│ • Lowest cost → ESP32-C3               │
│ • WiFi 6 → ESP32-C6                    │
│ • Most versatile → ESP32-S3            │
└────────────────────────────────────────┘
```

### Visual Comparison Mode
- Select 2-4 variants
- Show them side-by-side in detail
- Highlight differences with color coding
- Green: Better spec
- Red: Weaker spec
- Yellow: Different but neither better

## Performance

- Render only visible rows (virtual scrolling for large tables)
- Cache filter/sort results
- Use CSS Grid or Flexbox (not tables) for better performance
- Lazy load comparison mode

## Accessibility

- Keyboard navigation through cells
- Screen reader support for table structure
- High contrast mode
- Sticky header when scrolling
- Mobile: Ensure touch targets are 44x44px minimum
