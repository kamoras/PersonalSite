export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const THEME_EVENT = "themechange";
export const DARK_THEME_COLOR = "#100d09";
export const LIGHT_THEME_COLOR = "#faf7f2";

// localStorage throws when storage is blocked (Safari with cookies disabled,
// sandboxed iframes), so every access is guarded.
export const themeInitializationScript = `
(() => {
  const root = document.documentElement;
  let stored = null;
  try {
    stored = window.localStorage.getItem("${THEME_STORAGE_KEY}");
  } catch {}
  const theme = stored === "light" || stored === "dark"
    ? stored
    : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  const color = theme === "light" ? "${LIGHT_THEME_COLOR}" : "${DARK_THEME_COLOR}";
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", color);
})();
`;
