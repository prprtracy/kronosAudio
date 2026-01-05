// app/[locale]/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { products } from "@/data/products";

import { ProductHero } from "@/components/product/ProductHero";
import { ProductIntro } from "@/components/product/ProductIntro";
import { ProductEndorsements } from "@/components/product/ProductEndorsements";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductAnchorNav } from "@/components/product/ProductAnchorNav";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export function generateStaticParams() {
  // 为每个 locale 生成每个 product slug
  return locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!locales.includes(locale)) notFound();

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  // 你现有 products.ts 结构映射到 ProductHeroData
  const hero = {
    eyebrow: "Products",
    title: product.name,
    price: product.msrp?.display
      ? { label: "MSRP", value: product.msrp.display }
      : undefined,
    dek: product.description?.slice(0, 2) ?? [],
    keyline:
      product.slug === "discovery"
        ? "33⅓ / 45 RPM · COUNTER-ROTATION · SUSPENDED ARCHITECTURE"
        : product.slug === "sparta"
        ? "33⅓ / 45 RPM · DUAL DECK · COUNTER-ROTATION"
        : "33⅓ / 45 RPM · MODULAR PLATFORM · UPGRADEABLE",
    highlights:
      product.slug === "discovery"
        ? [
            "NEW SUSPENSION COUPLING",
            "ISOLATED DRIVE",
            "HAND-FINISHED",
            "REFERENCE PLATFORM",
          ]
        : product.slug === "sparta"
        ? ["DUAL DECK ARCHITECTURE", "COUNTER-ROTATION", "SOLID ALUMINUM", "SUSPENDED"]
        : ["MODULAR PLATFORM", "UPGRADE PATH", "COUNTER-ROTATION", "SUSPENDED"],
    cta: { label: "Find a Distributor", href: `/${locale}/distributors` },
    image: {
      src: product.gallery?.[0] ?? "/media/products/placeholder.jpg",
      alt: `${product.name} product hero`,
      priority: product.slug === "discovery",
    },
  } as const;

  return (
    <main className="min-h-screen bg-black text-white">
            
      <ProductAnchorNav headerOffset={64} />


      <ProductHero data={hero} />


      {/* 你已有的 Intro / Endorsements / Specs 组件，直接串起来 */}
      <section id ="overview">

        <ProductIntro
          // 如果你 ProductIntro 的 props 不同，直接把这一段改成你现有签名即可
          // 我这里按“常规”写：title + paragraphs
          title="Overview"
          paragraphs={(product.description ?? []).slice(0, 3)}
        />

      </section>

      <section id="design">


      </section>

      <section id="reviews">
        <ProductEndorsements
          // 同理：按你现有组件签名微调
          title="Press & Endorsements"
          items={(product.reviews ?? []).map((r, idx) => ({
            id: `${product.slug}-${idx}`,
            source: r.sourceName ?? r.authorName ?? "Press",
            quote: r.quote,
            url: r.sourceUrl,
            logo: r.imageUrl,
          }))}
        />

      </section>

      <section id="specs">
        <ProductSpecs
          title="Technical Specifications"
          items={(product.specs ?? []).map((s) => ({
            key: s.key,
            value: s.value,
          }))}
        />

      </section>





      <div className="h-16" />
    </main>
  );
}
