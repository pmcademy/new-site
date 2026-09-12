import type { Lesson } from "@/lib/curriculum";

/**
 * One mission, in full. The brief comes first, the concept last — the whole
 * pedagogy of the program is this ordering.
 *
 * `brief` is the only field allowed to contain markup (<em> for emphasis), and
 * it is authored in-repo rather than user-supplied.
 */
export default function Mission({ lesson: l, n }: { lesson: Lesson; n: number }) {
  return (
    <article className="grid gap-x-[18px] border-b border-line py-6 sm:grid-cols-[44px_1fr]">
      <span className="mb-1.5 text-[13px] tabular-nums text-ink-3 sm:mb-0 sm:pt-1">
        {String(n).padStart(2, "0")}
      </span>

      <div>
        <div className="flex flex-wrap items-baseline gap-2.5">
          <h3 className="text-[18px]">{l.t}</h3>
          <span className="kind">{l.k}</span>
          <span className="ml-auto text-[13px] tabular-nums text-ink-3">
            {l.m} min
          </span>
        </div>

        <p
          className="brief mt-2.5 max-w-[72ch] text-ink-2"
          dangerouslySetInnerHTML={{ __html: l.b }}
        />

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="m-box m-box-ai">
            <span className="eyebrow">The AI move</span>
            <p>{l.ai}</p>
          </div>
          <div className="m-box m-box-ship">
            <span className="eyebrow">What you ship</span>
            <p>{l.ship}</p>
          </div>
        </div>

        <p className="mt-3 text-[14px] text-ink-3">
          <b className="font-medium text-ink-2">You learn:</b> {l.l}
        </p>
      </div>
    </article>
  );
}
