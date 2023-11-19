/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      screens: {
        "2xl": "1920px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#aa00ff",
          // "primary-content": "#ffffff",
          secondary: "#EFEFEF",
          // "secondary-content": "#ffffff",
          accent: "#262626",
          // "accent-content": "#ffffff",
          neutral: "#000000",
          "neutral-content": "#ffffff",
          "neutral-focus": "#4c4a4a",
          "base-100": "#FFFFFF",
          "base-200": "#949494",
          info: "#aa00ff",
          "info-focus": "#3b82f6",
          success: "#21CA51",
          warning: "#FF6052",
          error: "#DE1B8D",
        },
      },
    ],
  },
};
