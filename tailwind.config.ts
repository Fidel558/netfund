import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        netfund: {
          green: "#006B3F",
          dark: "#004D2C",
          light: "#E8F5EE",
          gold: "#F4B400",
        },
      },
    },
  },
  plugins: [],
};

export default config;
