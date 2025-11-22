import { Link } from 'react-router-dom'

export default function VariantCard({ variant }) {
  const {
    id,
    name,
    tagline,
    cpu,
    memory,
    wireless,
    peripherals,
    releaseYear,
  } = variant

  return (
    <Link
      to={`/pinouts/${id}`}
      className="card group block"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-accent-blue group-hover:text-accent-cyan transition-colors">
          {name}
        </h3>
        <span className="text-xs text-text-muted bg-bg-secondary px-2 py-1 rounded">
          {releaseYear}
        </span>
      </div>

      <p className="text-text-secondary text-sm mb-4">
        {tagline}
      </p>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">CPU</span>
          <span className="font-mono">
            {cpu.architecture} ({cpu.cores === 1 ? 'Single' : 'Dual'} @ {cpu.clockSpeed}MHz)
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">SRAM</span>
          <span className="font-mono">{memory.sram} KB</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">WiFi</span>
          <span className="font-mono">
            {wireless.wifi ? (wireless.wifi6 ? 'WiFi 6' : 'Yes') : 'No'}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">Bluetooth</span>
          <span className="font-mono">
            {wireless.ble ? `BLE ${wireless.ble}` : 'No'}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">GPIO</span>
          <span className="font-mono">{peripherals.gpio} pins</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">USB</span>
          <span className="font-mono">{peripherals.usb || 'No'}</span>
        </div>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
        {wireless.thread && (
          <span className="text-xs bg-accent-cyan/20 text-accent-cyan px-2 py-0.5 rounded">
            Thread
          </span>
        )}
        {wireless.wifi6 && (
          <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-0.5 rounded">
            WiFi 6
          </span>
        )}
        {peripherals.usb && peripherals.usb.includes('OTG') && (
          <span className="text-xs bg-accent-purple/20 text-accent-purple px-2 py-0.5 rounded">
            USB OTG
          </span>
        )}
        {cpu.cores === 2 && (
          <span className="text-xs bg-white/10 text-text-secondary px-2 py-0.5 rounded">
            Dual Core
          </span>
        )}
      </div>
    </Link>
  )
}
