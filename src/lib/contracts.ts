import { z } from "zod";

/**
 * Canonical route paths used across page links and middleware redirects.
 */
export const ROUTES = {
  home: "/",
  appHome: "/app",
  getStarted: "/get-started",
  pricing: "/pricing",
} as const;

/**
 * Canonical set of feature-gate keys checked through Clerk's `has({ feature })`.
 * Keep this list small and explicit so billing entitlements remain easy to audit.
 */
export const FEATURE_KEYS = [
  "dashboard_access",
  "api_access",
  "remote_access",
] as const;

export const featureKeySchema = z.enum(FEATURE_KEYS);

export type FeatureKey = z.infer<typeof featureKeySchema>;

/**
 * App-home feature cards contract.
 * This is the single source of truth for:
 * - feature-check keys
 * - card render order
 * - visible card copy and image metadata
 */
export const FEATURE_CARD_CONTRACT = [
  {
    key: "dashboard_access",
    title: "Dashboard access",
    category: "Included on every plan",
    imageAlt: "Dashboard view",
    imageSrc: "/assets/dashboard-access.svg",
  },
  {
    key: "api_access",
    title: "API access",
    category: "Build integrations and automations",
    imageAlt: "API access",
    imageSrc: "/assets/api-access.svg",
  },
  {
    key: "remote_access",
    title: "Remote access",
    category: "Connect from anywhere",
    imageAlt: "Remote access",
    imageSrc: "/assets/remote-access.svg",
  },
] as const satisfies readonly {
  readonly key: FeatureKey;
  readonly title: string;
  readonly category: string;
  readonly imageAlt: string;
  readonly imageSrc: string;
}[];

/**
 * Required entitlement to access `/app`.
 */
export const APP_HOME_REQUIRED_FEATURE: FeatureKey = "dashboard_access";
