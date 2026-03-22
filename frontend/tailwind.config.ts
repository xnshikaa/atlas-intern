import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atlasPrimary: "#2A3A8A",
        atlasPrimaryHover: "#1E2A66",
        atlasCyan: "#00E5FF",
        atlasRed: "#E7203A",
        sidebar: "#2A3A8A",
        sidebarHover: "#1E2A66",
        sidebarActive: "rgba(0, 229, 255, 0.1)",
        contentBg: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
export default config;
