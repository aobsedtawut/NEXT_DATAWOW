import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    ".//@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "brand-green-500": "#253329",
        "brand-green-300": "#364641",
        "brand-green-100": "#87CEEB",
        "brand-golden": "#D9A808",
        "brand-black": "#000000",
        "brand-white": "#FFFFFF",
        "brand-text": "#364641",
        "brand-gray-100": "#F0F0F0",
        "brand-gray-300": "#CCCCCC",
        "brand-success": "#4CAF50",
      },
    },
  },
  plugins: [],
}) satisfies Config;
