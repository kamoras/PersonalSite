export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const THEME_EVENT = "themechange";
export const DARK_THEME_COLOR = "#14110d";
export const LIGHT_THEME_COLOR = "#f5efe3";

// Runs before first paint. localStorage throws when storage is blocked (Safari
// with cookies disabled, sandboxed iframes), so every access is guarded.
// It also sets two classes the prerendered HTML can't know about:
// "js" (enables reveal-on-scroll, so no-JS visitors never see hidden content)
// and "pride" in June (decided on the visitor's clock, not the build's).
// The click listener closes the <details> Contents sheet when any top-bar or
// sheet link is followed; it lives here, not in TopBar, so it still works when
// the app bundle fails to load (an in-page link would otherwise scroll the
// page behind a sheet that stays open). It also sends the R·M home link back
// to the top on the homepage, where client navigation to "/" doesn't scroll.
export const themeInitializationScript = `
(() => {
  const root = document.documentElement;
  root.classList.add("js");
  if (new Date().getMonth() === 5) root.classList.add("pride");
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
  document.addEventListener("click", (event) => {
    // Modified clicks open links elsewhere; leave this page as it is.
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target instanceof Element ? event.target : null;
    const link = target ? target.closest(".topbar a") : null;
    const menu = link ? link.closest(".topbar")?.querySelector("details.menu") : null;
    if (menu) menu.open = false;
    if (target?.closest("a.mark") && location.pathname === "/") window.scrollTo({ top: 0 });
  });
})();
`;
