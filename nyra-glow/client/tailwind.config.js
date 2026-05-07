/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        gold: { DEFAULT: '#C9A96E', light: '#E8D5A3', dark: '#8B6914' },
        ivory: '#FAF7F0',
        dark: { bg: '#0A0A0A', card: '#111111', border: '#1E1E1E' }
      },
    }
  },
  plugins: []
};
