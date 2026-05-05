import { notFound } from "next/navigation";

import { getProducts } from "@/lib/products";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductIntro, type ProductIntroAward } from "@/components/product/ProductIntro";
import {
  ProductEndorsements,
  type VideoReview,
} from "@/components/product/ProductEndorsements";
import { ProductFeaturedCoverage } from "@/components/product/ProductFeaturedCoverage";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductAnchorNav } from "@/components/product/ProductAnchorNav";
import { ProductDownloads } from "@/components/product/ProductDownloads";
import { createPressSlug } from "@/data/press";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const videoReviewsByProduct: Record<string, VideoReview[]> = {
  discovery: [
    {
      id: "discovery-audio-analyst-launch",
      title: "E56: The KRONOS Discovery turntable launch",
      channel: "the audio analyst",
      youtubeId: "QvKQwTwkils",
      type: "Product Launch / Turntable",
    },
    {
      id: "discovery-avshowreports-premiere",
      title: "Kronos Discovery Turntable, AVShowrooms World Premier",
      channel: "AVshowreports",
      youtubeId: "eQFGYSrowx4",
      type: "World Premiere / Listening Session",
    },
  ],
  perpetual: [
    {
      id: "perpetual-audio-analyst",
      title:
        "E170: Introducing the KRONOS Audio Perpetual Turntable & Discovery Phono Stage",
      channel: "the audio analyst",
      youtubeId: "10VE8DSspko",
      type: "Product Introduction",
    },
    {
      id: "perpetual-hificlub",
      title:
        "KRONOS PERPETUAL turntable was designed everyone can experience KRONOS sound",
      channel: "HIFICLUB",
      youtubeId: "3bKXyn68k_E",
      type: "High End Munich 2024 Demo",
    },
  ],
  "kronos-pro": [
    {
      id: "kronos-pro-audio-analyst",
      title: "E65: The KRONOS Pro Limited Edition turntable",
      channel: "the audio analyst",
      youtubeId: "DyaT7kcgYCI",
      type: "Editorial Discussion",
    },
    {
      id: "kronos-pro-suncoast",
      title: "My Kronos Pro Turntable",
      channel: "Suncoast Audio",
      youtubeId: "8AqHVQZqncA",
      type: "Owner / Dealer Showcase",
    },
  ],
  sparta: [
    {
      id: "sparta-sound-sommelier",
      title: "KRONOS SPARTA Hi-end Turntable! UNBOXING - SETUP - LISTENING",
      channel: "SOUND SOMMELIER",
      youtubeId: "Mcm-xav0d_c",
      type: "Unboxing / Setup / Listening",
    },
    {
      id: "sparta-av-equipment-reviews",
      title: "Kronos Sparta Turntable, Review pt. 1, intro and set up",
      channel: "AVequipmentReviews",
      youtubeId: "nRCTDsI9nTU",
      type: "Review / Setup",
    },
  ],
  phono: [
    {
      id: "phono-audio-analyst",
      title:
        "E170: Introducing the KRONOS Audio Perpetual Turntable & Discovery Phono Stage",
      channel: "the audio analyst",
      youtubeId: "10VE8DSspko",
      type: "Discovery Phono Stage",
    },
    {
      id: "phono-gtt-audio",
      title: "GTT AUDIO - Episode 95 - Kronos New Turntable and Phono",
      channel: "GTT Audio",
      youtubeId: "DpIhuQz9p2A",
      type: "Phono / Turntable Discussion",
    },
  ],
  tonearms: [
    {
      id: "tonearms-audio-analyst",
      title: "E69: The KRONOS Resonance Suppression Tonearms",
      channel: "the audio analyst",
      youtubeId: "sbBdjHBG0j8",
      type: "Tonearm Technology",
    },
    {
      id: "tonearms-discovery-rs-reviewers-view",
      title: "Reviewers View, The Kronos Discovery RS Tonearm",
      channel: "GTT Audio",
      youtubeId: "osj3tbmy_ow",
      type: "Discovery RS Tonearm / Reviewer Discussion",
    },
  ],
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
  const videoReviews = videoReviewsByProduct[product.slug];
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
  const awardBySlug: Record<string, ProductIntroAward> = {
    discovery: {
      src: "/media/rewards/hifi.png",
      alt: "HiFi+ Innovation of the Year Award 2021",
      lines: ["WON HIFI+", "INNOVATION OF THE YEAR", "AWARD"],
    },
    "kronos-pro": {
      src: "/media/rewards/hifi.jpg",
      alt: "HiFi+ Editor's Choice Award 2020 for Kronos Pro",
      lines: ["WON HIFI+", "EDITOR'S CHOICE", "2020"],
      href: "https://daviddenyerpr.co.uk/2020/05/29/hi-fi-plus-editors-choice-awards-2020-kronos-pro-reference-turntable/",
    },
  };
  const featuredCoverageBySlug: Record<
    string,
    {
      images: string[];
      imageAlt: string;
      title: string;
      copy: string;
    }
  > = {
    discovery: {
      images: ["/media/rewards/mag_dis_1.jpg"],
      imageAlt: "Kronos Discovery magazine feature",
      title: "Discovery Turntable - Editorial Feature",
      copy: "Recognized in international audio press, Discovery represents Kronos Audio's most advanced expression of counter-rotational analogue playback, combining mechanical precision with exceptional stability and low-noise performance.",
    },
    "kronos-pro": {
      images: ["/media/rewards/mag_pro_1.jpg", "/media/rewards/mag_pro_2.jpg"],
      imageAlt: "Kronos Pro magazine feature",
      title: "Kronos Pro - Editorial Feature",
      copy: "Featured in international print media, Kronos Pro is recognized for its uncompromising approach to analogue playback, combining counter-rotational technology with precision mechanical design.",
    },
  };
  const featuredCoverage =
    featuredCoverageBySlug[product.slug as keyof typeof featuredCoverageBySlug];

  const hero = {
    eyebrow: product.category ?? "Products",
    title: product.name,
    price: product.msrp?.display
      ? { label: "MSRP", value: product.msrp.display }
      : undefined,
    dek: product.description?.slice(0, 2) ?? [],
    highlights: highlightsBySlug[product.slug] ?? [],
    note: product.note,
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
          award={awardBySlug[product.slug as keyof typeof awardBySlug]}
          variant="light"
        />
      </section>

      <section id="reviews">
        <ProductEndorsements
          title="Press & Endorsements"
          videoReviews={videoReviews}
          items={endorsements.map((item, idx) => ({
            id: `${product.slug}-${idx}`,
            initials: item.initials,
            title: item.title,
            source: item.source,
            quote: item.quote,
            url:
              item.link && item.link.length > 0 && item.type?.includes("Press")
                ? `/press/${createPressSlug({
                    productSlug: product.slug,
                    source: item.source,
                    title: item.title,
                  })}`
                : item.link && item.link.length > 0
                  ? item.link
                  : "#",
            subtitle: item.type,
          }))}
        />
        {featuredCoverage ? (
          <ProductFeaturedCoverage {...featuredCoverage} />
        ) : null}
      </section>

      <section id="specs">
        <ProductSpecs
          title="Technical Specifications"
          subtitle={product.slug === "tonearms" ? "RS Tonearm Comparison" : undefined}
          comparisonLabels={
            product.slug === "tonearms"
              ? ["Discovery RS Tonearm", "Kronoscope RS Tonearm"]
              : undefined
          }
          items={(product.specs ?? []).map((s) => ({
            key: s.key,
            value: s.value,
            comparisonValue: s.comparisonValue,
          }))}
        />
        <ProductDownloads items={product.downloads ?? []} />
      </section>

      <div className="h-16" />
    </main>
  );
}
