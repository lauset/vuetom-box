// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}',],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      animation: {
        wiggle: 'wiggle 0.2s ease-in-out infinite'
      }
    }
  },
  variants: {
    extend: {
      animation: ['group-hover', 'hover', 'focus']
    }
  },
  plugins: [],
}