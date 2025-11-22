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
// ESP32-S2 Pin Data (43 GPIOs: GPIO0-21, GPIO26-46)
// ============================================
export const esp32s2Pins = [
  // Power pins
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply output', notes: 'Regulated 3.3V output. Max 500mA.', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable (active high)', notes: 'Connect 10kΩ pull-up to 3V3. Pull LOW to reset.', category: ['power', 'special'], side: 'left' },

  // ADC1 + Touch pins (GPIO1-10)
  { pin: 3, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'Strapping - Boot mode', alternateFunctions: ['RTC_GPIO0'], notes: 'STRAPPING PIN: Boot mode select. Internal pull-up.', category: ['gpio', 'strapping'], strapping: true, strappingValue: 'HIGH for normal boot', side: 'left' },
  { pin: 4, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH0 / Touch1', alternateFunctions: ['ADC1_CH0', 'TOUCH1', 'RTC_GPIO1'], notes: 'Safe to use. ADC and touch capable.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 5, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH1 / Touch2', alternateFunctions: ['ADC1_CH1', 'TOUCH2', 'RTC_GPIO2'], notes: 'Safe to use. ADC and touch capable.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 6, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH2 / Touch3', alternateFunctions: ['ADC1_CH2', 'TOUCH3', 'RTC_GPIO3'], notes: 'Safe to use. ADC and touch capable.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 7, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH3 / Touch4', alternateFunctions: ['ADC1_CH3', 'TOUCH4', 'RTC_GPIO4'], notes: 'Safe to use. ADC and touch capable.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH4 / Touch5', alternateFunctions: ['ADC1_CH4', 'TOUCH5', 'RTC_GPIO5'], notes: 'Safe to use. ADC and touch capable.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 9, name: 'GPIO6', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH5 / Touch6', alternateFunctions: ['ADC1_CH5', 'TOUCH6', 'RTC_GPIO6'], notes: 'Safe to use. ADC and touch capable.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 10, name: 'GPIO7', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH6 / Touch7', alternateFunctions: ['ADC1_CH6', 'TOUCH7', 'RTC_GPIO7'], notes: 'Safe to use. ADC and touch capable.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 11, name: 'GPIO8', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH7 / Touch8', alternateFunctions: ['ADC1_CH7', 'TOUCH8', 'RTC_GPIO8'], notes: 'Safe to use. ADC and touch capable.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 12, name: 'GPIO9', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH8 / Touch9', alternateFunctions: ['ADC1_CH8', 'TOUCH9', 'RTC_GPIO9', 'FSPIHD'], notes: 'Safe to use. ADC, touch, and SPI capable.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], side: 'left' },
  { pin: 13, name: 'GPIO10', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH9 / Touch10', alternateFunctions: ['ADC1_CH9', 'TOUCH10', 'RTC_GPIO10', 'FSPICS0', 'FSPIIO4'], notes: 'Safe to use. Default SPI CS.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], defaultFunction: 'SS', side: 'left' },

  // ADC2 + Touch pins (GPIO11-14)
  { pin: 14, name: 'GPIO11', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH0 / Touch11', alternateFunctions: ['ADC2_CH0', 'TOUCH11', 'RTC_GPIO11', 'FSPID', 'FSPIIO5'], notes: 'ADC2 not usable when WiFi active. Default SPI MOSI.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], defaultFunction: 'MOSI', side: 'left' },
  { pin: 15, name: 'GPIO12', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH1 / Touch12', alternateFunctions: ['ADC2_CH1', 'TOUCH12', 'RTC_GPIO12', 'FSPICLK', 'FSPIIO6'], notes: 'ADC2 not usable when WiFi active. Default SPI CLK.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], defaultFunction: 'SCK', side: 'left' },
  { pin: 16, name: 'GPIO13', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH2 / Touch13', alternateFunctions: ['ADC2_CH2', 'TOUCH13', 'RTC_GPIO13', 'FSPIQ', 'FSPIIO7'], notes: 'ADC2 not usable when WiFi active. Default SPI MISO.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], defaultFunction: 'MISO', side: 'right' },
  { pin: 17, name: 'GPIO14', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH3 / Touch14', alternateFunctions: ['ADC2_CH3', 'TOUCH14', 'RTC_GPIO14', 'FSPIWP', 'FSPIDQS'], notes: 'ADC2 not usable when WiFi active.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'right' },

  // ADC2 continued (GPIO15-20)
  { pin: 18, name: 'GPIO15', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH4 / XTAL', alternateFunctions: ['ADC2_CH4', 'RTC_GPIO15', 'XTAL_32K_P', 'U0RTS'], notes: 'Can be 32kHz crystal input.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 19, name: 'GPIO16', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH5 / XTAL', alternateFunctions: ['ADC2_CH5', 'RTC_GPIO16', 'XTAL_32K_N', 'U0CTS'], notes: 'Can be 32kHz crystal input.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 20, name: 'GPIO17', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH6 / DAC1', alternateFunctions: ['ADC2_CH6', 'RTC_GPIO17', 'DAC1', 'U1TXD'], notes: 'DAC channel 1. One of two analog outputs.', category: ['gpio', 'adc', 'dac', 'uart', 'pwm'], side: 'right' },
  { pin: 21, name: 'GPIO18', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH7 / DAC2', alternateFunctions: ['ADC2_CH7', 'RTC_GPIO18', 'DAC2', 'U1RXD', 'CLK_OUT3'], notes: 'DAC channel 2. One of two analog outputs.', category: ['gpio', 'adc', 'dac', 'uart', 'pwm'], side: 'right' },
  { pin: 22, name: 'GPIO19', type: 'gpio', voltage: '3.3V', description: 'USB D- / ADC2 CH8', alternateFunctions: ['ADC2_CH8', 'RTC_GPIO19', 'USB_D-', 'U1RTS', 'CLK_OUT2'], notes: 'Native USB D-. Can be used as GPIO if USB disabled.', category: ['gpio', 'adc', 'usb', 'pwm'], side: 'right' },
  { pin: 23, name: 'GPIO20', type: 'gpio', voltage: '3.3V', description: 'USB D+ / ADC2 CH9', alternateFunctions: ['ADC2_CH9', 'RTC_GPIO20', 'USB_D+', 'U1CTS', 'CLK_OUT1'], notes: 'Native USB D+. Can be used as GPIO if USB disabled.', category: ['gpio', 'adc', 'usb', 'pwm'], side: 'right' },
  { pin: 24, name: 'GPIO21', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['RTC_GPIO21'], notes: 'Safe to use. General purpose.', category: ['gpio', 'pwm'], side: 'right' },

  // Note: GPIO22-25 do not exist on ESP32-S2

  // Flash/PSRAM pins (GPIO26-32) - typically reserved
  { pin: 25, name: 'GPIO26', type: 'reserved', voltage: '3.3V', description: 'SPICS1 - Flash/PSRAM', alternateFunctions: ['SPICS1'], notes: 'Usually connected to flash/PSRAM. Avoid using.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 26, name: 'GPIO27', type: 'reserved', voltage: '3.3V', description: 'SPIHD - Flash', alternateFunctions: ['SPIHD'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 27, name: 'GPIO28', type: 'reserved', voltage: '3.3V', description: 'SPIWP - Flash', alternateFunctions: ['SPIWP'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 28, name: 'GPIO29', type: 'reserved', voltage: '3.3V', description: 'SPICS0 - Flash', alternateFunctions: ['SPICS0'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 29, name: 'GPIO30', type: 'reserved', voltage: '3.3V', description: 'SPICLK - Flash', alternateFunctions: ['SPICLK'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 30, name: 'GPIO31', type: 'reserved', voltage: '3.3V', description: 'SPIQ - Flash', alternateFunctions: ['SPIQ'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 31, name: 'GPIO32', type: 'reserved', voltage: '3.3V', description: 'SPID - Flash', alternateFunctions: ['SPID'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },

  // General GPIO (GPIO33-44)
  { pin: 32, name: 'GPIO33', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIIO4', 'FSPIHD'], notes: 'Safe to use. May be connected to PSRAM on some modules.', category: ['gpio', 'spi', 'pwm'], side: 'left' },
  { pin: 33, name: 'GPIO34', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIIO5', 'FSPICS0'], notes: 'Safe to use. May be connected to PSRAM on some modules.', category: ['gpio', 'spi', 'pwm'], side: 'left' },
  { pin: 34, name: 'GPIO35', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIIO6', 'FSPID'], notes: 'Safe to use on modules without PSRAM.', category: ['gpio', 'spi', 'pwm'], side: 'left' },
  { pin: 35, name: 'GPIO36', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIIO7', 'FSPICLK'], notes: 'Safe to use on modules without PSRAM.', category: ['gpio', 'spi', 'pwm'], side: 'left' },
  { pin: 36, name: 'GPIO37', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIDQS', 'FSPIQ'], notes: 'Safe to use on modules without PSRAM.', category: ['gpio', 'spi', 'pwm'], side: 'left' },
  { pin: 37, name: 'GPIO38', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['FSPIWP'], notes: 'Safe to use.', category: ['gpio', 'spi', 'pwm'], side: 'left' },
  { pin: 38, name: 'GPIO39', type: 'gpio', voltage: '3.3V', description: 'JTAG MTCK', alternateFunctions: ['MTCK', 'CLK_OUT3'], notes: 'JTAG clock. Can be used as GPIO.', category: ['gpio', 'jtag', 'pwm'], side: 'left' },
  { pin: 39, name: 'GPIO40', type: 'gpio', voltage: '3.3V', description: 'JTAG MTDO', alternateFunctions: ['MTDO', 'CLK_OUT2'], notes: 'JTAG data out. Can be used as GPIO.', category: ['gpio', 'jtag', 'pwm'], side: 'left' },
  { pin: 40, name: 'GPIO41', type: 'gpio', voltage: '3.3V', description: 'JTAG MTDI', alternateFunctions: ['MTDI', 'CLK_OUT1'], notes: 'JTAG data in. Can be used as GPIO.', category: ['gpio', 'jtag', 'pwm'], side: 'left' },
  { pin: 41, name: 'GPIO42', type: 'gpio', voltage: '3.3V', description: 'JTAG MTMS', alternateFunctions: ['MTMS'], notes: 'JTAG mode select. Can be used as GPIO.', category: ['gpio', 'jtag', 'pwm'], side: 'left' },
  { pin: 42, name: 'GPIO43', type: 'gpio', voltage: '3.3V', description: 'UART0 TX', alternateFunctions: ['U0TXD', 'CLK_OUT1'], notes: 'Default UART0 TX for debugging.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'TX', side: 'left' },
  { pin: 43, name: 'GPIO44', type: 'gpio', voltage: '3.3V', description: 'UART0 RX', alternateFunctions: ['U0RXD', 'CLK_OUT2'], notes: 'Default UART0 RX for debugging.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'RX', side: 'left' },

  // Strapping pins at end
  { pin: 44, name: 'GPIO45', type: 'gpio', voltage: '3.3V', description: 'Strapping - VDD_SPI', alternateFunctions: [], notes: 'STRAPPING PIN: Selects VDD_SPI voltage (1.8V/3.3V).', category: ['gpio', 'strapping'], strapping: true, side: 'right' },
  { pin: 45, name: 'GPIO46', type: 'input', voltage: '3.3V', description: 'Strapping - Input only', alternateFunctions: [], notes: 'STRAPPING PIN: Input only. Fixed pull-down. Controls ROM log.', category: ['gpio', 'strapping'], strapping: true, inputOnly: true, side: 'right' },

  // Power pins
  { pin: 46, name: 'GND', type: 'ground', voltage: '0V', description: 'Ground', notes: 'Connect to circuit ground.', category: ['power'], side: 'right' },
  { pin: 47, name: 'VIN', type: 'power', voltage: '5V', description: 'USB/External 5V input', notes: 'Input voltage for onboard regulator.', category: ['power'], side: 'right' },
]

// ============================================
// ESP32-S3 Pin Data (45 GPIOs: GPIO0-21, GPIO26-48)
// ============================================
export const esp32s3Pins = [
  // Power pins
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply output', notes: 'Regulated 3.3V output. Max 500mA.', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable', notes: 'Active high. Pull LOW to reset.', category: ['power', 'special'], side: 'left' },

  // ADC1 + Touch pins (GPIO0-10)
  { pin: 3, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'Strapping - Boot mode', alternateFunctions: ['ADC1_CH0', 'RTC_GPIO0'], notes: 'STRAPPING PIN: Boot mode select. Internal pull-up.', category: ['gpio', 'adc', 'strapping'], strapping: true, strappingValue: 'HIGH for normal boot', side: 'left' },
  { pin: 4, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH0 / Touch1', alternateFunctions: ['ADC1_CH0', 'TOUCH1', 'RTC_GPIO1'], notes: 'Safe to use. Low-level glitch at boot.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 5, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH1 / Touch2', alternateFunctions: ['ADC1_CH1', 'TOUCH2', 'RTC_GPIO2'], notes: 'Safe to use. Low-level glitch at boot.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 6, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'Strapping - JTAG', alternateFunctions: ['ADC1_CH2', 'TOUCH3', 'RTC_GPIO3'], notes: 'STRAPPING PIN: JTAG signal source selection.', category: ['gpio', 'adc', 'touch', 'strapping'], strapping: true, side: 'left' },
  { pin: 7, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH3 / Touch4', alternateFunctions: ['ADC1_CH3', 'TOUCH4', 'RTC_GPIO4'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH4 / Touch5', alternateFunctions: ['ADC1_CH4', 'TOUCH5', 'RTC_GPIO5'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 9, name: 'GPIO6', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH5 / Touch6', alternateFunctions: ['ADC1_CH5', 'TOUCH6', 'RTC_GPIO6'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 10, name: 'GPIO7', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH6 / Touch7', alternateFunctions: ['ADC1_CH6', 'TOUCH7', 'RTC_GPIO7'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'left' },
  { pin: 11, name: 'GPIO8', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH7 / Touch8 / SDA', alternateFunctions: ['ADC1_CH7', 'TOUCH8', 'RTC_GPIO8', 'SUBSPICS1'], notes: 'Default I2C SDA. Safe to use.', category: ['gpio', 'adc', 'touch', 'i2c', 'pwm'], defaultFunction: 'SDA', side: 'left' },
  { pin: 12, name: 'GPIO9', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH8 / Touch9 / SCL', alternateFunctions: ['ADC1_CH8', 'TOUCH9', 'RTC_GPIO9', 'FSPIHD'], notes: 'Default I2C SCL. Safe to use.', category: ['gpio', 'adc', 'touch', 'i2c', 'pwm'], defaultFunction: 'SCL', side: 'left' },
  { pin: 13, name: 'GPIO10', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH9 / Touch10', alternateFunctions: ['ADC1_CH9', 'TOUCH10', 'RTC_GPIO10', 'FSPICS0', 'FSPIIO4'], notes: 'Default SPI CS. Safe to use.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], defaultFunction: 'SS', side: 'left' },
  { pin: 14, name: 'GPIO11', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH0 / Touch11', alternateFunctions: ['ADC2_CH0', 'TOUCH11', 'RTC_GPIO11', 'FSPID', 'FSPIIO5'], notes: 'Default SPI MOSI. Safe to use.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], defaultFunction: 'MOSI', side: 'left' },
  { pin: 15, name: 'GPIO12', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH1 / Touch12', alternateFunctions: ['ADC2_CH1', 'TOUCH12', 'RTC_GPIO12', 'FSPICLK', 'FSPIIO6'], notes: 'Default SPI CLK. Safe to use.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], defaultFunction: 'SCK', side: 'left' },
  { pin: 16, name: 'GPIO13', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH2 / Touch13', alternateFunctions: ['ADC2_CH2', 'TOUCH13', 'RTC_GPIO13', 'FSPIQ', 'FSPIIO7'], notes: 'Default SPI MISO. Safe to use.', category: ['gpio', 'adc', 'touch', 'spi', 'pwm'], defaultFunction: 'MISO', side: 'right' },
  { pin: 17, name: 'GPIO14', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH3 / Touch14', alternateFunctions: ['ADC2_CH3', 'TOUCH14', 'RTC_GPIO14', 'FSPIWP', 'FSPIDQS'], notes: 'Safe to use.', category: ['gpio', 'adc', 'touch', 'pwm'], side: 'right' },

  // General GPIO (GPIO15-18)
  { pin: 18, name: 'GPIO15', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH4 / XTAL', alternateFunctions: ['ADC2_CH4', 'RTC_GPIO15', 'XTAL_32K_P', 'U0RTS'], notes: 'Can be 32kHz crystal input.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 19, name: 'GPIO16', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH5 / XTAL', alternateFunctions: ['ADC2_CH5', 'RTC_GPIO16', 'XTAL_32K_N', 'U0CTS'], notes: 'Can be 32kHz crystal input.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 20, name: 'GPIO17', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH6', alternateFunctions: ['ADC2_CH6', 'RTC_GPIO17', 'U1TXD'], notes: 'UART1 TX capable. Safe to use.', category: ['gpio', 'adc', 'uart', 'pwm'], side: 'right' },
  { pin: 21, name: 'GPIO18', type: 'gpio', voltage: '3.3V', description: 'ADC2 CH7', alternateFunctions: ['ADC2_CH7', 'RTC_GPIO18', 'U1RXD', 'CLK_OUT3'], notes: 'UART1 RX capable. Safe to use.', category: ['gpio', 'adc', 'uart', 'pwm'], side: 'right' },

  // USB pins
  { pin: 22, name: 'GPIO19', type: 'gpio', voltage: '3.3V', description: 'USB D-', alternateFunctions: ['USB_D-', 'U1RTS', 'CLK_OUT2'], notes: 'Native USB D-. Used for USB by default.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 23, name: 'GPIO20', type: 'gpio', voltage: '3.3V', description: 'USB D+', alternateFunctions: ['USB_D+', 'U1CTS', 'CLK_OUT1'], notes: 'Native USB D+. Used for USB by default.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 24, name: 'GPIO21', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['RTC_GPIO21'], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },

  // Note: GPIO22-25 do not exist on ESP32-S3

  // Flash/PSRAM area (GPIO26-32)
  { pin: 25, name: 'GPIO26', type: 'reserved', voltage: '3.3V', description: 'SPICS1 - Flash', alternateFunctions: ['SPICS1'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 26, name: 'GPIO27', type: 'reserved', voltage: '3.3V', description: 'SPIHD - Flash', alternateFunctions: ['SPIHD'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 27, name: 'GPIO28', type: 'reserved', voltage: '3.3V', description: 'SPIWP - Flash', alternateFunctions: ['SPIWP'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 28, name: 'GPIO29', type: 'reserved', voltage: '3.3V', description: 'SPICS0 - Flash', alternateFunctions: ['SPICS0'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 29, name: 'GPIO30', type: 'reserved', voltage: '3.3V', description: 'SPICLK - Flash', alternateFunctions: ['SPICLK'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 30, name: 'GPIO31', type: 'reserved', voltage: '3.3V', description: 'SPIQ - Flash', alternateFunctions: ['SPIQ'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'left' },
  { pin: 31, name: 'GPIO32', type: 'reserved', voltage: '3.3V', description: 'SPID - Flash', alternateFunctions: ['SPID'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'left' },

  // Octal PSRAM pins (GPIO33-37) - may be reserved on N*R8 modules
  { pin: 32, name: 'GPIO33', type: 'gpio', voltage: '3.3V', description: 'SPIIO4 / PSRAM', alternateFunctions: ['SPIIO4', 'FSPIHD', 'SUBSPIHD'], notes: 'Reserved on Octal PSRAM modules (N*R8).', category: ['gpio', 'spi', 'pwm'], side: 'left' },
  { pin: 33, name: 'GPIO34', type: 'gpio', voltage: '3.3V', description: 'SPIIO5 / PSRAM', alternateFunctions: ['SPIIO5', 'FSPICS0', 'SUBSPICS0'], notes: 'Reserved on Octal PSRAM modules (N*R8).', category: ['gpio', 'spi', 'pwm'], side: 'left' },
  { pin: 34, name: 'GPIO35', type: 'gpio', voltage: '3.3V', description: 'SPIIO6 / PSRAM', alternateFunctions: ['SPIIO6', 'FSPID', 'SUBSPID'], notes: 'DO NOT USE on Octal PSRAM modules (N*R8).', category: ['gpio', 'spi'], side: 'left' },
  { pin: 35, name: 'GPIO36', type: 'gpio', voltage: '3.3V', description: 'SPIIO7 / PSRAM', alternateFunctions: ['SPIIO7', 'FSPICLK', 'SUBSPICLK'], notes: 'DO NOT USE on Octal PSRAM modules (N*R8).', category: ['gpio', 'spi'], side: 'left' },
  { pin: 36, name: 'GPIO37', type: 'gpio', voltage: '3.3V', description: 'SPIDQS / PSRAM', alternateFunctions: ['SPIDQS', 'FSPIQ', 'SUBSPIQ'], notes: 'DO NOT USE on Octal PSRAM modules (N*R8).', category: ['gpio', 'spi'], side: 'left' },

  // General GPIO (GPIO38-44)
  { pin: 37, name: 'GPIO38', type: 'gpio', voltage: '3.3V', description: 'RGB LED / FSPIWP', alternateFunctions: ['FSPIWP', 'SUBSPIWP'], notes: 'Often connected to RGB LED on devkits.', category: ['gpio', 'spi', 'pwm'], side: 'right' },
  { pin: 38, name: 'GPIO39', type: 'gpio', voltage: '3.3V', description: 'JTAG MTCK', alternateFunctions: ['MTCK', 'CLK_OUT3', 'SUBSPICS1'], notes: 'JTAG clock. Pulled-up at boot.', category: ['gpio', 'jtag', 'pwm'], side: 'right' },
  { pin: 39, name: 'GPIO40', type: 'gpio', voltage: '3.3V', description: 'JTAG MTDO', alternateFunctions: ['MTDO', 'CLK_OUT2'], notes: 'JTAG data out. Can be used as GPIO.', category: ['gpio', 'jtag', 'pwm'], side: 'right' },
  { pin: 40, name: 'GPIO41', type: 'gpio', voltage: '3.3V', description: 'JTAG MTDI', alternateFunctions: ['MTDI', 'CLK_OUT1'], notes: 'JTAG data in. Can be used as GPIO.', category: ['gpio', 'jtag', 'pwm'], side: 'right' },
  { pin: 41, name: 'GPIO42', type: 'gpio', voltage: '3.3V', description: 'JTAG MTMS', alternateFunctions: ['MTMS'], notes: 'JTAG mode select. Can be used as GPIO.', category: ['gpio', 'jtag', 'pwm'], side: 'right' },
  { pin: 42, name: 'GPIO43', type: 'gpio', voltage: '3.3V', description: 'UART0 TX', alternateFunctions: ['U0TXD', 'CLK_OUT1'], notes: 'Default UART0 TX. Used for serial output.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'TX', side: 'right' },
  { pin: 43, name: 'GPIO44', type: 'gpio', voltage: '3.3V', description: 'UART0 RX', alternateFunctions: ['U0RXD', 'CLK_OUT2'], notes: 'Default UART0 RX. Used for serial input.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'RX', side: 'right' },

  // Strapping pins
  { pin: 44, name: 'GPIO45', type: 'gpio', voltage: '3.3V', description: 'Strapping - VDD_SPI', alternateFunctions: [], notes: 'STRAPPING PIN: Selects VDD_SPI voltage (1.8V/3.3V).', category: ['gpio', 'strapping'], strapping: true, side: 'right' },
  { pin: 45, name: 'GPIO46', type: 'input', voltage: '3.3V', description: 'Strapping - Input only', alternateFunctions: [], notes: 'STRAPPING PIN: Input only. Controls ROM log output.', category: ['gpio', 'strapping'], strapping: true, inputOnly: true, side: 'right' },

  // High GPIOs
  { pin: 46, name: 'GPIO47', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPICLK_P', 'SUBSPICLK_P_DIFF'], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 47, name: 'GPIO48', type: 'gpio', voltage: '3.3V', description: 'RGB LED on devkits', alternateFunctions: ['SPICLK_N', 'SUBSPICLK_N_DIFF'], notes: 'Often connected to WS2812 RGB LED.', category: ['gpio', 'pwm'], side: 'right' },

  // Power pins
  { pin: 48, name: 'GND', type: 'ground', voltage: '0V', description: 'Ground', category: ['power'], side: 'right' },
  { pin: 49, name: 'VIN', type: 'power', voltage: '5V', description: 'USB/External 5V input', category: ['power'], side: 'right' },
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
// ESP32-H2 Pin Data (26 GPIOs - Thread/Zigbee focused, NO WiFi)
// ============================================
export const esp32h2Pins = [
  // Power pins
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply output', notes: 'Regulated 3.3V output.', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable', notes: 'Active high reset pin.', category: ['power', 'special'], side: 'left' },

  // ADC pins (5 channels on GPIO0-4)
  { pin: 3, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH0 / XTAL', alternateFunctions: ['ADC1_CH0', 'LP_GPIO0', 'XTAL_32K_P'], notes: 'Safe to use. Can be 32kHz crystal input.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 4, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH1 / XTAL', alternateFunctions: ['ADC1_CH1', 'LP_GPIO1', 'XTAL_32K_N'], notes: 'Safe to use. Can be 32kHz crystal input.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 5, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'Strapping - ADC1 CH2', alternateFunctions: ['ADC1_CH2', 'LP_GPIO2', 'FSPIQ'], notes: 'STRAPPING PIN: Boot mode select.', category: ['gpio', 'adc', 'strapping'], strapping: true, side: 'left' },
  { pin: 6, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'Strapping - ADC1 CH3', alternateFunctions: ['ADC1_CH3', 'LP_GPIO3'], notes: 'STRAPPING PIN: JTAG signal source.', category: ['gpio', 'adc', 'strapping'], strapping: true, side: 'left' },
  { pin: 7, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH4 / JTAG', alternateFunctions: ['ADC1_CH4', 'LP_GPIO4', 'FSPIHD', 'MTMS'], notes: 'JTAG TMS. Safe to use.', category: ['gpio', 'adc', 'jtag', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'JTAG MTDI', alternateFunctions: ['LP_GPIO5', 'FSPIWP', 'MTDI'], notes: 'JTAG TDI. Safe to use.', category: ['gpio', 'jtag', 'pwm'], side: 'left' },

  // Strapping pins
  { pin: 9, name: 'GPIO8', type: 'gpio', voltage: '3.3V', description: 'Strapping - I2C SDA', alternateFunctions: ['LP_GPIO8'], notes: 'STRAPPING PIN: ROM messages. Default I2C SDA.', category: ['gpio', 'i2c', 'strapping'], strapping: true, defaultFunction: 'SDA', side: 'left' },
  { pin: 10, name: 'GPIO9', type: 'gpio', voltage: '3.3V', description: 'Strapping - I2C SCL', alternateFunctions: ['LP_GPIO9', 'FSPICS0'], notes: 'STRAPPING PIN: Boot source. Default I2C SCL.', category: ['gpio', 'i2c', 'strapping'], strapping: true, defaultFunction: 'SCL', side: 'right' },

  // General GPIO (GPIO10-14)
  { pin: 11, name: 'GPIO10', type: 'gpio', voltage: '3.3V', description: 'SPI CS / LED', alternateFunctions: ['FSPICS0'], notes: 'Default SPI CS. Often RGB LED on devkits.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'SS', side: 'right' },
  { pin: 12, name: 'GPIO11', type: 'gpio', voltage: '3.3V', description: 'SPI MOSI', alternateFunctions: ['FSPID'], notes: 'Default SPI MOSI.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'MOSI', side: 'right' },
  { pin: 13, name: 'GPIO12', type: 'gpio', voltage: '3.3V', description: 'SPI CLK / JTAG', alternateFunctions: ['FSPICLK', 'MTCK'], notes: 'Default SPI CLK. JTAG TCK.', category: ['gpio', 'spi', 'jtag', 'pwm'], defaultFunction: 'SCK', side: 'right' },
  { pin: 14, name: 'GPIO13', type: 'gpio', voltage: '3.3V', description: 'SPI MISO / JTAG', alternateFunctions: ['FSPIQ', 'MTDO'], notes: 'Default SPI MISO. JTAG TDO.', category: ['gpio', 'spi', 'jtag', 'pwm'], defaultFunction: 'MISO', side: 'right' },
  { pin: 15, name: 'GPIO14', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },

  // Flash reserved pins (GPIO15-21)
  { pin: 16, name: 'GPIO15', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPICS0'], notes: 'Connected to SiP flash. Not available.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 17, name: 'GPIO16', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPIQ'], notes: 'Connected to SiP flash. Not available.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 18, name: 'GPIO17', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPIWP'], notes: 'Connected to SiP flash. Not available.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 19, name: 'GPIO18', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPIHD'], notes: 'Connected to SiP flash. Not available.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 20, name: 'GPIO19', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPICLK'], notes: 'Connected to SiP flash. Not available.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 21, name: 'GPIO20', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPID'], notes: 'Connected to SiP flash. Not available.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 22, name: 'GPIO21', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPIIO4'], notes: 'Connected to SiP flash. Not available.', category: ['reserved'], reserved: true, side: 'right' },

  // UART and remaining GPIO (GPIO22-25)
  { pin: 23, name: 'GPIO22', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIIO5'], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 24, name: 'GPIO23', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIIO6'], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 25, name: 'GPIO24', type: 'gpio', voltage: '3.3V', description: 'UART TX', alternateFunctions: ['U0TXD', 'SPIIO7'], notes: 'Default UART0 TX.', category: ['gpio', 'uart', 'pwm'], defaultFunction: 'TX', side: 'left' },
  { pin: 26, name: 'GPIO25', type: 'gpio', voltage: '3.3V', description: 'Strapping - UART RX', alternateFunctions: ['U0RXD'], notes: 'STRAPPING PIN. Default UART0 RX.', category: ['gpio', 'uart', 'strapping'], strapping: true, defaultFunction: 'RX', side: 'left' },

  // USB Serial/JTAG pins
  { pin: 27, name: 'GPIO26', type: 'gpio', voltage: '3.3V', description: 'USB D-', alternateFunctions: ['USB_D-'], notes: 'USB Serial/JTAG D-. Can be GPIO if USB disabled.', category: ['gpio', 'usb'], side: 'left' },
  { pin: 28, name: 'GPIO27', type: 'gpio', voltage: '3.3V', description: 'USB D+', alternateFunctions: ['USB_D+'], notes: 'USB Serial/JTAG D+. Can be GPIO if USB disabled.', category: ['gpio', 'usb'], side: 'left' },

  // Power
  { pin: 29, name: 'GND', type: 'ground', voltage: '0V', description: 'Ground', category: ['power'], side: 'right' },
  { pin: 30, name: 'VIN', type: 'power', voltage: '5V', description: 'USB/External 5V input', category: ['power'], side: 'right' },
]

// ============================================
// ESP32-C5 Pin Data (29 GPIOs - Dual-band WiFi 6)
// ============================================
export const esp32c5Pins = [
  // Power pins
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply output', notes: 'Regulated 3.3V output.', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable', notes: 'Active high reset pin.', category: ['power', 'special'], side: 'left' },

  // ADC pins (6 channels)
  { pin: 3, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH0 / XTAL', alternateFunctions: ['ADC1_CH0', 'LP_GPIO0', 'XTAL_32K_P'], notes: 'Safe to use. Can be 32kHz crystal input.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 4, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH1 / XTAL', alternateFunctions: ['ADC1_CH1', 'LP_GPIO1', 'XTAL_32K_N'], notes: 'Safe to use. Can be 32kHz crystal input.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 5, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH2 / SPI', alternateFunctions: ['ADC1_CH2', 'LP_GPIO2', 'FSPIQ'], notes: 'Safe to use. SPI MISO capable.', category: ['gpio', 'adc', 'spi', 'pwm'], side: 'left' },
  { pin: 6, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH3', alternateFunctions: ['ADC1_CH3', 'LP_GPIO3'], notes: 'Safe to use.', category: ['gpio', 'adc', 'pwm'], side: 'left' },
  { pin: 7, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH4 / SPI', alternateFunctions: ['ADC1_CH4', 'LP_GPIO4', 'FSPIHD'], notes: 'Safe to use. SPI HD capable.', category: ['gpio', 'adc', 'spi', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH5 / SPI', alternateFunctions: ['ADC1_CH5', 'LP_GPIO5', 'FSPIWP'], notes: 'Safe to use. SPI WP capable.', category: ['gpio', 'adc', 'spi', 'pwm'], side: 'left' },

  // SPI and general GPIO (GPIO6-7)
  { pin: 9, name: 'GPIO6', type: 'gpio', voltage: '3.3V', description: 'SPI CLK', alternateFunctions: ['LP_GPIO6', 'FSPICLK'], notes: 'Default SPI clock.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'SCK', side: 'left' },
  { pin: 10, name: 'GPIO7', type: 'gpio', voltage: '3.3V', description: 'Strapping - JTAG', alternateFunctions: ['LP_GPIO7', 'FSPID'], notes: 'STRAPPING PIN: JTAG source. Default SPI MOSI.', category: ['gpio', 'spi', 'strapping'], strapping: true, defaultFunction: 'MOSI', side: 'left' },

  // I2C default pins
  { pin: 11, name: 'GPIO8', type: 'gpio', voltage: '3.3V', description: 'I2C SDA', alternateFunctions: ['LP_GPIO8'], notes: 'Default I2C SDA. Safe to use.', category: ['gpio', 'i2c', 'pwm'], defaultFunction: 'SDA', side: 'right' },
  { pin: 12, name: 'GPIO9', type: 'gpio', voltage: '3.3V', description: 'I2C SCL', alternateFunctions: ['LP_GPIO9', 'FSPICS0'], notes: 'Default I2C SCL. SPI CS capable.', category: ['gpio', 'i2c', 'spi', 'pwm'], defaultFunction: 'SCL', side: 'right' },
  { pin: 13, name: 'GPIO10', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 14, name: 'GPIO11', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 15, name: 'GPIO12', type: 'gpio', voltage: '3.3V', description: 'USB D-', alternateFunctions: ['USB_D-'], notes: 'USB Serial/JTAG D-. Can be GPIO.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 16, name: 'GPIO13', type: 'gpio', voltage: '3.3V', description: 'USB D+', alternateFunctions: ['USB_D+'], notes: 'USB Serial/JTAG D+. Can be GPIO.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 17, name: 'GPIO14', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },

  // Flash reserved (GPIO15-22)
  { pin: 18, name: 'GPIO15', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPICS0'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 19, name: 'GPIO16', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPIQ'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 20, name: 'GPIO17', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPIWP'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 21, name: 'GPIO18', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPIHD'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 22, name: 'GPIO20', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPICLK'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 23, name: 'GPIO21', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPID'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },
  { pin: 24, name: 'GPIO22', type: 'reserved', voltage: '3.3V', description: 'Flash - DO NOT USE', alternateFunctions: ['SPIIO4'], notes: 'Connected to flash. DO NOT USE.', category: ['reserved'], reserved: true, side: 'right' },

  // Remaining GPIO and strapping pins (GPIO23-28)
  { pin: 25, name: 'GPIO23', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIIO5'], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 26, name: 'GPIO24', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: ['SPIIO6'], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 27, name: 'GPIO25', type: 'gpio', voltage: '3.3V', description: 'Strapping - UART TX', alternateFunctions: ['U0TXD', 'SPIIO7'], notes: 'STRAPPING PIN. Default UART0 TX.', category: ['gpio', 'uart', 'strapping'], strapping: true, defaultFunction: 'TX', side: 'left' },
  { pin: 28, name: 'GPIO26', type: 'gpio', voltage: '3.3V', description: 'Strapping - Boot mode', alternateFunctions: ['U0RXD'], notes: 'STRAPPING PIN: Boot mode. Default UART0 RX.', category: ['gpio', 'uart', 'strapping'], strapping: true, defaultFunction: 'RX', side: 'left' },
  { pin: 29, name: 'GPIO27', type: 'gpio', voltage: '3.3V', description: 'Strapping - Boot mode', alternateFunctions: [], notes: 'STRAPPING PIN: Boot mode control.', category: ['gpio', 'strapping'], strapping: true, side: 'left' },
  { pin: 30, name: 'GPIO28', type: 'gpio', voltage: '3.3V', description: 'Strapping - Boot mode', alternateFunctions: [], notes: 'STRAPPING PIN: Boot mode control.', category: ['gpio', 'strapping'], strapping: true, side: 'left' },

  // Power
  { pin: 31, name: 'GND', type: 'ground', voltage: '0V', description: 'Ground', category: ['power'], side: 'right' },
  { pin: 32, name: 'VIN', type: 'power', voltage: '5V', description: 'USB/External 5V input', category: ['power'], side: 'right' },
]

// ============================================
// ESP32-P4 Pin Data (55 GPIOs - High-performance, NO built-in wireless)
// ============================================
export const esp32p4Pins = [
  // Power pins
  { pin: 1, name: '3V3', type: 'power', voltage: '3.3V', description: 'Power supply output', notes: 'Regulated 3.3V output.', category: ['power'], side: 'left' },
  { pin: 2, name: 'EN', type: 'input', voltage: '3.3V', description: 'Chip enable', notes: 'Active high reset pin.', category: ['power', 'special'], side: 'left' },

  // XTAL pins (GPIO0-1)
  { pin: 3, name: 'GPIO0', type: 'gpio', voltage: '3.3V', description: 'XTAL 32K P', alternateFunctions: ['XTAL_32K_P'], notes: 'Can be enabled by disabling XTAL_32K. Low drive (5mA).', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 4, name: 'GPIO1', type: 'gpio', voltage: '3.3V', description: 'XTAL 32K N', alternateFunctions: ['XTAL_32K_N'], notes: 'Can be enabled by disabling XTAL_32K. Low drive (5mA).', category: ['gpio', 'pwm'], side: 'left' },

  // General GPIO (GPIO2-15)
  { pin: 5, name: 'GPIO2', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use. Low drive (5mA).', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 6, name: 'GPIO3', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use. Low drive (5mA).', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 7, name: 'GPIO4', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 8, name: 'GPIO5', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 9, name: 'GPIO6', type: 'gpio', voltage: '3.3V', description: 'I2C SDA', alternateFunctions: [], notes: 'Default I2C SDA.', category: ['gpio', 'i2c', 'pwm'], defaultFunction: 'SDA', side: 'left' },
  { pin: 10, name: 'GPIO7', type: 'gpio', voltage: '3.3V', description: 'I2C SCL', alternateFunctions: [], notes: 'Default I2C SCL.', category: ['gpio', 'i2c', 'pwm'], defaultFunction: 'SCL', side: 'left' },
  { pin: 11, name: 'GPIO8', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 12, name: 'GPIO9', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 13, name: 'GPIO10', type: 'gpio', voltage: '3.3V', description: 'SPI CS', alternateFunctions: ['FSPICS0'], notes: 'Default SPI CS.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'SS', side: 'left' },
  { pin: 14, name: 'GPIO11', type: 'gpio', voltage: '3.3V', description: 'SPI MOSI', alternateFunctions: ['FSPID'], notes: 'Default SPI MOSI.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'MOSI', side: 'left' },
  { pin: 15, name: 'GPIO12', type: 'gpio', voltage: '3.3V', description: 'SPI CLK', alternateFunctions: ['FSPICLK'], notes: 'Default SPI clock.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'SCK', side: 'left' },
  { pin: 16, name: 'GPIO13', type: 'gpio', voltage: '3.3V', description: 'SPI MISO', alternateFunctions: ['FSPIQ'], notes: 'Default SPI MISO.', category: ['gpio', 'spi', 'pwm'], defaultFunction: 'MISO', side: 'right' },
  { pin: 17, name: 'GPIO14', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 18, name: 'GPIO15', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },

  // ADC pins (GPIO16-23, 8 channels)
  { pin: 19, name: 'GPIO16', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH0', alternateFunctions: ['ADC1_CH0'], notes: 'Analog input capable.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 20, name: 'GPIO17', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH1', alternateFunctions: ['ADC1_CH1'], notes: 'Analog input capable.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 21, name: 'GPIO18', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH2', alternateFunctions: ['ADC1_CH2'], notes: 'Analog input capable.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 22, name: 'GPIO19', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH3', alternateFunctions: ['ADC1_CH3'], notes: 'Analog input capable.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 23, name: 'GPIO20', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH4', alternateFunctions: ['ADC1_CH4'], notes: 'Analog input capable.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 24, name: 'GPIO21', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH5', alternateFunctions: ['ADC1_CH5'], notes: 'Analog input capable.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 25, name: 'GPIO22', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH6', alternateFunctions: ['ADC1_CH6'], notes: 'Analog input capable.', category: ['gpio', 'adc', 'pwm'], side: 'right' },
  { pin: 26, name: 'GPIO23', type: 'gpio', voltage: '3.3V', description: 'ADC1 CH7', alternateFunctions: ['ADC1_CH7'], notes: 'Analog input capable.', category: ['gpio', 'adc', 'pwm'], side: 'right' },

  // High-current GPIO (GPIO24-25, 40mA default)
  { pin: 27, name: 'GPIO24', type: 'gpio', voltage: '3.3V', description: 'High-current GPIO', alternateFunctions: [], notes: 'High drive strength (40mA default).', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 28, name: 'GPIO25', type: 'gpio', voltage: '3.3V', description: 'High-current GPIO', alternateFunctions: [], notes: 'High drive strength (40mA default).', category: ['gpio', 'pwm'], side: 'right' },

  // GPIO 26-33 (general purpose)
  { pin: 29, name: 'GPIO26', type: 'gpio', voltage: '3.3V', description: 'USB D-', alternateFunctions: ['USB_D-'], notes: 'USB OTG D-. Can be used as GPIO.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 30, name: 'GPIO27', type: 'gpio', voltage: '3.3V', description: 'USB D+', alternateFunctions: ['USB_D+'], notes: 'USB OTG D+. Can be used as GPIO.', category: ['gpio', 'usb'], side: 'right' },
  { pin: 31, name: 'GPIO28', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 32, name: 'GPIO29', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 33, name: 'GPIO30', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 34, name: 'GPIO31', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 35, name: 'GPIO32', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },
  { pin: 36, name: 'GPIO33', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'left' },

  // Strapping pins (GPIO34-38)
  { pin: 37, name: 'GPIO34', type: 'gpio', voltage: '3.3V', description: 'Strapping pin', alternateFunctions: [], notes: 'STRAPPING PIN: Boot mode control.', category: ['gpio', 'strapping'], strapping: true, side: 'left' },
  { pin: 38, name: 'GPIO35', type: 'gpio', voltage: '3.3V', description: 'Strapping pin', alternateFunctions: [], notes: 'STRAPPING PIN: Boot mode control.', category: ['gpio', 'strapping'], strapping: true, side: 'left' },
  { pin: 39, name: 'GPIO36', type: 'gpio', voltage: '3.3V', description: 'Strapping pin', alternateFunctions: [], notes: 'STRAPPING PIN: Boot mode control.', category: ['gpio', 'strapping'], strapping: true, side: 'left' },
  { pin: 40, name: 'GPIO37', type: 'gpio', voltage: '3.3V', description: 'Strapping / UART TX', alternateFunctions: ['U0TXD'], notes: 'STRAPPING PIN. Default UART0 TX.', category: ['gpio', 'uart', 'strapping'], strapping: true, defaultFunction: 'TX', side: 'left' },
  { pin: 41, name: 'GPIO38', type: 'gpio', voltage: '3.3V', description: 'Strapping / UART RX', alternateFunctions: ['U0RXD'], notes: 'STRAPPING PIN. Default UART0 RX.', category: ['gpio', 'uart', 'strapping'], strapping: true, defaultFunction: 'RX', side: 'left' },

  // Remaining GPIO (GPIO39-54)
  { pin: 42, name: 'GPIO39', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 43, name: 'GPIO40', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 44, name: 'GPIO41', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 45, name: 'GPIO42', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 46, name: 'GPIO43', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 47, name: 'GPIO44', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 48, name: 'GPIO45', type: 'gpio', voltage: '3.3V', description: 'MIPI-DSI / GPIO', alternateFunctions: ['MIPI_DSI'], notes: 'MIPI Display interface or GPIO.', category: ['gpio', 'mipi', 'pwm'], side: 'right' },
  { pin: 49, name: 'GPIO46', type: 'gpio', voltage: '3.3V', description: 'MIPI-DSI / GPIO', alternateFunctions: ['MIPI_DSI'], notes: 'MIPI Display interface or GPIO.', category: ['gpio', 'mipi', 'pwm'], side: 'right' },
  { pin: 50, name: 'GPIO47', type: 'gpio', voltage: '3.3V', description: 'MIPI-CSI / GPIO', alternateFunctions: ['MIPI_CSI'], notes: 'MIPI Camera interface or GPIO.', category: ['gpio', 'mipi', 'pwm'], side: 'right' },
  { pin: 51, name: 'GPIO48', type: 'gpio', voltage: '3.3V', description: 'MIPI-CSI / GPIO', alternateFunctions: ['MIPI_CSI'], notes: 'MIPI Camera interface or GPIO.', category: ['gpio', 'mipi', 'pwm'], side: 'right' },
  { pin: 52, name: 'GPIO49', type: 'gpio', voltage: '3.3V', description: 'Ethernet / GPIO', alternateFunctions: ['EMAC'], notes: 'Ethernet MAC or GPIO.', category: ['gpio', 'ethernet', 'pwm'], side: 'right' },
  { pin: 53, name: 'GPIO50', type: 'gpio', voltage: '3.3V', description: 'Ethernet / GPIO', alternateFunctions: ['EMAC'], notes: 'Ethernet MAC or GPIO.', category: ['gpio', 'ethernet', 'pwm'], side: 'right' },
  { pin: 54, name: 'GPIO51', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 55, name: 'GPIO52', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 56, name: 'GPIO53', type: 'gpio', voltage: '3.3V', description: 'General purpose I/O', alternateFunctions: [], notes: 'Safe to use.', category: ['gpio', 'pwm'], side: 'right' },
  { pin: 57, name: 'GPIO54', type: 'gpio', voltage: '3.3V', description: 'DAC output', alternateFunctions: ['DAC'], notes: 'Digital-to-analog converter output.', category: ['gpio', 'dac', 'pwm'], side: 'right' },

  // Power
  { pin: 58, name: 'GND', type: 'ground', voltage: '0V', description: 'Ground', category: ['power'], side: 'right' },
  { pin: 59, name: 'VIN', type: 'power', voltage: '5V', description: 'USB/External 5V input', category: ['power'], side: 'right' },
]

// ============================================
// DEV BOARD PINOUTS - Physical pin mapping for popular development boards
// ============================================
export const devBoardPinouts = {
  // ESP32-DevKitC V4 (38-pin)
  'esp32-devkitc-v4': {
    boardId: 'esp32-devkitc-v4',
    variant: 'esp32',
    totalPins: 38,
    leftPins: ['3V3', 'EN', 'GPIO36', 'GPIO39', 'GPIO34', 'GPIO35', 'GPIO32', 'GPIO33', 'GPIO25', 'GPIO26', 'GPIO27', 'GPIO14', 'GPIO12', 'GND', 'GPIO13', 'GPIO9', 'GPIO10', 'GPIO11', 'VIN'],
    rightPins: ['GND', 'GPIO23', 'GPIO22', 'GPIO1', 'GPIO3', 'GPIO21', 'GND', 'GPIO19', 'GPIO18', 'GPIO5', 'GPIO17', 'GPIO16', 'GPIO4', 'GPIO0', 'GPIO2', 'GPIO15', 'GPIO8', 'GPIO7', 'GPIO6'],
    specialPins: {
      led: 'GPIO2',
      boot: 'GPIO0',
      reset: 'EN',
    },
    notes: 'Most documented ESP32 devkit. GPIO9-11 are connected to flash and should not be used.',
  },

  // ESP32-S3-DevKitC-1 (44-pin)
  'esp32-s3-devkitc-1': {
    boardId: 'esp32-s3-devkitc-1',
    variant: 'esp32-s3',
    totalPins: 44,
    leftPins: ['3V3', 'GPIO3', 'GPIO4', 'GPIO5', 'GPIO6', 'GPIO7', 'GPIO15', 'GPIO16', 'GPIO17', 'GPIO18', 'GPIO8', 'GPIO19', 'GPIO20', 'GPIO3', 'GPIO46', 'GPIO9', 'GPIO10', 'GPIO11', 'GPIO12', 'GPIO13', 'GPIO14', 'GND'],
    rightPins: ['GND', 'GPIO43', 'GPIO44', 'GPIO1', 'GPIO2', 'GPIO42', 'GPIO41', 'GPIO40', 'GPIO39', 'GPIO38', 'GPIO37', 'GPIO36', 'GPIO35', 'GPIO0', 'GPIO45', 'GPIO48', 'GPIO47', 'GPIO21', 'GPIO20', 'GPIO19', '5V', 'GND'],
    specialPins: {
      rgbLed: 'GPIO48',
      boot: 'GPIO0',
      reset: 'EN',
      usbDp: 'GPIO20',
      usbDn: 'GPIO19',
    },
    notes: 'Features dual USB-C ports. GPIO35-37 unavailable on Octal PSRAM variants (N*R8).',
  },

  // ESP32-C3-DevKitM-1 (26-pin)
  'esp32-c3-devkitm-1': {
    boardId: 'esp32-c3-devkitm-1',
    variant: 'esp32-c3',
    totalPins: 26,
    leftPins: ['3V3', 'GPIO3', 'GPIO2', 'GPIO1', 'GPIO0', 'GPIO10', 'GPIO4', 'GPIO5', 'GPIO6', 'GPIO7', 'GPIO8', 'GPIO9', 'GND'],
    rightPins: ['5V', 'GND', 'GPIO21', 'GPIO20', 'GPIO19', 'GPIO18', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC'],
    specialPins: {
      rgbLed: 'GPIO8',
      boot: 'GPIO9',
      reset: 'EN',
      usbDp: 'GPIO19',
      usbDn: 'GPIO18',
    },
    notes: 'Compact RISC-V board with native USB.',
  },

  // ESP32-C3 SuperMini (14-pin)
  'esp32-c3-supermini': {
    boardId: 'esp32-c3-supermini',
    variant: 'esp32-c3',
    totalPins: 14,
    leftPins: ['GPIO2', 'GPIO3', 'GPIO4', 'GPIO5', 'GPIO6', 'GPIO7', 'GND'],
    rightPins: ['GPIO10', 'GPIO9', 'GPIO8', 'GPIO1', 'GPIO0', '5V', '3V3'],
    specialPins: {
      led: 'GPIO8',
      boot: 'GPIO9',
      usbDp: 'GPIO19',
      usbDn: 'GPIO18',
    },
    notes: 'Ultra-compact board. Only 11 GPIOs exposed.',
  },

  // ESP32-CAM (AI-Thinker)
  'esp32-cam-ai-thinker': {
    boardId: 'esp32-cam-ai-thinker',
    variant: 'esp32',
    totalPins: 16,
    leftPins: ['5V', 'GND', 'GPIO12', 'GPIO13', 'GPIO15', 'GPIO14', 'GPIO2', 'GPIO4'],
    rightPins: ['3V3', 'GPIO16', 'GPIO0', 'GND', 'VCC', 'U0R', 'U0T', 'GND'],
    specialPins: {
      flashLed: 'GPIO4',
      sdCard: ['GPIO14', 'GPIO15', 'GPIO2', 'GPIO4', 'GPIO12', 'GPIO13'],
      cameraInterface: 'I2C + parallel interface',
    },
    cameraPins: {
      PWDN: 'GPIO32', RESET: '-1', XCLK: 'GPIO0', SIOD: 'GPIO26', SIOC: 'GPIO27',
      Y9: 'GPIO35', Y8: 'GPIO34', Y7: 'GPIO39', Y6: 'GPIO36', Y5: 'GPIO21',
      Y4: 'GPIO19', Y3: 'GPIO18', Y2: 'GPIO5', VSYNC: 'GPIO25', HREF: 'GPIO23', PCLK: 'GPIO22'
    },
    notes: 'Requires external USB-to-serial programmer. Most GPIOs used by camera and SD card.',
  },

  // ESP32-H2 SuperMini
  'esp32-h2-supermini': {
    boardId: 'esp32-h2-supermini',
    variant: 'esp32-h2',
    totalPins: 14,
    leftPins: ['GPIO2', 'GPIO3', 'GPIO4', 'GPIO5', 'GPIO12', 'GPIO13', 'GND'],
    rightPins: ['GPIO10', 'GPIO9', 'GPIO8', 'GPIO1', 'GPIO0', '5V', '3V3'],
    specialPins: {
      led: 'GPIO8',
      boot: 'GPIO9',
    },
    notes: 'Thread/Zigbee only - no WiFi. Ultra-low power.',
  },
}

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
  'esp32-s2': esp32s2Pins,
  'esp32-s3': esp32s3Pins,
  'esp32-c3': esp32c3Pins,
  'esp32-c5': esp32c5Pins,
  'esp32-c6': esp32c6Pins,
  'esp32-h2': esp32h2Pins,
  'esp32-p4': esp32p4Pins,
}

// Quick reference for safe GPIO pins (not strapping, not reserved)
export const safeGPIOsByVariant = {
  'esp32': [4, 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33],
  'esp32-s2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
  'esp32-s3': [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 38, 39, 40, 41, 42, 47, 48],
  'esp32-c3': [0, 1, 3, 4, 5, 6, 7, 10, 20, 21],
  'esp32-c5': [0, 1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 15, 23, 24, 26],
  'esp32-c6': [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 14, 18, 19, 20, 21, 22, 23],
  'esp32-h2': [0, 1, 4, 5, 10, 11, 12, 13, 14, 22, 23, 24],
  'esp32-p4': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30, 31, 32, 33, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
}

// Default I2C and SPI pins by variant
export const defaultPinsByVariant = {
  'esp32': {
    i2c: { sda: 21, scl: 22 },
    spi: { mosi: 23, miso: 19, sck: 18, cs: 5 },
    uart: { tx: 1, rx: 3 },
  },
  'esp32-s2': {
    i2c: { sda: 8, scl: 9 },
    spi: { mosi: 11, miso: 13, sck: 12, cs: 10 },
    uart: { tx: 43, rx: 44 },
    dac: { dac1: 17, dac2: 18 },
  },
  'esp32-s3': {
    i2c: { sda: 8, scl: 9 },
    spi: { mosi: 11, miso: 13, sck: 12, cs: 10 },
    uart: { tx: 43, rx: 44 },
  },
  'esp32-c3': {
    i2c: { sda: 8, scl: 9 },
    spi: { mosi: 7, miso: 2, sck: 6, cs: 10 },
    uart: { tx: 21, rx: 20 },
  },
  'esp32-c5': {
    i2c: { sda: 2, scl: 3 },
    spi: { mosi: 7, miso: 2, sck: 6, cs: 10 },
    uart: { tx: 11, rx: 12 },
  },
  'esp32-c6': {
    i2c: { sda: 8, scl: 9 },
    spi: { mosi: 20, miso: 21, sck: 19, cs: 18 },
    uart: { tx: 16, rx: 17 },
  },
  'esp32-h2': {
    i2c: { sda: 8, scl: 9 },
    spi: { mosi: 5, miso: 0, sck: 4, cs: 1 },
    uart: { tx: 24, rx: 23 },
  },
  'esp32-p4': {
    i2c: { sda: 7, scl: 8 },
    spi: { mosi: 11, miso: 13, sck: 12, cs: 10 },
    uart: { tx: 37, rx: 38 },
    dac: { dac1: 54 },
  },
}

// Get dev board pinout by board ID
export function getDevBoardPinout(boardId) {
  return devBoardPinouts[boardId]
}

// Get all dev boards for a variant
export function getDevBoardsByVariant(variantId) {
  return Object.values(devBoardPinouts).filter(board => board.variant === variantId)
}

// List all available dev boards
export function getAllDevBoards() {
  return Object.keys(devBoardPinouts)
}
