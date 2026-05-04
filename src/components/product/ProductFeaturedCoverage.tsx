"use client";

import { useState } from "react";
import clsx from "clsx";

const coverageImages = [
  "/media/rewards/mag_pro_1.jpg",
  "/media/rewards/mag_pro_2.jpg",
];

type ProductFeaturedCoverageProps = {
  images?: string[];
  imageAlt?: string;
  eyebrow?: string;
  title?: string;
  copy?: string;
};

export function ProductFeaturedCoverage({
  images = coverageImages,
  imageAlt = "Kronos Pro magazine feature",
  eyebrow = "Featured in Print",
  title = "Kronos Pro - Editorial Feature",
  copy = "Featured in international print media, Kronos Pro is recognized for its uncompromising approach to analogue playback, combining counter-rotational technology with precision mechanical design.",
}: ProductFeaturedCoverageProps) {
  const [index, setIndex] = useState(0);
  const imageSrc = images[index] ?? images[0];
  const hasMultipleImages = images.length > 1;

  const showPrevious = () => {
    setIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="border-t border-white/10 pt-12">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-amber-200/80">
          Featured Coverage
        </h3>

        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full object-cover transition duration-300 group-hover:scale-[1.01]"
            />

            {hasMultipleImages && (
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  type="button"
                  aria-label="Previous featured coverage page"
                  onClick={showPrevious}
                  className={clsx(
                    "rounded-full border border-white/10 bg-black/60 px-3 py-2",
                    "text-xs text-white/75 backdrop-blur transition-colors",
                    "hover:border-amber-200/30 hover:text-amber-200"
                  )}
                >
                  Prev
                </button>
                <button
                  type="button"
                  aria-label="Next featured coverage page"
                  onClick={showNext}
                  className={clsx(
                    "rounded-full border border-white/10 bg-black/60 px-3 py-2",
                    "text-xs text-white/75 backdrop-blur transition-colors",
                    "hover:border-amber-200/30 hover:text-amber-200"
                  )}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-amber-200/70">
              {eyebrow}
            </p>

            <h4 className="mb-3 text-lg font-semibold text-neutral-50">
              {title}
            </h4>

            <p className="text-sm leading-7 text-neutral-300">
              {copy}
            </p>

            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-xs uppercase tracking-[0.22em] text-amber-200/80 underline decoration-amber-200/30 underline-offset-4 transition-colors hover:text-amber-200"
            >
              View Full Page -&gt;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
