import { Link } from 'react-router-dom'
import { variants } from '../data/variants'
import VariantCard from '../components/VariantCard'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-accent-blue">ESP32</span> Quick Reference
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
          Interactive pinouts, variant comparisons, and common circuits
          for ESP32 development boards.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/compare" className="btn-primary">
            Compare Variants
          </Link>
          <Link to="/pinouts" className="btn-secondary">
            View Pinouts
          </Link>
        </div>
      </section>

      {/* Quick Recommendations */}
      <section className="mb-16">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-accent-cyan">Quick Picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-accent-blue">→</span>
              <span><strong>Most GPIO:</strong> ESP32-S3 (45 pins)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-blue">→</span>
              <span><strong>Lowest cost:</strong> ESP32-C3</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-blue">→</span>
              <span><strong>WiFi 6:</strong> ESP32-C6</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-blue">→</span>
              <span><strong>Thread/Zigbee:</strong> ESP32-C6, H2</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-blue">→</span>
              <span><strong>USB Device:</strong> ESP32-S2, S3</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-blue">→</span>
              <span><strong>Most versatile:</strong> ESP32-S3</span>
            </div>
          </div>
        </div>
      </section>

      {/* Variants Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">All Variants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map(variant => (
            <VariantCard key={variant.id} variant={variant} />
          ))}
        </div>
      </section>
    </div>
  )
}
