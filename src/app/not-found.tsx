import Link from "next/link";

import Button from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Icons";
import { legacyRoutes, primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="sec">
      <div className="shell">
        <span className="eyebrow">404</span>
        <h1 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)]">
          Nothing here.
          <br />
          <span className="text-ink-3">Which is its own kind of data.</span>
        </h1>
        <p className="mt-5 max-w-md text-ink-2">
          The page you asked for doesn&rsquo;t exist, or hasn&rsquo;t been built
          yet. Here&rsquo;s everything that does.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <Button href="/" size="lg">
            Back to the start <Arrow />
          </Button>
          <Button href="/levels" variant="outline" size="lg">
            The six levels
          </Button>
        </div>

        <ul className="mt-12 flex list-none flex-wrap gap-x-6 gap-y-3 border-t border-line p-0 pt-7">
          {[...primaryNav, ...legacyRoutes].map((item) => (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                className="text-sm text-ink-3 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
