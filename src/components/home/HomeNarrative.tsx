"use client";

import Image from "next/image";
import clsx from "clsx";
import { HomeNarrativeSection } from "@/types/home";

export function HomeNarrative({
  sections,
  locale,
}: {
  sections: HomeNarrativeSection[];
  locale: string;
}) {
  return (
    <main>
      {sections.map((s: HomeNarrativeSection, idx: number) => {
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
                  sizes="100vw"
                  priority={isHero}
                  className="object-cover"
                />
                <div
                  className={clsx(
                    "absolute inset-0 bg-gradient-to-br",
                    s.overlayGradient ?? "from-black/90 via-black/55 to-black/95"
                  )}
                />
              </div>
            )}

            <div className={clsx("relative z-10 w-full", isHero ? "pt-24" : "pt-0")}>
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
                    {s.copy.map((line: string) => (
                      <p key={line} className="text-sm sm:text-base text-neutral-200/95 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>

                  {isInvitation && (
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <a
                        href={`/${locale}/distributors`}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-400 text-black text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-amber-300 transition-colors"
                      >
                        Explore the World
                      </a>
                      <a
                        href={`/${locale}/products`}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-neutral-500 text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-100 hover:border-amber-300 hover:text-amber-200 transition-colors"
                      >
                        Discover the Systems
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isHero && (
              <div className="absolute bottom-10 inset-x-0 z-10 flex justify-center pointer-events-none">
                <div className="text-[10px] tracking-[0.32em] uppercase text-neutral-300/60">Scroll</div>
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
