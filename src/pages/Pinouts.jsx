import { useParams, Link } from 'react-router-dom'
import { variants, getVariant } from '../data/variants'

export default function Pinouts() {
  const { variantId } = useParams()

  // If no variant selected, show selector
  if (!variantId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Pinout Diagrams</h1>
        <p className="text-text-secondary mb-8">
          Select a variant to view its interactive pinout diagram
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map(v => (
            <Link
              key={v.id}
              to={`/pinouts/${v.id}`}
              className="card group"
            >
              <h3 className="text-lg font-semibold text-accent-blue group-hover:text-accent-cyan transition-colors">
                {v.name}
              </h3>
              <p className="text-text-muted text-sm mt-1">{v.fullName}</p>
              <p className="text-text-secondary text-sm mt-2">
                {v.peripherals.gpio} GPIO pins
              </p>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const variant = getVariant(variantId)

  if (!variant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Variant not found</h1>
        <Link to="/pinouts" className="text-accent-blue hover:underline">
          ← Back to pinouts
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/pinouts"
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          ← All variants
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">{variant.name} Pinout</h1>
      <p className="text-text-secondary mb-8">{variant.fullName}</p>

      {/* Placeholder for interactive pinout */}
      <div className="card">
        <div className="aspect-video bg-bg-secondary rounded-lg flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-30">
              <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none">
                <rect x="20" y="30" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
                {/* Top pins */}
                {[25, 35, 45, 55, 65, 75].map(x => (
                  <line key={`t${x}`} x1={x} y1="20" x2={x} y2="30" stroke="currentColor" strokeWidth="2"/>
                ))}
                {/* Bottom pins */}
                {[25, 35, 45, 55, 65, 75].map(x => (
                  <line key={`b${x}`} x1={x} y1="70" x2={x} y2="80" stroke="currentColor" strokeWidth="2"/>
                ))}
              </svg>
            </div>
            <p className="text-text-muted">
              Interactive pinout diagram coming soon
            </p>
            <p className="text-text-muted text-sm mt-2">
              {variant.peripherals.gpio} GPIO pins available
            </p>
          </div>
        </div>

        {/* Pin categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-bg-secondary p-4 rounded-lg">
            <div className="text-2xl font-bold text-accent-blue">{variant.peripherals.gpio}</div>
            <div className="text-text-muted text-sm">GPIO Pins</div>
          </div>
          <div className="bg-bg-secondary p-4 rounded-lg">
            <div className="text-2xl font-bold text-accent-cyan">{variant.peripherals.adc.channels}</div>
            <div className="text-text-muted text-sm">ADC Channels</div>
          </div>
          <div className="bg-bg-secondary p-4 rounded-lg">
            <div className="text-2xl font-bold text-accent-purple">{variant.peripherals.touch || 0}</div>
            <div className="text-text-muted text-sm">Touch Sensors</div>
          </div>
          <div className="bg-bg-secondary p-4 rounded-lg">
            <div className="text-2xl font-bold text-text-primary">{variant.peripherals.uart}</div>
            <div className="text-text-muted text-sm">UARTs</div>
          </div>
        </div>
      </div>
    </div>
  )
}
