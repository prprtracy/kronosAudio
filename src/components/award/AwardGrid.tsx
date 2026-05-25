"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { AwardItem } from "@/config/Award";
import { AwardModal } from "./AwardModal";

type ActiveAward = {
  src: string;
  alt: string;
};

function getYearValue(year?: string) {
  if (!year) return Number.NEGATIVE_INFINITY;

  const parsed = Number.parseInt(year, 10);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

function sortByNewest(items: AwardItem[]) {
  return [...items].sort((a, b) => getYearValue(b.year) - getYearValue(a.year));
}

function awardAlt(item: AwardItem) {
  return [item.year, item.title, item.product].filter(Boolean).join(" ");
}

function FeaturedCard({
  item,
  onPreview,
}: {
  item: AwardItem;
  onPreview: (item: AwardItem) => void;
}) {
  const cardBody = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-black/70">
        <Image
          src={item.image}
          alt={awardAlt(item)}
          fill
          sizes="(min-width: 1024px) 20vw, 280px"
          className="object-contain p-5 transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex min-h-[190px] flex-col p-5">
        {item.year && (
          <p className="text-xs font-semibold tracking-[0.28em] text-[#c9a24a]">
            {item.year}
          </p>
        )}
        <h3 className="mt-4 text-sm font-semibold uppercase leading-snug tracking-[0.16em] text-white">
          {item.title}
        </h3>
        <p className="mt-4 text-sm text-neutral-300">{item.product}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
            {item.source}
          </p>
          {item.url && (
            <span className="text-lg leading-none text-[#c9a24a]">-&gt;</span>
          )}
        </div>
      </div>
    </>
  );

  const className =
    "group flex w-[280px] shrink-0 flex-col overflow-hidden border border-[rgba(201,162,74,0.45)] bg-[rgba(10,10,10,0.75)] text-left transition duration-300 hover:border-[#c9a24a] hover:bg-[rgba(18,18,18,0.9)] lg:w-auto";

  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noreferrer" className={className}>
        {cardBody}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => onPreview(item)} className={className}>
      {cardBody}
    </button>
  );
}

function ArchiveCard({
  item,
  onPreview,
}: {
  item: AwardItem;
  onPreview: (item: AwardItem) => void;
}) {
  const cardBody = (
    <>
      <div className="border-b border-white/10 bg-black/70 p-3 md:p-4">
        <Image
          src={item.image}
          alt={awardAlt(item)}
          width={900}
          height={900}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="mx-auto block h-auto w-full object-contain transition duration-500 group-hover:scale-[1.015]"
          style={{ maxHeight: item.imageMaxHeight ?? 280 }}
        />
      </div>

      <div className="p-4 md:px-[18px] md:py-5">
        <div className="flex items-start justify-between gap-4">
          {item.year && (
            <p className="text-xs font-semibold tracking-[0.24em] text-[#c9a24a]">
              {item.year}
            </p>
          )}
          {item.url && (
            <span className="text-base leading-none text-[#c9a24a]">-&gt;</span>
          )}
        </div>
        <h3 className="mt-3 text-sm font-semibold uppercase leading-snug tracking-[0.14em] text-white">
          {item.title}
        </h3>
        <p className="mt-3 text-sm text-neutral-300">{item.product}</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
          {item.source}
        </p>
      </div>
    </>
  );

  const className =
    "group mb-6 block w-full break-inside-avoid overflow-hidden border border-[rgba(201,162,74,0.38)] bg-[rgba(0,0,0,0.72)] text-left transition duration-300 hover:-translate-y-1 hover:border-[#c9a24a] hover:shadow-[0_0_34px_rgba(201,162,74,0.18)]";

  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noreferrer" className={className}>
        {cardBody}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => onPreview(item)} className={className}>
      {cardBody}
    </button>
  );
}

export function AwardGrid({
  featured = [],
  archive = [],
}: {
  featured?: AwardItem[];
  archive?: AwardItem[];
}) {
  const [active, setActive] = useState<ActiveAward | null>(null);
  const sortedFeatured = useMemo(() => sortByNewest(featured), [featured]);
  const sortedArchive = useMemo(() => sortByNewest(archive), [archive]);

  const preview = (item: AwardItem) => {
    setActive({ src: item.image, alt: awardAlt(item) });
  };

  return (
    <>
      {sortedFeatured.length > 0 && (
        <section className="border-b border-white/10 py-16 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c9a24a]">
              FEATURED RECOGNITION
            </h2>
            <a
              href="#award-archive"
              className="hidden border-b border-[#c9a24a]/70 pb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a24a] transition hover:border-white hover:text-white sm:inline-flex"
            >
              VIEW ALL AWARDS <span className="ml-3">-&gt;</span>
            </a>
          </div>

          <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:overflow-visible lg:px-0 lg:pb-0">
            {sortedFeatured.map((item, index) => (
              <FeaturedCard
                key={`${item.image}-${item.title}-${index}`}
                item={item}
                onPreview={preview}
              />
            ))}
          </div>
        </section>
      )}

      {sortedArchive.length > 0 && (
        <section id="award-archive" className="py-16 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c9a24a]">
              AWARD ARCHIVE
            </h2>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              SORT BY: <span className="text-[#c9a24a]">NEWEST</span>
            </p>
          </div>

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {sortedArchive.map((item, index) => (
              <ArchiveCard
                key={`${item.image}-${item.title}-${index}`}
                item={item}
                onPreview={preview}
              />
            ))}
          </div>
        </section>
      )}

      {active && (
        <AwardModal
          src={active.src}
          alt={active.alt}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
