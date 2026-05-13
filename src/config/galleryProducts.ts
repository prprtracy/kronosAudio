import type { GallerySection } from "@/config/gallery";

export type GalleryProductCopy = {
  name: string;
  eyebrow: string;
  category: string;
  description: string[];
  hero?: string;
  imagePositionDesktop?: string;
  imagePositionMobile?: string;
  supporting?: string[];
  assemblyPdf?: string;
};

export type NormalizedGallerySection = GallerySection & {
  copy: GalleryProductCopy;
  hero?: GallerySection["items"][number];
  supporting: GallerySection["items"];
  allItems: GallerySection["items"];
};

export const GALLERY_PRODUCT_ORDER = [
  "discovery",
  "perpetual",
  "pro",
  "sparta",
  "tonearm",
  "phono",
  "racks",
];

export const GALLERY_PRODUCTS: Record<string, GalleryProductCopy> = {
  discovery: {
    name: "Discovery",
    eyebrow: "Discovery",
    category: "Reference System",
    description: [
      "A reference suspended turntable system.",
      "Engineered for absolute rotational stability and mechanical silence.",
    ],
    hero: "/media/discovery_001.jpg",
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
    assemblyPdf: "/media/downloads/DISCOVERY%20assembly%20instruction%202026.pdf",
    supporting: [
      "/media/products/Discovery/discovery1.jpg",
      "/media/products/Discovery/discovery6.jpg",
      "/media/products/Discovery/discovery3.jpg",
      "/media/products/Discovery/discovery5.jpg",
    ],
  },
  pro: {
    name: "Kronos Pro",
    eyebrow: "Kronos Pro",
    category: "Precision Turntable",
    description: [
      "A precision turntable system that brings reference engineering into perfect balance.",
      "Layered architecture, obsessive damping, and unmistakable presence.",
    ],
    hero: "/media/pro_000.jpg",
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
    assemblyPdf: "/media/downloads/KronosPro%20assembly%20instructions%202014.pdf",
    supporting: [
      "/media/products/Kronos Pro/pro1.jpg",
      "/media/products/Kronos Pro/pro6.jpg",
      "/media/products/Kronos Pro/pro9.jpg",
      "/media/products/Kronos Pro/pro8.jpg",
    ],
  },
  sparta: {
    name: "Sparta",
    eyebrow: "Sparta",
    category: "Turntable System",
    description: [
      "Built for power, control, and unwavering performance.",
      "A compact expression of Kronos counter-rotating design.",
    ],
    hero: "/media/products/Sparta/sparta_0.jpg",
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
    assemblyPdf: "/media/downloads/Sparta%20assembly%20instructions%202026.pdf",
    supporting: [
      "/media/products/Sparta/sparta1.jpg",
      "/media/products/Sparta/sparta13.jpg",
      "/media/products/Sparta/sparta4.jpg",
      "/media/products/Sparta/sparta8.jpg",
    ],
  },
  perpetual: {
    name: "Perpetual",
    eyebrow: "Perpetual",
    category: "Turntable System",
    description: [
      "A sculptural system built around control, isolation, and musical continuity.",
      "Designed for a quiet mechanical foundation.",
    ],
    hero: "/media/perpetual_000.jpg",
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
    supporting: [
      "/media/products/Perpetual/perpetual1.jpg",
      "/media/products/Perpetual/perpetual2.jpg",
      "/media/products/Perpetual/perpetual5.jpg",
      "/media/products/Perpetual/perpetual9.jpg",
    ],
  },
  phono: {
    name: "Phono",
    eyebrow: "Phono",
    category: "Phono Stage",
    description: [
      "Signal purity, precision gain, and a chassis architecture made for silence.",
      "A refined foundation for analog playback.",
    ],
    hero: "/media/phono_000.jpg",
    supporting: [
      "/media/products/Phono/phono_1.jpg",
      "/media/products/Phono/phono_2.jpg",
      "/media/products/Phono/phono_3.jpg",
      "/media/products/Phono/phono_4.jpg",
      
    ],
  },
  tonearm: {
    name: "Tonearm",
    eyebrow: "Tonearms",
    category: "Precision Engineering",
    description: [
      "A family of exacting analog interfaces for extracting musical information with control.",
      "Light, rigid, and meticulously resolved.",
    ],
    hero: "/media/tonearm_0.jpg",
    imagePositionDesktop: "50% 50%",
    imagePositionMobile: "50% 50%",
    assemblyPdf: "/media/downloads/RS%20assembly%20instructions%202026.pdf",
    supporting: [
      "/media/products/tonearm/tonearm2.jpg",
      "/media/products/tonearm/RS_0.jpg",
      "/media/products/tonearm/RS_1.jpg",
      "/media/products/tonearm/RS4.jpg",
    ],
  },
  racks: {
    name: "Full Analogue Solution",
    eyebrow: "Full Analogue Solution",
    category: "Isolation Systems",
    description: [
      "Purpose-built isolation systems that preserve energy, stability, and visual restraint.",
      "Quiet support for serious listening rooms.",
    ],
    hero: "/media/fullAn_000.jpg",
    supporting: [
      "/media/products/Rack/rack.jpg",
      "/media/products/Rack/rack_0.jpg",
      "/media/products/Rack/rack_1.jpg",
      "/media/products/Rack/rack_2.jpg",
    ],
  },
};

function getCopy(section: GallerySection): GalleryProductCopy {
  return (
    GALLERY_PRODUCTS[section.id] ?? {
      name: section.label,
      eyebrow: section.label,
      category: "Kronos Audio",
      description: ["Selected views from the Kronos Audio visual archive."],
    }
  );
}

function uniqueItems(items: GallerySection["items"]) {
  return items.filter(
    (item, index) => items.findIndex((candidate) => candidate.src === item.src) === index
  );
}

export function normalizeGallerySection(
  section: GallerySection
): NormalizedGallerySection {
  const copy = getCopy(section);
  const hero = copy.hero
    ? {
        ...(section.items.find((item) => item.src === copy.hero) ?? {
          src: copy.hero,
          alt: `${copy.name} hero image`,
        }),
        imagePositionDesktop: copy.imagePositionDesktop,
        imagePositionMobile: copy.imagePositionMobile,
      }
    : section.items[0];

  const preferredSupporting =
    copy.supporting
      ?.map((src) => section.items.find((item) => item.src === src) ?? { src })
      .filter((item): item is GallerySection["items"][number] => Boolean(item)) ??
    [];

  const remaining = section.items.filter(
    (item) =>
      item.src !== hero?.src &&
      !preferredSupporting.some((supporting) => supporting.src === item.src)
  );
  const supporting = uniqueItems([...preferredSupporting, ...remaining]);
  const allItems = uniqueItems(hero ? [hero, ...supporting] : supporting);

  return {
    ...section,
    copy,
    hero,
    supporting,
    allItems,
  };
}

export function orderGallerySections(sections: GallerySection[]) {
  return [...sections]
    .filter((section) => section.items.length > 0 && section.id !== "whole")
    .sort((a, b) => {
      const aIndex = GALLERY_PRODUCT_ORDER.indexOf(a.id);
      const bIndex = GALLERY_PRODUCT_ORDER.indexOf(b.id);

      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    })
    .map(normalizeGallerySection);
}
