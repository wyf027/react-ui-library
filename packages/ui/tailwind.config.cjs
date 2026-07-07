/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    '../../docs/*.md',
    '../../docs/components/**/*.md',
    '../../docs/guide/**/*.md',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#dce9ff',
          500: '#2459ff',
          600: '#1d48d6',
          700: '#193aa8',
        },
      },
    },
  },
  plugins: [],
}
