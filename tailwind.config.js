/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'dark': '#121212'
      },
      backgroundImage : {
        'gg' : "/assets/image.jpg"
      }
    },
  },
  plugins: [],
};

