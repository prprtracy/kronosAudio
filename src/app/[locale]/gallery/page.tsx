import Image from "next/image";
import type { Locale } from "@/i18n";
import { normalizeLocale } from "@/lib/content";
import { getGallery } from "@/lib/gallery";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocale(locale);

  const content = await getGallery(safeLocale);

  return (
    <main className="pt-28 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-2xl">
          {content.eyebrow && (
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-4">
              {content.eyebrow}
            </p>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            {content.headline}
          </h1>

          {content.intro && (
            <div className="mt-6 space-y-2">
              {content.intro.map((line) => (
                <p
                  key={line}
                  className="text-sm sm:text-base text-neutral-300 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Media slice */}
        <div className="mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.items.map((item, i) => (
            <div
                key={`${item.src}-${i}`}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10"
            >
                <Image
                src={item.src}
                alt={item.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-opacity duration-300 hover:opacity-95"
                />

                {/* subtle vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/40" />
            </div>
            ))}
        </div>

        {content.caption && (
            <div className="mt-8 text-[10px] tracking-[0.28em] uppercase text-neutral-300/60">
            {content.caption}
            </div>
        )}
        </div>

      </div>
    </main>
  );
}
