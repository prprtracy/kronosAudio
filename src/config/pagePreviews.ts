// src/config/pagePreviews.ts

export type PagePreview = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  posterSrc: string;
};

export const pagePreviews: PagePreview[] = [
  {
    id: "products",
    label: "Products",
    title: "Turntables, Tonearms & Power Supplies",
    description:
      "Discover the complete Kronos ecosystem, designed as a coherent reference system from the ground up.",
    href: "/products",
    posterSrc: "/media/preview-products.jpg",
  },
  {
    id: "media",
    label: "Media & Reviews",
    title: "Reviews, Awards & Press",
    description:
      "Explore what the world’s most demanding reviewers and listeners say about Kronos.",
    href: "/media",
    posterSrc: "/media/preview-media.jpg",
  },
];
