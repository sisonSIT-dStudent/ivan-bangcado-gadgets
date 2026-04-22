/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tech-black': '#0a0a0a',
        'ivan-blue': '#0071e3', 
        'card-dark': '#1c1c1e',
      },
    },
  },
  plugins: [],
}