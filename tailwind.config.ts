import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors:{
        primaryYelow:"rgb(250, 205, 49)",
        primaryBlack:"rgb(22, 22, 22)",
        primaryGray:"rgb(150, 150, 150)",
        secondaryYelow:"rgb(143, 115, 20)"
      
      },
      borderWidth: {
        1:'1px'
      },
      height:{
        100:"35rem"
      }
    },
  },
  plugins: [],
};
export default config;
