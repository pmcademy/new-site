"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/ui/Icons";
export { themeInitScript } from "./theme";
export type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function updateChrome() {
  const color = getComputedStyle(document.documentElement).getPropertyValue("--paper").trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", color);
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(() => { updateChrome(); callback(); });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  function sync(event: StorageEvent) {
    if (event.key === "pmc-theme" || event.key === null) {
      document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    }
  }
  window.addEventListener("storage", sync);
  return () => { observer.disconnect(); window.removeEventListener("storage", sync); };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  useEffect(() => { updateChrome(); }, []);
  function toggle() {
    const next = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("pmc-theme", next); } catch {}
  }
  return <button onClick={toggle} className="icobtn" aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
    {theme === "dark" ? <Moon /> : <Sun />}
  </button>;
}
