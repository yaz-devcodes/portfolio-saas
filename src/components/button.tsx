"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "default";

const BASE_CLASS =
  "inline-flex items-center justify-center rounded-[var(--radius--small-plus)] border font-medium transition-[opacity,background-color]";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "border-2 border-transparent bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90",
  secondary:
    "border-2 border-[var(--btn-secondary-border)] bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] hover:border-[var(--btn-secondary-hover-border)] hover:bg-[var(--btn-secondary-hover-bg)]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-base",
};

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> {
  href?: undefined;
}

export interface ButtonAsLink
  extends ButtonBaseProps,
    Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> {
  href: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Reusable button or link styled as primary (filled) or secondary (outline/tint).
 * Pass `href` to render a Next.js Link; omit for a native button.
 */
export function Button({
  variant = "primary",
  size = "default",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    BASE_CLASS,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].filter(Boolean).join(" ");

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
