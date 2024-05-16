module.exports = {
  /** @type {import('tailwindcss').Config} */
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#10151D', // Aquí defines el color root con su valor hexadecimal
        second: '#161e29',
        primarybt: '#A87FFB',
        h1primary: '#F6F6F6',
        h2secondary: '#A7AEC3',
        txtprimarybt: '#191B29',
        strokeline: '#2E3C51',
        paragraph1: '#808A97'
      },
    },
  },
  plugins: [],
}
