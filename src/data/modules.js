/**
 * ESP32 Module Data
 *
 * Information about different ESP32 module types from Espressif.
 * Modules are the packaged chips that include flash, antenna, and shielding.
 *
 * Module naming convention:
 * - WROOM: Standard module with flash only
 * - WROVER: Module with flash + PSRAM
 * - MINI: Compact form factor with integrated flash
 * - PICO: System-in-Package (SiP) with integrated flash/PSRAM
 *
 * Suffix meanings:
 * - No suffix: PCB antenna
 * - U: U.FL/IPEX external antenna connector
 * - E/B: Version revision (E is newer than D, etc.)
 * - I: Industrial temperature range (-40 to 85C)
 * - H: High-temperature (up to 105C)
 *
 * Part number format: ESP32-[VARIANT]-[TYPE]-[VERSION][ANTENNA]-[MEMORY]
 * Example: ESP32-S3-WROOM-1-N8R8
 *   - ESP32-S3: Chip variant
 *   - WROOM-1: Module type
 *   - N8R8: 8MB flash (N8) + 8MB PSRAM (R8)
 */

export const modules = [
  // ============================================
  // ORIGINAL ESP32 MODULES
  // ============================================
  {
    id: 'esp32-wroom-32e',
    name: 'ESP32-WROOM-32E',
    variant: 'esp32',
    type: 'WROOM',
    description: 'Most popular ESP32 module. Standard flash, no PSRAM.',
    status: 'Active',
    dimensions: {
      length: 25.5,
      width: 18.0,
      height: 3.1,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB', '16 MB'],
      flashDefault: '4 MB',
      psram: null,
    },
    antenna: {
      type: 'PCB',
      gain: '2.0 dBi',
    },
    temperature: {
      operating: '-40°C to 85°C',
      storage: '-40°C to 90°C',
    },
    certifications: ['FCC', 'CE', 'SRRC', 'IC', 'KCC', 'NCC', 'MIC', 'TELEC'],
    partNumbers: [
      { pn: 'ESP32-WROOM-32E-N4', flash: '4 MB', psram: null },
      { pn: 'ESP32-WROOM-32E-N8', flash: '8 MB', psram: null },
      { pn: 'ESP32-WROOM-32E-N16', flash: '16 MB', psram: null },
    ],
    predecessors: ['ESP32-WROOM-32', 'ESP32-WROOM-32D'],
    notes: 'Replaces WROOM-32D. Uses ESP32-D0WD-V3 chip with improved power consumption.',
    pinCompatibility: 'esp32-wroom-32',
    availableGPIO: [0, 1, 2, 3, 4, 5, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33, 34, 35, 36, 39],
    reservedPins: {
      flash: [6, 7, 8, 9, 10, 11],
      note: 'GPIO 6-11 are connected to internal flash and must not be used.',
    },
  },
  {
    id: 'esp32-wroom-32ue',
    name: 'ESP32-WROOM-32UE',
    variant: 'esp32',
    type: 'WROOM',
    description: 'WROOM-32E with external antenna connector.',
    status: 'Active',
    dimensions: {
      length: 19.2,
      width: 18.0,
      height: 3.2,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB', '16 MB'],
      flashDefault: '4 MB',
      psram: null,
    },
    antenna: {
      type: 'U.FL/IPEX',
      connector: 'U.FL',
      note: 'External antenna required',
    },
    certifications: ['FCC', 'CE', 'SRRC', 'IC'],
    partNumbers: [
      { pn: 'ESP32-WROOM-32UE-N4', flash: '4 MB', psram: null },
      { pn: 'ESP32-WROOM-32UE-N8', flash: '8 MB', psram: null },
      { pn: 'ESP32-WROOM-32UE-N16', flash: '16 MB', psram: null },
    ],
    notes: 'Smaller than PCB antenna version. Ideal for metal enclosures or long-range applications.',
    pinCompatibility: 'esp32-wroom-32',
  },
  {
    id: 'esp32-wrover-e',
    name: 'ESP32-WROVER-E',
    variant: 'esp32',
    type: 'WROVER',
    description: 'ESP32 module with 8MB PSRAM for memory-intensive applications.',
    status: 'Active',
    dimensions: {
      length: 31.4,
      width: 18.0,
      height: 3.3,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB', '16 MB'],
      flashDefault: '8 MB',
      psram: '8 MB',
      psramType: 'Quad SPI PSRAM',
      psramVoltage: '3.3V',
      psramSpeed: '133 MHz max',
    },
    antenna: {
      type: 'PCB',
      gain: '2.0 dBi',
    },
    temperature: {
      operating: '-40°C to 85°C',
    },
    certifications: ['FCC', 'CE', 'SRRC', 'IC', 'KCC', 'NCC', 'MIC', 'TELEC'],
    partNumbers: [
      { pn: 'ESP32-WROVER-E-N4R8', flash: '4 MB', psram: '8 MB' },
      { pn: 'ESP32-WROVER-E-N8R8', flash: '8 MB', psram: '8 MB' },
      { pn: 'ESP32-WROVER-E-N16R8', flash: '16 MB', psram: '8 MB' },
    ],
    predecessors: ['ESP32-WROVER', 'ESP32-WROVER-B'],
    notes: 'GPIO 16/17 are used for PSRAM and NOT available. Required for camera applications.',
    pinCompatibility: 'esp32-wrover',
    availableGPIO: [0, 1, 2, 3, 4, 5, 12, 13, 14, 15, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33, 34, 35, 36, 39],
    reservedPins: {
      flash: [6, 7, 8, 9, 10, 11],
      psram: [16, 17],
      note: 'GPIO 6-11 for flash, GPIO 16-17 for PSRAM.',
    },
    useCases: ['Camera streaming', 'AI/ML inference', 'Web servers', 'Large displays'],
  },
  {
    id: 'esp32-wrover-ie',
    name: 'ESP32-WROVER-IE',
    variant: 'esp32',
    type: 'WROVER',
    description: 'WROVER-E with external antenna connector.',
    status: 'Active',
    dimensions: {
      length: 31.4,
      width: 18.0,
      height: 3.3,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB', '16 MB'],
      psram: '8 MB',
    },
    antenna: {
      type: 'U.FL/IPEX',
      connector: 'U.FL',
    },
    partNumbers: [
      { pn: 'ESP32-WROVER-IE-N4R8', flash: '4 MB', psram: '8 MB' },
      { pn: 'ESP32-WROVER-IE-N8R8', flash: '8 MB', psram: '8 MB' },
    ],
    notes: 'For metal enclosures or when external high-gain antenna is needed.',
    pinCompatibility: 'esp32-wrover',
  },
  {
    id: 'esp32-mini-1',
    name: 'ESP32-MINI-1',
    variant: 'esp32',
    type: 'MINI',
    description: 'Compact module with integrated flash in chip.',
    status: 'Active',
    dimensions: {
      length: 15.4,
      width: 20.5,
      height: 2.4,
      unit: 'mm',
    },
    memory: {
      flash: '4 MB',
      flashType: 'Embedded in chip',
      psram: null,
    },
    antenna: {
      type: 'PCB',
    },
    chip: 'ESP32-U4WDH',
    notes: 'Smallest ESP32 module. Flash is embedded in chip, not separate IC.',
    useCases: ['Wearables', 'Space-constrained designs'],
  },

  // ============================================
  // ESP32-S2 MODULES
  // ============================================
  {
    id: 'esp32-s2-wroom',
    name: 'ESP32-S2-WROOM',
    variant: 'esp32-s2',
    type: 'WROOM',
    description: 'Standard S2 module with native USB support.',
    status: 'Active',
    dimensions: {
      length: 25.5,
      width: 18.0,
      height: 3.1,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB'],
      flashDefault: '4 MB',
      psram: null,
    },
    antenna: {
      type: 'PCB',
    },
    features: ['Native USB OTG', 'No Bluetooth'],
    partNumbers: [
      { pn: 'ESP32-S2-WROOM-N4', flash: '4 MB', psram: null },
    ],
    notes: 'Single-core Xtensa LX7 at 240 MHz. No Bluetooth.',
  },
  {
    id: 'esp32-s2-mini-1',
    name: 'ESP32-S2-MINI-1',
    variant: 'esp32-s2',
    type: 'MINI',
    description: 'Compact S2 module with embedded flash.',
    status: 'Active',
    dimensions: {
      length: 15.4,
      width: 15.4,
      height: 2.4,
      unit: 'mm',
    },
    memory: {
      flash: '4 MB',
      flashType: 'Embedded',
      psram: null,
    },
    chip: 'ESP32-S2FN4R2',
    notes: 'Very compact. Good for USB HID devices.',
    useCases: ['USB devices', 'HID keyboards/mice', 'Touch interfaces'],
  },

  // ============================================
  // ESP32-S3 MODULES
  // ============================================
  {
    id: 'esp32-s3-wroom-1',
    name: 'ESP32-S3-WROOM-1',
    variant: 'esp32-s3',
    type: 'WROOM',
    description: 'Standard S3 module. Available with Quad or Octal flash/PSRAM.',
    status: 'Active',
    dimensions: {
      length: 25.5,
      width: 18.0,
      height: 3.1,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB', '16 MB'],
      flashDefault: '8 MB',
      flashType: 'Quad SPI',
      psram: [null, '2 MB', '8 MB'],
      psramType: 'Quad or Octal SPI',
    },
    antenna: {
      type: 'PCB',
      gain: '2.0 dBi',
    },
    partNumbers: [
      { pn: 'ESP32-S3-WROOM-1-N4', flash: '4 MB', psram: null },
      { pn: 'ESP32-S3-WROOM-1-N8', flash: '8 MB', psram: null },
      { pn: 'ESP32-S3-WROOM-1-N16', flash: '16 MB', psram: null },
      { pn: 'ESP32-S3-WROOM-1-N8R2', flash: '8 MB', psram: '2 MB (Quad)' },
      { pn: 'ESP32-S3-WROOM-1-N8R8', flash: '8 MB', psram: '8 MB (Octal)' },
      { pn: 'ESP32-S3-WROOM-1-N16R8', flash: '16 MB', psram: '8 MB (Octal)' },
    ],
    features: ['AI vector instructions', 'USB OTG', 'BLE 5.0'],
    notes: 'Octal PSRAM variants (R8) use GPIO35-37 for PSRAM - these pins unavailable.',
    useCases: ['AI/ML', 'Camera', 'Display', 'Voice'],
    reservedPins: {
      octalPsram: [35, 36, 37],
      note: 'GPIO 35-37 reserved ONLY on Octal PSRAM modules (N*R8).',
    },
  },
  {
    id: 'esp32-s3-wroom-1u',
    name: 'ESP32-S3-WROOM-1U',
    variant: 'esp32-s3',
    type: 'WROOM',
    description: 'S3 WROOM with external antenna connector.',
    status: 'Active',
    dimensions: {
      length: 25.5,
      width: 18.0,
      height: 3.1,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB', '16 MB'],
      psram: [null, '2 MB', '8 MB'],
    },
    antenna: {
      type: 'U.FL/IPEX',
    },
    notes: 'For metal enclosures or external antenna applications.',
  },
  {
    id: 'esp32-s3-wroom-2',
    name: 'ESP32-S3-WROOM-2',
    variant: 'esp32-s3',
    type: 'WROOM',
    description: 'S3 module with high-capacity Octal flash.',
    status: 'Active',
    dimensions: {
      length: 25.5,
      width: 18.0,
      height: 3.1,
      unit: 'mm',
    },
    memory: {
      flash: '32 MB',
      flashType: 'Octal SPI',
      psram: '8 MB',
      psramType: 'Octal SPI',
    },
    partNumbers: [
      { pn: 'ESP32-S3-WROOM-2-N32R8V', flash: '32 MB', psram: '8 MB' },
    ],
    notes: 'Maximum memory configuration. Octal flash at up to 120 MHz.',
    useCases: ['Large firmware', 'OTA with fallback', 'Asset-heavy applications'],
  },
  {
    id: 'esp32-s3-mini-1',
    name: 'ESP32-S3-MINI-1',
    variant: 'esp32-s3',
    type: 'MINI',
    description: 'Compact S3 module with embedded flash.',
    status: 'Active',
    dimensions: {
      length: 15.4,
      width: 15.4,
      height: 2.4,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB'],
      flashType: 'Embedded in chip',
      psram: null,
    },
    chip: 'ESP32-S3FN8',
    partNumbers: [
      { pn: 'ESP32-S3-MINI-1-N4', flash: '4 MB', psram: null },
      { pn: 'ESP32-S3-MINI-1-N8', flash: '8 MB', psram: null },
    ],
    notes: 'No PSRAM option. For size-constrained designs.',
    useCases: ['Compact devices', 'USB peripherals'],
  },

  // ============================================
  // ESP32-C3 MODULES
  // ============================================
  {
    id: 'esp32-c3-wroom-02',
    name: 'ESP32-C3-WROOM-02',
    variant: 'esp32-c3',
    type: 'WROOM',
    description: 'Standard C3 WROOM module with RISC-V core.',
    status: 'Active',
    dimensions: {
      length: 18.0,
      width: 20.0,
      height: 3.2,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB'],
      flashDefault: '4 MB',
      psram: null,
    },
    antenna: {
      type: 'PCB',
    },
    features: ['RISC-V', 'BLE 5.0', 'Native USB Serial/JTAG'],
    partNumbers: [
      { pn: 'ESP32-C3-WROOM-02-N4', flash: '4 MB', psram: null },
      { pn: 'ESP32-C3-WROOM-02-H4', flash: '4 MB', psram: null, temp: 'High temp' },
    ],
    notes: 'Single-core 160 MHz RISC-V. No touch sensors. Good ESP8266 replacement.',
    useCases: ['Simple IoT', 'Cost-sensitive', 'ESP8266 upgrades'],
  },
  {
    id: 'esp32-c3-mini-1',
    name: 'ESP32-C3-MINI-1',
    variant: 'esp32-c3',
    type: 'MINI',
    description: 'Ultra-compact C3 module.',
    status: 'Active',
    dimensions: {
      length: 13.2,
      width: 16.6,
      height: 2.4,
      unit: 'mm',
    },
    memory: {
      flash: '4 MB',
      flashType: 'Embedded',
      psram: null,
    },
    chip: 'ESP32-C3FN4',
    antenna: {
      type: 'PCB',
    },
    partNumbers: [
      { pn: 'ESP32-C3-MINI-1-N4', flash: '4 MB', psram: null },
      { pn: 'ESP32-C3-MINI-1U-N4', flash: '4 MB', psram: null, antenna: 'U.FL' },
    ],
    notes: 'Smallest C3 module. Powers the popular "SuperMini" boards.',
    useCases: ['Wearables', 'Ultra-compact IoT'],
  },

  // ============================================
  // ESP32-C6 MODULES
  // ============================================
  {
    id: 'esp32-c6-wroom-1',
    name: 'ESP32-C6-WROOM-1',
    variant: 'esp32-c6',
    type: 'WROOM',
    description: 'WiFi 6 + Thread/Zigbee module.',
    status: 'Active',
    dimensions: {
      length: 25.5,
      width: 18.0,
      height: 3.1,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB'],
      flashDefault: '8 MB',
      psram: null,
    },
    antenna: {
      type: 'PCB',
    },
    features: ['WiFi 6 (802.11ax)', 'BLE 5.0', 'Thread', 'Zigbee', 'Matter ready'],
    partNumbers: [
      { pn: 'ESP32-C6-WROOM-1-N4', flash: '4 MB', psram: null },
      { pn: 'ESP32-C6-WROOM-1-N8', flash: '8 MB', psram: null },
    ],
    notes: 'First WiFi 6 ESP32 module. Note: WiFi 6 is 2.4 GHz only, not 5 GHz.',
    useCases: ['Smart home', 'Matter devices', 'Thread border routers'],
  },
  {
    id: 'esp32-c6-mini-1',
    name: 'ESP32-C6-MINI-1',
    variant: 'esp32-c6',
    type: 'MINI',
    description: 'Compact WiFi 6 module.',
    status: 'Active',
    dimensions: {
      length: 13.2,
      width: 16.6,
      height: 2.4,
      unit: 'mm',
    },
    memory: {
      flash: '4 MB',
      flashType: 'Embedded',
      psram: null,
    },
    chip: 'ESP32-C6FN4',
    partNumbers: [
      { pn: 'ESP32-C6-MINI-1-N4', flash: '4 MB', psram: null },
    ],
    notes: 'Smallest WiFi 6 + Thread/Zigbee module.',
  },

  // ============================================
  // ESP32-H2 MODULES
  // ============================================
  {
    id: 'esp32-h2-mini-1',
    name: 'ESP32-H2-MINI-1',
    variant: 'esp32-h2',
    type: 'MINI',
    description: 'Thread/Zigbee-only module with no WiFi.',
    status: 'Active',
    dimensions: {
      length: 13.2,
      width: 16.6,
      height: 2.4,
      unit: 'mm',
    },
    memory: {
      flash: '4 MB',
      flashType: 'Embedded',
      psram: null,
    },
    chip: 'ESP32-H2FN4',
    features: ['BLE 5.0', 'Thread 1.3', 'Zigbee 3.0', 'Matter end node', 'NO WiFi'],
    partNumbers: [
      { pn: 'ESP32-H2-MINI-1-N4', flash: '4 MB', psram: null },
    ],
    notes: 'Purpose-built for Thread/Zigbee mesh networks. Requires WiFi companion for internet.',
    useCases: ['Thread end nodes', 'Zigbee sensors', 'Battery-powered devices', 'Matter end devices'],
  },

  // ============================================
  // ESP32-C5 MODULES (New 2025)
  // ============================================
  {
    id: 'esp32-c5-wroom-1',
    name: 'ESP32-C5-WROOM-1',
    variant: 'esp32-c5',
    type: 'WROOM',
    description: 'First dual-band WiFi 6 (2.4/5 GHz) module.',
    status: 'Active',
    dimensions: {
      length: 25.5,
      width: 18.0,
      height: 3.1,
      unit: 'mm',
    },
    memory: {
      flash: ['4 MB', '8 MB'],
      flashDefault: '4 MB',
      psram: 'Supported (external)',
    },
    antenna: {
      type: 'PCB',
    },
    features: [
      'Dual-band WiFi 6 (2.4 + 5 GHz)',
      'BLE 5.0',
      'Thread',
      'Zigbee',
      '240 MHz RISC-V',
      'LP core (40 MHz)',
    ],
    partNumbers: [
      { pn: 'ESP32-C5-WROOM-1-N4', flash: '4 MB', psram: null },
      { pn: 'ESP32-C5-WROOM-1-N8', flash: '8 MB', psram: null },
    ],
    notes: 'Industry first RISC-V SoC with dual-band WiFi 6. Mass production started April 2025.',
    useCases: ['Low-latency IoT', '5 GHz applications', 'Congested 2.4 GHz environments'],
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getModule(id) {
  return modules.find(m => m.id === id)
}

export function getModulesByVariant(variantId) {
  return modules.filter(m => m.variant === variantId)
}

export function getModulesByType(type) {
  return modules.filter(m => m.type.toUpperCase() === type.toUpperCase())
}

export function getModulesWithPSRAM() {
  return modules.filter(m => m.memory.psram && m.memory.psram !== null)
}

export function getActiveModules() {
  return modules.filter(m => m.status === 'Active')
}

export function searchModules(query) {
  const q = query.toLowerCase()
  return modules.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.variant.toLowerCase().includes(q) ||
    m.description.toLowerCase().includes(q) ||
    (m.partNumbers || []).some(pn => pn.pn.toLowerCase().includes(q))
  )
}

// Module types with descriptions
export const moduleTypes = {
  WROOM: {
    name: 'WROOM',
    description: 'Standard module with external SPI flash. Most common form factor.',
    sizes: 'Typically 25.5 x 18 mm',
  },
  WROVER: {
    name: 'WROVER',
    description: 'Module with both flash and PSRAM. Required for camera/memory-intensive apps.',
    sizes: 'Typically 31.4 x 18 mm (larger due to PSRAM)',
  },
  MINI: {
    name: 'MINI',
    description: 'Compact module with embedded flash inside the chip. Smallest form factor.',
    sizes: 'Typically 13-16 x 15-17 mm',
  },
  PICO: {
    name: 'PICO',
    description: 'System-in-Package with chip, flash, and PSRAM in single package. Ultra-compact.',
    sizes: 'Typically 7 x 7 mm (chip-scale)',
  },
}

// Get modules comparison by variant
export function getModuleComparison(variantId) {
  const variantModules = getModulesByVariant(variantId)
  return {
    variant: variantId,
    modules: variantModules.map(m => ({
      name: m.name,
      type: m.type,
      flash: m.memory.flashDefault || m.memory.flash,
      psram: m.memory.psram,
      antenna: m.antenna?.type,
      dimensions: m.dimensions ? `${m.dimensions.length}x${m.dimensions.width}mm` : 'N/A',
    })),
  }
}

// Part number decoder
export function decodePartNumber(partNumber) {
  const parts = partNumber.split('-')
  const result = {
    original: partNumber,
    chip: null,
    variant: null,
    type: null,
    version: null,
    memory: null,
    antenna: 'PCB',
  }

  // Find variant (ESP32, ESP32-S3, ESP32-C3, etc.)
  if (parts[0] === 'ESP32') {
    if (parts[1] && parts[1].match(/^[A-Z][0-9]$/)) {
      result.variant = `${parts[0]}-${parts[1]}`
      result.chip = result.variant
    } else {
      result.variant = 'ESP32'
      result.chip = 'ESP32'
    }
  }

  // Find type (WROOM, WROVER, MINI)
  const typeMatch = partNumber.match(/(WROOM|WROVER|MINI|PICO)/i)
  if (typeMatch) {
    result.type = typeMatch[1].toUpperCase()
  }

  // Find antenna (U suffix)
  if (partNumber.includes('-U') || partNumber.match(/\dU-/)) {
    result.antenna = 'U.FL/IPEX'
  }

  // Find memory (N4, N8, N16, R2, R8, etc.)
  const memMatch = partNumber.match(/-([NH])(\d+)(R(\d+))?/)
  if (memMatch) {
    result.memory = {
      flash: `${memMatch[2]} MB`,
      psram: memMatch[4] ? `${memMatch[4]} MB` : null,
    }
  }

  return result
}
