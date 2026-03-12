import { codeToHtml } from "shiki";
import { CodeBlockCopyButton } from "./code-block-copy-button";

export interface HighlightedCodeBlockProps {
  /** Raw source code to highlight and display. */
  code: string;
  /** Shiki language alias (e.g. "tsx", "bash", "json"). */
  lang: string;
}

const SHIKI_THEME = "one-dark-pro";

/**
 * Renders a code block with Shiki syntax highlighting and an icon-only copy button in the bottom-right.
 * Server-rendered; no client JS for highlighting.
 */
export async function HighlightedCodeBlock({
  code,
  lang,
}: HighlightedCodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: SHIKI_THEME,
  });

  return (
    <div className="relative mt-6 w-full overflow-hidden rounded-[var(--radius--medium)] bg-[#374356] text-sm shadow-[var(--shadow-card-overlay)]">
      <div className="relative max-h-[420px] overflow-auto">
        <div
          className="shiki-block p-4 pr-14 pb-12 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!whitespace-pre-wrap [&_pre]:!break-words [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!block [&_code]:!min-w-0 [&_code]:!whitespace-pre-wrap [&_code]:!break-words"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="absolute bottom-3 right-3">
          <CodeBlockCopyButton rawCode={code} iconOnly className="shadow-sm" />
        </div>
      </div>
    </div>
  );
}
