module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#141414',
      },
      backgroundImage: {
        'gradient-to-b':
          'linear-gradient(to bottom, rgba(20,20,20,0) 0, rgba(20,20,20,0.15) 15%, rgba(20,20,20,0.35) 29%, rgba(20,20,20,0.58) 44%,  #141414 68%, #141414 100%);',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
}
