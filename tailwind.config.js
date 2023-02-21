/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#14213d',
        orange: '#fca311',
        gray: '#e5e5e5',
        white: '#ffffff',
        link: '#fca311',
        linkVisited: '#fca311',
        linkHover: '#ffb703',
      },
    },
  },
  plugins: [require('daisyui')],
};
