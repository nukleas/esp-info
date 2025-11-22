/**
 * ESP32 Pinout Data
 *
 * Comprehensive pin information for ESP32 variants.
 * Used for interactive pinout diagrams.
 *
 * Pin Categories:
 * - power: VCC, GND, 3V3, EN
 * - gpio: General purpose I/O
 * - adc: Analog-to-digital converter
 * - dac: Digital-to-analog converter
 * - touch: Capacitive touch sensor
 * - i2c: I2C bus (SDA, SCL)
 * - spi: SPI bus (MOSI, MISO, CLK, CS)
 * - uart: Serial communication (TX, RX)
 * - pwm: Pulse width modulation capable
 * - strapping: Boot mode configuration pins
 * - reserved: Connected to flash/PSRAM, avoid using
 */

// Pin type color codes for diagrams
export const pinColors = {
  power: '#ef4444',      // Red
  ground: '#374151',     // Dark gray
  gpio: '#3b82f6',       // Blue
  adc: '#8b5cf6',        // Purple
  dac: '#ec4899',        // Pink
  touch: '#14b8a6',      // Teal
  i2c: '#f59e0b',        // Amber
  spi: '#10b981',        // Emerald
  uart: '#06b6d4',       // Cyan
  strapping: '#f97316',  // Orange (warning)
  reserved: '#dc2626',   // Red (danger)
  inputOnly: '#a855f7',  // Violet
}

