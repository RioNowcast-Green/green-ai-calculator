/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

    },
    colors: {
      'black': '#000',
      'primary': '#3C22E8',
      'secondary': '#6C6C6C',
      'grey': '#cfcfcfff',
      'light-grey': '#EFF2F6',
      'dark-grey': '#383838',
      'green': '#00B586',
      'red': '#F8719D',
      'light-green': '#7FD9C2',
      'white': '#FFFFFF',
      'neutral': '#486284',
      'pink': '#FF77B8',
      'red': '#FF312F',
      'tickets': '#F5F4F3',
      'yellow': '#FFBC0F',
      'overlay': '#0F0F0F',
      'link': '#0000EE',
      'link-visited': '#551A8B'
    },
    fontFamily: {
      primary: ['Plus Jakarta Sans', 'sans-serif'],
      secondary: ['DM Sans', 'sans-serif']
    },
  },
  plugins: [],
}

