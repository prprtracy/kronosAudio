"use client";

import { useState } from "react";
import Image from "next/image";
import {
  getImagePosition,
  imagePositionStyle,
  responsiveObjectPositionClass,
} from "@/lib/imagePosition";
import { GalleryModal } from "./GalleryModal";

const WATERMARK_SRC = "/media/logo-retina.png";

type Item = {
  src: string;
  alt?: string;
};

function getDownloadName(src: string) {
  const filename = src.split("/").pop();

  return filename ? decodeURIComponent(filename) : "kronos-gallery-image";
}

export function GalleryDownloadGrid({ items }: { items: Item[] }) {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={`${item.src}-${index}`}
            className="overflow-hidden rounded-lg border border-white/10 bg-neutral-950"
          >
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group relative block aspect-[16/10] w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400/70"
            >
              <Image
                src={item.src}
                alt={item.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={imagePositionStyle(getImagePosition(item.src))}
                className={`object-cover transition duration-500 group-hover:scale-[1.035] group-hover:brightness-110 ${responsiveObjectPositionClass}`}
                priority={index < 3}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/45" />
              <Image
                src={WATERMARK_SRC}
                alt=""
                width={320}
                height={96}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 h-auto w-[22%] min-w-16 max-w-28 opacity-35"
              />
            </button>

            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="min-w-0 truncate text-xs text-neutral-300">
                {getDownloadName(item.src)}
              </p>
              <a
                href={item.src}
                download={getDownloadName(item.src)}
                className="shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-400 transition-colors hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
              >
                Download
              </a>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <GalleryModal
          src={active.src}
          alt={active.alt}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
