/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#09090b",
        panel: "#111114",
        panelSoft: "#18181b",
        brand: "#e50914",
        brandSoft: "#ff3f4b",
        ink: "#f7f7f8",
        muted: "#a1a1aa",
      },
      boxShadow: {
        glow: "0 24px 70px rgba(229, 9, 20, 0.22)",
        soft: "0 20px 50px rgba(0, 0, 0, 0.28)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
