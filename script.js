(function () {
  const KEY = "theme-preference";
  const root = document.documentElement;

  // Read saved choice, fall back to the system preference
  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) { /* storage blocked: ignore */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    const label = document.getElementById("modeLabel");
    if (btn) {
      const dark = theme === "dark";
      btn.setAttribute("aria-checked", String(dark));
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    if (label) label.textContent = theme === "dark" ? "Dark mode" : "Light mode";
  }

  // Runs immediately (script is in <head>) so there's no flash of the wrong theme
  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(root.getAttribute("data-theme")); // sync button + label once they exist

    document.getElementById("themeToggle").addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
    });
  });
})();
