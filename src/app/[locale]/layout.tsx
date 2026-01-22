// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import { normalizeLocale } from "@/lib/content";
import { SiteHeader } from "@/components/layout/SiteHeader";

type LayoutParams = { locale: string }; // 放宽，符合 Next 生成类型

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocale(locale);

  return (
    <>
      <SiteHeader locale={safeLocale} />
      {children}
    </>
  );
}
