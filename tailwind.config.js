/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#C4EF47',
          dark: '#000000',
          gray: '#0A0A0A',
          text: '#FFFFFF',
          smoke: '#A0A0A0',
          orange: '#F7941D',
          surface: '#0F0F0F',
          border: '#1A1A1A',
          subtle: '#15151A'
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'premium-fade': 'premium-fade 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'smooth-slide': 'smooth-slide 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'float-up': 'float-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards'
      },
      keyframes: {
        'premium-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'smooth-slide': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    }
  },
  plugins: [],
}
