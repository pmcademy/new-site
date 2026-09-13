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
          <span className="eyebrow">Archived programme</span>
          <h2>{route?.label ?? "PMcademy"}</h2>
          {route?.note && <p>{route.note}</p>}
          
          <div className="mt-7 ">
            <div className="mb-2">
            <Tag>This page does not exist</Tag>
          </div>
            <Button href="/levels" size="lg">
              See our new program <Arrow />
            </Button>
          
          </div>
        </Reveal>

        {children ?? (
          <Reveal className="card max-w-2xl p-7">
            <h3 className="text-[20px]">
              You're looking at a url from our older website version
            </h3>
            <p className="mt-3 text-[15px] text-ink-2">
             If you are a paid member of our older program, please reach out to <span className="text-ink">hello@pmcademy.com</span> and our team will grant you access free of cost to the newer version. You can still continue to learn from the older version <a href="https://dashboard.pmcademy.com" className="text-ink underline">here</a>
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
