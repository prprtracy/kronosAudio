import type { ReactNode } from "react";
import { locales, type Locale } from "@/i18n";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  return (
    <>
      <Header locale={locale} />
      {children}
      <BackToTop />

    </>
  );
}
