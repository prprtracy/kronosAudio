"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { geoPath, geoEqualEarth, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import land110m from "world-atlas/land-110m.json";

type Partner = {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  url?: string;
  tier?: "featured" | "standard";
};

type Props = {
  partners: Partner[];
  activeId: string | null;
  onActivate: (id: string) => void;
};

export function WorldPartnerMap({ partners, activeId, onActivate }: Props) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const width = 1100;
  const height = 520;

  const projection = useMemo(() => {
    return geoEqualEarth().fitSize([width, height], { type: "Sphere" } as any);
  }, []);

  const path = useMemo(() => geoPath(projection), [projection]);

  const land = useMemo(() => {
    const f = feature(land110m as any, (land110m as any).objects.land);
    return f as any;
  }, []);

  const graticule = useMemo(() => geoGraticule10(), []);

  // 轻量 jitter：避免同城市/近点重叠（克制但有效）
  const points = useMemo(() => {
    const jitter = (i: number) => (i % 2 === 0 ? 1 : -1) * (2 + (i % 5));
    return partners
      .map((p, idx) => {
        const xy = projection([p.lng, p.lat]);
        if (!xy) return null;
        const [x, y] = xy;
        return {
          ...p,
          x: x + jitter(idx) * 0.35,
          y: y + jitter(idx + 7) * 0.35,
        };
      })
      .filter(Boolean) as (Partner & { x: number; y: number })[];
  }, [partners, projection]);

  const active = points.find((p) => p.id === activeId) ?? null;
  const hover = points.find((p) => p.id === hoverId) ?? null;
  const tooltip = hover ?? active;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Background */}
        <rect x="0" y="0" width={width} height={height} fill="transparent" />

        {/* Sphere subtle */}
        <path d={path({ type: "Sphere" } as any) ?? ""} fill="rgba(255,255,255,0.02)" />

        {/* Graticule */}
        <path d={path(graticule as any) ?? ""} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Land */}
        <path d={path(land) ?? ""} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        {/* Points */}
        {points.map((p) => {
          const isActive = p.id === activeId;
          const isHover = p.id === hoverId;
          const isFeatured = p.tier === "featured";

          const r = isFeatured ? 4.2 : 3.2;

          return (
            <g key={p.id}>
              {/* outer glow ring */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive || isHover ? r + 7 : r + 5}
                fill="rgba(245,158,11,0.08)"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive || isHover ? r + 3 : r + 2}
                fill="rgba(245,158,11,0.12)"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={r}
                fill={isActive || isHover ? "rgba(245,158,11,0.95)" : "rgba(245,158,11,0.72)"}
                className="cursor-pointer"
                onMouseEnter={() => setHoverId(p.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => onActivate(p.id)}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className={clsx(
            "absolute pointer-events-none",
            "rounded-2xl border border-neutral-700 bg-black/70 backdrop-blur-md",
            "px-4 py-3"
          )}
          style={{
            left: `${(tooltip.x / width) * 100}%`,
            top: `${(tooltip.y / height) * 100}%`,
            transform: "translate(14px, -50%)",
          }}
        >
          <div className="text-[12px] uppercase tracking-[0.22em] text-neutral-300/70">Partner</div>
          <div className="mt-1 text-sm font-semibold text-white">{tooltip.name}</div>
          <div className="mt-1 text-xs text-neutral-300/80">
            {tooltip.city}, {tooltip.country}
          </div>
        </div>
      )}
    </div>
  );
}
