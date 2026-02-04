/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0066CC",
        secondary: "#009966",
        "primary-dark": "#004C99",
        "secondary-dark": "#007A52",
        "background-light": "#F8FAFC",
        "background-dark": "#0F172A",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E293B",
        "text-light": "#1E293B",
        "text-dark": "#E2E8F0",
        "subtext-light": "#64748B",
        "subtext-dark": "#94A3B8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

