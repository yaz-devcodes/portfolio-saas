"use client";

import type { CSSProperties, ReactNode } from "react";

const MARQUEE_DURATION_DEFAULT = "40s";
const MARQUEE_GAP_DEFAULT = "8px";

export interface MarqueeProps {
  items: readonly (string | ReactNode)[];
  duration?: string;
  gap?: string;
  pauseOnHover?: boolean;
  fadeEdges?: boolean;
  reverse?: boolean;
  label?: string;
  className?: string;
}

/**
 * Horizontal marquee that scrolls badges in an infinite loop.
 * Uses duplicated content and CSS animation for a seamless cycle.
 */
export function Marquee({
  items,
  duration = MARQUEE_DURATION_DEFAULT,
  gap = MARQUEE_GAP_DEFAULT,
  pauseOnHover = true,
  fadeEdges = true,
  reverse = false,
  label,
  className = "",
}: MarqueeProps) {
  const rootClass = [
    "marquee-component flex flex-col justify-center overflow-hidden",
    pauseOnHover ? "marquee-pause-on-hover" : "",
    fadeEdges ? "marquee-fade-edges" : "",
    reverse ? "marquee-reverse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} data-marquee-reverse={reverse} data-marquee-pause-on-hover={pauseOnHover} data-marquee-fade-edges={fadeEdges}>
      {label ? (
        <p className="mb-2 text-center text-sm font-medium tracking-wide text-black">
          {label}
        </p>
      ) : null}
      <div
        className="marquee-wrapper flex w-full"
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        <div
          className="marquee-content flex shrink-0 flex-row items-center"
          style={{ "--marquee-gap": gap } as CSSProperties}
        >
          <div className="marquee-group flex shrink-0 flex-row items-center">
            {items.map((item, i) => (
              <div key={`a-${i}`} className="marquee-badge shrink-0">
                {typeof item === "string" ? (
                  <span className="font-mono text-sm font-medium text-black">
                    {item}
                  </span>
                ) : (
                  item
                )}
              </div>
            ))}
          </div>
          <div className="marquee-group flex shrink-0 flex-row items-center" aria-hidden>
            {items.map((item, i) => (
              <div key={`b-${i}`} className="marquee-badge shrink-0">
                {typeof item === "string" ? (
                  <span className="font-mono text-sm font-medium text-black">
                    {item}
                  </span>
                ) : (
                  item
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
