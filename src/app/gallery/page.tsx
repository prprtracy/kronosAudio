import type { Locale } from "@/i18n";
import { normalizeLocale } from "@/lib/content";
import { getGallery } from "@/lib/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

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

          <h1 className="max-w-full text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
            {content.headline}
          </h1>

          {content.intro && (
            <div className="mt-6 space-y-2">
              {content.intro.map((line) => (
                <p
                  key={line}
                  className="text-sm sm:text-base text-neutral-300 leading-relaxed break-words"
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Media slice */}

        <div className="mt-20">
          <GalleryGrid sections={content.sections} />

          {content.caption && (
            <div className="mt-12 text-[10px] tracking-[0.28em] uppercase text-neutral-300/60">
              {content.caption}
            </div>
          )}
        </div>


      </div>
    </main>
  );
}
