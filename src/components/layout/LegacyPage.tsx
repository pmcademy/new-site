import Link from "next/link";

import Reveal from "@/components/motion/Reveal";
import Button, { Tag } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Icons";
import { legacyRoutes } from "@/lib/site";

/**
 * PRESERVED ROUTE SHELL.
 *
 * Every URL live on pmcademy.com today resolves to one of these, so nothing
 * 404s during the revamp and existing links, ads and search results keep
 * working. Port each page's real content in by passing children, then delete
 * the fallback. The route itself never changes.
 */
export default function LegacyPage({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) {
  const route = legacyRoutes.find((r) => r.href === href);
  const others = legacyRoutes.filter((r) => r.href !== href).slice(0, 6);

  return (
    <section className="sec">
      <div className="shell">
        <Reveal className="head">
          <span className="eyebrow">Existing programme</span>
          <h2>{route?.label ?? "PMcademy"}</h2>
          {route?.note && <p>{route.note}</p>}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="/levels" size="lg">
              See the new program <Arrow />
            </Button>
            <Tag>This page is being rebuilt</Tag>
          </div>
        </Reveal>

        {children ?? (
          <Reveal className="card max-w-2xl p-7">
            <h3 className="text-[20px]">
              Content coming across from the current site.
            </h3>
            <p className="mt-3 text-[15px] text-ink-2">
              This route is preserved exactly as it is today so nothing breaks.
              The existing copy for{" "}
              <span className="text-ink">{route?.label}</span> gets ported into
              this shell in a later phase. The URL stays the same either way.
            </p>
            <p className="mt-3 text-[13.5px] text-ink-3">
              Developer note: pass children to{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">
                &lt;LegacyPage&gt;
              </code>{" "}
              in{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">
                src/app{href}/page.tsx
              </code>
              .
            </p>
          </Reveal>
        )}

        <Reveal stagger className="mt-14 border-t border-line pt-9">
          <h3 className="eyebrow mb-5">Elsewhere on PMcademy</h3>
          <ul className="grid list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
            {others.map((r) => (
              <li key={r.href} data-reveal>
                <Link
                  href={r.href}
                  className="card group flex flex-col gap-2 p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-2"
                >
                  <span className="flex items-center justify-between gap-3 text-[16px] font-semibold">
                    {r.label}
                    <Arrow className="h-3.5 w-3.5 text-blue transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span className="text-[13.5px] text-ink-3">{r.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