// ============================================
// ESP32 (WROOM-32) - 38 Pin DevKit Layout
// ============================================
export const esp32Pins = [
  // Left side (top to bottom)
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply output', notes: 'Regulated 3.3V output from onboard regulator. Max 500mA depending on board.', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable (active high)', alternateFunctions: ['CHIP_PU', 'Reset'], notes: 'Connect 10kΩ pull-up to 3V3. Directly controls ESP32 chip power. Pull LOW to reset.', category: ['power', 'special'], side: 'left' },
  { pin: 3, name: 'GPIO36', type: 'input', voltage: '3.3V', description: 'Sensor VP - Input only', alternateFunctions: ['ADC1_CH0', 'RTC_GPIO0'], notes: 'Input only. No internal pull-up/pull-down. Part of ULP ADC.', category: ['gpio', 'adc'], inputOnly: true, side: 'left' },
  { pin: 4, name: 'GPIO39', type: 'input', voltage: '3.3V', description: 'Sensor VN - Input only', alternateFunctions: ['ADC1_CH3', 'RTC_GPIO3'], notes: 'Input only. No internal pull-up/pull-down. Part of ULP ADC.', category: ['gpio', 'adc'], inputOnly: true, side: 'left' },
  { pin: 5, name: 'GPIO34', type: 'input', voltage: '3.3V', description: 'Input only GPIO', alternateFunctions: ['ADC1_CH6', 'RTC_GPIO4'], notes: 'Input only. No internal pull-up/pull-down.', category: ['gpio', 'adc'], inputOnly: true, side: 'left' },
  { pin: 6, name: 'GPIO35', type: 'input', voltage: '3.3V', description: 'Input only GPIO', alternateFunctions: ['ADC1_CH7', 'RTC_GPIO5'], notes: 'Input only. No internal pull-up/pull-down.', category: ['gpio', 'adc'], inputOnly: true, side: 'left' },
  { pin: 7, name: 'GPIO32', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['ADC1_CH4', 'TOUCH9', 'RTC_GPIO9', 'XTAL_32K_P'], notes: 'Safe to use. Can be 32.768kHz crystal input.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO33', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['ADC1_CH5', 'TOUCH8', 'RTC_GPIO8', 'XTAL_32K_N'], notes: 'Safe to use. Can be 32.768kHz crystal input.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 9, name: 'GPIO25', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O with DAC', alternateFunctions: ['ADC2_CH8', 'DAC1', 'RTC_GPIO6'], notes: 'Safe to use. One of two DAC outputs.', category: ['gpio', 'adc', 'dac', 'pwm'], side: 'left' },
  { pin: 10, name: 'GPIO26', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O with DAC', alternateFunctions: ['ADC2_CH9', 'DAC2', 'RTC_GPIO7'], notes: 'Safe to use. One of two DAC outputs.', category: ['gpio', 'adc', 'dac', 'pwm'], side: 'left' },
  { pin: 11, name: 'GPIO27', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['ADC2_CH7', 'TOUCH7', 'RTC_GPIO17', 'EMAC_RX_DV'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 12, name: 'GPIO14', type: 'gpio', voltage: '3.3V', description: 'HSPI CLK', alternateFunctions: ['ADC2_CH6', 'TOUCH6', 'RTC_GPIO16', 'MTMS', 'HSPICLK', 'SD_CLK', 'EMAC_TXD2'], notes: 'Outputs PWM at boot. HSPI clock.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], side: 'left' },
  { pin: 13, name: 'GPIO12', type: 'gpio', voltage: '3.3V', description: 'HSPI MISO - Strapping pin', alternateFunctions: ['ADC2_CH5', 'TOUCH5', 'RTC_GPIO15', 'MTDI', 'HSPIQ', 'SD_DATA2', 'EMAC_TXD3'], notes: 'STRAPPING PIN: Must be LOW at boot. Sets flash voltage. Boot fails if pulled high.', category: ['gpio', 'adc', 'touch', 'spi', 'strapping', 'pwm'], strapping: true, strappingValue: 'LOW', side: 'left' },
  { pin: 14, name: 'GND', type: 'ground', voltage: '0V', description: 'Ground', notes: 'Connect to circuit ground.', category: ['power'], side: 'left' },
  { pin: 15, name: 'GPIO13', type: 'gpio', voltage: '3.3V', description: 'HSPI MOSI', alternateFunctions: ['ADC2_CH4', 'TOUCH4', 'RTC_GPIO14', 'MTCK', 'HSPID', 'SD_DATA3', 'EMAC_RX_ER'], notes: 'Safe to use. HSPI data out.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], side: 'left' },
  { pin: 16, name: 'GPIO9', type: 'reserved', voltage: '3.3V', description: 'Flash D2 - DO NOT USE', alternateFunctions: ['SD_DATA2', 'SPIHD', 'U1RXD'], notes: 'Connected to flash memory. Using this pin will crash the chip.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 17, name: 'GPIO10', type: 'reserved', voltage: '3.3V', description: 'Flash D3 - DO NOT USE', alternateFunctions: ['SD_DATA3', 'SPIWP', 'U1TXD'], notes: 'Connected to flash memory. Using this pin will crash the chip.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 18, name: 'GPIO11', type: 'reserved', voltage: '3.3V', description: 'Flash CMD - DO NOT USE', alternateFunctions: ['SD_CMD', 'SPICS0'], notes: 'Connected to flash memory. Using this pin will crash the chip.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 19, name: 'VIN', type: 'power', voltage: '5V', description: 'USB/External 5V input', notes: 'Input voltage for onboard regulator. Typically 5V from USB.', category: ['power'], side: 'left' },

  // Right side (top to bottom)
  { pin: 20, name: 'GND', type: 'ground', voltage: '0V', description: 'Ground', notes: 'Connect to circuit ground.', category: ['power'], side: 'right' },
  { pin: 21, name: 'GPIO23', type: 'gpio', voltage: '3.3V', description: 'VSPI MOSI', alternateFunctions: ['VSPID', 'HS1_STROBE'], notes: 'Safe to use. Default VSPI MOSI.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'MOSI', side: 'right' },
  { pin: 22, name: 'GPIO22', type: 'gpio', voltage: '3.3V', description: 'Default I2C SCL', alternateFunctions: ['VSPIWP', 'U0RTS', 'EMAC_TXD1'], notes: 'Safe to use. Default I2C clock line.', category: ['gpio', 'i2c', 'pwm'], defaultFunction: 'SCL', side: 'right' },
  { pin: 23, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'UART0 TX - Debug output', alternateFunctions: ['U0TXD', 'CLK_OUT3', 'EMAC_RXD2'], notes: 'Connected to USB-serial TX. Outputs debug info at boot.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'TX', side: 'right' },
  { pin: 24, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'UART0 RX - Debug input', alternateFunctions: ['U0RXD', 'CLK_OUT2'], notes: 'Connected to USB-serial RX. HIGH at boot.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'RX', side: 'right' },
  { pin: 25, name: 'GPIO21', type: 'gpio', voltage: '3.3V', description: 'Default I2C SDA', alternateFunctions: ['VSPIHD', 'EMAC_TX_EN'], notes: 'Safe to use. Default I2C data line.', category: ['gpio', 'i2c', 'pwm'], defaultFunction: 'SDA', side: 'right' },
  { pin: 26, name: 'GND', type: 'ground', voltage: '0V', description: 'Ground', notes: 'Connect to circuit ground.', category: ['power'], side: 'right' },
  { pin: 27, name: 'GPIO19', type: 'gpio', voltage: '3.3V', description: 'VSPI MISO', alternateFunctions: ['VSPIQ', 'U0CTS', 'EMAC_TXD0'], notes: 'Safe to use. Default VSPI MISO.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'MISO', side: 'right' },
  { pin: 28, name: 'GPIO18', type: 'gpio', voltage: '3.3V', description: 'VSPI CLK', alternateFunctions: ['VSPICLK', 'HS1_DATA7'], notes: 'Safe to use. Default VSPI clock.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'SCK', side: 'right' },
  { pin: 29, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'VSPI CS - Strapping pin', alternateFunctions: ['VSPICS0', 'HS1_DATA6', 'EMAC_RX_CLK'], notes: 'STRAPPING PIN: Must be HIGH at boot. Outputs PWM at boot.', category: ['gpio', 'spi', 'strapping', 'pwm'], strapping: true, strappingValue: 'HIGH', defaultFunction: 'SS', side: 'right' },
  { pin: 30, name: 'GPIO17', type: 'gpio', voltage: '3.3V', description: 'UART2 TX', alternateFunctions: ['U2TXD', 'HS1_DATA5', 'EMAC_CLK_OUT_180'], notes: 'Safe to use. Not available on WROVER (used for PSRAM).', category: ['gpio', 'uart', 'pwm'], side: 'right' },
  { pin: 31, name: 'GPIO16', type: 'gpio', voltage: '3.3V', description: 'UART2 RX', alternateFunctions: ['U2RXD', 'HS1_DATA4', 'EMAC_CLK_OUT'], notes: 'Safe to use. Not available on WROVER (used for PSRAM).', category: ['gpio', 'uart', 'pwm'], side: 'right' },
  { pin: 32, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['ADC2_CH0', 'TOUCH0', 'RTC_GPIO10', 'HSPIHD', 'SD_DATA1', 'EMAC_TX_ER'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'right' },
  { pin: 33, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'Boot mode select - Strapping pin', alternateFunctions: ['ADC2_CH1', 'TOUCH1', 'RTC_GPIO11', 'CLK_OUT1', 'EMAC_TX_CLK'], notes: 'STRAPPING PIN: LOW = bootloader mode, HIGH = normal boot. Has internal pull-up. Connected to BOOT button.', category: ['gpio', 'adc', 'touch', 'strapping', 'pwm'], strapping: true, strappingValue: 'HIGH for normal boot', side: 'right' },
  { pin: 34, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'Onboard LED - Strapping pin', alternateFunctions: ['ADC2_CH2', 'TOUCH2', 'RTC_GPIO12', 'HSPIWP', 'SD_DATA0'], notes: 'STRAPPING PIN: Must be LOW or floating for bootloader. Often connected to onboard LED.', category: ['gpio', 'adc', 'touch', 'strapping', 'pwm'], strapping: true, strappingValue: 'LOW/floating', side: 'right' },
  { pin: 35, name: 'GPIO15', type: 'gpio', voltage: '3.3V', description: 'HSPI CS - Strapping pin', alternateFunctions: ['ADC2_CH3', 'TOUCH3', 'RTC_GPIO13', 'MTDO', 'HSPICS0', 'SD_CMD'], notes: 'STRAPPING PIN: Controls debug log output. Outputs PWM at boot.', category: ['gpio', 'adc', 'touch', 'spi', 'strapping', 'pwm'], strapping: true, strappingValue: 'HIGH', side: 'right' },
  { pin: 36, name: 'GPIO8', type: 'reserved', voltage: '3.3V', description: 'Flash D1 - DO NOT USE', alternateFunctions: ['SD_DATA1', 'SPID', 'HS1_DATA1'], notes: 'Connected to flash memory. Using this pin will crash the chip.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 37, name: 'GPIO7', type: 'reserved', voltage: '3.3V', description: 'Flash D0 - DO NOT USE', alternateFunctions: ['SD_DATA0', 'SPIQ', 'HS1_DATA0'], notes: 'Connected to flash memory. Using this pin will crash the chip.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 38, name: 'GPIO6', type: 'reserved', voltage: '3.3V', description: 'Flash CLK - DO NOT USE', alternateFunctions: ['SD_CLK', 'SPICLK', 'HS1_CLK'], notes: 'Connected to flash memory. Using this pin will crash the chip.', category: ['reserved'], reserved: true, side: 'right' },
]

// ============================================
// ESP32-S3 Pin Data
// ============================================
export const esp32s3Pins = [
  // Power pins
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply output', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable', notes: 'Active high. Pull LOW to reset.', category: ['power', 'special'], side: 'left' },

  // GPIO pins (simplified - key pins shown)
  { pin: 3, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'Strapping pin', alternateFunctions: ['ADC1_CH0', 'RTC_GPIO0'], notes: 'STRAPPING PIN: Boot mode select. Internal pull-up.', category: ['gpio', 'adc', 'strapping'], strapping: true, side: 'left' },
  { pin: 4, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 1', alternateFunctions: ['ADC1_CH1', 'RTC_GPIO1'], notes: 'Safe to use. Low-level glitch at boot.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 5, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 2', alternateFunctions: ['ADC1_CH2', 'RTC_GPIO2'], notes: 'Safe to use. Low-level glitch at boot.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 6, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'Strapping pin', alternateFunctions: ['ADC1_CH3', 'RTC_GPIO3'], notes: 'STRAPPING PIN: JTAG signal source.', category: ['gpio', 'adc', 'strapping'], strapping: true, side: 'left' },
  { pin: 7, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 4', alternateFunctions: ['ADC1_CH4', 'RTC_GPIO4', 'TOUCH4'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 5', alternateFunctions: ['ADC1_CH5', 'RTC_GPIO5', 'TOUCH5'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 9, name: 'GPIO6', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 6', alternateFunctions: ['ADC1_CH6', 'RTC_GPIO6', 'TOUCH6'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 10, name: 'GPIO7', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 7', alternateFunctions: ['ADC1_CH7', 'RTC_GPIO7', 'TOUCH7'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 11, name: 'GPIO8', type: 'gpio', voltage: '3.3V', description: 'Default SDA', alternateFunctions: ['ADC1_CH8', 'RTC_GPIO8', 'TOUCH8', 'SUBSPICS1'], notes: 'Default I2C SDA. Safe to use.', category: ['gpio', 'adc', 'touch', 'i2c', 'pwm'], defaultFunction: 'SDA', side: 'left' },
  { pin: 12, name: 'GPIO9', type: 'gpio', voltage: '3.3V', description: 'Default SCL', alternateFunctions: ['ADC1_CH9', 'RTC_GPIO9', 'TOUCH9', 'FSPIHD'], notes: 'Default I2C SCL. Safe to use.', category: ['gpio', 'adc', 'touch', 'i2c', 'pwm'], defaultFunction: 'SCL', side: 'left' },

  // USB pins
  { pin: 19, name: 'GPIO19', type: 'gpio', voltage: '3.3V', description: 'USB D-', alternateFunctions: ['USB_D-'], notes: 'Used for USB by default. Can be freed by disabling USB.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 20, name: 'GPIO20', type: 'gpio', voltage: '3.3V', description: 'USB D+', alternateFunctions: ['USB_D+'], notes: 'Used for USB by default. Can be freed by disabling USB.', category: ['gpio', 'usb'], side: 'right' },

  // SPI pins (FSPI - default)
  { pin: 35, name: 'GPIO35', type: 'gpio', voltage: '3.3V', description: 'FSPI MOSI / PSRAM', alternateFunctions: ['FSPID', 'SPIIO6'], notes: 'DO NOT USE if module has Octal PSRAM.', category: ['gpio', 'spi'], side: 'right' },
  { pin: 36, name: 'GPIO36', type: 'gpio', voltage: '3.3V', description: 'FSPI CLK / PSRAM', alternateFunctions: ['FSPICLK', 'SPIIO7'], notes: 'DO NOT USE if module has Octal PSRAM.', category: ['gpio', 'spi'], side: 'right' },
  { pin: 37, name: 'GPIO37', type: 'gpio', voltage: '3.3V', description: 'FSPI MISO / PSRAM', alternateFunctions: ['FSPIQ', 'SPIDQS'], notes: 'DO NOT USE if module has Octal PSRAM.', category: ['gpio', 'spi'], side: 'right' },

  // JTAG pins (can be disabled)
  { pin: 39, name: 'GPIO39', type: 'gpio', voltage: '3.3V', description: 'JTAG MTCK', alternateFunctions: ['MTCK', 'CLK_OUT3', 'SUBSPICS1'], notes: 'Pulled-up at boot for JTAG. Can disable via eFuse.', category: ['gpio', 'jtag'], side: 'right' },
  { pin: 40, name: 'GPIO40', type: 'gpio', voltage: '3.3V', description: 'JTAG MTDO', alternateFunctions: ['MTDO', 'CLK_OUT2'], notes: 'JTAG pin. Can be used as GPIO.', category: ['gpio', 'jtag'], side: 'right' },
  { pin: 41, name: 'GPIO41', type: 'gpio', voltage: '3.3V', description: 'JTAG MTDI', alternateFunctions: ['MTDI', 'CLK_OUT1'], notes: 'JTAG pin. Can be used as GPIO.', category: ['gpio', 'jtag'], side: 'right' },
  { pin: 42, name: 'GPIO42', type: 'gpio', voltage: '3.3V', description: 'JTAG MTMS', alternateFunctions: ['MTMS'], notes: 'JTAG pin. Can be used as GPIO.', category: ['gpio', 'jtag'], side: 'right' },

  // Strapping pins
  { pin: 45, name: 'GPIO45', type: 'gpio', voltage: '3.3V', description: 'Strapping - VDD_SPI', alternateFunctions: [], notes: 'STRAPPING PIN: Selects VDD_SPI voltage for flash/PSRAM.', category: ['gpio', 'strapping'], strapping: true, side: 'right' },
  { pin: 46, name: 'GPIO46', type: 'gpio', voltage: '3.3V', description: 'Strapping - ROM log', alternateFunctions: [], notes: 'STRAPPING PIN: Controls boot ROM messages. Input only.', category: ['gpio', 'strapping'], strapping: true, inputOnly: true, side: 'right' },

  // RGB LED (common on devkits)
  { pin: 48, name: 'GPIO48', type: 'gpio', voltage: '3.3V', description: 'RGB LED on devkits', alternateFunctions: ['SPICLK_N', 'SUBSPICS0'], notes: 'Often connected to WS2812 RGB LED on development boards.', category: ['gpio', 'pwm'], side: 'right' },
]

// ============================================
// ESP32-C3 Pin Data (22 GPIOs)
// ============================================
export const esp32c3Pins = [
  // Power
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable', notes: 'Active high reset pin.', category: ['power', 'special'], side: 'left' },

  // ADC pins (ADC1 only, 6 channels)
  { pin: 3, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 0', alternateFunctions: ['ADC1_CH0', 'RTC_GPIO0', 'XTAL_32K_P'], notes: 'Safe to use. Can be 32kHz crystal.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 4, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 1', alternateFunctions: ['ADC1_CH1', 'RTC_GPIO1', 'XTAL_32K_N'], notes: 'Safe to use.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 5, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'Strapping - Boot mode', alternateFunctions: ['ADC1_CH2', 'RTC_GPIO2', 'FSPIQ'], notes: 'STRAPPING PIN: Selects boot mode. Avoid for general use.', category: ['gpio', 'adc', 'strapping'], strapping: true, side: 'left' },
  { pin: 6, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 3', alternateFunctions: ['ADC1_CH3', 'RTC_GPIO3'], notes: 'Safe to use.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 7, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 4', alternateFunctions: ['ADC1_CH4', 'RTC_GPIO4', 'FSPIHD', 'MTMS'], notes: 'Safe to use. JTAG TMS.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 5', alternateFunctions: ['ADC1_CH5', 'RTC_GPIO5', 'FSPIWP', 'MTDI'], notes: 'Safe to use. JTAG TDI.', category: ['gpio', 'adc', 'pwm'], side: 'left' },

  // SPI pins
  { pin: 9, name: 'GPIO6', type: 'gpio', voltage: '3.3V', description: 'FSPI MISO', alternateFunctions: ['FSPICLK', 'MTCK'], notes: 'Default SPI CLK. JTAG TCK.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'SCK', side: 'left' },
  { pin: 10, name: 'GPIO7', type: 'gpio', voltage: '3.3V', description: 'FSPI MOSI', alternateFunctions: ['FSPID', 'MTDO'], notes: 'Default SPI MOSI. JTAG TDO.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'MOSI', side: 'left' },

  // Strapping pins
  { pin: 11, name: 'GPIO8', type: 'gpio', voltage: '3.3V', description: 'Strapping - ROM messages', alternateFunctions: ['RTC_GPIO8'], notes: 'STRAPPING PIN: Controls ROM log output. Default I2C SDA.', category: ['gpio', 'i2c', 'strapping'], strapping: true, defaultFunction: 'SDA', side: 'right' },
  { pin: 12, name: 'GPIO9', type: 'gpio', voltage: '3.3V', description: 'Strapping - Boot mode', alternateFunctions: ['RTC_GPIO9', 'FSPICS0'], notes: 'STRAPPING PIN: Boot source select. Default I2C SCL. Has internal pull-up.', category: ['gpio', 'i2c', 'strapping'], strapping: true, defaultFunction: 'SCL', side: 'right' },

  // General GPIO
  { pin: 13, name: 'GPIO10', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['FSPICS0'], notes: 'Safe to use. Default SPI CS.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'SS', side: 'right' },

  // Flash pins (DO NOT USE)
  { pin: 14, name: 'GPIO11', type: 'reserved', voltage: '3.3V', description: 'Flash VDD - DO NOT USE', notes: 'Connected to internal flash. Will crash if used.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 15, name: 'GPIO12', type: 'reserved', voltage: '3.3V', description: 'Flash SPI HD - DO NOT USE', notes: 'Connected to internal flash.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 16, name: 'GPIO13', type: 'reserved', voltage: '3.3V', description: 'Flash SPI WP - DO NOT USE', notes: 'Connected to internal flash.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 17, name: 'GPIO14', type: 'reserved', voltage: '3.3V', description: 'Flash SPI CS - DO NOT USE', notes: 'Connected to internal flash.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 18, name: 'GPIO15', type: 'reserved', voltage: '3.3V', description: 'Flash SPI CLK - DO NOT USE', notes: 'Connected to internal flash.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 19, name: 'GPIO16', type: 'reserved', voltage: '3.3V', description: 'Flash SPI D - DO NOT USE', notes: 'Connected to internal flash.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 20, name: 'GPIO17', type: 'reserved', voltage: '3.3V', description: 'Flash SPI Q - DO NOT USE', notes: 'Connected to internal flash.', category: ['reserved'], reserved: true, side: 'right' },

  // USB (native)
  { pin: 21, name: 'GPIO18', type: 'gpio', voltage: '3.3V', description: 'USB D-', alternateFunctions: ['USB_D-'], notes: 'Native USB D-. Can be used as GPIO if USB disabled.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 22, name: 'GPIO19', type: 'gpio', voltage: '3.3V', description: 'USB D+', alternateFunctions: ['USB_D+'], notes: 'Native USB D+. Can be used as GPIO if USB disabled.', category: ['gpio', 'usb'], side: 'right' },

  // UART
  { pin: 23, name: 'GPIO20', type: 'gpio', voltage: '3.3V', description: 'UART RX', alternateFunctions: ['U0RXD'], notes: 'Default UART0 RX. Safe to use.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'RX', side: 'right' },
  { pin: 24, name: 'GPIO21', type: 'gpio', voltage: '3.3V', description: 'UART TX', alternateFunctions: ['U0TXD'], notes: 'Default UART0 TX. Safe to use.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'TX', side: 'right' },
]

// ============================================
// ESP32-C6 Pin Data
// ============================================
export const esp32c6Pins = [
  // Power
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable', notes: 'Active high reset pin.', category: ['power', 'special'], side: 'left' },

  // ADC pins (7 channels)
  { pin: 3, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 0', alternateFunctions: ['ADC1_CH0', 'RTC_GPIO0', 'XTAL_32K_P'], notes: 'Safe to use.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 4, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 1', alternateFunctions: ['ADC1_CH1', 'RTC_GPIO1', 'XTAL_32K_N'], notes: 'Safe to use.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 5, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 2', alternateFunctions: ['ADC1_CH2', 'RTC_GPIO2'], notes: 'Safe to use.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 6, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 3', alternateFunctions: ['ADC1_CH3', 'RTC_GPIO3', 'LP_GPIO3'], notes: 'Safe to use. LP (low-power) GPIO.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 7, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 4', alternateFunctions: ['ADC1_CH4', 'RTC_GPIO4', 'LP_GPIO4', 'MTMS'], notes: 'JTAG TMS. LP GPIO.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 5', alternateFunctions: ['ADC1_CH5', 'RTC_GPIO5', 'LP_GPIO5', 'MTDI'], notes: 'JTAG TDI. LP GPIO.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 9, name: 'GPIO6', type: 'gpio', voltage: '3.3V', description: 'ADC1 Channel 6', alternateFunctions: ['ADC1_CH6', 'RTC_GPIO6', 'LP_GPIO6', 'MTCK'], notes: 'JTAG TCK. LP GPIO.', category: ['gpio', 'adc', 'pwm'], side: 'left' },

  // Strapping pins
  { pin: 10, name: 'GPIO8', type: 'gpio', voltage: '3.3V', description: 'Strapping pin', alternateFunctions: ['LP_GPIO8'], notes: 'STRAPPING PIN: Controls boot mode. Default I2C SDA.', category: ['gpio', 'i2c', 'strapping'], strapping: true, defaultFunction: 'SDA', side: 'left' },
  { pin: 11, name: 'GPIO9', type: 'gpio', voltage: '3.3V', description: 'Strapping pin', alternateFunctions: ['LP_GPIO9', 'FSPICS0'], notes: 'STRAPPING PIN: Boot source. Default I2C SCL.', category: ['gpio', 'i2c', 'strapping'], strapping: true, defaultFunction: 'SCL', side: 'right' },
  { pin: 12, name: 'GPIO15', type: 'gpio', voltage: '3.3V', description: 'Strapping pin', alternateFunctions: [], notes: 'STRAPPING PIN: Core voltage selection.', category: ['gpio', 'strapping'], strapping: true, side: 'right' },

  // USB (native)
  { pin: 13, name: 'GPIO12', type: 'gpio', voltage: '3.3V', description: 'USB D-', alternateFunctions: ['USB_D-'], notes: 'Native USB D-.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 14, name: 'GPIO13', type: 'gpio', voltage: '3.3V', description: 'USB D+', alternateFunctions: ['USB_D+'], notes: 'Native USB D+.', category: ['gpio', 'usb'], side: 'right' },

  // UART
  { pin: 15, name: 'GPIO16', type: 'gpio', voltage: '3.3V', description: 'UART TX', alternateFunctions: ['U0TXD'], notes: 'Default UART0 TX.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'TX', side: 'right' },
  { pin: 16, name: 'GPIO17', type: 'gpio', voltage: '3.3V', description: 'UART RX', alternateFunctions: ['U0RXD'], notes: 'Default UART0 RX.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'RX', side: 'right' },

  // SPI
  { pin: 17, name: 'GPIO18', type: 'gpio', voltage: '3.3V', description: 'SDIO / SPI', alternateFunctions: ['SDIO_CLK', 'FSPICS0'], notes: 'SDIO CLK or SPI CS.', category: ['gpio', 'spi', 'sdio', 'pwm'], side: 'right' },
  { pin: 18, name: 'GPIO19', type: 'gpio', voltage: '3.3V', description: 'SDIO / SPI', alternateFunctions: ['SDIO_CMD', 'FSPICLK'], notes: 'SDIO CMD or SPI CLK.', category: ['gpio', 'spi', 'sdio', 'pwm'], defaultFunction: 'SCK', side: 'right' },
  { pin: 19, name: 'GPIO20', type: 'gpio', voltage: '3.3V', description: 'SDIO / SPI', alternateFunctions: ['SDIO_D0', 'FSPID'], notes: 'SDIO D0 or SPI MOSI.', category: ['gpio', 'spi', 'sdio', 'pwm'], defaultFunction: 'MOSI', side: 'right' },
  { pin: 20, name: 'GPIO21', type: 'gpio', voltage: '3.3V', description: 'SDIO / SPI', alternateFunctions: ['SDIO_D1', 'FSPIQ'], notes: 'SDIO D1 or SPI MISO.', category: ['gpio', 'spi', 'sdio', 'pwm'], defaultFunction: 'MISO', side: 'right' },
  { pin: 21, name: 'GPIO22', type: 'gpio', voltage: '3.3V', description: 'SDIO D2', alternateFunctions: ['SDIO_D2', 'FSPIHD'], notes: 'SDIO D2 or SPI HD.', category: ['gpio', 'spi', 'sdio', 'pwm'], side: 'right' },
  { pin: 22, name: 'GPIO23', type: 'gpio', voltage: '3.3V', description: 'SDIO D3', alternateFunctions: ['SDIO_D3', 'FSPIWP'], notes: 'SDIO D3 or SPI WP.', category: ['gpio', 'spi', 'sdio', 'pwm'], side: 'right' },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getPinsByCategory(pins, category) {
  return pins.filter(pin => pin.category.includes(category))
}

export function getStrappingPins(pins) {
  return pins.filter(pin => pin.strapping)
}

export function getReservedPins(pins) {
  return pins.filter(pin => pin.reserved)
}

export function getSafePins(pins) {
  return pins.filter(pin => !pin.strapping && !pin.reserved && pin.type === 'gpio')
}

export function getInputOnlyPins(pins) {
  return pins.filter(pin => pin.inputOnly)
}

export function getPinByName(pins, name) {
  return pins.find(pin =>
    pin.name.toLowerCase() === name.toLowerCase() ||
    (pin.alternateFunctions || []).some(f => f.toLowerCase() === name.toLowerCase())
  )
}

export function getADCPins(pins) {
  return pins.filter(pin =>
    pin.category.includes('adc') ||
    (pin.alternateFunctions || []).some(f => f.startsWith('ADC'))
  )
}

export function getDACPins(pins) {
  return pins.filter(pin =>
    pin.category.includes('dac') ||
    (pin.alternateFunctions || []).some(f => f.startsWith('DAC'))
  )
}

export function getTouchPins(pins) {
  return pins.filter(pin =>
    pin.category.includes('touch') ||
    (pin.alternateFunctions || []).some(f => f.startsWith('TOUCH'))
  )
}

// Map variant IDs to pin data
export const pinoutsByVariant = {
  'esp32': esp32Pins,
  'esp32-s3': esp32s3Pins,
  'esp32-c3': esp32c3Pins,
  'esp32-c6': esp32c6Pins,
  // More can be added
}

// Quick reference for safe GPIO pins
export const safeGPIOsByVariant = {
  'esp32': [4, 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33],
  'esp32-s3': [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 38, 39, 40, 41, 42, 47, 48],
  'esp32-c3': [0, 1, 3, 4, 5, 6, 7, 10, 20, 21],
  'esp32-c6': [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 14, 18, 19, 20, 21, 22, 23],
}

// Default I2C and SPI pins by variant
export const defaultPinsByVariant = {
  'esp32': {
    i2c: { sda: 21, scl: 22 },
    spi: { mosi: 23, miso: 19, sck: 18, cs: 5 },
    uart: { tx: 1, rx: 3 },
  },
  'esp32-s3': {
    i2c: { sda: 8, scl: 9 },
    spi: { mosi: 35, miso: 37, sck: 36, cs: 10 },
    uart: { tx: 43, rx: 44 },
  },
  'esp32-c3': {
    i2c: { sda: 8, scl: 9 },
    spi: { mosi: 7, miso: 6, sck: 6, cs: 10 },
    uart: { tx: 21, rx: 20 },
  },
  'esp32-c6': {
    i2c: { sda: 8, scl: 9 },
    spi: { mosi: 20, miso: 21, sck: 19, cs: 18 },
    uart: { tx: 16, rx: 17 },
  },
}
