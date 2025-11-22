# ESP32 Reference Website - Project Setup

Create an ESP32 reference website that helps developers plan and wire ESP32 chips.

## Tech Stack
- Static site using React with Tailwind CSS
- Vite for build tooling
- Mobile responsive design
- Dark mode only

## Core Features

### 1. Home Page
- Overview of all ESP32 variants:
  - ESP32 (original)
  - ESP32-S2
  - ESP32-S3
  - ESP32-C3
  - ESP32-C6
  - ESP32-H2
- Card-based layout with key specs for each variant
- Quick links to detailed pages

### 2. Interactive Pinout Viewer
- Dedicated page for each ESP32 variant
- Interactive SVG or canvas-based chip diagram
- Click pins to see details:
  - Alternate functions
  - Voltage levels
  - Important notes/warnings
- Highlight pins by category:
  - Power pins
  - GPIO
  - Communication (I2C, SPI, UART)
  - ADC/DAC
  - Boot/strapping pins

### 3. Searchable Pin Reference
- Global search across all pins
- Filter by function type (I2C, SPI, ADC, PWM, etc.)
- Filter by variant
- Show all pins that support a specific peripheral

### 4. Comparison Table
- Side-by-side comparison of all variants
- Sortable and filterable columns
- Include:
  - CPU specs (cores, frequency)
  - Memory (Flash, PSRAM options)
  - Wireless capabilities
  - Peripheral counts
  - GPIO count
  - Power consumption
  - Package types

### 5. Common Wiring Examples
- Collection of frequently used circuits:
  - Power supply designs (3.3V regulation, decoupling capacitors)
  - USB-to-serial adapters (CP2102, CH340)
  - Programming header pinouts
  - I2C pullup configurations
  - SPI connections (SD card example)
  - Basic LED/button circuits
- Each with simple schematic and explanation

## Project Structure
```
esp32-reference/
├── src/
│   ├── components/
│   │   ├── PinoutDiagram.jsx
│   │   ├── ComparisonTable.jsx
│   │   ├── VariantCard.jsx
│   │   └── SearchBar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── VariantDetail.jsx
│   │   ├── Compare.jsx
│   │   └── Circuits.jsx
│   ├── data/
│   │   ├── variants.js
│   │   ├── pinouts.js
│   │   └── circuits.js
│   └── App.jsx
└── public/
```

## Getting Started
Start with the project structure and home page with variant cards.
