module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'th-red': '#c81e0f',
        'th-orange': '#ea5a00',
        'th-violet': '#b43092'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
