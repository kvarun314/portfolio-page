"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Dark/light toggle. The initial theme class is set before paint by the
 * inline script in the root layout; this component reflects and flips it,
 * persisting the choice to localStorage.
 *
 * Theme state is read straight from the <html> class via
 * useSyncExternalStore, so multiple toggle instances (desktop + mobile
 * navbar) stay in sync through the shared MutationObserver subscription.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getTheme = () =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable (private mode) — theme still flips for the session
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line-bright text-fg-mid transition-all duration-200 hover:border-accent hover:text-fg cursor-pointer"
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
