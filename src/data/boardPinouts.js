/**
 * Board-specific pinout data
 *
 * Maps development board header pins to chip GPIOs with
 * board-specific labels and silk screen markings.
 */

// Pin type colors matching chip pinouts
export const pinTypes = {
  power: 'power',
  ground: 'ground',
  gpio: 'gpio',
  input: 'input',    // Input-only pins
  reserved: 'reserved',
  nc: 'nc',          // Not connected
  usb: 'usb',
}

/**
 * Board pinout definitions
 * Each board has:
 * - pins: Array of pin objects (ordered top-to-bottom for each side)
 * - layout: Board-specific layout info (dimensions, header positions)
 * - notes: Board-specific notes and warnings
 */
export const boardPinouts = {
  // ============================================
  // ESP32-DevKitC V4 (38-pin)
  // ============================================
  'esp32-devkitc-v4': {
    layout: {
      leftPins: 19,
      rightPins: 19,
      chipLabel: 'ESP32-WROOM-32',
      orientation: 'usb-bottom',
    },
    pins: [
      // Left side (top to bottom when USB at bottom)
      { position: 1, side: 'left', silk: '3V3', name: '3V3', type: 'power', gpio: null, description: '3.3V power output' },
      { position: 2, side: 'left', silk: 'EN', name: 'EN', type: 'gpio', gpio: null, description: 'Chip enable (active high), has RC delay circuit' },
      { position: 3, side: 'left', silk: 'VP', name: 'GPIO36', type: 'input', gpio: 36, description: 'Input only, ADC1_CH0, SENSOR_VP' },
      { position: 4, side: 'left', silk: 'VN', name: 'GPIO39', type: 'input', gpio: 39, description: 'Input only, ADC1_CH3, SENSOR_VN' },
      { position: 5, side: 'left', silk: '34', name: 'GPIO34', type: 'input', gpio: 34, description: 'Input only, ADC1_CH6' },
      { position: 6, side: 'left', silk: '35', name: 'GPIO35', type: 'input', gpio: 35, description: 'Input only, ADC1_CH7' },
      { position: 7, side: 'left', silk: '32', name: 'GPIO32', type: 'gpio', gpio: 32, description: 'ADC1_CH4, TOUCH9, XTAL_32K_P' },
      { position: 8, side: 'left', silk: '33', name: 'GPIO33', type: 'gpio', gpio: 33, description: 'ADC1_CH5, TOUCH8, XTAL_32K_N' },
      { position: 9, side: 'left', silk: '25', name: 'GPIO25', type: 'gpio', gpio: 25, description: 'ADC2_CH8, DAC1' },
      { position: 10, side: 'left', silk: '26', name: 'GPIO26', type: 'gpio', gpio: 26, description: 'ADC2_CH9, DAC2' },
      { position: 11, side: 'left', silk: '27', name: 'GPIO27', type: 'gpio', gpio: 27, description: 'ADC2_CH7, TOUCH7' },
      { position: 12, side: 'left', silk: '14', name: 'GPIO14', type: 'gpio', gpio: 14, description: 'ADC2_CH6, TOUCH6, HSPI_CLK, strapping pin', strapping: true },
      { position: 13, side: 'left', silk: '12', name: 'GPIO12', type: 'gpio', gpio: 12, description: 'ADC2_CH5, TOUCH5, HSPI_MISO, strapping pin (boot fail if HIGH)', strapping: true, warning: 'Must be LOW during boot' },
      { position: 14, side: 'left', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 15, side: 'left', silk: '13', name: 'GPIO13', type: 'gpio', gpio: 13, description: 'ADC2_CH4, TOUCH4, HSPI_MOSI' },
      { position: 16, side: 'left', silk: 'D2', name: 'GPIO9', type: 'reserved', gpio: 9, description: 'Connected to flash, do not use', reserved: true },
      { position: 17, side: 'left', silk: 'D3', name: 'GPIO10', type: 'reserved', gpio: 10, description: 'Connected to flash, do not use', reserved: true },
      { position: 18, side: 'left', silk: 'CMD', name: 'GPIO11', type: 'reserved', gpio: 11, description: 'Connected to flash, do not use', reserved: true },
      { position: 19, side: 'left', silk: '5V', name: '5V', type: 'power', gpio: null, description: '5V power input/output from USB' },

      // Right side (top to bottom when USB at bottom)
      { position: 1, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 2, side: 'right', silk: '23', name: 'GPIO23', type: 'gpio', gpio: 23, description: 'VSPI_MOSI' },
      { position: 3, side: 'right', silk: '22', name: 'GPIO22', type: 'gpio', gpio: 22, description: 'I2C_SCL (default), VSPI_WP' },
      { position: 4, side: 'right', silk: 'TX', name: 'GPIO1', type: 'gpio', gpio: 1, description: 'UART0_TX, used for programming' },
      { position: 5, side: 'right', silk: 'RX', name: 'GPIO3', type: 'gpio', gpio: 3, description: 'UART0_RX, used for programming' },
      { position: 6, side: 'right', silk: '21', name: 'GPIO21', type: 'gpio', gpio: 21, description: 'I2C_SDA (default), VSPI_HD' },
      { position: 7, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 8, side: 'right', silk: '19', name: 'GPIO19', type: 'gpio', gpio: 19, description: 'VSPI_MISO' },
      { position: 9, side: 'right', silk: '18', name: 'GPIO18', type: 'gpio', gpio: 18, description: 'VSPI_CLK' },
      { position: 10, side: 'right', silk: '5', name: 'GPIO5', type: 'gpio', gpio: 5, description: 'VSPI_CS, strapping pin (boot mode)', strapping: true },
      { position: 11, side: 'right', silk: '17', name: 'GPIO17', type: 'gpio', gpio: 17, description: 'UART2_TX' },
      { position: 12, side: 'right', silk: '16', name: 'GPIO16', type: 'gpio', gpio: 16, description: 'UART2_RX' },
      { position: 13, side: 'right', silk: '4', name: 'GPIO4', type: 'gpio', gpio: 4, description: 'ADC2_CH0, TOUCH0' },
      { position: 14, side: 'right', silk: '0', name: 'GPIO0', type: 'gpio', gpio: 0, description: 'ADC2_CH1, TOUCH1, strapping pin (boot mode)', strapping: true, warning: 'LOW = download mode' },
      { position: 15, side: 'right', silk: '2', name: 'GPIO2', type: 'gpio', gpio: 2, description: 'ADC2_CH2, TOUCH2, onboard LED, strapping pin', strapping: true },
      { position: 16, side: 'right', silk: '15', name: 'GPIO15', type: 'gpio', gpio: 15, description: 'ADC2_CH3, TOUCH3, HSPI_CS, strapping pin', strapping: true },
      { position: 17, side: 'right', silk: 'D1', name: 'GPIO8', type: 'reserved', gpio: 8, description: 'Connected to flash, do not use', reserved: true },
      { position: 18, side: 'right', silk: 'D0', name: 'GPIO7', type: 'reserved', gpio: 7, description: 'Connected to flash, do not use', reserved: true },
      { position: 19, side: 'right', silk: 'CLK', name: 'GPIO6', type: 'reserved', gpio: 6, description: 'Connected to flash, do not use', reserved: true },
    ],
    notes: [
      'GPIO6-11 are connected to the internal flash and should not be used',
      'GPIO34-39 are input-only pins',
      'GPIO12 must be LOW during boot (affects flash voltage)',
      'GPIO0 LOW during reset enters download/flash mode',
      'GPIO2 is connected to onboard LED',
    ],
    safeGPIOs: [4, 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33],
    defaults: {
      i2c: { sda: 21, scl: 22 },
      spi: { mosi: 23, miso: 19, sck: 18, cs: 5 },
      uart: { tx: 1, rx: 3 },
    },
  },

  // ============================================
  // ESP32-S3-DevKitC-1 (44-pin)
  // ============================================
  'esp32-s3-devkitc-1': {
    layout: {
      leftPins: 22,
      rightPins: 22,
      chipLabel: 'ESP32-S3-WROOM-1',
      orientation: 'usb-bottom',
    },
    pins: [
      // Left side
      { position: 1, side: 'left', silk: '3V3', name: '3V3', type: 'power', gpio: null, description: '3.3V power output' },
      { position: 2, side: 'left', silk: '3V3', name: '3V3', type: 'power', gpio: null, description: '3.3V power output' },
      { position: 3, side: 'left', silk: 'RST', name: 'EN', type: 'gpio', gpio: null, description: 'Reset pin (active low)' },
      { position: 4, side: 'left', silk: '4', name: 'GPIO4', type: 'gpio', gpio: 4, description: 'ADC1_CH3, TOUCH4' },
      { position: 5, side: 'left', silk: '5', name: 'GPIO5', type: 'gpio', gpio: 5, description: 'ADC1_CH4, TOUCH5' },
      { position: 6, side: 'left', silk: '6', name: 'GPIO6', type: 'gpio', gpio: 6, description: 'ADC1_CH5, TOUCH6' },
      { position: 7, side: 'left', silk: '7', name: 'GPIO7', type: 'gpio', gpio: 7, description: 'ADC1_CH6, TOUCH7' },
      { position: 8, side: 'left', silk: '15', name: 'GPIO15', type: 'gpio', gpio: 15, description: 'ADC2_CH4, XTAL_32K_P' },
      { position: 9, side: 'left', silk: '16', name: 'GPIO16', type: 'gpio', gpio: 16, description: 'ADC2_CH5, XTAL_32K_N' },
      { position: 10, side: 'left', silk: '17', name: 'GPIO17', type: 'gpio', gpio: 17, description: 'ADC2_CH6' },
      { position: 11, side: 'left', silk: '18', name: 'GPIO18', type: 'gpio', gpio: 18, description: 'ADC2_CH7' },
      { position: 12, side: 'left', silk: '8', name: 'GPIO8', type: 'gpio', gpio: 8, description: 'ADC1_CH7, TOUCH8, SUBSPICS1' },
      { position: 13, side: 'left', silk: '19', name: 'GPIO19', type: 'usb', gpio: 19, description: 'USB_D- (native USB)' },
      { position: 14, side: 'left', silk: '20', name: 'GPIO20', type: 'usb', gpio: 20, description: 'USB_D+ (native USB)' },
      { position: 15, side: 'left', silk: '3', name: 'GPIO3', type: 'gpio', gpio: 3, description: 'ADC1_CH2, TOUCH3, strapping pin', strapping: true },
      { position: 16, side: 'left', silk: '46', name: 'GPIO46', type: 'gpio', gpio: 46, description: 'Strapping pin (boot mode)', strapping: true },
      { position: 17, side: 'left', silk: '9', name: 'GPIO9', type: 'gpio', gpio: 9, description: 'ADC1_CH8, TOUCH9, FSPIHD' },
      { position: 18, side: 'left', silk: '10', name: 'GPIO10', type: 'gpio', gpio: 10, description: 'ADC1_CH9, TOUCH10, FSPICS0, FSPIIO4' },
      { position: 19, side: 'left', silk: '11', name: 'GPIO11', type: 'gpio', gpio: 11, description: 'ADC2_CH0, TOUCH11, FSPID, FSPIIO5' },
      { position: 20, side: 'left', silk: '12', name: 'GPIO12', type: 'gpio', gpio: 12, description: 'ADC2_CH1, TOUCH12, FSPICLK, FSPIIO6' },
      { position: 21, side: 'left', silk: '13', name: 'GPIO13', type: 'gpio', gpio: 13, description: 'ADC2_CH2, TOUCH13, FSPIQ, FSPIIO7' },
      { position: 22, side: 'left', silk: '14', name: 'GPIO14', type: 'gpio', gpio: 14, description: 'ADC2_CH3, TOUCH14, FSPIWP' },

      // Right side
      { position: 1, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 2, side: 'right', silk: '43', name: 'GPIO43', type: 'gpio', gpio: 43, description: 'UART0_TX (default)' },
      { position: 3, side: 'right', silk: '44', name: 'GPIO44', type: 'gpio', gpio: 44, description: 'UART0_RX (default)' },
      { position: 4, side: 'right', silk: '1', name: 'GPIO1', type: 'gpio', gpio: 1, description: 'ADC1_CH0, TOUCH1' },
      { position: 5, side: 'right', silk: '2', name: 'GPIO2', type: 'gpio', gpio: 2, description: 'ADC1_CH1, TOUCH2' },
      { position: 6, side: 'right', silk: '42', name: 'GPIO42', type: 'gpio', gpio: 42, description: 'MTMS' },
      { position: 7, side: 'right', silk: '41', name: 'GPIO41', type: 'gpio', gpio: 41, description: 'MTDI' },
      { position: 8, side: 'right', silk: '40', name: 'GPIO40', type: 'gpio', gpio: 40, description: 'MTDO' },
      { position: 9, side: 'right', silk: '39', name: 'GPIO39', type: 'gpio', gpio: 39, description: 'MTCK' },
      { position: 10, side: 'right', silk: '38', name: 'GPIO38', type: 'gpio', gpio: 38, description: 'RGB LED (WS2812), FSPIWP' },
      { position: 11, side: 'right', silk: '37', name: 'GPIO37', type: 'gpio', gpio: 37, description: 'SPIDQS' },
      { position: 12, side: 'right', silk: '36', name: 'GPIO36', type: 'gpio', gpio: 36, description: 'SPIIO7' },
      { position: 13, side: 'right', silk: '35', name: 'GPIO35', type: 'gpio', gpio: 35, description: 'SPIIO6' },
      { position: 14, side: 'right', silk: '0', name: 'GPIO0', type: 'gpio', gpio: 0, description: 'ADC1_CH0, strapping pin (boot mode)', strapping: true },
      { position: 15, side: 'right', silk: '45', name: 'GPIO45', type: 'gpio', gpio: 45, description: 'Strapping pin (VDD_SPI voltage)', strapping: true },
      { position: 16, side: 'right', silk: '48', name: 'GPIO48', type: 'gpio', gpio: 48, description: 'SPICLK_N' },
      { position: 17, side: 'right', silk: '47', name: 'GPIO47', type: 'gpio', gpio: 47, description: 'SPICLK_P' },
      { position: 18, side: 'right', silk: '21', name: 'GPIO21', type: 'gpio', gpio: 21, description: 'I2C_SDA (default)' },
      { position: 19, side: 'right', silk: 'RX', name: 'RX', type: 'gpio', gpio: 44, description: 'UART0 RX (directly from USB-UART)' },
      { position: 20, side: 'right', silk: 'TX', name: 'TX', type: 'gpio', gpio: 43, description: 'UART0 TX (directly from USB-UART)' },
      { position: 21, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 22, side: 'right', silk: '5V', name: '5V', type: 'power', gpio: null, description: '5V from USB' },
    ],
    notes: [
      'GPIO19/20 are used for native USB (USB OTG)',
      'GPIO38 is connected to the onboard RGB LED (WS2812)',
      'Two USB-C ports: one for USB-UART, one for native USB',
      'GPIO0, GPIO3, GPIO45, GPIO46 are strapping pins',
    ],
    safeGPIOs: [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 35, 36, 37, 38, 39, 40, 41, 42, 47, 48],
    defaults: {
      i2c: { sda: 8, scl: 9 },
      spi: { mosi: 11, miso: 13, sck: 12, cs: 10 },
      uart: { tx: 43, rx: 44 },
    },
  },

  // ============================================
  // ESP32-C3-DevKitM-1 (26-pin)
  // ============================================
  'esp32-c3-devkitm-1': {
    layout: {
      leftPins: 13,
      rightPins: 13,
      chipLabel: 'ESP32-C3-MINI-1',
      orientation: 'usb-bottom',
    },
    pins: [
      // Left side
      { position: 1, side: 'left', silk: '3V3', name: '3V3', type: 'power', gpio: null, description: '3.3V power output' },
      { position: 2, side: 'left', silk: 'EN', name: 'EN', type: 'gpio', gpio: null, description: 'Reset pin (active low)' },
      { position: 3, side: 'left', silk: '4', name: 'GPIO4', type: 'gpio', gpio: 4, description: 'ADC1_CH4, FSPIHD, MTMS' },
      { position: 4, side: 'left', silk: '5', name: 'GPIO5', type: 'gpio', gpio: 5, description: 'ADC2_CH0, FSPIWP, MTDI' },
      { position: 5, side: 'left', silk: '6', name: 'GPIO6', type: 'gpio', gpio: 6, description: 'FSPICLK, MTCK' },
      { position: 6, side: 'left', silk: '7', name: 'GPIO7', type: 'gpio', gpio: 7, description: 'FSPID, MTDO' },
      { position: 7, side: 'left', silk: '8', name: 'GPIO8', type: 'gpio', gpio: 8, description: 'Strapping pin (boot), RGB LED', strapping: true },
      { position: 8, side: 'left', silk: '9', name: 'GPIO9', type: 'gpio', gpio: 9, description: 'Strapping pin (boot mode)', strapping: true },
      { position: 9, side: 'left', silk: '10', name: 'GPIO10', type: 'gpio', gpio: 10, description: 'FSPICS0' },
      { position: 10, side: 'left', silk: '18', name: 'GPIO18', type: 'usb', gpio: 18, description: 'USB_D- (native USB)' },
      { position: 11, side: 'left', silk: '19', name: 'GPIO19', type: 'usb', gpio: 19, description: 'USB_D+ (native USB)' },
      { position: 12, side: 'left', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 13, side: 'left', silk: '5V', name: '5V', type: 'power', gpio: null, description: '5V from USB' },

      // Right side
      { position: 1, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 2, side: 'right', silk: '3', name: 'GPIO3', type: 'gpio', gpio: 3, description: 'ADC1_CH3' },
      { position: 3, side: 'right', silk: '2', name: 'GPIO2', type: 'gpio', gpio: 2, description: 'ADC1_CH2, strapping pin (boot)', strapping: true },
      { position: 4, side: 'right', silk: '1', name: 'GPIO1', type: 'gpio', gpio: 1, description: 'ADC1_CH1, XTAL_32K_N' },
      { position: 5, side: 'right', silk: '0', name: 'GPIO0', type: 'gpio', gpio: 0, description: 'ADC1_CH0, XTAL_32K_P' },
      { position: 6, side: 'right', silk: 'RX', name: 'GPIO20', type: 'gpio', gpio: 20, description: 'UART0_RX (default)' },
      { position: 7, side: 'right', silk: 'TX', name: 'GPIO21', type: 'gpio', gpio: 21, description: 'UART0_TX (default)' },
      { position: 8, side: 'right', silk: 'NC', name: 'NC', type: 'nc', gpio: null, description: 'Not connected' },
      { position: 9, side: 'right', silk: 'NC', name: 'NC', type: 'nc', gpio: null, description: 'Not connected' },
      { position: 10, side: 'right', silk: 'NC', name: 'NC', type: 'nc', gpio: null, description: 'Not connected' },
      { position: 11, side: 'right', silk: 'NC', name: 'NC', type: 'nc', gpio: null, description: 'Not connected' },
      { position: 12, side: 'right', silk: 'NC', name: 'NC', type: 'nc', gpio: null, description: 'Not connected' },
      { position: 13, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
    ],
    notes: [
      'Uses native USB Serial/JTAG (no external USB-UART chip)',
      'GPIO8 is connected to onboard RGB LED (active low)',
      'GPIO2, GPIO8, GPIO9 are strapping pins',
      'RISC-V single-core processor',
    ],
    safeGPIOs: [0, 1, 3, 4, 5, 6, 7, 10, 20, 21],
    defaults: {
      i2c: { sda: 8, scl: 9 },
      spi: { mosi: 7, miso: 2, sck: 6, cs: 10 },
      uart: { tx: 21, rx: 20 },
    },
  },

  // ============================================
  // ESP32-CAM (AI-Thinker)
  // ============================================
  'esp32-cam-ai-thinker': {
    layout: {
      leftPins: 8,
      rightPins: 8,
      chipLabel: 'ESP32-S',
      orientation: 'camera-top',
    },
    pins: [
      // Left side (component side view)
      { position: 1, side: 'left', silk: '5V', name: '5V', type: 'power', gpio: null, description: '5V power input' },
      { position: 2, side: 'left', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 3, side: 'left', silk: 'IO12', name: 'GPIO12', type: 'gpio', gpio: 12, description: 'HS2_DATA2, strapping pin', strapping: true, warning: 'Must be LOW at boot' },
      { position: 4, side: 'left', silk: 'IO13', name: 'GPIO13', type: 'gpio', gpio: 13, description: 'HS2_DATA3' },
      { position: 5, side: 'left', silk: 'IO15', name: 'GPIO15', type: 'gpio', gpio: 15, description: 'HS2_CMD, strapping pin', strapping: true },
      { position: 6, side: 'left', silk: 'IO14', name: 'GPIO14', type: 'gpio', gpio: 14, description: 'HS2_CLK' },
      { position: 7, side: 'left', silk: 'IO2', name: 'GPIO2', type: 'gpio', gpio: 2, description: 'HS2_DATA0, strapping pin', strapping: true },
      { position: 8, side: 'left', silk: 'IO4', name: 'GPIO4', type: 'gpio', gpio: 4, description: 'HS2_DATA1, Flash LED' },

      // Right side
      { position: 1, side: 'right', silk: '3V3', name: '3V3', type: 'power', gpio: null, description: '3.3V power output' },
      { position: 2, side: 'right', silk: 'IO16', name: 'GPIO16', type: 'gpio', gpio: 16, description: 'UART2_RX (PSRAM uses this on some modules)' },
      { position: 3, side: 'right', silk: 'IO0', name: 'GPIO0', type: 'gpio', gpio: 0, description: 'Boot mode select, strapping pin', strapping: true, warning: 'Hold LOW for programming' },
      { position: 4, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 5, side: 'right', silk: 'VCC', name: 'VCC', type: 'power', gpio: null, description: '3.3V or 5V input' },
      { position: 6, side: 'right', silk: 'U0R', name: 'GPIO3', type: 'gpio', gpio: 3, description: 'UART0 RX' },
      { position: 7, side: 'right', silk: 'U0T', name: 'GPIO1', type: 'gpio', gpio: 1, description: 'UART0 TX' },
      { position: 8, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
    ],
    notes: [
      'Requires external USB-UART adapter for programming',
      'GPIO0 must be held LOW during reset to enter download mode',
      'GPIO4 controls the flash LED',
      'Most GPIOs are used by camera and SD card internally',
      'Camera uses: GPIO32, 0, 5, 18, 19, 21, 36, 39, 34, 35, 25, 23, 22, 26, 27',
      'SD card uses: GPIO2, 4, 12, 13, 14, 15 (conflicts with camera)',
    ],
    safeGPIOs: [1, 3, 12, 13, 14, 15, 16],
    defaults: {
      uart: { tx: 1, rx: 3 },
    },
  },

  // ============================================
  // ESP32-C3 SuperMini
  // ============================================
  'esp32-c3-supermini': {
    layout: {
      leftPins: 7,
      rightPins: 7,
      chipLabel: 'ESP32-C3',
      orientation: 'usb-bottom',
    },
    pins: [
      // Left side
      { position: 1, side: 'left', silk: '5V', name: '5V', type: 'power', gpio: null, description: '5V from USB' },
      { position: 2, side: 'left', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 3, side: 'left', silk: '3V3', name: '3V3', type: 'power', gpio: null, description: '3.3V power output' },
      { position: 4, side: 'left', silk: '10', name: 'GPIO10', type: 'gpio', gpio: 10, description: 'General purpose GPIO' },
      { position: 5, side: 'left', silk: '9', name: 'GPIO9', type: 'gpio', gpio: 9, description: 'Strapping pin (boot mode)', strapping: true },
      { position: 6, side: 'left', silk: '8', name: 'GPIO8', type: 'gpio', gpio: 8, description: 'Onboard LED, strapping pin', strapping: true },
      { position: 7, side: 'left', silk: '7', name: 'GPIO7', type: 'gpio', gpio: 7, description: 'General purpose GPIO' },

      // Right side
      { position: 1, side: 'right', silk: '0', name: 'GPIO0', type: 'gpio', gpio: 0, description: 'ADC1_CH0' },
      { position: 2, side: 'right', silk: '1', name: 'GPIO1', type: 'gpio', gpio: 1, description: 'ADC1_CH1' },
      { position: 3, side: 'right', silk: '2', name: 'GPIO2', type: 'gpio', gpio: 2, description: 'ADC1_CH2, strapping pin', strapping: true },
      { position: 4, side: 'right', silk: '3', name: 'GPIO3', type: 'gpio', gpio: 3, description: 'ADC1_CH3' },
      { position: 5, side: 'right', silk: '4', name: 'GPIO4', type: 'gpio', gpio: 4, description: 'ADC1_CH4' },
      { position: 6, side: 'right', silk: '5', name: 'GPIO5', type: 'gpio', gpio: 5, description: 'ADC2_CH0' },
      { position: 7, side: 'right', silk: '6', name: 'GPIO6', type: 'gpio', gpio: 6, description: 'General purpose GPIO' },
    ],
    notes: [
      'Ultra-compact form factor (22.5 x 18mm)',
      'Native USB Serial/JTAG',
      'GPIO8 connected to onboard blue LED',
      'RISC-V single-core processor',
    ],
    safeGPIOs: [0, 1, 3, 4, 5, 6, 7, 10],
    defaults: {
      i2c: { sda: 8, scl: 9 },
      spi: { mosi: 7, miso: 2, sck: 6, cs: 10 },
    },
  },

  // ============================================
  // DOIT ESP32 DevKit V1 (30-pin)
  // ============================================
  'doit-esp32-devkit-v1': {
    layout: {
      leftPins: 15,
      rightPins: 15,
      chipLabel: 'ESP32-WROOM-32',
      orientation: 'usb-bottom',
    },
    pins: [
      // Left side
      { position: 1, side: 'left', silk: '3V3', name: '3V3', type: 'power', gpio: null, description: '3.3V power output' },
      { position: 2, side: 'left', silk: 'EN', name: 'EN', type: 'gpio', gpio: null, description: 'Chip enable (active high)' },
      { position: 3, side: 'left', silk: 'VP', name: 'GPIO36', type: 'input', gpio: 36, description: 'Input only, ADC1_CH0' },
      { position: 4, side: 'left', silk: 'VN', name: 'GPIO39', type: 'input', gpio: 39, description: 'Input only, ADC1_CH3' },
      { position: 5, side: 'left', silk: '34', name: 'GPIO34', type: 'input', gpio: 34, description: 'Input only, ADC1_CH6' },
      { position: 6, side: 'left', silk: '35', name: 'GPIO35', type: 'input', gpio: 35, description: 'Input only, ADC1_CH7' },
      { position: 7, side: 'left', silk: '32', name: 'GPIO32', type: 'gpio', gpio: 32, description: 'ADC1_CH4, TOUCH9' },
      { position: 8, side: 'left', silk: '33', name: 'GPIO33', type: 'gpio', gpio: 33, description: 'ADC1_CH5, TOUCH8' },
      { position: 9, side: 'left', silk: '25', name: 'GPIO25', type: 'gpio', gpio: 25, description: 'ADC2_CH8, DAC1' },
      { position: 10, side: 'left', silk: '26', name: 'GPIO26', type: 'gpio', gpio: 26, description: 'ADC2_CH9, DAC2' },
      { position: 11, side: 'left', silk: '27', name: 'GPIO27', type: 'gpio', gpio: 27, description: 'ADC2_CH7, TOUCH7' },
      { position: 12, side: 'left', silk: '14', name: 'GPIO14', type: 'gpio', gpio: 14, description: 'ADC2_CH6, TOUCH6, HSPI_CLK' },
      { position: 13, side: 'left', silk: '12', name: 'GPIO12', type: 'gpio', gpio: 12, description: 'ADC2_CH5, TOUCH5, strapping pin', strapping: true, warning: 'Must be LOW at boot' },
      { position: 14, side: 'left', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 15, side: 'left', silk: '13', name: 'GPIO13', type: 'gpio', gpio: 13, description: 'ADC2_CH4, TOUCH4' },

      // Right side
      { position: 1, side: 'right', silk: 'VIN', name: 'VIN', type: 'power', gpio: null, description: '5V input (from USB or external)' },
      { position: 2, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 3, side: 'right', silk: '23', name: 'GPIO23', type: 'gpio', gpio: 23, description: 'VSPI_MOSI' },
      { position: 4, side: 'right', silk: '22', name: 'GPIO22', type: 'gpio', gpio: 22, description: 'I2C_SCL (default)' },
      { position: 5, side: 'right', silk: 'TX', name: 'GPIO1', type: 'gpio', gpio: 1, description: 'UART0_TX' },
      { position: 6, side: 'right', silk: 'RX', name: 'GPIO3', type: 'gpio', gpio: 3, description: 'UART0_RX' },
      { position: 7, side: 'right', silk: '21', name: 'GPIO21', type: 'gpio', gpio: 21, description: 'I2C_SDA (default)' },
      { position: 8, side: 'right', silk: 'GND', name: 'GND', type: 'ground', gpio: null, description: 'Ground' },
      { position: 9, side: 'right', silk: '19', name: 'GPIO19', type: 'gpio', gpio: 19, description: 'VSPI_MISO' },
      { position: 10, side: 'right', silk: '18', name: 'GPIO18', type: 'gpio', gpio: 18, description: 'VSPI_CLK' },
      { position: 11, side: 'right', silk: '5', name: 'GPIO5', type: 'gpio', gpio: 5, description: 'VSPI_CS, strapping pin', strapping: true },
      { position: 12, side: 'right', silk: '17', name: 'GPIO17', type: 'gpio', gpio: 17, description: 'UART2_TX' },
      { position: 13, side: 'right', silk: '16', name: 'GPIO16', type: 'gpio', gpio: 16, description: 'UART2_RX' },
      { position: 14, side: 'right', silk: '4', name: 'GPIO4', type: 'gpio', gpio: 4, description: 'ADC2_CH0, TOUCH0' },
      { position: 15, side: 'right', silk: '2', name: 'GPIO2', type: 'gpio', gpio: 2, description: 'ADC2_CH2, TOUCH2, onboard LED, strapping pin', strapping: true },
    ],
    notes: [
      '30-pin variant (narrower than DevKitC V4)',
      'Breadboard friendly (0.9" row spacing)',
      'GPIO2 connected to onboard LED',
      'GPIO34-39 are input-only',
    ],
    safeGPIOs: [4, 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33],
    defaults: {
      i2c: { sda: 21, scl: 22 },
      spi: { mosi: 23, miso: 19, sck: 18, cs: 5 },
      uart: { tx: 1, rx: 3 },
    },
  },
}

// Helper functions
export function getBoardPinout(boardId) {
  return boardPinouts[boardId] || null
}

export function getBoardsWithPinouts() {
  return Object.keys(boardPinouts)
}

export function hasBoardPinout(boardId) {
  return boardId in boardPinouts
}
