import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProductPreview } from "@/components/product-preview";
import dashboardImage from "@/assets/dashboard-access.png";
import apiAccessImage from "@/assets/api-access.png";
import remoteAccessImage from "@/assets/remote-access.png";

export default async function AppHome() {
  const { has } = await auth();

  const canAccessDashboard = has({ feature: "dashboard_access" });
  const canAccessApi = has({ feature: "api_access" });
  const canAccessRemote = has({ feature: "remote_access" });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--foreground)] pb-12">
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

      <Section as="div" padding="none" className="bg-[var(--foreground)]">
        <Footer />
      </Section>
    </div>
  );
}

