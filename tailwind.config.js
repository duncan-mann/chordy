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
        cagedc: '#2176ff',
        cageda: '#db162f',
        cagedg: '#f79824',
        cagede: '#fdca40',
        cagedd: '#109047',
      },
    },
  },
  plugins: [],
}
