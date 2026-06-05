/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#f7d6df",
        rose: "rgb(255 123 164)",
        nude: "#ead8ce",
        ink: "#171313",
        pearl: "#fff9f8"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Poppins", "sans-serif"],
        bodoni: ["Bodoni Moda", "serif"]
      },
      boxShadow: {
        bloom: "0 24px 80px rgba(112, 47, 66, 0.16)"
      }
    }
  },
  plugins: []
};
