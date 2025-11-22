/**
 * ESP32 Quick Reference Data
 *
 * Useful formulas, boot modes, specifications, and quick lookup tables.
 */

// ============================================
// BOOT MODE REFERENCE
// ============================================

export const bootModes = {
  esp32: {
    name: 'ESP32',
    strappingPins: ['GPIO0', 'GPIO2', 'GPIO5', 'GPIO12', 'GPIO15'],
    modes: [
      {
        name: 'Normal Boot (SPI Flash)',
        description: 'Boot from internal flash memory',
        pins: { GPIO0: 'HIGH', GPIO2: 'any', GPIO5: 'HIGH', GPIO12: 'LOW', GPIO15: 'HIGH' },
        default: true,
      },
      {
        name: 'Download Mode (Bootloader)',
        description: 'Serial programming mode via UART',
        pins: { GPIO0: 'LOW', GPIO2: 'LOW/floating', GPIO5: 'HIGH', GPIO12: 'LOW', GPIO15: 'HIGH' },
        howToEnter: 'Hold BOOT, press RESET, release BOOT',
      },
    ],
    pinDetails: {
      GPIO0: {
        description: 'Boot mode select',
        internalPullup: true,
        bootValue: 'HIGH = normal boot, LOW = download mode',
        safeToUse: 'Yes, with caution (avoid pulling LOW at boot)',
      },
      GPIO2: {
        description: 'Boot mode modifier',
        internalPulldown: true,
        bootValue: 'Must be LOW or floating for download mode',
        safeToUse: 'Yes, often connected to onboard LED',
      },
      GPIO5: {
        description: 'SDIO timing',
        internalPullup: true,
        bootValue: 'HIGH for normal boot',
        safeToUse: 'Yes (outputs PWM signal at boot)',
      },
      GPIO12: {
        description: 'Flash voltage select (MTDI)',
        internalPulldown: true,
        bootValue: 'LOW = 3.3V flash, HIGH = 1.8V flash',
        safeToUse: 'Caution - wrong value prevents boot',
        note: 'Can be burned via eFuse to ignore',
      },
      GPIO15: {
        description: 'Debug log output control (MTDO)',
        internalPullup: true,
        bootValue: 'HIGH = enable UART debug output',
        safeToUse: 'Yes (outputs PWM signal at boot)',
      },
    },
  },
  'esp32-s3': {
    name: 'ESP32-S3',
    strappingPins: ['GPIO0', 'GPIO3', 'GPIO45', 'GPIO46'],
    modes: [
      {
        name: 'Normal Boot (SPI Flash)',
        pins: { GPIO0: 'HIGH', GPIO3: 'any', GPIO45: 'LOW', GPIO46: 'any' },
        default: true,
      },
      {
        name: 'Download Mode (USB/UART)',
        pins: { GPIO0: 'LOW', GPIO3: 'any', GPIO45: 'LOW', GPIO46: 'any' },
        howToEnter: 'Hold BOOT, press RESET, release BOOT',
      },
    ],
    pinDetails: {
      GPIO0: {
        description: 'Boot mode select',
        bootValue: 'HIGH = normal, LOW = download',
      },
      GPIO3: {
        description: 'JTAG signal source select',
        bootValue: 'LOW = JTAG from strapping, HIGH = JTAG from eFuse',
      },
      GPIO45: {
        description: 'VDD_SPI voltage select',
        bootValue: 'LOW = 3.3V, HIGH = 1.8V',
      },
      GPIO46: {
        description: 'Boot ROM log verbosity',
        bootValue: 'LOW = verbose, HIGH = quiet',
        inputOnly: true,
      },
    },
  },
  'esp32-c3': {
    name: 'ESP32-C3',
    strappingPins: ['GPIO2', 'GPIO8', 'GPIO9'],
    modes: [
      {
        name: 'Normal Boot (SPI Flash)',
        pins: { GPIO2: 'any', GPIO8: 'any (not 0,0 with GPIO9)', GPIO9: 'HIGH' },
        default: true,
      },
      {
        name: 'Download Mode (USB/UART)',
        pins: { GPIO2: 'HIGH', GPIO8: 'HIGH', GPIO9: 'LOW' },
        howToEnter: 'Hold BOOT (GPIO9), press RESET, release BOOT',
      },
    ],
    pinDetails: {
      GPIO2: {
        description: 'Boot mode select',
        bootValue: 'Affects boot mode with GPIO8/9',
      },
      GPIO8: {
        description: 'Boot mode / ROM messages',
        bootValue: 'LOW = print ROM messages',
        note: 'Default I2C SDA',
      },
      GPIO9: {
        description: 'Boot source select',
        internalPullup: true,
        bootValue: 'LOW = download mode',
        note: 'Default I2C SCL, connected to BOOT button',
      },
    },
    invalidCombination: { GPIO8: 'LOW', GPIO9: 'LOW', note: 'This combination causes unexpected behavior' },
  },
  'esp32-c6': {
    name: 'ESP32-C6',
    strappingPins: ['GPIO8', 'GPIO9', 'GPIO15'],
    modes: [
      {
        name: 'Normal Boot',
        pins: { GPIO8: 'any', GPIO9: 'HIGH', GPIO15: 'any' },
        default: true,
      },
      {
        name: 'Download Mode',
        pins: { GPIO8: 'any', GPIO9: 'LOW', GPIO15: 'any' },
        howToEnter: 'Hold BOOT (GPIO9), press RESET, release BOOT',
      },
    ],
  },
}

