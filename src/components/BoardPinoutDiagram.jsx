import { useState, useMemo } from 'react'
import { getBoardPinout } from '../data/boardPinouts'

// Pin type to color mapping
const typeColors = {
  power: { fill: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)' },
  ground: { fill: '#374151', glow: 'rgba(55, 65, 81, 0.4)' },
  gpio: { fill: '#3b82f6', glow: 'rgba(59, 130, 246, 0.6)' },
  input: { fill: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.6)' },
  reserved: { fill: '#dc2626', glow: 'rgba(220, 38, 38, 0.6)' },
  nc: { fill: '#1e293b', glow: 'rgba(30, 41, 59, 0.4)' },
  usb: { fill: '#00ffaa', glow: 'rgba(0, 255, 170, 0.6)' },
}

// Category filter colors
const categoryColors = {
  all: '#00d4ff',
  power: '#ef4444',
  ground: '#374151',
  gpio: '#3b82f6',
  strapping: '#f97316',
  input: '#8b5cf6',
  usb: '#00ffaa',
}

export default function BoardPinoutDiagram({ boardId, onPinSelect, selectedPin }) {
  const [hoveredPin, setHoveredPin] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const boardPinout = getBoardPinout(boardId)

  if (!boardPinout) {
    return (
      <div className="text-center py-8">
        <p className="text-text-muted">No pinout diagram available for this board</p>
      </div>
    )
  }

  const { pins, layout, notes } = boardPinout

  // Get available filters from pins
  const filters = useMemo(() => {
    const filterSet = new Set(['all'])
    pins.forEach(pin => {
      if (pin.type) filterSet.add(pin.type)
      if (pin.strapping) filterSet.add('strapping')
    })
    return Array.from(filterSet)
  }, [pins])

  // Split pins by side
  const leftPins = pins.filter(p => p.side === 'left')
  const rightPins = pins.filter(p => p.side === 'right')

  // Diagram dimensions
  const pinSpacing = 28
  const pinWidth = 70
  const pinHeight = 22
  const chipWidth = 160
  const chipPadding = 20
  const maxPins = Math.max(leftPins.length, rightPins.length)
  const chipHeight = maxPins * pinSpacing + chipPadding * 2

  const svgWidth = chipWidth + pinWidth * 2 + 140
  const svgHeight = chipHeight + 100

  const getPinColor = (pin) => {
    if (pin.reserved) return typeColors.reserved
    if (pin.strapping) return { fill: '#f97316', glow: 'rgba(249, 115, 22, 0.6)' }
    return typeColors[pin.type] || typeColors.gpio
  }

  const isPinHighlighted = (pin) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'strapping') return pin.strapping
    return pin.type === activeFilter
  }

  const renderPin = (pin, index, side) => {
    const isLeft = side === 'left'
    const x = isLeft ? 50 : svgWidth - 50 - pinWidth
    const y = 50 + index * pinSpacing
    const highlighted = isPinHighlighted(pin)
    const isHovered = hoveredPin?.position === pin.position && hoveredPin?.side === pin.side
    const isSelected = selectedPin?.position === pin.position && selectedPin?.side === pin.side
    const colors = getPinColor(pin)

    const dimmed = activeFilter !== 'all' && !highlighted

    return (
      <g
        key={`${side}-${pin.position}`}
        className={`cursor-pointer transition-all duration-200 ${dimmed ? 'opacity-30' : ''}`}
        onMouseEnter={() => setHoveredPin(pin)}
        onMouseLeave={() => setHoveredPin(null)}
        onClick={() => onPinSelect?.(pin)}
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

        {/* Silk screen label (what's printed on the board) */}
        <text
          x={isLeft ? x + pinWidth / 2 : x + pinWidth / 2}
          y={y + pinHeight / 2 + 4}
          fontSize={10}
          fontFamily="JetBrains Mono, monospace"
          fill={dimmed ? '#64748b' : '#0a0e17'}
          textAnchor="middle"
          fontWeight="bold"
        >
          {pin.silk}
        </text>

        {/* Pin number */}
        <text
          x={isLeft ? x - 8 : x + pinWidth + 8}
          y={y + pinHeight / 2 + 4}
          fontSize={9}
          fontFamily="JetBrains Mono, monospace"
          fill={dimmed ? '#475569' : '#64748b'}
          textAnchor={isLeft ? 'end' : 'start'}
        >
          {pin.position}
        </text>

        {/* GPIO name label (external) */}
        {pin.gpio !== null && (
          <text
            x={isLeft ? x + pinWidth + 8 : x - 8}
            y={y + pinHeight / 2 + 4}
            fontSize={9}
            fontFamily="JetBrains Mono, monospace"
            fill={dimmed ? '#475569' : (isHovered || isSelected) ? '#00d4ff' : '#94a3b8'}
            textAnchor={isLeft ? 'start' : 'end'}
            className="transition-colors duration-200"
          >
            GPIO{pin.gpio}
          </text>
        )}

        {/* Strapping indicator */}
        {pin.strapping && !dimmed && (
          <circle
            cx={isLeft ? x + pinWidth - 8 : x + 8}
            cy={y + pinHeight / 2}
            r={3}
            fill="#fbbf24"
            className="animate-pulse"
          />
        )}

        {/* Warning indicator */}
        {pin.warning && !dimmed && (
          <text
            x={isLeft ? x + 8 : x + pinWidth - 8}
            y={y + pinHeight / 2 + 3}
            fontSize={10}
            fill="#fef2f2"
            textAnchor="middle"
            fontWeight="bold"
          >
            !
          </text>
        )}

        {/* Connection line to board body */}
        <line
          x1={isLeft ? x + pinWidth : x}
          y1={y + pinHeight / 2}
          x2={isLeft ? 50 + pinWidth + 15 : svgWidth - 50 - pinWidth - 15}
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
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'text-bg-primary'
                : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
            }`}
            style={{
              backgroundColor: activeFilter === filter ? categoryColors[filter] || '#00d4ff' : undefined,
              boxShadow: activeFilter === filter ? `0 0 12px ${categoryColors[filter] || '#00d4ff'}40` : undefined,
            }}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* SVG Diagram */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-3xl mx-auto"
          style={{ minWidth: '550px' }}
        >
          {/* Definitions */}
          <defs>
            <filter id="boardGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern id="boardPattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <circle cx="10" cy="10" r="1" fill="rgba(0, 212, 255, 0.08)" />
            </pattern>

            <linearGradient id="boardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a2332" />
              <stop offset="50%" stopColor="#121825" />
              <stop offset="100%" stopColor="#0a0e17" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect width="100%" height="100%" fill="url(#boardPattern)" opacity="0.5" />

          {/* Board body */}
          <g>
            {/* Shadow */}
            <rect
              x={65 + pinWidth + 5}
              y={45}
              width={chipWidth}
              height={chipHeight}
              rx={8}
              fill="rgba(0, 0, 0, 0.5)"
            />

            {/* Main board rectangle */}
            <rect
              x={65 + pinWidth}
              y={40}
              width={chipWidth}
              height={chipHeight}
              rx={8}
              fill="url(#boardGradient)"
              stroke="#00d4ff"
              strokeWidth={2}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))',
              }}
            />

            {/* USB connector indicator */}
            {layout.orientation === 'usb-bottom' && (
              <g>
                <rect
                  x={65 + pinWidth + chipWidth / 2 - 20}
                  y={40 + chipHeight - 8}
                  width={40}
                  height={16}
                  rx={3}
                  fill="#374151"
                  stroke="#64748b"
                  strokeWidth={1}
                />
                <text
                  x={65 + pinWidth + chipWidth / 2}
                  y={40 + chipHeight + 4}
                  fontSize={7}
                  fontFamily="JetBrains Mono, monospace"
                  fill="#94a3b8"
                  textAnchor="middle"
                >
                  USB
                </text>
              </g>
            )}

            {/* Chip label */}
            <text
              x={65 + pinWidth + chipWidth / 2}
              y={40 + chipHeight / 2 - 15}
              fontSize={12}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fill="#00d4ff"
              textAnchor="middle"
              style={{ filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.5))' }}
            >
              {layout.chipLabel}
            </text>

            {/* Board ID */}
            <text
              x={65 + pinWidth + chipWidth / 2}
              y={40 + chipHeight / 2 + 5}
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              fill="#64748b"
              textAnchor="middle"
            >
              {pins.length} PINS
            </text>

            {/* Corner accents */}
            <polyline
              points={`${65 + pinWidth + 8},${60} ${65 + pinWidth + 8},${48} ${65 + pinWidth + 20},${48}`}
              fill="none"
              stroke="#00ffaa"
              strokeWidth={2}
              opacity={0.7}
            />
            <polyline
              points={`${65 + pinWidth + chipWidth - 8},${60} ${65 + pinWidth + chipWidth - 8},${48} ${65 + pinWidth + chipWidth - 20},${48}`}
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
          className="fixed z-50 bg-bg-secondary border border-accent-blue/30 rounded-lg p-3 shadow-xl pointer-events-none max-w-sm"
          style={{
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: getPinColor(hoveredPin).fill }}
            />
            <span className="font-mono font-bold text-accent-blue">
              {hoveredPin.silk}
            </span>
            {hoveredPin.gpio !== null && (
              <span className="text-text-muted text-sm font-mono">
                GPIO{hoveredPin.gpio}
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary mt-1">
            {hoveredPin.description}
          </p>
          {hoveredPin.strapping && (
            <p className="text-xs text-orange-400 mt-1">
              Strapping Pin - affects boot behavior
            </p>
          )}
          {hoveredPin.warning && (
            <p className="text-xs text-red-400 mt-1">
              {hoveredPin.warning}
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
          <span className="w-3 h-3 rounded" style={{ backgroundColor: typeColors.input.fill }} />
          <span className="text-text-muted">Input Only</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: typeColors.usb.fill }} />
          <span className="text-text-muted">USB</span>
        </div>
      </div>

      {/* Notes */}
      {notes && notes.length > 0 && (
        <div className="mt-6 p-4 bg-bg-tertiary rounded-lg">
          <h4 className="text-sm font-semibold text-accent-cyan mb-2">Board Notes</h4>
          <ul className="space-y-1">
            {notes.map((note, i) => (
              <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-accent-blue">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
