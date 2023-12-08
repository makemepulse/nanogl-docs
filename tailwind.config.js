/** @type {import('tailwindcss').Config} */

const TRANSPARENCY = [75, 50, 25, 10, 5];

const rem = (px) => (px ? `${(px / 16).toFixed(7)}rem` : "0rem");

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    colors: () => {
      const colors = {
        current: 'currentColor',
        transparent: "transparent",
        black: {
          DEFAULT: "#111111",
        },
        grey: {
          DEFAULT: "#262626",
        },
        'light-grey': {
          DEFAULT: '#303030',
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#63B0CD",
          dark: "#1a4353"
        },
        purple: {
          DEFAULT: "#c084fc",
        },
        blue: {
          DEFAULT: "#38bdf8",
        },
        green: {
          DEFAULT: "#4ade80",
        },
        yellow: {
          DEFAULT: "#fbbf24",
        },
        orange: {
          DEFAULT: "#fb923c",
        },
        red: {
          DEFAULT: "#f87171",
        }
      };

      const names = Object.keys(colors);

      for (let i = 0; i < names.length; i++) {
        const color = colors[names[i]];
        const base = color.DEFAULT;

        if (!base) continue;

        TRANSPARENCY.forEach((level) => {
          color[level] = `rgba(${hexToRgb(base)}, ${level / 100})`;
        });
      }

      return colors;
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
        menu: rem(64),
        'full-menu': 'calc(100vh - theme(spacing.menu))'
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
