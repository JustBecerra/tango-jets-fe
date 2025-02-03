/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: { 
        sans: ["-apple-system", "BlinkMacSystemFont", "sans-serif"],
        cursive: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
