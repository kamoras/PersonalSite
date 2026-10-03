"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import {
  DARK_THEME_COLOR,
  LIGHT_THEME_COLOR,
  THEME_EVENT,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

// localStorage throws when storage is blocked; a throwing getSnapshot would
// take down the whole tree, so fall back to the system preference instead.
function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {}
  return null;
}

// Without storage the choice lives here for the rest of the page's lifetime.
let sessionTheme: Theme | null = null;

function readSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return readStoredTheme() ?? sessionTheme ?? readSystemTheme();
}

function subscribeToTheme(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  const notifyIfSystemDriven = () => {
    if (!readStoredTheme() && !sessionTheme) {
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
    // During hydration `theme` is still the server snapshot ("dark"); reading
    // the live value avoids flipping a light page to dark for one frame.
    const current = getThemeSnapshot();
    document.documentElement.classList.toggle("light", current === "light");
    document.documentElement.style.colorScheme = current;

    const color = current === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
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
    sessionTheme = nextTheme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
