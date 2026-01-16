// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import type { Locale } from "@/i18n"; // 你已有的 Locale = "en" | "fr" | "zh"
import { Header } from "@/components/layout/Header";

type LayoutParams = { locale: string }; // ✅ 放宽，符合 Next 生成类型

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;

  // ✅ 在运行时/逻辑层收窄（不影响 Next 类型生成）
  const safeLocale: Locale =
    locale === "en" || locale === "fr" || locale === "zh" ? (locale as Locale) : "en";

  // 之后全部用 safeLocale
  return (
    <>
      <Header locale={safeLocale} />
      {children}
    </>
  );
}
