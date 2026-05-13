"use client";

import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { Section } from "@/components/section/Section";

export type ProductHeroData = {
  eyebrow?: string;
  title: string;
  price?: { label?: string; value: string };
  dek?: string[];
  keyline?: string;
  highlights?: string[];
  note?: string;
  cta?: { label: string; href: string };
  image: {
    src: string;
    alt: string;
    priority?: boolean;
    gallery?: { src: string; alt?: string }[];
  };
};

export function ProductHero({ data }: { data: ProductHeroData }) {
  const {
    eyebrow,
    title,
    price,
    dek,
    keyline,
    highlights,
    note,
    cta,
    image,
  } = data;

  const gallery =
    image.gallery && image.gallery.length > 0
      ? image.gallery
      : [{ src: image.src, alt: image.alt }];

  const [index, setIndex] = useState(0);
  const eyebrowColorClass = "text-yellow-200/70";

  return (
    <Section className="pt-[96px] md:pt-[112px] lg:pt-[128px]">
      <div
        className={clsx(
          "relative left-1/2 w-[min(100vw-24px,1400px)] -translate-x-1/2 overflow-hidden rounded-3xl",
          "bg-zinc-950 ring-1 ring-white/10"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/40" />
        </div>

        <div className="relative grid grid-cols-1 gap-9 px-5 py-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8 md:px-7 md:py-12 lg:gap-10 lg:px-10 lg:py-14">
          <div>
            {eyebrow ? (
              <p className={clsx("text-xs tracking-[0.22em]", eyebrowColorClass)}>
                {eyebrow.toUpperCase()}
              </p>
            ) : null}

            <div className="mt-4 flex items-end justify-between gap-4">
              <h1 className="text-3xl font-semibold leading-[1.06] text-white md:text-4xl lg:text-5xl">
                {title}
              </h1>

              {price?.value ? (
                <div className="text-right">
                  <div className="text-[10px] tracking-[0.24em] text-white/45">
                    {(price.label ?? "MSRP").toUpperCase()}
                  </div>
                  <div className="mt-1 text-sm tracking-[0.08em] text-white/85">
                    {price.value}
                  </div>
                </div>
              ) : null}
            </div>

            {dek && dek.length > 0 ? (
              <div className="mt-5 max-w-[60ch] space-y-4 text-sm leading-7 text-white/80 md:text-[15px]">
                {dek.slice(0, 2).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            ) : null}

            {keyline ? (
              <p className="mt-6 text-xs tracking-[0.20em] text-white/60">
                {keyline.toUpperCase()}
              </p>
            ) : null}

            {highlights && highlights.length > 0 ? (
              <div className="mt-7">
                <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs tracking-[0.14em] text-white/75">
                  {highlights.slice(0, 6).map((h) => (
                    <li key={h} className="flex items-center">
                      <span className="mr-2 inline-block h-1 w-1 rounded-full bg-yellow-200/60" />
                      {h.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {cta ? (
              <div className="mt-8">
                <a
                  href={cta.href}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-white/60 transition-colors hover:text-white/85"
                >
                  {cta.label.toUpperCase()}
                  <span aria-hidden className="text-white/35">
                    {"\u2192"}
                  </span>
                </a>
              </div>
            ) : null}
          </div>

          <div className="min-w-0">
            <div className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                key={gallery[index].src}
                src={gallery[index].src}
                alt={gallery[index].alt ?? image.alt}
                width={1600}
                height={1100}
                priority={index === 0 && (image.priority ?? true)}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(min-width: 1280px) 780px, (min-width: 768px) 58vw, calc(100vw - 40px)"
                style={{ objectPosition: "center center" }}
                className="aspect-[4/3] h-auto w-full object-cover md:aspect-[16/10] xl:aspect-[16/9]"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() =>
                      setIndex((i) => (i === 0 ? gallery.length - 1 : i - 1))
                    }
                    className={clsx(
                      "absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-5",
                      "flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10",
                      "border border-white/10 bg-black/30 text-xl leading-none text-[#d4af37]/80 backdrop-blur-md",
                      "opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100",
                      "hover:border-[#d4af37]/45 hover:bg-black/50 hover:text-[#d4af37]"
                    )}
                  >
                    {"\u2039"}
                  </button>

                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() =>
                      setIndex((i) => (i === gallery.length - 1 ? 0 : i + 1))
                    }
                    className={clsx(
                      "absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-5",
                      "flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10",
                      "border border-white/10 bg-black/30 text-xl leading-none text-[#d4af37]/80 backdrop-blur-md",
                      "opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100",
                      "hover:border-[#d4af37]/45 hover:bg-black/50 hover:text-[#d4af37]"
                    )}
                  >
                    {"\u203a"}
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {gallery.map((_, i) => (
                        <button
                          key={`hero-dot-${i}`}
                          type="button"
                          aria-label={`Go to image ${i + 1}`}
                          onClick={() => setIndex(i)}
                          className={clsx(
                            "h-1.5 rounded-full transition-all duration-300",
                            i === index
                              ? "w-5 bg-[#bfa76a]/75"
                              : "w-1.5 bg-white/20 hover:bg-white/35"
                          )}
                        />
                      ))}
                    </div>

                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                      {index + 1}/{gallery.length}
                    </div>
                  </div>
                </>
              )}
            </div>

            {note ? (
              <p className="mt-3 text-xs italic tracking-wide text-[#c6a66a]/80">
                {note}
              </p>
            ) : null}

            {keyline ? (
              <p className="mt-3 text-xs tracking-[0.18em] text-white/50">
                {keyline.toUpperCase()}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative px-5 pb-7 md:px-7 lg:px-10">
          <div className="h-px w-full bg-white/10" />
        </div>
      </div>
    </Section>
  );
}
