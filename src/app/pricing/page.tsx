import { PricingTable } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--foreground)] pb-12">
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
                <PricingTable newSubscriptionRedirectUrl="/" />
              </div>
            </section>
          </Container>
        </Section>
      </main>

      <Section as="div" padding="none" className="bg-[var(--foreground)]">
        <Footer />
      </Section>
    </div>
  );
}

