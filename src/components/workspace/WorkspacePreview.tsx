"use client";

import Link from "next/link";
import { useState } from "react";

import Panel from "./Panel";
import WorkspaceScene from "./WorkspaceScene";
import styles from "./WorkspacePreview.module.css";

export default function WorkspacePreview() {
  const [invitationOpen, setInvitationOpen] = useState(true);

  return (
    <section className={styles.preview} aria-labelledby="workspace-preview-title">
      <header className={styles.heading}>
        <span className="eyebrow">A place for your progress</span>
        <h1 id="workspace-preview-title">A room that grows with your practice.</h1>
        <p>Explore a complete learner workspace, then log in to create one shaped by the lessons, projects and case studies you finish.</p>
      </header>

      <div className={styles.room}>
        <WorkspaceScene preview locked interactive={false} />
        <button type="button" className={styles.loginPill} onClick={() => setInvitationOpen(true)}>
          Log in to make this workspace yours <span aria-hidden="true">↗</span>
        </button>
      </div>

      <ul className={styles.features} aria-label="What your workspace holds">
        <li><span aria-hidden="true">01</span><div><strong>A shelf of discoveries</strong><p>Every completed case study becomes a book.</p></div></li>
        <li><span aria-hidden="true">02</span><div><strong>A home for your work</strong><p>Projects, articles and milestones fill real places.</p></div></li>
        <li><span aria-hidden="true">03</span><div><strong>Progress you can see</strong><p>Your calendar, streak plant and trophies grow with you.</p></div></li>
      </ul>

      <Panel open={invitationOpen} title="This could be your workspace" onClose={() => setInvitationOpen(false)}>
        <div className={styles.invitation}>
          <span className={styles.sparkle} aria-hidden="true">✦</span>
          <p>This preview shows a fully developed room. Log in and yours will start from your real PMcademy progress. Complete lessons, read case studies and publish projects to fill it.</p>
          <Link href="/signin?next=%2Fworkspace" className="btn btn-primary">Log in to view and play with your own workspace <span aria-hidden="true">↗</span></Link>
          <button type="button" className="btn btn-quiet" onClick={() => setInvitationOpen(false)}>Look around the preview first</button>
          <small>Viewing the sample is free. Its objects are intentionally locked.</small>
        </div>
      </Panel>
    </section>
  );
}
