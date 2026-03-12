import { z } from "zod";
import { featureKeySchema } from "@/lib/contracts";

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const footerLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});

export const previewCardSchema = z
  .object({
    title: z.string().min(1),
    category: z.string().min(1),
    href: z.string().min(1).optional(),
    imageSrc: z.string().min(1).optional(),
    imageAlt: z.string().min(1).optional(),
    featureKey: featureKeySchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.href && !value.imageAlt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Clickable cards must define imageAlt for accessibility.",
        path: ["imageAlt"],
      });
    }
  });

export const heroContentSchema = z.object({
  titleLineOne: z.string().min(1),
  titleLineTwo: z.string().min(1),
  description: z.string().min(1),
  primaryCta: navLinkSchema,
  secondaryCta: navLinkSchema,
  poweredByItems: z.array(z.string().min(1)).min(1),
});

export type NavLink = z.infer<typeof navLinkSchema>;
export type FooterLink = z.infer<typeof footerLinkSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type PreviewCard = z.infer<typeof previewCardSchema>;
export type HeroContent = z.infer<typeof heroContentSchema>;
