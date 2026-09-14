"use client";

import { useEffect, useRef } from "react";

/**
 * The panel that opens when an object is clicked.
 *
 * A dialog, not a div that looks like one: escape closes it, focus moves into
 * it and comes back to the object that opened it, the page behind does not
 * scroll, and on a phone it arrives as a bottom sheet rather than a modal the
 * size of a postage stamp.
 */
export default function Panel({
  open,
  title,
  subtitle,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const returnTo = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;

      const focusable = ref.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      (returnTo.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ws-panel-root">
      <div className="ws-scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`ws-panel${wide ? " ws-panel-wide" : ""}`}
      >
        <div className="ws-panel-head">
          <div>
            <h2 className="text-[18px]">{title}</h2>
            {subtitle && (
              <p className="mt-[var(--s-1)] text-[13.5px] text-ink-3">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="icobtn"
            aria-label="Close"
            data-autofocus
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="ws-panel-body">{children}</div>
      </div>
    </div>
  );
}
