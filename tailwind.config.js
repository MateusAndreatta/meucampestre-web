const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.yellow,
        dark: colors.stone,
        info: colors.blue,
        danger: colors.red,
        light: colors.lightblue,
        success: colors.green,
      },
    },
  },
  safelist: [
    'primary',
    'secondary',
    'dark',
    'bg-info-600',
    'danger',
    'light',
    'success',
  ],
  plugins: [],
};
