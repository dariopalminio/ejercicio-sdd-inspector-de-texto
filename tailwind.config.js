/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark premium palette per docs/product-requirements.md NFR-04
        surface: {
          950: '#020617', // slate-950
          900: '#0f172a', // slate-900
        },
        accent: {
          400: '#34d399', // emerald-400
          500: '#10b981', // emerald-500
        },
      },
    },
  },
  plugins: [],
}

