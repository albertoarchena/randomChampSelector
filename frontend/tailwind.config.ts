import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        MainFont: ["Beaufort for LOL", "sans-serif"],
        SecondaryFont: ["Spiegel Sans", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "hex-wallpaper": "url('@/src/public/img/wallpaper.jpg)",
      },
    },
  },
  plugins: [],
};
export default config;
