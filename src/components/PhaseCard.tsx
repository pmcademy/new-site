import Link from "next/link";

import { Arrow } from "@/components/ui/Icons";
import { Tag } from "@/components/ui/Button";
import { phaseHours, type Phase } from "@/lib/curriculum";

export default function PhaseCard({ phase: p }: { phase: Phase }) {
  return (
    <Link
      href={`/certifications/${p.slug}`}
      data-reveal
      className="card group flex flex-col gap-3 p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-2"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="serif-num text-[42px]">{p.n}</span>
        <Tag tone={p.free ? "free" : "inc"}>{p.free ? "Free" : "Included"}</Tag>
      </div>

      <h3 className="text-[19px]">{p.title}</h3>
      <p className="text-[14.5px] text-ink-2">{p.promise}</p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3.5 text-[13px] text-ink-3">
        <span>
          {p.lessons.length} missions · ~{phaseHours(p)}h · {p.cert}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-blue">
          View
          <Arrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
