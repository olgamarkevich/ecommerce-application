/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-inner': 'inset 0 0 0 2em green',
      },
      maxWidth: {
        '100vh': '100vh',
        '100vw': '100vw',
        '20%': '20%',
      },
      minWidth: {
        '220px': '220px',
      },
      fontFamily: {
        'f-rubik': ['Rubik', 'sans-serif'],
        'f-open-sans': ['Open-Sans', 'sans-serif'],
      },
      transformOrigin: {
        'one-origin': '1px',
      },
      screens: {
        md: { max: '767px' },
        'md-min': { min: '768px' },
      },
      colors: {
        'c-orange': '#ff8800',
        'c-pink-red': '#fb3859',
        'c-pail-ember': '#fcb5c3',
        'c-sky': '#e0f2fe',
        'c-light-blue': '#5d77c7',
        'c-sky-green': '#bbe6cb',
        'c-sage': '#8f916b',
        'c-leafs': '#759f4f',
        'c-kiwi': '#cccccc',
        'c-green-meadow': '#6d9654',
        'c-green-by-loader': '#85c69d',
        'c-grass': '#df6c4f',
        'c-dry-sand': '#ffe0da',
        'c-alice-blue': '#f0f8ff',
        'c-shadow': '#2c2a2a',
      },
    },
  },
  plugins: [],
};
