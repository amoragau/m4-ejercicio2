/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'first-color': '#16423C',
        'second-color': '#6A9C89',
        'third-color': '#C4DAD2',
        'fourth-color': '#E9EFEC',
      },
    },
  },
  plugins: [],
}

