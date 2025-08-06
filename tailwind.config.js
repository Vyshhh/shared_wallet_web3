/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: '#E6E6FA',
        mint: '#98FF98',
        coral: '#F08080',
        charcoal: '#2E2E2E'
      }
    },
  },
  plugins: [],
};