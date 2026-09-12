"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import FieldArt from "./FieldArt";

type Paint = { ty?: string; nm?: string; c?: { a: number; k: number[] } };

export default function CompassMotion() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const animation = useRef<AnimationItem | null>(null);
  const pauseRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    let visible = false;
    let started = false;
    let rebuild: (() => void) | undefined;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const play = () => {
      if (reduced.matches) animation.current?.goToAndStop(120, true);
      else if (visible && !document.hidden && !pauseRef.current) animation.current?.play();
      else animation.current?.pause();
    };
    async function start() {
      if (started) return;
      started = true;
      try {
        const [{ default: lottie }, { default: source }] = await Promise.all([import("lottie-web"), import("./compass.json")]);
        if (disposed || !canvas.current) return;
        rebuild = () => {
          if (disposed || !canvas.current) return;
          const frame = animation.current?.currentFrame ?? 0;
          animation.current?.destroy();
          const data = structuredClone(source);
          const styles = getComputedStyle(document.documentElement);
          for (const layer of data.layers) {
            for (const shape of layer.shapes as Paint[]) {
              if ((shape.ty === "fl" || shape.ty === "st") && shape.c && shape.nm?.startsWith("--art-")) {
                const hex = styles.getPropertyValue(shape.nm).trim().replace("#", "");
                if (/^[a-f0-9]{6}$/i.test(hex)) shape.c.k = [0,2,4].map(offset => parseInt(hex.slice(offset, offset + 2),16) / 255).concat(1);
              }
            }
          }
          const instance = lottie.loadAnimation({ container: canvas.current, renderer: "svg", loop: true, autoplay: false, animationData: data });
          animation.current = instance;
          const ready = () => {
            if (disposed) return;
            setLoaded(true);
            instance.goToAndStop(frame, true);
            play();
          };
          instance.addEventListener("DOMLoaded", ready);
          instance.addEventListener("error", () => { if (!disposed) setLoaded(false); });
          if (instance.isLoaded) ready();
        };
        rebuild();
      } catch { if (!disposed) setLoaded(false); }
    }
    const view = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) void start();
      play();
    });
    view.observe(element);
    const theme = new MutationObserver(() => rebuild?.());
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    reduced.addEventListener("change", play);
    document.addEventListener("visibilitychange", play);
    return () => {
      disposed = true;
      view.disconnect();
      theme.disconnect();
      reduced.removeEventListener("change", play);
      document.removeEventListener("visibilitychange", play);
      animation.current?.destroy();
      animation.current = null;
    };
  }, []);

  function toggle() {
    const next = !pauseRef.current;
    pauseRef.current = next;
    setPaused(next);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (next) animation.current?.pause();
    else animation.current?.play();
  }

  return <div ref={root}>
    <div className="lottie-accent" aria-hidden="true">
      <div ref={canvas} className="lottie-canvas" style={{ visibility: loaded ? "visible" : "hidden" }} />
      {!loaded && <div className="lottie-fallback"><FieldArt kind="compass" /></div>}
    </div>
    <button type="button" className="motion-toggle" aria-pressed={paused} onClick={toggle}>{paused ? "Play compass" : "Pause compass"}</button>
  </div>;
}
