/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EFEDE6",
        "paper-dim": "#E4E1D6",
        ink: "#1B1F27",
        "ink-soft": "#454B57",
        signal: "#2F6F5E",
        "signal-soft": "#DCEAE5",
        flag: "#C9752B",
        "flag-soft": "#F3E3D2",
        rule: "#D8D4C6",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "margin-lines":
          "repeating-linear-gradient(to bottom, transparent, transparent 27px, #D8D4C6 27px, #D8D4C6 28px)",
      },
    },
  },
  plugins: [],
};
