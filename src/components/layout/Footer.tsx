import Link from "next/link";

import Logo from "./Logo";
import FooterPanorama from "@/components/art/FooterPanorama";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer rule mt-[var(--sec-y)]">
      <div className="shell pt-[var(--s-7)]"><FooterPanorama /></div>

      <div className="shell grid grid-cols-2 gap-x-[var(--s-5)] gap-y-[var(--s-7)] pt-[var(--s-9)] md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
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

      <div className="shell mt-[var(--s-9)] flex flex-wrap items-center justify-between gap-[var(--s-4)] rule py-[var(--s-6)] text-sm text-ink-3">
        <span>
          © {new Date().getFullYear()} {site.name} by <a
              href="https://theopenbootcamp.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink-2 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink"
            >
              OpenBootcamp. 
            </a>
            <span> All Rights Reserved.</span>
        </span>
       
      </div>
    </footer>
  );
}
