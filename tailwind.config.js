/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html"],
  theme: {
    extend: {
      colors: {
        first: "#345FF6",
        second: "#253347",
        third: "#5E6E85",
        fourth: "#D8E2E7",
        fifth: "#FFFFFF",
        "input-number": "#c9ccD1",
      },
      boxShadow: {
        "3xl": "1rem 2rem 3.5rem 0rem rgba(143, 174, 207, 0.25)",
      },
    },
  },
  plugins: [],
};
