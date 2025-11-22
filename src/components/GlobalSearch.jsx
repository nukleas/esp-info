import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { variants } from '../data/variants'
import { pinoutsByVariant } from '../data/pinouts'
import { circuits, searchCircuits } from '../data/circuits'
import { boards } from '../data/boards'

// Search result types with icons and colors
const resultTypes = {
  variant: {
    icon: '⚡',
    color: 'text-accent-blue',
    label: 'Variant'
  },
  pin: {
    icon: '📍',
    color: 'text-accent-cyan',
    label: 'Pin'
  },
  circuit: {
    icon: '🔧',
    color: 'text-purple-400',
    label: 'Circuit'
  },
  board: {
    icon: '📟',
    color: 'text-green-400',
    label: 'Board'
  },
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Search across all data sources
  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return []

    const q = query.toLowerCase()
    const matches = []

    // Search variants
    variants.forEach(v => {
      if (
        v.name.toLowerCase().includes(q) ||
        v.fullName?.toLowerCase().includes(q) ||
        v.tagline?.toLowerCase().includes(q) ||
        v.bestFor?.some(b => b.toLowerCase().includes(q))
      ) {
        matches.push({
          type: 'variant',
          id: v.id,
          title: v.name,
          subtitle: v.tagline || v.fullName,
          path: `/compare?highlight=${v.id}`,
        })
      }
    })

    // Search pins across all variants
    Object.entries(pinoutsByVariant).forEach(([variantId, pins]) => {
      pins.forEach(pin => {
        if (
          pin.name?.toLowerCase().includes(q) ||
          pin.description?.toLowerCase().includes(q) ||
          pin.altFunctions?.some(f => f.name?.toLowerCase().includes(q))
        ) {
          const variant = variants.find(v => v.id === variantId)
          matches.push({
            type: 'pin',
            id: `${variantId}-${pin.pin}`,
            title: pin.name,
            subtitle: `${variant?.name || variantId} - ${pin.description || pin.type}`,
            path: `/pinouts/${variantId}`,
            data: { pin, variantId },
          })
        }
      })
    })

    // Search circuits
    circuits.forEach(c => {
      if (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags?.some(t => t.includes(q))
      ) {
        matches.push({
          type: 'circuit',
          id: c.id,
          title: c.title,
          subtitle: `${c.category} - ${c.difficulty}`,
          path: `/circuits?highlight=${c.id}`,
        })
      }
    })

    // Search boards
    boards.forEach(b => {
      if (
        b.name.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q) ||
        b.variant.toLowerCase().includes(q) ||
        b.manufacturer?.toLowerCase().includes(q)
      ) {
        matches.push({
          type: 'board',
          id: b.id,
          title: b.name,
          subtitle: `${b.variant} - ${b.manufacturer || 'Unknown'}`,
          path: `/boards?highlight=${b.id}`,
        })
      }
    })

    // Limit results and sort by relevance
    return matches.slice(0, 20)
  }, [query])

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to open
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Handle keyboard navigation in results
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      navigateToResult(results[selectedIndex])
    }
  }

  const navigateToResult = (result) => {
    navigate(result.path)
    setIsOpen(false)
    setQuery('')
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-secondary transition-all duration-200 text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 bg-bg-primary rounded text-xs font-mono">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => {
          setIsOpen(false)
          setQuery('')
        }}
      />

      {/* Search Modal */}
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div
          className="bg-bg-secondary border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.1)' }}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <svg className="w-5 h-5 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search variants, pins, circuits, boards..."
              className="flex-1 bg-transparent text-text-primary placeholder-text-muted outline-none text-lg"
            />
            <kbd
              className="px-2 py-1 bg-bg-tertiary rounded text-xs text-text-muted cursor-pointer hover:bg-bg-primary transition-colors"
              onClick={() => {
                setIsOpen(false)
                setQuery('')
              }}
            >
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.length < 2 ? (
              <div className="px-4 py-8 text-center text-text-muted">
                <p className="mb-4">Quick Search Tips</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-left max-w-md mx-auto">
                  <div className="flex items-center gap-2 p-2 bg-bg-tertiary rounded">
                    <span className="text-accent-blue">⚡</span>
                    <span>"ESP32-S3"</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-bg-tertiary rounded">
                    <span className="text-accent-cyan">📍</span>
                    <span>"GPIO21" or "I2C"</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-bg-tertiary rounded">
                    <span className="text-purple-400">🔧</span>
                    <span>"relay" or "power"</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-bg-tertiary rounded">
                    <span className="text-green-400">📟</span>
                    <span>"DevKit" or "camera"</span>
                  </div>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-8 text-center text-text-muted">
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-2">Try a different search term</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => {
                  const type = resultTypes[result.type]
                  return (
                    <button
                      key={result.id}
                      onClick={() => navigateToResult(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors duration-100 ${
                        index === selectedIndex
                          ? 'bg-accent-blue/20'
                          : 'hover:bg-bg-tertiary'
                      }`}
                    >
                      <span className={`text-lg ${type.color}`}>{type.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text-primary truncate">
                            {result.title}
                          </span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${type.color} bg-white/5`}>
                            {type.label}
                          </span>
                        </div>
                        <p className="text-sm text-text-muted truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      {index === selectedIndex && (
                        <kbd className="px-1.5 py-0.5 bg-bg-tertiary rounded text-xs text-text-muted">
                          Enter
                        </kbd>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-xs text-text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-bg-tertiary rounded">↑</kbd>
                  <kbd className="px-1 py-0.5 bg-bg-tertiary rounded">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-bg-tertiary rounded">Enter</kbd>
                  <span>Select</span>
                </span>
              </div>
              <span>{results.length} results</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
