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
  const [hasStoredPreference, setHasStoredPreference] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setHasStoredPreference(true);
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    if (hasStoredPreference) {
      localStorage.setItem("theme", theme);
    }

    const color = theme === "dark" ? "#100d09" : "#faf7f2";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = color;
  }, [hasStoredPreference, theme]);

  const toggleTheme = () => {
    setHasStoredPreference(true);
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
