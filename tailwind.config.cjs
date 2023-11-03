/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      md: { min: '768px' }
    },
    colors: {
      zinc: 'rgb(244 244 245)',
      zinc_secondery: 'rgb(228 228 231)',
      white: 'rgb(255 255 255)',
      primary_pink: '#be9995',
      primary_green: '#727E7E',
      primary_grey: '#D0CDD3',
      secondary_grey: '#E2DFE4',
      shadow: '#5c5c5c'
    }
  },
  plugins: []
}
