/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          ...colors.amber,
          500: 'rgb(221, 67, 39)'
        }
      }
    },
  },
  plugins: [],
}
