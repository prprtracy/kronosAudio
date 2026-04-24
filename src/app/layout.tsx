import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { getFooter } from "@/lib/footer";

export const metadata: Metadata = {
  title: "Kronos Audio",
  description: "High-end turntables and tonearms.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const footer = await getFooter("en");

  return (
    <html lang="en">
      <body className="bg-black text-neutral-100 antialiased">
        <SiteHeader locale="en" />
        {children}
        <Footer content={footer} />
        <BackToTop />
      </body>
    </html>
  );
}