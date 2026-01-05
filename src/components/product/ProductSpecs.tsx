// src/components/product/ProductSpecs.tsx
"use client";

import clsx from "clsx";
import { Section } from "@/components/section/Section";

export type ProductSpecItem = {
  key: string;
  value: string;
};

export function ProductSpecs({
  title = "Technical Specifications",
  items = [],
}: {
  title?: string;
  items?: ProductSpecItem[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <Section className="pt-8 md:pt-12 lg:pt-14">
      <div
        className={clsx(
          "rounded-3xl overflow-hidden",
          "bg-zinc-950 ring-1 ring-white/10"
        )}
      >
        <details className="group">
          <summary
            className={clsx(
              "cursor-pointer select-none list-none",
              "px-6 py-5 md:px-10 md:py-7",
              "flex items-center justify-between gap-6"
            )}
          >
            <div>
              <p className="text-[11px] tracking-[0.24em] uppercase text-white/55">
                Specifications
              </p>
              <h3 className="mt-2 text-lg md:text-xl font-semibold text-white/90">
                {title}
              </h3>
            </div>

            <div
              className={clsx(
                "flex items-center gap-2",
                "text-[11px] tracking-[0.22em] uppercase",
                "text-white/55 group-hover:text-white/75 transition-colors"
              )}
            >
              <span className="hidden sm:inline">View</span>
              <span
                className={clsx(
                  "inline-flex h-7 w-7 items-center justify-center rounded-full",
                  "border border-white/15 bg-white/5",
                  "group-open:rotate-180 transition-transform duration-200"
                )}
                aria-hidden
              >
                ▾
              </span>
            </div>
          </summary>

          <div className="px-6 pb-7 md:px-10 md:pb-10">
            <div className="h-px w-full bg-white/10" />

            <dl className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {items.map((it) => (
                <div key={it.key} className="flex items-start justify-between gap-6">
                  <dt className="text-xs tracking-[0.18em] uppercase text-white/55">
                    {it.key}
                  </dt>
                  <dd className="text-sm text-white/80 text-right">
                    {it.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </details>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>
    </Section>
  );
}
