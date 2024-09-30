/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "425px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        fade_in: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        fade_out: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
      },
      animation: {
        fade_in: "fade_in .5s ease-in-out",
        fade_out: "fade_out .5s ease-in-out",
      },
      flex: {
        "1/7": "0 0 calc(100% / 7)",
        "1/6": "0 0 calc(100% / 6)",
        "1/5": "0 0 calc(100% / 5)",
        "1/4": "0 0 calc(100% / 4)",
        "1/3": "0 0 calc(100% / 3)",
      },
      maxHeight: {
        "1/7": "calc(100% / 7)",
        "1/6": "calc(100% / 6)",
        "1/5": "calc(100% / 5)",
        "1/4": "calc(100% / 4)",
        "1/3": "calc(100% / 3)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".overlay": {
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.9) 100%)",
        },
        ".overlay-mobile": {
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.9) 100%)",
        },
        ".overlay-backdrop": {
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.9) 100%)",
        },
      });
    },
  ],
};
