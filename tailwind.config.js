/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        chronicle: {
          bg: '#091c1f',
          'bg-light': '#0d2528',
          text: '#f7fff5',
          'text-muted': '#8a9a92',
          border: '#1e3538',
          accent: '#c8a05c',
          'accent-hover': '#d4b06c',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      letterSpacing: {
        'widest': '0.2em',
      },
    },
  },
  plugins: [],
}
