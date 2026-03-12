import type { JSX, ReactNode } from "react";

export interface ContainerProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}

/**
 * Centered page container that constrains content width and applies
 * horizontal padding consistently across the app.
 */
export function Container({ as = "div", className = "", children }: ContainerProps) {
  const Component = as as keyof JSX.IntrinsicElements;
  const baseClasses = "mx-auto w-full max-w-6xl px-2";
  const merged = className ? `${baseClasses} ${className}` : baseClasses;

  return <Component className={merged}>{children}</Component>;
}

