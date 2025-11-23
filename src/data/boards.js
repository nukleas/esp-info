/**
 * ESP32 Development Boards Data
 *
 * This file contains information about popular ESP32 development boards.
 * Organized by manufacturer and chip variant.
 *
 * To add a new board:
 * 1. Copy an existing entry in the appropriate category
 * 2. Update all fields with accurate specs
 * 3. Add to the boards array
 */

export const boards = [
  // ============================================
  // OFFICIAL ESPRESSIF DEVKITS
  // ============================================
  {
    id: 'esp32-devkitc-v4',
    name: 'ESP32-DevKitC V4',
    manufacturer: 'Espressif',
    variant: 'esp32',
    module: 'ESP32-WROOM-32',
    description: 'Official reference design, most widely documented and cloned.',
    releaseYear: 2018,
    status: 'Active',
    formFactor: {
      pins: 38,
      rowSpacing: '25.4mm (1.0 inch)',
      dimensions: '54.4 x 27.9 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'Micro-USB',
      usbChip: 'CP2102 / CP2104',
      flashSize: '4 MB',
      psram: false,
      buttons: ['EN (Reset)', 'BOOT'],
      leds: ['Power', 'User (GPIO2)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 38,
      gpio: 34,
      adc: 18,
      dac: 2,
      touch: 10,
      strappingPins: ['GPIO0', 'GPIO2', 'GPIO5', 'GPIO12', 'GPIO15'],
      reservedPins: ['GPIO6-11 (Flash)'],
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
      outputCurrent: '500mA max',
    },
    programming: {
      ide: ['Arduino IDE', 'ESP-IDF', 'PlatformIO', 'MicroPython'],
      uploadSpeed: 'Up to 921600 baud',
    },
    price: '$10-15',
    purchaseLinks: [
      { name: 'Espressif', url: 'https://www.espressif.com/en/products/devkits/esp32-devkitc' },
    ],
    pros: ['Official reference', 'Best documentation', 'Most compatible'],
    cons: ['Slightly wide for breadboards', 'No battery support'],
    pinoutUrl: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-devkitc.html',
  },
  {
    id: 'esp32-devkitm-1',
    name: 'ESP32-DevKitM-1',
    manufacturer: 'Espressif',
    variant: 'esp32',
    module: 'ESP32-MINI-1',
    description: 'Compact version with smaller MINI module.',
    releaseYear: 2020,
    status: 'Active',
    formFactor: {
      pins: 32,
      rowSpacing: '22.86mm (0.9 inch)',
      dimensions: '51.5 x 20.3 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'Micro-USB',
      usbChip: 'CP2102N',
      flashSize: '4 MB',
      psram: false,
      buttons: ['EN (Reset)', 'BOOT'],
      leds: ['Power'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 32,
      gpio: 26,
      adc: 16,
      dac: 2,
      touch: 10,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$8-12',
    pros: ['Smaller form factor', 'Breadboard friendly'],
    cons: ['Fewer GPIOs exposed', 'Less common'],
    pinoutUrl: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-devkitm-1.html',
  },
  {
    id: 'esp32-s3-devkitc-1',
    name: 'ESP32-S3-DevKitC-1',
    manufacturer: 'Espressif',
    variant: 'esp32-s3',
    module: 'ESP32-S3-WROOM-1',
    description: 'Official S3 devkit with AI acceleration and USB OTG.',
    releaseYear: 2021,
    status: 'Active',
    formFactor: {
      pins: 44,
      rowSpacing: '25.4mm',
      dimensions: '69 x 25.9 mm',
      breadboardFriendly: false,
    },
    features: {
      usbConnector: 'USB-C (x2)',
      usbChip: 'Native USB + UART bridge',
      flashSize: '8 MB (N8) / 16 MB (N16)',
      psram: '8 MB Octal (N8R8)',
      buttons: ['EN (Reset)', 'BOOT'],
      leds: ['Power', 'RGB (WS2812)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 44,
      gpio: 45,
      adc: 20,
      dac: 0,
      touch: 14,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    programming: {
      ide: ['Arduino IDE', 'ESP-IDF', 'PlatformIO', 'MicroPython', 'CircuitPython'],
      nativeUsb: true,
    },
    price: '$12-20',
    purchaseLinks: [
      { name: 'Espressif', url: 'https://www.espressif.com/en/products/devkits/esp32-s3-devkitc-1' },
    ],
    pros: ['Native USB', 'AI acceleration', 'RGB LED', 'Octal PSRAM option'],
    cons: ['Too wide for breadboards', 'No DAC'],
    pinoutUrl: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32s3/hw-reference/esp32s3/user-guide-devkitc-1.html',
  },
  {
    id: 'esp32-c3-devkitm-1',
    name: 'ESP32-C3-DevKitM-1',
    manufacturer: 'Espressif',
    variant: 'esp32-c3',
    module: 'ESP32-C3-MINI-1',
    description: 'Compact RISC-V devkit, great for small IoT projects.',
    releaseYear: 2021,
    status: 'Active',
    formFactor: {
      pins: 26,
      rowSpacing: '22.86mm',
      dimensions: '51.5 x 20.3 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'Native USB Serial/JTAG',
      flashSize: '4 MB',
      psram: false,
      buttons: ['EN (Reset)', 'BOOT'],
      leds: ['Power', 'RGB (WS2812)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 26,
      gpio: 22,
      adc: 6,
      dac: 0,
      touch: 0,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$8-12',
    pros: ['Very compact', 'RISC-V architecture', 'Low cost', 'USB-C'],
    cons: ['Single core', 'No touch sensors', 'Limited GPIOs'],
    pinoutUrl: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/hw-reference/esp32c3/user-guide-devkitm-1.html',
  },
  {
    id: 'esp32-c6-devkitc-1',
    name: 'ESP32-C6-DevKitC-1',
    manufacturer: 'Espressif',
    variant: 'esp32-c6',
    module: 'ESP32-C6-WROOM-1',
    description: 'WiFi 6 and Thread/Zigbee ready devkit.',
    releaseYear: 2022,
    status: 'Active',
    formFactor: {
      pins: 34,
      rowSpacing: '25.4mm',
      dimensions: '56 x 25.4 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'USB-C (x2)',
      usbChip: 'Native USB + UART bridge',
      flashSize: '8 MB',
      psram: false,
      buttons: ['EN (Reset)', 'BOOT'],
      leds: ['Power', 'RGB (WS2812)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 34,
      gpio: 30,
      adc: 7,
      dac: 0,
      touch: 0,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$10-15',
    pros: ['WiFi 6', 'Thread/Zigbee', 'Matter ready', 'Dual USB ports'],
    cons: ['Single core', 'No PSRAM support'],
    pinoutUrl: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32c6/hw-reference/esp32c6/user-guide-devkitc-1.html',
  },
  {
    id: 'esp32-c5-devkitc-1',
    name: 'ESP32-C5-DevKitC-1',
    manufacturer: 'Espressif',
    variant: 'esp32-c5',
    module: 'ESP32-C5-WROOM-1',
    description: 'First dual-band WiFi 6 (2.4/5 GHz) development board.',
    releaseYear: 2025,
    status: 'Active',
    formFactor: {
      pins: 32,
      rowSpacing: '25.4mm',
      dimensions: '56 x 25.4 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'Native USB Serial/JTAG',
      flashSize: '4-8 MB',
      psram: 'Optional',
      buttons: ['EN (Reset)', 'BOOT'],
      leds: ['Power', 'RGB (WS2812)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 32,
      gpio: 29,
      adc: 6,
      dac: 0,
      touch: 0,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$15-20',
    pros: ['Dual-band WiFi 6', '5 GHz support', 'Thread/Zigbee', 'Matter ready'],
    cons: ['New to market', 'Limited documentation'],
    pinoutUrl: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32c5/hw-reference/esp32c5/user-guide-devkitc-1.html',
  },

  // ============================================
  // CAMERA BOARDS
  // ============================================
  {
    id: 'esp32-cam-ai-thinker',
    name: 'ESP32-CAM',
    manufacturer: 'AI-Thinker',
    variant: 'esp32',
    module: 'ESP32-S',
    description: 'Ultra-low-cost camera module with SD card slot.',
    releaseYear: 2019,
    status: 'Active',
    formFactor: {
      pins: 16,
      dimensions: '40.5 x 27 x 4.5 mm',
      breadboardFriendly: false,
    },
    features: {
      usbConnector: null,
      usbChip: null,
      flashSize: '4 MB',
      psram: '4 MB',
      buttons: ['RST (side)'],
      leds: ['Flash LED', 'Status LED'],
      antenna: 'IPEX connector (external antenna optional)',
      batteryCharging: false,
      camera: 'OV2640 (2MP)',
      sdCard: 'microSD slot',
    },
    pinout: {
      totalPins: 16,
      gpio: 10,
      adc: 0,
      dac: 0,
      touch: 0,
      note: 'Most GPIOs used by camera and SD card',
    },
    power: {
      inputVoltage: '5V',
      operatingVoltage: '3.3V',
    },
    programming: {
      requiresExternalProgrammer: true,
      programmers: ['FTDI', 'CP2102', 'CH340'],
      note: 'GPIO0 must be held LOW during programming',
    },
    price: '$5-10',
    pros: ['Extremely cheap', 'Camera included', 'SD card slot', 'PSRAM'],
    cons: ['Requires external programmer', 'Limited GPIOs', 'Gets hot'],
    pinoutUrl: 'https://randomnerdtutorials.com/esp32-cam-ai-thinker-pinout/',
  },
  {
    id: 'freenove-esp32-wrover-cam',
    name: 'Freenove ESP32-WROVER CAM',
    manufacturer: 'Freenove',
    variant: 'esp32',
    module: 'ESP32-WROVER-E',
    description: 'USB-programmable camera board with more GPIOs.',
    releaseYear: 2020,
    status: 'Active',
    formFactor: {
      pins: 30,
      dimensions: '55 x 26.5 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'Micro-USB',
      usbChip: 'CH340',
      flashSize: '4 MB',
      psram: '8 MB',
      buttons: ['RST', 'BOOT'],
      leds: ['Power (green)', 'User GPIO2 (blue)', 'TX/RX (yellow)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
      camera: 'OV2640 (2MP)',
      sdCard: 'microSD slot (newer revisions)',
    },
    pinout: {
      totalPins: 30,
      gpio: 16,
      adc: 8,
      dac: 2,
      touch: 4,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$10-15',
    pros: ['Built-in USB programmer', 'More GPIOs than ESP32-CAM', '8MB PSRAM', 'Better thermals'],
    cons: ['Larger than ESP32-CAM', 'Slightly more expensive'],
    pinoutUrl: 'https://github.com/Freenove/Freenove_ESP32_WROVER_Board/blob/main/Datasheet/ESP32-WROVER-DEV.pdf',
  },
  {
    id: 'esp32-s3-eye',
    name: 'ESP32-S3-EYE',
    manufacturer: 'Espressif',
    variant: 'esp32-s3',
    module: 'ESP32-S3-WROOM-1',
    description: 'AI development board with camera, mic, and LCD.',
    releaseYear: 2022,
    status: 'Active',
    formFactor: {
      pins: 0,
      dimensions: '83 x 38 mm',
      breadboardFriendly: false,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'Native USB',
      flashSize: '8 MB',
      psram: '8 MB Octal',
      buttons: ['RST', 'BOOT', 'MENU', 'PLAY', 'UP', 'DOWN'],
      leds: ['RGB LED'],
      antenna: 'PCB antenna',
      batteryCharging: false,
      camera: 'OV2640 (2MP)',
      microphone: 'Digital microphone',
      display: '1.3" LCD (optional)',
      accelerometer: '3-axis',
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$25-35',
    pros: ['All-in-one AI kit', 'Multiple sensors', 'AI acceleration', 'Audio support'],
    cons: ['No breadboard pins', 'More expensive', 'Overkill for simple projects'],
    pinoutUrl: 'https://github.com/espressif/esp-who/blob/master/docs/en/get-started/ESP32-S3-EYE_Getting_Started_Guide.md',
  },

  // ============================================
  // THIRD-PARTY POPULAR BOARDS
  // ============================================
  {
    id: 'doit-esp32-devkit-v1',
    name: 'DOIT ESP32 DevKit V1',
    manufacturer: 'DOIT',
    variant: 'esp32',
    module: 'ESP32-WROOM-32',
    description: 'Popular clone of DevKitC, widely available.',
    releaseYear: 2017,
    status: 'Active',
    formFactor: {
      pins: 30,
      rowSpacing: '22.86mm (0.9 inch)',
      dimensions: '48.2 x 25.4 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'Micro-USB',
      usbChip: 'CP2102',
      flashSize: '4 MB',
      psram: false,
      buttons: ['EN', 'BOOT'],
      leds: ['Power'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 30,
      gpio: 25,
      adc: 15,
      dac: 2,
      touch: 9,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$5-10',
    pros: ['Very cheap', 'Breadboard friendly', 'Widely available'],
    cons: ['Lower quality than official', 'Silkscreen errors possible'],
    pinoutUrl: 'https://randomnerdtutorials.com/esp32-pinout-reference-gpios/',
  },
  {
    id: 'nodemcu-esp32',
    name: 'NodeMCU-32S',
    manufacturer: 'Various',
    variant: 'esp32',
    module: 'ESP32-WROOM-32',
    description: 'ESP8266 NodeMCU successor with ESP32.',
    releaseYear: 2017,
    status: 'Active',
    formFactor: {
      pins: 38,
      rowSpacing: '22.86mm',
      dimensions: '51 x 28 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'Micro-USB',
      usbChip: 'CP2102 / CH340',
      flashSize: '4 MB',
      psram: false,
      buttons: ['EN', 'BOOT'],
      leds: ['Power', 'User (GPIO2)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 38,
      gpio: 34,
      adc: 18,
      dac: 2,
      touch: 10,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$6-12',
    pros: ['Breadboard friendly', 'Full pinout', 'Cheap'],
    cons: ['Quality varies by manufacturer', 'Some pin labeling inconsistencies'],
    pinoutUrl: 'https://randomnerdtutorials.com/esp32-pinout-reference-gpios/',
  },
  {
    id: 'wemos-d1-mini-esp32',
    name: 'WEMOS D1 Mini ESP32',
    manufacturer: 'WEMOS/LOLIN',
    variant: 'esp32',
    module: 'ESP32-WROOM-32',
    description: 'Compact D1 Mini form factor with ESP32.',
    releaseYear: 2019,
    status: 'Active',
    formFactor: {
      pins: 26,
      rowSpacing: '22.86mm',
      dimensions: '34 x 25 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'Micro-USB',
      usbChip: 'CH340C',
      flashSize: '4 MB',
      psram: false,
      buttons: ['RST'],
      leds: ['Power'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 26,
      gpio: 22,
      adc: 8,
      dac: 2,
      touch: 6,
      defaultI2C: { sda: 21, scl: 22 },
      defaultSPI: { mosi: 23, miso: 19, sck: 18, cs: 5 },
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$5-10',
    pros: ['Very compact', 'D1 Mini shields compatible', 'Cheap'],
    cons: ['Fewer GPIOs', 'No BOOT button'],
    pinoutUrl: 'https://www.wemos.cc/en/latest/d1/d1_mini_esp32.html',
  },
  {
    id: 'lolin-s3',
    name: 'LOLIN S3',
    manufacturer: 'WEMOS/LOLIN',
    variant: 'esp32-s3',
    module: 'ESP32-S3-WROOM-1',
    description: 'Compact S3 board with USB-C and optional display.',
    releaseYear: 2022,
    status: 'Active',
    formFactor: {
      pins: 36,
      dimensions: '56 x 28 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'Native USB',
      flashSize: '16 MB',
      psram: '8 MB Octal',
      buttons: ['RST', 'BOOT (GPIO0)'],
      leds: ['Power', 'RGB (GPIO38)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 36,
      gpio: 36,
      adc: 20,
      dac: 0,
      touch: 14,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$10-15',
    pros: ['Native USB', 'Lots of flash/PSRAM', 'Compact', 'Good value'],
    cons: ['No DAC', 'Third-party (less documentation)'],
    pinoutUrl: 'https://www.wemos.cc/en/latest/s3/s3.html',
  },

  // ============================================
  // ADAFRUIT FEATHER BOARDS
  // ============================================
  {
    id: 'adafruit-esp32-feather',
    name: 'Adafruit HUZZAH32 ESP32 Feather',
    manufacturer: 'Adafruit',
    variant: 'esp32',
    module: 'ESP32-WROOM-32',
    description: 'Feather form factor with LiPo charging.',
    releaseYear: 2017,
    status: 'Active',
    formFactor: {
      pins: 28,
      dimensions: '51 x 23 mm',
      breadboardFriendly: true,
      featherCompatible: true,
    },
    features: {
      usbConnector: 'Micro-USB',
      usbChip: 'CP2104',
      flashSize: '4 MB',
      psram: false,
      buttons: ['RST'],
      leds: ['Power', 'Charging', 'GPIO13'],
      antenna: 'PCB antenna',
      batteryCharging: true,
      batteryConnector: 'JST PH 2-pin',
    },
    pinout: {
      totalPins: 28,
      gpio: 21,
      adc: 13,
      dac: 2,
      touch: 8,
    },
    power: {
      inputVoltage: '5V (USB) or 3.7V LiPo',
      operatingVoltage: '3.3V',
      batteryCharging: '500mA',
    },
    price: '$20-25',
    pros: ['LiPo charging', 'Feather ecosystem', 'Quality build', 'Good documentation'],
    cons: ['More expensive', 'Fewer GPIOs than DevKitC'],
    pinoutUrl: 'https://learn.adafruit.com/adafruit-huzzah32-esp32-feather/pinouts',
  },
  {
    id: 'adafruit-esp32-s2-feather',
    name: 'Adafruit ESP32-S2 Feather',
    manufacturer: 'Adafruit',
    variant: 'esp32-s2',
    module: 'ESP32-S2',
    description: 'Feather with S2, native USB, and STEMMA QT.',
    releaseYear: 2020,
    status: 'Active',
    formFactor: {
      pins: 28,
      dimensions: '51 x 23 mm',
      breadboardFriendly: true,
      featherCompatible: true,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'Native USB',
      flashSize: '4 MB',
      psram: '2 MB',
      buttons: ['RST', 'BOOT'],
      leds: ['Power', 'NeoPixel (GPIO33)'],
      antenna: 'PCB antenna',
      batteryCharging: true,
      batteryConnector: 'JST PH 2-pin',
      stemmaQt: true,
    },
    pinout: {
      totalPins: 28,
      gpio: 21,
      adc: 16,
      dac: 2,
      touch: 12,
    },
    power: {
      inputVoltage: '5V (USB) or 3.7V LiPo',
      operatingVoltage: '3.3V',
      batteryCharging: '500mA',
    },
    price: '$18-22',
    pros: ['Native USB', 'STEMMA QT', 'LiPo charging', 'CircuitPython support'],
    cons: ['No Bluetooth', 'Single core'],
    pinoutUrl: 'https://learn.adafruit.com/adafruit-esp32-s2-feather/pinouts',
  },
  {
    id: 'adafruit-esp32-s3-feather',
    name: 'Adafruit ESP32-S3 Feather',
    manufacturer: 'Adafruit',
    variant: 'esp32-s3',
    module: 'ESP32-S3',
    description: 'Premium Feather with S3, 8MB PSRAM, and NeoPixel.',
    releaseYear: 2022,
    status: 'Active',
    formFactor: {
      pins: 28,
      dimensions: '51 x 23 mm',
      breadboardFriendly: true,
      featherCompatible: true,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'Native USB',
      flashSize: '8 MB',
      psram: '8 MB Octal',
      buttons: ['RST', 'BOOT'],
      leds: ['Power', 'NeoPixel (GPIO33)'],
      antenna: 'PCB antenna',
      batteryCharging: true,
      batteryConnector: 'JST PH 2-pin',
      stemmaQt: true,
    },
    pinout: {
      totalPins: 28,
      gpio: 21,
      adc: 10,
      dac: 0,
      touch: 10,
    },
    power: {
      inputVoltage: '5V (USB) or 3.7V LiPo',
      operatingVoltage: '3.3V',
      batteryCharging: '500mA',
    },
    price: '$22-28',
    pros: ['Native USB', 'AI acceleration', 'Large PSRAM', 'Great for TinyML'],
    cons: ['Premium price', 'No DAC'],
    pinoutUrl: 'https://learn.adafruit.com/adafruit-esp32-s3-feather/pinouts',
  },

  // ============================================
  // SPARKFUN BOARDS
  // ============================================
  {
    id: 'sparkfun-esp32-thing-plus',
    name: 'SparkFun Thing Plus - ESP32 WROOM',
    manufacturer: 'SparkFun',
    variant: 'esp32',
    module: 'ESP32-WROOM-32',
    description: 'Feather-compatible with Qwiic connector.',
    releaseYear: 2019,
    status: 'Active',
    formFactor: {
      pins: 28,
      dimensions: '58 x 23 mm',
      breadboardFriendly: true,
      featherCompatible: true,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'CP2104',
      flashSize: '16 MB',
      psram: false,
      buttons: ['RST', 'BOOT'],
      leds: ['Power', 'Charging', 'GPIO13'],
      antenna: 'PCB antenna',
      batteryCharging: true,
      batteryConnector: 'JST PH 2-pin',
      qwiic: true,
    },
    pinout: {
      totalPins: 28,
      gpio: 21,
      adc: 15,
      dac: 2,
      touch: 8,
    },
    power: {
      inputVoltage: '5V (USB) or 3.7V LiPo',
      operatingVoltage: '3.3V',
      batteryCharging: '500mA',
    },
    price: '$23-28',
    pros: ['USB-C', 'Qwiic connector', 'Large flash', 'LiPo charging'],
    cons: ['Premium price', 'No PSRAM'],
    pinoutUrl: 'https://learn.sparkfun.com/tutorials/esp32-thing-plus-hookup-guide/all#hardware-overview',
  },

  // ============================================
  // SUPER MINI / COMPACT BOARDS
  // ============================================
  {
    id: 'esp32-c3-supermini',
    name: 'ESP32-C3 SuperMini',
    manufacturer: 'Various',
    variant: 'esp32-c3',
    module: 'ESP32-C3',
    description: 'Ultra-compact C3 board, smallest ESP32 devkit.',
    releaseYear: 2022,
    status: 'Active',
    formFactor: {
      pins: 14,
      dimensions: '22.5 x 18 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'Native USB',
      flashSize: '4 MB',
      psram: false,
      buttons: ['RST', 'BOOT'],
      leds: ['Power', 'User (GPIO8)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 14,
      gpio: 11,
      adc: 4,
      dac: 0,
      touch: 0,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$3-6',
    pros: ['Extremely small', 'Very cheap', 'USB-C', 'Native USB'],
    cons: ['Very few GPIOs', 'Minimal features'],
    pinoutUrl: 'https://www.nologo.tech/product/esp32/esp32c3SuperMini/esp32c3SuperMini.html',
  },
  {
    id: 'esp32-s3-supermini',
    name: 'ESP32-S3 SuperMini',
    manufacturer: 'Various',
    variant: 'esp32-s3',
    module: 'ESP32-S3',
    description: 'Compact S3 with native USB in tiny form factor.',
    releaseYear: 2023,
    status: 'Active',
    formFactor: {
      pins: 18,
      dimensions: '25 x 18 mm',
      breadboardFriendly: true,
    },
    features: {
      usbConnector: 'USB-C',
      usbChip: 'Native USB',
      flashSize: '4-8 MB',
      psram: 'Optional',
      buttons: ['RST', 'BOOT'],
      leds: ['Power', 'RGB (WS2812)'],
      antenna: 'PCB antenna',
      batteryCharging: false,
    },
    pinout: {
      totalPins: 18,
      gpio: 14,
      adc: 8,
      dac: 0,
      touch: 4,
    },
    power: {
      inputVoltage: '5V (USB)',
      operatingVoltage: '3.3V',
    },
    price: '$5-10',
    pros: ['Very compact', 'Dual core', 'Native USB', 'AI acceleration'],
    cons: ['Limited GPIOs', 'Quality varies'],
    pinoutUrl: 'https://www.nologo.tech/product/esp32/esp32s3SuperMini/esp32S3SuperMini.html',
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getBoard(id) {
  return boards.find(b => b.id === id)
}

export function getBoardsByVariant(variantId) {
  return boards.filter(b => b.variant === variantId)
}

export function getBoardsByManufacturer(manufacturer) {
  return boards.filter(b =>
    b.manufacturer.toLowerCase() === manufacturer.toLowerCase()
  )
}

export function getBoardsWithCamera() {
  return boards.filter(b => b.features.camera)
}

export function getBoardsWithBatteryCharging() {
  return boards.filter(b => b.features.batteryCharging)
}

export function getFeatherBoards() {
  return boards.filter(b => b.formFactor.featherCompatible)
}

export function getBreadboardFriendlyBoards() {
  return boards.filter(b => b.formFactor.breadboardFriendly)
}

export function searchBoards(query) {
  const q = query.toLowerCase()
  return boards.filter(b =>
    b.name.toLowerCase().includes(q) ||
    b.manufacturer.toLowerCase().includes(q) ||
    b.description.toLowerCase().includes(q) ||
    b.variant.toLowerCase().includes(q)
  )
}

// Board categories for filtering
export const boardCategories = {
  official: boards.filter(b => b.manufacturer === 'Espressif'),
  camera: boards.filter(b => b.features.camera),
  feather: boards.filter(b => b.formFactor.featherCompatible),
  compact: boards.filter(b => b.name.toLowerCase().includes('mini') || b.name.toLowerCase().includes('supermini')),
  budget: boards.filter(b => {
    const price = parseInt(b.price?.replace(/[^0-9]/g, '') || '999')
    return price <= 10
  }),
}

// Manufacturers list
export const manufacturers = [...new Set(boards.map(b => b.manufacturer))].sort()

// Get all unique variants used by boards
export const boardVariants = [...new Set(boards.map(b => b.variant))].sort()
