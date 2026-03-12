import { PricingTable } from "@clerk/nextjs";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ROUTES } from "@/lib/contracts";
import { PageShell } from "@/components/page-shell";

export default function PricingPage() {
  return (
    <PageShell>
      <Section as="div" padding="hero">
        <Container>
          <section
            className="flex w-full flex-col items-center justify-center px-6 pt-30 pb-15"
            style={{
              background: "var(--gradient-1)",
              borderRadius: "var(--radius--x-large)",
            }}
          >
            <h1 className="text-3xl font-bold leading-none tracking-[-0.03em] text-black">
              Choose the plan
            </h1>
            <h2 className="text-2xl font-semibold leading-none tracking-[-0.03em] text-black">
              that fits your SaaS
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed tracking-[-0.01em] text-black">
              Pick from the preconfigured subscription tiers powered by Clerk Billing.
              Switch plans or cancel anytime while you experiment with your product.
            </p>
            <div className="mt-8 w-full">
              <PricingTable newSubscriptionRedirectUrl={ROUTES.home} />
            </div>
          </section>
        </Container>
      </Section>
    </PageShell>
  );
}

