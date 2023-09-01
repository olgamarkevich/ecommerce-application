/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-inner': 'inset 0 0 0 2em green',
      },
      width: {
        '55%': '55%',
      },
      height: {
        '50vh': '50vh',
        '70vh': '70vh',
        '80vh': '80vh',
      },
      maxWidth: {
        '1000px': '1000px',
        '100px': '100px',
        '100vh': '100vh',
        '100vw': '100vw',
        '70vw': '70vw',
        '20%': '20%',
        24: '6rem' /* 96px */,
      },
      minWidth: {
        '220px': '220px',
        '50px': '50px',
      },
      maxHeight: {
        '60vh': '60vh',
        '320px': '320px',
      },
      fontFamily: {
        'f-rubik': ['Rubik', 'sans-serif'],
        'f-open-sans': ['Open-Sans', 'sans-serif'],
      },
      transformOrigin: {
        'one-origin': '1px',
      },
      screens: {
        sm: { min: '300px', max: '767px' },
        md: { max: '768px' },
        'md-min': { min: '640px' },
        xl: { min: '768px', max: '1280px' },
        lg: { min: '1280px' },
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
        'c-shadow-blue': '#2c343f',
        'c-shadow': '#2c2a2a',
        'c-sale-red': '#d55016',
        'c-black-opacity-3': '#0000004d',
      },
    },
  },
  plugins: [],
};
