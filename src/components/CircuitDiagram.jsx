import { useState, useEffect, useId, useRef } from 'react'

/**
 * CircuitDiagram - Interactive SVG circuit schematic with cyberpunk styling
 *
 * Features:
 * - Animated current flow on wires
 * - Glowing components with hover effects
 * - Interactive tooltips
 * - Cyberpunk neon aesthetic
 */

// Color scheme matching the cyberpunk theme
const colors = {
  wire: '#00d4ff',
  wireGlow: 'rgba(0, 212, 255, 0.6)',
  power: '#ef4444',
  powerGlow: 'rgba(239, 68, 68, 0.6)',
  ground: '#64748b',
  groundGlow: 'rgba(100, 116, 139, 0.4)',
  component: '#00ffaa',
  componentGlow: 'rgba(0, 255, 170, 0.5)',
  esp32: '#3b82f6',
  esp32Glow: 'rgba(59, 130, 246, 0.6)',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  bg: '#0a0e17',
  bgSecondary: '#121825',
  bgTertiary: '#1a2332',
}

// Electronic component symbols
const ComponentSymbols = {
  // Resistor (zigzag style)
  Resistor: ({ x, y, value, label, horizontal = true, glowing }) => {
    const id = useId()
    const width = horizontal ? 60 : 20
    const height = horizontal ? 20 : 60

    return (
      <g className="component-group" style={{ filter: glowing ? `drop-shadow(0 0 6px ${colors.componentGlow})` : 'none' }}>
        {horizontal ? (
          <>
            {/* Lead lines */}
            <line x1={x} y1={y} x2={x + 10} y2={y} stroke={colors.wire} strokeWidth={2} />
            <line x1={x + 50} y1={y} x2={x + 60} y2={y} stroke={colors.wire} strokeWidth={2} />
            {/* Zigzag */}
            <polyline
              points={`${x + 10},${y} ${x + 15},${y - 6} ${x + 22},${y + 6} ${x + 29},${y - 6} ${x + 36},${y + 6} ${x + 43},${y - 6} ${x + 50},${y}`}
              fill="none"
              stroke={colors.component}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <line x1={x} y1={y} x2={x} y2={y + 10} stroke={colors.wire} strokeWidth={2} />
            <line x1={x} y1={y + 50} x2={x} y2={y + 60} stroke={colors.wire} strokeWidth={2} />
            <polyline
              points={`${x},${y + 10} ${x - 6},${y + 15} ${x + 6},${y + 22} ${x - 6},${y + 29} ${x + 6},${y + 36} ${x - 6},${y + 43} ${x},${y + 50}`}
              fill="none"
              stroke={colors.component}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {/* Value label */}
        {value && (
          <text
            x={horizontal ? x + 30 : x + 12}
            y={horizontal ? y - 10 : y + 30}
            fontSize={11}
            fontFamily="JetBrains Mono, monospace"
            fill={colors.text}
            textAnchor="middle"
            fontWeight="500"
          >
            {value}
          </text>
        )}
        {/* Component label */}
        {label && (
          <text
            x={horizontal ? x + 30 : x - 12}
            y={horizontal ? y + 18 : y + 30}
            fontSize={10}
            fontFamily="JetBrains Mono, monospace"
            fill={colors.textMuted}
            textAnchor="middle"
          >
            {label}
          </text>
        )}
      </g>
    )
  },

  // Capacitor (polarized)
  Capacitor: ({ x, y, value, label, horizontal = true, polarized = false, glowing }) => (
    <g className="component-group" style={{ filter: glowing ? `drop-shadow(0 0 6px ${colors.componentGlow})` : 'none' }}>
      {horizontal ? (
        <>
          <line x1={x} y1={y} x2={x + 18} y2={y} stroke={colors.wire} strokeWidth={2} />
          <line x1={x + 42} y1={y} x2={x + 60} y2={y} stroke={colors.wire} strokeWidth={2} />
          {/* Plates */}
          <line x1={x + 18} y1={y - 10} x2={x + 18} y2={y + 10} stroke={colors.component} strokeWidth={2} />
          {polarized ? (
            // Curved plate for polarized
            <path
              d={`M ${x + 42} ${y - 10} Q ${x + 36} ${y} ${x + 42} ${y + 10}`}
              fill="none"
              stroke={colors.component}
              strokeWidth={2}
            />
          ) : (
            <line x1={x + 42} y1={y - 10} x2={x + 42} y2={y + 10} stroke={colors.component} strokeWidth={2} />
          )}
          {/* + sign for polarized */}
          {polarized && (
            <text x={x + 8} y={y - 6} fontSize={10} fill={colors.power} fontWeight="bold">+</text>
          )}
        </>
      ) : (
        <>
          <line x1={x} y1={y} x2={x} y2={y + 18} stroke={colors.wire} strokeWidth={2} />
          <line x1={x} y1={y + 42} x2={x} y2={y + 60} stroke={colors.wire} strokeWidth={2} />
          <line x1={x - 10} y1={y + 18} x2={x + 10} y2={y + 18} stroke={colors.component} strokeWidth={2} />
          {polarized ? (
            <path
              d={`M ${x - 10} ${y + 42} Q ${x} ${y + 36} ${x + 10} ${y + 42}`}
              fill="none"
              stroke={colors.component}
              strokeWidth={2}
            />
          ) : (
            <line x1={x - 10} y1={y + 42} x2={x + 10} y2={y + 42} stroke={colors.component} strokeWidth={2} />
          )}
          {polarized && (
            <text x={x + 8} y={y + 10} fontSize={10} fill={colors.power} fontWeight="bold">+</text>
          )}
        </>
      )}
      {value && (
        <text
          x={horizontal ? x + 30 : x + 16}
          y={horizontal ? y - 14 : y + 30}
          fontSize={9}
          fontFamily="JetBrains Mono, monospace"
          fill={colors.text}
          textAnchor="middle"
        >
          {value}
        </text>
      )}
      {label && (
        <text
          x={horizontal ? x + 30 : x - 16}
          y={horizontal ? y + 20 : y + 30}
          fontSize={8}
          fontFamily="JetBrains Mono, monospace"
          fill={colors.textMuted}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  ),

  // LED
  LED: ({ x, y, color = '#00ffaa', label, horizontal = true, glowing }) => (
    <g className="component-group" style={{ filter: glowing ? `drop-shadow(0 0 8px ${color})` : 'none' }}>
      {horizontal ? (
        <>
          <line x1={x} y1={y} x2={x + 15} y2={y} stroke={colors.wire} strokeWidth={2} />
          <line x1={x + 45} y1={y} x2={x + 60} y2={y} stroke={colors.wire} strokeWidth={2} />
          {/* Triangle */}
          <polygon
            points={`${x + 15},${y - 10} ${x + 15},${y + 10} ${x + 35},${y}`}
            fill={color}
            fillOpacity={0.3}
            stroke={color}
            strokeWidth={2}
          />
          {/* Bar */}
          <line x1={x + 35} y1={y - 10} x2={x + 35} y2={y + 10} stroke={color} strokeWidth={2} />
          {/* Light rays */}
          <line x1={x + 30} y1={y - 12} x2={x + 36} y2={y - 18} stroke={color} strokeWidth={1} opacity={0.7} />
          <line x1={x + 35} y1={y - 14} x2={x + 41} y2={y - 20} stroke={color} strokeWidth={1} opacity={0.7} />
        </>
      ) : (
        <>
          <line x1={x} y1={y} x2={x} y2={y + 15} stroke={colors.wire} strokeWidth={2} />
          <line x1={x} y1={y + 45} x2={x} y2={y + 60} stroke={colors.wire} strokeWidth={2} />
          <polygon
            points={`${x - 10},${y + 15} ${x + 10},${y + 15} ${x},${y + 35}`}
            fill={color}
            fillOpacity={0.3}
            stroke={color}
            strokeWidth={2}
          />
          <line x1={x - 10} y1={y + 35} x2={x + 10} y2={y + 35} stroke={color} strokeWidth={2} />
          <line x1={x + 12} y1={y + 25} x2={x + 18} y2={y + 25} stroke={color} strokeWidth={1} opacity={0.7} />
          <line x1={x + 14} y1={y + 30} x2={x + 20} y2={y + 30} stroke={color} strokeWidth={1} opacity={0.7} />
        </>
      )}
      {label && (
        <text
          x={horizontal ? x + 30 : x - 16}
          y={horizontal ? y + 22 : y + 30}
          fontSize={8}
          fontFamily="JetBrains Mono, monospace"
          fill={colors.textMuted}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  ),

  // Button/Switch
  Button: ({ x, y, label, horizontal = true, glowing }) => (
    <g className="component-group" style={{ filter: glowing ? `drop-shadow(0 0 6px ${colors.componentGlow})` : 'none' }}>
      {horizontal ? (
        <>
          <line x1={x} y1={y} x2={x + 20} y2={y} stroke={colors.wire} strokeWidth={2} />
          <line x1={x + 40} y1={y} x2={x + 60} y2={y} stroke={colors.wire} strokeWidth={2} />
          {/* Contact points */}
          <circle cx={x + 20} cy={y} r={3} fill={colors.component} />
          <circle cx={x + 40} cy={y} r={3} fill={colors.component} />
          {/* Switch arm */}
          <line x1={x + 20} y1={y} x2={x + 38} y2={y - 12} stroke={colors.component} strokeWidth={2} strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1={x} y1={y} x2={x} y2={y + 20} stroke={colors.wire} strokeWidth={2} />
          <line x1={x} y1={y + 40} x2={x} y2={y + 60} stroke={colors.wire} strokeWidth={2} />
          <circle cx={x} cy={y + 20} r={3} fill={colors.component} />
          <circle cx={x} cy={y + 40} r={3} fill={colors.component} />
          <line x1={x} y1={y + 20} x2={x - 12} y2={y + 38} stroke={colors.component} strokeWidth={2} strokeLinecap="round" />
        </>
      )}
      {label && (
        <text
          x={horizontal ? x + 30 : x + 16}
          y={horizontal ? y - 18 : y + 30}
          fontSize={8}
          fontFamily="JetBrains Mono, monospace"
          fill={colors.textMuted}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  ),

  // Ground symbol
  Ground: ({ x, y }) => (
    <g className="component-group">
      <line x1={x} y1={y} x2={x} y2={y + 10} stroke={colors.ground} strokeWidth={2} />
      <line x1={x - 12} y1={y + 10} x2={x + 12} y2={y + 10} stroke={colors.ground} strokeWidth={2} />
      <line x1={x - 8} y1={y + 14} x2={x + 8} y2={y + 14} stroke={colors.ground} strokeWidth={2} />
      <line x1={x - 4} y1={y + 18} x2={x + 4} y2={y + 18} stroke={colors.ground} strokeWidth={2} />
    </g>
  ),

  // Power/VCC symbol
  Power: ({ x, y, voltage = '3.3V' }) => (
    <g className="component-group" style={{ filter: `drop-shadow(0 0 4px ${colors.powerGlow})` }}>
      <line x1={x} y1={y} x2={x} y2={y + 15} stroke={colors.power} strokeWidth={2} />
      <circle cx={x} cy={y - 5} r={8} fill="none" stroke={colors.power} strokeWidth={2} />
      <text
        x={x}
        y={y - 2}
        fontSize={7}
        fontFamily="JetBrains Mono, monospace"
        fill={colors.power}
        textAnchor="middle"
        fontWeight="bold"
      >
        +
      </text>
      <text
        x={x + 14}
        y={y + 2}
        fontSize={8}
        fontFamily="JetBrains Mono, monospace"
        fill={colors.power}
      >
        {voltage}
      </text>
    </g>
  ),

  // ESP32 chip simplified
  ESP32: ({ x, y, width = 80, height = 120, pins = [], label = 'ESP32' }) => (
    <g className="component-group" style={{ filter: `drop-shadow(0 0 10px ${colors.esp32Glow})` }}>
      {/* Chip body */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        fill={colors.bgTertiary}
        stroke={colors.esp32}
        strokeWidth={2}
      />
      {/* Notch */}
      <circle cx={x + 12} cy={y + 12} r={4} fill="none" stroke={colors.esp32} strokeWidth={1} opacity={0.5} />
      {/* Label */}
      <text
        x={x + width / 2}
        y={y + height / 2}
        fontSize={10}
        fontFamily="JetBrains Mono, monospace"
        fill={colors.esp32}
        textAnchor="middle"
        fontWeight="bold"
      >
        {label}
      </text>
      {/* Pin labels */}
      {pins.map((pin, i) => (
        <g key={i}>
          {pin.side === 'left' && (
            <>
              <line
                x1={x - 15}
                y1={y + 30 + i * 18}
                x2={x}
                y2={y + 30 + i * 18}
                stroke={pin.type === 'power' ? colors.power : pin.type === 'ground' ? colors.ground : colors.wire}
                strokeWidth={2}
              />
              <text
                x={x + 5}
                y={y + 33 + i * 18}
                fontSize={7}
                fontFamily="JetBrains Mono, monospace"
                fill={colors.textMuted}
              >
                {pin.name}
              </text>
            </>
          )}
          {pin.side === 'right' && (
            <>
              <line
                x1={x + width}
                y1={y + 30 + i * 18}
                x2={x + width + 15}
                y2={y + 30 + i * 18}
                stroke={pin.type === 'power' ? colors.power : pin.type === 'ground' ? colors.ground : colors.wire}
                strokeWidth={2}
              />
              <text
                x={x + width - 5}
                y={y + 33 + i * 18}
                fontSize={7}
                fontFamily="JetBrains Mono, monospace"
                fill={colors.textMuted}
                textAnchor="end"
              >
                {pin.name}
              </text>
            </>
          )}
        </g>
      ))}
    </g>
  ),

  // IC/Chip generic
  IC: ({ x, y, width = 60, height = 40, label = 'IC', pins = 8 }) => (
    <g className="component-group" style={{ filter: `drop-shadow(0 0 6px ${colors.componentGlow})` }}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={2}
        fill={colors.bgTertiary}
        stroke={colors.component}
        strokeWidth={2}
      />
      <circle cx={x + 8} cy={y + 8} r={3} fill="none" stroke={colors.component} strokeWidth={1} opacity={0.5} />
      <text
        x={x + width / 2}
        y={y + height / 2 + 4}
        fontSize={9}
        fontFamily="JetBrains Mono, monospace"
        fill={colors.component}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  ),

  // Diode
  Diode: ({ x, y, horizontal = true, label, glowing }) => (
    <g className="component-group" style={{ filter: glowing ? `drop-shadow(0 0 6px ${colors.componentGlow})` : 'none' }}>
      {horizontal ? (
        <>
          <line x1={x} y1={y} x2={x + 20} y2={y} stroke={colors.wire} strokeWidth={2} />
          <line x1={x + 40} y1={y} x2={x + 60} y2={y} stroke={colors.wire} strokeWidth={2} />
          <polygon
            points={`${x + 20},${y - 8} ${x + 20},${y + 8} ${x + 35},${y}`}
            fill="none"
            stroke={colors.component}
            strokeWidth={2}
          />
          <line x1={x + 35} y1={y - 8} x2={x + 35} y2={y + 8} stroke={colors.component} strokeWidth={2} />
        </>
      ) : (
        <>
          <line x1={x} y1={y} x2={x} y2={y + 20} stroke={colors.wire} strokeWidth={2} />
          <line x1={x} y1={y + 40} x2={x} y2={y + 60} stroke={colors.wire} strokeWidth={2} />
          <polygon
            points={`${x - 8},${y + 20} ${x + 8},${y + 20} ${x},${y + 35}`}
            fill="none"
            stroke={colors.component}
            strokeWidth={2}
          />
          <line x1={x - 8} y1={y + 35} x2={x + 8} y2={y + 35} stroke={colors.component} strokeWidth={2} />
        </>
      )}
      {label && (
        <text
          x={horizontal ? x + 30 : x + 14}
          y={horizontal ? y - 12 : y + 30}
          fontSize={8}
          fontFamily="JetBrains Mono, monospace"
          fill={colors.textMuted}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  ),

  // Transistor (NPN)
  Transistor: ({ x, y, label, type = 'NPN' }) => (
    <g className="component-group" style={{ filter: `drop-shadow(0 0 6px ${colors.componentGlow})` }}>
      {/* Base line */}
      <line x1={x - 20} y1={y} x2={x} y2={y} stroke={colors.wire} strokeWidth={2} />
      {/* Vertical bar */}
      <line x1={x} y1={y - 15} x2={x} y2={y + 15} stroke={colors.component} strokeWidth={3} />
      {/* Collector */}
      <line x1={x} y1={y - 8} x2={x + 20} y2={y - 20} stroke={colors.component} strokeWidth={2} />
      <line x1={x + 20} y1={y - 20} x2={x + 20} y2={y - 30} stroke={colors.wire} strokeWidth={2} />
      {/* Emitter with arrow */}
      <line x1={x} y1={y + 8} x2={x + 20} y2={y + 20} stroke={colors.component} strokeWidth={2} />
      <line x1={x + 20} y1={y + 20} x2={x + 20} y2={y + 30} stroke={colors.wire} strokeWidth={2} />
      {/* Arrow */}
      {type === 'NPN' ? (
        <polygon
          points={`${x + 14},${y + 14} ${x + 20},${y + 20} ${x + 12},${y + 20}`}
          fill={colors.component}
        />
      ) : (
        <polygon
          points={`${x + 6},${y + 14} ${x},${y + 8} ${x + 8},${y + 8}`}
          fill={colors.component}
        />
      )}
      {/* Circle */}
      <circle cx={x + 5} cy={y} r={22} fill="none" stroke={colors.component} strokeWidth={1} opacity={0.5} />
      {label && (
        <text
          x={x + 30}
          y={y + 5}
          fontSize={8}
          fontFamily="JetBrains Mono, monospace"
          fill={colors.textMuted}
        >
          {label}
        </text>
      )}
    </g>
  ),
}

// Animated wire with flowing current effect
const AnimatedWire = ({ points, color = colors.wire, delay = 0, speed = 2 }) => {
  const id = useId()
  const pathData = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')

  return (
    <g>
      {/* Base wire */}
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Animated glow */}
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.3}
        style={{ filter: `blur(3px)` }}
      />
      {/* Flowing dots */}
      <circle r={3} fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
        <animateMotion
          dur={`${speed}s`}
          repeatCount="indefinite"
          path={pathData}
          begin={`${delay}s`}
        />
      </circle>
    </g>
  )
}

// Simple wire connection
const Wire = ({ points, color = colors.wire }) => {
  const pathData = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')

  return (
    <path
      d={pathData}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

// Junction dot
const Junction = ({ x, y, color = colors.wire }) => (
  <circle cx={x} cy={y} r={4} fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
)

// Text label
const Label = ({ x, y, text, size = 10, color = colors.text, anchor = 'middle' }) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fontFamily="JetBrains Mono, monospace"
    fill={color}
    textAnchor={anchor}
  >
    {text}
  </text>
)

// Pre-built circuit templates
const CircuitTemplates = {
  // Basic LED circuit
  ledBasic: ({ animate = true }) => (
    <g>
      <ComponentSymbols.Power x={100} y={30} voltage="3.3V" />
      <AnimatedWire points={[{ x: 100, y: 45 }, { x: 100, y: 70 }]} delay={0} speed={3} />
      <ComponentSymbols.Resistor x={70} y={70} value="330R" label="R1" horizontal />
      <AnimatedWire points={[{ x: 130, y: 70 }, { x: 180, y: 70 }]} delay={0.3} speed={3} />
      <ComponentSymbols.LED x={180} y={70} color="#ef4444" label="LED1" horizontal glowing />
      <AnimatedWire points={[{ x: 240, y: 70 }, { x: 280, y: 70 }, { x: 280, y: 130 }]} delay={0.6} speed={3} />
      <ComponentSymbols.Ground x={280} y={130} />
      <Label x={190} y={30} text="Basic LED Circuit" size={12} />
    </g>
  ),

  // Button with pull-up
  buttonPullup: ({ animate = true }) => (
    <g>
      <ComponentSymbols.Power x={80} y={20} voltage="3.3V" />
      <Wire points={[{ x: 80, y: 35 }, { x: 80, y: 50 }]} />
      <ComponentSymbols.Resistor x={50} y={50} value="10K" label="R1" horizontal />
      <Junction x={80} y={50} />
      <Wire points={[{ x: 80, y: 50 }, { x: 80, y: 80 }]} />
      <Label x={130} y={55} text="GPIO" size={9} color={colors.esp32} />
      <Wire points={[{ x: 80, y: 80 }, { x: 150, y: 80 }, { x: 150, y: 110 }]} color={colors.esp32} />
      <ComponentSymbols.Button x={50} y={110} label="SW1" horizontal />
      <Wire points={[{ x: 80, y: 140 }, { x: 80, y: 170 }]} />
      <ComponentSymbols.Ground x={80} y={170} />
      <Label x={120} y={15} text="Button with Pull-up" size={12} />
    </g>
  ),

  // Voltage divider
  voltageDivider: ({ animate = true }) => (
    <g>
      <Label x={150} y={20} text="Voltage Divider" size={12} />
      <Label x={60} y={50} text="Vin" size={10} color={colors.power} />
      <Wire points={[{ x: 100, y: 45 }, { x: 100, y: 60 }]} color={colors.power} />
      <ComponentSymbols.Resistor x={70} y={60} value="27K" label="R1" />
      <Junction x={100} y={90} />
      <Wire points={[{ x: 100, y: 90 }, { x: 150, y: 90 }]} color={colors.esp32} />
      <Label x={160} y={85} text="GPIO" size={9} color={colors.esp32} anchor="start" />
      <Label x={160} y={97} text="(ADC)" size={8} color={colors.textMuted} anchor="start" />
      <ComponentSymbols.Resistor x={70} y={110} value="10K" label="R2" />
      <Wire points={[{ x: 100, y: 140 }, { x: 100, y: 170 }]} />
      <ComponentSymbols.Ground x={100} y={170} />
      <Label x={180} y={140} text="Vout = Vin x R2/(R1+R2)" size={8} color={colors.textMuted} />
    </g>
  ),
}

// Main CircuitDiagram component
export default function CircuitDiagram({
  circuit,
  width = 400,
  height = 250,
  animated = true,
  showGrid = false,
  children,
  zoomable = true,
  initialZoom = 1.0,
  responsive = false
}) {
  const [hoveredComponent, setHoveredComponent] = useState(null)
  const [zoom, setZoom] = useState(initialZoom)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const id = useId()

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5))
  const handleZoomReset = () => {
    setZoom(initialZoom)
    setPan({ x: 0, y: 0 })
  }

  // Pan controls
  const handleMouseDown = (e) => {
    if (!zoomable || e.button !== 0) return
    setIsPanning(true)
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e) => {
    if (!isPanning) return
    setPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    })
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  // Wheel zoom
  const handleWheel = (e) => {
    if (!zoomable) return
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }

  // Fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (!isFullscreen) {
      setZoom(1.5) // Zoom in when entering fullscreen
    } else {
      setZoom(initialZoom)
      setPan({ x: 0, y: 0 })
    }
  }

  // Calculate responsive dimensions
  const containerStyle = responsive ? {
    width: '100%',
    height: '100%',
    minHeight: '500px',
    aspectRatio: `${width} / ${height}`,
    maxWidth: '100%'
  } : {
    width: isFullscreen ? '100%' : '100%',
    height: isFullscreen ? '100%' : '100%',
    minHeight: isFullscreen ? 'auto' : `${height}px`
  }

  const svgContent = (
    <div 
      className={`relative bg-bg-primary overflow-hidden ${
        isFullscreen ? 'fixed inset-4 z-50 cyber-window' : 'cyber-panel'
      }`}
      style={{
        cursor: isPanning ? 'grabbing' : (zoomable ? 'grab' : 'default'),
        ...containerStyle,
        borderRadius: 0
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      ref={containerRef}
    >
      {/* Controls */}
      {zoomable && (
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="bg-bg-secondary/90 backdrop-blur-sm border border-white/20 rounded p-1.5 hover:bg-bg-tertiary transition-colors"
            title="Zoom In"
          >
            <svg className="w-4 h-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-bg-secondary/90 backdrop-blur-sm border border-white/20 rounded p-1.5 hover:bg-bg-tertiary transition-colors"
            title="Zoom Out"
          >
            <svg className="w-4 h-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={handleZoomReset}
            className="bg-bg-secondary/90 backdrop-blur-sm border border-white/20 rounded p-1.5 hover:bg-bg-tertiary transition-colors"
            title="Reset Zoom"
          >
            <svg className="w-4 h-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-bg-secondary/90 backdrop-blur-sm border border-white/20 rounded p-1.5 hover:bg-bg-tertiary transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <svg className="w-4 h-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
          </button>
        </div>
      )}

      {/* Zoom indicator */}
      {zoomable && zoom !== initialZoom && (
        <div className="absolute bottom-2 left-2 z-10 bg-bg-secondary/90 backdrop-blur-sm border border-white/20 rounded px-2 py-1 text-xs text-accent-cyan font-mono">
          {Math.round(zoom * 100)}%
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio={responsive ? "xMidYMid meet" : "none"}
        style={{
          overflow: 'visible',
          display: 'block'
        }}
      >
        <g
          transform={`translate(${width/2 + pan.x/zoom}, ${height/2 + pan.y/zoom}) scale(${zoom}) translate(${-width/2}, ${-height/2})`}
          style={{
            transition: isPanning ? 'none' : 'transform 0.1s ease-out'
          }}
        >
        <defs>
          {/* Glow filter */}
          <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Grid pattern */}
          <pattern id={`grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(0, 212, 255, 0.05)"
              strokeWidth="0.5"
            />
          </pattern>

          {/* Circuit trace pattern */}
          <pattern id={`traces-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="rgba(0, 212, 255, 0.08)" />
          </pattern>

          {/* Scanline effect */}
          <pattern id={`scanlines-${id}`} patternUnits="userSpaceOnUse" width="100%" height="4">
            <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(0, 212, 255, 0.02)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill={colors.bg} />

        {/* Grid overlay */}
        {showGrid && <rect width="100%" height="100%" fill={`url(#grid-${id})`} />}

        {/* Circuit trace pattern */}
        <rect width="100%" height="100%" fill={`url(#traces-${id})`} />

        {/* Scanlines */}
        <rect width="100%" height="100%" fill={`url(#scanlines-${id})`} />

        {/* Border glow */}
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          rx="8"
          fill="none"
          stroke={colors.wire}
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Render template or custom children */}
        {circuit && CircuitTemplates[circuit] ? (
          CircuitTemplates[circuit]({ animate: animated })
        ) : (
          children
        )}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredComponent && (
        <div
          className="absolute z-10 bg-bg-secondary border border-accent-blue/30 rounded-lg px-3 py-2 text-sm pointer-events-none"
          style={{
            left: '50%',
            bottom: '8px',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)',
          }}
        >
          <span className="text-accent-cyan font-mono">{hoveredComponent}</span>
        </div>
      )}
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-[95vw] max-h-[95vh]">
          {svgContent}
        </div>
      </div>
    )
  }

  return svgContent
}

// Export components for custom diagrams
CircuitDiagram.Components = ComponentSymbols
CircuitDiagram.Wire = Wire
CircuitDiagram.AnimatedWire = AnimatedWire
CircuitDiagram.Junction = Junction
CircuitDiagram.Label = Label
CircuitDiagram.Templates = CircuitTemplates
