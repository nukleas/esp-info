/**
 * ESP32 Common Circuits Data
 *
 * Comprehensive library of frequently used circuits and wiring configurations.
 * Organized by category with difficulty levels, components, code examples, and notes.
 *
 * Categories:
 * - Power: Power supply, regulation, battery
 * - Programming: USB-serial, auto-programming, JTAG
 * - Input: Buttons, sensors, analog inputs
 * - Output: LEDs, relays, motors, displays
 * - Communication: I2C, SPI, UART, CAN
 * - Sensors: Temperature, humidity, motion, etc.
 * - Wireless: Antenna, RF considerations
 */

export const circuits = [
  // ============================================
  // POWER CIRCUITS
  // ============================================
  {
    id: 'power-3v3-ams1117',
    category: 'Power',
    title: '3.3V Power Supply (AMS1117)',
    difficulty: 'beginner',
    description: 'Basic 3.3V regulation from 5V using AMS1117-3.3 LDO regulator',
    components: [
      { name: 'AMS1117-3.3', type: 'LDO Regulator', value: '3.3V 1A' },
      { name: 'C1', type: 'Electrolytic Capacitor', value: '10µF 16V', note: 'Input' },
      { name: 'C2', type: 'Electrolytic Capacitor', value: '10µF 16V', note: 'Output' },
      { name: 'C3', type: 'Ceramic Capacitor', value: '100nF', note: 'Decoupling' },
    ],
    connections: [
      { from: 'VIN (5V)', to: 'AMS1117 VIN', note: 'Through C1 to GND' },
      { from: 'AMS1117 VOUT', to: 'ESP32 3V3', note: 'Through C2 to GND' },
      { from: 'AMS1117 GND', to: 'GND', note: 'Common ground' },
    ],
    schematicAscii: `
    5V ──┬──[C1 10µF]──┬── GND
         │             │
         └──┤AMS1117├──┼── 3.3V
            │    GND   │
            └────┬─────┘
                 │
            [C2 10µF]
                 │
                GND
    `,
    notes: [
      'Maximum output current ~800mA (with heatsink ~1A)',
      'Dropout voltage ~1.2V, so input must be >4.5V',
      'Gets hot under load - consider heatsink for >500mA',
      'Keep input voltage below 15V',
    ],
    warnings: ['LDO will get HOT if input-output voltage difference is large'],
    testedWith: ['ESP32', 'ESP32-S3', 'ESP32-C3'],
    tags: ['power', 'regulator', 'beginner'],
  },
  {
    id: 'power-3v3-mcp1700',
    category: 'Power',
    title: '3.3V Low-Dropout Regulator (MCP1700)',
    difficulty: 'beginner',
    description: 'Ultra-low quiescent current regulator for battery-powered projects',
    components: [
      { name: 'MCP1700-3302E', type: 'LDO Regulator', value: '3.3V 250mA' },
      { name: 'C1', type: 'Ceramic Capacitor', value: '1µF', note: 'Input' },
      { name: 'C2', type: 'Ceramic Capacitor', value: '1µF', note: 'Output' },
    ],
    notes: [
      'Only 1.6µA quiescent current - great for deep sleep applications',
      'Dropout voltage only 178mV at 250mA',
      'Can run from 3.7V LiPo down to ~3.5V',
      'Max 250mA - sufficient for ESP32 in most modes',
    ],
    warnings: ['Not enough current for WiFi transmit peaks - add bulk capacitor'],
    tags: ['power', 'battery', 'low-power'],
  },
  {
    id: 'power-lipo-charging',
    category: 'Power',
    title: 'LiPo Battery Charging (TP4056)',
    difficulty: 'intermediate',
    description: 'Single-cell LiPo/Li-Ion charging with protection circuit',
    components: [
      { name: 'TP4056 Module', type: 'Charging IC', value: 'With protection' },
      { name: 'LiPo Battery', type: 'Battery', value: '3.7V 1000mAh+' },
      { name: 'AMS1117-3.3', type: 'LDO', value: '3.3V' },
      { name: 'C1', type: 'Capacitor', value: '100µF', note: 'After LDO' },
    ],
    connections: [
      { from: 'USB 5V', to: 'TP4056 IN+' },
      { from: 'TP4056 OUT+', to: 'LiPo B+' },
      { from: 'TP4056 OUT+', to: 'AMS1117 VIN', note: 'Battery voltage (3.0-4.2V)' },
      { from: 'AMS1117 VOUT', to: 'ESP32 3V3' },
    ],
    code: `// Read battery voltage via ADC
const int VBAT_PIN = 34;  // ADC1_CH6
const float VBAT_DIVIDER = 2.0;  // If using voltage divider

float readBatteryVoltage() {
  int raw = analogRead(VBAT_PIN);
  float voltage = (raw / 4095.0) * 3.3 * VBAT_DIVIDER;
  return voltage;
}

int batteryPercent(float voltage) {
  // LiPo: 4.2V = 100%, 3.0V = 0%
  int percent = (voltage - 3.0) / (4.2 - 3.0) * 100;
  return constrain(percent, 0, 100);
}`,
    notes: [
      'TP4056 charges at 1A by default (can adjust with PROG resistor)',
      'Use module WITH protection circuit (DW01A chip)',
      'LiPo voltage range: 3.0V (empty) to 4.2V (full)',
      'Add voltage divider to read battery voltage (ADC max 3.3V)',
    ],
    warnings: [
      'Never use unprotected LiPo cells',
      'Ensure battery can handle charge current',
    ],
    tags: ['power', 'battery', 'lipo', 'charging'],
  },
  {
    id: 'power-decoupling',
    category: 'Power',
    title: 'Proper Decoupling Capacitors',
    difficulty: 'beginner',
    description: 'Essential capacitor placement for stable ESP32 operation',
    components: [
      { name: 'C1', type: 'Electrolytic', value: '100µF 10V', note: 'Bulk capacitor' },
      { name: 'C2-C4', type: 'Ceramic', value: '100nF (0.1µF)', note: 'Per power pin' },
      { name: 'C5', type: 'Ceramic', value: '10µF', note: 'Near EN pin' },
    ],
    connections: [
      { from: 'Bulk 100µF', to: 'Main 3.3V input', note: 'Near power connector' },
      { from: '100nF ceramic', to: 'Each VDD pin', note: 'As close as possible' },
      { from: '10µF ceramic', to: 'EN pin to GND', note: 'Helps with reset stability' },
    ],
    notes: [
      'Place ceramic caps as close to chip pins as possible',
      'Use short, wide traces for power',
      'Bulk cap handles WiFi transmit current spikes (~300mA)',
      'Ceramic caps filter high-frequency noise',
    ],
    tags: ['power', 'decoupling', 'stability', 'beginner'],
  },

  // ============================================
  // PROGRAMMING CIRCUITS
  // ============================================
  {
    id: 'programming-usb-serial',
    category: 'Programming',
    title: 'USB-to-Serial Programming (CP2102/CH340)',
    difficulty: 'intermediate',
    description: 'Auto-reset circuit for programming via USB-to-serial adapter',
    components: [
      { name: 'USB-Serial Module', type: 'Adapter', value: 'CP2102 or CH340' },
      { name: 'Q1', type: 'NPN Transistor', value: 'S8050 or 2N2222' },
      { name: 'Q2', type: 'NPN Transistor', value: 'S8050 or 2N2222' },
      { name: 'R1', type: 'Resistor', value: '10kΩ' },
      { name: 'R2', type: 'Resistor', value: '10kΩ' },
      { name: 'C1', type: 'Capacitor', value: '100nF' },
    ],
    connections: [
      { from: 'USB TX', to: 'ESP32 RX (GPIO3)' },
      { from: 'USB RX', to: 'ESP32 TX (GPIO1)' },
      { from: 'USB DTR', to: 'Q1 Base via R1' },
      { from: 'Q1 Collector', to: 'ESP32 EN' },
      { from: 'USB RTS', to: 'Q2 Base via R2' },
      { from: 'Q2 Collector', to: 'ESP32 GPIO0' },
      { from: 'USB GND', to: 'ESP32 GND' },
    ],
    schematicAscii: `
    USB Adapter                ESP32
    ┌──────────┐              ┌──────┐
    │      DTR ├──[10k]──┬──┤ EN   │
    │          │    ┌──[100nF]──┤      │
    │      RTS ├──[10k]──┴──┤ GPIO0│
    │          │              │      │
    │       TX ├──────────────┤ RX   │
    │       RX ├──────────────┤ TX   │
    │      GND ├──────────────┤ GND  │
    └──────────┘              └──────┘

    Note: Transistors invert DTR/RTS signals
    `,
    code: `// Arduino IDE: Select "ESP32 Dev Module"
// Upload speed: 115200 or 921600
// Flash mode: DIO or QIO

// To enter bootloader manually:
// 1. Hold BOOT (GPIO0 to GND)
// 2. Press and release EN (reset)
// 3. Release BOOT
// 4. Upload code`,
    notes: [
      'DTR and RTS toggle to put ESP32 in bootloader mode',
      'Works with Arduino IDE, PlatformIO, esptool.py',
      'Some boards have this circuit built-in',
      'If auto-upload fails, try manual boot mode',
    ],
    tags: ['programming', 'usb', 'serial', 'bootloader'],
  },
  {
    id: 'programming-native-usb',
    category: 'Programming',
    title: 'Native USB Programming (S2/S3/C3/C6)',
    difficulty: 'beginner',
    description: 'Direct USB programming without external adapter for newer ESP32 variants',
    components: [
      { name: 'USB-C Connector', type: 'Connector', value: 'USB 2.0' },
      { name: 'R1, R2', type: 'Resistor', value: '5.1kΩ', note: 'CC1, CC2 pulldown' },
      { name: 'ESD Protection', type: 'TVS Diode', value: 'USBLC6-2SC6', note: 'Optional' },
    ],
    connections: [
      { from: 'USB D+', to: 'GPIO20 (S3) / GPIO19 (C3)' },
      { from: 'USB D-', to: 'GPIO19 (S3) / GPIO18 (C3)' },
      { from: 'USB VBUS', to: '5V input' },
      { from: 'CC1, CC2', to: '5.1kΩ to GND', note: 'For USB-C' },
    ],
    notes: [
      'ESP32-S2, S3, C3, C6 have native USB - no FTDI/CH340 needed',
      'First upload may require manual bootloader mode',
      'After first upload, auto-reset works via USB CDC',
      '5.1kΩ resistors on CC pins required for USB-C detection',
    ],
    supportedVariants: ['ESP32-S2', 'ESP32-S3', 'ESP32-C3', 'ESP32-C6'],
    tags: ['programming', 'usb', 'native'],
  },
  {
    id: 'boot-reset-buttons',
    category: 'Programming',
    title: 'Boot and Reset Buttons',
    difficulty: 'beginner',
    description: 'Manual boot mode entry and reset buttons',
    components: [
      { name: 'SW1', type: 'Push Button', value: 'Momentary', note: 'RESET' },
      { name: 'SW2', type: 'Push Button', value: 'Momentary', note: 'BOOT' },
      { name: 'R1', type: 'Resistor', value: '10kΩ', note: 'EN pullup' },
      { name: 'C1', type: 'Capacitor', value: '100nF', note: 'Debounce' },
    ],
    connections: [
      { from: 'EN pin', to: '10kΩ pullup to 3V3' },
      { from: 'SW1 (RESET)', to: 'EN to GND' },
      { from: 'SW2 (BOOT)', to: 'GPIO0 to GND' },
      { from: 'C1', to: 'EN to GND', note: 'Optional debounce' },
    ],
    code: `// Manual bootloader entry sequence:
// 1. Press and hold BOOT button
// 2. Press and release RESET button
// 3. Release BOOT button
// 4. ESP32 is now in bootloader mode
// 5. Upload your code
// 6. Press RESET to run the new code`,
    notes: [
      'GPIO0 has internal pullup - only needs button to GND',
      'EN pin needs external pullup for reliable operation',
      'Debounce capacitor prevents double-reset issues',
    ],
    tags: ['programming', 'buttons', 'reset', 'boot'],
  },

  // ============================================
  // INPUT CIRCUITS
  // ============================================
  {
    id: 'input-button-pullup',
    category: 'Input',
    title: 'Button with Internal Pull-up',
    difficulty: 'beginner',
    description: 'Simple push button using ESP32 internal pull-up resistor',
    components: [
      { name: 'SW1', type: 'Push Button', value: 'Momentary SPST' },
      { name: 'C1', type: 'Capacitor', value: '100nF', note: 'Optional hardware debounce' },
    ],
    connections: [
      { from: 'Button Pin 1', to: 'ESP32 GPIO' },
      { from: 'Button Pin 2', to: 'GND' },
      { from: 'C1', to: 'GPIO to GND', note: 'Optional' },
    ],
    code: `const int BUTTON_PIN = 4;

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(BUTTON_PIN) == LOW) {
    Serial.println("Button pressed!");
    delay(50);  // Simple software debounce
  }
}`,
    notes: [
      'Internal pullup is ~45kΩ',
      'Button reads LOW when pressed, HIGH when released',
      'Works with any GPIO except input-only pins (34-39)',
      'For GPIO34-39, use external 10kΩ pullup',
    ],
    tags: ['input', 'button', 'beginner', 'digital'],
  },
  {
    id: 'input-button-interrupt',
    category: 'Input',
    title: 'Button with Interrupt',
    difficulty: 'intermediate',
    description: 'Efficient button handling using hardware interrupts',
    components: [
      { name: 'SW1', type: 'Push Button', value: 'Momentary' },
    ],
    code: `const int BUTTON_PIN = 4;
volatile bool buttonPressed = false;
volatile unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

void IRAM_ATTR buttonISR() {
  unsigned long currentTime = millis();
  if (currentTime - lastDebounceTime > debounceDelay) {
    buttonPressed = true;
    lastDebounceTime = currentTime;
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), buttonISR, FALLING);
}

void loop() {
  if (buttonPressed) {
    Serial.println("Button pressed via interrupt!");
    buttonPressed = false;
  }
  // Do other work here without blocking
}`,
    notes: [
      'IRAM_ATTR puts ISR in RAM for faster execution',
      'Keep ISR short - just set flags',
      'Use volatile for variables shared with ISR',
      'Debounce in ISR to prevent multiple triggers',
    ],
    tags: ['input', 'button', 'interrupt', 'intermediate'],
  },
  {
    id: 'input-adc-voltage-divider',
    category: 'Input',
    title: 'ADC with Voltage Divider',
    difficulty: 'intermediate',
    description: 'Read voltages higher than 3.3V using a voltage divider',
    components: [
      { name: 'R1', type: 'Resistor', value: '27kΩ' },
      { name: 'R2', type: 'Resistor', value: '10kΩ' },
      { name: 'C1', type: 'Capacitor', value: '100nF', note: 'Optional filter' },
    ],
    connections: [
      { from: 'Voltage Source', to: 'R1' },
      { from: 'R1', to: 'R2 + GPIO (ADC pin)' },
      { from: 'R2', to: 'GND' },
      { from: 'C1', to: 'GPIO to GND', note: 'Low-pass filter' },
    ],
    schematicAscii: `
    Vin (0-12V)
        │
       [R1 27k]
        │
        ├───── GPIO (ADC)
        │
       [R2 10k]
        │
       GND

    Vout = Vin × R2/(R1+R2)
    For R1=27k, R2=10k: Vout = Vin × 0.27
    12V input → 3.24V to ADC (safe!)
    `,
    code: `const int ADC_PIN = 34;  // ADC1 channel
const float R1 = 27000.0;
const float R2 = 10000.0;
const float DIVIDER_RATIO = R2 / (R1 + R2);

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);  // 12-bit (0-4095)
  analogSetAttenuation(ADC_11db);  // Full range 0-3.3V
}

void loop() {
  int raw = analogRead(ADC_PIN);
  float adcVoltage = (raw / 4095.0) * 3.3;
  float actualVoltage = adcVoltage / DIVIDER_RATIO;

  Serial.printf("Raw: %d, ADC: %.2fV, Actual: %.2fV\\n",
                raw, adcVoltage, actualVoltage);
  delay(500);
}`,
    notes: [
      'Formula: Vout = Vin × R2/(R1+R2)',
      'Choose R2 so max input gives <3.3V output',
      'Use ADC1 pins (GPIO32-39) if using WiFi',
      'ADC2 pins not available when WiFi is active',
      'ESP32 ADC is not perfectly linear - calibrate for accuracy',
    ],
    warnings: ['Never exceed 3.3V on any GPIO pin'],
    tags: ['input', 'adc', 'analog', 'voltage'],
  },
  {
    id: 'input-touch-sensor',
    category: 'Input',
    title: 'Capacitive Touch Sensor',
    difficulty: 'beginner',
    description: 'Built-in touch sensing without external components',
    components: [
      { name: 'Touch Pad', type: 'Conductive Surface', value: 'Copper tape, PCB pad, or wire' },
    ],
    connections: [
      { from: 'Touch Pad', to: 'Touch-capable GPIO (T0-T9)' },
    ],
    code: `const int TOUCH_PIN = T0;  // GPIO4
const int TOUCH_THRESHOLD = 40;

void setup() {
  Serial.begin(115200);
}

void loop() {
  int touchValue = touchRead(TOUCH_PIN);
  Serial.printf("Touch value: %d\\n", touchValue);

  if (touchValue < TOUCH_THRESHOLD) {
    Serial.println("Touch detected!");
  }
  delay(100);
}

// Touch pins on ESP32:
// T0 = GPIO4,  T1 = GPIO0,  T2 = GPIO2
// T3 = GPIO15, T4 = GPIO13, T5 = GPIO12
// T6 = GPIO14, T7 = GPIO27, T8 = GPIO33
// T9 = GPIO32`,
    notes: [
      'Touch value decreases when touched',
      'Threshold varies - calibrate for your setup',
      'Can wake from deep sleep',
      'ESP32-S2/S3 have 14 touch channels',
      'ESP32-C3/C6 do NOT have touch sensors',
    ],
    supportedVariants: ['ESP32', 'ESP32-S2', 'ESP32-S3'],
    tags: ['input', 'touch', 'capacitive', 'beginner'],
  },

  // ============================================
  // OUTPUT CIRCUITS
  // ============================================
  {
    id: 'output-led-basic',
    category: 'Output',
    title: 'LED with Current Limiting Resistor',
    difficulty: 'beginner',
    description: 'Standard LED connection with proper current limiting',
    components: [
      { name: 'LED', type: 'LED', value: 'Any color (5mm or 3mm)' },
      { name: 'R1', type: 'Resistor', value: '220Ω-470Ω' },
    ],
    connections: [
      { from: 'GPIO', to: 'Resistor' },
      { from: 'Resistor', to: 'LED Anode (+)' },
      { from: 'LED Cathode (-)', to: 'GND' },
    ],
    schematicAscii: `
    GPIO ──[R 330Ω]──|>|── GND
                    LED

    R = (Vsource - Vf) / If
    For red LED: (3.3V - 2.0V) / 10mA = 130Ω minimum
    Use 220-330Ω for ~5-10mA (safe, visible)
    `,
    code: `const int LED_PIN = 2;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}`,
    notes: [
      'Resistor value: R = (3.3V - LED_Vf) / desired_current',
      'Typical Vf: Red=2.0V, Green=2.2V, Blue=3.0V, White=3.2V',
      'ESP32 GPIO can source up to 40mA (but 20mA recommended)',
      '330Ω gives ~4mA with red LED - visible but dim',
    ],
    tags: ['output', 'led', 'beginner'],
  },
  {
    id: 'output-led-pwm',
    category: 'Output',
    title: 'LED PWM Dimming',
    difficulty: 'beginner',
    description: 'Smooth LED brightness control using PWM',
    components: [
      { name: 'LED', type: 'LED', value: 'Any color' },
      { name: 'R1', type: 'Resistor', value: '220Ω' },
    ],
    code: `const int LED_PIN = 2;
const int PWM_FREQ = 5000;
const int PWM_CHANNEL = 0;
const int PWM_RESOLUTION = 8;  // 8-bit (0-255)

void setup() {
  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RESOLUTION);
  ledcAttachPin(LED_PIN, PWM_CHANNEL);
}

void loop() {
  // Fade up
  for (int duty = 0; duty <= 255; duty++) {
    ledcWrite(PWM_CHANNEL, duty);
    delay(10);
  }
  // Fade down
  for (int duty = 255; duty >= 0; duty--) {
    ledcWrite(PWM_CHANNEL, duty);
    delay(10);
  }
}`,
    notes: [
      'ESP32 has 16 PWM channels (8 on C3)',
      'Any output-capable GPIO can do PWM',
      'Higher resolution = smoother fading',
      '5kHz is inaudible and works well for LEDs',
    ],
    tags: ['output', 'led', 'pwm', 'dimming'],
  },
  {
    id: 'output-neopixel',
    category: 'Output',
    title: 'WS2812B RGB LED (NeoPixel)',
    difficulty: 'intermediate',
    description: 'Addressable RGB LED strip/ring control',
    components: [
      { name: 'WS2812B', type: 'LED Strip/Ring', value: 'Any length' },
      { name: 'C1', type: 'Capacitor', value: '1000µF', note: 'Power smoothing' },
      { name: 'R1', type: 'Resistor', value: '330Ω', note: 'Data line protection' },
    ],
    connections: [
      { from: 'ESP32 5V or VIN', to: 'LED Strip VCC' },
      { from: 'ESP32 GND', to: 'LED Strip GND' },
      { from: 'GPIO (e.g., 16)', to: '330Ω resistor', note: 'To LED Strip DIN' },
    ],
    code: `#include <Adafruit_NeoPixel.h>

#define LED_PIN    16
#define LED_COUNT  8

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin();
  strip.setBrightness(50);  // 0-255
  strip.show();
}

void loop() {
  // Rainbow cycle
  for (int i = 0; i < strip.numPixels(); i++) {
    int hue = (i * 65536 / strip.numPixels()) + millis() / 10;
    strip.setPixelColor(i, strip.gamma32(strip.ColorHSV(hue)));
  }
  strip.show();
  delay(10);
}`,
    notes: [
      'Each LED draws up to 60mA at full white',
      'Use external 5V supply for >10 LEDs',
      'Data signal is 3.3V but usually works (add level shifter if issues)',
      'Add 1000µF cap across power for stability',
      'ESP32-S3 GPIO48 is often used (connected to onboard RGB)',
    ],
    warnings: ['Power consumption adds up quickly - calculate total current!'],
    tags: ['output', 'led', 'rgb', 'neopixel', 'ws2812'],
  },
  {
    id: 'output-relay',
    category: 'Output',
    title: 'Relay Module Control',
    difficulty: 'intermediate',
    description: 'Control AC/DC loads with optocoupler-isolated relay module',
    components: [
      { name: 'Relay Module', type: 'Module', value: '5V 1/2/4 channel' },
    ],
    connections: [
      { from: 'ESP32 5V/VIN', to: 'Relay VCC' },
      { from: 'ESP32 GND', to: 'Relay GND' },
      { from: 'ESP32 GPIO', to: 'Relay IN1/IN2' },
    ],
    code: `const int RELAY_PIN = 26;

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);  // Relay OFF (active LOW)
}

void loop() {
  digitalWrite(RELAY_PIN, LOW);   // Relay ON
  delay(2000);
  digitalWrite(RELAY_PIN, HIGH);  // Relay OFF
  delay(2000);
}`,
    notes: [
      'Most relay modules are ACTIVE LOW (LOW = ON)',
      'Remove jumper for isolated operation (separate relay power)',
      'Use optocoupler isolation for safety with AC',
      'Relay contacts rated for specific voltage/current - check specs',
      'Add flyback diode if driving relay coil directly',
    ],
    warnings: [
      'DANGER: AC mains voltage can KILL',
      'Use proper isolation and safety measures',
      'Never touch relay contacts when powered',
    ],
    tags: ['output', 'relay', 'ac', 'control'],
  },
  {
    id: 'output-mosfet',
    category: 'Output',
    title: 'MOSFET High-Current Switching',
    difficulty: 'intermediate',
    description: 'Control high-current DC loads (motors, LED strips) with logic-level MOSFET',
    components: [
      { name: 'Q1', type: 'N-Channel MOSFET', value: 'IRLZ44N or IRLB8721' },
      { name: 'R1', type: 'Resistor', value: '10kΩ', note: 'Gate pulldown' },
      { name: 'R2', type: 'Resistor', value: '100Ω', note: 'Gate current limit' },
      { name: 'D1', type: 'Diode', value: '1N4007', note: 'Flyback for inductive loads' },
    ],
    connections: [
      { from: 'GPIO', to: '100Ω resistor to MOSFET Gate' },
      { from: 'MOSFET Gate', to: '10kΩ to GND', note: 'Ensures OFF when GPIO floating' },
      { from: 'MOSFET Source', to: 'GND' },
      { from: 'MOSFET Drain', to: 'Load negative' },
      { from: 'Load positive', to: 'External power supply +' },
    ],
    schematicAscii: `
     +12V ──────┬────── Load+
                │
              [LOAD]
                │
     GPIO ─[100Ω]─┬── Load- / Drain
                  │
              Gate─┤ MOSFET
             [10k] │
                │  │
     GND ──────┴──┴─ Source
    `,
    code: `const int MOSFET_PIN = 25;
const int PWM_FREQ = 25000;  // 25kHz - inaudible
const int PWM_CHANNEL = 0;

void setup() {
  ledcSetup(PWM_CHANNEL, PWM_FREQ, 8);
  ledcAttachPin(MOSFET_PIN, PWM_CHANNEL);
}

void loop() {
  // Ramp up motor/LED brightness
  for (int i = 0; i <= 255; i++) {
    ledcWrite(PWM_CHANNEL, i);
    delay(20);
  }
  delay(1000);

  // Turn off
  ledcWrite(PWM_CHANNEL, 0);
  delay(1000);
}`,
    notes: [
      'Logic-level MOSFETs (IRL*) fully turn on at 3.3V',
      'Standard MOSFETs need 5V+ gate drive',
      'IRLZ44N: 55V, 47A (with heatsink)',
      'IRLB8721: 30V, 62A - better for 12V systems',
      'Add flyback diode for motors/solenoids',
      'Use PWM for variable speed/brightness',
    ],
    tags: ['output', 'mosfet', 'high-current', 'motor', 'pwm'],
  },

  // ============================================
  // COMMUNICATION CIRCUITS
  // ============================================
  {
    id: 'comm-i2c',
    category: 'Communication',
    title: 'I2C Bus with Pull-ups',
    difficulty: 'intermediate',
    description: 'Proper I2C bus setup with multiple devices',
    components: [
      { name: 'R1', type: 'Resistor', value: '4.7kΩ', note: 'SDA pullup' },
      { name: 'R2', type: 'Resistor', value: '4.7kΩ', note: 'SCL pullup' },
    ],
    connections: [
      { from: 'ESP32 GPIO21', to: 'SDA bus + 4.7kΩ to 3.3V' },
      { from: 'ESP32 GPIO22', to: 'SCL bus + 4.7kΩ to 3.3V' },
      { from: 'Device SDA', to: 'SDA bus' },
      { from: 'Device SCL', to: 'SCL bus' },
      { from: 'Device VCC', to: '3.3V' },
      { from: 'All GND', to: 'Common GND' },
    ],
    code: `#include <Wire.h>

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);  // SDA, SCL (or use defaults)

  // I2C Scanner
  Serial.println("Scanning I2C bus...");
  for (byte addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    if (Wire.endTransmission() == 0) {
      Serial.printf("Device found at 0x%02X\\n", addr);
    }
  }
}

void loop() {}

// Common I2C addresses:
// 0x3C, 0x3D - OLED displays (SSD1306)
// 0x27, 0x3F - LCD with I2C backpack
// 0x48-0x4F  - ADS1115 ADC
// 0x68       - DS3231 RTC, MPU6050
// 0x76, 0x77 - BME280/BMP280`,
    notes: [
      'Pull-up value depends on bus speed and capacitance',
      '4.7kΩ works for most cases at 100-400kHz',
      'For long wires or many devices, use 2.2kΩ',
      'Many breakout boards have pull-ups - check for doubles',
      'ESP32 can use any GPIO for I2C (not just 21/22)',
    ],
    tags: ['communication', 'i2c', 'bus', 'sensors'],
  },
  {
    id: 'comm-spi',
    category: 'Communication',
    title: 'SPI Bus with Multiple Devices',
    difficulty: 'intermediate',
    description: 'SPI bus setup with CS selection for multiple devices',
    components: [
      { name: 'Device 1', type: 'SPI Device', value: 'e.g., SD Card' },
      { name: 'Device 2', type: 'SPI Device', value: 'e.g., Display' },
    ],
    connections: [
      { from: 'ESP32 GPIO23', to: 'All MOSI' },
      { from: 'ESP32 GPIO19', to: 'All MISO' },
      { from: 'ESP32 GPIO18', to: 'All CLK/SCK' },
      { from: 'ESP32 GPIO5', to: 'Device 1 CS' },
      { from: 'ESP32 GPIO15', to: 'Device 2 CS' },
    ],
    code: `#include <SPI.h>

#define VSPI_MISO  19
#define VSPI_MOSI  23
#define VSPI_SCLK  18
#define VSPI_CS1    5  // SD Card
#define VSPI_CS2   15  // Display

SPIClass vspi(VSPI);

void setup() {
  vspi.begin(VSPI_SCLK, VSPI_MISO, VSPI_MOSI);

  pinMode(VSPI_CS1, OUTPUT);
  pinMode(VSPI_CS2, OUTPUT);
  digitalWrite(VSPI_CS1, HIGH);  // Deselect
  digitalWrite(VSPI_CS2, HIGH);  // Deselect
}

void selectDevice1() {
  digitalWrite(VSPI_CS2, HIGH);
  digitalWrite(VSPI_CS1, LOW);
}

void selectDevice2() {
  digitalWrite(VSPI_CS1, HIGH);
  digitalWrite(VSPI_CS2, LOW);
}`,
    notes: [
      'ESP32 has 4 SPI buses (2 usable: HSPI and VSPI)',
      'VSPI default: MOSI=23, MISO=19, CLK=18, CS=5',
      'HSPI default: MOSI=13, MISO=12, CLK=14, CS=15',
      'Each device needs unique CS pin',
      'CS is active LOW - only one device selected at a time',
    ],
    tags: ['communication', 'spi', 'bus'],
  },
  {
    id: 'comm-uart-level-shift',
    category: 'Communication',
    title: 'UART with Level Shifting',
    difficulty: 'intermediate',
    description: '3.3V to 5V level shifting for UART communication',
    components: [
      { name: 'Level Shifter', type: 'Module', value: 'Bi-directional (BSS138-based)' },
      { name: 'Alternative: R1', type: 'Resistor', value: '1kΩ', note: 'Voltage divider' },
      { name: 'Alternative: R2', type: 'Resistor', value: '2kΩ', note: 'Voltage divider' },
    ],
    connections: [
      { from: 'ESP32 TX', to: 'Level Shifter LV1 → HV1 → 5V Device RX' },
      { from: '5V Device TX', to: 'Voltage Divider → ESP32 RX' },
      { from: 'Level Shifter LV', to: '3.3V' },
      { from: 'Level Shifter HV', to: '5V' },
    ],
    schematicAscii: `
    5V Device TX ──┬──[1kΩ]──┬── ESP32 RX
                   │         │
                  [2kΩ]      │
                   │         │
                  GND       3.3V max

    Divider: 5V × (2k/(1k+2k)) = 3.33V ✓
    `,
    code: `// Using UART2 for external device
#define RXD2 16
#define TXD2 17

void setup() {
  Serial.begin(115200);         // USB Serial
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);  // External device
}

void loop() {
  // Forward data between Serial and Serial2
  if (Serial.available()) {
    Serial2.write(Serial.read());
  }
  if (Serial2.available()) {
    Serial.write(Serial2.read());
  }
}`,
    notes: [
      'ESP32 is NOT 5V tolerant - always level shift RX',
      'TX (3.3V out) is usually accepted by 5V devices',
      'Voltage divider is cheap but unidirectional',
      'BSS138 module is bidirectional and fast',
      'ESP32 has 3 UARTs: UART0 (USB), UART1 (flash), UART2 (free)',
    ],
    warnings: ['5V on ESP32 GPIO will damage the chip permanently'],
    tags: ['communication', 'uart', 'serial', 'level-shift'],
  },
  {
    id: 'comm-sd-card',
    category: 'Communication',
    title: 'SD Card (SPI and SDMMC Mode)',
    difficulty: 'intermediate',
    description: 'MicroSD card interface in SPI or native SDMMC mode',
    components: [
      { name: 'MicroSD Module', type: 'Module', value: 'With level shifter' },
      { name: 'MicroSD Card', type: 'Card', value: 'FAT32 formatted' },
    ],
    connections: [
      { from: 'Module 3V3', to: 'ESP32 3.3V' },
      { from: 'Module GND', to: 'ESP32 GND' },
      { from: 'Module MISO', to: 'GPIO19' },
      { from: 'Module MOSI', to: 'GPIO23' },
      { from: 'Module SCK', to: 'GPIO18' },
      { from: 'Module CS', to: 'GPIO5' },
    ],
    code: `// SPI Mode (works on all ESP32 variants)
#include <SD.h>
#include <SPI.h>

#define SD_CS 5

void setup() {
  Serial.begin(115200);

  if (!SD.begin(SD_CS)) {
    Serial.println("SD Card Mount Failed");
    return;
  }

  Serial.printf("Card Size: %lluMB\\n", SD.cardSize() / (1024 * 1024));

  // Write test
  File file = SD.open("/test.txt", FILE_WRITE);
  if (file) {
    file.println("Hello ESP32!");
    file.close();
  }

  // Read test
  file = SD.open("/test.txt");
  while (file.available()) {
    Serial.write(file.read());
  }
  file.close();
}

void loop() {}`,
    notes: [
      'SPI mode: Slower but uses standard SPI pins',
      'SDMMC mode: Faster (4-bit) but specific pins required',
      'Format card as FAT32 for best compatibility',
      'Cards >32GB need FAT32 formatting tool',
      'SDMMC available on ESP32, ESP32-S3 (not C3)',
    ],
    tags: ['communication', 'spi', 'sdcard', 'storage'],
  },

  // ============================================
  // SENSOR CIRCUITS
  // ============================================
  {
    id: 'sensor-dht22',
    category: 'Sensors',
    title: 'DHT22 Temperature & Humidity',
    difficulty: 'beginner',
    description: 'Digital temperature and humidity sensor',
    components: [
      { name: 'DHT22', type: 'Sensor', value: 'AM2302' },
      { name: 'R1', type: 'Resistor', value: '10kΩ', note: 'Data pullup' },
    ],
    connections: [
      { from: 'DHT22 Pin 1 (VCC)', to: '3.3V' },
      { from: 'DHT22 Pin 2 (DATA)', to: 'GPIO + 10kΩ pullup to 3.3V' },
      { from: 'DHT22 Pin 3', to: 'NC (not connected)' },
      { from: 'DHT22 Pin 4 (GND)', to: 'GND' },
    ],
    code: `#include <DHT.h>

#define DHTPIN 14
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  delay(2000);  // DHT22 needs 2s between reads

  float humidity = dht.readHumidity();
  float tempC = dht.readTemperature();
  float tempF = dht.readTemperature(true);

  if (isnan(humidity) || isnan(tempC)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.printf("Temp: %.1f°C (%.1f°F), Humidity: %.1f%%\\n",
                tempC, tempF, humidity);
}`,
    notes: [
      'DHT22: ±0.5°C accuracy, 0-100% RH',
      'DHT11: ±2°C accuracy, 20-80% RH (cheaper)',
      'Minimum 2 second delay between readings',
      'Pull-up resistor essential for reliable data',
      '10kΩ is typical, 4.7kΩ for long wires',
    ],
    tags: ['sensor', 'temperature', 'humidity', 'dht'],
  },
  {
    id: 'sensor-bme280',
    category: 'Sensors',
    title: 'BME280 Environment Sensor (I2C)',
    difficulty: 'intermediate',
    description: 'Temperature, humidity, and barometric pressure sensor',
    components: [
      { name: 'BME280', type: 'Sensor Module', value: 'I2C breakout' },
    ],
    connections: [
      { from: 'BME280 VIN', to: '3.3V' },
      { from: 'BME280 GND', to: 'GND' },
      { from: 'BME280 SDA', to: 'GPIO21' },
      { from: 'BME280 SCL', to: 'GPIO22' },
    ],
    code: `#include <Wire.h>
#include <Adafruit_BME280.h>

Adafruit_BME280 bme;

void setup() {
  Serial.begin(115200);

  if (!bme.begin(0x76)) {  // or 0x77
    Serial.println("BME280 not found!");
    while (1);
  }
}

void loop() {
  Serial.printf("Temp: %.2f °C\\n", bme.readTemperature());
  Serial.printf("Humidity: %.2f %%\\n", bme.readHumidity());
  Serial.printf("Pressure: %.2f hPa\\n", bme.readPressure() / 100.0F);
  Serial.printf("Altitude: %.2f m\\n", bme.readAltitude(1013.25));
  Serial.println();

  delay(2000);
}`,
    notes: [
      'I2C address: 0x76 (SDO to GND) or 0x77 (SDO to VCC)',
      'More accurate than DHT22',
      'BMP280 is same but without humidity',
      'Altitude calculated from pressure (needs sea-level reference)',
    ],
    tags: ['sensor', 'temperature', 'humidity', 'pressure', 'i2c'],
  },
  {
    id: 'sensor-pir',
    category: 'Sensors',
    title: 'PIR Motion Sensor (HC-SR501)',
    difficulty: 'beginner',
    description: 'Passive infrared motion detection',
    components: [
      { name: 'HC-SR501', type: 'PIR Module', value: '5V with 3.3V output' },
    ],
    connections: [
      { from: 'PIR VCC', to: '5V (VIN)' },
      { from: 'PIR GND', to: 'GND' },
      { from: 'PIR OUT', to: 'GPIO (3.3V output, safe for ESP32)' },
    ],
    code: `const int PIR_PIN = 27;
volatile bool motionDetected = false;

void IRAM_ATTR detectMotion() {
  motionDetected = true;
}

void setup() {
  Serial.begin(115200);
  pinMode(PIR_PIN, INPUT);
  attachInterrupt(digitalPinToInterrupt(PIR_PIN), detectMotion, RISING);

  // Wait for PIR to stabilize (30-60 seconds)
  Serial.println("Warming up PIR sensor...");
  delay(30000);
  Serial.println("Ready!");
}

void loop() {
  if (motionDetected) {
    Serial.println("Motion detected!");
    motionDetected = false;
    delay(5000);  // Ignore detections for 5 seconds
  }
}`,
    notes: [
      'PIR needs 30-60 seconds to stabilize at power-on',
      'Sensitivity and delay adjustable via potentiometers',
      'Output is 3.3V despite 5V input - safe for ESP32',
      'Jumper sets retriggering mode (H) or single (L)',
    ],
    tags: ['sensor', 'motion', 'pir', 'security'],
  },
  {
    id: 'sensor-ultrasonic',
    category: 'Sensors',
    title: 'HC-SR04 Ultrasonic Distance',
    difficulty: 'beginner',
    description: 'Measure distance using ultrasonic sound waves',
    components: [
      { name: 'HC-SR04', type: 'Sensor', value: '5V ultrasonic' },
      { name: 'R1', type: 'Resistor', value: '1kΩ', note: 'ECHO voltage divider' },
      { name: 'R2', type: 'Resistor', value: '2kΩ', note: 'ECHO voltage divider' },
    ],
    connections: [
      { from: 'HC-SR04 VCC', to: '5V' },
      { from: 'HC-SR04 GND', to: 'GND' },
      { from: 'HC-SR04 TRIG', to: 'GPIO (direct - 3.3V is enough)' },
      { from: 'HC-SR04 ECHO', to: 'Voltage divider → GPIO' },
    ],
    code: `const int TRIG_PIN = 5;
const int ECHO_PIN = 18;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

long measureDistance() {
  // Send 10µs pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Measure echo duration
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);  // 30ms timeout

  // Calculate distance (speed of sound = 343m/s)
  // Distance = duration * 0.0343 / 2
  long distance = duration * 0.0343 / 2;

  return distance;
}

void loop() {
  long cm = measureDistance();
  Serial.printf("Distance: %ld cm\\n", cm);
  delay(100);
}`,
    notes: [
      'Range: 2cm to 400cm',
      'ECHO pin outputs 5V - use voltage divider!',
      'Alternative: Use 3.3V ultrasonic (JSN-SR04T)',
      'Temperature affects accuracy (speed of sound)',
    ],
    warnings: ['ECHO pin is 5V - will damage ESP32 without level shifting'],
    tags: ['sensor', 'distance', 'ultrasonic'],
  },
  {
    id: 'display-oled-ssd1306',
    category: 'Sensors',
    title: 'OLED Display (SSD1306 I2C)',
    difficulty: 'beginner',
    description: '0.96" 128x64 OLED display via I2C',
    components: [
      { name: 'SSD1306 OLED', type: 'Display', value: '128x64 I2C' },
    ],
    connections: [
      { from: 'OLED VCC', to: '3.3V' },
      { from: 'OLED GND', to: 'GND' },
      { from: 'OLED SDA', to: 'GPIO21' },
      { from: 'OLED SCL', to: 'GPIO22' },
    ],
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1  // No reset pin

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  Serial.begin(115200);

  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("SSD1306 allocation failed");
    for(;;);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Hello ESP32!");
  display.setTextSize(2);
  display.println("OLED Test");
  display.display();
}

void loop() {}`,
    notes: [
      'Common I2C addresses: 0x3C or 0x3D',
      'Use I2C scanner if unsure of address',
      '3.3V or 5V versions available',
      'Very low power consumption',
      'Libraries: Adafruit_SSD1306, U8g2, SSD1306Ascii',
    ],
    tags: ['display', 'oled', 'i2c', 'ssd1306'],
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getCircuit(id) {
  return circuits.find(c => c.id === id)
}

export function getCircuitsByCategory(category) {
  return circuits.filter(c => c.category === category)
}

export function getCircuitsByDifficulty(difficulty) {
  return circuits.filter(c => c.difficulty === difficulty)
}

export function getCircuitsByTag(tag) {
  return circuits.filter(c => c.tags?.includes(tag))
}

export function searchCircuits(query) {
  const q = query.toLowerCase()
  return circuits.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.tags?.some(t => t.includes(q))
  )
}

// Extract unique categories and tags
export const categories = [...new Set(circuits.map(c => c.category))].sort()
export const allTags = [...new Set(circuits.flatMap(c => c.tags || []))].sort()

export const difficultyLevels = {
  beginner: { label: 'Beginner', color: 'green', description: 'No special skills required' },
  intermediate: { label: 'Intermediate', color: 'yellow', description: 'Some soldering or programming knowledge' },
  advanced: { label: 'Advanced', color: 'red', description: 'Complex circuits or critical safety considerations' },
}
