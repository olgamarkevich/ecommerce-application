/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-inner': 'inset 0 0 0 2em #df6c4f',
      },
      colors: {
        'c-orange': '#ff8800',
        'c-pink-red': '#fb3859',
        'c-pail-ember': '#fcb5c3',
        'c-sky': '#e0f2fe',
        'c-sky-green': '#bbe6cb',
        'c-grass': '#df6c4f',
        'c-alice-blue': '#f0f8ff',
      },
    },
  },
  plugins: [],
};
