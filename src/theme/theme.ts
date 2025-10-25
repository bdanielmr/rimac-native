export const theme = {
  colors: {
    bg: "#0646f4ff",
    surface: "#FFFFFF",
    textPrimary: "#03050F",
    textSecondary: "#5E6488",
    violet: "#C333FF",
    border: "#E5E7EB",
    danger: "#DC2626",
  },
  radius: {
    md: 12,
    lg: 20,
    extralg: 40,
    pill: 999,
  },
  spacing: (n: number) => n * 4,
  breakpoints: {
    md: 925,
    lg: 1024,
  },
} as const;
