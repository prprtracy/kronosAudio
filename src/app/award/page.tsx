import type { Locale } from "@/i18n";
import { normalizeLocale } from "@/lib/content";
import { getAward } from "@/lib/Award";
import { AwardGrid } from "@/components/award/AwardGrid";

export default async function AwardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocale(locale);

  const content = await getAward(safeLocale);
  const headlineWords = content.headline.trim().split(/\s+/);
  const headlineFirstLine = headlineWords[0] ?? "";
  const headlineSecondLine = headlineWords.slice(1).join(" ");
  const heroDescription =
    content.intro?.[0] ||
    "International recognition earned through innovation in analogue playback.";

  return (
    <main className="bg-black pt-[81px] pb-32 md:pt-[73px]">
      <section className="relative min-h-[420px] overflow-hidden border-b border-white/10 md:min-h-[520px]">
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-right"
          style={{
            backgroundImage: "url('/media/placeholder-pro.jpg')",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.78) 34%, rgba(0,0,0,0.25) 68%, rgba(0,0,0,0.05) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-6xl items-center px-6 md:min-h-[520px] lg:px-8">
          <div className="max-w-xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a24a]">
              {content.eyebrow}
            </p>

            <h1 className="text-5xl font-bold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              {headlineFirstLine}
              {headlineSecondLine && (
                <>
                  <br />
                  {headlineSecondLine}
                </>
              )}
            </h1>

            <div className="mt-8 h-px w-20 bg-[#c9a24a]" />

            <p className="mt-8 max-w-md text-lg leading-relaxed text-white/80">
              {heroDescription}
            </p>

          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div id="awards" className="scroll-mt-28">
          <AwardGrid featured={content.featured} archive={content.archive} />

          {content.caption && (
            <div className="border-t border-white/10 pt-8 text-[10px] tracking-[0.28em] uppercase text-neutral-300/60">
              {content.caption}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
