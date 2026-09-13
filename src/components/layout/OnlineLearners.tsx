"use client";
import { useBrowserStorage } from "@/lib/useBrowserStorage";
import { useEffect, useId, useState } from "react";

export default function OnlineLearners() {
  const [count, setCount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [storedCollapsed, saveCollapsed] = useBrowserStorage("pmc-presence-collapsed", "sessionStorage");
  const [collapseOverride, setCollapseOverride] = useState<boolean | null>(null);
  const collapsed = collapseOverride ?? storedCollapsed === "yes";
  const id = useId();
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let controller: AbortController | null = null;
    let stopped = false;
    let busy = false;
    let failures = 0;
    const heartbeat = async () => {
      clearTimeout(timer);
      if (stopped || document.hidden || !navigator.onLine || busy) return;
      busy = true;
      controller = new AbortController();
      const timeout = setTimeout(()=>controller?.abort(), 8000);
      const request = async () => {
        // Check again after acquiring a cross-tab lock; the page may have hidden meanwhile.
        if (stopped || document.hidden) return;
        const response = await fetch("/api/presence", { method: "POST", credentials: "same-origin", cache: "no-store", signal: controller!.signal });
        if (!response.ok) throw new Error("unavailable");
        const data = await response.json();
        if (!data.available || !Number.isSafeInteger(data.count) || data.count < 1) throw new Error("invalid count");
        if (!stopped) { setCount(data.count); failures = 0; }
      };
      try {
        // Serialise first requests across tabs so they share the HttpOnly browser cookie.
        if (navigator.locks) await navigator.locks.request("pmc-presence", { signal: controller.signal }, request);
        else await request();
      } catch { if (!stopped) { setCount(null); failures++; } }
      finally {
        clearTimeout(timeout); busy = false;
        if (!stopped && !document.hidden && navigator.onLine) timer = setTimeout(heartbeat, Math.min(120000, 30000 * 2 ** Math.min(failures,2)));
      }
    };
    const visibility = () => {
      clearTimeout(timer);
      if (document.hidden || !navigator.onLine) { controller?.abort(); setCount(null); }
      else void heartbeat();
    };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("online", visibility);
    window.addEventListener("offline", visibility);
    void heartbeat();
    return () => { stopped = true; clearTimeout(timer); controller?.abort(); document.removeEventListener("visibilitychange", visibility); window.removeEventListener("online", visibility); window.removeEventListener("offline", visibility); };
  }, []);
  function collapse() {
    const next = !collapsed;
    setCollapseOverride(next);
    try { saveCollapsed(next ? "yes" : "no"); } catch { /* The control still works without storage. */ }
    setOpen(false);
  }
  return <aside className={`online-learners ${collapsed ? "is-collapsed" : ""}`} aria-label="Learning community">
    {open && <div id={id} className="online-details"><strong>Learning together</strong><p>{count === null ? "The live count is temporarily unavailable." : "Active browsers on PMcademy in the last 90 seconds, including visitors who are not signed in. This is an approximate activity count, not a count of unique people."}</p><p>A temporary anonymous cookie joins your tabs into one browser visit. It is not linked to your account.</p></div>}
    <div className="online-pill"><button type="button" className="online-status" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(v=>!v)} aria-label={collapsed ? "Show learning community activity" : undefined}><span className={`online-dot ${count !== null ? "is-live" : ""}`} aria-hidden="true"/>{!collapsed && <span>{count === null ? "Learning together" : `${count.toLocaleString()} learning now`}</span>}</button><button type="button" className="online-collapse" onClick={collapse} aria-label={collapsed ? "Expand online learners" : "Minimise online learners"}>{collapsed ? "+" : "−"}</button></div>
  </aside>;
}
