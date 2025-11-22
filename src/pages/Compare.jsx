import { useState } from 'react'
import { variants } from '../data/variants'

const specCategories = [
  {
    name: 'CPU',
    specs: [
      { key: 'cpu.architecture', label: 'Architecture' },
      { key: 'cpu.cores', label: 'Cores' },
      { key: 'cpu.clockSpeed', label: 'Clock (MHz)' },
    ],
  },
  {
    name: 'Memory',
    specs: [
      { key: 'memory.sram', label: 'SRAM (KB)' },
      { key: 'memory.flash', label: 'Flash' },
      { key: 'memory.psram', label: 'PSRAM' },
    ],
  },
  {
    name: 'Wireless',
    specs: [
      { key: 'wireless.wifi', label: 'WiFi' },
      { key: 'wireless.ble', label: 'BLE Version' },
      { key: 'wireless.thread', label: 'Thread/Zigbee' },
    ],
  },
  {
    name: 'Peripherals',
    specs: [
      { key: 'peripherals.gpio', label: 'GPIO' },
      { key: 'peripherals.adc.channels', label: 'ADC Channels' },
      { key: 'peripherals.dac', label: 'DAC' },
      { key: 'peripherals.touch', label: 'Touch' },
      { key: 'peripherals.spi', label: 'SPI' },
      { key: 'peripherals.i2c', label: 'I2C' },
      { key: 'peripherals.uart', label: 'UART' },
      { key: 'peripherals.usb', label: 'USB' },
    ],
  },
  {
    name: 'Power',
    specs: [
      { key: 'power.voltage', label: 'Voltage' },
      { key: 'power.deepSleep', label: 'Deep Sleep' },
    ],
  },
]

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

function formatValue(value) {
  if (value === null || value === undefined) return '—'
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return String(value)
}

export default function Compare() {
  const [selected, setSelected] = useState(variants.map(v => v.id))

  const toggleVariant = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(v => v !== id)
        : [...prev, id]
    )
  }

  const selectedVariants = variants.filter(v => selected.includes(v.id))

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Compare ESP32 Variants</h1>
      <p className="text-text-secondary mb-8">
        Side-by-side specification comparison
      </p>

      {/* Variant toggles */}
      <div className="flex flex-wrap gap-2 mb-8">
        {variants.map(v => (
          <button
            key={v.id}
            onClick={() => toggleVariant(v.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              selected.includes(v.id)
                ? 'bg-accent-blue text-bg-primary'
                : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 bg-bg-secondary sticky left-0 min-w-[140px]">
                Specification
              </th>
              {selectedVariants.map(v => (
                <th
                  key={v.id}
                  className="text-center p-3 bg-bg-secondary min-w-[120px] font-semibold text-accent-blue"
                >
                  {v.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specCategories.map((category, catIdx) => (
              <>
                <tr key={`cat-${catIdx}`}>
                  <td
                    colSpan={selectedVariants.length + 1}
                    className="p-3 bg-bg-tertiary text-accent-cyan font-semibold text-sm border-t border-white/10"
                  >
                    {category.name}
                  </td>
                </tr>
                {category.specs.map((spec, specIdx) => (
                  <tr
                    key={`${catIdx}-${specIdx}`}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-3 text-text-secondary text-sm sticky left-0 bg-bg-primary">
                      {spec.label}
                    </td>
                    {selectedVariants.map(v => {
                      const value = getNestedValue(v, spec.key)
                      return (
                        <td
                          key={v.id}
                          className="p-3 text-center font-mono text-sm"
                        >
                          {formatValue(value)}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