// ============================================
// ELECTRICAL SPECIFICATIONS
// ============================================

export const electricalSpecs = {
  gpio: {
    maxVoltage: 3.3,
    maxVoltageTolerant: false,
    absoluteMax: 3.6,
    warning: 'ESP32 GPIOs are NOT 5V tolerant. 5V will cause permanent damage.',
    outputCurrent: {
      max: 40,
      recommended: 20,
      unit: 'mA',
      note: 'Per GPIO pin. Total chip current also limited.',
    },
    inputCurrent: {
      max: 50,
      unit: 'µA',
      note: 'Input leakage current',
    },
    internalPullup: {
      typical: 45,
      unit: 'kΩ',
      range: '30-80 kΩ',
    },
    internalPulldown: {
      typical: 45,
      unit: 'kΩ',
      range: '30-80 kΩ',
    },
  },
  power: {
    vdd: {
      min: 3.0,
      typical: 3.3,
      max: 3.6,
      unit: 'V',
    },
    current: {
      active: { min: 80, max: 240, unit: 'mA', note: 'Depends on CPU freq and peripherals' },
      wifiTx: { peak: 380, unit: 'mA', note: 'WiFi transmission peak' },
      modemSleep: { typical: 20, unit: 'mA' },
      lightSleep: { typical: 0.8, unit: 'mA' },
      deepSleep: { typical: 10, unit: 'µA' },
      hibernation: { typical: 5, unit: 'µA' },
    },
  },
  adc: {
    resolution: 12,
    maxResolution: 12,
    range: { min: 0, max: 4095 },
    inputVoltage: {
      '0dB': { max: 1.1, unit: 'V', note: 'Most accurate' },
      '2.5dB': { max: 1.5, unit: 'V' },
      '6dB': { max: 2.2, unit: 'V' },
      '11dB': { max: 3.3, unit: 'V', note: 'Full range, less accurate' },
    },
    note: 'ESP32 ADC has non-linearity at extremes. Calibrate for accuracy.',
  },
  dac: {
    resolution: 8,
    channels: 2,
    pins: [25, 26],
    outputVoltage: { min: 0, max: 3.3, unit: 'V' },
  },
}

// ============================================
// USEFUL FORMULAS
// ============================================

