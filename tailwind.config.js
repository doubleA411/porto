/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'dark': '#121212',
        'grey' : "#b4b4b4",
        'darker': '#2a2a2a',
        'primary' : '#eee'
      },
      backgroundImage : {
        'gg' : "/assets/image.jpg"
      }
    },
  },
  plugins: [],
};

