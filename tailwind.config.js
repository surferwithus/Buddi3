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
        brown: "var(--brown)",
        orange: {
          DEFAULT: "#ee7c2b",
          light: "#faeee3",
        },
        stone: {
          DEFAULT: "var(--stone)",
        },
        white: {
          DEFAULT: "#ffffff",
          dark: "#f9f8f5",
        },
        yellow: {
          DEFAULT: "var(--yellow)",
          light: "#fcf9e3",
        },
        green: {
          DEFAULT: "#28bd66",
          light: "#eef6e8",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
      },
    },
  },
  plugins: [],
}

