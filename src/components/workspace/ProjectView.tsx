"use client";

import Link from "next/link";

import { useWorkspaceRecord } from "@/lib/workspace/store";

/**
 * One project, on its own page, so it can be sent to somebody.
 *
 * Reads from the local record, which means it works for the learner and for
 * anyone on their machine. When the store moves server side this becomes a
 * server component that looks the project up by username and slug.
 */
export default function ProjectView({
  username,
  slug,
}: {
  username: string;
  slug: string;
}) {
  const record = useWorkspaceRecord();

  if (record === null) return <div className="ws-skeleton" aria-label="Loading" />;

  const project = record.projects.find((p) => p.slug === slug);
  const mine = record.profile.username === username;

  if (!project || !mine) {
    return (
      <div className="card card-p text-center">
        <h1 className="text-[20px]">This project is not here</h1>
        <p className="mx-auto mt-[var(--s-3)] max-w-[46ch] text-ink-2">
          Projects currently live in the browser they were made in, so this page
          only resolves on the learner&rsquo;s own device.
        </p>
        <Link href="/workspace" className="btn btn-primary mt-[var(--s-5)]">
          Your workspace
        </Link>
      </div>
    );
  }

  return (
    <article>
      <nav className="mb-[var(--s-5)] flex items-center gap-[var(--s-3)] text-[13px] text-ink-3">
        <Link href={`/u/${username}`} className="hover:text-ink">
          {record.profile.displayName}
        </Link>
        <span aria-hidden="true">/</span>
        <span>Projects</span>
      </nav>

      <span className="eyebrow">{project.type.replace("-", " ")}</span>
      <h1 className="mt-[var(--s-3)] text-[clamp(1.7rem,3.4vw,2.3rem)]">{project.title}</h1>

      {project.summary && (
        <p className="mt-[var(--s-4)] max-w-[58ch] text-[clamp(1rem,1.4vw,1.12rem)] text-ink-2">
          {project.summary}
        </p>
      )}

      <dl className="mt-[var(--s-6)] flex flex-wrap gap-[var(--s-6)]">
        <div>
          <dd className="text-[15px] font-medium">{project.status}</dd>
          <dt className="text-[12.5px] text-ink-3">status</dt>
        </div>
        <div>
          <dd className="text-[15px] font-medium">
            {new Date(project.updatedAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </dd>
          <dt className="text-[12.5px] text-ink-3">last worked on</dt>
        </div>
        {project.levelSlug && (
          <div>
            <dd className="text-[15px] font-medium">Level {project.levelSlug}</dd>
            <dt className="text-[12.5px] text-ink-3">built during</dt>
          </div>
        )}
      </dl>

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary mt-[var(--s-6)]"
        >
          Open the project
        </a>
      )}

      <div className="note mt-[var(--s-7)]">
        <span className="eyebrow">About this page</span>
        <p>
          Project pages are deliberately plain. The work is the artefact you
          linked, not the page describing it.
        </p>
      </div>
    </article>
  );
}
