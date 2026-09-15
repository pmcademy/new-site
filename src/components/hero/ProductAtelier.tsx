"use client";

import { useState, type CSSProperties } from "react";
import AtelierArt from "./AtelierArt";
import styles from "./ProductAtelier.module.css";
import Button from "../ui/Button";
import { Arrow } from "../ui/Icons";
import ProductGarden from "./ProductGarden";

type Props = { className?: string; title?: string; subtitle?: string; ctaLabel?: string; ctaHref?: string; artOnly?: boolean; speed?: number };

export default function ProductAtelier({ className = "", title = "Learn Product Management", subtitle = "Follow your curiosity. Free for everyone.", ctaLabel = "START LEARNING", ctaHref = "/levels/start", artOnly = true, speed = 1 }: Props) {
  const [paused, setPaused] = useState(false);
  const duration = Number.isFinite(speed) && speed > 0 ? 1 / speed : 1;
  return <section className={`${styles.hero} ${className}`} data-paused={paused} style={{ "--tempo": duration } as CSSProperties} aria-label="Product management learning">
    <div className={styles.content}>
      {!artOnly && <p className={styles.kicker}>THE ART OF BUILDING SOMETHING THAT MATTERS</p>}
      <div className={styles.art}>
        {/* <AtelierArt /> */}
        <ProductGarden />
        </div>
      <div className={styles.copy}>
        {/* <h1>{title}</h1>
        <p>{subtitle}</p> */}
        <a href={ctaHref} className={styles.button}><span>{ctaLabel}</span>
          {/* <span aria-hidden="true">↗</span> */}
        </a>
        <a href={'/levels'} className={styles.button}><span>{'VIEW LEVELS'}</span>
          {/* <span aria-hidden="true">↗</span> */}
        </a>
      </div>
      {/* <button className={styles.pause} type="button" aria-pressed={paused} aria-label={paused ? "Play animation" : "Pause animation"} onClick={() => setPaused(!paused)}>{paused ? "PLAY MOTION ↗" : "PAUSE MOTION Ⅱ"}</button> */}
      <div className="shell mt-20 field-rule" aria-hidden="true">✦</div>
    </div>
  </section>;
}
