"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  images: { src: string; alt?: string }[];
};

export function ProductOverviewGallery({ images }: Props) {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 md:aspect-[16/10] xl:aspect-[16/9]">
        <Image
          src={images[index].src}
          alt={images[index].alt ?? ""}
          fill
          className="object-contain"
          style={{ objectPosition: "center center" }}
          priority={index === 0}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2
                         items-center justify-center rounded-full border border-white/10
                         bg-black/30 text-xl leading-none text-[#d4af37]/80
                         opacity-100 backdrop-blur-md transition-all duration-300
                         hover:border-[#d4af37]/45 hover:bg-black/50 hover:text-[#d4af37]
                         sm:left-5 sm:h-10 sm:w-10 md:opacity-0 md:group-hover:opacity-100"
            >
              {"\u2039"}
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2
                         items-center justify-center rounded-full border border-white/10
                         bg-black/30 text-xl leading-none text-[#d4af37]/80
                         opacity-100 backdrop-blur-md transition-all duration-300
                         hover:border-[#d4af37]/45 hover:bg-black/50 hover:text-[#d4af37]
                         sm:right-5 sm:h-10 sm:w-10 md:opacity-0 md:group-hover:opacity-100"
            >
              {"\u203a"}
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              className={clsx(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden border",
                i === index
                  ? "border-white"
                  : "border-neutral-700 hover:border-neutral-400"
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
