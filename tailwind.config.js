/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        chronicle: {
          bg: '#0D1F1F', // Very dark teal background
          'bg-card': '#1A3333', // Slightly lighter teal for cards
          'bg-darker': '#0A1818', // Even darker for contrast
          text: '#FFFFFF', // White text
          'text-light': '#A0B0B0', // Light gray for metadata
          'text-muted': '#708080', // Muted gray
          teal: '#2D5555', // Medium teal
          'teal-light': '#3D6565', // Lighter teal
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
