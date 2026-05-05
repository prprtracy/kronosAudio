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
          "relative overflow-hidden rounded-3xl",
          "bg-zinc-950 ring-1 ring-white/10"
        )}
      >
        {/* subtle depth */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/40" />
        </div>

        <div className="relative grid grid-cols-1 gap-10 px-6 py-10 md:grid-cols-12 md:gap-8 md:px-10 md:py-14 lg:px-14 lg:py-16">
          <div className="md:col-span-6 lg:col-span-5">
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
                  className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-white/60 hover:text-white/85 transition-colors"
                >
                  {cta.label.toUpperCase()}
                  <span aria-hidden className="text-white/35">
                    →
                  </span>
                </a>
                {note ? (
                  <p
                    className={clsx(
                      "mt-2 text-xs tracking-wider italic",
                      eyebrowColorClass
                    )}
                  >
                    {note}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="md:col-span-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
              {/* Image */}
              <Image
                key={gallery[index].src}
                src={gallery[index].src}
                alt={gallery[index].alt ?? image.alt}
                width={1600}
                height={1100}
                priority={index === 0 && (image.priority ?? true)}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
                className="h-[320px] w-full object-cover md:h-[420px] lg:h-[520px]"
              />

              {/* Controls */}
              {gallery.length > 1 && (
                <>
                  {/* Prev / Next */}
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() =>
                      setIndex((i) => (i === 0 ? gallery.length - 1 : i - 1))
                    }
                    className={clsx(
                      "absolute left-4 top-1/2 z-20 -translate-y-1/2",
                      "h-9 w-9 rounded-full",
                      "border border-[#d4af37]/45 bg-[#d4af37] backdrop-blur",
                      "text-white hover:text-white hover:bg-[#c09d2f]",
                      "transition-colors"
                    )}
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() =>
                      setIndex((i) => (i === gallery.length - 1 ? 0 : i + 1))
                    }
                    className={clsx(
                      "absolute right-4 top-1/2 z-20 -translate-y-1/2",
                      "h-9 w-9 rounded-full",
                      "border border-[#d4af37]/45 bg-[#d4af37] backdrop-blur",
                      "text-white hover:text-white hover:bg-[#c09d2f]",
                      "transition-colors"
                    )}
                  >
                    ›
                  </button>

                  {/* Bottom controls */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                    {/* dots */}
                    <div className="flex items-center gap-2">
                      {gallery.map((_, i) => (
                        <button
                          key={`hero-dot-${i}`}
                          type="button"
                          aria-label={`Go to image ${i + 1}`}
                          onClick={() => setIndex(i)}
                          className={clsx(
                            "h-2 rounded-full transition-all",
                            i === index
                              ? "w-6 bg-amber-300/80"
                              : "w-2 bg-white/25 hover:bg-white/40"
                          )}
                        />
                      ))}
                    </div>

                    {/* index */}
                    <div className="text-[10px] tracking-[0.28em] uppercase text-white/60">
                      {index + 1}/{gallery.length}
                    </div>
                  </div>
                </>
              )}
            </div>

            {keyline ? (
              <p className="mt-3 text-xs tracking-[0.18em] text-white/50">
                {keyline.toUpperCase()}
              </p>
            ) : null}
          </div>

        </div>

        {/* Bottom hairline */}
        <div className="relative px-6 pb-7 md:px-10 lg:px-14">
          <div className="h-px w-full bg-white/10" />
        </div>
      </div>
    </Section>
  );
}
