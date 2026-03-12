import {
  APP_HOME_REQUIRED_FEATURE,
  FEATURE_CARD_CONTRACT,
  type FeatureKey,
} from "@/lib/contracts";

export interface AuthStateLike {
  userId: string | null;
  has: (params: { feature: FeatureKey }) => boolean;
}

/**
 * Returns whether a signed-in user can access the app dashboard route.
 */
export const canAccessAppHome = ({ userId, has }: AuthStateLike): boolean => {
  if (!userId) {
    return false;
  }

  return has({ feature: APP_HOME_REQUIRED_FEATURE });
};

/**
 * Computes card-level feature availability used in `/app`.
 * Uses the canonical feature card contract to keep policy and content in sync.
 */
export const buildFeatureAccessMap = (
  has: AuthStateLike["has"],
): Record<FeatureKey, boolean> =>
  FEATURE_CARD_CONTRACT.reduce<Record<FeatureKey, boolean>>(
    (accumulator, featureCard) => {
      accumulator[featureCard.key] = has({ feature: featureCard.key });
      return accumulator;
    },
    {
      dashboard_access: false,
      api_access: false,
      remote_access: false,
    },
  );
