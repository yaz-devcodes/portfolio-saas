import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { HighlightedCodeBlock } from "@/components/highlighted-code-block";
import { PageShell } from "@/components/page-shell";

export default function GetStartedPage() {
  return (
    <PageShell>
      <Section as="div" padding="hero">
        <Container>
          <section
            className="flex w-full flex-col items-center justify-center px-6 pt-30 pb-30 text-center"
            style={{
              background: "var(--gradient-1)",
              borderRadius: "var(--radius--x-large)",
            }}
          >
            <h1 className="text-3xl font-bold leading-none tracking-[-0.03em] text-black">
              Get started
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed tracking-[-0.01em] text-black">
              This page explains how auth, billing, and feature gates are wired in a
              thin but opinionated starter, so you can safely customize without
              introducing drift.
            </p>
          </section>
        </Container>
      </Section>

      <Section as="div" padding="none" className="-mt-20">
        <Container className="flex justify-center">
          <div className="w-11/12 max-w-5xl space-y-12 rounded-[var(--radius--x-large)] bg-white/80 p-6 shadow-[var(--shadow-card-overlay)] backdrop-blur">
            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
                1. Clone and set up the project
              </h2>
              <HighlightedCodeBlock
                code={`# Clone the repo
git clone https://github.com/yaz-devcodes/portfolio-saas.git
cd portfolio-saas

# Install dependencies
npm install

# Copy env template if provided, or create your own .env.local
cp .env.example .env.local  # if the file exists

# Run the dev server
npm run dev
`}
                lang="bash"
              />

              <p className="mt-3 text-sm leading-relaxed text-black">
                In your Clerk dashboard, create a new application and grab the{" "}
                <span className="font-mono">publishableKey</span> and{" "}
                <span className="font-mono">secretKey</span>. Add them to your{" "}
                <span className="font-mono">.env.local</span> file using Clerk&apos;s
                standard environment variable names.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
                2. Clerk provider in the Next.js app
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black">
                The app is wrapped in Clerk&apos;s{" "}
                <span className="font-mono">ClerkProvider</span> in{" "}
                <span className="font-mono">layout.tsx</span>. This makes auth state
                available everywhere.
              </p>

              <HighlightedCodeBlock
                code={`import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={\`\${inter.variable} font-sans antialiased\`}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
`}
                lang="tsx"
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
                3. Billing and pricing with Clerk
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black">
                Clerk&apos;s pricing table handles checkout and subscription
                management. Redirect routes stay centralized in a single contract.
              </p>

              <HighlightedCodeBlock
                code={`import { PricingTable } from "@clerk/nextjs";
import { ROUTES } from "@/lib/contracts";

export default function PricingPage() {
  return (
    <PricingTable
      newSubscriptionRedirectUrl={ROUTES.home}
      ctaPosition="bottom"
      collapseFeatures={false}
    />
  );
}
`}
                lang="tsx"
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
                4. Feature gating through subscription tiers
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black">
                The app page at <span className="font-mono">/app</span> derives
                feature cards from canonical contracts and resolves user entitlements
                through shared auth helpers.
              </p>

              <HighlightedCodeBlock
                code={`import { auth } from "@clerk/nextjs/server";
import { ProductPreview } from "@/components/product-preview";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { buildFeatureAccessMap } from "@/lib/auth-gates";
import { APP_FEATURE_CARDS } from "@/lib/site-content";

export default async function AppHome() {
  const { has } = await auth();
  const featureAccessMap = buildFeatureAccessMap(has);

  return (
    <PageShell>
      <Section as="div" padding="none" className="-mt-50 md:-mt-40">
        <Container className="flex justify-center">
          <div className="grid w-11/12 grid-cols-1 gap-6 md:grid-cols-3">
            {APP_FEATURE_CARDS.map((card) => (
              <ProductPreview
                key={card.title}
                title={card.title}
                category={card.category}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                disabled={card.featureKey ? !featureAccessMap[card.featureKey] : false}
              />
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
`}
                lang="tsx"
              />

              <p className="mt-3 text-sm leading-relaxed text-black">
                To add new paid features, extend{" "}
                <span className="font-mono">contracts.ts</span> first, then mirror
                those keys in Clerk plans and your product logic.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
                5. Where to customize next
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black">
                With auth, billing, and feature gating in place, you can now:
              </p>
              <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-black">
                <li>
                  Customize page copy and links in{" "}
                  <span className="font-mono">site-content.ts</span>.
                </li>
                <li>
                  Add new entitlement keys in{" "}
                  <span className="font-mono">contracts.ts</span>.
                </li>
                <li>
                  Extend pricing tiers and add-ons from Clerk Billing.
                </li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-black">
                Use this starter as a thin, opinionated layer around Clerk and
                Next.js so you can ship your core SaaS functionality faster.
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
