// src/lib/products.ts
import type { Locale } from "@/i18n";
import { getContent } from "@/lib/content";
import type { Product } from "@/config/products";

type ProductsJson = { products: Product[] };

export async function getProducts(locale: Locale): Promise<Product[]> {
  const data = await getContent<ProductsJson>(locale, "products.json");
  return data.products ?? [];
}

export async function getProductBySlug(locale: Locale, slug: string): Promise<Product | null> {
  const products = await getProducts(locale);
  return products.find((p) => p.slug === slug) ?? null;
}
