/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'serif'],
        inter: ['inter', 'serif'],
      },
      colors: {
        cagedc: '#ee292b',
        cageda: '#0326fc',
        cagedg: '#16afcc',
        cagede: '#159a2b',
        cagedd: '#fdb50e',
      },
    },
  },
  plugins: [],
}

// cagedc: { 500: '#ee292b' },
// cageda: { 500: '#0326fc' },
// cagedg: { 500: '#16afcc' },
// cagede: { 500: '#159a2b' },
// cagedd: { 500: '#fdb50e' },
