import type { Metadata } from "next";

import ProjectView from "@/components/workspace/ProjectView";

type Params = { params: Promise<{ username: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { username, slug } = await params;
  const title = slug.replace(/-/g, " ");
  return {
    title: `${title} by ${username}`,
    description: `A product management project built at PMcademy.`,
    robots: { index: false, follow: true },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { username, slug } = await params;

  return (
    <section className="section-top">
      <div className="shell-narrow">
        <ProjectView username={username} slug={slug} />
      </div>
    </section>
  );
}
