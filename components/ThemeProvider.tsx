"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import {
  DARK_THEME_COLOR,
  LIGHT_THEME_COLOR,
  THEME_EVENT,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

function readStoredTheme(): Theme | null {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return null;
}

function readSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return readStoredTheme() ?? readSystemTheme();
}

function subscribeToTheme(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  const notifyIfSystemDriven = () => {
    if (!readStoredTheme()) {
      onChange();
    }
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      onChange();
    }
  };

  mediaQuery.addEventListener("change", notifyIfSystemDriven);
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, onChange);

  return () => {
    mediaQuery.removeEventListener("change", notifyIfSystemDriven);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, onChange);
  };
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
  const theme = useSyncExternalStore<Theme>(
    subscribeToTheme,
    getThemeSnapshot,
    (): Theme => "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.style.colorScheme = theme;

    const color = theme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = color;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
