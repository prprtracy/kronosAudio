"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryModal } from "./GalleryModal";

type Item = {
  src: string;
  alt?: string;
};

type Section = {
  id: string;
  label: string;
  items: Item[];
};

export function GalleryGrid({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <>
      {sections.map((section) =>
        section.items.length > 0 ? (
          <div key={section.id} className="mt-20">
            {/* section label */}
            <h2 className="mb-8 text-xs tracking-[0.3em] uppercase text-neutral-400">
              {section.label}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((item, i) => (
                <button
                  key={`${item.src}-${i}`}
                  onClick={() => setActive(item)}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 focus:outline-none"
                >
                  <Image
                    src={item.src}
                    alt={item.alt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-opacity duration-300 hover:opacity-95"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/40" />
                </button>
              ))}
            </div>
          </div>
        ) : null
      )}

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
