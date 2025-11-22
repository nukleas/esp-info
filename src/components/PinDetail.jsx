/**
 * PinDetail Component
 *
 * Shows detailed information about a selected pin in a side panel.
 * Includes alternate functions, notes, warnings, and code examples.
 */

// Category badge colors
const categoryBadgeColors = {
  power: 'bg-red-500/20 text-red-400 border-red-500/30',
  gpio: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  adc: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  dac: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  touch: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  i2c: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  spi: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  uart: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  strapping: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  pwm: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  usb: 'bg-green-500/20 text-green-400 border-green-500/30',
  special: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  reserved: 'bg-red-600/20 text-red-500 border-red-600/30',
  jtag: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  sdio: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
}

export default function PinDetail({ pin, onClose }) {
  if (!pin) {
    return (
      <div className="h-full flex items-center justify-center text-center p-6">
        <div>
          <div className="text-4xl mb-4 opacity-30">
            <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <p className="text-text-muted font-mono text-sm">
            SELECT A PIN
          </p>
          <p className="text-text-muted text-xs mt-2">
            Click on any pin in the diagram to view details
          </p>
        </div>
      </div>
    )
  }

  const getStatusColor = () => {
    if (pin.reserved) return 'border-red-500 bg-red-500/10'
    if (pin.strapping) return 'border-orange-500 bg-orange-500/10'
    if (pin.inputOnly) return 'border-purple-500 bg-purple-500/10'
    if (pin.type === 'power') return 'border-red-400 bg-red-400/10'
    if (pin.type === 'ground') return 'border-gray-500 bg-gray-500/10'
    return 'border-accent-blue bg-accent-blue/10'
  }

  const getStatusLabel = () => {
    if (pin.reserved) return { text: 'RESERVED', color: 'text-red-400' }
    if (pin.strapping) return { text: 'STRAPPING', color: 'text-orange-400' }
    if (pin.inputOnly) return { text: 'INPUT ONLY', color: 'text-purple-400' }
    if (pin.type === 'power') return { text: 'POWER', color: 'text-red-400' }
    if (pin.type === 'ground') return { text: 'GROUND', color: 'text-gray-400' }
    return { text: 'SAFE TO USE', color: 'text-green-400' }
  }

  const status = getStatusLabel()

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`p-4 border-b-2 ${getStatusColor()}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-bold text-accent-blue">
                {pin.name}
              </span>
              <span className="text-text-muted text-sm font-mono">
                Pin {pin.pin}
              </span>
            </div>
            <p className="text-text-secondary text-sm mt-1">
              {pin.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary p-1 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status badge */}
        <div className="mt-3">
          <span className={`text-xs font-mono font-bold ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Categories */}
        {pin.category && pin.category.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Categories
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {pin.category.map(cat => (
                <span
                  key={cat}
                  className={`px-2 py-0.5 text-xs font-mono rounded border ${categoryBadgeColors[cat] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}
                >
                  {cat.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Voltage */}
        {pin.voltage && (
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Voltage
            </h4>
            <div className="font-mono text-accent-cyan">
              {pin.voltage}
            </div>
          </div>
        )}

        {/* Default Function */}
        {pin.defaultFunction && (
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Default Function
            </h4>
            <div className="font-mono text-accent-blue bg-accent-blue/10 px-2 py-1 rounded inline-block">
              {pin.defaultFunction}
            </div>
          </div>
        )}

        {/* Alternate Functions */}
        {pin.alternateFunctions && pin.alternateFunctions.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Alternate Functions
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {pin.alternateFunctions.map((func, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-xs font-mono bg-bg-secondary rounded text-text-secondary"
                >
                  {func}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Strapping Info */}
        {pin.strapping && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Strapping Pin
            </h4>
            <p className="text-sm text-orange-300">
              Required boot state: <span className="font-mono font-bold">{pin.strappingValue}</span>
            </p>
            <p className="text-xs text-orange-200/70 mt-1">
              This pin's state at boot affects chip behavior. Be careful when connecting peripherals.
            </p>
          </div>
        )}

        {/* Reserved Warning */}
        {pin.reserved && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Do Not Use
            </h4>
            <p className="text-sm text-red-300">
              This pin is connected to internal flash memory.
            </p>
            <p className="text-xs text-red-200/70 mt-1">
              Using this pin will crash the chip or cause unpredictable behavior.
            </p>
          </div>
        )}

        {/* Input Only Info */}
        {pin.inputOnly && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              Input Only
            </h4>
            <p className="text-sm text-purple-300">
              This pin can only be used as an input.
            </p>
            <p className="text-xs text-purple-200/70 mt-1">
              No internal pull-up/pull-down resistors available. Use external resistors if needed.
            </p>
          </div>
        )}

        {/* Notes */}
        {pin.notes && (
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Notes
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {pin.notes}
            </p>
          </div>
        )}

        {/* Quick Reference */}
        <div className="border-t border-white/10 pt-4">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Quick Reference
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-bg-secondary p-2 rounded">
              <span className="text-text-muted">Type:</span>
              <span className="text-text-primary ml-2 font-mono">{pin.type}</span>
            </div>
            <div className="bg-bg-secondary p-2 rounded">
              <span className="text-text-muted">Pin #:</span>
              <span className="text-text-primary ml-2 font-mono">{pin.pin}</span>
            </div>
            <div className="bg-bg-secondary p-2 rounded">
              <span className="text-text-muted">Side:</span>
              <span className="text-text-primary ml-2 font-mono">{pin.side?.toUpperCase()}</span>
            </div>
            <div className="bg-bg-secondary p-2 rounded">
              <span className="text-text-muted">PWM:</span>
              <span className="text-text-primary ml-2 font-mono">
                {pin.category?.includes('pwm') ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Code Example */}
        {!pin.reserved && pin.type === 'gpio' && (
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Example Code
            </h4>
            <pre className="bg-bg-primary p-3 rounded-lg overflow-x-auto text-xs font-mono border-l-2 border-accent-cyan">
              <code className="text-text-secondary">
{`// ${pin.name} as digital output
const int PIN = ${pin.name.replace('GPIO', '')};

void setup() {
  pinMode(PIN, OUTPUT);
}

void loop() {
  digitalWrite(PIN, HIGH);
  delay(500);
  digitalWrite(PIN, LOW);
  delay(500);
}`}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 bg-bg-secondary">
        <p className="text-xs text-text-muted text-center font-mono">
          {pin.name} | {pin.voltage || '3.3V'} | {pin.category?.length || 0} functions
        </p>
      </div>
    </div>
  )
}
