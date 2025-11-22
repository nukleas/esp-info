import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { variants, getVariant } from '../data/variants'
import { pinoutsByVariant, defaultPinsByVariant, safeGPIOsByVariant } from '../data/pinouts'
import PinoutDiagram from '../components/PinoutDiagram'
import PinDetail from '../components/PinDetail'

export default function Pinouts() {
  const { variantId } = useParams()
  const [selectedPin, setSelectedPin] = useState(null)

  // If no variant selected, show selector
  if (!variantId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Pinout Diagrams</h1>
        <p className="text-text-secondary mb-8">
          Select a variant to view its interactive pinout diagram
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map(v => {
            const hasPinout = pinoutsByVariant[v.id]
            return (
              <Link
                key={v.id}
                to={hasPinout ? `/pinouts/${v.id}` : '#'}
                className={`card group relative overflow-hidden ${!hasPinout ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={e => !hasPinout && e.preventDefault()}
              >
                {/* Cyberpunk corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-1 h-8 bg-accent-blue/30 group-hover:bg-accent-blue/60 transition-colors" />
                  <div className="absolute top-0 right-0 w-8 h-1 bg-accent-blue/30 group-hover:bg-accent-blue/60 transition-colors" />
                </div>

                <h3 className="text-lg font-semibold text-accent-blue group-hover:text-accent-cyan transition-colors">
                  {v.name}
                </h3>
                <p className="text-text-muted text-sm mt-1">{v.fullName}</p>
                <p className="text-text-secondary text-sm mt-2">
                  {v.peripherals.gpio} GPIO pins
                </p>

                {hasPinout ? (
                  <div className="mt-3 flex items-center gap-2 text-xs text-accent-cyan">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                    Interactive diagram available
                  </div>
                ) : (
                  <div className="mt-3 text-xs text-text-muted">
                    Coming soon
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  const variant = getVariant(variantId)
  const pins = pinoutsByVariant[variantId]
  const defaults = defaultPinsByVariant[variantId]
  const safeGPIOs = safeGPIOsByVariant[variantId]

  if (!variant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Variant not found</h1>
        <Link to="/pinouts" className="text-accent-blue hover:underline">
          Back to pinouts
        </Link>
      </div>
    )
  }

  // If no pinout data yet, show placeholder
  if (!pins || pins.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/pinouts"
            className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All variants
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">{variant.name} Pinout</h1>
        <p className="text-text-secondary mb-8">{variant.fullName}</p>

        <div className="card">
          <div className="aspect-video bg-bg-secondary rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-30">
                <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <rect x="20" y="30" width="60" height="40" rx="4" strokeWidth="2"/>
                  {[25, 35, 45, 55, 65, 75].map(x => (
                    <line key={`t${x}`} x1={x} y1="20" x2={x} y2="30" strokeWidth="2"/>
                  ))}
                  {[25, 35, 45, 55, 65, 75].map(x => (
                    <line key={`b${x}`} x1={x} y1="70" x2={x} y2="80" strokeWidth="2"/>
                  ))}
                </svg>
              </div>
              <p className="text-text-muted">
                Pinout diagram for {variant.name} coming soon
              </p>
              <p className="text-text-muted text-sm mt-2">
                {variant.peripherals.gpio} GPIO pins available
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/pinouts"
          className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All variants
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-accent-blue">{variant.name} Pinout</h1>
          <p className="text-text-secondary">{variant.fullName}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-text-muted">
            <span className="text-accent-cyan font-mono">{pins.length}</span> pins documented
          </div>
          {safeGPIOs && (
            <div className="text-sm text-text-muted">
              <span className="text-green-400 font-mono">{safeGPIOs.length}</span> safe GPIOs
            </div>
          )}
        </div>
      </div>

      {/* Main content - Diagram + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diagram */}
        <div className="lg:col-span-2">
          <div className="card">
            <PinoutDiagram
              variantId={variantId}
              onPinSelect={setSelectedPin}
              selectedPin={selectedPin}
            />
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <div className="card h-[600px] overflow-hidden sticky top-20">
            <PinDetail
              pin={selectedPin}
              onClose={() => setSelectedPin(null)}
            />
          </div>
        </div>
      </div>

      {/* Quick Reference Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="card bg-bg-secondary p-4">
          <div className="text-2xl font-bold text-accent-blue font-mono">{variant.peripherals.gpio}</div>
          <div className="text-text-muted text-sm">GPIO Pins</div>
        </div>
        <div className="card bg-bg-secondary p-4">
          <div className="text-2xl font-bold text-accent-cyan font-mono">{variant.peripherals.adc.channels}</div>
          <div className="text-text-muted text-sm">ADC Channels</div>
        </div>
        <div className="card bg-bg-secondary p-4">
          <div className="text-2xl font-bold text-purple-400 font-mono">{variant.peripherals.touch || 0}</div>
          <div className="text-text-muted text-sm">Touch Sensors</div>
        </div>
        <div className="card bg-bg-secondary p-4">
          <div className="text-2xl font-bold text-text-primary font-mono">{variant.peripherals.uart}</div>
          <div className="text-text-muted text-sm">UARTs</div>
        </div>
      </div>

      {/* Default Pins Reference */}
      {defaults && (
        <div className="card mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Default Pin Assignments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* I2C */}
            {defaults.i2c && (
              <div className="bg-bg-secondary rounded-lg p-4">
                <h4 className="text-sm font-semibold text-amber-400 mb-2">I2C</h4>
                <div className="space-y-1 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-muted">SDA:</span>
                    <span className="text-text-primary">GPIO{defaults.i2c.sda}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">SCL:</span>
                    <span className="text-text-primary">GPIO{defaults.i2c.scl}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SPI */}
            {defaults.spi && (
              <div className="bg-bg-secondary rounded-lg p-4">
                <h4 className="text-sm font-semibold text-emerald-400 mb-2">SPI (VSPI)</h4>
                <div className="space-y-1 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-muted">MOSI:</span>
                    <span className="text-text-primary">GPIO{defaults.spi.mosi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">MISO:</span>
                    <span className="text-text-primary">GPIO{defaults.spi.miso}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">SCK:</span>
                    <span className="text-text-primary">GPIO{defaults.spi.sck}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">CS:</span>
                    <span className="text-text-primary">GPIO{defaults.spi.cs}</span>
                  </div>
                </div>
              </div>
            )}

            {/* UART */}
            {defaults.uart && (
              <div className="bg-bg-secondary rounded-lg p-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">UART0</h4>
                <div className="space-y-1 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-muted">TX:</span>
                    <span className="text-text-primary">GPIO{defaults.uart.tx}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">RX:</span>
                    <span className="text-text-primary">GPIO{defaults.uart.rx}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Safe GPIOs List */}
      {safeGPIOs && safeGPIOs.length > 0 && (
        <div className="card mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Safe GPIOs (No Boot Issues)
          </h3>
          <div className="flex flex-wrap gap-2">
            {safeGPIOs.map(gpio => (
              <span
                key={gpio}
                className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono border border-green-500/30 hover:bg-green-500/30 transition-colors cursor-pointer"
                onClick={() => {
                  const pin = pins.find(p => p.name === `GPIO${gpio}`)
                  if (pin) setSelectedPin(pin)
                }}
              >
                GPIO{gpio}
              </span>
            ))}
          </div>
          <p className="text-text-muted text-xs mt-3">
            These GPIOs can be used freely without affecting boot or flash operations.
          </p>
        </div>
      )}
    </div>
  )
}
