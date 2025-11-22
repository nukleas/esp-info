# Feature: Common Wiring Examples & Circuits

Create a library of frequently used circuits and wiring configurations for ESP32.

## Circuit Categories

### 1. Power Supply Circuits

#### 3.3V Linear Regulator
- Schematic with AMS1117-3.3
- Input/output capacitors (10μF)
- Heat dissipation notes
- Maximum current rating

#### 5V to 3.3V with LDO
- LDO options (LD1117, AMS1117, MCP1700)
- Dropout voltage considerations
- Decoupling capacitors placement

#### USB Power Input
- USB Type-C or Micro-B connector
- ESD protection (optional)
- Polyfuse for overcurrent protection
- Power indicator LED

#### Decoupling Capacitor Placement
- Bulk capacitor (10-100μF) at input
- Ceramic (100nF) near each power pin
- Placement diagram

### 2. Programming & Debug

#### USB-to-Serial Adapter (CP2102/CH340)
- RX/TX connections
- DTR/RTS for auto-reset and boot mode
- Circuit diagram with transistors
- Alternative: Direct USB connection (for S2/S3/C3)

#### Programming Header
- 6-pin or 4-pin header pinout
- GND, TX, RX, 3V3, EN, GPIO0
- Auto-programming circuit

#### JTAG Debugging Interface
- 20-pin or 10-pin JTAG connector
- Pin mapping for ESP32 variants
- FT2232H or ESP-Prog connections

### 3. Boot Mode & Reset

#### Boot Mode Selection
- GPIO0 pull-up/down for boot modes
- Push button for manual boot mode
- Auto-boot circuit with transistors

#### Reset Button
- EN pin with pull-up resistor (10kΩ)
- Momentary push button to GND
- Debouncing capacitor (optional)

### 4. Communication Interfaces

#### I2C Bus
- SDA/SCL pull-up resistors (4.7kΩ typical)
- Multiple device connection
- Level shifter for 5V devices (optional)
- Bus capacitance considerations

#### SPI Bus
- MOSI, MISO, CLK, CS connections
- Multiple CS for device selection
- Logic level considerations
- Common SPI devices (SD card, displays)

#### SD Card Interface
- SPI mode wiring
- SDMMC mode wiring (4-bit)
- Pull-up resistors
- Card detect pin (optional)

#### UART Connection
- Basic TX/RX connection
- Level shifting for 5V devices
- Flow control (RTS/CTS) optional

### 5. Sensors & Inputs

#### Basic Button Input
- GPIO with pull-up resistor
- Debouncing circuit (RC or software)
- External interrupt configuration

#### Analog Input (ADC)
- Voltage divider for >3.3V inputs
- RC filter for noise reduction
- ADC reference considerations

#### Touch Sensor
- Touch-capable GPIO pins
- No external components needed
- Optional capacitor for sensitivity

### 6. Outputs & Actuators

#### LED Circuit
- Current limiting resistor calculation
- High-brightness LED with transistor
- WS2812B RGB LED (NeoPixel) connection

#### Relay Module
- GPIO to relay module
- Optocoupler isolation
- Flyback diode for inductive loads
- Power supply considerations

#### Motor Driver (L298N/DRV8833)
- PWM control connections
- Direction control
- Separate motor power supply
- Back-EMF protection

#### Servo Motor
- PWM signal wire to GPIO
- Separate 5V power supply
- Common ground connection

### 7. Wireless Antenna

#### PCB Antenna (Built-in)
- Keep-out zone requirements
- Ground plane considerations
- Orientation notes

#### External Antenna (U.FL connector)
- U.FL connector placement
- Antenna selection (2.4 GHz)
- Cable length limitations

## Circuit Card Template

Each circuit should include:

```
┌─────────────────────────────────────────┐
│ Circuit Title                           │
├─────────────────────────────────────────┤
│                                         │
│  [Schematic Diagram - SVG or Image]     │
│                                         │
├─────────────────────────────────────────┤
│ Components:                             │
│  • Component 1 - Value/Part Number      │
│  • Component 2 - Value/Part Number      │
│                                         │
│ Connections:                            │
│  1. ESP32 Pin → Component               │
│  2. Component → Component               │
│                                         │
│ Notes & Warnings:                       │
│  ⚠ Important consideration              │
│  💡 Tip or best practice                │
│                                         │
│ [Example Code Snippet - Optional]       │
│                                         │
│ Tested with: ESP32, ESP32-S3, etc.      │
└─────────────────────────────────────────┘
```

## Schematic Representation

### Options for Displaying Schematics:

1. **SVG Diagrams** (Recommended)
   - Clean, scalable
   - Can be interactive (highlight connections on hover)
   - Easy to style with CSS

2. **ASCII Art** (For simple circuits)
   - Good for very basic connections
   - Readable in any context
   - No image loading

3. **Image Files** (PNG/JPG)
   - Use for complex circuits
   - Ensure high resolution
   - Optimize file size

### Example ASCII Circuit:
```
USB-to-Serial Auto-Programming:

         USB Adapter                    ESP32
         ┌──────────┐                  ┌──────┐
    5V ──┤VCC    DTR├──┬──[10kΩ]──VCC ─┤EN    │
         │          │  │               │      │
         │          │  └──[100nF]──────┤GPIO0 │
    GND ─┤GND    RTS├──┬──[10kΩ]──VCC │      │
         │          │  │               │      │
    TX ──┤RX     TX ├──┼───────────────┤RX    │
         │          │  │               │      │
    RX ──┤TX     RX ├──┘───────────────┤TX    │
         └──────────┘                  └──────┘

Note: When DTR and RTS toggle, EN and GPIO0 
enter bootloader mode automatically.
```

## Interactive Features

### Component Value Calculator
For circuits with calculated values:
- Resistor value calculator for LED circuits
- Voltage divider calculator for ADC
- Pull-up resistor calculator for I2C based on capacitance

### Copy-Paste Code Snippets
Provide ready-to-use code for each circuit:
```cpp
// Example: Basic Button with Interrupt
const int BUTTON_PIN = 4;
volatile bool buttonPressed = false;

void IRAM_ATTR buttonISR() {
  buttonPressed = true;
}

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), 
                  buttonISR, FALLING);
}
```

## Organization

### Navigation
- Category tabs or sidebar
- Search functionality
- Tags for filtering (e.g., "beginner", "power", "sensor")

### Difficulty Levels
- 🟢 Beginner (basic LED, button)
- 🟡 Intermediate (I2C, SPI)
- 🔴 Advanced (JTAG, custom power)

### Completeness Indicators
- ✅ Complete schematic
- ✅ Parts list included
- ✅ Code example included
- ✅ Tested on hardware

## Responsive Design

### Desktop
- 2-column layout (schematic + details side-by-side)
- Larger schematics visible

### Mobile
- Single column (schematic full width, then details)
- Tap schematic to zoom
- Collapsible sections

## Performance

- Lazy load schematics (especially images)
- Use SVG when possible (smaller file size)
- Cache rendered diagrams
- Infinite scroll or pagination for large circuit library

## Contribution-Friendly

Design with future community contributions in mind:
- Standardized format for circuit data
- JSON/markdown for easy editing
- Clear template for new circuits
- Validation checklist
