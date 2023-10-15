import React, { createContext, useContext, useState, ReactNode } from "react";
import { lightTheme, Theme, toggleTheme } from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(lightTheme);

  const contextValue = {
    theme,
    toggleTheme: () => {
      setTheme((currentTheme) => toggleTheme(currentTheme));
    },
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
