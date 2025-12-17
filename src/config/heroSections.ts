// src/config/heroSections.ts

export type HeroSectionId =
  | "home"
  | "about"
  | "products"
  | "solution"
  | "distributors"
  | "contact";

export type HeroMediaType = "image" | "video";

export type HeroConfig = {
  id: HeroSectionId;
  label: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  media: {
    type: HeroMediaType;
    posterSrc: string;
    videoSrc?: string;
    overlayGradient?: string;
  };
};

export const heroSections: HeroConfig[] = [
  {
    id: "home",
    label: "Home",
    title: "Time, Suspended.",
    subtitle: "Reference turntables crafted for the most demanding listeners.",
    ctaPrimary: { label: "Discover Products", href: "#products" },
    ctaSecondary: { label: "Find a Distributor", href: "#distributors" },
    media: {
      type: "image",
      posterSrc: "/media/kronos-landing-poster.jpg",
      overlayGradient: "from-black/70 via-black/30 to-black/90",
    },
  },
  {
    id: "about",
    label: "About",
    title: "Swiss Craft, Built for Music.",
    subtitle: "Design philosophy, engineering approach, and the people behind Kronos.",
    ctaPrimary: { label: "Learn More", href: "/about" },
    media: {
      type: "image",
      posterSrc: "/media/kronos-about-hero.jpg",
      overlayGradient: "from-black/75 via-black/35 to-black/95",
    },
  },
  {
    id: "products",
    label: "Products",
    title: "Mechanical Silence. Musical Truth.",
    subtitle: "Turntables, tonearms and power supplies designed as a reference ecosystem.",
    ctaPrimary: { label: "View Products", href: "/products" },
    media: {
      type: "image",
      posterSrc: "/media/kronos-products-hero.jpg",
      overlayGradient: "from-black/75 via-black/40 to-black/95",
    },
  },
  {
    id: "solution",
    label: "Complete Solution",
    title: "A Complete Reference System.",
    subtitle: "From setup to support — a coherent path to reference-level playback.",
    ctaPrimary: { label: "Explore Solutions", href: "/solution" },
    media: {
      type: "image",
      posterSrc: "/media/kronos-solution-hero.jpg",
      overlayGradient: "from-black/75 via-black/40 to-black/95",
    },
  },
  {
    id: "distributors",
    label: "Distributors",
    title: "A Global Network of Specialists.",
    subtitle: "Trusted partners to install, calibrate, and support your system worldwide.",
    ctaPrimary: { label: "Open Map", href: "/distributors" },
    media: {
      type: "image",
      posterSrc: "/media/kronos-distributors-hero.jpg",
      overlayGradient: "from-black/75 via-black/40 to-black/95",
    },
  },
  {
    id: "contact",
    label: "Contact",
    title: "Let’s Build Your Reference System.",
    subtitle: "Get in touch for dealers, service, press, or product questions.",
    ctaPrimary: { label: "Contact Us", href: "/contact" },
    media: {
      type: "image",
      posterSrc: "/media/kronos-contact-hero.jpg",
      overlayGradient: "from-black/75 via-black/40 to-black/95",
    },
  },
];
