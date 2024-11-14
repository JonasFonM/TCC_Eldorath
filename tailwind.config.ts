import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeInRise: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInRise: 'fadeInRise 1.5s ease-out forwards',
      },
    },
  },
};