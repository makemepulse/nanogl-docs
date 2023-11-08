/** @type {import('tailwindcss').Config} */

const rem = (px) => (px ? `${(px / 16).toFixed(7)}rem` : "0rem");

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: "transparent",
      black: {
        DEFAULT: "#111111",
        50: "rgba(17, 17, 17, 0.5)",
        30: "rgba(17, 17, 17, 0.3)",
      },
      grey: {
        DEFAULT: "#262626",
        50: "rgba(38, 38, 38, 0.5)"
      },
      'light-grey': '#303030',
      white: {
        DEFAULT: "#FFFFFF",
        50: "rgba(255, 255, 255, 0.5)",
        25: "rgba(255, 255, 255, 0.25)",
        10: "rgba(255, 255, 255, 0.1)",
        5: "rgba(255, 255, 255, 0.05)",
      },
      primary: {
        DEFAULT: "#63B0CD",
        25: "rgba(99, 176, 205, 0.25)",
        5: "rgba(99, 176, 205, 0.05)",
      },
      important: {
        DEFAULT: "#f87171",
        25: "#f8717140"
      }
    },
    spacing: () => {
      const v = {
        px: "1px",
        2: rem(2),
        3: rem(3),
        4: rem(4),
        5: rem(5),
        6: rem(6),
        10: rem(10),
        12: rem(12),
        18: rem(18),
        20: rem(20),
        30: rem(30),
        68: rem(68),
        "1/2em": ".5em",
        em: "1em",
      };
      for (let i = 0; i <= 50; i++) {
        v[`${i * 8}`] = rem(i * 8);
      }
      return v;
    },
    fontSize: ({ theme }) => ({
      ...theme("spacing"),
      64: rem(64),
      40: rem(40),
      24: rem(24),
      16: rem(16),
      14: rem(14),
      12: rem(12),
      10: rem(10),
      8: rem(8),
    }),
    extend: {},
  },
  plugins: [],
}
