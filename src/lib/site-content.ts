/**
 * Centralized content model for the starter.
 * Customize this file first before touching page/component logic.
 */
import {
  footerLinkSchema,
  heroContentSchema,
  navLinkSchema,
  previewCardSchema,
  socialLinkSchema,
} from "@/lib/content-schemas";
import { FEATURE_CARD_CONTRACT, ROUTES } from "@/lib/contracts";

/**
 * Centralized navigation links used by the mobile menu.
 */
export const NAV_LINKS = navLinkSchema.array().parse([
  { label: "Apps", href: ROUTES.appHome },
  { label: "Get started", href: ROUTES.getStarted },
  { label: "Pricing", href: ROUTES.pricing },
]);

/**
 * Footer navigation links.
 */
export const FOOTER_LINKS = footerLinkSchema.array().parse([
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
]);

/**
 * Footer social links.
 */
export const SOCIAL_LINKS = socialLinkSchema.array().parse([
  {
    label: "GitHub",
    href: "https://github.com/yaz-devcodes/portfolio-saas",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    label: "X",
    href: "https://x.com",
  },
]);

/**
 * Landing page hero content.
 */
export const HERO_CONTENT = heroContentSchema.parse({
  titleLineOne: "Launch and scale",
  titleLineTwo: "your SaaS today!",
  description:
    "A scaffolded template with landing page, auth, signup, and payment. Extend it into any SaaS product you want!",
  primaryCta: { label: "Sign up for free", href: ROUTES.pricing },
  secondaryCta: { label: "Get started now", href: ROUTES.getStarted },
  poweredByItems: [
    "Clerk",
    "Stripe",
    "Postgres",
    "Prisma",
    "Next.js",
    "Tailwind CSS",
  ],
});

/**
 * Landing cards shown below the hero.
 */
export const HOME_PREVIEW_CARDS = previewCardSchema.array().parse([
  {
    title: "Clone",
    category: "Get started",
    href: "https://github.com/yaz-devcodes/portfolio-saas",
    imageSrc: "/assets/git.svg",
    imageAlt: "Clone repository from GitHub",
  },
  {
    title: "Configure",
    category: "Setup",
    href: "https://dashboard.clerk.com/sign-in",
    imageSrc: "/assets/clerk.svg",
    imageAlt: "Configure repository from Clerk",
  },
  {
    title: "Deploy",
    category: "Ship it",
    href: "https://vercel.com/signup",
    imageSrc: "/assets/vercel.svg",
    imageAlt: "Deploy repository from Vercel",
  },
]);

/**
 * Feature cards shown in the authenticated app area.
 * Derived from the canonical feature contract to avoid drift with auth checks.
 */
export const APP_FEATURE_CARDS = previewCardSchema.array().parse(
  FEATURE_CARD_CONTRACT.map((card) => ({
    title: card.title,
    category: card.category,
    imageSrc: card.imageSrc,
    imageAlt: card.imageAlt,
    featureKey: card.key,
  })),
);
