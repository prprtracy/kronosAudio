// app/[locale]/products/system/[systemSlug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SYSTEMS, getSystemBySlug } from "@/config/systems";

export const dynamicParams = true; // 保險：避免上層限制導致 404

type PageProps = {
  params: Promise<{
    locale: string;
    systemSlug: string;
  }>;
};

export function generateStaticParams() {
  // 只針對 systemSlug；locale 由 [locale] segment 提供
  return SYSTEMS.map((s) => ({ systemSlug: s.slug }));
}

export default async function SystemDetailPage({ params }: PageProps) {
  const { locale, systemSlug } = await params;

  const system = getSystemBySlug(systemSlug);
  if (!system) notFound();

  const systemsIndexHref = `/${locale}/products/system`;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative pt-24 pb-18">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src={system.heroImage}
            alt={system.systemName}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/35 to-black/90" />
        </div>

        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-10 pb-14 max-w-3xl">
              <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-4">
                {system.systemName}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                {system.headline}
              </h1>

              <div className="mt-7 space-y-3">
                {system.copy.map((line) => (
                  <p key={line} className="text-sm sm:text-base text-neutral-200/95 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={systemsIndexHref}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-neutral-500 text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-100 hover:border-amber-300 hover:text-amber-200 transition-colors"
                >
                  Back to Systems
                </Link>

                <Link
                  href={`/${locale}/products`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-400 text-black text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-amber-300 transition-colors"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The System (modules) */}
      <section className="pb-24 pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-2">
                The System
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Two core elements. One intent.
              </h2>
            </div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-neutral-400">
              {system.modules.turntable.name} + {system.modules.powerSupply.name}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-neutral-800 bg-white/5 p-7">
              <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-400">Turntable</p>
              <h3 className="mt-3 text-xl font-semibold">{system.modules.turntable.name}</h3>
              <p className="mt-4 text-sm text-neutral-200/90 leading-relaxed">
                {system.modules.turntable.note ??
                  "The mechanical heart of the system—engineered to control resonance and preserve timing."}
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-white/5 p-7">
              <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-400">Power Supply</p>
              <h3 className="mt-3 text-xl font-semibold">{system.modules.powerSupply.name}</h3>
              <p className="mt-4 text-sm text-neutral-200/90 leading-relaxed">
                {system.modules.powerSupply.note ??
                  "Dedicated external regulation and isolation—stability and silence as part of the system architecture."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
