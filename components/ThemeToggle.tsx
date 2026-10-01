"use client";

import { useTheme } from "./ThemeProvider";

// The visible label names the theme you'd switch to. It's chosen in CSS (the
// light: variant) so the prerendered HTML is already right for light-mode
// visitors before hydration.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${next} theme`}>
      <span className="orb" aria-hidden="true" />
      <span className="tlabel" aria-hidden="true">
        <span className="light:hidden">Light</span>
        <span className="hidden light:inline">Dark</span>
      </span>
    </button>
  );
}
