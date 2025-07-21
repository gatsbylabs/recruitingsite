import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#3e3c32",
          fg: "#f4e4c1",
          dim: "#d4c4a1",
          bright: "#fef4d1",
          accent: "#c4b491",
        },
      },
      fontFamily: {
        mono: ["Golos Text", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;