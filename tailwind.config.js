/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0e17',
        'bg-secondary': '#121825',
        'bg-tertiary': '#1a2332',
        'accent-blue': '#00d4ff',
        'accent-cyan': '#00ffaa',
        'accent-purple': '#b794f6',
        'text-primary': '#e2e8f0',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-cyan': '0 0 20px rgba(0, 255, 170, 0.4)',
      },
    },
  },
  plugins: [],
}
