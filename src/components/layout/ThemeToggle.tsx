"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@/components/ui/Icons";

export type Theme = "light" | "dark";

/**
 * Light is the default, always. The OS preference does not override it. The
 * switch is the only thing that changes the theme, and the choice sticks.
 *
 * The matching inline script in layout.tsx applies the stored value before
 * first paint so there's never a flash of the wrong theme.
 */
export const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem("pmc-theme");
    document.documentElement.setAttribute("data-theme", t === "dark" ? "dark" : "light");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
  document.documentElement.classList.remove("no-js");
})();`;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) ?? "light";
    setTheme(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("pmc-theme", next);
    } catch {
      /* private mode, the choice just won't persist */
    }
  }

  return (
    <button
      onClick={toggle}
      className="icobtn"
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {/* Render the light icon until mounted so server and client markup match. */}
      {mounted && theme === "dark" ? <Moon /> : <Sun />}
    </button>
  );
}
