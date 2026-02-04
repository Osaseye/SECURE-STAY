/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0284c7", // Sky blue/Teal mix from logo
        secondary: "#005a8d", // Darker blue from logo text
        accent: "#0fa968", // Green from checkmark
        "background-light": "#f3f4f6", // Gray-100
        "background-dark": "#0f172a", // Slate-900
        "surface-light": "#ffffff", // White
        "surface-dark": "#1e293b", // Slate-800
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

