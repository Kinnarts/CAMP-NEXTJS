const { tailwindConfig } = require("@storefront-ui/react/tailwind-config");
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@storefront-ui/react/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
