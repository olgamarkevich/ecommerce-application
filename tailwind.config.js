/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: 'repeat( auto-fit, minmax(245px, 280px) )',
      },
      boxShadow: {
        'custom-inner': 'inset 0 0 0 2em green',
      },
      width: {
        '55%': '55%',
        '30%': '30%',
      },
      height: {
        '50vh': '50vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '80%': '80%',
        10: '2.5em',
      },
      maxWidth: {
        '100px': '100px',
        'little-s': '220px',
        'little-xs': '280px',
        'small-s': '360px',
        'small-xs': '400px',
        'medium-s': '440px',
        'medium-m': '480px',
        'big-s': '1000px',
        '40vh': '40vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '100vh': '100vh',
        '100vw': '100vw',
        '70vw': '70vw',
        '95%': '95%',
        '90%': '90%',
        '80%': '80%',
        '60%': '60%',
        '30%': '30%',
        '20%': '20%',
        10: '2.5em',
        24: '6rem' /* 96px */,
      },
      minWidth: {
        '50px': '50px',
        '180px': '180px',
        '220px': '220px',
        '240px': '240px',
        '20%': '20%',
      },
      maxHeight: {
        '60vh': '60vh',
        '80vh': '80vh',
        '320px': '320px',
        '20%': '20%',
      },
      flexBasis: {
        '320px': '320px',
        '180px': '180px',
      },
      paddingLeft: {
        '10px': '10px',
      },
      fontFamily: {
        'f-rubik': ['Rubik', 'sans-serif'],
        'f-open-sans': ['Open-Sans', 'sans-serif'],
      },
      transformOrigin: {
        'one-origin': '1px',
      },
      screens: {
        x: { max: '300px' },
        m: { max: '554px' },
        sm: { min: '300px', max: '767px' },
        md: { max: '768px' },
        'md-min': { min: '640px' },
        'md-xl': { max: '916px' } /* max: 916px */,
        xl: { min: '768px', max: '1280px' },
        lg: { min: '1280px' },
      },
      zIndex: {
        5: '5',
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