export const formulas = {
  ledResistor: {
    name: 'LED Current Limiting Resistor',
    formula: 'R = (Vsource - Vf) / If',
    variables: {
      R: 'Resistor value (Ω)',
      Vsource: 'Supply voltage (3.3V for ESP32)',
      Vf: 'LED forward voltage (varies by color)',
      If: 'Desired LED current (typically 5-20mA)',
    },
    typicalVf: {
      red: 2.0,
      orange: 2.1,
      yellow: 2.1,
      green: 2.2,
      blue: 3.0,
      white: 3.2,
      unit: 'V',
    },
    example: {
      description: 'Red LED at 10mA from 3.3V',
      calculation: '(3.3 - 2.0) / 0.010 = 130Ω',
      recommendation: 'Use 150Ω (next standard value up)',
    },
  },
  voltageDivider: {
    name: 'Voltage Divider',
    formula: 'Vout = Vin × (R2 / (R1 + R2))',
    variables: {
      Vout: 'Output voltage (must be ≤3.3V for ESP32)',
      Vin: 'Input voltage',
      R1: 'Top resistor (connected to Vin)',
      R2: 'Bottom resistor (connected to GND)',
    },
    inverseFormula: 'R1 = R2 × ((Vin / Vout) - 1)',
    examples: [
      { Vin: 5, Vout: 3.3, R1: '5.1kΩ', R2: '10kΩ' },
      { Vin: 12, Vout: 3.3, R1: '27kΩ', R2: '10kΩ' },
      { Vin: 24, Vout: 3.3, R1: '62kΩ', R2: '10kΩ' },
    ],
  },
  i2cPullup: {
    name: 'I2C Pull-up Resistor',
    formula: 'Rp = tr / (0.8473 × Cb)',
    variables: {
      Rp: 'Pull-up resistor value (Ω)',
      tr: 'Rise time (ns) - 1000ns for standard, 300ns for fast mode',
      Cb: 'Bus capacitance (pF) - typically 50-400pF',
    },
    guidelines: {
      '100kHz (Standard)': '4.7kΩ - 10kΩ',
      '400kHz (Fast)': '2.2kΩ - 4.7kΩ',
      'shortWires': '10kΩ works fine',
      'longWires': 'Use 2.2kΩ',
    },
    note: 'Many I2C modules include pull-ups - avoid doubling up',
  },
  rcTimeConstant: {
    name: 'RC Time Constant (Debounce/Filter)',
    formula: 'τ = R × C',
    variables: {
      τ: 'Time constant (seconds)',
      R: 'Resistance (Ω)',
      C: 'Capacitance (F)',
    },
    settlingTime: '~5τ to fully charge/discharge',
    examples: [
      { R: '10kΩ', C: '100nF', τ: '1ms', use: 'Button debounce' },
      { R: '10kΩ', C: '1µF', τ: '10ms', use: 'Longer debounce' },
      { R: '1kΩ', C: '100nF', τ: '0.1ms', use: 'Fast filter' },
    ],
  },
  pwmFrequency: {
    name: 'PWM Frequency',
    formula: 'fPWM = fAPB / (prescaler × period)',
    esp32Specific: {
      maxChannels: 16,
      timerResolution: '1-16 bits',
      maxFrequency: '40MHz (with 1-bit resolution)',
      typicalUse: {
        led: '5kHz (8-bit)',
        motor: '25kHz (8-bit) - inaudible',
        servo: '50Hz (16-bit)',
      },
    },
  },
  batteryCapacity: {
    name: 'Battery Runtime',
    formula: 'Runtime (hours) = Capacity (mAh) / Average Current (mA)',
    derating: '80% of theoretical (account for inefficiency)',
    example: {
      battery: '1000mAh LiPo',
      current: '80mA average',
      theoretical: '12.5 hours',
      realistic: '~10 hours',
    },
  },
}

// ============================================
// COMMON PART NUMBERS
// ============================================

export const commonParts = {
  regulators: [
    { name: 'AMS1117-3.3', type: 'LDO', output: '3.3V', current: '1A', dropout: '1.2V', package: 'SOT-223' },
    { name: 'LD1117-3.3', type: 'LDO', output: '3.3V', current: '800mA', dropout: '1.2V', package: 'SOT-223' },
    { name: 'MCP1700-3302E', type: 'LDO', output: '3.3V', current: '250mA', dropout: '178mV', quiescent: '1.6µA' },
    { name: 'AP2112K-3.3', type: 'LDO', output: '3.3V', current: '600mA', dropout: '250mV', package: 'SOT-23-5' },
    { name: 'HT7333', type: 'LDO', output: '3.3V', current: '250mA', dropout: '100mV', quiescent: '4µA' },
  ],
  usbSerial: [
    { name: 'CP2102', manufacturer: 'Silicon Labs', speed: '1Mbps', package: 'QFN-28' },
    { name: 'CP2104', manufacturer: 'Silicon Labs', speed: '2Mbps', features: 'More GPIOs' },
    { name: 'CH340G', manufacturer: 'WCH', speed: '2Mbps', package: 'SOP-16', cheap: true },
    { name: 'CH340C', manufacturer: 'WCH', speed: '2Mbps', features: 'No crystal needed' },
    { name: 'FT232RL', manufacturer: 'FTDI', speed: '3Mbps', package: 'SSOP-28' },
  ],
  mosfets: [
    { name: 'IRLZ44N', type: 'N-Channel', vds: '55V', id: '47A', vgsth: '2V', logicLevel: true },
    { name: 'IRLB8721', type: 'N-Channel', vds: '30V', id: '62A', vgsth: '2.3V', logicLevel: true },
    { name: 'AO3400', type: 'N-Channel', vds: '30V', id: '5.8A', vgsth: '1.4V', package: 'SOT-23' },
    { name: 'BSS138', type: 'N-Channel', vds: '50V', id: '200mA', use: 'Level shifting' },
    { name: 'Si2301', type: 'P-Channel', vds: '-20V', id: '-2.3A', package: 'SOT-23' },
  ],
  transistors: [
    { name: 'S8050', type: 'NPN', vceo: '40V', ic: '500mA', hfe: '100-400', package: 'TO-92' },
    { name: '2N2222', type: 'NPN', vceo: '40V', ic: '800mA', hfe: '100-300', package: 'TO-92' },
    { name: 'S8550', type: 'PNP', vceo: '40V', ic: '500mA', hfe: '100-400', package: 'TO-92' },
    { name: '2N3906', type: 'PNP', vceo: '40V', ic: '200mA', hfe: '100-300', package: 'TO-92' },
  ],
  esdProtection: [
    { name: 'USBLC6-2SC6', use: 'USB ESD protection', package: 'SOT-23-6' },
    { name: 'PRTR5V0U2X', use: 'USB ESD protection', package: 'SOT-143B' },
    { name: 'SP0503BAHT', use: 'GPIO ESD protection', package: 'SOT-143' },
  ],
}

