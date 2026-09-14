import FieldArt from "@/components/art/FieldArt";
import type { Metadata } from "next";
import { Suspense } from "react";

import SignInForm from "@/components/auth/SignInForm";
import Reveal from "@/components/motion/Reveal";
import { totalLessons } from "@/lib/course";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Save your progress across all six levels. The course is free and nothing is charged.",
};

export default function SignInPage() {
  return (
    <section className="section-top">
      <div className="shell grid items-start gap-[var(--s-8)] lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <Reveal className="card card-p">
          <span className="eyebrow">PMcademy</span>
          <h1 className="mt-[var(--s-3)] text-[clamp(1.5rem,2.8vw,1.9rem)]">
            Save your progress.
          </h1>
          <p className="mt-[var(--s-3)] text-[15px] text-ink-2">
            The course is free. Sign in to save completed lessons to your account and continue on another device.
          </p>

          <div className="mt-[var(--s-6)]">
            <Suspense
              fallback={
                <div className="h-[220px] rounded-[10px] border border-line bg-surface-2" />
              }
            >
              <SignInForm />
            </Suspense>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-[var(--s-4)]">
          <FieldArt kind="library" className="max-w-[320px] self-center" />
          <div className="note">
            <span className="eyebrow">Nothing is charged</span>
            <p>
              All six levels and all {totalLessons} lessons are free, with no
              card at any point. The badge and the community are the only paid
              part, once, for life.
            </p>
          </div>
          <div className="note note-blue">
            <span className="eyebrow">What is stored</span>
            <p>
              Completed lessons sync to your account. Build checklists, article links and project notes stay in this browser. Keep a copy with your project.
            </p>
          </div>

        </Reveal>
      </div>
    </section>
  );
}
