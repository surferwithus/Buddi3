/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9f8f6",
        brown: "#5a4a3a",
        orange: {
          DEFAULT: "#ee7c2b",
          light: "#faeee3",
        },
        white: {
          DEFAULT: "#ffffff",
          dark: "#f9f8f5",
        },
        yellow: {
          DEFAULT: "#fcdc23",
          light: "#fcf9e3",
        },
        green: {
          DEFAULT: "#28bd66",
        },
      },
    },
  },
  plugins: [],
}

