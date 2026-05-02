// src/config/products.ts
export type Money = {
  amount: number;
  currency: "USD" | "CAD" | "EUR" | string;
  display: string;
};

export type DownloadItem = {
  label: string;
  url: string;
};

export type ProductOverview = {
  title?: string;
  paragraphs: string[];
  notes?: string[];
  footerTag?: string;
};

export type SpecItem = {
  key: string;
  value: string;
  comparisonValue?: string;
};

export type EndorsementItem = {
  initials?: string;
  title?: string;
  quote: string;
  source: string;
  type?: string;
  link?: string;
};

export type ReviewItem = {
  authorName?: string;
  sourceName?: string;
  sourceUrl?: string;
  quote: string;
  imageUrl?: string;
  subtitle?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category?: string;
  tagline?: string;
  description: string[];
  image?: string;
  note?: string;
  overview?: ProductOverview;
  endorsements?: EndorsementItem[];
  msrp?: Money;
  upgradeKit?: Money;
  gallery: string[];
  downloads: DownloadItem[];
  specs: SpecItem[];
  reviews?: ReviewItem[];
};
