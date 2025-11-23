/**
 * Circuit Schematic Definitions
 *
 * SVG-based circuit diagrams for use with the CircuitDiagram component.
 * Each schematic is a React component that renders within the CircuitDiagram SVG.
 */

import CircuitDiagram from '../components/CircuitDiagram'

const { Components, Wire, AnimatedWire, Junction, Label } = CircuitDiagram

// Color scheme
const colors = {
  wire: '#00d4ff',
  power: '#ef4444',
  ground: '#64748b',
  gpio: '#3b82f6',
  text: '#e2e8f0',
  muted: '#94a3b8',
}

/**
 * Circuit schematics mapped by circuit ID
 */
export const circuitSchematics = {
  // ============================================
  // POWER CIRCUITS
  // ============================================

  'power-3v3-ams1117': {
    width: 380,
    height: 200,
    render: ({ animated }) => (
      <g>
        <Label x={190} y={20} text="3.3V LDO Power Supply" size={12} />

        {/* 5V Input */}
        <Label x={40} y={50} text="5V" size={10} color={colors.power} />
        <Wire points={[{ x: 60, y: 45 }, { x: 60, y: 70 }]} color={colors.power} />

        {/* Input capacitor C1 */}
        <Components.Capacitor x={30} y={70} value="10uF" label="C1" polarized />
        <Wire points={[{ x: 60, y: 100 }, { x: 60, y: 130 }]} />

        {/* Junction to regulator */}
        <Junction x={60} y={70} color={colors.power} />
        {animated ? (
          <AnimatedWire points={[{ x: 60, y: 70 }, { x: 130, y: 70 }]} color={colors.power} speed={2} />
        ) : (
          <Wire points={[{ x: 60, y: 70 }, { x: 130, y: 70 }]} color={colors.power} />
        )}

        {/* AMS1117 Regulator */}
        <rect x={130} y={50} width={80} height={50} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.5))' }} />
        <text x={170} y={72} fontSize={8} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">AMS1117</text>
        <text x={170} y={85} fontSize={7} fontFamily="JetBrains Mono" fill={colors.muted} textAnchor="middle">3.3V</text>

        {/* Pin labels - larger for readability */}
        <text x={135} y={65} fontSize={9} fontFamily="JetBrains Mono" fill={colors.text} fontWeight="500">VIN</text>
        <text x={190} y={65} fontSize={9} fontFamily="JetBrains Mono" fill={colors.text} textAnchor="end" fontWeight="500">VOUT</text>
        <text x={170} y={98} fontSize={9} fontFamily="JetBrains Mono" fill={colors.text} textAnchor="middle" fontWeight="500">GND</text>

        {/* Output wire */}
        {animated ? (
          <AnimatedWire points={[{ x: 210, y: 70 }, { x: 280, y: 70 }]} color="#00ffaa" speed={2} delay={0.5} />
        ) : (
          <Wire points={[{ x: 210, y: 70 }, { x: 280, y: 70 }]} color="#00ffaa" />
        )}

        {/* Output capacitor C2 */}
        <Junction x={280} y={70} color="#00ffaa" />
        <Components.Capacitor x={250} y={70} value="10uF" label="C2" polarized />
        <Wire points={[{ x: 280, y: 100 }, { x: 280, y: 130 }]} />

        {/* 3.3V Output label */}
        <Wire points={[{ x: 280, y: 70 }, { x: 340, y: 70 }]} color="#00ffaa" />
        <Label x={350} y={75} text="3.3V" size={10} color="#00ffaa" anchor="start" />

        {/* Ground connections */}
        <Wire points={[{ x: 60, y: 130 }, { x: 170, y: 130 }]} color={colors.ground} />
        <Wire points={[{ x: 170, y: 100 }, { x: 170, y: 130 }]} color={colors.ground} />
        <Wire points={[{ x: 170, y: 130 }, { x: 280, y: 130 }]} color={colors.ground} />
        <Junction x={170} y={130} color={colors.ground} />
        <Components.Ground x={170} y={145} />

        {/* Info labels - larger */}
        <text x={60} y={175} fontSize={9} fontFamily="JetBrains Mono" fill={colors.text}>Input: 4.5-15V</text>
        <text x={200} y={175} fontSize={9} fontFamily="JetBrains Mono" fill={colors.text}>Output: 3.3V @ 800mA</text>
      </g>
    ),
  },

  'power-3v3-mcp1700': {
    width: 400,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={200} y={20} text="MCP1700 Ultra Low-Power LDO" size={12} />

        {/* Battery Input */}
        <Label x={35} y={55} text="3.7V" size={10} color={colors.power} />
        <Label x={35} y={68} text="LiPo" size={7} color={colors.muted} />
        <Wire points={[{ x: 55, y: 55 }, { x: 70, y: 55 }]} color={colors.power} />

        {/* Input capacitor C1 - ceramic */}
        <Junction x={70} y={55} color={colors.power} />
        <Components.Capacitor x={40} y={55} value="1uF" label="C1" />
        <Wire points={[{ x: 70, y: 85 }, { x: 70, y: 130 }]} />

        {/* Wire to regulator */}
        {animated ? (
          <AnimatedWire points={[{ x: 70, y: 55 }, { x: 140, y: 55 }]} color={colors.power} speed={2} />
        ) : (
          <Wire points={[{ x: 70, y: 55 }, { x: 140, y: 55 }]} color={colors.power} />
        )}

        {/* MCP1700 Regulator - TO-92 style */}
        <g style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.4))' }}>
          {/* TO-92 package body */}
          <path d="M 140,40 L 140,80 Q 175,90 210,80 L 210,40 Q 175,35 140,40" fill="#1a2332" stroke="#00ffaa" strokeWidth={2} />
          <text x={175} y={55} fontSize={8} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">MCP1700</text>
          <text x={175} y={68} fontSize={7} fontFamily="JetBrains Mono" fill={colors.muted} textAnchor="middle">3.3V</text>
          {/* Pin labels inside */}
          <text x={150} y={82} fontSize={5} fill={colors.muted}>VIN</text>
          <text x={175} y={88} fontSize={5} fill={colors.muted} textAnchor="middle">GND</text>
          <text x={200} y={82} fontSize={5} fill={colors.muted} textAnchor="end">VOUT</text>
        </g>

        {/* Output wire */}
        {animated ? (
          <AnimatedWire points={[{ x: 210, y: 55 }, { x: 280, y: 55 }]} color="#00ffaa" speed={2} delay={0.5} />
        ) : (
          <Wire points={[{ x: 210, y: 55 }, { x: 280, y: 55 }]} color="#00ffaa" />
        )}

        {/* Output capacitor C2 - ceramic */}
        <Junction x={280} y={55} color="#00ffaa" />
        <Components.Capacitor x={250} y={55} value="1uF" label="C2" />
        <Wire points={[{ x: 280, y: 85 }, { x: 280, y: 130 }]} />

        {/* Bulk capacitor for WiFi - shown as optional */}
        <Junction x={330} y={55} color="#00ffaa" />
        <Wire points={[{ x: 280, y: 55 }, { x: 330, y: 55 }]} color="#00ffaa" />
        <Components.Capacitor x={300} y={55} value="100uF" label="C3" polarized />
        <Wire points={[{ x: 330, y: 85 }, { x: 330, y: 130 }]} />
        <text x={330} y={100} fontSize={5} fill={colors.muted} textAnchor="middle">(WiFi</text>
        <text x={330} y={108} fontSize={5} fill={colors.muted} textAnchor="middle">bursts)</text>

        {/* 3.3V Output label */}
        <Wire points={[{ x: 330, y: 55 }, { x: 365, y: 55 }]} color="#00ffaa" />
        <Label x={370} y={60} text="3.3V" size={10} color="#00ffaa" anchor="start" />

        {/* Ground connections */}
        <Wire points={[{ x: 70, y: 130 }, { x: 175, y: 130 }]} color={colors.ground} />
        <Wire points={[{ x: 175, y: 90 }, { x: 175, y: 130 }]} color={colors.ground} />
        <Wire points={[{ x: 175, y: 130 }, { x: 330, y: 130 }]} color={colors.ground} />
        <Junction x={175} y={130} color={colors.ground} />
        <Junction x={280} y={130} color={colors.ground} />
        <Junction x={330} y={130} color={colors.ground} />
        <Components.Ground x={200} y={145} />

        {/* Low power indicator */}
        <rect x={60} y={160} width={120} height={40} rx={4} fill="rgba(0, 255, 170, 0.05)" stroke="rgba(0, 255, 170, 0.2)" strokeWidth={1} />
        <text x={120} y={177} fontSize={7} fill="#00ffaa" textAnchor="middle">Ultra-Low Iq: 1.6uA</text>
        <text x={120} y={190} fontSize={6} fill={colors.muted} textAnchor="middle">Ideal for deep sleep</text>

        {/* Specs */}
        <text x={220} y={175} fontSize={7} fill={colors.muted}>Input: 2.3-6V (LiPo safe)</text>
        <text x={220} y={188} fontSize={7} fill={colors.muted}>Output: 3.3V @ 250mA</text>
        <text x={220} y={201} fontSize={7} fill={colors.muted}>Dropout: 178mV @ 250mA</text>
      </g>
    ),
  },

  'power-lipo-charging': {
    width: 480,
    height: 260,
    render: ({ animated }) => (
      <g>
        <Label x={240} y={20} text="LiPo Battery Charging System (TP4056)" size={12} />

        {/* USB Input */}
        <g>
          <rect x={20} y={60} width={50} height={35} rx={3} fill="#1a2332" stroke={colors.power} strokeWidth={2} />
          <text x={45} y={75} fontSize={7} fontFamily="JetBrains Mono" fill={colors.power} textAnchor="middle">USB</text>
          <text x={45} y={87} fontSize={6} fill={colors.muted} textAnchor="middle">5V</text>
        </g>

        {/* Wire from USB to TP4056 */}
        {animated ? (
          <AnimatedWire points={[{ x: 70, y: 77 }, { x: 100, y: 77 }]} color={colors.power} speed={2} />
        ) : (
          <Wire points={[{ x: 70, y: 77 }, { x: 100, y: 77 }]} color={colors.power} />
        )}

        {/* TP4056 Module */}
        <g style={{ filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))' }}>
          <rect x={100} y={50} width={90} height={70} rx={4} fill="#1a2332" stroke="#ef4444" strokeWidth={2} />
          <text x={145} y={70} fontSize={9} fontFamily="JetBrains Mono" fill="#ef4444" textAnchor="middle">TP4056</text>
          <text x={145} y={83} fontSize={6} fill={colors.muted} textAnchor="middle">Charger Module</text>

          {/* Charging LEDs */}
          <circle cx={120} cy={100} r={4} fill="#ef4444" fillOpacity={0.7} stroke="#ef4444" strokeWidth={1}>
            {animated && <animate attributeName="fill-opacity" values="0.7;0.3;0.7" dur="1.5s" repeatCount="indefinite" />}
          </circle>
          <text x={120} y={113} fontSize={5} fill={colors.muted} textAnchor="middle">CHG</text>

          <circle cx={170} cy={100} r={4} fill="#22c55e" fillOpacity={0.4} stroke="#22c55e" strokeWidth={1} />
          <text x={170} y={113} fontSize={5} fill={colors.muted} textAnchor="middle">FULL</text>

          {/* Pin labels */}
          <text x={105} y={65} fontSize={5} fill={colors.muted}>IN+</text>
          <text x={185} y={65} fontSize={5} fill={colors.muted} textAnchor="end">B+</text>
          <text x={185} y={118} fontSize={5} fill={colors.muted} textAnchor="end">OUT+</text>
        </g>

        {/* LiPo Battery */}
        <g style={{ filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.5))' }}>
          <rect x={220} y={40} width={70} height={45} rx={4} fill="#1a2332" stroke="#fbbf24" strokeWidth={2} />
          <rect x={290} y={52} width={6} height={20} rx={2} fill="#fbbf24" fillOpacity={0.5} />
          <text x={255} y={58} fontSize={8} fontFamily="JetBrains Mono" fill="#fbbf24" textAnchor="middle">LiPo</text>
          <text x={255} y={72} fontSize={6} fill={colors.muted} textAnchor="middle">3.7V 1000mAh</text>
          <text x={225} y={82} fontSize={5} fill={colors.muted}>B+</text>
          <text x={285} y={82} fontSize={5} fill={colors.muted} textAnchor="end">B-</text>
        </g>

        {/* Wire from TP4056 to Battery */}
        {animated ? (
          <AnimatedWire points={[{ x: 190, y: 62 }, { x: 220, y: 62 }]} color="#fbbf24" speed={1.5} delay={0.3} />
        ) : (
          <Wire points={[{ x: 190, y: 62 }, { x: 220, y: 62 }]} color="#fbbf24" />
        )}

        {/* Junction from TP4056 OUT to LDO */}
        <Wire points={[{ x: 190, y: 105 }, { x: 210, y: 105 }]} color="#fbbf24" />
        <Junction x={210} y={105} color="#fbbf24" />
        <Wire points={[{ x: 210, y: 105 }, { x: 210, y: 62 }, { x: 220, y: 62 }]} color="#fbbf24" />

        {/* Wire to LDO */}
        {animated ? (
          <AnimatedWire points={[{ x: 210, y: 105 }, { x: 280, y: 105 }]} color="#fbbf24" speed={2} delay={0.6} />
        ) : (
          <Wire points={[{ x: 210, y: 105 }, { x: 280, y: 105 }]} color="#fbbf24" />
        )}

        {/* AMS1117 LDO */}
        <g style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.5))' }}>
          <rect x={280} y={85} width={70} height={45} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} />
          <text x={315} y={105} fontSize={8} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">AMS1117</text>
          <text x={315} y={118} fontSize={6} fill={colors.muted} textAnchor="middle">3.3V LDO</text>
          <text x={285} y={98} fontSize={5} fill={colors.muted}>VIN</text>
          <text x={345} y={98} fontSize={5} fill={colors.muted} textAnchor="end">VOUT</text>
        </g>

        {/* Output capacitor */}
        <Wire points={[{ x: 350, y: 105 }, { x: 380, y: 105 }]} color="#00ffaa" />
        <Junction x={380} y={105} color="#00ffaa" />
        <Components.Capacitor x={350} y={105} value="100uF" label="C1" polarized />
        <Wire points={[{ x: 380, y: 135 }, { x: 380, y: 180 }]} />

        {/* ESP32 Output */}
        {animated ? (
          <AnimatedWire points={[{ x: 380, y: 105 }, { x: 420, y: 105 }]} color="#00ffaa" speed={2} delay={0.9} />
        ) : (
          <Wire points={[{ x: 380, y: 105 }, { x: 420, y: 105 }]} color="#00ffaa" />
        )}

        <g>
          <rect x={420} y={85} width={50} height={45} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
          <text x={445} y={105} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
          <text x={445} y={118} fontSize={6} fill={colors.muted} textAnchor="middle">3V3</text>
        </g>

        {/* Battery voltage monitoring (optional) */}
        <Wire points={[{ x: 255, y: 85 }, { x: 255, y: 150 }]} color="#fbbf24" strokeDasharray="4,2" />
        <rect x={220} y={150} width={70} height={30} rx={3} fill="rgba(251, 191, 36, 0.05)" stroke="rgba(251, 191, 36, 0.3)" strokeWidth={1} strokeDasharray="4,2" />
        <text x={255} y={165} fontSize={6} fill="#fbbf24" textAnchor="middle">ADC (GPIO34)</text>
        <text x={255} y={175} fontSize={5} fill={colors.muted} textAnchor="middle">Via voltage divider</text>

        {/* Ground connections */}
        <Wire points={[{ x: 45, y: 95 }, { x: 45, y: 180 }]} color={colors.ground} />
        <Wire points={[{ x: 45, y: 180 }, { x: 445, y: 180 }]} color={colors.ground} />
        <Wire points={[{ x: 145, y: 120 }, { x: 145, y: 180 }]} color={colors.ground} />
        <Wire points={[{ x: 275, y: 85 }, { x: 275, y: 180 }]} color={colors.ground} />
        <Wire points={[{ x: 315, y: 130 }, { x: 315, y: 180 }]} color={colors.ground} />
        <Wire points={[{ x: 445, y: 130 }, { x: 445, y: 180 }]} color={colors.ground} />
        <Junction x={145} y={180} color={colors.ground} />
        <Junction x={275} y={180} color={colors.ground} />
        <Junction x={315} y={180} color={colors.ground} />
        <Junction x={380} y={180} color={colors.ground} />
        <Junction x={445} y={180} color={colors.ground} />
        <Components.Ground x={240} y={195} />

        {/* Voltage labels */}
        <text x={30} y={215} fontSize={7} fill={colors.muted}>USB 5V</text>
        <text x={120} y={215} fontSize={7} fill={colors.muted}>Charge 1A</text>
        <text x={230} y={215} fontSize={7} fill={colors.muted}>3.0-4.2V</text>
        <text x={330} y={215} fontSize={7} fill={colors.muted}>3.3V regulated</text>

        {/* Charging flow indicator */}
        {animated && (
          <g>
            <circle r={3} fill="#ef4444" style={{ filter: 'drop-shadow(0 0 4px #ef4444)' }}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M 70 77 L 190 77 L 190 62 L 220 62" />
            </circle>
          </g>
        )}
      </g>
    ),
  },

  'power-decoupling': {
    width: 400,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={200} y={20} text="Decoupling Capacitor Placement" size={12} />

        {/* Power rail */}
        <Wire points={[{ x: 40, y: 60 }, { x: 360, y: 60 }]} color={colors.power} />
        <Label x={30} y={65} text="3.3V" size={9} color={colors.power} anchor="end" />

        {/* ESP32 Chip */}
        <rect x={150} y={90} width={100} height={70} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' }} />
        <text x={200} y={120} fontSize={12} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle" fontWeight="bold">ESP32</text>
        <text x={200} y={135} fontSize={9} fontFamily="JetBrains Mono" fill={colors.text} textAnchor="middle">VDD Pins</text>

        {/* Power connections to chip */}
        <Wire points={[{ x: 170, y: 60 }, { x: 170, y: 90 }]} color={colors.power} />
        <Wire points={[{ x: 230, y: 60 }, { x: 230, y: 90 }]} color={colors.power} />

        {/* Bulk capacitor */}
        <Junction x={80} y={60} color={colors.power} />
        <Components.Capacitor x={50} y={60} value="100uF" label="Bulk" polarized />
        <Wire points={[{ x: 80, y: 90 }, { x: 80, y: 180 }]} />

        {/* Decoupling caps near chip */}
        <Junction x={170} y={60} color={colors.power} />
        <Components.Capacitor x={140} y={60} value="100nF" label="C1" />
        <Wire points={[{ x: 170, y: 90 }, { x: 170, y: 180 }]} />

        <Junction x={230} y={60} color={colors.power} />
        <Components.Capacitor x={200} y={60} value="100nF" label="C2" />
        <Wire points={[{ x: 230, y: 90 }, { x: 230, y: 180 }]} />

        {/* EN pin cap */}
        <Wire points={[{ x: 250, y: 110 }, { x: 300, y: 110 }]} color={colors.gpio} />
        <Label x={255} y={108} text="EN" size={10} color={colors.text} />
        <Components.Capacitor x={270} y={110} value="10uF" label="C3" />
        <Wire points={[{ x: 300, y: 140 }, { x: 300, y: 180 }]} />

        {/* Ground rail */}
        <Wire points={[{ x: 40, y: 180 }, { x: 360, y: 180 }]} color={colors.ground} />
        <Components.Ground x={200} y={195} />
        <Junction x={80} y={180} color={colors.ground} />
        <Junction x={170} y={180} color={colors.ground} />
        <Junction x={230} y={180} color={colors.ground} />
        <Junction x={300} y={180} color={colors.ground} />
      </g>
    ),
  },

  // ============================================
  // PROGRAMMING CIRCUITS
  // ============================================

  'boot-reset-buttons': {
    width: 350,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={175} y={20} text="Boot and Reset Buttons" size={12} />

        {/* 3.3V Power */}
        <Components.Power x={100} y={40} voltage="3.3V" />
        <Wire points={[{ x: 100, y: 55 }, { x: 100, y: 70 }]} color={colors.power} />

        {/* EN pin pull-up resistor */}
        <Junction x={100} y={70} color={colors.power} />
        <Components.Resistor x={70} y={70} value="10K" label="R1" />
        <Wire points={[{ x: 100, y: 100 }, { x: 100, y: 115 }]} />

        {/* Junction to ESP32 EN */}
        <Junction x={100} y={115} />
        <Wire points={[{ x: 100, y: 115 }, { x: 200, y: 115 }]} color={colors.gpio} />

        {/* RESET Button */}
        <Wire points={[{ x: 100, y: 115 }, { x: 100, y: 130 }]} />
        <Components.Button x={70} y={130} label="RESET" />
        <Wire points={[{ x: 100, y: 160 }, { x: 100, y: 190 }]} />

        {/* Debounce cap */}
        <Junction x={140} y={115} />
        <Components.Capacitor x={110} y={115} value="100nF" label="C1" />
        <Wire points={[{ x: 140, y: 145 }, { x: 140, y: 190 }]} />

        {/* ESP32 */}
        <rect x={200} y={90} width={80} height={70} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} style={{ filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' }} />
        <text x={240} y={120} fontSize={9} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={205} y={105} fontSize={6} fill={colors.muted}>EN</text>
        <text x={205} y={150} fontSize={10} fontFamily="JetBrains Mono" fill={colors.text} fontWeight="500">GPIO0</text>

        {/* GPIO0 line (internal pullup shown) */}
        <Wire points={[{ x: 200, y: 145 }, { x: 180, y: 145 }]} color={colors.gpio} />
        <rect x={165} y={135} width={20} height={20} rx={2} fill="none" stroke={colors.muted} strokeWidth={1} strokeDasharray="3,2" />
        <text x={175} y={148} fontSize={5} fill={colors.muted} textAnchor="middle">Int.</text>

        {/* BOOT Button */}
        <Wire points={[{ x: 165, y: 145 }, { x: 60, y: 145 }]} />
        <Components.Button x={30} y={130} label="BOOT" />
        <Wire points={[{ x: 60, y: 160 }, { x: 60, y: 190 }]} />

        {/* Ground rail */}
        <Wire points={[{ x: 60, y: 190 }, { x: 240, y: 190 }]} color={colors.ground} />
        <Junction x={100} y={190} color={colors.ground} />
        <Junction x={140} y={190} color={colors.ground} />
        <Components.Ground x={150} y={205} />

        {/* Labels */}
        <text x={280} y={200} fontSize={7} fill={colors.muted}>Hold BOOT + Press RESET</text>
        <text x={280} y={212} fontSize={7} fill={colors.muted}>= Enter bootloader</text>
      </g>
    ),
  },

  // ============================================
  // INPUT CIRCUITS
  // ============================================

  'input-button-pullup': {
    width: 300,
    height: 200,
    render: ({ animated }) => (
      <g>
        <Label x={150} y={20} text="Button with Internal Pull-up" size={12} />

        {/* 3.3V Power */}
        <Components.Power x={100} y={35} voltage="3.3V" />
        <Wire points={[{ x: 100, y: 50 }, { x: 100, y: 65 }]} color={colors.power} />

        {/* Internal pullup (shown as dotted) */}
        <rect x={85} y={65} width={30} height={40} rx={2} fill="none" stroke={colors.muted} strokeWidth={1} strokeDasharray="4,2" />
        <text x={100} y={82} fontSize={6} fill={colors.muted} textAnchor="middle">Internal</text>
        <text x={100} y={92} fontSize={6} fill={colors.muted} textAnchor="middle">~45K</text>

        {/* Junction point */}
        <Wire points={[{ x: 100, y: 105 }, { x: 100, y: 120 }]} />
        <Junction x={100} y={120} />

        {/* To GPIO */}
        {animated ? (
          <AnimatedWire points={[{ x: 100, y: 120 }, { x: 200, y: 120 }]} color={colors.gpio} speed={3} />
        ) : (
          <Wire points={[{ x: 100, y: 120 }, { x: 200, y: 120 }]} color={colors.gpio} />
        )}
        <Label x={210} y={125} text="GPIO" size={9} color={colors.gpio} anchor="start" />

        {/* Button */}
        <Wire points={[{ x: 100, y: 120 }, { x: 100, y: 135 }]} />
        <Components.Button x={70} y={135} label="SW1" />

        {/* Ground */}
        <Wire points={[{ x: 100, y: 165 }, { x: 100, y: 180 }]} />
        <Components.Ground x={100} y={180} />

        {/* State indicator */}
        <text x={220} y={145} fontSize={7} fill={colors.muted}>Pressed: LOW</text>
        <text x={220} y={157} fontSize={7} fill={colors.muted}>Released: HIGH</text>
      </g>
    ),
  },

  'input-button-interrupt': {
    width: 340,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={170} y={20} text="Button with Hardware Interrupt" size={11} />

        {/* 3.3V Power */}
        <Components.Power x={80} y={40} voltage="3.3V" />
        <Wire points={[{ x: 80, y: 55 }, { x: 80, y: 70 }]} color={colors.power} />

        {/* Internal pullup (shown as dotted) */}
        <rect x={65} y={70} width={30} height={35} rx={2} fill="none" stroke={colors.muted} strokeWidth={1} strokeDasharray="4,2" />
        <text x={80} y={85} fontSize={5} fill={colors.muted} textAnchor="middle">Internal</text>
        <text x={80} y={95} fontSize={5} fill={colors.muted} textAnchor="middle">~45K</text>

        {/* Junction point */}
        <Wire points={[{ x: 80, y: 105 }, { x: 80, y: 120 }]} />
        <Junction x={80} y={120} />

        {/* To GPIO with interrupt symbol */}
        {animated ? (
          <AnimatedWire points={[{ x: 80, y: 120 }, { x: 180, y: 120 }]} color={colors.gpio} speed={3} />
        ) : (
          <Wire points={[{ x: 80, y: 120 }, { x: 180, y: 120 }]} color={colors.gpio} />
        )}

        {/* Interrupt indicator */}
        <g style={{ filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.6))' }}>
          <circle cx={140} cy={120} r={12} fill="none" stroke="#ef4444" strokeWidth={2} />
          <text x={140} y={124} fontSize={8} fontFamily="JetBrains Mono" fill="#ef4444" textAnchor="middle">INT</text>
          {animated && (
            <circle cx={140} cy={120} r={12} fill="none" stroke="#ef4444" strokeWidth={2}>
              <animate attributeName="r" values="12;18;12" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
            </circle>
          )}
        </g>

        {/* ESP32 */}
        <rect x={180} y={100} width={70} height={45} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={215} y={120} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={215} y={135} fontSize={10} fontFamily="JetBrains Mono" fill={colors.text} textAnchor="middle" fontWeight="500">GPIO4</text>

        {/* Button */}
        <Wire points={[{ x: 80, y: 120 }, { x: 80, y: 135 }]} />
        <Components.Button x={50} y={135} label="SW1" />

        {/* Ground */}
        <Wire points={[{ x: 80, y: 165 }, { x: 80, y: 190 }]} />
        <Components.Ground x={80} y={190} />

        {/* ISR info */}
        <rect x={180} y={160} width={130} height={45} rx={4} fill="rgba(239, 68, 68, 0.05)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth={1} />
        <text x={245} y={178} fontSize={7} fill="#ef4444" textAnchor="middle" fontFamily="JetBrains Mono">IRAM_ATTR ISR</text>
        <text x={245} y={192} fontSize={6} fill={colors.muted} textAnchor="middle">FALLING edge trigger</text>
      </g>
    ),
  },

  'input-touch-sensor': {
    width: 340,
    height: 200,
    render: ({ animated }) => (
      <g>
        <Label x={170} y={20} text="Capacitive Touch Sensor" size={11} />

        {/* ESP32 */}
        <rect x={60} y={70} width={80} height={60} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} style={{ filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' }} />
        <text x={100} y={95} fontSize={9} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={100} y={110} fontSize={7} fill={colors.muted} textAnchor="middle">T0 (GPIO4)</text>

        {/* Wire to touch pad */}
        {animated ? (
          <AnimatedWire points={[{ x: 140, y: 100 }, { x: 180, y: 100 }]} color="#a855f7" speed={2} />
        ) : (
          <Wire points={[{ x: 140, y: 100 }, { x: 180, y: 100 }]} color="#a855f7" />
        )}

        {/* Touch pad */}
        <g style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))' }}>
          <rect x={180} y={70} width={80} height={60} rx={8} fill="#1a2332" stroke="#a855f7" strokeWidth={2} />
          <rect x={190} y={80} width={60} height={40} rx={4} fill="rgba(168, 85, 247, 0.1)" stroke="#a855f7" strokeWidth={1} />
          <text x={220} y={105} fontSize={8} fontFamily="JetBrains Mono" fill="#a855f7" textAnchor="middle">TOUCH</text>
          {animated && (
            <rect x={190} y={80} width={60} height={40} rx={4} fill="none" stroke="#a855f7" strokeWidth={2}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            </rect>
          )}
        </g>

        {/* Finger icon when animated */}
        {animated && (
          <g>
            <ellipse cx={220} cy={65} rx={12} ry={8} fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth={1}>
              <animate attributeName="cy" values="65;75;65" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </ellipse>
          </g>
        )}

        {/* Touch pins list */}
        <rect x={60} y={145} width={200} height={40} rx={4} fill="rgba(168, 85, 247, 0.05)" stroke="rgba(168, 85, 247, 0.2)" strokeWidth={1} />
        <text x={160} y={162} fontSize={7} fill="#a855f7" textAnchor="middle" fontFamily="JetBrains Mono">Touch Pins: T0-T9</text>
        <text x={160} y={175} fontSize={6} fill={colors.muted} textAnchor="middle">GPIO4, 0, 2, 15, 13, 12, 14, 27, 33, 32</text>
      </g>
    ),
  },

  'input-adc-voltage-divider': {
    width: 350,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={175} y={20} text="ADC Voltage Divider (0-12V to 0-3.3V)" size={11} />

        {/* High voltage input */}
        <Label x={60} y={50} text="Vin" size={10} color={colors.power} />
        <Label x={60} y={62} text="(0-12V)" size={7} color={colors.muted} />
        <Wire points={[{ x: 80, y: 55 }, { x: 100, y: 55 }]} color={colors.power} />

        {/* R1 */}
        {animated ? (
          <AnimatedWire points={[{ x: 100, y: 55 }, { x: 100, y: 70 }]} color={colors.power} speed={2} />
        ) : (
          <Wire points={[{ x: 100, y: 55 }, { x: 100, y: 70 }]} color={colors.power} />
        )}
        <Components.Resistor x={70} y={70} value="27K" label="R1" />

        {/* Junction */}
        <Junction x={100} y={100} />

        {/* To ADC */}
        <Wire points={[{ x: 100, y: 100 }, { x: 200, y: 100 }]} color={colors.gpio} />
        <Label x={210} y={95} text="GPIO34" size={11} color={colors.gpio} anchor="start" />
        <Label x={210} y={107} text="(ADC1_CH6)" size={9} color={colors.text} anchor="start" />

        {/* R2 */}
        <Wire points={[{ x: 100, y: 100 }, { x: 100, y: 120 }]} />
        <Components.Resistor x={70} y={120} value="10K" label="R2" />

        {/* Filter cap (optional) */}
        <Junction x={150} y={100} />
        <Components.Capacitor x={120} y={100} value="100nF" label="C1" />
        <Wire points={[{ x: 150, y: 130 }, { x: 150, y: 165 }]} />

        {/* Ground */}
        <Wire points={[{ x: 100, y: 150 }, { x: 100, y: 165 }, { x: 150, y: 165 }]} />
        <Components.Ground x={125} y={175} />

        {/* Formula */}
        <rect x={200} y={130} width={130} height={50} rx={4} fill="rgba(0, 212, 255, 0.05)" stroke="rgba(0, 212, 255, 0.2)" strokeWidth={1} />
        <text x={265} y={148} fontSize={8} fill={colors.text} textAnchor="middle" fontFamily="JetBrains Mono">Vout = Vin x R2/(R1+R2)</text>
        <text x={265} y={162} fontSize={7} fill={colors.muted} textAnchor="middle">= Vin x 0.27</text>
        <text x={265} y={174} fontSize={7} fill="#00ffaa" textAnchor="middle">12V in = 3.24V out</text>
      </g>
    ),
  },

  // ============================================
  // OUTPUT CIRCUITS
  // ============================================

  'output-led-basic': {
    width: 320,
    height: 180,
    render: ({ animated }) => (
      <g>
        <Label x={160} y={20} text="LED with Current Limiting Resistor" size={11} />

        {/* GPIO */}
        <rect x={40} y={70} width={50} height={30} rx={3} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={65} y={90} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">GPIO</text>

        {/* Wire from GPIO */}
        {animated ? (
          <AnimatedWire points={[{ x: 90, y: 85 }, { x: 110, y: 85 }]} color={colors.gpio} speed={2} />
        ) : (
          <Wire points={[{ x: 90, y: 85 }, { x: 110, y: 85 }]} color={colors.gpio} />
        )}

        {/* Resistor */}
        <Components.Resistor x={110} y={85} value="330R" label="R1" horizontal glowing />

        {/* Wire to LED */}
        {animated ? (
          <AnimatedWire points={[{ x: 170, y: 85 }, { x: 190, y: 85 }]} speed={2} delay={0.3} />
        ) : (
          <Wire points={[{ x: 170, y: 85 }, { x: 190, y: 85 }]} />
        )}

        {/* LED */}
        <Components.LED x={190} y={85} color="#ef4444" label="LED1" horizontal glowing />

        {/* Ground */}
        {animated ? (
          <AnimatedWire points={[{ x: 250, y: 85 }, { x: 280, y: 85 }, { x: 280, y: 130 }]} speed={2} delay={0.6} />
        ) : (
          <Wire points={[{ x: 250, y: 85 }, { x: 280, y: 85 }, { x: 280, y: 130 }]} />
        )}
        <Components.Ground x={280} y={130} />

        {/* Calculation */}
        <text x={160} y={150} fontSize={7} fill={colors.muted} textAnchor="middle">R = (3.3V - 2.0V) / 10mA = 130R min</text>
        <text x={160} y={162} fontSize={7} fill={colors.muted} textAnchor="middle">Use 330R for ~4mA (safe, visible)</text>
      </g>
    ),
  },

  'output-led-pwm': {
    width: 360,
    height: 200,
    render: ({ animated }) => (
      <g>
        <Label x={180} y={20} text="LED PWM Dimming" size={11} />

        {/* ESP32 */}
        <rect x={40} y={75} width={70} height={50} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={75} y={95} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={75} y={110} fontSize={7} fill={colors.muted} textAnchor="middle">PWM CH0</text>

        {/* PWM wave visualization */}
        <g>
          <rect x={120} y={70} width={60} height={60} rx={4} fill="rgba(0, 212, 255, 0.05)" stroke="rgba(0, 212, 255, 0.3)" strokeWidth={1} />
          <text x={150} y={85} fontSize={6} fill={colors.wire} textAnchor="middle">PWM Signal</text>
          {/* PWM waveform */}
          <path d="M 130 115 L 130 95 L 140 95 L 140 115 L 150 115 L 150 95 L 160 95 L 160 115 L 170 115"
                fill="none" stroke={colors.wire} strokeWidth={1.5} />
          {animated && (
            <rect x={130} y={95} width={40} height={20} fill="rgba(0, 212, 255, 0.2)">
              <animate attributeName="x" values="130;140;130" dur="0.5s" repeatCount="indefinite" />
            </rect>
          )}
        </g>

        {/* Wire from PWM to resistor */}
        <Wire points={[{ x: 110, y: 100 }, { x: 120, y: 100 }]} color={colors.gpio} />
        <Wire points={[{ x: 180, y: 100 }, { x: 200, y: 100 }]} color={colors.gpio} />

        {/* Resistor */}
        <Components.Resistor x={200} y={100} value="220R" label="R1" horizontal />

        {/* Wire to LED */}
        <Wire points={[{ x: 260, y: 100 }, { x: 280, y: 100 }]} />

        {/* LED with variable brightness */}
        <g>
          <Components.LED x={280} y={100} color="#ef4444" label="LED" horizontal />
          {animated && (
            <circle cx={295} cy={100} r={15} fill="#ef4444" fillOpacity={0.3} style={{ filter: 'blur(8px)' }}>
              <animate attributeName="fill-opacity" values="0.1;0.6;0.1" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </g>

        {/* Ground */}
        <Wire points={[{ x: 340, y: 100 }, { x: 340, y: 150 }]} />
        <Components.Ground x={340} y={160} />

        {/* PWM info */}
        <text x={180} y={175} fontSize={7} fill={colors.muted} textAnchor="middle">Frequency: 5kHz | Resolution: 8-bit (0-255)</text>
        <text x={180} y={188} fontSize={6} fill="#00ffaa" textAnchor="middle">ledcWrite(channel, dutyCycle)</text>
      </g>
    ),
  },

  'output-relay': {
    width: 380,
    height: 240,
    render: ({ animated }) => (
      <g>
        <Label x={190} y={20} text="Relay Module Control" size={11} />

        {/* ESP32 */}
        <rect x={40} y={90} width={60} height={45} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={70} y={110} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={70} y={125} fontSize={7} fill={colors.muted} textAnchor="middle">GPIO26</text>

        {/* Signal wire */}
        {animated ? (
          <AnimatedWire points={[{ x: 100, y: 112 }, { x: 140, y: 112 }]} color={colors.gpio} speed={2} />
        ) : (
          <Wire points={[{ x: 100, y: 112 }, { x: 140, y: 112 }]} color={colors.gpio} />
        )}

        {/* Relay module */}
        <rect x={140} y={50} width={100} height={130} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.4))' }} />
        <text x={190} y={70} fontSize={9} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">RELAY</text>
        <text x={190} y={85} fontSize={7} fill={colors.muted} textAnchor="middle">Module</text>

        {/* Relay coil symbol */}
        <rect x={165} y={95} width={50} height={30} rx={2} fill="none" stroke={colors.wire} strokeWidth={1} />
        <text x={190} y={115} fontSize={7} fill={colors.wire} textAnchor="middle">COIL</text>

        {/* LED indicator */}
        <circle cx={155} cy={145} r={5} fill="#ef4444" fillOpacity={0.4} stroke="#ef4444" strokeWidth={1}>
          {animated && <animate attributeName="fill-opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />}
        </circle>
        <text x={155} y={160} fontSize={5} fill={colors.muted} textAnchor="middle">LED</text>

        {/* Module pin labels */}
        <text x={145} y={110} fontSize={6} fill={colors.muted}>IN</text>
        <text x={145} y={175} fontSize={6} fill={colors.muted}>GND</text>
        <text x={230} y={65} fontSize={6} fill={colors.muted} textAnchor="end">VCC</text>

        {/* 5V power */}
        <Wire points={[{ x: 225, y: 50 }, { x: 225, y: 35 }]} color={colors.power} />
        <Label x={225} y={30} text="5V" size={8} color={colors.power} />

        {/* Output contacts */}
        <rect x={260} y={80} width={90} height={80} rx={4} fill="rgba(239, 68, 68, 0.05)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth={1} />
        <text x={305} y={98} fontSize={7} fill={colors.power} textAnchor="middle">AC/DC Load</text>

        {/* Contact terminals */}
        <Wire points={[{ x: 240, y: 110 }, { x: 270, y: 110 }]} />
        <text x={275} y={113} fontSize={6} fill={colors.muted}>COM</text>
        <Wire points={[{ x: 240, y: 130 }, { x: 270, y: 130 }]} />
        <text x={275} y={133} fontSize={6} fill={colors.muted}>NO</text>
        <Wire points={[{ x: 240, y: 150 }, { x: 270, y: 150 }]} />
        <text x={275} y={153} fontSize={6} fill={colors.muted}>NC</text>

        {/* Load connection */}
        <Wire points={[{ x: 305, y: 110 }, { x: 340, y: 110 }]} color={colors.power} />
        <Wire points={[{ x: 305, y: 130 }, { x: 340, y: 130 }]} color={colors.power} />
        <text x={345} y={120} fontSize={7} fill={colors.muted}>Load</text>

        {/* Ground */}
        <Wire points={[{ x: 140, y: 170 }, { x: 70, y: 170 }, { x: 70, y: 200 }]} color={colors.ground} />
        <Components.Ground x={70} y={210} />

        {/* Warning */}
        <text x={190} y={225} fontSize={6} fill="#ef4444" textAnchor="middle">⚠ Active LOW: LOW = ON</text>
      </g>
    ),
  },

  'output-neopixel': {
    width: 380,
    height: 200,
    render: ({ animated }) => (
      <g>
        <Label x={190} y={20} text="WS2812B NeoPixel Connection" size={11} />

        {/* Power supply */}
        <Components.Power x={60} y={40} voltage="5V" />
        <Wire points={[{ x: 60, y: 55 }, { x: 60, y: 70 }]} color={colors.power} />

        {/* Bulk capacitor */}
        <Junction x={60} y={70} color={colors.power} />
        <Components.Capacitor x={30} y={70} value="1000uF" label="C1" polarized />
        <Wire points={[{ x: 60, y: 100 }, { x: 60, y: 150 }]} />

        {/* Power to LED strip */}
        <Wire points={[{ x: 60, y: 70 }, { x: 180, y: 70 }]} color={colors.power} />

        {/* LED Strip */}
        <rect x={180} y={50} width={140} height={80} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 170, 0.4))' }} />
        <text x={250} y={75} fontSize={9} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">WS2812B</text>
        <text x={250} y={90} fontSize={7} fill={colors.muted} textAnchor="middle">LED Strip</text>

        {/* RGB LEDs representation */}
        <circle cx={200} cy={110} r={8} fill="#ef4444" fillOpacity={0.6} stroke="#ef4444" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 4px #ef4444)' }} />
        <circle cx={225} cy={110} r={8} fill="#22c55e" fillOpacity={0.6} stroke="#22c55e" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 4px #22c55e)' }} />
        <circle cx={250} cy={110} r={8} fill="#3b82f6" fillOpacity={0.6} stroke="#3b82f6" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 4px #3b82f6)' }} />
        <circle cx={275} cy={110} r={8} fill="#eab308" fillOpacity={0.6} stroke="#eab308" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 4px #eab308)' }} />
        <circle cx={300} cy={110} r={8} fill="#a855f7" fillOpacity={0.6} stroke="#a855f7" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 4px #a855f7)' }} />

        {/* Labels */}
        <text x={185} y={65} fontSize={6} fill={colors.muted}>VCC</text>
        <text x={185} y={125} fontSize={6} fill={colors.muted}>DIN</text>
        <text x={315} y={125} fontSize={6} fill={colors.muted} textAnchor="end">GND</text>

        {/* ESP32 GPIO */}
        <rect x={40} y={100} width={50} height={25} rx={3} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={65} y={117} fontSize={7} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">GPIO16</text>

        {/* Data line with resistor */}
        <Wire points={[{ x: 90, y: 112 }, { x: 100, y: 112 }]} color={colors.gpio} />
        <Components.Resistor x={100} y={112} value="330R" horizontal />
        {animated ? (
          <AnimatedWire points={[{ x: 160, y: 112 }, { x: 180, y: 112 }]} color="#00ffaa" speed={1.5} />
        ) : (
          <Wire points={[{ x: 160, y: 112 }, { x: 180, y: 112 }]} color="#00ffaa" />
        )}

        {/* Ground connections */}
        <Wire points={[{ x: 320, y: 112 }, { x: 340, y: 112 }, { x: 340, y: 150 }]} color={colors.ground} />
        <Wire points={[{ x: 60, y: 150 }, { x: 340, y: 150 }]} color={colors.ground} />
        <Junction x={60} y={150} color={colors.ground} />
        <Components.Ground x={200} y={165} />
      </g>
    ),
  },

  'output-mosfet': {
    width: 380,
    height: 240,
    render: ({ animated }) => (
      <g>
        <Label x={190} y={20} text="MOSFET High-Current Switching" size={11} />

        {/* External power */}
        <Label x={280} y={45} text="+12V" size={9} color={colors.power} />
        <Wire points={[{ x: 280, y: 50 }, { x: 280, y: 70 }]} color={colors.power} />

        {/* Load */}
        <rect x={250} y={70} width={60} height={40} rx={3} fill="#1a2332" stroke={colors.wire} strokeWidth={2} />
        <text x={280} y={92} fontSize={8} fontFamily="JetBrains Mono" fill={colors.wire} textAnchor="middle">LOAD</text>
        <text x={280} y={105} fontSize={6} fill={colors.muted} textAnchor="middle">(Motor/LED)</text>

        {/* From load to MOSFET drain */}
        <Wire points={[{ x: 280, y: 110 }, { x: 280, y: 130 }]} />

        {/* MOSFET */}
        <g style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.5))' }}>
          <circle cx={280} cy={160} r={25} fill="none" stroke="#00ffaa" strokeWidth={1} />
          {/* Gate */}
          <line x1={230} y1={160} x2={255} y2={160} stroke={colors.wire} strokeWidth={2} />
          <line x1={260} y1={145} x2={260} y2={175} stroke="#00ffaa" strokeWidth={2} />
          {/* Channel */}
          <line x1={268} y1={145} x2={268} y2={175} stroke="#00ffaa" strokeWidth={3} />
          {/* Drain */}
          <line x1={268} y1={145} x2={280} y2={145} stroke="#00ffaa" strokeWidth={2} />
          <line x1={280} y1={130} x2={280} y2={145} stroke={colors.wire} strokeWidth={2} />
          {/* Source */}
          <line x1={268} y1={175} x2={280} y2={175} stroke="#00ffaa" strokeWidth={2} />
          <line x1={280} y1={175} x2={280} y2={200} stroke={colors.wire} strokeWidth={2} />
          {/* Arrow */}
          <polygon points="275,168 280,175 275,175" fill="#00ffaa" />
          {/* Labels */}
          <text x={295} y={140} fontSize={6} fill={colors.muted}>D</text>
          <text x={240} y={158} fontSize={6} fill={colors.muted}>G</text>
          <text x={295} y={180} fontSize={6} fill={colors.muted}>S</text>
        </g>

        {/* ESP32 */}
        <rect x={40} y={145} width={50} height={30} rx={3} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={65} y={165} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">GPIO</text>

        {/* Gate resistor */}
        <Wire points={[{ x: 90, y: 160 }, { x: 110, y: 160 }]} color={colors.gpio} />
        <Components.Resistor x={110} y={160} value="100R" horizontal />
        {animated ? (
          <AnimatedWire points={[{ x: 170, y: 160 }, { x: 230, y: 160 }]} speed={2} />
        ) : (
          <Wire points={[{ x: 170, y: 160 }, { x: 230, y: 160 }]} />
        )}

        {/* Gate pulldown */}
        <Junction x={200} y={160} />
        <Components.Resistor x={170} y={160} value="10K" label="Pull-down" />
        <Wire points={[{ x: 200, y: 190 }, { x: 200, y: 210 }]} />

        {/* Ground rail */}
        <Wire points={[{ x: 100, y: 210 }, { x: 280, y: 210 }]} color={colors.ground} />
        <Wire points={[{ x: 280, y: 200 }, { x: 280, y: 210 }]} color={colors.ground} />
        <Junction x={200} y={210} color={colors.ground} />
        <Junction x={280} y={210} color={colors.ground} />
        <Components.Ground x={190} y={225} />

        {/* MOSFET label */}
        <text x={320} y={160} fontSize={7} fill={colors.muted}>IRLZ44N</text>
        <text x={320} y={172} fontSize={6} fill={colors.muted}>(Logic Level)</text>
      </g>
    ),
  },

  // ============================================
  // COMMUNICATION CIRCUITS
  // ============================================

  'comm-i2c': {
    width: 400,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={200} y={20} text="I2C Bus with Pull-up Resistors" size={11} />

        {/* 3.3V Rail */}
        <Wire points={[{ x: 50, y: 50 }, { x: 350, y: 50 }]} color={colors.power} />
        <Label x={40} y={55} text="3.3V" size={8} color={colors.power} anchor="end" />

        {/* SDA Pull-up */}
        <Junction x={120} y={50} color={colors.power} />
        <Components.Resistor x={90} y={50} value="4.7K" label="R1" />
        <Wire points={[{ x: 120, y: 80 }, { x: 120, y: 100 }]} />

        {/* SCL Pull-up */}
        <Junction x={200} y={50} color={colors.power} />
        <Components.Resistor x={170} y={50} value="4.7K" label="R2" />
        <Wire points={[{ x: 200, y: 80 }, { x: 200, y: 100 }]} />

        {/* SDA Bus */}
        <Wire points={[{ x: 50, y: 100 }, { x: 350, y: 100 }]} color="#f59e0b" />
        <Label x={40} y={105} text="SDA" size={8} color="#f59e0b" anchor="end" />
        <Junction x={120} y={100} color="#f59e0b" />

        {/* SCL Bus */}
        <Wire points={[{ x: 50, y: 130 }, { x: 350, y: 130 }]} color="#10b981" />
        <Label x={40} y={135} text="SCL" size={8} color="#10b981" anchor="end" />
        <Junction x={200} y={130} color="#10b981" />

        {/* ESP32 */}
        <rect x={70} y={150} width={60} height={50} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={100} y={175} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={80} y={160} fontSize={6} fill={colors.muted}>21</text>
        <text x={120} y={160} fontSize={6} fill={colors.muted} textAnchor="end">22</text>

        {/* ESP32 connections */}
        <Wire points={[{ x: 85, y: 150 }, { x: 85, y: 100 }]} color="#f59e0b" />
        <Wire points={[{ x: 115, y: 150 }, { x: 115, y: 130 }]} color="#10b981" />
        <Junction x={85} y={100} color="#f59e0b" />
        <Junction x={115} y={130} color="#10b981" />

        {/* Device 1 */}
        <rect x={180} y={150} width={60} height={50} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} />
        <text x={210} y={172} fontSize={7} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">OLED</text>
        <text x={210} y={185} fontSize={6} fill={colors.muted} textAnchor="middle">0x3C</text>

        <Wire points={[{ x: 195, y: 150 }, { x: 195, y: 100 }]} color="#f59e0b" />
        <Wire points={[{ x: 225, y: 150 }, { x: 225, y: 130 }]} color="#10b981" />
        <Junction x={195} y={100} color="#f59e0b" />
        <Junction x={225} y={130} color="#10b981" />

        {/* Device 2 */}
        <rect x={290} y={150} width={60} height={50} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} />
        <text x={320} y={172} fontSize={7} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">BME280</text>
        <text x={320} y={185} fontSize={6} fill={colors.muted} textAnchor="middle">0x76</text>

        <Wire points={[{ x: 305, y: 150 }, { x: 305, y: 100 }]} color="#f59e0b" />
        <Wire points={[{ x: 335, y: 150 }, { x: 335, y: 130 }]} color="#10b981" />
        <Junction x={305} y={100} color="#f59e0b" />
        <Junction x={335} y={130} color="#10b981" />

        {/* Animated data */}
        {animated && (
          <>
            <circle r={3} fill="#f59e0b" style={{ filter: 'drop-shadow(0 0 4px #f59e0b)' }}>
              <animateMotion dur="2s" repeatCount="indefinite" path="M 85 100 L 305 100" />
            </circle>
            <circle r={3} fill="#10b981" style={{ filter: 'drop-shadow(0 0 4px #10b981)' }}>
              <animateMotion dur="2s" repeatCount="indefinite" path="M 335 130 L 115 130" begin="0.5s" />
            </circle>
          </>
        )}
      </g>
    ),
  },

  'comm-spi': {
    width: 420,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={210} y={20} text="SPI Bus with Multiple Devices" size={11} />

        {/* ESP32 */}
        <rect x={40} y={70} width={80} height={100} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} style={{ filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' }} />
        <text x={80} y={95} fontSize={9} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={80} y={115} fontSize={6} fill={colors.muted} textAnchor="middle">VSPI</text>

        {/* Pin labels */}
        <text x={115} y={90} fontSize={6} fill={colors.muted}>MOSI (23)</text>
        <text x={115} y={105} fontSize={6} fill={colors.muted}>MISO (19)</text>
        <text x={115} y={120} fontSize={6} fill={colors.muted}>CLK (18)</text>
        <text x={115} y={140} fontSize={6} fill={colors.muted}>CS1 (5)</text>
        <text x={115} y={155} fontSize={6} fill={colors.muted}>CS2 (15)</text>

        {/* SPI bus lines */}
        {animated ? (
          <>
            <AnimatedWire points={[{ x: 120, y: 85 }, { x: 380, y: 85 }]} color="#ef4444" speed={3} />
            <AnimatedWire points={[{ x: 120, y: 100 }, { x: 380, y: 100 }]} color="#22c55e" speed={3} delay={0.5} />
          </>
        ) : (
          <>
            <Wire points={[{ x: 120, y: 85 }, { x: 380, y: 85 }]} color="#ef4444" />
            <Wire points={[{ x: 120, y: 100 }, { x: 380, y: 100 }]} color="#22c55e" />
          </>
        )}
        <Wire points={[{ x: 120, y: 115 }, { x: 380, y: 115 }]} color="#f59e0b" />

        {/* Bus labels */}
        <text x={385} y={88} fontSize={6} fill="#ef4444">MOSI</text>
        <text x={385} y={103} fontSize={6} fill="#22c55e">MISO</text>
        <text x={385} y={118} fontSize={6} fill="#f59e0b">CLK</text>

        {/* Device 1 - SD Card */}
        <rect x={200} y={140} width={70} height={50} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} />
        <text x={235} y={162} fontSize={7} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">SD Card</text>
        <text x={235} y={178} fontSize={6} fill={colors.muted} textAnchor="middle">CS: GPIO5</text>

        {/* CS1 line */}
        <Wire points={[{ x: 120, y: 137 }, { x: 235, y: 137 }, { x: 235, y: 140 }]} color="#a855f7" />
        <Junction x={235} y={85} color="#ef4444" />
        <Junction x={235} y={100} color="#22c55e" />
        <Junction x={235} y={115} color="#f59e0b" />
        <Wire points={[{ x: 235, y: 85 }, { x: 235, y: 140 }]} color={colors.muted} strokeDasharray="2,2" />

        {/* Device 2 - Display */}
        <rect x={310} y={140} width={70} height={50} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} />
        <text x={345} y={162} fontSize={7} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">Display</text>
        <text x={345} y={178} fontSize={6} fill={colors.muted} textAnchor="middle">CS: GPIO15</text>

        {/* CS2 line */}
        <Wire points={[{ x: 120, y: 152 }, { x: 160, y: 152 }, { x: 160, y: 200 }, { x: 345, y: 200 }, { x: 345, y: 190 }]} color="#ec4899" />
        <Junction x={345} y={85} color="#ef4444" />
        <Junction x={345} y={100} color="#22c55e" />
        <Junction x={345} y={115} color="#f59e0b" />
        <Wire points={[{ x: 345, y: 85 }, { x: 345, y: 140 }]} color={colors.muted} strokeDasharray="2,2" />

        {/* Note */}
        <text x={210} y={212} fontSize={6} fill={colors.muted} textAnchor="middle">CS pins select which device is active (LOW = selected)</text>
      </g>
    ),
  },

  'comm-uart-level-shift': {
    width: 400,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={200} y={20} text="UART Level Shifting (3.3V ↔ 5V)" size={11} />

        {/* ESP32 */}
        <rect x={40} y={80} width={70} height={60} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={75} y={105} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={75} y={120} fontSize={6} fill={colors.muted} textAnchor="middle">3.3V Logic</text>

        {/* ESP32 pin labels */}
        <text x={105} y={95} fontSize={6} fill={colors.muted}>TX (17)</text>
        <text x={105} y={125} fontSize={6} fill={colors.muted}>RX (16)</text>

        {/* Level shifter */}
        <rect x={160} y={60} width={80} height={100} rx={4} fill="#1a2332" stroke="#f59e0b" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.4))' }} />
        <text x={200} y={85} fontSize={8} fontFamily="JetBrains Mono" fill="#f59e0b" textAnchor="middle">Level</text>
        <text x={200} y={100} fontSize={8} fontFamily="JetBrains Mono" fill="#f59e0b" textAnchor="middle">Shifter</text>
        <text x={200} y={115} fontSize={6} fill={colors.muted} textAnchor="middle">BSS138</text>

        {/* LV/HV labels */}
        <text x={165} y={75} fontSize={5} fill={colors.muted}>LV</text>
        <text x={230} y={75} fontSize={5} fill={colors.muted} textAnchor="end">HV</text>
        <text x={165} y={155} fontSize={5} fill={colors.muted}>3.3V</text>
        <text x={230} y={155} fontSize={5} fill={colors.muted} textAnchor="end">5V</text>

        {/* TX path */}
        {animated ? (
          <>
            <AnimatedWire points={[{ x: 110, y: 90 }, { x: 160, y: 90 }]} color={colors.gpio} speed={2} />
            <AnimatedWire points={[{ x: 240, y: 90 }, { x: 290, y: 90 }]} color={colors.power} speed={2} delay={0.3} />
          </>
        ) : (
          <>
            <Wire points={[{ x: 110, y: 90 }, { x: 160, y: 90 }]} color={colors.gpio} />
            <Wire points={[{ x: 240, y: 90 }, { x: 290, y: 90 }]} color={colors.power} />
          </>
        )}

        {/* RX path with voltage divider */}
        <Wire points={[{ x: 110, y: 125 }, { x: 130, y: 125 }]} color={colors.gpio} />
        <Junction x={130} y={125} />

        {/* Voltage divider */}
        <Wire points={[{ x: 130, y: 125 }, { x: 130, y: 140 }]} />
        <Components.Resistor x={100} y={140} value="2K" label="R2" />
        <Wire points={[{ x: 130, y: 170 }, { x: 130, y: 190 }]} />

        <Wire points={[{ x: 130, y: 125 }, { x: 145, y: 125 }]} />
        <Components.Resistor x={145} y={95} value="1K" label="R1" />
        {animated ? (
          <AnimatedWire points={[{ x: 145, y: 125 }, { x: 290, y: 125 }]} color={colors.power} speed={2} delay={0.6} />
        ) : (
          <Wire points={[{ x: 145, y: 125 }, { x: 290, y: 125 }]} color={colors.power} />
        )}

        {/* 5V Device */}
        <rect x={290} y={80} width={70} height={60} rx={4} fill="#1a2332" stroke={colors.power} strokeWidth={2} />
        <text x={325} y={105} fontSize={8} fontFamily="JetBrains Mono" fill={colors.power} textAnchor="middle">5V</text>
        <text x={325} y={120} fontSize={6} fill={colors.muted} textAnchor="middle">Device</text>

        {/* Device pin labels */}
        <text x={285} y={93} fontSize={6} fill={colors.muted} textAnchor="end">RX</text>
        <text x={285} y={128} fontSize={6} fill={colors.muted} textAnchor="end">TX</text>

        {/* Ground */}
        <Wire points={[{ x: 130, y: 190 }, { x: 200, y: 190 }]} color={colors.ground} />
        <Components.Ground x={165} y={205} />

        {/* Voltage divider note */}
        <rect x={40} y={175} width={80} height={30} rx={3} fill="rgba(0, 212, 255, 0.05)" stroke="rgba(0, 212, 255, 0.2)" strokeWidth={1} />
        <text x={80} y={190} fontSize={5} fill={colors.wire} textAnchor="middle">5V × 2K/(1K+2K)</text>
        <text x={80} y={200} fontSize={5} fill={colors.muted} textAnchor="middle">= 3.3V</text>
      </g>
    ),
  },

  'comm-sd-card': {
    width: 400,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={200} y={20} text="MicroSD Card (SPI Mode)" size={11} />

        {/* ESP32 */}
        <rect x={40} y={70} width={80} height={90} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} style={{ filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' }} />
        <text x={80} y={95} fontSize={9} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={80} y={110} fontSize={6} fill={colors.muted} textAnchor="middle">VSPI</text>

        {/* Pin labels */}
        <text x={115} y={90} fontSize={6} fill={colors.muted}>GPIO23</text>
        <text x={115} y={105} fontSize={6} fill={colors.muted}>GPIO19</text>
        <text x={115} y={120} fontSize={6} fill={colors.muted}>GPIO18</text>
        <text x={115} y={140} fontSize={6} fill={colors.muted}>GPIO5</text>

        {/* SPI lines */}
        {animated ? (
          <>
            <AnimatedWire points={[{ x: 120, y: 87 }, { x: 220, y: 87 }]} color="#ef4444" speed={2.5} />
            <AnimatedWire points={[{ x: 120, y: 102 }, { x: 220, y: 102 }]} color="#22c55e" speed={2.5} delay={0.3} />
          </>
        ) : (
          <>
            <Wire points={[{ x: 120, y: 87 }, { x: 220, y: 87 }]} color="#ef4444" />
            <Wire points={[{ x: 120, y: 102 }, { x: 220, y: 102 }]} color="#22c55e" />
          </>
        )}
        <Wire points={[{ x: 120, y: 117 }, { x: 220, y: 117 }]} color="#f59e0b" />
        <Wire points={[{ x: 120, y: 137 }, { x: 220, y: 137 }]} color="#a855f7" />

        {/* MicroSD Module */}
        <rect x={220} y={55} width={130} height={110} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 170, 0.4))' }} />
        <text x={285} y={80} fontSize={9} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">MicroSD</text>
        <text x={285} y={95} fontSize={7} fill={colors.muted} textAnchor="middle">Module</text>

        {/* SD card slot representation */}
        <rect x={250} y={105} width={70} height={45} rx={2} fill="#0a0e17" stroke={colors.muted} strokeWidth={1} />
        <rect x={255} y={110} width={60} height={35} rx={1} fill="rgba(0, 255, 170, 0.1)" stroke="#00ffaa" strokeWidth={1} />
        <text x={285} y={132} fontSize={7} fill="#00ffaa" textAnchor="middle">SD</text>

        {/* Module pin labels */}
        <text x={225} y={90} fontSize={5} fill="#ef4444">MOSI</text>
        <text x={225} y={105} fontSize={5} fill="#22c55e">MISO</text>
        <text x={225} y={120} fontSize={5} fill="#f59e0b">SCK</text>
        <text x={225} y={140} fontSize={5} fill="#a855f7">CS</text>
        <text x={225} y={160} fontSize={5} fill={colors.power}>VCC</text>
        <text x={345} y={160} fontSize={5} fill={colors.ground} textAnchor="end">GND</text>

        {/* Power */}
        <Wire points={[{ x: 220, y: 157 }, { x: 180, y: 157 }, { x: 180, y: 50 }]} color={colors.power} />
        <Label x={180} y={45} text="3.3V" size={7} color={colors.power} />

        {/* Ground */}
        <Wire points={[{ x: 340, y: 157 }, { x: 360, y: 157 }, { x: 360, y: 190 }]} color={colors.ground} />
        <Components.Ground x={360} y={200} />

        {/* Info */}
        <text x={80} y={185} fontSize={6} fill={colors.muted}>FAT32 formatted</text>
        <text x={80} y={197} fontSize={6} fill={colors.muted}>Max 32GB recommended</text>
      </g>
    ),
  },

  // ============================================
  // SENSOR CIRCUITS
  // ============================================

  'sensor-dht22': {
    width: 350,
    height: 200,
    render: ({ animated }) => (
      <g>
        <Label x={175} y={20} text="DHT22 Temperature & Humidity Sensor" size={11} />

        {/* DHT22 Sensor */}
        <rect x={180} y={50} width={80} height={100} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 170, 0.4))' }} />
        <text x={220} y={80} fontSize={10} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">DHT22</text>

        {/* Pins */}
        <text x={190} y={120} fontSize={6} fill={colors.muted}>1</text>
        <text x={205} y={120} fontSize={6} fill={colors.muted}>2</text>
        <text x={220} y={120} fontSize={6} fill={colors.muted}>3</text>
        <text x={235} y={120} fontSize={6} fill={colors.muted}>4</text>

        {/* Pin wires */}
        <Wire points={[{ x: 192, y: 130 }, { x: 192, y: 150 }]} color={colors.power} />
        <Wire points={[{ x: 207, y: 130 }, { x: 207, y: 150 }]} />
        <Wire points={[{ x: 237, y: 130 }, { x: 237, y: 150 }]} color={colors.ground} />

        {/* Pin labels */}
        <text x={192} y={165} fontSize={6} fill={colors.power} textAnchor="middle">VCC</text>
        <text x={207} y={165} fontSize={6} fill={colors.wire} textAnchor="middle">DATA</text>
        <text x={222} y={165} fontSize={6} fill={colors.muted} textAnchor="middle">NC</text>
        <text x={237} y={165} fontSize={6} fill={colors.ground} textAnchor="middle">GND</text>

        {/* 3.3V */}
        <Wire points={[{ x: 192, y: 150 }, { x: 192, y: 180 }, { x: 80, y: 180 }, { x: 80, y: 80 }]} color={colors.power} />
        <Components.Power x={80} y={65} voltage="3.3V" />

        {/* Pull-up resistor */}
        <Junction x={207} y={80} />
        <Wire points={[{ x: 207, y: 80 }, { x: 130, y: 80 }]} color={colors.power} />
        <Junction x={130} y={80} color={colors.power} />
        <Components.Resistor x={130} y={50} value="10K" label="R1" />

        {/* Data to GPIO */}
        {animated ? (
          <AnimatedWire points={[{ x: 207, y: 150 }, { x: 207, y: 170 }, { x: 300, y: 170 }]} color={colors.gpio} speed={2} />
        ) : (
          <Wire points={[{ x: 207, y: 150 }, { x: 207, y: 170 }, { x: 300, y: 170 }]} color={colors.gpio} />
        )}
        <Label x={310} y={175} text="GPIO14" size={8} color={colors.gpio} anchor="start" />

        {/* Ground */}
        <Wire points={[{ x: 237, y: 150 }, { x: 237, y: 180 }, { x: 280, y: 180 }]} color={colors.ground} />
        <Components.Ground x={280} y={190} />
      </g>
    ),
  },

  'sensor-bme280': {
    width: 380,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={190} y={20} text="BME280 Environment Sensor (I2C)" size={11} />

        {/* 3.3V Power */}
        <Components.Power x={60} y={40} voltage="3.3V" />
        <Wire points={[{ x: 60, y: 55 }, { x: 60, y: 75 }]} color={colors.power} />

        {/* Power rail */}
        <Wire points={[{ x: 60, y: 75 }, { x: 200, y: 75 }]} color={colors.power} />
        <Junction x={100} y={75} color={colors.power} />
        <Junction x={140} y={75} color={colors.power} />

        {/* Pull-up resistors */}
        <Components.Resistor x={70} y={75} value="4.7K" label="SDA" />
        <Components.Resistor x={110} y={75} value="4.7K" label="SCL" />
        <Wire points={[{ x: 100, y: 105 }, { x: 100, y: 120 }]} />
        <Wire points={[{ x: 140, y: 105 }, { x: 140, y: 135 }]} />

        {/* I2C Bus lines */}
        <Wire points={[{ x: 60, y: 120 }, { x: 280, y: 120 }]} color="#f59e0b" />
        <Wire points={[{ x: 60, y: 135 }, { x: 280, y: 135 }]} color="#10b981" />
        <Junction x={100} y={120} color="#f59e0b" />
        <Junction x={140} y={135} color="#10b981" />

        <text x={55} y={123} fontSize={6} fill="#f59e0b" textAnchor="end">SDA</text>
        <text x={55} y={138} fontSize={6} fill="#10b981" textAnchor="end">SCL</text>

        {/* ESP32 */}
        <rect x={40} y={150} width={70} height={50} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={75} y={175} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={50} y={165} fontSize={6} fill={colors.muted}>21</text>
        <text x={100} y={165} fontSize={6} fill={colors.muted} textAnchor="end">22</text>

        <Wire points={[{ x: 55, y: 150 }, { x: 55, y: 120 }]} color="#f59e0b" />
        <Wire points={[{ x: 95, y: 150 }, { x: 95, y: 135 }]} color="#10b981" />
        <Junction x={55} y={120} color="#f59e0b" />
        <Junction x={95} y={135} color="#10b981" />

        {/* BME280 Module */}
        <rect x={200} y={90} width={100} height={80} rx={4} fill="#1a2332" stroke="#00ffaa" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 170, 0.4))' }} />
        <text x={250} y={115} fontSize={10} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">BME280</text>
        <text x={250} y={130} fontSize={6} fill={colors.muted} textAnchor="middle">Temp/Hum/Press</text>

        {/* Module pins */}
        <text x={205} y={150} fontSize={5} fill={colors.muted}>VIN</text>
        <text x={225} y={150} fontSize={5} fill={colors.muted}>GND</text>
        <text x={250} y={150} fontSize={5} fill={colors.muted}>SDA</text>
        <text x={280} y={150} fontSize={5} fill={colors.muted}>SCL</text>

        {/* Module connections */}
        <Wire points={[{ x: 210, y: 155 }, { x: 210, y: 75 }]} color={colors.power} />
        <Junction x={210} y={75} color={colors.power} />
        <Wire points={[{ x: 230, y: 155 }, { x: 230, y: 185 }]} color={colors.ground} />
        <Wire points={[{ x: 255, y: 155 }, { x: 255, y: 120 }]} color="#f59e0b" />
        <Junction x={255} y={120} color="#f59e0b" />
        <Wire points={[{ x: 280, y: 155 }, { x: 280, y: 135 }]} color="#10b981" />
        <Junction x={280} y={135} color="#10b981" />

        {/* Ground */}
        <Wire points={[{ x: 230, y: 185 }, { x: 150, y: 185 }]} color={colors.ground} />
        <Components.Ground x={190} y={200} />

        {/* I2C Address */}
        <rect x={310} y={100} width={60} height={55} rx={4} fill="rgba(0, 255, 170, 0.05)" stroke="rgba(0, 255, 170, 0.2)" strokeWidth={1} />
        <text x={340} y={118} fontSize={7} fill="#00ffaa" textAnchor="middle">I2C Addr</text>
        <text x={340} y={133} fontSize={8} fontFamily="JetBrains Mono" fill={colors.text} textAnchor="middle">0x76</text>
        <text x={340} y={148} fontSize={6} fill={colors.muted} textAnchor="middle">(or 0x77)</text>

        {/* Animated data */}
        {animated && (
          <circle r={3} fill="#f59e0b" style={{ filter: 'drop-shadow(0 0 4px #f59e0b)' }}>
            <animateMotion dur="2s" repeatCount="indefinite" path="M 255 120 L 55 120" />
          </circle>
        )}
      </g>
    ),
  },

  'sensor-pir': {
    width: 360,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={180} y={20} text="PIR Motion Sensor (HC-SR501)" size={11} />

        {/* 5V Power */}
        <Components.Power x={80} y={40} voltage="5V" />
        <Wire points={[{ x: 80, y: 55 }, { x: 80, y: 80 }]} color={colors.power} />

        {/* PIR Module */}
        <g style={{ filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))' }}>
          <rect x={150} y={50} width={100} height={90} rx={4} fill="#1a2332" stroke="#ef4444" strokeWidth={2} />

          {/* Fresnel lens */}
          <circle cx={200} cy={85} r={25} fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth={1} />
          <circle cx={200} cy={85} r={15} fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth={1} />

          {animated && (
            <>
              <circle cx={200} cy={85} r={25} fill="none" stroke="#ef4444" strokeWidth={1}>
                <animate attributeName="r" values="25;35;25" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          <text x={200} y={120} fontSize={8} fontFamily="JetBrains Mono" fill="#ef4444" textAnchor="middle">HC-SR501</text>

          {/* Module pin labels */}
          <text x={160} y={145} fontSize={6} fill={colors.muted}>VCC</text>
          <text x={200} y={145} fontSize={6} fill={colors.muted} textAnchor="middle">OUT</text>
          <text x={240} y={145} fontSize={6} fill={colors.muted} textAnchor="end">GND</text>
        </g>

        {/* Power connection */}
        <Wire points={[{ x: 80, y: 80 }, { x: 165, y: 80 }, { x: 165, y: 140 }]} color={colors.power} />

        {/* Output to GPIO */}
        <Wire points={[{ x: 200, y: 140 }, { x: 200, y: 160 }]} />
        {animated ? (
          <AnimatedWire points={[{ x: 200, y: 160 }, { x: 290, y: 160 }]} color={colors.gpio} speed={2} />
        ) : (
          <Wire points={[{ x: 200, y: 160 }, { x: 290, y: 160 }]} color={colors.gpio} />
        )}

        {/* ESP32 */}
        <rect x={290} y={140} width={60} height={45} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={320} y={160} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={320} y={175} fontSize={6} fill={colors.muted} textAnchor="middle">GPIO27</text>

        {/* Ground */}
        <Wire points={[{ x: 235, y: 140 }, { x: 235, y: 190 }]} color={colors.ground} />
        <Wire points={[{ x: 235, y: 190 }, { x: 140, y: 190 }]} color={colors.ground} />
        <Components.Ground x={185} y={205} />

        {/* Info box */}
        <rect x={40} y={155} width={95} height={50} rx={4} fill="rgba(239, 68, 68, 0.05)" stroke="rgba(239, 68, 68, 0.2)" strokeWidth={1} />
        <text x={87} y={172} fontSize={6} fill="#ef4444" textAnchor="middle">Output: 3.3V</text>
        <text x={87} y={185} fontSize={6} fill={colors.muted} textAnchor="middle">(ESP32 safe)</text>
        <text x={87} y={198} fontSize={6} fill={colors.muted} textAnchor="middle">Warm-up: 30s</text>
      </g>
    ),
  },

  'sensor-ultrasonic': {
    width: 400,
    height: 240,
    render: ({ animated }) => (
      <g>
        <Label x={200} y={20} text="HC-SR04 Ultrasonic Distance Sensor" size={11} />

        {/* 5V Power */}
        <Components.Power x={60} y={45} voltage="5V" />
        <Wire points={[{ x: 60, y: 60 }, { x: 60, y: 75 }]} color={colors.power} />

        {/* HC-SR04 Module */}
        <rect x={140} y={50} width={120} height={80} rx={4} fill="#1a2332" stroke="#00d4ff" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.4))' }} />

        {/* Ultrasonic transducers */}
        <circle cx={170} cy={85} r={18} fill="rgba(0, 212, 255, 0.1)" stroke="#00d4ff" strokeWidth={2} />
        <circle cx={170} cy={85} r={10} fill="rgba(0, 212, 255, 0.2)" />
        <circle cx={230} cy={85} r={18} fill="rgba(0, 212, 255, 0.1)" stroke="#00d4ff" strokeWidth={2} />
        <circle cx={230} cy={85} r={10} fill="rgba(0, 212, 255, 0.2)" />

        <text x={170} y={110} fontSize={5} fill={colors.muted} textAnchor="middle">TX</text>
        <text x={230} y={110} fontSize={5} fill={colors.muted} textAnchor="middle">RX</text>

        <text x={200} y={125} fontSize={8} fontFamily="JetBrains Mono" fill="#00d4ff" textAnchor="middle">HC-SR04</text>

        {/* Sound wave animation */}
        {animated && (
          <>
            <circle cx={170} cy={85} r={18} fill="none" stroke="#00d4ff" strokeWidth={1}>
              <animate attributeName="r" values="18;40;18" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Pin labels */}
        <text x={150} y={138} fontSize={5} fill={colors.muted}>VCC</text>
        <text x={175} y={138} fontSize={5} fill={colors.muted}>TRIG</text>
        <text x={205} y={138} fontSize={5} fill={colors.muted}>ECHO</text>
        <text x={240} y={138} fontSize={5} fill={colors.muted}>GND</text>

        {/* Power connection */}
        <Wire points={[{ x: 60, y: 75 }, { x: 155, y: 75 }, { x: 155, y: 130 }]} color={colors.power} />

        {/* Trigger connection */}
        <Wire points={[{ x: 180, y: 130 }, { x: 180, y: 155 }]} />
        <Wire points={[{ x: 180, y: 155 }, { x: 290, y: 155 }]} color={colors.gpio} />
        <text x={235} y={150} fontSize={6} fill={colors.muted}>TRIG → GPIO5</text>

        {/* Echo with voltage divider */}
        <Wire points={[{ x: 210, y: 130 }, { x: 210, y: 170 }]} />
        <Junction x={210} y={170} />

        {/* Voltage divider */}
        <Wire points={[{ x: 210, y: 170 }, { x: 230, y: 170 }]} />
        <Components.Resistor x={230} y={140} value="1K" label="R1" />
        <Wire points={[{ x: 230, y: 170 }, { x: 265, y: 170 }]} />
        <Junction x={265} y={170} />

        <Components.Resistor x={265} y={140} value="2K" label="R2" />
        <Wire points={[{ x: 265, y: 200 }, { x: 265, y: 215 }]} />

        {/* Echo to GPIO */}
        {animated ? (
          <AnimatedWire points={[{ x: 265, y: 170 }, { x: 290, y: 170 }]} color={colors.gpio} speed={2} />
        ) : (
          <Wire points={[{ x: 265, y: 170 }, { x: 290, y: 170 }]} color={colors.gpio} />
        )}
        <text x={277} y={182} fontSize={6} fill={colors.muted}>GPIO18</text>

        {/* ESP32 */}
        <rect x={290} y={145} width={70} height={55} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={325} y={170} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={325} y={185} fontSize={6} fill={colors.muted} textAnchor="middle">3.3V Logic</text>

        {/* Ground */}
        <Wire points={[{ x: 245, y: 130 }, { x: 245, y: 215 }]} color={colors.ground} />
        <Wire points={[{ x: 245, y: 215 }, { x: 200, y: 215 }]} color={colors.ground} />
        <Junction x={265} y={215} color={colors.ground} />
        <Components.Ground x={220} y={225} />

        {/* Voltage divider note */}
        <rect x={40} y={170} width={90} height={50} rx={4} fill="rgba(239, 68, 68, 0.05)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth={1} />
        <text x={85} y={188} fontSize={6} fill="#ef4444" textAnchor="middle">ECHO is 5V!</text>
        <text x={85} y={200} fontSize={5} fill={colors.muted} textAnchor="middle">Divider: 5V × 2K/3K</text>
        <text x={85} y={212} fontSize={5} fill="#00ffaa" textAnchor="middle">= 3.3V (safe)</text>
      </g>
    ),
  },

  'display-oled-ssd1306': {
    width: 380,
    height: 220,
    render: ({ animated }) => (
      <g>
        <Label x={190} y={20} text="SSD1306 OLED Display (I2C)" size={11} />

        {/* 3.3V Rail */}
        <Components.Power x={60} y={40} voltage="3.3V" />
        <Wire points={[{ x: 60, y: 55 }, { x: 60, y: 80 }]} color={colors.power} />

        {/* OLED Display */}
        <rect x={180} y={50} width={120} height={90} rx={4} fill="#0a0e17" stroke="#00d4ff" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))' }} />

        {/* Screen area */}
        <rect x={195} y={60} width={90} height={50} rx={2} fill="#000" stroke="#00d4ff" strokeWidth={1} />

        {/* Sample text on screen */}
        <text x={240} y={80} fontSize={8} fontFamily="JetBrains Mono" fill="#00d4ff" textAnchor="middle">Hello</text>
        <text x={240} y={95} fontSize={6} fontFamily="JetBrains Mono" fill="#00ffaa" textAnchor="middle">ESP32!</text>

        <text x={240} y={130} fontSize={8} fontFamily="JetBrains Mono" fill="#00d4ff" textAnchor="middle">SSD1306</text>

        {/* Pin labels */}
        <text x={195} y={148} fontSize={6} fill={colors.muted}>VCC</text>
        <text x={220} y={148} fontSize={6} fill={colors.muted}>GND</text>
        <text x={245} y={148} fontSize={6} fill={colors.muted}>SDA</text>
        <text x={275} y={148} fontSize={6} fill={colors.muted}>SCL</text>

        {/* Pin wires */}
        <Wire points={[{ x: 200, y: 140 }, { x: 200, y: 160 }]} color={colors.power} />
        <Wire points={[{ x: 225, y: 140 }, { x: 225, y: 160 }]} color={colors.ground} />
        <Wire points={[{ x: 250, y: 140 }, { x: 250, y: 160 }]} color="#f59e0b" />
        <Wire points={[{ x: 280, y: 140 }, { x: 280, y: 160 }]} color="#10b981" />

        {/* Power connection */}
        <Wire points={[{ x: 60, y: 80 }, { x: 200, y: 80 }, { x: 200, y: 140 }]} color={colors.power} />

        {/* Ground connection */}
        <Wire points={[{ x: 225, y: 160 }, { x: 225, y: 190 }]} color={colors.ground} />
        <Components.Ground x={225} y={200} />

        {/* ESP32 */}
        <rect x={40} y={130} width={60} height={50} rx={4} fill="#1a2332" stroke={colors.gpio} strokeWidth={2} />
        <text x={70} y={155} fontSize={8} fontFamily="JetBrains Mono" fill={colors.gpio} textAnchor="middle">ESP32</text>
        <text x={50} y={145} fontSize={6} fill={colors.muted}>21</text>
        <text x={90} y={145} fontSize={6} fill={colors.muted} textAnchor="end">22</text>

        {/* I2C connections */}
        {animated ? (
          <>
            <AnimatedWire points={[{ x: 55, y: 130 }, { x: 55, y: 110 }, { x: 250, y: 110 }, { x: 250, y: 140 }]} color="#f59e0b" speed={2} />
            <AnimatedWire points={[{ x: 85, y: 130 }, { x: 85, y: 95 }, { x: 280, y: 95 }, { x: 280, y: 140 }]} color="#10b981" speed={2} delay={0.3} />
          </>
        ) : (
          <>
            <Wire points={[{ x: 55, y: 130 }, { x: 55, y: 110 }, { x: 250, y: 110 }, { x: 250, y: 140 }]} color="#f59e0b" />
            <Wire points={[{ x: 85, y: 130 }, { x: 85, y: 95 }, { x: 280, y: 95 }, { x: 280, y: 140 }]} color="#10b981" />
          </>
        )}

        {/* Labels */}
        <text x={130} y={107} fontSize={7} fill="#f59e0b">SDA (GPIO21)</text>
        <text x={150} y={92} fontSize={7} fill="#10b981">SCL (GPIO22)</text>
      </g>
    ),
  },
}

/**
 * Get schematic for a circuit ID
 */
export function getCircuitSchematic(circuitId) {
  return circuitSchematics[circuitId] || null
}

/**
 * Check if a circuit has a schematic
 */
export function hasSchematic(circuitId) {
  return circuitId in circuitSchematics
}

/**
 * List all circuits with schematics
 */
export function getCircuitsWithSchematics() {
  return Object.keys(circuitSchematics)
}
