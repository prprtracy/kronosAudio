"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import type { HomeNarrativeSection } from "@/types/home";
import type { HomeSlide } from "@/types/home";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function HomeNarrative({
  sections,
  locale,
}: {
  sections: HomeNarrativeSection[];
  locale: string;
}) {
  // slideshow state keyed by section id
  const [slideIndexById, setSlideIndexById] = useState<Record<string, number>>(
    {}
  );

  // timers per section
  const timers = useRef<Record<string, number | null>>({});

  const setSlideIndex = (id: string, next: number, total: number) => {
    setSlideIndexById((prev) => ({
      ...prev,
      [id]: ((next % total) + total) % total,
    }));
  };

  const stopTimer = (id: string) => {
    const t = timers.current[id];
    if (t) window.clearInterval(t);
    timers.current[id] = null;
  };

  const startTimer = (id: string, total: number, ms: number) => {
    stopTimer(id);
    if (total <= 1) return;
    timers.current[id] = window.setInterval(() => {
      setSlideIndexById((prev) => {
        const cur = prev[id] ?? 0;
        return { ...prev, [id]: (cur + 1) % total };
      });
    }, ms);
  };

  return (
    <main>
      {sections.map((s: HomeNarrativeSection, idx: number) => {
        const isHero = idx === 0;
        const isInvitation = s.id === "invitation";

        const isGrid4 =
          s.view === "grid4" && Array.isArray(s.images) && s.images.length >= 4;

        const grid4Variant = (s.grid4Variant ??
          "cinematic") as "cinematic" | "museum";

        const slides: HomeSlide[] = useMemo(
          () => (Array.isArray(s.slides) ? s.slides : []),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [s.slides]
        );

        const isSlideshow = s.view === "slideshow" && slides.length > 0;
        const totalSlides = slides.length;
        const activeIndex = slideIndexById[s.id] ?? 0;

        // autoplay per section
        useEffect(() => {
          if (!isSlideshow) return;
          const ms = clamp(s.slideshowAutoplayMs ?? 4500, 2000, 12000);
          startTimer(s.id, totalSlides, ms);
          return () => stopTimer(s.id);
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [s.id, isSlideshow, totalSlides, s.slideshowAutoplayMs]);

        const goPrev = () => {
          if (!isSlideshow) return;
          stopTimer(s.id);
          setSlideIndex(s.id, activeIndex - 1, totalSlides);
        };

        const goNext = () => {
          if (!isSlideshow) return;
          stopTimer(s.id);
          setSlideIndex(s.id, activeIndex + 1, totalSlides);
        };

        const goTo = (i: number) => {
          if (!isSlideshow) return;
          stopTimer(s.id);
          setSlideIndex(s.id, i, totalSlides);
        };

        return (
          <section
            key={s.id}
            id={s.id}
            className={clsx(
              "relative min-h-screen flex items-center",
              isHero ? "pt-6" : "pt-0"
            )}
          >
            {/* Background poster */}
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
                    s.overlayGradient ??
                      "from-black/90 via-black/55 to-black/95"
                  )}
                />
              </div>
            )}

            {/* Content */}
            <div
              className={clsx(
                "relative z-10 w-full",
                isHero ? "pt-24" : "pt-0"
              )}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={clsx(
                    "grid items-start gap-10",
                    isGrid4 || isSlideshow
                      ? "lg:grid-cols-[1.05fr_0.95fr]"
                      : "grid-cols-1",
                    isHero ? "py-16" : "py-24"
                  )}
                >
                  {/* LEFT — Text */}
                  <div
                    className={clsx(
                      "max-w-2xl",
                      isGrid4 || isSlideshow ? "max-w-none" : ""
                    )}
                  >
                    {s.eyebrow && (
                      <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-4">
                        {s.eyebrow}
                      </p>
                    )}

                    <h1
                      className={clsx(
                        "font-semibold tracking-tight",
                        isHero
                          ? "text-5xl sm:text-6xl md:text-7xl"
                          : "text-4xl sm:text-5xl md:text-6xl"
                      )}
                    >
                      {s.headline}
                    </h1>

                    <div className="mt-7 space-y-3">
                      {s.copy.map((line: string) => (
                        <p
                          key={line}
                          className="text-sm sm:text-base text-neutral-200/95 leading-relaxed"
                        >
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

                  {/* RIGHT — Grid4 view */}
                  {isGrid4 && (
                    <div className="hidden lg:block">
                      <div
                        className={clsx(
                          "grid grid-cols-2 gap-4",
                          grid4Variant === "museum" &&
                            "p-4 rounded-3xl border border-white/10 bg-white/[0.04]"
                        )}
                      >
                        {s.images!.slice(0, 4).map((src, i) => {
                          const isMuseum = grid4Variant === "museum";

                          return (
                            <div
                              key={`${src}-${i}`}
                              className={clsx(
                                "relative rounded-2xl overflow-hidden border",
                                isMuseum
                                  ? "border-black/10 bg-white/95"
                                  : "border-white/10 bg-black/25",
                                isMuseum ? "aspect-[1/1]" : "aspect-[4/3]"
                              )}
                            >
                              <Image
                                src={src}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 40vw, 0px"
                                className={clsx(
                                  "transition-transform duration-500",
                                  isMuseum
                                    ? "object-contain p-3"
                                    : "object-cover"
                                )}
                              />
                              {!isMuseum ? (
                                <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/55" />
                              ) : (
                                <>
                                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10" />
                                  <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 text-[10px] tracking-[0.28em] uppercase text-neutral-300/70">
                        Evolution • Craft • Detail
                      </div>
                    </div>
                  )}

                  {/* RIGHT — Slideshow / Slice view */}
                  {isSlideshow && (
                    <div className="hidden lg:block">
                      <div className="relative rounded-3xl border border-white/10 bg-black/25 overflow-hidden">
                        {/* subtle top highlight */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

                        {/* slide stage */}
                        <div className="relative p-6">
                          {/* Render active slide */}
                          {(() => {
                            const slide = slides[activeIndex];

                            if (slide.type === "image") {
                              return (
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/30 aspect-[16/10]">
                                  <Image
                                    src={slide.src}
                                    alt={slide.alt ?? ""}
                                    fill
                                    sizes="(min-width: 1024px) 40vw, 0px"
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/55" />

                                  {(slide.eyebrow || slide.headline) && (
                                    <div className="absolute left-5 bottom-5 right-5">
                                      {slide.eyebrow && (
                                        <div className="text-[10px] tracking-[0.32em] uppercase text-amber-300/90">
                                          {slide.eyebrow}
                                        </div>
                                      )}
                                      {slide.headline && (
                                        <div className="mt-2 text-xl font-medium text-white">
                                          {slide.headline}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            // award card
                            return (
                              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                                <div className="flex items-start justify-between gap-6">
                                  <div>
                                    <div className="text-[10px] tracking-[0.32em] uppercase text-amber-300/90">
                                      {s.slideshowVariant === "awards"
                                        ? "Recognition"
                                        : "Slide"}
                                    </div>
                                    <div className="mt-2 text-2xl font-semibold text-white leading-tight">
                                      {slide.title}
                                    </div>

                                    {(slide.source || slide.year) && (
                                      <div className="mt-3 text-[11px] tracking-[0.22em] uppercase text-neutral-300/70">
                                        {slide.source ? slide.source : ""}
                                        {slide.source && slide.year ? " • " : ""}
                                        {slide.year ? slide.year : ""}
                                      </div>
                                    )}
                                  </div>

                                  <div className="shrink-0 rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-1 text-[10px] tracking-[0.28em] uppercase text-amber-200">
                                    Award
                                  </div>
                                </div>

                                {slide.quote && (
                                  <div className="mt-5 text-sm text-neutral-200/90 leading-relaxed">
                                    “{slide.quote}”
                                  </div>
                                )}

                                {slide.href && (
                                  <a
                                    href={slide.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 inline-flex items-center text-[11px] uppercase tracking-[0.22em] text-amber-300 hover:text-amber-200 transition-colors"
                                  >
                                    Read more →
                                  </a>
                                )}
                              </div>
                            );
                          })()}
                        </div>

                        {/* controls */}
                        {totalSlides > 1 && (
                          <>
                            <button
                              type="button"
                              aria-label="Previous"
                              onClick={goPrev}
                              className={clsx(
                                "absolute left-3 top-1/2 -translate-y-1/2",
                                "h-9 w-9 rounded-full",
                                "border border-white/10 bg-black/35 backdrop-blur",
                                "text-white/80 hover:text-white hover:bg-black/45",
                                "transition-colors"
                              )}
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              aria-label="Next"
                              onClick={goNext}
                              className={clsx(
                                "absolute right-3 top-1/2 -translate-y-1/2",
                                "h-9 w-9 rounded-full",
                                "border border-white/10 bg-black/35 backdrop-blur",
                                "text-white/80 hover:text-white hover:bg-black/45",
                                "transition-colors"
                              )}
                            >
                              ›
                            </button>
                          </>
                        )}

                        {/* dots */}
                        {totalSlides > 1 && (
                          <div className="px-6 pb-5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {slides.map((_, i) => (
                                  <button
                                    key={`${s.id}-dot-${i}`}
                                    type="button"
                                    aria-label={`Go to slide ${i + 1}`}
                                    onClick={() => goTo(i)}
                                    className={clsx(
                                      "h-2 w-2 rounded-full transition-all",
                                      i === activeIndex
                                        ? "bg-amber-300 w-6"
                                        : "bg-white/20 hover:bg-white/30"
                                    )}
                                  />
                                ))}
                              </div>

                              <div className="text-[10px] tracking-[0.28em] uppercase text-neutral-300/60">
                                {activeIndex + 1}/{totalSlides}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 text-[10px] tracking-[0.28em] uppercase text-neutral-300/70">
                        Awards • Reviews • Best of Show
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
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
