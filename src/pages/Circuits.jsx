import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { circuits, categories, difficultyLevels } from '../data/circuits'
import CircuitDiagram from '../components/CircuitDiagram'
import { getCircuitSchematic, hasSchematic } from '../data/circuitSchematics'

const difficultyColors = {
  beginner: 'text-green-400 bg-green-400/20 border-green-400/30',
  intermediate: 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30',
  advanced: 'text-red-400 bg-red-400/20 border-red-400/30',
}

const difficultyDots = {
  beginner: 'bg-green-400',
  intermediate: 'bg-yellow-400',
  advanced: 'bg-red-400',
}

// Sidebar Circuit List Item
function CircuitListItem({ circuit, isSelected, onClick }) {
  const hasDiagram = hasSchematic(circuit.id)

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
        isSelected
          ? 'bg-accent-blue/20 border border-accent-blue/50'
          : 'hover:bg-bg-tertiary border border-transparent'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${difficultyDots[circuit.difficulty]}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={`text-sm font-medium truncate ${isSelected ? 'text-accent-blue' : 'text-text-primary group-hover:text-accent-blue'}`}>
              {circuit.title}
            </h4>
            {hasDiagram && (
              <svg className="w-3.5 h-3.5 text-accent-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            )}
          </div>
          <p className="text-xs text-text-muted truncate mt-0.5">{circuit.category}</p>
        </div>
      </div>
    </button>
  )
}

// Circuit Detail Panel
function CircuitDetailPanel({ circuit }) {
  if (!circuit) {
    return (
      <div className="flex items-center justify-center h-full text-text-muted">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <p className="text-lg">Select a circuit to view details</p>
          <p className="text-sm mt-1">Choose from the list on the left</p>
        </div>
      </div>
    )
  }

  const schematic = hasSchematic(circuit.id) ? getCircuitSchematic(circuit.id) : null

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-bg-secondary/95 backdrop-blur-sm border-b border-white/10 p-6 z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-2xl font-bold">{circuit.title}</h2>
              <span className={`text-xs px-2 py-0.5 rounded border ${difficultyColors[circuit.difficulty]}`}>
                {circuit.difficulty}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan">
                {circuit.category}
              </span>
            </div>
            <p className="text-text-secondary">{circuit.description}</p>
          </div>
        </div>
        {circuit.tags && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {circuit.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-bg-tertiary text-text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Interactive SVG Schematic - Prominent placement */}
        {schematic && (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-accent-cyan mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              Interactive Schematic
              <span className="ml-2 text-xs font-normal text-accent-blue/60 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
                Animated
              </span>
            </h3>
            <div className="flex justify-center">
              <CircuitDiagram
                width={schematic.width}
                height={schematic.height}
                animated={true}
              >
                {schematic.render({ animated: true })}
              </CircuitDiagram>
            </div>
          </div>
        )}

        {/* ASCII Schematic fallback */}
        {!schematic && circuit.schematicAscii && (
          <div className="card">
            <h3 className="text-lg font-semibold text-accent-cyan mb-3">Schematic</h3>
            <pre className="bg-bg-primary p-4 rounded-lg overflow-x-auto text-xs font-mono text-text-secondary whitespace-pre">
              {circuit.schematicAscii.trim()}
            </pre>
          </div>
        )}

        {/* Components and Connections side by side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Components */}
          {circuit.components && circuit.components.length > 0 && (
            <div className="card">
              <h3 className="text-base font-semibold text-accent-cyan mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Components
              </h3>
              <div className="space-y-2">
                {circuit.components.map((comp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 bg-bg-primary p-2.5 rounded-lg text-sm"
                  >
                    <span className="text-accent-blue mt-0.5">•</span>
                    <div>
                      <span className="font-mono text-text-primary">
                        {typeof comp === 'string' ? comp : comp.name}
                      </span>
                      {typeof comp === 'object' && (
                        <>
                          {comp.value && (
                            <span className="text-text-muted ml-2">{comp.value}</span>
                          )}
                          {comp.note && (
                            <span className="text-text-muted text-xs block">({comp.note})</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connections */}
          {circuit.connections && circuit.connections.length > 0 && (
            <div className="card">
              <h3 className="text-base font-semibold text-accent-cyan mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Connections
              </h3>
              <div className="space-y-2">
                {circuit.connections.map((conn, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm bg-bg-primary p-2.5 rounded-lg">
                    <span className="font-mono text-accent-blue">{conn.from}</span>
                    <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="font-mono text-green-400">{conn.to}</span>
                    {conn.note && (
                      <span className="text-text-muted text-xs ml-auto">({conn.note})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Code */}
        {circuit.code && (
          <div className="card">
            <h3 className="text-base font-semibold text-accent-cyan mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Example Code
            </h3>
            <pre className="bg-bg-primary p-4 rounded-lg overflow-x-auto text-sm font-mono border-l-2 border-accent-cyan">
              <code className="text-text-secondary">{circuit.code}</code>
            </pre>
          </div>
        )}

        {/* Notes */}
        {circuit.notes && circuit.notes.length > 0 && (
          <div className="card">
            <h3 className="text-base font-semibold text-accent-cyan mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Notes
            </h3>
            <ul className="space-y-2">
              {circuit.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-accent-cyan mt-0.5">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {circuit.warnings && circuit.warnings.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-base font-semibold text-red-400 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Warnings
            </h3>
            <ul className="space-y-2">
              {circuit.warnings.map((warning, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-300">
                  <span className="mt-0.5">⚠</span>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Compatibility Info */}
        <div className="flex flex-wrap gap-4">
          {circuit.testedWith && circuit.testedWith.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span>Tested with:</span>
              {circuit.testedWith.map((variant, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-bg-tertiary rounded text-text-secondary"
                >
                  {variant}
                </span>
              ))}
            </div>
          )}

          {circuit.supportedVariants && circuit.supportedVariants.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span>Supported:</span>
              {circuit.supportedVariants.map((variant, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded"
                >
                  {variant}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Circuits() {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [selectedCircuit, setSelectedCircuit] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Handle highlight parameter from global search
  useEffect(() => {
    const highlight = searchParams.get('highlight')
    if (highlight) {
      const circuit = circuits.find(c => c.id === highlight)
      if (circuit) {
        setSelectedCircuit(circuit)
      }
    }
  }, [searchParams])

  // Select first circuit by default
  useEffect(() => {
    if (!selectedCircuit && circuits.length > 0) {
      setSelectedCircuit(circuits[0])
    }
  }, [])

  // Filter circuits
  const filtered = circuits.filter(c => {
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory
    const matchesDifficulty = activeDifficulty === 'All' || c.difficulty === activeDifficulty
    const matchesSearch = !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags?.some(t => t.includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  // Group circuits by category for sidebar
  const groupedCircuits = filtered.reduce((acc, circuit) => {
    if (!acc[circuit.category]) {
      acc[circuit.category] = []
    }
    acc[circuit.category].push(circuit)
    return acc
  }, {})

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Sidebar */}
      <div className={`flex-shrink-0 bg-bg-secondary border-r border-white/10 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-80'}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold">Circuits</h1>
            <span className="text-xs text-text-muted bg-bg-tertiary px-2 py-0.5 rounded">
              {filtered.length}
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 pl-9 bg-bg-primary border border-white/10 rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 transition-colors"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 border-b border-white/10 space-y-2">
          {/* Category filter */}
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                activeCategory === 'All'
                  ? 'bg-accent-blue text-bg-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-accent-blue text-bg-primary'
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveDifficulty('All')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                activeDifficulty === 'All'
                  ? 'bg-white/20 text-text-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
            >
              All
            </button>
            {Object.entries(difficultyLevels).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setActiveDifficulty(key)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all flex items-center gap-1 ${
                  activeDifficulty === key
                    ? difficultyColors[key]
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${difficultyDots[key]}`} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Circuit List */}
        <div className="flex-1 overflow-y-auto p-2">
          {Object.entries(groupedCircuits).map(([category, categoryCircuits]) => (
            <div key={category} className="mb-4">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-3 py-2">
                {category}
              </h3>
              <div className="space-y-1">
                {categoryCircuits.map(circuit => (
                  <CircuitListItem
                    key={circuit.id}
                    circuit={circuit}
                    isSelected={selectedCircuit?.id === circuit.id}
                    onClick={() => setSelectedCircuit(circuit)}
                  />
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-text-muted text-sm">No circuits found</p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveDifficulty('All')
                  setSearchQuery('')
                }}
                className="mt-2 text-accent-blue text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-bg-tertiary border border-white/10 rounded-r-lg p-1.5 hover:bg-bg-secondary transition-colors lg:hidden"
        style={{ left: sidebarCollapsed ? 0 : '320px' }}
      >
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 bg-bg-primary overflow-hidden">
        <CircuitDetailPanel circuit={selectedCircuit} />
      </div>
    </div>
  )
}
