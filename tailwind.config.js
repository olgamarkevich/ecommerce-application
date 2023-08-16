/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'c-orange': '#ff8800',
        'c-pink-red': '#fb3859',
        'c-pail-ember': '#fcb5c3',
        'c-sky': '#e0f2fe',
        'c-sky-green': '#bbe6cb',
      },
    },
  },
  plugins: [],
};
