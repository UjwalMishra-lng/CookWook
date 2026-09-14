/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary:       "#FF6B35",
        primaryLight:  "#FF8C5A",
        background:    "#16110E",
        surface:       "#241A13",
        surfaceAlt:    "#36261C",
        textPrimary:   "#FFF8F4",
        textSecondary: "#B8A295",
        border:        "#3D2A1E",
        error:         "#FF453A",
        success:       "#30D158",
      },
    },
  },
  plugins: [],
}