import { useState, useMemo } from 'react'
import { pinoutsByVariant, pinColors, getPinsByCategory } from '../data/pinouts'

// Pin type to color mapping
const typeColors = {
  power: { fill: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)' },
  ground: { fill: '#374151', glow: 'rgba(55, 65, 81, 0.4)' },
  gpio: { fill: '#3b82f6', glow: 'rgba(59, 130, 246, 0.6)' },
  input: { fill: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.6)' },
  reserved: { fill: '#dc2626', glow: 'rgba(220, 38, 38, 0.6)' },
}

// Category filter colors
const categoryColors = {
  all: '#00d4ff',
  power: '#ef4444',
  gpio: '#3b82f6',
  adc: '#8b5cf6',
  dac: '#ec4899',
  touch: '#14b8a6',
  i2c: '#f59e0b',
  spi: '#10b981',
  uart: '#06b6d4',
  strapping: '#f97316',
  pwm: '#a855f7',
  usb: '#00ffaa',
}

export default function PinoutDiagram({ variantId, onPinSelect, selectedPin }) {
  const [hoveredPin, setHoveredPin] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const pins = pinoutsByVariant[variantId] || []

  // Get unique categories from pins
  const categories = useMemo(() => {
    const cats = new Set(['all'])
    pins.forEach(pin => {
      pin.category?.forEach(cat => cats.add(cat))
    })
    return Array.from(cats)
  }, [pins])

  // Filter pins by category
  const filteredPins = useMemo(() => {
    if (activeCategory === 'all') return pins
    return pins.filter(pin => pin.category?.includes(activeCategory))
  }, [pins, activeCategory])

  // Highlight state
  const isPinHighlighted = (pin) => {
    if (activeCategory === 'all') return true
    return pin.category?.includes(activeCategory)
  }

  // Split pins into left and right sides
  const leftPins = pins.filter(p => p.side === 'left')
  const rightPins = pins.filter(p => p.side === 'right')

  // Diagram dimensions
  const pinSpacing = 24
  const pinWidth = 60
  const pinHeight = 18
  const chipWidth = 180
  const chipPadding = 20
  const maxPins = Math.max(leftPins.length, rightPins.length)
  const chipHeight = maxPins * pinSpacing + chipPadding * 2

  const svgWidth = chipWidth + pinWidth * 2 + 100
  const svgHeight = chipHeight + 80

  const getPinColor = (pin) => {
    if (pin.reserved) return typeColors.reserved
    if (pin.strapping) return { fill: '#f97316', glow: 'rgba(249, 115, 22, 0.6)' }
    return typeColors[pin.type] || typeColors.gpio
  }

  const renderPin = (pin, index, side) => {
    const isLeft = side === 'left'
    const x = isLeft ? 50 : svgWidth - 50 - pinWidth
    const y = 40 + index * pinSpacing
    const highlighted = isPinHighlighted(pin)
    const isHovered = hoveredPin?.pin === pin.pin
    const isSelected = selectedPin?.pin === pin.pin
    const colors = getPinColor(pin)

    const dimmed = activeCategory !== 'all' && !highlighted

    return (
      <g
        key={`${side}-${pin.pin}`}
        className={`cursor-pointer transition-all duration-200 ${dimmed ? 'opacity-30' : ''}`}
        onMouseEnter={() => setHoveredPin(pin)}
        onMouseLeave={() => setHoveredPin(null)}
        onClick={() => onPinSelect?.(pin)}
        style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
      >
        {/* Pin glow effect */}
        {(isHovered || isSelected) && (
          <rect
            x={x - 2}
            y={y - 2}
            width={pinWidth + 4}
            height={pinHeight + 4}
            rx={4}
            fill="none"
            stroke={colors.fill}
            strokeWidth={2}
            className="animate-pulse"
            style={{
              filter: `drop-shadow(0 0 8px ${colors.glow})`,
            }}
          />
        )}

        {/* Pin rectangle */}
        <rect
          x={x}
          y={y}
          width={pinWidth}
          height={pinHeight}
          rx={3}
          fill={dimmed ? '#1a2332' : colors.fill}
          className="transition-all duration-200"
          style={{
            filter: isHovered ? `drop-shadow(0 0 6px ${colors.glow})` : 'none',
          }}
        />

        {/* Pin number */}
        <text
          x={isLeft ? x + 8 : x + pinWidth - 8}
          y={y + pinHeight / 2 + 4}
          fontSize={9}
          fontFamily="JetBrains Mono, monospace"
          fill={dimmed ? '#64748b' : '#0a0e17'}
          textAnchor={isLeft ? 'start' : 'end'}
          fontWeight="bold"
        >
          {pin.pin}
        </text>

        {/* Pin name label */}
        <text
          x={isLeft ? x - 8 : x + pinWidth + 8}
          y={y + pinHeight / 2 + 4}
          fontSize={10}
          fontFamily="JetBrains Mono, monospace"
          fill={dimmed ? '#475569' : (isHovered || isSelected) ? '#00d4ff' : '#94a3b8'}
          textAnchor={isLeft ? 'end' : 'start'}
          className="transition-colors duration-200"
        >
          {pin.name}
        </text>

        {/* Strapping indicator */}
        {pin.strapping && !dimmed && (
          <circle
            cx={isLeft ? x + pinWidth - 6 : x + 6}
            cy={y + pinHeight / 2}
            r={3}
            fill="#fbbf24"
            className="animate-pulse"
          />
        )}

        {/* Reserved indicator */}
        {pin.reserved && !dimmed && (
          <text
            x={isLeft ? x + pinWidth - 6 : x + 6}
            y={y + pinHeight / 2 + 3}
            fontSize={8}
            fill="#fef2f2"
            textAnchor="middle"
          >
            !
          </text>
        )}

        {/* Connection line to chip */}
        <line
          x1={isLeft ? x + pinWidth : x}
          y1={y + pinHeight / 2}
          x2={isLeft ? 50 + pinWidth + 10 : svgWidth - 50 - pinWidth - 10}
          y2={y + pinHeight / 2}
          stroke={dimmed ? '#1e293b' : (isHovered || isSelected) ? colors.fill : '#334155'}
          strokeWidth={1}
          strokeDasharray={isHovered ? 'none' : '2,2'}
          className="transition-all duration-200"
        />
      </g>
    )
  }

  return (
    <div className="w-full">
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'text-bg-primary'
                : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
            }`}
            style={{
              backgroundColor: activeCategory === cat ? categoryColors[cat] : undefined,
              boxShadow: activeCategory === cat ? `0 0 12px ${categoryColors[cat]}40` : undefined,
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* SVG Diagram */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-3xl mx-auto"
          style={{ minWidth: '600px' }}
        >
          {/* Definitions for effects */}
          <defs>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Scan line pattern */}
            <pattern id="scanlines" patternUnits="userSpaceOnUse" width="100%" height="4">
              <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(0, 212, 255, 0.03)" strokeWidth="1" />
            </pattern>

            {/* Circuit pattern */}
            <pattern id="circuit" patternUnits="userSpaceOnUse" width="20" height="20">
              <circle cx="10" cy="10" r="1" fill="rgba(0, 212, 255, 0.1)" />
            </pattern>

            {/* Gradient for chip */}
            <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a2332" />
              <stop offset="50%" stopColor="#121825" />
              <stop offset="100%" stopColor="#0a0e17" />
            </linearGradient>
          </defs>

          {/* Background pattern */}
          <rect width="100%" height="100%" fill="url(#circuit)" opacity="0.5" />

          {/* Chip body */}
          <g>
            {/* Chip shadow */}
            <rect
              x={60 + pinWidth + 5}
              y={35}
              width={chipWidth}
              height={chipHeight}
              rx={8}
              fill="rgba(0, 0, 0, 0.5)"
            />

            {/* Main chip rectangle */}
            <rect
              x={60 + pinWidth}
              y={30}
              width={chipWidth}
              height={chipHeight}
              rx={8}
              fill="url(#chipGradient)"
              stroke="#00d4ff"
              strokeWidth={2}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))',
              }}
            />

            {/* Scan lines overlay */}
            <rect
              x={60 + pinWidth}
              y={30}
              width={chipWidth}
              height={chipHeight}
              rx={8}
              fill="url(#scanlines)"
            />

            {/* Chip notch (orientation mark) */}
            <circle
              cx={60 + pinWidth + 20}
              cy={45}
              r={6}
              fill="none"
              stroke="#00d4ff"
              strokeWidth={1.5}
              opacity={0.6}
            />

            {/* Chip label */}
            <text
              x={60 + pinWidth + chipWidth / 2}
              y={30 + chipHeight / 2 - 10}
              fontSize={16}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fill="#00d4ff"
              textAnchor="middle"
              style={{ filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.5))' }}
            >
              {variantId?.toUpperCase().replace('-', ' ')}
            </text>

            <text
              x={60 + pinWidth + chipWidth / 2}
              y={30 + chipHeight / 2 + 10}
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              fill="#64748b"
              textAnchor="middle"
            >
              {pins.length} PINS
            </text>

            {/* Animated corner accents */}
            <polyline
              points={`${60 + pinWidth + 8},${50} ${60 + pinWidth + 8},${38} ${60 + pinWidth + 20},${38}`}
              fill="none"
              stroke="#00ffaa"
              strokeWidth={2}
              opacity={0.7}
            />
            <polyline
              points={`${60 + pinWidth + chipWidth - 8},${50} ${60 + pinWidth + chipWidth - 8},${38} ${60 + pinWidth + chipWidth - 20},${38}`}
              fill="none"
              stroke="#00ffaa"
              strokeWidth={2}
              opacity={0.7}
            />
            <polyline
              points={`${60 + pinWidth + 8},${30 + chipHeight - 20} ${60 + pinWidth + 8},${30 + chipHeight - 8} ${60 + pinWidth + 20},${30 + chipHeight - 8}`}
              fill="none"
              stroke="#00ffaa"
              strokeWidth={2}
              opacity={0.7}
            />
            <polyline
              points={`${60 + pinWidth + chipWidth - 8},${30 + chipHeight - 20} ${60 + pinWidth + chipWidth - 8},${30 + chipHeight - 8} ${60 + pinWidth + chipWidth - 20},${30 + chipHeight - 8}`}
              fill="none"
              stroke="#00ffaa"
              strokeWidth={2}
              opacity={0.7}
            />
          </g>

          {/* Render pins */}
          {leftPins.map((pin, i) => renderPin(pin, i, 'left'))}
          {rightPins.map((pin, i) => renderPin(pin, i, 'right'))}
        </svg>
      </div>

      {/* Hover tooltip */}
      {hoveredPin && (
        <div
          className="fixed z-50 bg-bg-secondary border border-accent-blue/30 rounded-lg p-3 shadow-xl pointer-events-none"
          style={{
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getPinColor(hoveredPin).fill }}
            />
            <span className="font-mono font-bold text-accent-blue">
              {hoveredPin.name}
            </span>
            <span className="text-text-muted text-sm">
              Pin {hoveredPin.pin}
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            {hoveredPin.description}
          </p>
          {hoveredPin.strapping && (
            <p className="text-xs text-orange-400 mt-1">
              Strapping Pin - {hoveredPin.strappingValue}
            </p>
          )}
          {hoveredPin.reserved && (
            <p className="text-xs text-red-400 mt-1">
              Reserved - DO NOT USE
            </p>
          )}
          <p className="text-xs text-text-muted mt-1">
            Click for details
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: typeColors.power.fill }} />
          <span className="text-text-muted">Power</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: typeColors.ground.fill }} />
          <span className="text-text-muted">Ground</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: typeColors.gpio.fill }} />
          <span className="text-text-muted">GPIO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-text-muted">Strapping</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: typeColors.reserved.fill }} />
          <span className="text-text-muted">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: typeColors.input.fill }} />
          <span className="text-text-muted">Input Only</span>
        </div>
      </div>
    </div>
  )
}
