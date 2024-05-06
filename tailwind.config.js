/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        cerebrisans: ['CerebriSans', 'sans-serif'],
      },
      fontWeight: {
        'bold': 700,
        'semibold': 600,
        'normal': 400,
      }
    },
  },
  plugins: [],
};
