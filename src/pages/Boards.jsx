import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { boards, getBoardsByVariant, getBoardsWithCamera } from '../data/boards'
import { variants } from '../data/variants'

// Get unique manufacturers and variants
const manufacturers = ['All', ...new Set(boards.map(b => b.manufacturer))].sort()
const boardVariants = ['All', ...new Set(boards.map(b => b.variant))]

export default function Boards() {
  const [searchParams] = useSearchParams()
  const [activeManufacturer, setActiveManufacturer] = useState('All')
  const [activeVariant, setActiveVariant] = useState('All')
  const [showCameraOnly, setShowCameraOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBoard, setSelectedBoard] = useState(null)

  // Handle highlight parameter from global search
  useEffect(() => {
    const highlight = searchParams.get('highlight')
    if (highlight) {
      const board = boards.find(b => b.id === highlight)
      if (board) {
        setSelectedBoard(board)
        setTimeout(() => {
          const element = document.getElementById(`board-${highlight}`)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
    }
  }, [searchParams])

  // Filter boards
  const filtered = boards.filter(b => {
    const matchesManufacturer = activeManufacturer === 'All' || b.manufacturer === activeManufacturer
    const matchesVariant = activeVariant === 'All' || b.variant === activeVariant
    const matchesCamera = !showCameraOnly || b.features?.camera
    const matchesSearch = !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.module?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesManufacturer && matchesVariant && matchesCamera && matchesSearch
  })

  const getVariantInfo = (variantId) => {
    return variants.find(v => v.id === variantId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Development Boards</h1>
          <p className="text-text-secondary">
            {boards.length} ESP32 development boards from various manufacturers
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search boards..."
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
      <div className="space-y-4 mb-8">
        {/* Variant filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-text-muted text-sm py-1.5">Chip:</span>
          {boardVariants.map(v => (
            <button
              key={v}
              onClick={() => setActiveVariant(v)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeVariant === v
                  ? 'bg-accent-blue text-bg-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
            >
              {v === 'All' ? 'All Chips' : v.toUpperCase().replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Manufacturer filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-text-muted text-sm py-1.5">Brand:</span>
          {manufacturers.map(m => (
            <button
              key={m}
              onClick={() => setActiveManufacturer(m)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeManufacturer === m
                  ? 'bg-accent-cyan text-bg-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Camera toggle */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCameraOnly}
              onChange={(e) => setShowCameraOnly(e.target.checked)}
              className="w-4 h-4 rounded bg-bg-tertiary border-white/20 text-accent-blue focus:ring-accent-blue/50"
            />
            <span className="text-text-secondary text-sm">Camera boards only</span>
          </label>
        </div>
      </div>

      {/* Results count */}
      <p className="text-text-muted text-sm mb-4">
        Showing {filtered.length} of {boards.length} boards
      </p>

      {/* Boards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(board => {
          const variantInfo = getVariantInfo(board.variant)
          return (
            <div
              key={board.id}
              id={`board-${board.id}`}
              onClick={() => setSelectedBoard(selectedBoard?.id === board.id ? null : board)}
              className={`card cursor-pointer group relative overflow-hidden transition-all duration-300 ${
                selectedBoard?.id === board.id ? 'ring-2 ring-accent-blue' : ''
              }`}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-1 h-8 bg-accent-blue/30 group-hover:bg-accent-blue/60 transition-colors" />
                <div className="absolute top-0 right-0 w-8 h-1 bg-accent-blue/30 group-hover:bg-accent-blue/60 transition-colors" />
              </div>

              {/* Status badge */}
              {board.status && (
                <div className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded ${
                  board.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  board.status === 'Legacy' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {board.status}
                </div>
              )}

              <h3 className="text-lg font-semibold text-accent-blue group-hover:text-accent-cyan transition-colors pr-16">
                {board.name}
              </h3>

              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan">
                  {board.variant.toUpperCase().replace('-', ' ')}
                </span>
                <span className="text-xs text-text-muted">
                  {board.manufacturer}
                </span>
              </div>

              <p className="text-text-secondary text-sm mt-2 line-clamp-2">
                {board.description}
              </p>

              {/* Quick specs */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {board.features?.flashSize && (
                  <span className="px-2 py-1 bg-bg-tertiary rounded text-text-muted">
                    {board.features.flashSize} Flash
                  </span>
                )}
                {board.features?.psram && (
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                    PSRAM
                  </span>
                )}
                {board.features?.camera && (
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded">
                    Camera
                  </span>
                )}
                {board.features?.batteryCharging && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">
                    Battery
                  </span>
                )}
              </div>

              {/* Price */}
              {board.price && (
                <div className="mt-3 text-sm text-text-muted">
                  ~{board.price}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">No boards found matching your filters</p>
          <button
            onClick={() => {
              setActiveManufacturer('All')
              setActiveVariant('All')
              setShowCameraOnly(false)
              setSearchQuery('')
            }}
            className="mt-4 text-accent-blue hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedBoard && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSelectedBoard(null)}
          />
          <div className="fixed top-[5%] left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 px-4 max-h-[90vh] overflow-y-auto">
            <div
              className="bg-bg-secondary border border-white/10 rounded-xl shadow-2xl p-6"
              style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.1)' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-accent-blue">{selectedBoard.name}</h2>
                  <p className="text-text-secondary mt-1">{selectedBoard.description}</p>
                </div>
                <button
                  onClick={() => setSelectedBoard(null)}
                  className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-lg text-sm">
                  {selectedBoard.variant.toUpperCase().replace('-', ' ')}
                </span>
                <span className="px-3 py-1 bg-bg-tertiary text-text-secondary rounded-lg text-sm">
                  {selectedBoard.manufacturer}
                </span>
                {selectedBoard.module && (
                  <span className="px-3 py-1 bg-bg-tertiary text-text-secondary rounded-lg text-sm font-mono">
                    {selectedBoard.module}
                  </span>
                )}
                {selectedBoard.releaseYear && (
                  <span className="px-3 py-1 bg-bg-tertiary text-text-muted rounded-lg text-sm">
                    {selectedBoard.releaseYear}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Factor */}
                {selectedBoard.formFactor && (
                  <div className="bg-bg-primary rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-accent-cyan mb-3">Form Factor</h3>
                    <div className="space-y-2 text-sm">
                      {selectedBoard.formFactor.dimensions && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">Dimensions:</span>
                          <span className="text-text-primary font-mono">{selectedBoard.formFactor.dimensions}</span>
                        </div>
                      )}
                      {selectedBoard.formFactor.pins && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">Pins:</span>
                          <span className="text-text-primary">{selectedBoard.formFactor.pins}</span>
                        </div>
                      )}
                      {selectedBoard.formFactor.breadboardFriendly !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">Breadboard:</span>
                          <span className={selectedBoard.formFactor.breadboardFriendly ? 'text-green-400' : 'text-yellow-400'}>
                            {selectedBoard.formFactor.breadboardFriendly ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Features */}
                {selectedBoard.features && (
                  <div className="bg-bg-primary rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-accent-cyan mb-3">Features</h3>
                    <div className="space-y-2 text-sm">
                      {selectedBoard.features.flashSize && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">Flash:</span>
                          <span className="text-text-primary">{selectedBoard.features.flashSize}</span>
                        </div>
                      )}
                      {selectedBoard.features.psram !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">PSRAM:</span>
                          <span className={selectedBoard.features.psram ? 'text-green-400' : 'text-text-muted'}>
                            {selectedBoard.features.psram || 'No'}
                          </span>
                        </div>
                      )}
                      {selectedBoard.features.usbConnector && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">USB:</span>
                          <span className="text-text-primary">{selectedBoard.features.usbConnector}</span>
                        </div>
                      )}
                      {selectedBoard.features.antenna && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">Antenna:</span>
                          <span className="text-text-primary">{selectedBoard.features.antenna}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Pinout */}
                {selectedBoard.pinout && (
                  <div className="bg-bg-primary rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-accent-cyan mb-3">Pinout</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {selectedBoard.pinout.gpio && (
                        <div>
                          <span className="text-text-muted">GPIO:</span>
                          <span className="text-text-primary ml-2">{selectedBoard.pinout.gpio}</span>
                        </div>
                      )}
                      {selectedBoard.pinout.adc && (
                        <div>
                          <span className="text-text-muted">ADC:</span>
                          <span className="text-text-primary ml-2">{selectedBoard.pinout.adc}</span>
                        </div>
                      )}
                      {selectedBoard.pinout.dac && (
                        <div>
                          <span className="text-text-muted">DAC:</span>
                          <span className="text-text-primary ml-2">{selectedBoard.pinout.dac}</span>
                        </div>
                      )}
                      {selectedBoard.pinout.touch && (
                        <div>
                          <span className="text-text-muted">Touch:</span>
                          <span className="text-text-primary ml-2">{selectedBoard.pinout.touch}</span>
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/pinouts/${selectedBoard.variant}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm text-accent-blue hover:underline"
                    >
                      View pinout diagram
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}

                {/* Power */}
                {selectedBoard.power && (
                  <div className="bg-bg-primary rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-accent-cyan mb-3">Power</h3>
                    <div className="space-y-2 text-sm">
                      {selectedBoard.power.inputVoltage && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">Input:</span>
                          <span className="text-text-primary">{selectedBoard.power.inputVoltage}</span>
                        </div>
                      )}
                      {selectedBoard.power.operatingVoltage && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">Operating:</span>
                          <span className="text-text-primary">{selectedBoard.power.operatingVoltage}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Pros & Cons */}
              {(selectedBoard.pros || selectedBoard.cons) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {selectedBoard.pros && selectedBoard.pros.length > 0 && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-green-400 mb-2">Pros</h3>
                      <ul className="space-y-1">
                        {selectedBoard.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-green-300">
                            <span>+</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedBoard.cons && selectedBoard.cons.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-red-400 mb-2">Cons</h3>
                      <ul className="space-y-1">
                        {selectedBoard.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-red-300">
                            <span>-</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Purchase Links */}
              {selectedBoard.purchaseLinks && selectedBoard.purchaseLinks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-text-muted mb-3">Where to Buy</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBoard.purchaseLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-bg-tertiary hover:bg-accent-blue/20 rounded-lg text-sm text-text-secondary hover:text-accent-blue transition-colors"
                      >
                        {link.name}
                        <svg className="w-3 h-3 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
