import productsContent from "@/content/en/products.json";

type ProductContent = {
  slug: string;
  name: string;
  endorsements?: {
    initials?: string;
    source: string;
    type?: string;
    title?: string;
    quote: string;
    link?: string;
    links?: string[];
  }[];
};

type ProductsContent = {
  products: ProductContent[];
};

export type PressArticle = {
  slug: string;
  title: string;
  source: string;
  category: string;
  summary: string;
  summaryParagraphs?: string[];
  quote: string;
  takeaways?: { title: string; text: string }[];
  url: string;
  urls?: string[];
  pdfUrl?: string;
  productName: string;
  productSlug: string;
  sourceDomain?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createPressSlug({
  productSlug,
  source,
  title,
}: {
  productSlug: string;
  source: string;
  title?: string;
}) {
  if (
    productSlug === "discovery" &&
    source === "Hi-Fi+" &&
    title === "Kronos Discovery turntable"
  ) {
    return "kronos-discovery-turntable";
  }

  return [productSlug, source, title ?? "press"]
    .map(slugify)
    .filter(Boolean)
    .join("-");
}

function createSummary({
  productName,
  title,
  source,
  category,
  quote,
}: {
  productName: string;
  title: string;
  source: string;
  category: string;
  quote: string;
}) {
  return [
    `${source} presents ${title}, a ${category.toLowerCase()} focused on ${productName}.`,
    quote,
    "This station page keeps the context with Kronos before opening the original publication in a new tab.",
  ].join(" ");
}

function getSourceDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

const pressOverrides: Record<
  string,
  Partial<
    Pick<
      PressArticle,
      | "source"
      | "category"
      | "summary"
      | "summaryParagraphs"
      | "quote"
      | "takeaways"
      | "urls"
      | "pdfUrl"
      | "productSlug"
      | "sourceDomain"
    >
  >
> = {
  "kronos-discovery-turntable": {
    source: "HI-FI+",
    category: "REVIEW / PRESS",
    summary:
      "A focused editorial review of the Kronos Discovery as a ground-up reference turntable, highlighting its transparency, noise control, and ability to reveal recordings with renewed clarity.",
    quote:
      "Discovery is perhaps the simplest turntable to review as it just does 'it' better.",
    summaryParagraphs: [
      "The Hi-Fi+ review positions the Kronos Discovery as more than an extension of the Kronos Pro. It presents Discovery as a complete ground-up statement design, focused on reducing the mechanical and sonic signatures normally associated with vinyl playback.",
      "The review emphasizes how Discovery appears to step through surface noise, allowing the music itself to remain central. Instead of drawing attention to a particular tonal character, the turntable is described as unusually transparent and direct.",
      "For visitors researching the Discovery, this press page keeps the review in the context of the Kronos ecosystem before opening the original publication in a separate tab.",
    ],
    takeaways: [
      {
        title: "Ground-up Reference Design",
        text: "Discovery is presented as a complete reference-level design rather than a scaled variation of another model.",
      },
      {
        title: "Exceptional Transparency",
        text: "The review highlights Discovery's ability to reduce the sense of mechanical coloration.",
      },
      {
        title: "Surface Noise Control",
        text: "The article notes how music remains dominant even when vinyl surface noise is present.",
      },
      {
        title: "Renewed Musical Experience",
        text: "Familiar recordings are described as sounding fresh, immediate, and newly revealing.",
      },
    ],
    productSlug: "discovery",
    sourceDomain: "hifiplus.com",
    pdfUrl: "/media/press/dis_2.pdf",
  },
  "discovery-positive-feedback-the-kronos-discovery-lp-playback-system-sui-generis": {
    pdfUrl: "/media/press/dis_1.pdf",
  },
  "discovery-positive-feedback-final-thoughts-on-the-kronos-discovery-lp-playback-system": {
    pdfUrl: "/media/press/dis_3.pdf",
  },
  "perpetual-the-absolute-sound-the-2024-munich-high-end-show-michael-fremer-on-new-analog-products": {
    pdfUrl: "/media/press/per_1.pdf",
  },
  "perpetual-analog-planet-high-end-munich-2024-postscript-part-1": {
    pdfUrl: "/media/press/per_2.pdf",
  },
  "kronos-pro-positive-feedback-kronos-pro-le-turntable": {
    pdfUrl: "/media/press/pro_1.pdf",
  },
  "kronos-pro-mono-and-stereo-kronos-pro-turntable-with-scps-1-review": {
    pdfUrl: "/media/press/pro_2.pdf",
  },
  "kronos-pro-analogue-fellowship-kronos-pro-ltd-turntable-the-review": {
    pdfUrl: "/media/press/pro_3.pdf",
  },
  "kronos-pro-mono-and-stereo-kronos-audio-pro-turntable-kronoscope-rs-tonearm-review": {
    pdfUrl: "/media/press/pro_4.pdf",
  },
  "sparta-the-absolute-sound-kronos-sparta-turntable": {
    pdfUrl: "/media/press/spa_1.pdf",
  },
  "sparta-enjoythemusic-com-kronos-sparta-0-5-turntable-and-upgrade-to-full-sparta-review": {
    pdfUrl: "/media/press/spa_2.pdf",
  },
  "sparta-positive-feedback-kronos-audio-products-sparta-turntable": {
    pdfUrl: "/media/press/spa_3.pdf",
  },
  "tonearms-positive-feedback-kronoscope-rs-tonearm": {
    pdfUrl: "/media/press/ton_1.pdf",
  },
  "tonearms-positive-feedback-kronos-discovery-resonance-suppression-tonearm": {
    pdfUrl: "/media/press/ton_2.pdf",
  },
  "tonearms-mono-and-stereo-kronos-discovery-rs-tonearm-review": {
    pdfUrl: "/media/press/ton_3.pdf",
  },
  "tonearms-mono-and-stereo-kronos-pro-turntable-kronoscope-rs-tonearm-review": {
    pdfUrl: "/media/press/ton_4.pdf",
  },
  "phono-mono-and-stereo-kronos-audio-discovery-phono-preamplifier": {
    pdfUrl: "/media/press/pho_1.pdf",
  },
  "phono-audiofi-kronos-audio-reference-phono-preamp-is-this-the-best": {
    pdfUrl: "/media/press/pho_2.pdf",
  },
  "phono-positive-feedback-e213-the-kronos-discovery-phonostage-a-new-benchmark": {
    pdfUrl: "/media/press/pho_3.pdf",
  },
  "racks-analogue-fellowship-kronos-complete-analogue-solution": {
    pdfUrl: "/media/press/full_1.pdf",
  },
};

export const pressData: PressArticle[] = (
  productsContent as ProductsContent
).products.flatMap((product) =>
  (product.endorsements ?? [])
    .filter((item) => item.link && item.link !== "#" && item.type?.includes("Press"))
    .map((item) => {
      const title = item.title ?? `${product.name} press coverage`;
      const category = item.type ?? "Press";

      const slug = createPressSlug({
        productSlug: product.slug,
        source: item.source,
        title,
      });
      const baseArticle: PressArticle = {
        slug,
        title,
        source: item.source,
        category,
        summary: createSummary({
          productName: product.name,
          title,
          source: item.source,
          category,
          quote: item.quote,
        }),
        quote: item.quote,
        url: item.link ?? "#",
        urls: item.links?.length ? item.links : item.link ? [item.link] : [],
        productName: product.name,
        productSlug: product.slug,
        sourceDomain: getSourceDomain(item.link ?? ""),
      };

      return {
        ...baseArticle,
        ...pressOverrides[slug],
        slug,
        title,
        url: baseArticle.url,
        urls: baseArticle.urls,
        productName: baseArticle.productName,
      };
    })
);

export function getPressArticleBySlug(slug: string) {
  return pressData.find((article) => article.slug === slug);
}
