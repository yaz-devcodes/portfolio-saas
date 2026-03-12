"use client";

import { Button } from "@/components/button";
import { Marquee } from "@/components/marquee";
import { HERO_CONTENT } from "@/lib/site-content";

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
        {HERO_CONTENT.titleLineOne}
      </h1>
      <h2 className="text-3xl font-bold leading-none tracking-[-0.03em] text-black">
        {HERO_CONTENT.titleLineTwo}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed tracking-[-0.01em] text-black">
        {HERO_CONTENT.description}
      </p>
      <div className="flex flex-row items-center justify-center gap-2 mt-6">
        <Button href={HERO_CONTENT.primaryCta.href} variant="primary" size="default">
          {HERO_CONTENT.primaryCta.label}
        </Button>
        <Button href={HERO_CONTENT.secondaryCta.href} variant="secondary" size="default">
          {HERO_CONTENT.secondaryCta.label}
        </Button>
      </div>
      <div className="mt-10 w-full px-2 md:px-4">
        <Marquee
          items={HERO_CONTENT.poweredByItems}
          label="Pre-configured with:"
          duration="20s"
          pauseOnHover
          fadeEdges
        />
      </div>
    </section>
  );
}