import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: "#0A0E1A",
          card: "#131929",
          surface: "#1C2640",
          border: "#232D45",
          accent: "#3DFF72",
          secondary: "#8A9BBE",
          error: "#FF4757",
          warning: "#FFA502",
          blue: "#3D9BFF",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "grid-fade": "grid-fade 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-10px) rotate(0deg)" },
          "50%": { transform: "translateY(10px) rotate(15deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(61,255,114,0.3), 0 0 60px rgba(61,255,114,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(61,255,114,0.6), 0 0 100px rgba(61,255,114,0.2)" },
        },
        "grid-fade": {
          "0%, 100%": { opacity: "0.03" },
          "50%": { opacity: "0.06" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
