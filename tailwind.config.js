/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#071615",
        panel: "#0f1a19",
        panelSoft: "#162420",
        brand: "#e50914",
        brandSoft: "#ff3f4b",
        ink: "#f7f7f8",
        muted: "#a1a1aa",
        neon: {
          red: "#e50914",
          orange: "#f59e0b",
          pink: "#ec4899",
          purple: "#a855f7",
        },
      },
      boxShadow: {
        glow: "0 24px 70px rgba(245, 158, 11, 0.18), 0 0 36px rgba(255, 255, 255, 0.06)",
        soft: "0 20px 50px rgba(0, 0, 0, 0.28)",
        "glow-lg": "0 0 42px rgba(245, 158, 11, 0.22), 0 0 90px rgba(255, 255, 255, 0.08)",
        "glow-md": "0 0 22px rgba(245, 158, 11, 0.16), 0 0 44px rgba(255, 255, 255, 0.05)",
        "neon-glow": "0 0 28px rgba(245, 158, 11, 0.24), inset 0 0 20px rgba(255, 255, 255, 0.06)",
        "card-hover": "0 24px 70px rgba(0, 0, 0, 0.45), 0 0 38px rgba(245, 158, 11, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245, 158, 11, 0.2), 0 0 40px rgba(255, 255, 255, 0.06)" },
          "50%": { boxShadow: "0 0 32px rgba(245, 158, 11, 0.34), 0 0 68px rgba(255, 255, 255, 0.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
