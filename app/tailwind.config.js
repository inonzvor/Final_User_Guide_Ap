/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        "on-accent": "var(--on-accent)",
        secondary: "var(--secondary)",
        info: "var(--info)",
        success: "var(--success)",
        warn: "var(--warn)",
        danger: "var(--danger)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
