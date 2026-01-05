// app/[locale]/products/page.tsx
import { products } from "@/data/products";
import { ProductZigZagRow } from "@/components/product/ProductZigZagRow";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400">
                Products
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
                Reference Turntables
              </h1>
            </div>

            <p className="hidden md:block text-[11px] uppercase tracking-[0.28em] text-neutral-400 mt-8">
              33⅓ / 45 RPM · COUNTER-ROTATION · SUSPENDED ARCHITECTURE
            </p>
          </div>

          {/* Zig-Zag list */}
          <div className="mt-10 space-y-8 lg:space-y-10">
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
