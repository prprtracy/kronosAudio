// src/app/[locale]/page.tsx
import type { Locale } from "@/i18n";
import { homeNarrative } from "@/config/homeNarrative";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-black text-white">
      {homeNarrative.map((s, idx) => {
        const isHero = idx === 0;
        const isInvitation = s.id === "invitation";

        return (
          <section
            key={s.id}
            id={s.id}
            className={clsx("relative min-h-screen flex items-center", isHero ? "pt-6" : "pt-0")}
          >
            {s.posterSrc && (
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Image
                  src={s.posterSrc}
                  alt=""
                  fill
                  priority={isHero}
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                />
                <div
                  className={clsx(
                    "absolute inset-0 bg-gradient-to-br",
                    s.overlayGradient ?? "from-black/80 via-black/35 to-black/90"
                  )}
                />
              </div>
            )}

            <div className="relative z-10 w-full">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={clsx("max-w-2xl", isHero ? "py-16" : "py-24")}>
                  {s.eyebrow && (
                    <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-4">
                      {s.eyebrow}
                    </p>
                  )}

                  <h1
                    className={clsx(
                      "font-semibold tracking-tight",
                      isHero ? "text-5xl sm:text-6xl md:text-7xl" : "text-4xl sm:text-5xl md:text-6xl"
                    )}
                  >
                    {s.headline}
                  </h1>

                  <div className="mt-7 space-y-3">
                    {s.copy.map((line) => (
                      <p key={line} className="text-sm sm:text-base text-neutral-200/95 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>

                  {isInvitation && (
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/${locale}/distributors`}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-400 text-black text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-amber-300 transition-colors"
                      >
                        Explore the World
                      </Link>
                      <Link
                        href={`/${locale}/products`}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-neutral-500 text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-100 hover:border-amber-300 hover:text-amber-200 transition-colors"
                      >
                        Discover the Systems
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isHero && (
              <div className="absolute bottom-10 inset-x-0 z-10 flex justify-center pointer-events-none">
                <div className="text-[10px] tracking-[0.32em] uppercase text-neutral-300/60">
                  Scroll
                </div>
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
