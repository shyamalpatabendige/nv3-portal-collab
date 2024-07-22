/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'novo-green': '#88B24B',
        'novo-blue' : '#12A4D8',
      } 
    },
  },
  plugins: [],
}