import type { Metadata } from "next";
import PageIntro from "@/components/pages/PageIntro";
import LearningRoadmap from "@/components/roadmap/LearningRoadmap";
import { levels, levelOutline } from "@/lib/course";
export const metadata: Metadata = { title: "Your product management roadmap", description: "Explore all 141 lessons across six free product management levels, from Apprentice to Principal." };
export default function RoadmapPage(){return <div className="shell page-wrap"><PageIntro eyebrow="Your field map" title="A clear path. Room to explore." description="See every chapter and lesson before you begin. Start with the foundations, follow the branches, and unlock each new level through the work you finish." art="compass"/><LearningRoadmap levels={levels.map(l=>({...levelOutline(l),title:l.title,capstone:l.capstone.title}))}/></div>;}
