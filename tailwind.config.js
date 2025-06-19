/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: "#171717",
        card: "#232323",
        border: "#2E2E2E",
        accent: "#22C55E",
        accentHover: "#16A34A",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        textPrimary: "#E5E5E5",
        textSecondary: "#A3A3A3",
      },
      fontFamily: {
        sans: [
          'Inter', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          '"Helvetica Neue"', 
          'Arial', 
          '"Noto Sans"', 
          'sans-serif', 
          '"Apple Color Emoji"', 
          '"Segoe UI Emoji"', 
          '"Segoe UI Symbol"', 
          '"Noto Color Emoji"'
        ],
      },
    },
  },
  plugins: [],
};
