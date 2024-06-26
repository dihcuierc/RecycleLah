/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      shadow: {
        custom: "0 35px 60px 15px rgba(155, 0, 0, 0.3)",
      },
      colors: {
        primary: {
          DEFAULT: "#005629",
          100: "#4BAB3F",
          200: "#C6EA7C",
          300: "#FE8160",
        },
        secondary: {
          DEFAULT: "#FC6157",
          100: "#FFC700",
          200: "#DC3805",
          300: "#FFD050",
        },
        gray: {
          100: "#787878",
          200: "#C4C7D0",
          300: "#A8ACB9",
          400: "#9A9FAE",
        },
      },
      fontFamily: {
        ithin: ["Inter-Thin", "sans-serif"],
        iextralight: ["Inter-ExtraLight", "sans-serif"],
        ilight: ["Inter-Light", "sans-serif"],
        iregular: ["Inter-Regular", "sans-serif"],
        imedium: ["Inter-Medium", "sans-serif"],
        isemibold: ["Inter-SemiBold", "sans-serif"],
        ibold: ["Inter-Bold", "sans-serif"],
        iextrabold: ["Inter-ExtraBold", "sans-serif"],
        iblack: ["Inter-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
