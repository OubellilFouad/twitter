/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors:{
        black: '#0F1419',
        dark1: '#17202A',
        dark2: '#1C2733',
        dark3: '#283340',
        dark4: '#3A444C',
        dark5: '#5B7083',
        dark6: '#8899A6',
        dark7: '#EBEEF0',
        dark8: '#F7F9FA',
        blue: '#F2ACC6',
        white: '#FFFFFF'
      }
    },
  },
  plugins: [],
}
