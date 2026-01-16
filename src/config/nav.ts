export type NavId =
  | "home"
  | "about"
  | "products"
  | "solution"
  | "distributors"
  | "contact";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroupItem = {
  label: string;
  href?: string;
  productSlug?: string;
  description?: string;
  children?: NavChild[];
};

export type NavItem = {
  id: NavId;
  label: string;
  behavior: "spa" | "link";
  href?: string;
  megaMenu?: {
    title?: string;
    left: NavGroupItem[];
    rightEmptyText?: string;
  };
};

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", behavior: "spa" },
  { id: "about", label: "About", behavior: "spa" },

  {
    id: "products",
    label: "Products",
    behavior: "spa", // 或者 "link"，取决于你是否希望点击顶级菜单跳转
    megaMenu: {
      title: "Products",
      rightEmptyText: "Select a product to explore.",
      left: [
        // --- Turntable Systems ---
        {
          label: "Discovery",
          productSlug: "discovery",
          // 
          description:
            "Our flagship two tonearm platform featuring a radically new exo-skeleton chassis system designed to minimize resonances and optimize isolation.",
        },
        {
          label: "Perpetual",
          productSlug: "perpetual",
          // 
          description:
            "Our one tonearm turntable, utilizing advanced resonance control at a more affordable price point.",
        },
        {
          label: "Kronos Pro",
          productSlug: "kronos-pro",
          // 
          description:
            "The original Kronos reference turntable. The PRO set a new standard in analogue reproduction by combining counter-rotation and overhead suspension.",
        },
        {
          label: "Sparta",
          productSlug: "sparta",
          // 
          description: "Our no-frills platform … an entry to the world of KRONOS.",
        },
        {
          label: "Sparta 0.5",
          productSlug: "sparta-0-5",
          description: "Attainable proposition with solid frame base and upgrade path.",
        },

        // --- Components / Accessories ---
        {
          label: "Power Supply",
          productSlug: "power-supply",
          // 
          description:
            "Dedicated external power systems designed to ensure absolute stability. By isolating and regulating power, they reduce noise and enhance system performance.",
        },
        {
          label: "Phono",
          productSlug: "phono",
          // 
          description:
            "Reference phono stages designed to preserve the integrity of the analog signal. Engineered for low noise, accurate gain, and tonal neutrality.",
        },
        {
          label: "Tonearms",
          productSlug: "tonearms",
          // 
          description: "Patented RS technology Tonearm.",
        },
        {
          label: "Racks & Supports",
          productSlug: "racks",
          // 
          description:
            "Engineered foundations that control vibration and preserve mechanical integrity, allowing Kronos systems to perform at their highest level.",
        },
      ],
    },
  },

  { id: "solution", label: "Complete Solution", behavior: "spa" },
  { id: "distributors", label: "Distributors", behavior: "spa" },
  { id: "contact", label: "Contact", behavior: "spa" },
];