import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/compare', label: 'Compare' },
  { to: '/pinouts', label: 'Pinouts' },
  { to: '/circuits', label: 'Circuits' },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 h-16 bg-bg-secondary/90 backdrop-blur-sm border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-accent-blue font-semibold text-lg">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
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

          <ul className="flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              const isActive = location.pathname === to ||
                (to !== '/' && location.pathname.startsWith(to))
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-accent-blue/20 text-accent-blue'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-white/10 py-8 mt-16">
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
