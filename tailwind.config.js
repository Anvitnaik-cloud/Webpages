/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nike-black': '#111111',
        'nike-red': '#E60000',
      }
    },
  },
  plugins: [],
}
