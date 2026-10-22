/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Polymarket-inspired institutional palette
        canvas: '#EDF1F7',      // page background — muted blue-gray
        surface: '#FFFFFF',     // card surface
        line: '#E2E8F0',        // hairline border
        lineSoft: '#EEF2F7',    // softer divider
        ink: {
          900: '#0B1727',       // near-black headings
          700: '#1F2A37',       // primary body
          500: '#5B6B7E',       // secondary body
          400: '#8A98A8',       // tertiary / labels
        },
        odds: {
          up: '#2E9C6A',        // match-rate positive (muted green)
          flat: '#3B4252',      // neutral odds
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
