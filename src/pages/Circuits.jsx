import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { circuits, categories, difficultyLevels, allTags } from '../data/circuits'
import CircuitDiagram from '../components/CircuitDiagram'
import { getCircuitSchematic, hasSchematic } from '../data/circuitSchematics'

const difficultyColors = {
  beginner: 'text-green-400 bg-green-400/20 border-green-400/30',
  intermediate: 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30',
  advanced: 'text-red-400 bg-red-400/20 border-red-400/30',
}

export default function Circuits() {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Handle highlight parameter from global search
  useEffect(() => {
    const highlight = searchParams.get('highlight')
    if (highlight) {
      setExpanded(highlight)
      // Scroll to the circuit
      setTimeout(() => {
        const element = document.getElementById(`circuit-${highlight}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }, [searchParams])

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Common Circuits</h1>
          <p className="text-text-secondary">
            {circuits.length} wiring examples and code snippets for ESP32 projects
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circuits..."
            className="w-full lg:w-64 px-4 py-2 pl-10 bg-bg-secondary border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 transition-colors"
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
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
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
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
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
        <div className="flex gap-2 sm:ml-auto">
          <button
            onClick={() => setActiveDifficulty('All')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              activeDifficulty === 'All'
                ? 'bg-white/20 text-text-primary'
                : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
            }`}
          >
            All Levels
          </button>
          {Object.entries(difficultyLevels).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setActiveDifficulty(key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 border ${
                activeDifficulty === key
                  ? difficultyColors[key]
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-text-muted text-sm mb-4">
        Showing {filtered.length} of {circuits.length} circuits
      </p>

      {/* Circuits list */}
      <div className="space-y-4">
        {filtered.map(circuit => (
          <div
            key={circuit.id}
            id={`circuit-${circuit.id}`}
            className={`card transition-all duration-300 ${
              expanded === circuit.id ? 'ring-1 ring-accent-blue/50' : ''
            }`}
          >
            <div
              className="flex items-start justify-between cursor-pointer"
              onClick={() => setExpanded(expanded === circuit.id ? null : circuit.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="text-lg font-semibold">{circuit.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded border ${difficultyColors[circuit.difficulty]}`}>
                    {circuit.difficulty}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan">
                    {circuit.category}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">{circuit.description}</p>
                {circuit.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {circuit.tags.slice(0, 4).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded bg-bg-tertiary text-text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button className="text-text-muted hover:text-text-primary p-2 flex-shrink-0">
                <svg
                  className={`w-5 h-5 transform transition-transform ${expanded === circuit.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {expanded === circuit.id && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-6">
                {/* Components */}
                {circuit.components && circuit.components.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-accent-cyan mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      Components
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {circuit.components.map((comp, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 bg-bg-secondary p-2 rounded-lg text-sm"
                        >
                          <span className="text-accent-blue">•</span>
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
                  <div>
                    <h4 className="text-sm font-semibold text-accent-cyan mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Connections
                    </h4>
                    <div className="space-y-1">
                      {circuit.connections.map((conn, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="font-mono text-accent-blue">{conn.from}</span>
                          <span className="text-text-muted">→</span>
                          <span className="font-mono text-green-400">{conn.to}</span>
                          {conn.note && (
                            <span className="text-text-muted text-xs">({conn.note})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive SVG Schematic */}
                {hasSchematic(circuit.id) && (
                  <div>
                    <h4 className="text-sm font-semibold text-accent-cyan mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                      Interactive Schematic
                      <span className="ml-2 text-xs font-normal text-accent-blue/60 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
                        Animated
                      </span>
                    </h4>
                    <div className="relative">
                      {(() => {
                        const schematic = getCircuitSchematic(circuit.id)
                        return (
                          <CircuitDiagram
                            width={schematic.width}
                            height={schematic.height}
                            animated={true}
                          >
                            {schematic.render({ animated: true })}
                          </CircuitDiagram>
                        )
                      })()}
                    </div>
                  </div>
                )}

                {/* ASCII Schematic fallback */}
                {!hasSchematic(circuit.id) && circuit.schematicAscii && (
                  <div>
                    <h4 className="text-sm font-semibold text-accent-cyan mb-3">Schematic</h4>
                    <pre className="bg-bg-primary p-4 rounded-lg overflow-x-auto text-xs font-mono text-text-secondary whitespace-pre">
                      {circuit.schematicAscii.trim()}
                    </pre>
                  </div>
                )}

                {/* Code */}
                {circuit.code && (
                  <div>
                    <h4 className="text-sm font-semibold text-accent-cyan mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Example Code
                    </h4>
                    <pre className="bg-bg-primary p-4 rounded-lg overflow-x-auto text-sm font-mono border-l-2 border-accent-cyan">
                      <code className="text-text-secondary">{circuit.code}</code>
                    </pre>
                  </div>
                )}

                {/* Notes */}
                {circuit.notes && circuit.notes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-accent-cyan mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Notes
                    </h4>
                    <ul className="space-y-1">
                      {circuit.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-accent-cyan">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {circuit.warnings && circuit.warnings.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Warnings
                    </h4>
                    <ul className="space-y-1">
                      {circuit.warnings.map((warning, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-300">
                          <span>⚠</span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tested With */}
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

                {/* Supported Variants */}
                {circuit.supportedVariants && circuit.supportedVariants.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span>Supported variants:</span>
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
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">No circuits found matching your filters</p>
          <button
            onClick={() => {
              setActiveCategory('All')
              setActiveDifficulty('All')
              setSearchQuery('')
            }}
            className="mt-4 text-accent-blue hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
