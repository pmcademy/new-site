import Link from "next/link";

import Logo from "./Logo";
import FieldArt from "@/components/art/FieldArt";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer mt-[var(--sec-y)]">
      {/* The wordmark. Big, quiet, and the last thing anyone reads. */}
      <div className="shell pt-[var(--s-8)]">
        <FieldArt kind="seed" className="field-art-footer" />
        <p
          className="select-none text-center font-semibold leading-[0.86] tracking-[-0.045em] text-ink"
          style={{ fontSize: "clamp(2.5rem, 12vw, 9rem)" }}
        >
          Build Great Products
        </p>
      </div>

      <div className="shell grid grid-cols-2 gap-x-[var(--s-5)] gap-y-[var(--s-7)] pt-[var(--s-9)] md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-[var(--s-4)] max-w-[28ch] text-sm leading-relaxed text-ink-3">
            Six free levels. Every lesson ends with something you built.
          </p>
          <p className="mt-[var(--s-4)] text-sm text-ink-3">
            PMcademy by{" "}
            <a
              href="https://theopenbootcamp.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink-2 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink"
            >
              OpenBootcamp
            </a>
          </p>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h3 className="eyebrow mb-[var(--s-4)]">{group.title}</h3>
            <ul className="flex flex-col gap-[var(--s-3)]">
              {group.items.map((item) => {
                const external = item.href.startsWith("http");
                return (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="text-sm text-ink-2 transition-colors duration-200 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="shell mt-[var(--s-9)] flex flex-wrap items-center justify-between gap-[var(--s-4)] border-t border-line py-[var(--s-6)] text-sm text-ink-3">
        <span>
          © {new Date().getFullYear()} {site.name}. Part of OpenBootcamp.
        </span>
        <span>{site.domain}</span>
      </div>
    </footer>
  );
}
