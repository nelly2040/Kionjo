/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kenyan-brown': '#8B4513',
        'kenyan-chocolate': '#D2691E',
        'maasai-red': '#FF0000',
        'kenyan-gold': '#FFD700',
        'cream': '#F5F5DC',
        'charcoal': '#36454F'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}