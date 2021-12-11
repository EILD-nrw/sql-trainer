module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  webpack: {
    configure: {
      // See https://github.com/webpack/webpack/issues/6725
      module: {
        rules: [{
          test: /\.wasm$/,
          type: 'javascript/auto'
        }]
      }
    }
  }
}
