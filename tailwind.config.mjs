/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./**/*.{html,mjs,js}",
      "!./node_modules/**/*.{html,mjs,js}"
    ],
    theme: {
      extend: {
        fontSize: {
          'xs': 'clamp(1.2rem, 3vw + 1rem, 1.5rem)',  
          'sm': 'clamp(1.5rem, 3vw + 1.2rem, 2rem)',  
          'base': 'clamp(2rem, 4vw + 1.5rem, 2.5rem)', 
          'lg': 'clamp(2.5rem, 4vw + 1.8rem, 3rem)',     
          'xl': 'clamp(3rem, 6vw + 2rem, 4rem)',       
          '2xl': 'clamp(3.5rem, 6vw + 2.5rem, 5rem)',  
          '3xl': 'clamp(4rem, 6vw + 3rem, 6rem)'       
        },
        screens: {
          'xs': '320px',  
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
        },
        fontFamily: {
          'custom': ['Montserrat', 'serif'], // Add your custom font family here
        },
        colors: {
          'dark-pink': '#110F1C',
          'blue-gray': '#36454F',
          'light-blue': '#7D98A1',
          'dark-teal': '#124559',
          'silver': '#C0C0C0',
          'bright-blue': '#0598dc',
          'dark-blue': '#040b1a',
                       
        }
      }
    },
    plugins: [],
  }
  