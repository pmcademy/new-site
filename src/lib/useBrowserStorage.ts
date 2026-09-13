"use client";
import { useSyncExternalStore } from "react";
const event = "pmc-browser-storage";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(event, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(event, callback); };
}
const serverSnapshot = () => "";
export function useBrowserStorage(key: string, kind: "localStorage" | "sessionStorage" = "localStorage") {
  const value = useSyncExternalStore(subscribe, () => {
    try { return window[kind].getItem(key) ?? ""; } catch { return ""; }
  }, serverSnapshot);
  function save(next: string) {
    window[kind].setItem(key, next);
    window.dispatchEvent(new Event(event));
  }
  return [value, save] as const;
}
