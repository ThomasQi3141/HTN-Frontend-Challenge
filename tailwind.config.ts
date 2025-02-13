import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#0D0B1E",
        bgSecondary: "#312450",
        primary: "#3F8EFC",
        accent: "#E956C4",
        text: "#EAEAEA",
      },
    },
  },
  plugins: [],
} satisfies Config;
