/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(59, 130, 246)',
        secondary: 'rgb(16, 185, 129)',
      },
    },
  },
  plugins: [],
};