// ============================================
// WIFI / NETWORKING REFERENCE
// ============================================

export const wifiReference = {
  channels: {
    '2.4GHz': {
      count: 14,
      bandwidth: '20MHz or 40MHz',
      nonOverlapping: [1, 6, 11],
      note: 'Use channels 1, 6, or 11 for best performance',
    },
    '5GHz': {
      bands: ['UNII-1', 'UNII-2', 'UNII-3'],
      bandwidth: '20/40/80MHz',
      supported: 'ESP32-C5 only (as of 2025)',
    },
  },
  antennaGuidelines: {
    keepout: '15mm around PCB antenna',
    groundPlane: 'Required under module, not under antenna',
    metalEnclosure: 'Use external antenna (IPEX/U.FL connector)',
    orientation: 'Antenna perpendicular to ground plane for best coverage',
  },
  powerSaving: {
    modemSleep: {
      description: 'WiFi radio sleeps between beacons',
      wakeupTime: '3ms',
      bestFor: 'Always-connected but low activity',
    },
    lightSleep: {
      description: 'CPU halted, WiFi maintains connection',
      wakeupTime: '2ms',
      current: '~0.8mA',
    },
    deepSleep: {
      description: 'Everything off except RTC',
      wakeupTime: '~400ms (including WiFi reconnect)',
      current: '~10µA',
      wakeupSources: ['Timer', 'GPIO', 'Touch', 'ULP'],
    },
  },
}

// ============================================
// MEMORY REFERENCE
// ============================================

export const memoryReference = {
  esp32: {
    sram: { total: '520 KB', dram: '~320 KB available for application' },
    rom: '448 KB',
    flash: 'External, typically 4-16MB',
    psram: 'Optional, up to 8MB via SPI',
  },
  'esp32-s3': {
    sram: { total: '512 KB', note: 'Faster than ESP32' },
    rom: '384 KB',
    flash: 'External, up to 32MB (Octal)',
    psram: 'Up to 8MB Octal (faster than ESP32)',
  },
  'esp32-c3': {
    sram: { total: '400 KB' },
    rom: '384 KB',
    flash: 'Internal 4MB (embedded)',
    psram: 'Not supported',
  },
  partitionSchemes: {
    default: {
      name: 'Default 4MB with SPIFFS',
      app0: '1.2MB',
      app1: '1.2MB (OTA)',
      spiffs: '1.5MB',
    },
    minimal: {
      name: 'Minimal (no OTA)',
      app0: '3MB',
      spiffs: '1MB',
    },
    huge: {
      name: 'Huge APP',
      app0: '3MB',
      note: 'No OTA, minimal filesystem',
    },
  },
}

// ============================================
// PROGRAMMING REFERENCE
// ============================================

export const programmingReference = {
  esptool: {
    flashErase: 'esptool.py --port COM3 erase_flash',
    flashWrite: 'esptool.py --port COM3 write_flash 0x0 firmware.bin',
    readMAC: 'esptool.py --port COM3 read_mac',
    chipInfo: 'esptool.py --port COM3 chip_id',
    flashId: 'esptool.py --port COM3 flash_id',
  },
  baudRates: {
    programming: [115200, 230400, 460800, 921600, 1500000, 2000000],
    recommended: 921600,
    safe: 115200,
  },
  partitionTool: {
    read: 'esptool.py --port COM3 read_flash 0x8000 0x1000 partition-backup.bin',
    write: 'esptool.py --port COM3 write_flash 0x8000 custom-partition.bin',
  },
}
