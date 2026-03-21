import { getProducts } from "@/lib/products";
import { ProductZigZagRow } from "@/components/product/ProductZigZagRow";

export default async function ProductsPage() {
  const products = await getProducts("en");

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="space-y-32">
            {products.map((p, index) => (
              <ProductZigZagRow
                key={p.id}
                product={p}
                index={index}
                href={`/products/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}