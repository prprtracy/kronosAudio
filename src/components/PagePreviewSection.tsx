// src/components/PagePreviewSection.tsx
"use client";

import Image from "next/image";
import { pagePreviews } from "@/config/pagePreviews";
import clsx from "clsx";

export function PagePreviewSection() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {pagePreviews.map((page, index) => (
          <div
            key={page.id}
            className={clsx(
              "grid gap-10 items-center",
              "md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
              index % 2 === 1 && "md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:flex-row-reverse"
            )}
          >
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400 mb-3">
                {page.label}
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                {page.title}
              </h2>
              <p className="text-sm text-neutral-200 mb-6 max-w-xl">
                {page.description}
              </p>
              <a
                href={page.href}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-transparent border border-neutral-600 text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-100 hover:border-amber-300 hover:text-amber-200 transition-colors"
              >
                Learn more
              </a>
            </div>

            <div className="relative h-[260px] sm:h-[320px]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-neutral-800/80 bg-neutral-900/60 shadow-[0_0_60px_rgba(0,0,0,0.7)]">
                <Image
                  src={page.posterSrc}
                  alt={page.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/10 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
