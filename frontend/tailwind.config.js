/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy":{
          50:"#E0E9F5",
          100:"#C6D6EC",
          200:"#88A9D7",
          300:"#4F80C4",
          400:"#305991",
          600:"#172A45",
          500:"#1D3557",
          800:"#0B1522",
          700:"#122136",
          950:"#030508",
          900:"#060C13",
          },
          "seagreen": {
            50: "#F8FCFC",
            100: "#F0F9F9",
            200: "#E2F3F3",
            300: "#D3EDED",
            400: "#C5E6E8",
            500: "#B6E0E2",
            600: "#A8DADC",
            700: "#63BDC0",
            800: "#38878A",
            900: "#1C4445",
            950: "#0F2424"
          },
          "greenwhite": {
            50: "#FFFFFF",
            100: "#FCFEFB",
            200: "#F9FDF7",
            300: "#F5FCF3",
            400: "#F5FCF3",
            500: "#F1FAEE",
            600: "#B4E4A4",
            700: "#73CD56",
            800: "#46962C",
            900: "#234B16",
            950: "#13270C"
          },
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}


