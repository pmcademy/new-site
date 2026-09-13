import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import LevelAccess from "@/components/course/LevelAccess";
import { getLesson } from "@/lib/course";
export default async function LessonLayout({ children, params }: { children: ReactNode; params: Promise<{level:string;lesson:string}> }) {
 const {level,lesson}=await params;if(!getLesson(level,lesson))notFound();
 return <LevelAccess level={level}>{children}</LevelAccess>;
}
