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

export type SpecItem = {
  key: string;
  value: string;
};

export type ReviewItem = {
  authorName?: string;
  sourceName?: string;
  sourceUrl?: string;
  quote: string;
  imageUrl?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string[];

  // ✅ 约定：缺失 = 没价格；不要 null
  msrp?: Money;
  upgradeKit?: Money;

  gallery: string[];
  downloads: DownloadItem[];
  specs: SpecItem[];
  reviews: ReviewItem[];
};
