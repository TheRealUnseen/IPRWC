/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color-800': '#382C1F',
        'primary-color-700': '#3B2E21',
        'primary-color-600': '#3F3123',
        'primary-color-500': '#4A3A2A',
        'dark-secondary-color': '#8D5F3D',
        'secondary-color': '#A67B5B',
        'tertiary-color': '#BE9C80',
        'dark-accent-color': '#D8C5B2',
        'accent-color': '#F2EDE3',
        'background-color': '#D8C3A5',
        'text-color': '#FFFFFF',
      }
    },
  },
  plugins: [],
}

