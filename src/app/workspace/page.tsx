import type { Metadata } from "next";

import Workspace from "@/components/workspace/Workspace";

export const metadata: Metadata = {
  title: "Your workspace",
  description:
    "A room that fills up as you learn. Every object in it is something you did.",
  robots: { index: false, follow: false },
};

export default function WorkspacePage() {
  return (
    <section className="section-top">
      <div>
        <Workspace />
      </div>
    </section>
  );
}
