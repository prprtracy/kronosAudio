export const products = [
  {
    id: "sparta",
    slug: "sparta",
    name: "Sparta",
    tagline: "The Soul of a New Machine",
    msrp: { amount: 24000, currency: "USD", display: "24,000 USD" },
    upgradeKit: null,
    description: [
      "Unique to behold, the Sparta is essentially two complete turntables—each including a skeletal, metal-framed plinth fabricated of solid aluminum boards with phenolic inserts—one situated immediately above the other.",
      "Occupying a space some 20 inches wide, 14 inches deep, and 11 inches tall, and weighing 70 pounds, the Sparta comes in at less than half the weight of my reference Redpoint Model D, yet with a similar overall footprint.",
    ],
    gallery: [
      // TODO: 用你下载到 public/media 的图替换
      "/media/sparta-image-01-768x768.jpg",
      "/media/sparta-image-02-768x768.jpg",
      "/media/sparta-image-03-768x768.jpg",
    ],
    downloads: [
      { label: "Download Assembly Instructions", url: "/media/downloads/sparta-assembly.pdf" },
    ],
    specs: [
      { key: "Rotational speed", value: "33.3 rpm and 45 rpm" },
      { key: "Net weight", value: "70 lbs / 32 kg" },
      // TODO: 按旧站继续补
    ],
    reviews: [
      {
        authorName: "Greg Weaver",
        sourceName: "The Absolute Sound",
        sourceUrl: "https://www.theabsolutesound.com/",
        quote: "…I’ve never before been treated to vinyl playback…",
        imageUrl: "/media/reviews/sparta-review-1.jpg",
      },
      // TODO: 按旧站继续补
    ],
  },
  {
    id: "discovery",
    slug: "discovery",
    name: "Discovery",
    tagline: "Kronos Discovery turntable",
    msrp: { amount: 120000, currency: "USD", display: "120,000 USD" },
    upgradeKit: null,
    description: [
      "Kronos developed a wholly new way to attach the chassis to the suspension system, using completely different soft clamping methods...",
    ],
    gallery: [
      "/media/discovery-image-01-768x768.jpg",
      "/media/discovery-image-02-768x768.jpg",
      "/media/discovery-image-03-768x768.jpg",
      "/media/discovery-image-04-768x768.jpg",
      "/media/discovery-image-05-768x768.jpg",
      "/media/discovery-image-06-768x768.jpg",
      "/media/discovery-image-07-768x768.jpg",
      "/media/discovery-image-08-768x768.jpg",
    ],
    downloads: [
      { label: "Download Assembly Instructions", url: "/media/downloads/discovery-assembly.pdf" },
    ],
    specs: [
      { key: "Rotational speed", value: "33.3 rpm & 45 rpm" },
      { key: "Tonearm length", value: "9 to 12 inches" },
    ],
    reviews: [
      {
        authorName: "Derek Jenkins",
        sourceName: "KJ West One",
        sourceUrl: "https://www.youtube.com/",
        quote: "Derek Jenkins reviews Kronos and Kronos Sparta.",
      },
    ],
  },
  {
    id: "sparta-0-5",
    slug: "sparta-0-5",
    name: "Sparta 0.5",
    tagline: "Attainable proposition with",
    msrp: { amount: 16500, currency: "USD", display: "16,500 USD" },
    upgradeKit: { amount: 8250, currency: "USD", display: "8,250 USD" },
    description: [
      "The Sparta features a solid frame base with four suspension towers and the motor housing, from which hangs the subchassis and platter (or platters) off o-rings...",
    ],
    gallery: ["/media/products-sparta-0.5.jpg"],
    downloads: [],
    specs: [],
    reviews: [
      {
        authorName: "Alan Sircom",
        sourceName: "Hi-Fi+",
        sourceUrl: "https://www.hifiplus.com/",
        quote: 'Kronos Sparta 0.5 Turntable and Upgrade to Full Sparta "This is where I want my music to be!"',
      },
    ],
  },
] as const;
