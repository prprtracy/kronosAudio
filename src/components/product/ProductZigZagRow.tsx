// src/components/product/ProductZigZagRow.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type Product = {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  msrp?: { display: string };
  description?: readonly string[];
  gallery?: readonly string[];
};

const productMicroFacts: Record<string, string> = {
  discovery: "NEW SUSPENSION COUPLING · ISOLATED DRIVE",
  sparta: "DUAL DECK ARCHITECTURE · COUNTER-ROTATION",
  "kronos-pro": "ORIGINAL REFERENCE · COUNTER-ROTATIONAL LEGACY",
  perpetual: "SINGLE-TONEARM PLATFORM · UPGRADEABLE ARCHITECTURE",
  tonearms: "PRECISION TONEARM SYSTEM · RS TECHNOLOGY",
  phono: "REFERENCE PHONO STAGE · SIGNAL INTEGRITY",
  racks: "ENGINEERED FOUNDATIONS · SYSTEM INTEGRATION",
};

export function ProductZigZagRow({
  product,
  index,
  href,
}: {
  product: Product;
  index: number;
  href: string;
}) {
  const reverse = index % 2 === 1;
  const img = product.gallery?.[0] ?? "/media/products/fallback.jpg";

  return (
    <Link
      href={href}
      className={clsx(
        "group block rounded-2xl overflow-hidden",
        "border border-neutral-800 bg-white/5",
        "hover:border-amber-400/40 transition-colors",
        "shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2",
          reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
        )}
      >
        {/* Media */}
        <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[360px]">
          <Image
            src={img}
            alt={`${product.name} turntable`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-95 group-hover:opacity-100 transition-opacity"
            priority={product.slug === "discovery"}
          />

          {/* Overlay (压图不压字) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />
          <div className="absolute inset-0 ring-1 ring-white/5" />

          {/* Top label + MSRP（永远可读） */}
          <div className="absolute inset-x-0 top-0 z-10 p-5 flex items-start justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-200/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
              {product.tagline ?? "REFERENCE TURNTABLE"}
            </p>

            {product.msrp?.display && (
              <span
                className={clsx(
                  "shrink-0",
                  "px-3 py-1 rounded-full",
                  "border border-white/12 bg-black/35 backdrop-blur",
                  "text-[11px] uppercase tracking-[0.22em]",
                  "text-white/90",
                  "group-hover:text-white group-hover:border-amber-400/30",
                  "transition-colors duration-200"
                )}
              >
                MSRP&nbsp;{product.msrp.display}
              </span>
            )}
          </div>
        </div>

        {/* Copy */}
        <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-black/10 via-black/25 to-black/45">
          <p className="text-[11px] uppercase tracking-[0.28em] text-amber-400">
            {reverse ? "PRODUCT" : "PRODUCT"}
          </p>

          <div className="mt-3 flex items-baseline justify-between gap-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {product.name}
            </h2>

            <span className="text-[11px] uppercase tracking-[0.22em] text-amber-300">
              View details →
            </span>
          </div>

          {product.description?.[0] && (
            <p className="mt-5 text-sm sm:text-base text-neutral-200 leading-relaxed line-clamp-4">
              {product.description[0]}
            </p>
          )}

          <div className="mt-8 h-px bg-white/10" />

          {/* micro facts（保持你之前的“画册式一句话”） */}
          <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-neutral-400">
            {productMicroFacts[product.slug] ?? "REFERENCE PLATFORM · KRONOS AUDIO"}
          </p>

          {/* subtle CTA line（逼格，不像按钮） */}
          <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-neutral-300 group-hover:text-white transition-colors">
            Explore the system
            <span className="text-amber-300">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
