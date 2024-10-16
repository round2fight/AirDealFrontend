/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        midnightGreen: "#114b5fff",
        lapisLazuli: "#456990ff",
        nyanza: "#e4fde1ff",
        brightPinkCrayola: "#f45b69ff",
        wine: "#6b2737ff",
      },
      gradientColorStops: {
        gradientTop:
          "linear-gradient(0deg, #114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
        gradientRight:
          "linear-gradient(90deg, #114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
        gradientBottom:
          "linear-gradient(180deg, #114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
        gradientLeft:
          "linear-gradient(270deg, #114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
        gradientTopRight:
          "linear-gradient(45deg, #114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
        gradientBottomRight:
          "linear-gradient(135deg, #114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
        gradientTopLeft:
          "linear-gradient(225deg, #114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
        gradientBottomLeft:
          "linear-gradient(315deg, #114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
        gradientRadial:
          "radial-gradient(#114b5fff, #456990ff, #e4fde1ff, #f45b69ff, #6b2737ff)",
      },
    },
  },
  plugins: [],
};
