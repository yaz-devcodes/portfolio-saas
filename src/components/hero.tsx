"use client";

import { Button } from "@/components/button";
import { Marquee } from "@/components/marquee";

const POWERED_BY_ITEMS = ["Clerk", "Stripe", "Postgres", "Prisma", "Next.js", "Tailwind CSS"] as const;

export default function Hero() {
  return (
    <section
      className="flex w-full flex-col items-center justify-center text-center px-6 pt-30 pb-60 min-h-[40vh]"
      style={{
        background: "var(--gradient-1)",
        borderRadius: "var(--radius--x-large)",
      }}
    >
      <h1 className="text-4xl font-bold leading-none tracking-[-0.03em] text-black">
        Launch and scale
      </h1>
      <h2 className="text-3xl font-bold leading-none tracking-[-0.03em] text-black">
        your SaaS today!
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed tracking-[-0.01em] text-black">
        A scaffolded template with landing page, auth, signup, and payment.
        Extend it into any SaaS product you want!
      </p>
      <div className="flex flex-row items-center justify-center gap-2 mt-6">
        <Button href="/pricing" variant="primary" size="default">
            Sign up for free
        </Button>
        <Button href="/get-started" variant="secondary" size="default">
            Get started now
        </Button>
      </div>
      <div className="mt-10 w-full px-2 md:px-4">
        <Marquee
          items={POWERED_BY_ITEMS}
          label="Pre-configured with:"
          duration="20s"
          pauseOnHover
          fadeEdges
        />
      </div>
    </section>
  );
}