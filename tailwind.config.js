const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
    },
    extends: {
      backdropBlur: {
        4: '0.4',
        10: '10',
        100: '100',
        150: '150',
      },
    },
  },
};