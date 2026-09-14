import type { Metadata } from "next";
import { Suspense } from "react";

import PublicWorkspace from "@/components/workspace/PublicWorkspace";

type Params = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ s?: string }>;
};

/**
 * A learner's public workspace.
 *
 * Not indexed while workspaces live in the browser: there is nothing on the
 * server for a crawler to read, and a page that renders differently for every
 * visitor should not be in an index. When the store moves server side, switch
 * `robots` to follow the learner's own visibility setting, which is already in
 * the profile as `visibility`.
 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} on PMcademy`,
    description: `A product management workspace built by doing the work: projects, case studies, published writing and achievements.`,
    robots: { index: false, follow: true },
  };
}

export default async function PublicWorkspacePage({ params, searchParams }: Params) {
  const { username } = await params;
  const { s } = await searchParams;

  return (
    <section className="section-top">
      <div className="shell">
        <Suspense fallback={<div className="ws-skeleton" />}>
          <PublicWorkspace username={username} snapshotParam={s} />
        </Suspense>
      </div>
    </section>
  );
}
