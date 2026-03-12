import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ variable: "--font-primary", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaS Starter",
  description: "A scaffolded template with landing page, auth, signup, and payments. Extend it into any SaaS product you want!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
