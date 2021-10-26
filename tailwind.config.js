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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
