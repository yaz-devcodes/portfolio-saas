import type { ReactNode } from "react";

export type SectionPadding = "none" | "sm" | "md" | "lg" | "xl" | "hero";

export interface SectionProps {
  as?: keyof JSX.IntrinsicElements;
  padding?: SectionPadding;
  overlapTop?: boolean;
  className?: string;
  children: ReactNode;
}

const PADDING_CLASSES: Record<SectionPadding, string> = {
  none: "",
  sm: "py-6 md:py-8",
  md: "py-8 md:py-12",
  lg: "py-10 md:py-16",
  xl: "py-12 md:py-20",
  hero: "py-2 md:py-2",
};

/**
 * Layout section with standardized vertical spacing and an optional
 * overlap with the previous section.
 */
export function Section({
  as = "section",
  padding = "md",
  overlapTop = false,
  className = "",
  children,
}: SectionProps) {
  const Component = as as keyof JSX.IntrinsicElements;
  const paddingClasses = PADDING_CLASSES[padding];
  const overlapClasses = overlapTop ? "-mt-12 md:-mt-16" : "";

  const merged = [paddingClasses, overlapClasses, className].filter(Boolean).join(" ");

  return <Component className={merged}>{children}</Component>;
}

