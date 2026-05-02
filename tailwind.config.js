/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#04111F',
          800: '#071828',
          700: '#0A1E33',
          600: '#0D2540',
        },
        brand: {
          blue: '#1A6BFF',
          teal: '#00D4AA',
          light: '#4D8FFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

