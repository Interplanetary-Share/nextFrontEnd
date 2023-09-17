/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#060727e3',
        secondary: '#01051bc9',
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
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
    themes: ['dark'],
  },
}
