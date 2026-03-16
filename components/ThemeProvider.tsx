"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      return;
    }

    // Honour system preference on first visit and live-update if it changes
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    if (mq.matches) setTheme("light");

    const onChange = (e: MediaQueryListEvent) => {
      // Only follow system if the user hasn't made a manual choice
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "light" : "dark");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
