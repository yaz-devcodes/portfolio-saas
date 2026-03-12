import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProductPreview } from "@/components/product-preview";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import gitCloneImage from "@/assets/git-clone.png";

import gitImage from "@/assets/git.png";
import clerkImage from "@/assets/clerk.png";
import vercelImage from "@/assets/vercel.png";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--foreground)] pb-12">
        <Section as="div" padding="hero">
          <Container>
            <Hero />
          </Container>
        </Section>

        <Section as="div" padding="none" className="-mt-50 md:-mt-40">
          <Container className="flex justify-center">
            <div className="grid w-11/12 grid-cols-1 gap-6 md:grid-cols-3">
              <ProductPreview
                title="Clone"
                category="Get started"
                href="https://github.com/yaz-devcodes/portfolio-saas"
                imageSrc={gitImage.src}
                imageAlt="Clone repository from GitHub"
              />
              <ProductPreview
                title="Configure"
                category="Setup"
                href="https://dashboard.clerk.com/sign-in"
                imageSrc={clerkImage.src}
                imageAlt="Configure repository from Clerk"
              />
              <ProductPreview
                title="Deploy"
                category="Ship it"
                href="https://vercel.com/signup"
                imageSrc={vercelImage.src}
                imageAlt="Deploy repository from Vercel"
              />
            </div>
          </Container>
        </Section>
      </main>

      <Section
        as="div"
        padding="none"
        className="bg-[var(--foreground)]"
      >
        <Footer />
      </Section>
    </div>
  );
}