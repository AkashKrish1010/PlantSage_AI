import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        akkurat: ["var(--font-akkurat)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        mono:    ["var(--font-fragment-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        // legacy aliases kept for any remaining references
        display: ["var(--font-akkurat)", "ui-sans-serif", "sans-serif"],
        body:    ["var(--font-akkurat)", "ui-sans-serif", "sans-serif"],
        serif:   ["var(--font-akkurat)", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        /* ── Adaline palette ── */
        "cream-paper":    "#fbfdf6",
        "botanical-ink":  "#0a1d08",
        "bark-brown":     "#31200b",
        "warm-loam":      "#4a3212",
        "forest-floor":   "#203b14",
        "sage-mist":      "#eff2e8",
        "lichen":         "#e0e5d5",
        "moss-veil":      "#d7e8b5",
        "eucalyptus":     "#c5ccb6",
        "onyx":           "#000000",

        /* ── shadcn/ui mapped tokens ── */
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ── legacy herb/earth/saffron aliases → mapped to Adaline equivalents ── */
        herb:    { DEFAULT: "#203b14", light: "#d7e8b5", dark: "#0a1d08" },
        earth:   { DEFAULT: "#4a3212", light: "#eff2e8" },
        bark:    "#31200b",
        saffron: "#4a3212",
      },
      borderRadius: {
        button: "20px",
        tag:    "9999px",
        image:  "8px",
        nav:    "20px",
        lg:     "var(--radius)",
        md:     "calc(var(--radius) - 2px)",
        sm:     "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        adaline: "rgba(99, 143, 61, 0.1) 0px 0px 0px 1px",
      },
      spacing: {
        "18": "72px",
        "22": "88px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "bloom": {
          "0%":   { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)",    opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.6s ease-out forwards",
        "float":          "float 4s ease-in-out infinite",
        "bloom":          "bloom 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
