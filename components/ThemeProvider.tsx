"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

function getInitialThemeState(): { theme: Theme; hasStoredPreference: boolean } {
  if (typeof window === "undefined") {
    return { theme: "dark", hasStoredPreference: false };
  }

  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    return { theme: stored, hasStoredPreference: true };
  }

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  return { theme: prefersLight ? "light" : "dark", hasStoredPreference: false };
}

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
  const [theme, setTheme] = useState<Theme>(() => getInitialThemeState().theme);
  const hasStoredPreferenceRef = useRef(getInitialThemeState().hasStoredPreference);

  useEffect(() => {
    // Honour system preference on first visit and live-update if it changes.
    // Once the user toggles manually, we stop following the OS setting.
    const mq = window.matchMedia("(prefers-color-scheme: light)");

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
    if (hasStoredPreferenceRef.current) {
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
  }, [theme]);

  const toggleTheme = () => {
    hasStoredPreferenceRef.current = true;
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
