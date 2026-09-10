/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary:       "#FF6B35",
        primaryLight:  "#FF8C5A",
        background:    "#0F0F0F",
        surface:       "#1C1C1E",
        surfaceAlt:    "#2C2C2E",
        textPrimary:   "#F5F5F5",
        textSecondary: "#9A9A9A",
        border:        "#3A3A3C",
        error:         "#FF453A",
        success:       "#30D158",
      },
    },
  },
  plugins: [],
}