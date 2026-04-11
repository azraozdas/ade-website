/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#B76E79',
        'rose-gold-dark': '#96284f',
        'soft-pink': '#FBE9EC',
        'soft-pink-light': '#EFD1D8',
        'off-white': '#F7F4EF',
        'deep-black': '#111111',
        'gray-text': '#444444',
        'gray-muted': '#6B6B6B',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['"Open Sans"', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'ade': '0 12px 28px rgba(17,17,17,.06)',
        'ade-sm': '0 6px 18px rgba(17,17,17,.05)',
        'ade-toast': '0 8px 22px rgba(183,110,121,.35)',
      },
      transitionDuration: {
        200: '200ms',
      },
      spacing: {
        '18': '4.5rem',
        '92': '23rem',
      },
    },
  },
  plugins: [],
};

