"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export interface CodeBlockCopyButtonProps {
  /** Raw code string to copy to clipboard (no line numbers or prompts). */
  rawCode: string;
  /** If true, only the icon is shown (no "Copy" / "Copied!" text). */
  iconOnly?: boolean;
  /** Optional class name for the button container. */
  className?: string;
}

const COPIED_DURATION_MS = 2000;

/**
 * Button that copies the given raw code to the clipboard and shows brief "Copied!" feedback.
 * Keyboard-accessible and announces status for screen readers.
 */
export function CodeBlockCopyButton({
  rawCode,
  iconOnly = false,
  className = "",
}: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => setCopied(false), COPIED_DURATION_MS);
    } catch {
      setCopied(false);
    }
  }, [rawCode]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={
        "inline-flex items-center justify-center rounded-[var(--radius--small-plus)] border border-white/20 bg-white/10 text-white/90 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 " +
        (iconOnly
          ? "h-8 w-8 p-0"
          : "gap-1.5 px-2.5 py-1.5 text-xs font-medium") +
        " " +
        className
      }
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <span aria-hidden>✓</span>
      ) : (
        <span aria-hidden>⎘</span>
      )}
      {!iconOnly && (
        <span>{copied ? "Copied!" : "Copy"}</span>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied code to clipboard." : ""}
      </span>
    </button>
  );
}
