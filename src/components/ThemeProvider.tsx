import { ThemeContext } from "@/hooks/useTheme";
import type { theme } from "@/types";
import { useEffect, useState } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as theme) || "system";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = window.document.documentElement;

    if (theme === "system") {
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      root.classList.remove("light", "dark");

      root.classList.add(systemTheme ? "dark" : "light");
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
