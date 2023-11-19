/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAFA",
        second: "#DADDE2",
        navbar: "#E3E0F3",
        blueBtn: "#8083FF",
        hoverBlueBtn: "#5457CF",
        redBtn: "#FF0000",
        greenBtn: "#009063",
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [require("daisyui")],
}
