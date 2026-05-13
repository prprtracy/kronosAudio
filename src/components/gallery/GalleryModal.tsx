"use client";

import { useEffect } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

const WATERMARK_SRC = "/media/logo-retina.png";

function getDownloadName(src: string) {
  const filename = src.split("/").pop();

  return filename ? decodeURIComponent(filename) : "kronos-gallery-image";
}

export function GalleryModal({ src, alt, onClose }: Props) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close gallery image"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-2xl leading-none text-white transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
      >
        X
      </button>

      <div className="flex h-full w-full items-center justify-center px-4 py-20 sm:px-6">
        <div
          className="relative max-h-[82vh] max-w-[92vw] cursor-default"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt ?? ""}
            width={2400}
            height={1600}
            className="block h-auto w-auto max-h-[82vh] max-w-[92vw] object-contain"
            priority
          />

          <Image
            src={WATERMARK_SRC}
            alt=""
            width={480}
            height={144}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 h-auto w-[22%] min-w-20 max-w-44 opacity-40"
          />
        </div>
      </div>

      <a
        href={src}
        download={getDownloadName(src)}
        onClick={(event) => event.stopPropagation()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white px-5 py-3 text-center text-xs font-semibold tracking-[0.08em] text-black transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white/70 sm:text-sm"
      >
        Download High-Resolution Image
      </a>
    </div>
  );
}
