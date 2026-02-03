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
      {/* 主图 */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
        <Image
          src={images[index].src}
          alt={images[index].alt ?? ""}
          fill
          className="object-contain"
          priority={index === 0}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 
                         bg-black/60 px-3 py-2 text-sm text-white
                         hover:bg-black"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 
                         bg-black/60 px-3 py-2 text-sm text-white
                         hover:bg-black"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* 缩略图 */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.src}
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
