/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          950: '#05070a',
          900: '#0a0e14',
          800: '#12161f',
          700: '#1a1f2b',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.12)',
        },
        aqi: {
          good: '#4ade80',
          moderate: '#facc15',
          unhealthy: '#fb923c',
          danger: '#f87171',
          hazardous: '#c084fc',
        },
      },
    },
  },
  plugins: [],
}