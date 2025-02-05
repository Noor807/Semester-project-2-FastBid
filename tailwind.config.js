/** @type {import('tailwindcss').Config} */
export default {
    content: ["./**/*.{html,js}","!./node_modules/**/*.{html,js}"],
    theme: {
      extend: {fontSize: {
        fontSize: {
          'xs': 'clamp(1.2rem, 3vw + 1rem, 1.5rem)',  // Increased min size for xs
          'sm': 'clamp(1.5rem, 3vw + 1.2rem, 2rem)',  // Increased min size for sm
          'base': 'clamp(2rem, 4vw + 1.5rem, 2.5rem)', // Slightly larger base size
          'lg': 'clamp(2.5rem, 4vw + 1.8rem, 3rem)',     // Larger font size for lg
          'xl': 'clamp(3rem, 6vw + 2rem, 4rem)',       // Larger font size for xl
          '2xl': 'clamp(3.5rem, 6vw + 2.5rem, 5rem)',  // Increased max size for 2xl
          '3xl': 'clamp(4rem, 6vw + 3rem, 6rem)'
        },
        screens: {
          'xs': '320px',  
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
        } 
      }, 
      }
    },
    plugins: [],
  
  }