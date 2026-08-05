module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.06)'
      },
      backdropBlur: {
        xs: '6px'
      }
    }
  },
  plugins: []
}
