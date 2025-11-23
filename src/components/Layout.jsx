import { Link, useLocation } from 'react-router-dom'
import GlobalSearch from './GlobalSearch'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/compare', label: 'Compare' },
  { to: '/pinouts', label: 'Pinouts' },
  { to: '/circuits', label: 'Circuits' },
  { to: '/boards', label: 'Boards' },
  { to: '/libraries', label: 'Libraries' },
  { to: '/reference', label: 'Reference' },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 h-16 bg-bg-secondary/95 backdrop-blur-sm cyber-nav">
        <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-accent-blue font-semibold text-lg">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="8" width="24" height="16" rx="0" stroke="currentColor" strokeWidth="2"/>
              <circle cx="10" cy="16" r="2" fill="currentColor"/>
              <circle cx="16" cy="16" r="2" fill="currentColor"/>
              <circle cx="22" cy="16" r="2" fill="currentColor"/>
              <line x1="8" y1="4" x2="8" y2="8" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" strokeWidth="2"/>
              <line x1="20" y1="4" x2="20" y2="8" stroke="currentColor" strokeWidth="2"/>
              <line x1="24" y1="4" x2="24" y2="8" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="24" x2="8" y2="28" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="24" x2="12" y2="28" stroke="currentColor" strokeWidth="2"/>
              <line x1="20" y1="24" x2="20" y2="28" stroke="currentColor" strokeWidth="2"/>
              <line x1="24" y1="24" x2="24" y2="28" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>ESP32 Ref</span>
          </Link>

          <div className="flex items-center gap-4">
            <GlobalSearch />
            <ul className="flex items-center gap-1">
              {navLinks.map(({ to, label }) => {
                const isActive = location.pathname === to ||
                  (to !== '/' && location.pathname.startsWith(to))
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`cyber-nav-link ${isActive ? 'active' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-1 cyber-container">
        {children}
      </main>

      <footer className="border-t-2 py-8 mt-16 cyber-container" style={{ borderColor: 'var(--window-border-outer)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center text-text-muted text-sm">
          <p>
            ESP32 specifications from{' '}
            <a
              href="https://www.espressif.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              Espressif Systems
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
