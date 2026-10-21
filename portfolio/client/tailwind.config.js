/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif']
      },
      colors: {
        ink: '#08080c'
      },
      animation: {
        float: 'float 8s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-24px) translateX(12px)' }
        }
      }
    }
  },
  plugins: []
};