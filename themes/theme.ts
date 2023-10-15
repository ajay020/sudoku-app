const commonColor = {
  commonBlue: "dodgerblue",
  commonRed: "red",
  activeColor: "lightblue",
};

export const lightTheme = {
  primaryBackground: "#F0F0F0",
  primaryText: "#000000",
  accentColor: "#007BFF",
  secondaryBackground: "#F5F5F5",
  secondaryText: "#6C757D",
  ...commonColor,
};

export const darkTheme = {
  primaryBackground: "#121212",
  primaryText: "#FFFFFF",
  accentColor: "#007BFF",
  secondaryBackground: "#1A1A1A",
  secondaryText: "#6C757D",
  ...commonColor,
};
export type Theme = typeof lightTheme; // Use light theme as the default

export const toggleTheme = (theme: Theme) =>
  theme === lightTheme ? darkTheme : lightTheme;
