/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        chronicle: {
          bg: '#091c1f', // Main background - very dark teal
          text: '#f7fff5', // Primary text - off-white
          'text-muted': '#b6c2bb', // Muted text - light gray-green
          border: '#2f4040', // Borders and dividers - medium dark teal
          accent: '#FF8C42', // Orange accent for buttons
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
