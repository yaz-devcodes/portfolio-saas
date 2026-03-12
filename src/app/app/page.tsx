import { auth } from "@clerk/nextjs/server";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProductPreview } from "@/components/product-preview";
import { buildFeatureAccessMap } from "@/lib/auth-gates";
import { APP_FEATURE_CARDS } from "@/lib/site-content";
import { PageShell } from "@/components/page-shell";

export default async function AppHome() {
  const { has } = await auth();
  const featureAccessMap = buildFeatureAccessMap(has);

  return (
    <PageShell>
      <Section as="div" padding="hero">
        <Container>
          <section
            className="flex w-full flex-col items-center justify-center px-6 pt-30 pb-60 text-center"
            style={{
              background: "var(--gradient-1)",
              borderRadius: "var(--radius--x-large)",
            }}
          >
            <h1 className="text-3xl font-bold leading-none tracking-[-0.03em] text-black">
              App home
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed tracking-[-0.01em] text-black">
              This is your gated app area. Use the tiles below to showcase
              which features are unlocked by each subscription plan.
            </p>
          </section>
        </Container>
      </Section>

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

