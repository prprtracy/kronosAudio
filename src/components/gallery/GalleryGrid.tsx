"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryItem, GallerySection } from "@/config/gallery";
import {
  imagePositionStyle,
  mergeImagePosition,
  responsiveObjectPositionClass,
} from "@/lib/imagePosition";
import { GalleryModal } from "./GalleryModal";

const WATERMARK_SRC = "/media/logo-retina.png";
const galleryActionClass =
  "inline-flex items-center gap-4 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-amber-400 transition-colors hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/70";
const assemblyButtonClass =
  "inline-flex w-full items-center justify-center rounded-full border border-amber-200/20 bg-black/20 px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-amber-200/80 transition-colors hover:border-amber-200/35 hover:bg-black/30 hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400/70 sm:w-auto";

type PreviewSection = GallerySection & {
  heroItem: GalleryItem;
  supportingItems: GalleryItem[];
};

function Watermark({ variant }: { variant: "hero" | "thumb" | "modal" }) {
  const className =
    variant === "hero"
      ? "bottom-4 right-4 w-[20%] min-w-24 max-w-44 opacity-40"
      : variant === "thumb"
        ? "bottom-2 right-2 w-[24%] min-w-14 max-w-24 opacity-35"
        : "bottom-4 right-4 w-[22%] min-w-20 max-w-44 opacity-40";

  return (
    <Image
      src={WATERMARK_SRC}
      alt=""
      width={480}
      height={144}
      aria-hidden="true"
      className={`pointer-events-none absolute h-auto ${className}`}
    />
  );
}

function GalleryImageButton({
  item,
  priority,
  variant,
  onSelect,
}: {
  item: GalleryItem;
  priority?: boolean;
  variant: "hero" | "thumb" | "card";
  onSelect: (item: GalleryItem) => void;
}) {
  const imageClass =
    variant === "hero"
      ? `object-cover ${responsiveObjectPositionClass} transition duration-500 group-hover:scale-[1.025] group-hover:brightness-110`
      : `object-cover ${responsiveObjectPositionClass} transition duration-500 group-hover:scale-[1.04] group-hover:brightness-110`;

  const frameClass =
    variant === "hero"
      ? "aspect-[16/9] min-h-[220px] max-h-[420px] sm:aspect-[16/8.8] sm:min-h-[280px] lg:aspect-[16/8.2]"
      : variant === "card"
        ? "aspect-[16/7.8]"
        : "aspect-[16/8.6]";
  const position = mergeImagePosition(item.src);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`group relative block w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-amber-400/70 ${frameClass}`}
    >
      <Image
        src={item.src}
        alt={item.alt ?? ""}
        fill
        sizes={
          variant === "hero"
            ? "(min-width: 1024px) 72vw, 100vw"
            : "(min-width: 1024px) 18vw, (min-width: 640px) 25vw, 50vw"
        }
        priority={priority}
        style={imagePositionStyle(position)}
        className={imageClass}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/50" />
      <Watermark variant={variant === "hero" ? "hero" : "thumb"} />
    </button>
  );
}

export function GalleryGrid({ sections }: { sections: GallerySection[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  const previewSections = useMemo<PreviewSection[]>(
    () =>
      sections
        .filter((section) => section.items.length > 0)
        .map((section) => ({
          ...section,
          heroItem: section.items[0],
          supportingItems: section.items.slice(1, 5),
        })),
    [sections]
  );

  return (
    <>
      <div className="space-y-0">
        {previewSections.map((section, index) =>
          section.heroItem ? (
            <section
              key={section.id}
              id={section.id}
              className={`grid gap-8 border-white/10 py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10 ${
                index === 0 ? "border-t" : "border-t"
              }`}
            >
              <div className="lg:pt-14">
                <p className="text-[11px] uppercase tracking-[0.28em] text-amber-400">
                  {section.eyebrow ?? section.label}
                </p>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-3xl">
                  {section.label}
                </h2>
                {section.description && (
                  <div className="mt-6 space-y-1 text-sm leading-6 text-neutral-300 break-words">
                    {section.description.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                )}
                <div className="mt-8 flex flex-col items-start gap-4">
                  <Link
                    href={`/gallery/${section.id}`}
                    className={galleryActionClass}
                  >
                    View Full Gallery
                    <span aria-hidden="true" className="text-base leading-none">
                      -&gt;
                    </span>
                  </Link>
                  {section.assemblyInstruction && (
                    <a
                      href={section.assemblyInstruction}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={assemblyButtonClass}
                    >
                      View Assembly Instructions
                    </a>
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <GalleryImageButton
                  item={section.heroItem}
                  priority={index === 0}
                  variant="hero"
                  onSelect={setActive}
                />

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {section.supportingItems.slice(0, 4).map((item) => (
                    <GalleryImageButton
                      key={item.src}
                      item={item}
                      variant="thumb"
                      onSelect={setActive}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null
        )}
      </div>

      {active && (
        <GalleryModal
          src={active.src}
          alt={active.alt}
          caption={active.caption ?? active.alt}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
