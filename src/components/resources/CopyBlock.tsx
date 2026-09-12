"use client";

import { useState } from "react";

/** A block of text with a copy button. Used for templates and prompts. */
export default function CopyBlock({
  label,
  text,
  tall,
}: {
  label: string;
  text: string;
  tall?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked, the text is selectable anyway */
    }
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-line">
      <div className="flex items-center justify-between gap-[var(--s-3)] border-b border-line bg-surface-2 px-[var(--s-4)] py-[var(--s-2)]">
        <span className="eyebrow">{label}</span>
        <button
          onClick={copy}
          className="text-[13px] font-medium text-blue transition-opacity hover:opacity-70"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className={`mono overflow-auto whitespace-pre-wrap bg-surface px-[var(--s-4)] py-[var(--s-4)] text-[12.5px] leading-relaxed text-ink-2 ${
          tall ? "max-h-[620px]" : "max-h-[420px]"
        }`}
      >
        {text}
      </pre>
    </div>
  );
}
