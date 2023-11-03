/** @type {import('tailwindcss').Config} */

const rem = (px) => (px ? `${(px / 16).toFixed(7)}rem` : "0rem");

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#111111",
      grey: "#262626",
      white: "#FFFFFF",
      primary: "#63B0CD"
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
