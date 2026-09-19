/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:      "#930b0b",   // Deep Crimson
        primaryLight: "#fd1616",   // Vivid Red
        primaryDark:  "#5c0606",   // Very Dark Crimson
        accent:       "#fd1616",
        surface:      "#fff8f8",   // Off-white with red tint
        dark:         "#1a0505",   // Near-black with red tint
        darker:       "#0d0101",
        gold:         "#e8b86d",   // Warm gold accent
        white:        "#ffffff",
        black:        "#000000",
      },
      fontFamily: {
        sans: ['"Outfit"', '"Plus Jakarta Sans"', '"Inter"', "system-ui", "-apple-system", "sans-serif"],
        display: ['"Outfit"', '"Plus Jakarta Sans"', '"Inter"', "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
        cursive: ['"Dancing Script"', '"Great Vibes"', "cursive"],
      },
      boxShadow: {
        "red-glow":    "0 10px 40px -8px rgba(147, 11, 11, 0.50)",
        "red-glow-lg": "0 20px 60px -10px rgba(147, 11, 11, 0.40)",
        "red-sm":      "0 4px 16px -2px rgba(253, 22, 22, 0.30)",
        "soft":        "0 4px 20px -2px rgba(0, 0, 0, 0.08)",
        "card":        "0 10px 30px -4px rgba(0, 0, 0, 0.10)",
        "premium":     "0 20px 50px -8px rgba(0, 0, 0, 0.16)",
      },
      animation: {
        "float-slow":    "floatSlow 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        "pulse-red":     "pulseRed 3s ease-in-out infinite",
        "fade-in-up":    "fadeInUp 0.7s ease-out both",
        "shimmer":       "shimmer 2.5s linear infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(12px)" },
        },
        pulseRed: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "crimson-gradient": "linear-gradient(135deg, #930b0b 0%, #fd1616 50%, #930b0b 100%)",
        "dark-gradient":    "linear-gradient(180deg, #1a0505 0%, #0d0101 100%)",
      },
    },
  },
  plugins: [],
};
