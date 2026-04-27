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

  const overview = product.overview;
  const endorsements = product.endorsements ?? [];
  const highlightsBySlug: Record<string, string[]> = {
    discovery: [
      "NEW SUSPENSION COUPLING",
      "ISOLATED DRIVE",
      "HAND-FINISHED",
      "REFERENCE PLATFORM",
    ],
    sparta: [
      "DUAL DECK ARCHITECTURE",
      "COUNTER-ROTATION",
      "SOLID ALUMINUM",
      "SUSPENDED",
    ],
    "kronos-pro": [
      "ORIGINAL REFERENCE",
      "COUNTER-ROTATIONAL LEGACY",
      "LIMITED PRODUCTION",
      "REFERENCE PLATFORM",
    ],
    perpetual: [
      "SINGLE-TONEARM PLATFORM",
      "UPGRADEABLE ARCHITECTURE",
      "RESONANCE CONTROL",
      "REFINED VALUE",
    ],
    tonearms: [
      "PRECISION TONEARM SYSTEM",
      "RS TECHNOLOGY",
      "RESONANCE SUPPRESSION",
      "SIGNAL INTEGRITY",
    ],
    phono: [
      "REFERENCE PHONO STAGE",
      "SIGNAL INTEGRITY",
      "FULL-TUBE ARCHITECTURE",
      "ADJUSTABLE EQ",
    ],
    racks: [
      "ENGINEERED FOUNDATIONS",
      "SYSTEM INTEGRATION",
      "VIBRATION CONTROL",
      "ANALOGUE SOLUTION",
    ],
  };

  const hero = {
    eyebrow: product.category ?? "Products",
    title: product.name,
    price: product.msrp?.display
      ? { label: "MSRP", value: product.msrp.display }
      : undefined,
    dek: product.description?.slice(0, 2) ?? [],
    highlights: highlightsBySlug[product.slug] ?? [],
    cta: { label: "Find a Distributor", href: "/distributors" },
    image: {
      src: product.image ?? product.gallery?.[0] ?? "/media/products/placeholder.jpg",
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
        id="overview"
        style={{
          ["--background" as string]: "#ffffff",
          ["--foreground" as string]: "#000000",
        }}
      >
        <ProductIntro
          title={overview?.title ?? "Overview"}
          paragraphs={(overview?.paragraphs ?? []).slice(0, 3)}
          note={
            overview?.notes?.length || overview?.footerTag
              ? {
                  label: "Notes",
                  copy: overview?.notes ?? [],
                  signature: overview?.footerTag,
                }
              : undefined
          }
          award={
            product.slug === "discovery"
              ? {
                  src: "/media/rewards/hifi.png",
                  alt: "HiFi+ Innovation of the Year Award 2021",
                  lines: ["WON HIFI+", "INNOVATION OF THE YEAR", "AWARD"],
                }
              : undefined
          }
          variant="light"
        />
      </section>

      <section id="reviews">
        <ProductEndorsements
          title="Press & Endorsements"
          items={endorsements.map((item, idx) => ({
            id: `${product.slug}-${idx}`,
            initials: item.initials,
            title: item.title,
            source: item.source,
            quote: item.quote,
            url: item.link && item.link.length > 0 ? item.link : "#",
            subtitle: item.type,
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
