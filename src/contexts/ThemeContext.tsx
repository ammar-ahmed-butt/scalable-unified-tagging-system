
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";
type FontSize = "sm" | "md" | "lg";
type ColorScheme = "default" | "purple" | "blue" | "green";

interface ThemeContextType {
  theme: Theme;
  fontSize: FontSize;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "system";
  });

  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const savedSize = localStorage.getItem("fontSize") as FontSize;
    return savedSize || "md";
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const savedScheme = localStorage.getItem("colorScheme") as ColorScheme;
    return savedScheme || "default";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    const root = window.document.documentElement;
    root.classList.remove("text-sm", "text-md", "text-lg");
    root.classList.add(`text-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("colorScheme", colorScheme);
    const root = window.document.documentElement;
    root.classList.remove("scheme-default", "scheme-purple", "scheme-blue", "scheme-green");
    root.classList.add(`scheme-${colorScheme}`);
    
    // Update CSS variables based on color scheme
    if (colorScheme === "purple") {
      root.style.setProperty("--primary", "270 77% 32%");
    } else if (colorScheme === "blue") {
      root.style.setProperty("--primary", "210 77% 32%");
    } else if (colorScheme === "green") {
      root.style.setProperty("--primary", "135 77% 32%");
    } else {
      // Default is teal
      root.style.setProperty("--primary", "175 77% 32%");
    }
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
