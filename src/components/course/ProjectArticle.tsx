"use client";
import { useBrowserStorage } from "@/lib/useBrowserStorage";
import { useId, useState } from "react";
import type { ArticleAssignment } from "@/lib/course/enrichment/level-one";

export default function ProjectArticle({ assignment, lessonId }: { assignment: ArticleAssignment; lessonId: string }) {
  const id = useId();
  const key = `pmc-article:${lessonId}`;
  const [savedUrl, saveUrl] = useBrowserStorage(key);
  const [draft, setUrl] = useState<string | null>(null);
  const url = draft ?? savedUrl;
  const [message, setMessage] = useState("");
  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const parsed = new URL(url);
      if (!['https:','http:'].includes(parsed.protocol)) throw new Error('url');
      saveUrl(parsed.href);
      setMessage("Saved on this browser. Keep this URL with your capstone submission.");
    } catch { setMessage("Could not save. Check the full URL and whether browser storage is available; keep a copy in your project notes."); }
  }
  return <section className="project-article" aria-labelledby={`${id}-title`}>
    <span className="eyebrow">Publish your project · {assignment.number} of 3 in Level {Number(lessonId.split("/")[0])}</span>
    <h3 id={`${id}-title`}>{assignment.title}</h3><p>{assignment.brief}</p>
    <p><strong>Include:</strong> {assignment.artifact}</p>
    <ol><li>Write in your own voice for someone facing the same product problem.</li><li>Use AI to critique the structure and find unsupported claims. Verify every source, number, and quotation yourself. Add a short note describing how you used AI.</li><li>Remove private customer, company, and participant information. Label practice scenarios and synthetic data clearly.</li><li>Publish on <a href="https://medium.com" target="_blank" rel="noreferrer">Medium</a>, <a href="https://substack.com" target="_blank" rel="noreferrer">Substack</a>, or a relevant <a href="https://www.reddit.com" target="_blank" rel="noreferrer">Reddit</a> community that permits project write-ups and links. Follow its posting rules; share a useful account of the work.</li></ol>
    <p>Include this plain attribution with a clickable link:</p>
    <blockquote>I developed this project while learning product management at <a href="https://pmcademy.com" target="_blank" rel="noreferrer">pmcademy.com</a>.</blockquote>
    <form onSubmit={save}><label htmlFor={`${id}-url`}>Your published article URL</label><div className="article-url-row"><input id={`${id}-url`} type="url" required maxLength={2000} value={url} onChange={e=>{setUrl(e.target.value);setMessage("");}} placeholder="https://…"/><button type="submit" className="lab-toggle">Save link</button></div><p className="article-storage">Stored only in this browser. Saving a link does not publish an article or submit it for badge review.</p><p role="status">{message}</p></form>
  </section>;
}
