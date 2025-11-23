import { useState, useMemo, useEffect } from 'react'
import { libraries, languageCategories, getLanguageById } from '../data/libraries'

// ============================================
// Library List Item Component
// ============================================
function LibraryListItem({ library, isSelected, onClick }) {
  const language = getLanguageById(library.language)

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
        isSelected
          ? 'bg-accent-blue/20 border border-accent-blue/50'
          : 'hover:bg-bg-tertiary border border-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold shrink-0
          ${language?.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
          ${language?.color === 'red' ? 'bg-red-500/20 text-red-400' : ''}
          ${language?.color === 'orange' ? 'bg-orange-500/20 text-orange-400' : ''}
          ${language?.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : ''}
          ${language?.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : ''}
          ${language?.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
        `}>
          {language?.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-text-primary truncate">{library.name}</h4>
          <p className="text-xs text-text-muted truncate mt-0.5">{library.author}</p>
        </div>
        {library.popularity === 'high' && (
          <span className="text-xs text-yellow-400" title="Popular">★</span>
        )}
      </div>
    </button>
  )
}

// ============================================
// Library Detail Panel Component
// ============================================
function LibraryDetailPanel({ library }) {
  if (!library) {
    return (
      <div className="flex items-center justify-center h-full text-text-muted">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-lg">Select a library to view details</p>
          <p className="text-sm mt-2">Browse the sidebar or use search</p>
        </div>
      </div>
    )
  }

  const language = getLanguageById(library.language)

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-bg-secondary/95 backdrop-blur-sm border-b border-white/5 p-6 z-10">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold shrink-0
            ${language?.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
            ${language?.color === 'red' ? 'bg-red-500/20 text-red-400' : ''}
            ${language?.color === 'orange' ? 'bg-orange-500/20 text-orange-400' : ''}
            ${language?.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : ''}
            ${language?.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : ''}
            ${language?.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
          `}>
            {language?.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-text-primary">{library.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-text-secondary">by {library.author}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-bg-tertiary text-text-muted">
                {language?.name}
              </span>
              {library.popularity === 'high' && (
                <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                  Popular
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        {library.tags && library.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {library.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div className="card">
          <h3 className="text-lg font-semibold text-accent-cyan mb-3">Description</h3>
          <p className="text-text-secondary leading-relaxed">{library.description}</p>
        </div>

        {/* Links */}
        <div className="card">
          <h3 className="text-lg font-semibold text-accent-cyan mb-3">Links</h3>
          <div className="space-y-2">
            {library.github && (
              <a
                href={library.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent-blue hover:text-accent-cyan transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Repository
              </a>
            )}
            {library.documentation && (
              <a
                href={library.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent-blue hover:text-accent-cyan transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Documentation
              </a>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="card">
          <h3 className="text-lg font-semibold text-accent-cyan mb-3">Installation</h3>
          <p className="text-text-secondary mb-3">{library.installMethod}</p>
          {library.installCode && (
            <pre className="bg-bg-primary rounded-lg p-4 overflow-x-auto text-sm font-mono text-accent-cyan">
              {library.installCode}
            </pre>
          )}
        </div>

        {/* Features */}
        {library.features && library.features.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-accent-cyan mb-3">Features</h3>
            <div className="flex flex-wrap gap-2">
              {library.features.map(feature => (
                <span key={feature} className="text-sm px-3 py-1 rounded-full bg-bg-primary text-text-secondary border border-white/10">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Supported Variants */}
        {library.supportedVariants && library.supportedVariants.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-accent-cyan mb-3">Supported ESP32 Variants</h3>
            <div className="flex flex-wrap gap-2">
              {library.supportedVariants.map(variant => (
                <span key={variant} className="text-sm px-3 py-1 rounded bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                  {variant.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Code Example */}
        {library.codeExample && (
          <div className="card">
            <h3 className="text-lg font-semibold text-accent-cyan mb-3">Example Code</h3>
            <pre className="bg-bg-primary rounded-lg p-4 overflow-x-auto text-sm font-mono text-text-secondary leading-relaxed">
              <code>{library.codeExample}</code>
            </pre>
          </div>
        )}

        {/* Dependencies */}
        {library.dependencies && library.dependencies.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Dependencies</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-1">
              {library.dependencies.map((dep, i) => (
                <li key={i}>{dep}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {library.notes && library.notes.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-accent-cyan mb-3">Notes</h3>
            <ul className="space-y-2">
              {library.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-text-secondary">
                  <span className="text-accent-cyan mt-1">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// Main Libraries Page Component
// ============================================
export default function Libraries() {
  const [activeLanguage, setActiveLanguage] = useState('All')
  const [selectedLibrary, setSelectedLibrary] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Filter libraries based on language and search
  const filteredLibraries = useMemo(() => {
    return libraries.filter(lib => {
      const matchesLanguage = activeLanguage === 'All' || lib.language === activeLanguage
      const matchesSearch = searchQuery === '' ||
        lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lib.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lib.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lib.author.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesLanguage && matchesSearch
    })
  }, [activeLanguage, searchQuery])

  // Group libraries by language
  const groupedLibraries = useMemo(() => {
    return filteredLibraries.reduce((acc, lib) => {
      const lang = getLanguageById(lib.language)?.name || lib.language
      if (!acc[lang]) acc[lang] = []
      acc[lang].push(lib)
      return acc
    }, {})
  }, [filteredLibraries])

  // Auto-select first library if none selected
  useEffect(() => {
    if (!selectedLibrary && filteredLibraries.length > 0) {
      setSelectedLibrary(filteredLibraries[0])
    }
  }, [filteredLibraries, selectedLibrary])

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? 'w-0' : 'w-64 lg:w-72'} shrink-0 border-r border-white/10 bg-bg-secondary transition-all duration-300 overflow-hidden relative`}
      >
        <div className="h-full flex flex-col w-64 lg:w-72">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-text-primary">Libraries</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent-cyan/20 text-accent-cyan">
                {filteredLibraries.length}
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search libraries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2 pl-9 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Language Filters */}
          <div className="p-4 border-b border-white/10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveLanguage('All')}
                className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                  activeLanguage === 'All'
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary'
                }`}
              >
                All
              </button>
              {languageCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveLanguage(cat.id)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    activeLanguage === cat.id
                      ? 'bg-accent-blue text-white'
                      : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Library List */}
          <div className="flex-1 overflow-y-auto p-2">
            {Object.entries(groupedLibraries).map(([langName, libs]) => (
              <div key={langName} className="mb-4">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-3 py-2 sticky top-0 bg-bg-secondary">
                  {langName} ({libs.length})
                </h3>
                <div className="space-y-1">
                  {libs.map(lib => (
                    <LibraryListItem
                      key={lib.id}
                      library={lib}
                      isSelected={selectedLibrary?.id === lib.id}
                      onClick={() => setSelectedLibrary(lib)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filteredLibraries.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                <p>No libraries found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-bg-tertiary border border-white/10 rounded-r-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-primary transition-colors z-20"
        >
          <svg className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-bg-secondary overflow-hidden">
        <LibraryDetailPanel library={selectedLibrary} />
      </div>
    </div>
  )
}
