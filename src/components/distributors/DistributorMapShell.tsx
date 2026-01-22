"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { Locale } from "@/i18n";
import type { DistributorsContent, DistributorPartner, RegionId } from "@/lib/distributors";
import { WorldPartnerMap } from "./WorldPartnerMap";

type Props = {
  locale: Locale;
  data: DistributorsContent;
};

export function DistributorMapShell({ data }: Props) {
  const [region, setRegion] = useState<RegionId>("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const partners = useMemo(() => {
    return region === "all" ? data.partners : data.partners.filter((p) => p.region === region);
  }, [data.partners, region]);

  const active = useMemo(() => partners.find((p) => p.id === activeId) ?? null, [partners, activeId]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {data.regions.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              setRegion(r.id);
              setActiveId(null);
            }}
            className={clsx(
              "rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] border transition-colors",
              r.id === region
                ? "border-amber-400/60 text-amber-200 bg-amber-400/10"
                : "border-neutral-700 text-neutral-200 hover:border-neutral-500"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Map Card */}
      <div className="rounded-3xl border border-neutral-800 bg-black/40 backdrop-blur-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <WorldPartnerMap
            partners={partners}
            activeId={activeId}
            onActivate={(id) => setActiveId(id)}
          />
          <div className="mt-3 text-[12px] text-neutral-300/70">
            A curated view of selected partners. Full directory is listed below.
          </div>
        </div>
      </div>

      {/* Mobile tap card / Desktop selected */}
      {active && <ActivePartnerCard partner={active} onClose={() => setActiveId(null)} />}

      {/* Fallback list (SEO + 可用性) */}
      <div className="rounded-3xl border border-neutral-800 bg-black/30">
        <div className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">Directory</p>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partners.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                className={clsx(
                  "text-left rounded-2xl border px-4 py-4 transition-colors",
                  "border-neutral-800 bg-black/20 hover:bg-black/30 hover:border-neutral-600"
                )}
              >
                <div className="text-sm font-medium text-white">{p.name}</div>
                <div className="mt-1 text-xs text-neutral-400">
                  {p.city}, {p.country}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivePartnerCard({
  partner,
  onClose,
}: {
  partner: DistributorPartner;
  onClose: () => void;
}) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-black/40 backdrop-blur-md">
      <div className="p-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">{partner.name}</div>
          <div className="mt-1 text-xs text-neutral-400">
            {partner.city}, {partner.country}
          </div>
          {partner.url && (
            <a
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-[11px] uppercase tracking-[0.22em] text-amber-300 hover:text-amber-200"
            >
              Visit partner →
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-200 text-sm"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
