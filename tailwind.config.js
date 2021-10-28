module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      appwhite: "#C7D8EB",
      appSecondary: "#171D37",
      appPrimary: "#1C223A",
      textSecondary: "#4CAEDB",
      primary: "#1D2238",
      secondary: "#141827",
      box: {
        start: "#78C2E5",
        end: "#4E8BA8",
        solid: "#67B8E0",
      },
      white: "#FFFFFF",
    },
  },
  variants: {
    animation: ["responsive", "motion-safe", "motion-reduce"],
  },
  plugins: [],
};
