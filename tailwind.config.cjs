/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fupagua-azul': '#407ABE',
        'fupagua-verde': '#65AA1F',
        'fupagua-rojo': '#AA091D',
        'fupagua-amarillo': '#FFD400', // El color real que me pasaste
        'fupagua-gris': '#545454',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}