"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Arrow, Check, Lock } from "@/components/ui/Icons";
import { domains } from "@/lib/domains";
import { setDomain, useStore } from "@/lib/progress";
import { cn } from "@/lib/utils";


export default function DomainChooser({ next }: { next: string }) {
  const router = useRouter();
  const { account } = useStore();
  const [picked, setPicked] = useState<string>(account?.domain ?? "fintech");

  function go() {
    setDomain(picked);
    router.push(next);
  }

  return (
    <div>
      <ul className="grid list-none gap-[var(--s-4)] p-0 md:grid-cols-2">
        {domains.map((d) => {
          const on = picked === d.slug;
          return (
            <li key={d.slug}>
              <button
                onClick={() => d.ready && setPicked(d.slug)}
                disabled={!d.ready}
                aria-pressed={on}
                className={cn(
                  "card card-p flex h-full w-full flex-col gap-[var(--s-3)] text-left transition-[border-color,transform] duration-200",
                  on && "border-navy",
                  d.ready
                    ? "hover:-translate-y-0.5 hover:border-line-2"
                    : "cursor-not-allowed opacity-55"
                )}
              >
                
                <div className="flex items-start justify-between gap-[var(--s-4)]">
                  <div>
                    <span className="eyebrow block">{d.category}</span>
                    
                    <div className="mb-[var(--s-3)] flex items-center">
                  <div className="relative h-32 w-32 mt-4 overflow-hidden rounded-xl">
                    <Image
                      src={d.logo.light}
                      alt={`${d.company} logo`}
                      fill
                      className="object-contain dark:hidden"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />

                    <Image
                      src={d.logo.dark}
                      alt=""
                      fill
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      className="hidden object-contain dark:block"
                      aria-hidden="true"
                    />
                    <span className="mt-[var(--s-1)] ml-6 block font-serif text-[1.9rem] leading-none tracking-[-0.02em]">
                      {d.company}
                    </span>
                  </div>
                </div>
                  </div>
                  {d.ready ? (
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                        on
                          ? "border-navy bg-navy text-on-dark"
                          : "border-line-2 text-transparent"
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="tag">
                      <Lock className="h-3 w-3" /> Soon
                    </span>
                  )}
                </div>

                <p className="text-[15px] text-ink-2">{d.blurb}</p>

                <ul className="mt-auto flex list-none flex-col gap-[var(--s-2)] p-0 pt-[var(--s-3)]">
                  {d.artefacts.map((a) => (
                    <li key={a} className="text-[13.5px] text-ink-3">
                      {a}
                    </li>
                  ))}
                </ul>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-[var(--s-6)] flex flex-wrap items-center gap-[var(--s-4)]">
        <button onClick={go} className="btn btn-primary btn-lg">
          Start in {domains.find((d) => d.slug === picked)?.company}
          <Arrow />
        </button>
        <p className="text-[13.5px] text-ink-3">
          You can change this later. It only changes the setting, not the
          lessons.
        </p>
      </div>
    </div>
  );
}
