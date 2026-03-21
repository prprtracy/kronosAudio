import { notFound } from "next/navigation";

import { getProducts } from "@/lib/products";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductIntro } from "@/components/product/ProductIntro";
import { ProductEndorsements } from "@/components/product/ProductEndorsements";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductAnchorNav } from "@/components/product/ProductAnchorNav";
import { ProductDownloads } from "@/components/product/ProductDownloads";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts("en");

  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const products = await getProducts("en");
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

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
        ? [
            "DUAL DECK ARCHITECTURE",
            "COUNTER-ROTATION",
            "SOLID ALUMINUM",
            "SUSPENDED",
          ]
        : [
            "MODULAR PLATFORM",
            "UPGRADE PATH",
            "COUNTER-ROTATION",
            "SUSPENDED",
          ],
    cta: { label: "Find a Distributor", href: "/distributors" },
    image: {
      src: product.gallery?.[0] ?? "/media/products/placeholder.jpg",
      alt: `${product.name} product hero`,
      priority: product.slug === "discovery",
      gallery: (product.gallery ?? []).map((src) => ({ src })),
    },
  } as const;

  return (
    <main className="min-h-screen bg-black text-white">
      <ProductAnchorNav headerOffset={64} />

      <ProductHero data={hero} />

      <section
        id="design"
        style={{
          ["--background" as any]: "#ffffff",
          ["--foreground" as any]: "#000000",
        }}
      >
        <ProductIntro
          title="Overview"
          paragraphs={(product.introParagraphs ?? []).slice(0, 3)}
          note={(product as any).introNote}
          variant="light"
        />
      </section>

      <section id="design"></section>

      <section id="reviews">
        <ProductEndorsements
          title="Press & Endorsements"
          items={(product.reviews ?? []).map((r, idx) => ({
            id: `${product.slug}-${idx}`,
            source: r.sourceName ?? r.authorName ?? "Press",
            quote: r.quote,
            url: r.sourceUrl && r.sourceUrl.length > 0 ? r.sourceUrl : "#",
            logoSrc: r.imageUrl,
            subtitle: r.subtitle,
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
        <ProductDownloads items={product.downloads ?? []} />
      </section>

      <div className="h-16" />
    </main>
  );
}