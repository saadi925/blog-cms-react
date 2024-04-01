import { darkTheme } from "./src/theme/COLORS";
const { COLORS } = darkTheme;
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/editor/**/*.{js,ts,jsx,tsx}",
    "./src/editor/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        accent: COLORS.accent,
        background: COLORS.background,
        surface: COLORS.surface,
        error: COLORS.error,
        success: COLORS.success,
      },
    },
  },
  plugins: [],
};
