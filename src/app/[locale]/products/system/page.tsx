// app/[locale]/products/system/page.tsx
import Image from "next/image";
import Link from "next/link";
import { SYSTEMS } from "@/config/systems";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SystemsPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-4">
            Turntable Systems
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            A System, Not a Product.
          </h1>
          <p className="mt-6 max-w-2xl text-sm sm:text-base text-neutral-200/95 leading-relaxed">
            Each Kronos is conceived as a complete analogue ecosystem—architecture, stability, and silence working as one.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {SYSTEMS.map((s, idx) => {
            const reverse = idx % 2 === 1;
            const href = `/${locale}/products/system/${s.slug}`;

            return (
              <Link
                key={s.slug}
                href={href}
                className="group block rounded-3xl border border-neutral-800 bg-white/5 hover:bg-white/7 transition-colors overflow-hidden"
              >
                <div className={`grid md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative h-64 md:h-full min-h-[320px]">
                    <Image
                      src={s.heroImage}
                      alt={s.systemName}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/25 to-black/85" />
                  </div>

                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-400">
                      {s.systemName}
                    </p>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                      {s.headline}
                    </h2>
                    <p className="mt-4 text-sm text-neutral-200/90 leading-relaxed">
                      {s.positioning}
                    </p>

                    <div className="mt-7 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase">
                      <span className="text-amber-300 group-hover:text-amber-200 transition-colors">
                        Enter the System →
                      </span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-300/80">
                        {s.modules.turntable.name} + {s.modules.powerSupply.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
