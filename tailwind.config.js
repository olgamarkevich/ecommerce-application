/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-inner': 'inset 0 0 0 2em #1e40af',
      },
      maxWidth: {
        '100vh': '100vh',
      },
      fontFamily: {
        'f-rubik': ['Rubik', 'sans-serif'],
        'f-open-sans': ['Open-Sans', 'sans-serif'],
      },
      colors: {
        'c-orange': '#ff8800',
        'c-pink-red': '#fb3859',
        'c-pail-ember': '#fcb5c3',
        'c-sky': '#e0f2fe',
        'c-sky-green': '#bbe6cb',
        'c-sage': '#8f916b',
        'c-leafs': '#759f4f',
        'c-kiwi': '#cccccc',
        'c-green-meadow': '#6d9654',
        'c-grass': '#df6c4f',
        'c-dry-sand': '#ffe0da',
        'c-alice-blue': '#f0f8ff',
        'c-shadow': '#2c2a2a',
      },
    },
  },
  plugins: [],
};
