/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        chronicle: {
          bg: '#DFDFC1', // Warm beige background
          text: '#595959', // Medium gray text
          'text-light': '#8B8B8B', // Lighter gray for metadata
          'text-dark': '#2D2D2D', // Darker text for emphasis
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
