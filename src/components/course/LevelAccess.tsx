"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { levelUnlocked, useStore } from "@/lib/progress";
import LevelBadge from "@/components/art/LevelBadge";
export default function LevelAccess({ level, children }: { level: string; children: ReactNode }) {
 const {progress,ready}=useStore();
 if(level==="01" || (ready && levelUnlocked(level,progress.done)))return children;
 return <section className="shell page-wrap lesson-access"><LevelBadge n={level}/><span className="eyebrow">Level {level}</span><h1>{ready ? "Build the foundation first." : "Checking your progress…"}</h1><p>{ready ? "Complete the lessons in the earlier levels to open this lesson. You can still explore every lesson name on the roadmap." : "Your saved progress determines which levels are open."}</p><div className="page-actions"><Link className="btn btn-primary" href="/roadmap">View your roadmap</Link><Link className="btn btn-outline" href="/levels/01">Go to Level 1</Link></div><noscript>Enable JavaScript to read your saved progress and open later levels.</noscript></section>;
}
