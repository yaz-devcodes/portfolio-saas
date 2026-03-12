import Link from "next/link";

interface ProductPreviewBaseProps {
  title: string;
  category: string;
  imageSrc?: string;
  imageAlt?: string;
  logoSrc?: string;
  logoAlt?: string;
  builtOn?: string;
  className?: string;
  disabled?: boolean;
}

interface ProductPreviewLinkedProps extends ProductPreviewBaseProps {
  href: string;
}

interface ProductPreviewStaticProps extends ProductPreviewBaseProps {
  href?: undefined;
}

export type ProductPreviewProps =
  | ProductPreviewLinkedProps
  | ProductPreviewStaticProps;

/**
 * Product preview card used for starter capabilities and feature visibility.
 * Keep the card shape stable and customize card content from `site-content.ts`.
 */
export function ProductPreview({
  imageSrc,
  imageAlt = "",
  href,
  logoSrc,
  logoAlt = "",
  title,
  category,
  builtOn,
  className = "",
  disabled = false,
}: ProductPreviewProps) {
  const resolvedHref = !disabled ? href : undefined;
  const isClickable = typeof resolvedHref === "string";

  const cardContent = (
    <>
      {/* Top: image area + corner icon */}
      <div className="product-preview__image-body relative border-b border-[var(--colors-black--200)] bg-[var(--colors-page-wrapper--background-tertiary)] p-0">
        <div className="overflow-hidden rounded-t-[var(--component-card--border-radius)]">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt}
              className="product-preview__img h-auto w-full object-cover transition-transform duration-200 group-hover/product-preview:scale-[1.02]"
            />
          ) : (
            <div
              className="flex aspect-video w-full items-center justify-center bg-[var(--colors-black--200)] text-sm text-black"
              aria-hidden
            >
              Product preview
            </div>
          )}
        </div>
        {isClickable && (
          <div className="product-preview__corner absolute right-3 top-3 opacity-0 transition-opacity duration-200 group-hover/product-preview:opacity-100">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-sm"
              aria-hidden
            >
              ↗
            </span>
          </div>
        )}
      </div>

      {/* Bottom: logo row + meta */}
      <div
        className="product-preview__body relative flex flex-1 flex-col rounded-b-[var(--component-card--border-radius)] p-5"
        style={{ backgroundColor: "var(--product-preview-body-bg)" }}
      >
        <h3 className="mb-2 text-sm font-semibold tracking-tight text-black">
          {title}
        </h3>
        {logoSrc && (
          <div className="mb-3 flex items-center justify-between gap-2">
            <img
              src={logoSrc}
              alt={logoAlt}
              height={40}
              className="h-8 w-auto max-w-[120px] object-contain object-left"
              // eslint-disable-next-line @next/next/no-img-element
            />
          </div>
        )}
        <p className="text-xs font-mono tracking-wide text-black">
          {[category, builtOn && `built on ${builtOn}`].filter(Boolean).join(" · ")}
        </p>
      </div>

      {isClickable && (
        <Link
          href={resolvedHref}
          className="absolute inset-0 z-10"
          aria-label={`View ${title}`}
        />
      )}
    </>
  );

  return (
    <article
      aria-disabled={disabled}
      className={`product-preview group/product-preview relative flex flex-col overflow-visible rounded-[var(--component-card--border-radius)] border-0 bg-white/50 shadow-[var(--shadow-card-overlay)] backdrop-blur-[20px] transition-[box-shadow,border-color,opacity,transform] duration-200 ease-in-out ${
        disabled ? "cursor-not-allowed opacity-60 grayscale" : "hover:shadow-lg"
      } ${className}`}
    >
      {cardContent}
    </article>
  );
}
