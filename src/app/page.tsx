import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProductPreview } from "@/components/product-preview";
import Hero from "@/components/hero";
import { PageShell } from "@/components/page-shell";
import { HOME_PREVIEW_CARDS } from "@/lib/site-content";

export default function Home() {
  return (
    <PageShell>
      <Section as="div" padding="hero">
        <Container>
          <Hero />
        </Container>
      </Section>

      <Section as="div" padding="none" className="-mt-50 md:-mt-40">
        <Container className="flex justify-center">
          <div className="grid w-11/12 grid-cols-1 gap-6 md:grid-cols-3">
            {HOME_PREVIEW_CARDS.map((card) => (
              <ProductPreview
                key={card.title}
                title={card.title}
                category={card.category}
                href={card.href}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
              />
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}