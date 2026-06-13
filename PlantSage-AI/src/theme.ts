// ─── PlantSage AI — Design Tokens ────────────────────────────────────────────

export const lightColors = {
  // Backgrounds
  background: "#f9f5ef",
  surface: "#f4ede3",
  surfaceAlt: "#ede8df",

  // Primary – herb green
  primary: "#2d6a4f",
  primaryForeground: "#f9f5ef",
  primarySoft: "rgba(45,106,79,0.12)",
  primaryLight: "#d1e8d4",

  // Accent – saffron
  accent: "#d97316",
  accentForeground: "#f9f5ef",

  // Earth tones
  earth: "#7c5c3b",
  earthLight: "#e8ddd0",

  // Text
  text: "#2c1f14",
  textMuted: "#8a7060",

  // Utility
  border: "#ddd4c7",
  danger: "#dc2626",
  dangerLight: "rgba(220,38,38,0.08)",
  dangerBorder: "rgba(220,38,38,0.25)",

  // Hero gradient
  herbDark: "#1b4332",
  herb: "#2d6a4f",
  saffron: "#d97316",
};

export const darkColors = {
  // Backgrounds — deep forest black-greens
  background: "#0e1a13",
  surface: "#162219",
  surfaceAlt: "#1a2920",

  // Primary — slightly brightened for contrast on dark
  primary: "#4aab7a",
  primaryForeground: "#0e1a13",
  primarySoft: "rgba(74,171,122,0.15)",
  primaryLight: "#1a3526",

  // Accent – saffron (slightly warmer)
  accent: "#f09030",
  accentForeground: "#0e1a13",

  // Earth tones
  earth: "#c49a6c",
  earthLight: "#2a1e12",

  // Text
  text: "#f0ece4",
  textMuted: "#7a9a84",

  // Utility
  border: "#243e2d",
  danger: "#f87171",
  dangerLight: "rgba(248,113,113,0.1)",
  dangerBorder: "rgba(248,113,113,0.25)",

  // Hero gradient — darker shades
  herbDark: "#071009",
  herb: "#4aab7a",
  saffron: "#f09030",
};

// Legacy export — defaults to light (used by components that haven't
// migrated to useThemeColors yet; will be overridden at runtime via context)
export const colors = lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  full: 999,
};

export const font = {
  display: "serif",
  body: "sans-serif",
};

export type AppColors = typeof lightColors;
