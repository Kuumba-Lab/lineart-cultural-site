/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#05f2b1",
          200: "#02d99e",
          300: "#00a779",
          400: "#388a41",
          500: "#368f3f",
        },
        secondary: {
          100: "#f7bb77",
          200: "#f0b067",
          300: "#f7b263",
          400: "#f5a953",
          500: "#ffab4d"
        },
        gray: {
          100: "#f1f1f1",
          400: "#e0dede",
          500: "#d1d1d1",
        },
      },
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  plugins: [
  ],
}

