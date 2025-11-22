import { useState } from 'react'

const circuits = [
  {
    id: 'power-3v3',
    category: 'Power',
    title: '3.3V Power Supply',
    difficulty: 'beginner',
    description: 'Basic 3.3V regulation from 5V using AMS1117-3.3',
    components: [
      'AMS1117-3.3 LDO regulator',
      '10µF capacitor (input)',
      '10µF capacitor (output)',
      '100nF ceramic capacitor',
    ],
    notes: 'Maximum output current ~800mA. Keep input voltage below 15V.',
  },
  {
    id: 'programming',
    category: 'Programming',
    title: 'USB-to-Serial Auto-Programming',
    difficulty: 'intermediate',
    description: 'Auto-reset circuit for programming via USB-to-serial adapter',
    components: [
      'CP2102 or CH340 USB-to-Serial module',
      '2x 10kΩ resistors',
      '100nF capacitor',
    ],
    notes: 'DTR and RTS signals toggle EN and GPIO0 for auto-boot into programming mode.',
  },
  {
    id: 'button',
    category: 'Input',
    title: 'Basic Button Input',
    difficulty: 'beginner',
    description: 'Push button with internal pull-up resistor',
    components: [
      'Momentary push button',
      'Optional: 100nF capacitor for hardware debounce',
    ],
    code: `const int BUTTON_PIN = 4;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(BUTTON_PIN) == LOW) {
    // Button pressed
  }
}`,
    notes: 'Use internal pull-up to simplify wiring. Button connects GPIO to GND.',
  },
  {
    id: 'led',
    category: 'Output',
    title: 'LED with Current Limiting',
    difficulty: 'beginner',
    description: 'Standard LED connection with current limiting resistor',
    components: [
      'LED (any color)',
      '330Ω resistor (adjust based on LED forward voltage)',
    ],
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
    notes: 'R = (3.3V - Vf) / If. For typical red LED: (3.3 - 2.0) / 0.01 = 130Ω minimum.',
  },
  {
    id: 'i2c',
    category: 'Communication',
    title: 'I2C Bus Connection',
    difficulty: 'intermediate',
    description: 'I2C bus setup with proper pull-up resistors',
    components: [
      '2x 4.7kΩ pull-up resistors',
      'I2C device (sensor, display, etc.)',
    ],
    code: `#include <Wire.h>

void setup() {
  Wire.begin(21, 22); // SDA=21, SCL=22

  Wire.beginTransmission(0x3C);
  if (Wire.endTransmission() == 0) {
    Serial.println("Device found!");
  }
}`,
    notes: 'Pull-up value depends on bus capacitance and speed. 4.7kΩ works for most cases at 100kHz.',
  },
  {
    id: 'spi-sd',
    category: 'Communication',
    title: 'SD Card (SPI Mode)',
    difficulty: 'intermediate',
    description: 'MicroSD card module connection via SPI',
    components: [
      'MicroSD card module',
      'MicroSD card (FAT32 formatted)',
    ],
    code: `#include <SD.h>

#define SD_CS 5

void setup() {
  if (!SD.begin(SD_CS)) {
    Serial.println("SD init failed!");
    return;
  }
  Serial.println("SD initialized.");
}`,
    notes: 'Default SPI pins: MOSI=23, MISO=19, CLK=18. CS can be any GPIO.',
  },
]

const categories = ['All', ...new Set(circuits.map(c => c.category))]

const difficultyColors = {
  beginner: 'text-green-400 bg-green-400/20',
  intermediate: 'text-yellow-400 bg-yellow-400/20',
  advanced: 'text-red-400 bg-red-400/20',
}

export default function Circuits() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = activeCategory === 'All'
    ? circuits
    : circuits.filter(c => c.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Common Circuits</h1>
      <p className="text-text-secondary mb-8">
        Frequently used wiring examples and code snippets
      </p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-accent-blue text-bg-primary'
                : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Circuits list */}
      <div className="space-y-4">
        {filtered.map(circuit => (
          <div key={circuit.id} className="card">
            <div
              className="flex items-start justify-between cursor-pointer"
              onClick={() => setExpanded(expanded === circuit.id ? null : circuit.id)}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold">{circuit.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${difficultyColors[circuit.difficulty]}`}>
                    {circuit.difficulty}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">{circuit.description}</p>
              </div>
              <button className="text-text-muted hover:text-text-primary p-2">
                <svg
                  className={`w-5 h-5 transform transition-transform ${expanded === circuit.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {expanded === circuit.id && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                {/* Components */}
                <div>
                  <h4 className="text-sm font-semibold text-accent-cyan mb-2">Components</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {circuit.components.map((comp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent-blue">•</span>
                        {comp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code */}
                {circuit.code && (
                  <div>
                    <h4 className="text-sm font-semibold text-accent-cyan mb-2">Example Code</h4>
                    <pre className="bg-bg-primary p-4 rounded-lg overflow-x-auto text-sm font-mono border-l-2 border-accent-cyan">
                      <code>{circuit.code}</code>
                    </pre>
                  </div>
                )}

                {/* Notes */}
                {circuit.notes && (
                  <div className="flex items-start gap-2 text-sm bg-bg-secondary p-3 rounded-lg">
                    <span className="text-yellow-400">!</span>
                    <span className="text-text-secondary">{circuit.notes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
