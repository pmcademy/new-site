"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Button from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Icons";
import { primaryNav, site } from "@/lib/site";
import { signOut, useStore } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { account, ready } = useStore();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isOn = (href: string) =>
    href.startsWith("/#") ? false : pathname.startsWith(href);

  const signedIn = ready && account;

  return (
    <header className="nav-wrap sticky top-0 z-50">
      <div className="nav-pill flex h-[var(--nav-h)] items-center justify-between gap-5">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-[14.5px] transition-colors duration-200",
                isOn(item.href)
                  ? "font-medium text-ink"
                  : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {signedIn ? (
            <>
              <button
                onClick={signOut}
                className="btn btn-quiet hidden sm:inline-flex"
              >
                Sign out
              </button>
              <Button href="/levels" className="hidden sm:inline-flex">
                Keep going
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-quiet hidden sm:inline-flex">
                Sign in
              </Link>
              <Button href="/levels/start" className="hidden sm:inline-flex">
                Start free
              </Button>
            </>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            className="icobtn lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-navigation"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[calc(var(--nav-h)+24px)] z-40 overflow-y-auto border-t border-line bg-paper transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="shell flex flex-col gap-1 py-6">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-line py-4 text-lg font-medium"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-2">
            <Button href="/levels/start" size="lg">
              Start lesson one <Arrow />
            </Button>
            {signedIn ? (
              <button onClick={signOut} className="btn btn-outline btn-lg">
                Sign out
              </button>
            ) : (
              <Button href="/signin" variant="outline" size="lg">
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
