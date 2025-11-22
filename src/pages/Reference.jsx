import { useState } from 'react'
import { bootModes, electricalSpecs, formulas, commonParts, wifiReference, memoryReference, programmingReference } from '../data/reference'

const tabs = [
  { id: 'boot', label: 'Boot Modes', icon: '⚡' },
  { id: 'electrical', label: 'Electrical', icon: '🔌' },
  { id: 'formulas', label: 'Formulas', icon: '📐' },
  { id: 'memory', label: 'Memory', icon: '💾' },
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'commands', label: 'Commands', icon: '⌨️' },
]

export default function Reference() {
  const [activeTab, setActiveTab] = useState('boot')
  const [selectedVariant, setSelectedVariant] = useState('esp32')

  const renderBootModes = () => {
    const variants = Object.keys(bootModes)
    const currentBoot = bootModes[selectedVariant]

    return (
      <div className="space-y-6">
        {/* Variant selector */}
        <div className="flex flex-wrap gap-2">
          {variants.map(v => (
            <button
              key={v}
              onClick={() => setSelectedVariant(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedVariant === v
                  ? 'bg-accent-blue text-bg-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
            >
              {v.toUpperCase().replace('-', ' ')}
            </button>
          ))}
        </div>

        {currentBoot && (
          <>
            {/* Strapping Pins */}
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">
                Strapping Pins for {currentBoot.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentBoot.strappingPins.map(pin => (
                  <span
                    key={pin}
                    className="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg font-mono text-sm border border-orange-500/30"
                  >
                    {pin}
                  </span>
                ))}
              </div>
              <p className="text-text-muted text-sm">
                These pins determine boot behavior and must be in specific states during power-on/reset.
              </p>
            </div>

            {/* Boot Modes Table */}
            <div className="card overflow-x-auto">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">Boot Modes</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-2 text-text-muted font-medium">Mode</th>
                    {currentBoot.strappingPins.map(pin => (
                      <th key={pin} className="text-center py-3 px-2 text-text-muted font-medium font-mono">
                        {pin}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentBoot.modes.map((mode, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-2">
                        <div className="font-medium text-text-primary">{mode.name}</div>
                        {mode.description && (
                          <div className="text-text-muted text-xs mt-1">{mode.description}</div>
                        )}
                        {mode.default && (
                          <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded mt-1 inline-block">
                            Default
                          </span>
                        )}
                      </td>
                      {currentBoot.strappingPins.map(pin => (
                        <td key={pin} className="text-center py-3 px-2">
                          <span className={`font-mono ${
                            mode.pins[pin] === 'HIGH' ? 'text-green-400' :
                            mode.pins[pin] === 'LOW' ? 'text-red-400' :
                            'text-text-muted'
                          }`}>
                            {mode.pins[pin] || '-'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pin Details */}
            {currentBoot.pinDetails && (
              <div className="card">
                <h3 className="text-lg font-semibold text-accent-cyan mb-4">Strapping Pin Details</h3>
                <div className="space-y-4">
                  {Object.entries(currentBoot.pinDetails).map(([pin, details]) => (
                    <div key={pin} className="bg-bg-secondary rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-accent-blue font-bold">{pin}</span>
                        <span className="text-text-secondary">{details.description}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-text-muted">Boot Value:</span>
                          <span className="ml-2 text-text-primary">{details.bootValue}</span>
                        </div>
                        <div>
                          <span className="text-text-muted">Safe to Use:</span>
                          <span className={`ml-2 ${
                            details.safeToUse?.startsWith('Yes') ? 'text-green-400' :
                            details.safeToUse?.startsWith('Caution') ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {details.safeToUse}
                          </span>
                        </div>
                      </div>
                      {details.note && (
                        <p className="text-text-muted text-xs mt-2 italic">{details.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  const renderElectrical = () => (
    <div className="space-y-6">
      {electricalSpecs && (
        <>
          {/* GPIO Specs */}
          {electricalSpecs.gpio && (
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">GPIO Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(electricalSpecs.gpio).map(([key, value]) => (
                  <div key={key} className="bg-bg-secondary rounded-lg p-3">
                    <div className="text-text-muted text-xs uppercase tracking-wide mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-text-primary font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADC Specs */}
          {electricalSpecs.adc && (
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">ADC Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(electricalSpecs.adc).map(([key, value]) => (
                  <div key={key} className="bg-bg-secondary rounded-lg p-3">
                    <div className="text-text-muted text-xs uppercase tracking-wide mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-text-primary font-mono">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Power Specs */}
          {electricalSpecs.power && (
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">Power Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(electricalSpecs.power).map(([key, value]) => (
                  <div key={key} className="bg-bg-secondary rounded-lg p-3">
                    <div className="text-text-muted text-xs uppercase tracking-wide mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-text-primary font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )

  const renderFormulas = () => (
    <div className="space-y-6">
      {formulas && formulas.map((formula, i) => (
        <div key={i} className="card">
          <h3 className="text-lg font-semibold text-accent-cyan mb-2">{formula.name}</h3>
          <p className="text-text-secondary text-sm mb-4">{formula.description}</p>

          {/* Formula display */}
          <div className="bg-bg-primary rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-accent-blue font-mono text-lg">{formula.formula}</code>
          </div>

          {/* Variables */}
          {formula.variables && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-text-muted mb-2">Variables</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(formula.variables).map(([key, desc]) => (
                  <div key={key} className="flex items-start gap-2 text-sm">
                    <span className="font-mono text-accent-cyan">{key}</span>
                    <span className="text-text-muted">= {desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example */}
          {formula.example && (
            <div className="bg-bg-secondary rounded-lg p-4">
              <h4 className="text-sm font-semibold text-text-muted mb-2">Example</h4>
              <p className="text-text-secondary text-sm">{formula.example}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderMemory = () => (
    <div className="space-y-6">
      {memoryReference && (
        <>
          {/* Flash Sizes */}
          {memoryReference.flashSizes && (
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">Common Flash Sizes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {memoryReference.flashSizes.map((size, i) => (
                  <div key={i} className="bg-bg-secondary rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-accent-blue font-mono">{size.size}</div>
                    <div className="text-text-muted text-sm">{size.bytes}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PSRAM Options */}
          {memoryReference.psramOptions && (
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">PSRAM Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {memoryReference.psramOptions.map((opt, i) => (
                  <div key={i} className="bg-bg-secondary rounded-lg p-4">
                    <div className="font-bold text-purple-400">{opt.size}</div>
                    <div className="text-text-muted text-sm">{opt.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Partition Schemes */}
          {memoryReference.partitionSchemes && (
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">Common Partition Schemes</h3>
              <div className="space-y-3">
                {memoryReference.partitionSchemes.map((scheme, i) => (
                  <div key={i} className="bg-bg-secondary rounded-lg p-4">
                    <div className="font-semibold text-text-primary">{scheme.name}</div>
                    <div className="text-text-muted text-sm mt-1">{scheme.description}</div>
                    {scheme.sizes && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(scheme.sizes).map(([key, value]) => (
                          <span key={key} className="text-xs px-2 py-1 bg-bg-tertiary rounded font-mono">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )

  const renderWifi = () => (
    <div className="space-y-6">
      {wifiReference && (
        <>
          {/* Modes */}
          {wifiReference.modes && (
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">WiFi Modes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {wifiReference.modes.map((mode, i) => (
                  <div key={i} className="bg-bg-secondary rounded-lg p-4">
                    <div className="font-semibold text-accent-blue">{mode.name}</div>
                    <div className="text-text-secondary text-sm mt-1">{mode.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Channels */}
          {wifiReference.channels && (
            <div className="card">
              <h3 className="text-lg font-semibold text-accent-cyan mb-4">2.4 GHz WiFi Channels</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-text-muted">Channel</th>
                      <th className="text-left py-2 px-3 text-text-muted">Frequency</th>
                      <th className="text-left py-2 px-3 text-text-muted">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wifiReference.channels.map((ch, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-2 px-3 font-mono text-accent-blue">{ch.channel}</td>
                        <td className="py-2 px-3 text-text-primary">{ch.frequency}</td>
                        <td className="py-2 px-3 text-text-muted">{ch.note || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )

  const renderCommands = () => (
    <div className="space-y-6">
      {/* Esptool Commands */}
      <div className="card">
        <h3 className="text-lg font-semibold text-accent-cyan mb-4">Esptool Commands</h3>
        <div className="space-y-3">
          {Object.entries(programmingReference.esptool).map(([name, command]) => (
            <div key={name} className="bg-bg-secondary rounded-lg p-4">
              <div className="font-semibold text-text-primary capitalize">{name.replace(/([A-Z])/g, ' $1').trim()}</div>
              <pre className="mt-2 bg-bg-primary p-3 rounded-lg overflow-x-auto text-sm font-mono text-accent-cyan">
                {command}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Baud Rates */}
      <div className="card">
        <h3 className="text-lg font-semibold text-accent-cyan mb-4">Baud Rates</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {programmingReference.baudRates.programming.map((rate) => (
            <div
              key={rate}
              className={`bg-bg-secondary rounded-lg p-3 text-center font-mono ${
                rate === programmingReference.baudRates.recommended
                  ? 'border border-accent-cyan text-accent-cyan'
                  : rate === programmingReference.baudRates.safe
                  ? 'border border-green-400/50 text-green-400'
                  : 'text-text-secondary'
              }`}
            >
              {rate.toLocaleString()}
              {rate === programmingReference.baudRates.recommended && (
                <span className="block text-xs mt-1">Recommended</span>
              )}
              {rate === programmingReference.baudRates.safe && (
                <span className="block text-xs mt-1">Safe</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Partition Tool */}
      <div className="card">
        <h3 className="text-lg font-semibold text-accent-cyan mb-4">Partition Table Commands</h3>
        <div className="space-y-3">
          {Object.entries(programmingReference.partitionTool).map(([name, command]) => (
            <div key={name} className="bg-bg-secondary rounded-lg p-4">
              <div className="font-semibold text-text-primary capitalize">{name} Partition</div>
              <pre className="mt-2 bg-bg-primary p-3 rounded-lg overflow-x-auto text-sm font-mono text-accent-cyan">
                {command}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'boot': return renderBootModes()
      case 'electrical': return renderElectrical()
      case 'formulas': return renderFormulas()
      case 'memory': return renderMemory()
      case 'wifi': return renderWifi()
      case 'commands': return renderCommands()
      default: return renderBootModes()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Quick Reference</h1>
      <p className="text-text-secondary mb-8">
        Essential ESP32 specifications, formulas, and quick lookup tables
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-accent-blue text-bg-primary'
                : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  )
}
