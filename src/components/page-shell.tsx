import type { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Section } from "@/components/layout/section";

export interface PageShellProps {
  children: ReactNode;
}

/**
 * Shared page scaffold for the starter template.
 * Keeps the app thin and opinionated by standardizing shell structure
 * while leaving page body content fully customizable.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--foreground)] pb-12">
        {children}
      </main>
      <Section as="div" padding="none" className="bg-[var(--foreground)]">
        <Footer />
      </Section>
    </div>
  );
}
