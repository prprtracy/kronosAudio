// src/components/product/ProductSpecs.tsx
"use client";

import clsx from "clsx";
import { Section } from "@/components/section/Section";

export type ProductSpecItem = {
  key: string;
  value: string;
  comparisonValue?: string;
};

export function ProductSpecs({
  title = "Technical Specifications",
  subtitle,
  comparisonLabels,
  items = [],
}: {
  title?: string;
  subtitle?: string;
  comparisonLabels?: [string, string];
  items?: ProductSpecItem[];
}) {
  if (!items || items.length === 0) return null;

  const hasComparison =
    comparisonLabels && items.some((item) => item.comparisonValue);

  return (
    <Section className="pt-8 md:pt-12 lg:pt-14">
      <div
        className={clsx(
          "rounded-3xl overflow-hidden",
          "bg-zinc-950 ring-1 ring-white/10"
        )}
      >
        <details className="group" open>
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
              {subtitle ? (
                <p className="mt-2 text-xs tracking-[0.18em] uppercase text-amber-200/70">
                  {subtitle}
                </p>
              ) : null}
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

            {hasComparison ? (
              <>
                <div className="mt-6 hidden md:block overflow-hidden rounded-2xl border border-white/10">
                  <div className="grid grid-cols-[1fr_1.1fr_1.1fr] bg-white/[0.03]">
                    <div className="px-5 py-4 text-[11px] tracking-[0.2em] uppercase text-white/55">
                      Specification
                    </div>
                    {comparisonLabels!.map((label) => (
                      <div
                        key={label}
                        className="border-l border-white/10 px-5 py-4 text-[11px] tracking-[0.2em] uppercase text-white/70"
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  {items.map((it) => (
                    <div
                      key={it.key}
                      className="grid grid-cols-[1fr_1.1fr_1.1fr] border-t border-white/10"
                    >
                      <div className="px-5 py-4 text-xs tracking-[0.18em] uppercase text-white/55">
                        {it.key}
                      </div>
                      <div className="border-l border-white/10 px-5 py-4 text-sm text-white/80">
                        {it.value}
                      </div>
                      <div className="border-l border-white/10 px-5 py-4 text-sm text-white/80">
                        {it.comparisonValue}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:hidden">
                  {comparisonLabels!.map((label, idx) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <h4 className="text-[11px] tracking-[0.2em] uppercase text-white/70">
                        {label}
                      </h4>
                      <dl className="mt-5 space-y-4">
                        {items.map((it) => (
                          <div key={`${label}-${it.key}`} className="flex items-start justify-between gap-5">
                            <dt className="text-[11px] tracking-[0.16em] uppercase text-white/50">
                              {it.key}
                            </dt>
                            <dd className="text-right text-sm text-white/80">
                              {idx === 0 ? it.value : it.comparisonValue}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </>
            ) : (
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
            )}
          </div>
        </details>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>
    </Section>
  );
}
