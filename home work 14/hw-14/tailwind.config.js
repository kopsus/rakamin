/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
