"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
export default function MotionFrame({ children, className = "", label = "illustration" }: { children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    const update = () => el.dataset.active = String(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.05 });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div ref={ref} className={`motion-frame ${className}`} data-paused={paused} data-active="false">
    {children}
    <button className="art-pause" type="button" onClick={() => setPaused(v => !v)} aria-pressed={paused}>{paused ? "Play" : "Pause"} {label}</button>
  </div>;
}
