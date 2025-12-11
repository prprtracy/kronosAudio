// src/config/heroSections.ts

export type HeroSectionId = "landing" | "products" | "technology" | "distributors";

export type HeroMediaType = "image" | "video";

export type HeroConfig = {
  id: HeroSectionId;
  label: string; // nav 显示用
  title: string;
  subtitle: string;
  ctaPrimary?: {
    label: string;
    href: string;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
  media: {
    type: HeroMediaType;
    // 视频 URL（可以先放占位，后面换成你自己的）
    videoSrc?: string;
    // SSR & 首屏用的高清图（视频没加载时也能好看）
    posterSrc: string;
    // 添加一点 overlay 控制
    overlayGradient?: string; // Tailwind class，如 "from-black/80 via-black/40 to-black/90"
  };
};

export const heroSections: HeroConfig[] = [
  {
    id: "landing",
    label: "Home",
    title: "Time, Suspended.",
    subtitle: "Reference turntables crafted for the most demanding listeners.",
    ctaPrimary: {
      label: "Discover Products",
      href: "#products",
    },
    ctaSecondary: {
      label: "Find a Distributor",
      href: "#distributors",
    },
    media: {
      // type: "video",
      // videoSrc: "/media/kronos-landing.mp4", // TODO: 替换为真实视频
      type: "image",
      posterSrc: "/media/kronos-landing-poster.jpg", // TODO: 替换为真实图片
      overlayGradient: "from-black/80 via-black/30 to-black/90",
    },
  },
  {
    id: "products",
    label: "Products",
    title: "Mechanical Silence. Musical Truth.",
    subtitle: "Turntables, tonearms and power supplies designed as a complete reference ecosystem.",
    ctaPrimary: {
      label: "View All Models",
      href: "/products",
    },
    media: {
      type: "image",
      posterSrc: "/media/kronos-products-hero.jpg",
      overlayGradient: "from-black/80 via-black/40 to-black/95",
    },
  },
  {
    id: "technology",
    label: "Technology",
    title: "Dual-Platter Engineering.",
    subtitle: "Counter-rotating platters cancel unwanted resonances to reveal the full recording.",
    ctaPrimary: {
      label: "Explore Technology",
      href: "/technology",
    },
    media: {
      type: "image",
      posterSrc: "/media/kronos-technology-hero.jpg",
      overlayGradient: "from-black/80 via-black/50 to-black/95",
    },
  },
  {
    id: "distributors",
    label: "Distributors",
    title: "A Global Network of Specialists.",
    subtitle: "Hand-picked partners to install, calibrate and support your reference system.",
    ctaPrimary: {
      label: "View Distributor Map",
      href: "/distributors",
    },
    media: {
      type: "image",
      posterSrc: "/media/kronos-distributors-hero.jpg",
      overlayGradient: "from-black/80 via-black/40 to-black/95",
    },
  },
];
