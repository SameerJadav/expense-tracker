import { gray, red, blue } from "@radix-ui/colors";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["geist-sans", ...fontFamily.sans],
      },
      colors: {
        gray: {
          1: gray.gray1,
          2: gray.gray2,
          3: gray.gray3,
          4: gray.gray4,
          5: gray.gray5,
          6: gray.gray6,
          7: gray.gray7,
          8: gray.gray8,
          9: gray.gray9,
          10: gray.gray10,
          11: gray.gray11,
          12: gray.gray12,
        },
        red: {
          1: red.red1,
          2: red.red2,
          3: red.red3,
          4: red.red4,
          5: red.red5,
          6: red.red6,
          7: red.red7,
          8: red.red8,
          9: red.red9,
          10: red.red10,
          11: red.red11,
          12: red.red12,
        },
        blue: {
          1: blue.blue1,
          2: blue.blue2,
          3: blue.blue3,
          4: blue.blue4,
          5: blue.blue5,
          6: blue.blue6,
          7: blue.blue7,
          8: blue.blue8,
          9: blue.blue9,
          10: blue.blue10,
          11: blue.blue11,
          12: blue.blue12,
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out",
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
