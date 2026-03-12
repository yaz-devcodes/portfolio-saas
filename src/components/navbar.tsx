/* Thin starter navbar with auth controls and a compact mobile-first menu. */
"use client";

import { useEffect, useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "./button";
import { ROUTES } from "@/lib/contracts";
import { NAV_LINKS } from "@/lib/site-content";

/** Compact logo mark: stacked layers (template / starter). */
function LogoMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      {/* Back layer */}
      <rect
        x="2"
        y="6"
        width="14"
        height="12"
        rx="2"
        className="fill-black/15 stroke-black/40"
        strokeWidth="1.2"
      />
      {/* Front layer */}
      <rect
        x="6"
        y="2"
        width="14"
        height="12"
        rx="2"
        className="fill-black/90 stroke-black"
        strokeWidth="1.2"
      />
      {/* Accent line */}
      <path
        d="M9 7h6M9 9.5h4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="stroke-white/80"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-6 w-6 shrink-0" aria-hidden>
      <span
        className="absolute left-0 right-0 top-[5px] block h-0.5 rounded-full bg-current transition-transform"
        style={{
          transformOrigin: "center",
          transform: open ? "translateY(6px) rotate(45deg)" : "none",
          transitionDuration: "0.2s",
        }}
      />
      <span
        className="absolute left-0 right-0 top-[11px] block h-0.5 rounded-full bg-current transition-[opacity,transform]"
        style={{
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0)" : "none",
          transitionDuration: "0.2s",
        }}
      />
      <span
        className="absolute left-0 right-0 top-[17px] block h-0.5 rounded-full bg-current transition-transform"
        style={{
          transformOrigin: "center",
          transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
          transitionDuration: "0.2s",
        }}
      />
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          aria-hidden
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <header className="fixed inset-x-0 top-0 z-40 flex flex-col items-center pt-6">
        <Container className="flex justify-center">
          <div className="w-11/12">
            <div
              className={[
                "rounded-[var(--radius--medium)] px-4 pt-2 pb-2 shadow-[var(--shadow-md)] backdrop-blur transition-[background-color] duration-200",
                open
                  ? "bg-[var(--component-navbar--background-color-open)]"
                  : "bg-[var(--component-navbar--background-color)]",
              ].join(" ")}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <Link
                  href={ROUTES.home}
                  className="flex items-center gap-2 rounded-[var(--radius--small-plus)] px-1.5 py-1.5 -ml-1.5 text-black transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-1"
                  aria-label="SaaS Starter – Home"
                >
                  <LogoMark />
                  <span className="text-sm font-semibold tracking-tight">
                    SaaS Starter
                  </span>
                </Link>

                <div className="flex flex-row items-center gap-2">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="secondary" size="sm">
                        Log in
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button variant="primary" size="sm">
                        Sign up
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton
                      afterSignOutUrl={ROUTES.home}
                      appearance={{
                        elements: {
                          avatarBox:
                            "h-10 w-10 rounded-[var(--radius--small-plus)] border border-black/10 bg-white/70 shadow-sm",
                          userButtonPopoverCard:
                            "rounded-[var(--radius--medium)] shadow-[var(--shadow-md)] border border-black/5",
                          userButtonPopoverMain:
                            "bg-[var(--background)] text-[var(--colors-page-wrapper--text)]",
                        },
                      }}
                    />
                  </SignedIn>
                  <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-pressed={open}
                    aria-expanded={open}
                    aria-controls="site-navigation"
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius--small-plus)] text-black hover:bg-black/5"
                  >
                    <MenuIcon open={open} />
                  </button>
                </div>
              </div>

              {/* Expanding dropdown area */}
              <div
                className={[
                  "overflow-hidden transition-[max-height,opacity] duration-200 ease-out",
                  open ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0",
                ].join(" ")}
              >
                <nav
                  id="site-navigation"
                  className="flex flex-col items-stretch px-1 pb-2 text-sm text-black"
                >
                  {NAV_LINKS.map(({ href, label }) => (
                    <div key={href}>
                      <div className="mx-auto my-1 h-px w-10/12 bg-black/10" />
                      <Link
                        href={href}
                        className="flex w-full items-center justify-center rounded-[var(--radius--small-plus)] px-3 py-2 transition-colors hover:bg-white/70"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}

