// tailwind.config.js
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
      },
    },
  },
  plugins: [],
};