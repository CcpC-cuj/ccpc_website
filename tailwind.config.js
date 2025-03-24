module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      },
      fontSize: {
        '12px': '12px',
        '40px': '40px',
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'serif'], 
        radley: ['"Radley"', 'serif'],
        sans: ['Josefin Sans', 'sans-serif'],
        ssans: ['sans-serif'],
      },
      animation: {
        blink: "blink 1s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
