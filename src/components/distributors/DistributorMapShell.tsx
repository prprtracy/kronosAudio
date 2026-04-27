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
  const hasPartners = partners.length > 0;

  return (
    <div className="space-y-6">
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

      <section className="mt-12">
        <div className="rounded-3xl overflow-hidden bg-white ring-1 ring-black/10">
          <div className="p-4 sm:p-6">
            <WorldPartnerMap
              partners={partners}
              activeId={activeId}
              onActivate={setActiveId}
            />
          </div>
        </div>
      </section>

      {active && <ActivePartnerCard partner={active} onClose={() => setActiveId(null)} />}

      <div className="rounded-3xl border border-neutral-800 bg-black/30">
        <div className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">Directory</p>

          {hasPartners ? (
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
                  <PartnerDetails partner={p} compact />
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-neutral-800 bg-black/20 px-4 py-8 text-sm text-neutral-400">
              No distributors are currently listed for this region.
            </div>
          )}
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
        <PartnerDetails partner={partner} />

        <button
          type="button"
          onClick={onClose}
          className="text-sm text-neutral-400 hover:text-neutral-200"
          aria-label="Close"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function PartnerDetails({
  partner,
  compact = false,
}: {
  partner: DistributorPartner;
  compact?: boolean;
}) {
  const websiteHref = partner.website
    ? partner.website.startsWith("http")
      ? partner.website
      : `https://${partner.website}`
    : "";

  return (
    <div>
      <div className="text-sm font-medium text-white">{partner.name}</div>
      <div className="mt-1 text-xs text-neutral-400">
        {[partner.city, partner.country].filter(Boolean).join(", ")}
      </div>

      <div className={clsx("mt-3 space-y-1 text-xs leading-relaxed text-neutral-400", compact && "text-[11px]")}>
        {partner.contactPerson && <p>Contact: {partner.contactPerson}</p>}
        {partner.address && <p>{partner.address}</p>}
        {partner.phone && <p>{partner.phone}</p>}
        {partner.email && (
          <p>
            <a href={`mailto:${partner.email}`} className="hover:text-amber-300">
              {partner.email}
            </a>
          </p>
        )}
        {partner.website && (
          <p>
            <a
              href={websiteHref}
              target="_blank"
              rel="noreferrer"
              className="text-amber-300 hover:text-amber-200"
            >
              {partner.website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
