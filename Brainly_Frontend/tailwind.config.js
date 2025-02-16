/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple:{
          light: "#d5daf0",
          md: "#8285b5",
          dark: "#665eb5"
        },
        customGray:{
          light: "#e5e7eb"
        }
      }
    },
  },
  plugins: [],
}

