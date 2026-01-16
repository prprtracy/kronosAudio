export const products = [
  // --- 1. Discovery ---
  {
    id: "discovery",
    slug: "discovery",
    name: "Discovery",
    tagline: "The Flagship Platform",
    // 
    description: [
      "Our flagship two tonearm platform featuring a radically new exo-skeleton chassis system designed to minimize resonances and optimize isolation.",
      "Kronos developed a wholly new way to attach the chassis to the suspension system, using completely different soft clamping methods.",
    ],
    msrp: { amount: 120000, currency: "USD", display: "120,000 USD" },
    upgradeKit: null,
    gallery: [
      "/media/placeholder-discovery.jpg",
    ],
    downloads: [
      { label: "Download Assembly Instructions", url: "/media/downloads/discovery-assembly.pdf" },
    ],
    specs: [
      { key: "Rotational speed", value: "33.3 rpm & 45 rpm" },
      { key: "Tonearm length", value: "9 to 12 inches" },
    ],
    reviews: [],
  },

  // --- 2. Perpetual (新增) ---
  {
    id: "perpetual",
    slug: "perpetual",
    name: "Perpetual",
    tagline: "Advanced Resonance Control",
    // 
    description: [
      "Our one tonearm turntable, utilizing advanced resonance control at a more affordable price point.",
    ],
    msrp: { amount: 0, currency: "USD", display: "Contact for Pricing" }, // 暂无价格，需客户填
    upgradeKit: null,
    gallery: ["/media/placeholder-perpetual.jpg"], // TODO: 需客户替换图片
    downloads: [],
    specs: [],
    reviews: [],
  },

  // --- 3. Kronos Pro (新增) ---
  {
    id: "kronos-pro",
    slug: "kronos-pro",
    name: "Kronos Pro",
    tagline: "The Original Reference",
    // 
    description: [
      "The original Kronos reference turntable. The PRO set a new standard in analogue reproduction by combining counter-rotation and overhead suspension.",
    ],
    msrp: { amount: 0, currency: "USD", display: "Contact for Pricing" },
    upgradeKit: null,
    gallery: ["/media/placeholder-pro.jpg"], // TODO: 需客户替换图片
    downloads: [],
    specs: [],
    reviews: [],
  },

  // --- 4. Sparta ---
  {
    id: "sparta",
    slug: "sparta",
    name: "Sparta",
    tagline: "The Soul of a New Machine",
    // & 原有文案
    description: [
      "Our no-frills platform … an entry to the world of KRONOS.",
      "Unique to behold, the Sparta is essentially two complete turntables—each including a skeletal, metal-framed plinth fabricated of solid aluminum boards.",
    ],
    msrp: { amount: 24000, currency: "USD", display: "24,000 USD" },
    upgradeKit: null,
    gallery: [
      "/media/sparta-image-01-768x768.jpg",
      "/media/sparta-image-02-768x768.jpg",
    ],
    downloads: [
      { label: "Download Assembly Instructions", url: "/media/downloads/sparta-assembly.pdf" },
    ],
    specs: [
      { key: "Rotational speed", value: "33.3 rpm and 45 rpm" },
      { key: "Net weight", value: "70 lbs / 32 kg" },
    ],
    reviews: [],
  },

  // --- 5. Sparta 0.5 ---
  {
    id: "sparta-0-5",
    slug: "sparta-0-5",
    name: "Sparta 0.5",
    tagline: "Attainable proposition",
    description: [
      "The Sparta features a solid frame base with four suspension towers and the motor housing, from which hangs the subchassis and platter.",
    ],
    msrp: { amount: 16500, currency: "USD", display: "16,500 USD" },
    upgradeKit: { amount: 8250, currency: "USD", display: "8,250 USD" },
    gallery: ["/media/products-sparta-0.5.jpg"],
    downloads: [],
    specs: [],
    reviews: [],
  },

  // --- 6. Power Supply (新增类别页) ---
  {
    id: "power-supply",
    slug: "power-supply",
    name: "Power Supply",
    tagline: "Stability and Silence",
    // 
    description: [
      "Dedicated external power systems designed to ensure absolute stability.",
      "By isolating and regulating power, they reduce noise and enhance system performance.",
    ],
    msrp: null,
    upgradeKit: null,
    gallery: ["/media/placeholder-power.jpg"], // TODO
    downloads: [],
    specs: [],
    reviews: [],
  },

  // --- 7. Phono (新增类别页) ---
  {
    id: "phono",
    slug: "phono",
    name: "Phono Preamplifiers",
    tagline: "Signal Integrity",
    // 
    description: [
      "Reference phono stages designed to preserve the integrity of the analog signal.",
      "Engineered for low noise, accurate gain, and tonal neutrality.",
    ],
    msrp: null,
    upgradeKit: null,
    gallery: ["/media/placeholder-phono.jpg"], // TODO
    downloads: [],
    specs: [],
    reviews: [],
  },

  // --- 8. Tonearms (新增类别页) ---
  {
    id: "tonearms",
    slug: "tonearms",
    name: "Tonearms",
    tagline: "RS Technology",
    // 
    description: [
      "Patented RS technology Tonearm.",
    ],
    msrp: null,
    upgradeKit: null,
    gallery: ["/media/placeholder-tonearm.jpg"], // TODO
    downloads: [],
    specs: [],
    reviews: [],
  },

  // --- 9. Racks (新增类别页) ---
  {
    id: "racks",
    slug: "racks",
    name: "Racks & Supports",
    tagline: "Engineered Foundations",
    // 
    description: [
      "Shelves / Racks Engineered foundations that control vibration and preserve mechanical integrity, allowing Kronos systems to perform at their highest level.",
    ],
    msrp: null,
    upgradeKit: null,
    gallery: ["/media/placeholder-racks.jpg"], // TODO
    downloads: [],
    specs: [],
    reviews: [],
  },
] as const;