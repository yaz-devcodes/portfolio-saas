import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { HighlightedCodeBlock } from "@/components/highlighted-code-block";

export default async function GetStartedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--foreground)] pb-12">
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
                This page walks you through how to configure Next.js with Clerk and how the feature
                gating in this template is wired up, so you can confidently adapt it for your own SaaS.
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
                  In your Clerk dashboard, create a new application and grab the <span className="font-mono">publishableKey</span>{" "}
                  and <span className="font-mono">secretKey</span>. Add them to your <span className="font-mono">.env.local</span>{" "}
                  file following Clerk&apos;s standard environment variable names.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
                  2. Clerk provider in the Next.js app
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-black">
                  The entire app is wrapped in Clerk&apos;s <span className="font-mono">ClerkProvider</span> in{" "}
                  <span className="font-mono">layout.tsx</span>. This makes authentication state components available throughout
                  the app.
                </p>

                <HighlightedCodeBlock
                  code={`import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={\`\${inter.variable} font-sans antialiased\`}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
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
                  Clerk&apos;s subscription table component handles checkout and subscription management for you.
                </p>

                <HighlightedCodeBlock
                  code={`import { PricingTable } from "@clerk/nextjs

const PricingTable: {
    (props: Without<WithClerkProp<{
        for?: ForPayerType;
        appearance?: PricingTableTheme;
        checkoutProps?: Pick<__internal_CheckoutProps, "appearance">;
    } & {
        ctaPosition?: "top" | "bottom";
        collapseFeatures?: boolean;
        newSubscriptionRedirectUrl?: string;
    } & FallbackProp>, "clerk">): React.JSX.Element | null;
    displayName: string;
}
`}
                  lang="tsx"
                />

                <p className="mt-3 text-sm leading-relaxed text-black">
                  You can customize your product tiers and pricing from the Clerk dashboard. When you
                  update plans there, the pricing table embedded here will reflect those changes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
                  4. Feature gating through subscription tiers
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-black">
                  The example app page at <span className="font-mono">/app</span> demonstrates how to gate
                  specific features based on the user&apos;s current subscription. It uses Clerk&apos;s{" "}
                  <span className="font-mono">auth()</span> helper and the <span className="font-mono">has</span>{" "}
                  method to check whether a feature is enabled.
                </p>

                <HighlightedCodeBlock
                  code={`import { auth } from "@clerk/nextjs/server";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProductPreview } from "@/components/product-preview";

export default async function AppHome() {
  const { has } = await auth();

  const canAccessDashboard = has({ feature: "dashboard_access" });
  const canAccessApi = has({ feature: "api_access" });
  const canAccessRemote = has({ feature: "remote_access" });

  return (
    <div className="flex min-h-screen flex-col">
        <Section as="div" padding="none" className="-mt-50 md:-mt-40">
          <Container className="flex justify-center">
            <div className="grid w-11/12 grid-cols-1 gap-6 md:grid-cols-3">
              <ProductPreview
                title="Dashboard access"
                category="Included on every plan"
                imageSrc={dashboardImage.src}
                imageAlt="Dashboard view"
                disabled={!canAccessDashboard}
              />
              <ProductPreview
                title="API access"
                category="Build integrations and automations"
                imageSrc={apiAccessImage.src}
                imageAlt="API access"
                disabled={!canAccessApi}
              />
              <ProductPreview
                title="Remote access"
                category="Connect from anywhere"
                imageSrc={remoteAccessImage.src}
                imageAlt="Remote access"
                disabled={!canAccessRemote}
              />
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
`}
                  lang="tsx"
                />

                <p className="mt-3 text-sm leading-relaxed text-black">
                  The <span className="font-mono">disabled</span> prop on each{" "}
                  <span className="font-mono">ProductPreview</span> card controls whether the tile appears
                  active or unavailable. You can add your own feature keys in the Clerk dashboard (for
                  example, <span className="font-mono">"team_seats"</span> or{" "}
                  <span className="font-mono">"priority_support"</span>) and mirror those keys in this page
                  to gate your real product features.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
                  5. Where to customize next
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-black">
                  With auth, billing, and simple feature gating in place, you can now:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-black">
                  <li>
                    Replace and customize the repo to fit your real product.
                  </li>
                  <li>
                    Add features in your Clerk dashboard and update the{" "}
                    <span className="font-mono">has(&#123; feature &#125;)</span> checks to match.
                  </li>
                  <li>
                    Extend the pricing page by configuring more plans and add-ons directly in Clerk
                    Billing.
                  </li>
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-black">
                  Use this starter as a thin, opinionated layer around Clerk and Next.js so you can ship
                  your core SaaS functionality faster.
                </p>
              </section>
            </div>
          </Container>
        </Section>
      </main>

      <Section as="div" padding="none" className="bg-[var(--foreground)]">
        <Footer />
      </Section>
    </div>
  );
}
