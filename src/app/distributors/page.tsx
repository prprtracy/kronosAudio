import type { Locale } from "@/i18n";
import { getDistributors } from "@/lib/distributors";
import { DistributorMapShell } from "@/components/distributors/DistributorMapShell";

export default async function DistributorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data = await getDistributors(locale);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.32em] uppercase text-neutral-300/70">
            {data.meta.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            {data.meta.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base text-neutral-200/90 leading-relaxed">
            {data.meta.subhead}
          </p>

          <div className="mt-10">
            <DistributorMapShell locale={locale} data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
