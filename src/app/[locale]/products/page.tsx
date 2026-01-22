// app/[locale]/products/page.tsx
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n";
import { locales } from "@/i18n";

import { getProducts } from "@/lib/products";

// 你现有的 UI 组件
import { ProductZigZagRow } from "@/components/product/ProductZigZagRow";
// 或者你用的是 ProductGrid / ProductCardList，按你实际 import

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateStaticParams() {
  // products 列表页只需要 locale
  return locales.map((locale) => ({ locale }));
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  // ✅ 核心改动：从 JSON 读
  const products = await getProducts(locale);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page intro（如果你有） */}
          <header className="mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400 mb-4">
              Products
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Turntables & Systems
            </h1>
            <p className="mt-6 max-w-2xl text-sm sm:text-base text-neutral-300">
              Precision-engineered analogue playback systems designed to reveal
              the full musical intent of every recording.
            </p>
          </header>

          {/* 产品列表 */}
          <div className="space-y-32">
            {products.map((p, index) => (
              <ProductZigZagRow
                key={p.id}
                product={p}
                index={index}
                href={`/${locale}/products/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
