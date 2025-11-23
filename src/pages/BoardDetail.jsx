import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBoard } from '../data/boards'
import { getBoardPinout, hasBoardPinout } from '../data/boardPinouts'
import { getVariant } from '../data/variants'
import BoardPinoutDiagram from '../components/BoardPinoutDiagram'

export default function BoardDetail() {
  const { boardId } = useParams()
  const [selectedPin, setSelectedPin] = useState(null)

  const board = getBoard(boardId)
  const boardPinout = getBoardPinout(boardId)
  const hasPinout = hasBoardPinout(boardId)

  if (!board) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Board not found</h1>
        <Link to="/boards" className="text-accent-blue hover:underline">
          Back to boards
        </Link>
      </div>
    )
  }

  const variant = getVariant(board.variant)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/boards"
          className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All boards
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-accent-blue">{board.name}</h1>
          <p className="text-text-secondary mt-1">{board.description}</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-lg text-sm font-medium">
              {board.variant.toUpperCase().replace('-', ' ')}
            </span>
            <span className="px-3 py-1 bg-bg-tertiary text-text-secondary rounded-lg text-sm">
              {board.manufacturer}
            </span>
            {board.module && (
              <span className="px-3 py-1 bg-bg-tertiary text-text-secondary rounded-lg text-sm font-mono">
                {board.module}
              </span>
            )}
            {board.status && (
              <span className={`px-3 py-1 rounded-lg text-sm ${
                board.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                board.status === 'Legacy' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {board.status}
              </span>
            )}
          </div>
        </div>

        {/* Quick stats */}
        {board.pinout && (
          <div className="flex gap-4">
            <div className="text-center px-4 py-2 bg-bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-accent-blue font-mono">{board.pinout.totalPins}</div>
              <div className="text-xs text-text-muted">Total Pins</div>
            </div>
            {board.pinout.gpio && (
              <div className="text-center px-4 py-2 bg-bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-accent-cyan font-mono">{board.pinout.gpio}</div>
                <div className="text-xs text-text-muted">GPIOs</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pinout Diagram - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
                <line x1="4" y1="9" x2="2" y2="9" strokeWidth="2" />
                <line x1="4" y1="15" x2="2" y2="15" strokeWidth="2" />
                <line x1="20" y1="9" x2="22" y2="9" strokeWidth="2" />
                <line x1="20" y1="15" x2="22" y2="15" strokeWidth="2" />
              </svg>
              Board Pinout
            </h2>

            {hasPinout ? (
              <BoardPinoutDiagram
                boardId={boardId}
                onPinSelect={setSelectedPin}
                selectedPin={selectedPin}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-30">
                  <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <rect x="20" y="30" width="60" height="40" rx="4" strokeWidth="2"/>
                    {[25, 35, 45, 55, 65, 75].map(x => (
                      <line key={`t${x}`} x1={x} y1="20" x2={x} y2="30" strokeWidth="2"/>
                    ))}
                    {[25, 35, 45, 55, 65, 75].map(x => (
                      <line key={`b${x}`} x1={x} y1="70" x2={x} y2="80" strokeWidth="2"/>
                    ))}
                  </svg>
                </div>
                <p className="text-text-muted mb-4">
                  Interactive pinout diagram coming soon
                </p>
                {board.pinoutUrl && (
                  <a
                    href={board.pinoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors"
                  >
                    View external pinout documentation
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Selected Pin Info */}
          {selectedPin && (
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-accent-blue">{selectedPin.silk}</h3>
                <button
                  onClick={() => setSelectedPin(null)}
                  className="p-1 hover:bg-bg-tertiary rounded transition-colors"
                >
                  <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 text-sm">
                {selectedPin.gpio !== null && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">GPIO:</span>
                    <span className="text-text-primary font-mono">GPIO{selectedPin.gpio}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-muted">Type:</span>
                  <span className={`font-medium ${
                    selectedPin.type === 'power' ? 'text-red-400' :
                    selectedPin.type === 'ground' ? 'text-gray-400' :
                    selectedPin.type === 'gpio' ? 'text-blue-400' :
                    selectedPin.type === 'input' ? 'text-purple-400' :
                    selectedPin.type === 'usb' ? 'text-green-400' :
                    'text-text-primary'
                  }`}>
                    {selectedPin.type?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block mb-1">Description:</span>
                  <span className="text-text-secondary">{selectedPin.description}</span>
                </div>

                {selectedPin.strapping && (
                  <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded text-orange-400 text-xs">
                    Strapping pin - affects boot behavior
                  </div>
                )}

                {selectedPin.warning && (
                  <div className="p-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs">
                    {selectedPin.warning}
                  </div>
                )}

                {selectedPin.reserved && (
                  <div className="p-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs">
                    Reserved - Do not use this pin
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Board Specs */}
          <div className="card">
            <h3 className="text-sm font-semibold text-accent-cyan mb-3">Specifications</h3>
            <div className="space-y-2 text-sm">
              {board.formFactor?.dimensions && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Dimensions:</span>
                  <span className="text-text-primary font-mono">{board.formFactor.dimensions}</span>
                </div>
              )}
              {board.features?.flashSize && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Flash:</span>
                  <span className="text-text-primary">{board.features.flashSize}</span>
                </div>
              )}
              {board.features?.psram && (
                <div className="flex justify-between">
                  <span className="text-text-muted">PSRAM:</span>
                  <span className="text-green-400">{board.features.psram}</span>
                </div>
              )}
              {board.features?.usbConnector && (
                <div className="flex justify-between">
                  <span className="text-text-muted">USB:</span>
                  <span className="text-text-primary">{board.features.usbConnector}</span>
                </div>
              )}
              {board.formFactor?.breadboardFriendly !== undefined && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Breadboard:</span>
                  <span className={board.formFactor.breadboardFriendly ? 'text-green-400' : 'text-yellow-400'}>
                    {board.formFactor.breadboardFriendly ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              {board.price && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Price:</span>
                  <span className="text-text-primary">~{board.price}</span>
                </div>
              )}
            </div>
          </div>

          {/* Default Pin Assignments */}
          {boardPinout?.defaults && (
            <div className="card">
              <h3 className="text-sm font-semibold text-accent-cyan mb-3">Default Assignments</h3>
              <div className="space-y-3">
                {boardPinout.defaults.i2c && (
                  <div className="bg-bg-tertiary rounded p-2">
                    <div className="text-xs text-amber-400 font-semibold mb-1">I2C</div>
                    <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                      <span className="text-text-muted">SDA: <span className="text-text-primary">GPIO{boardPinout.defaults.i2c.sda}</span></span>
                      <span className="text-text-muted">SCL: <span className="text-text-primary">GPIO{boardPinout.defaults.i2c.scl}</span></span>
                    </div>
                  </div>
                )}
                {boardPinout.defaults.spi && (
                  <div className="bg-bg-tertiary rounded p-2">
                    <div className="text-xs text-emerald-400 font-semibold mb-1">SPI</div>
                    <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                      <span className="text-text-muted">MOSI: <span className="text-text-primary">GPIO{boardPinout.defaults.spi.mosi}</span></span>
                      <span className="text-text-muted">MISO: <span className="text-text-primary">GPIO{boardPinout.defaults.spi.miso}</span></span>
                      <span className="text-text-muted">SCK: <span className="text-text-primary">GPIO{boardPinout.defaults.spi.sck}</span></span>
                      <span className="text-text-muted">CS: <span className="text-text-primary">GPIO{boardPinout.defaults.spi.cs}</span></span>
                    </div>
                  </div>
                )}
                {boardPinout.defaults.uart && (
                  <div className="bg-bg-tertiary rounded p-2">
                    <div className="text-xs text-cyan-400 font-semibold mb-1">UART</div>
                    <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                      <span className="text-text-muted">TX: <span className="text-text-primary">GPIO{boardPinout.defaults.uart.tx}</span></span>
                      <span className="text-text-muted">RX: <span className="text-text-primary">GPIO{boardPinout.defaults.uart.rx}</span></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Safe GPIOs */}
          {boardPinout?.safeGPIOs && boardPinout.safeGPIOs.length > 0 && (
            <div className="card">
              <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Safe GPIOs
              </h3>
              <div className="flex flex-wrap gap-1">
                {boardPinout.safeGPIOs.map(gpio => (
                  <span
                    key={gpio}
                    className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-mono border border-green-500/30"
                  >
                    {gpio}
                  </span>
                ))}
              </div>
              <p className="text-text-muted text-xs mt-2">
                Can be used without boot issues
              </p>
            </div>
          )}

          {/* Links */}
          <div className="card">
            <h3 className="text-sm font-semibold text-text-muted mb-3">Links</h3>
            <div className="space-y-2">
              {variant && (
                <Link
                  to={`/pinouts/${board.variant}`}
                  className="flex items-center gap-2 text-sm text-accent-blue hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  View {variant.name} chip pinout
                </Link>
              )}
              {board.pinoutUrl && (
                <a
                  href={board.pinoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent-blue hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Official documentation
                </a>
              )}
              {board.purchaseLinks?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-blue transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pros and Cons */}
      {(board.pros || board.cons) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {board.pros && board.pros.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-green-400 mb-2">Pros</h3>
              <ul className="space-y-1">
                {board.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-300">
                    <span>+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {board.cons && board.cons.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-red-400 mb-2">Cons</h3>
              <ul className="space-y-1">
                {board.cons.map((con, i) => (
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
    </div>
  )
}
