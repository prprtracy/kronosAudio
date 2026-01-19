"use client";

import { useEffect, useMemo, useState } from "react";
import { geoPath, geoEqualEarth, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import type { Partner } from "@/data/partners";
import type { RegionId } from "@/data/partners";

type WorldTopo = any;

type MapPoint = Partner & {
  x: number;
  y: number;
  jx: number;
  jy: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function applyJitter(points: MapPoint[], cell = 14, max = 10) {
  const buckets = new Map<string, MapPoint[]>();

  for (const p of points) {
    const cx = Math.round(p.x / cell);
    const cy = Math.round(p.y / cell);
    const key = `${cx},${cy}`;
    const arr = buckets.get(key) ?? [];
    arr.push(p);
    buckets.set(key, arr);
  }

  for (const arr of buckets.values()) {
    if (arr.length <= 1) {
      arr[0].jx = arr[0].x;
      arr[0].jy = arr[0].y;
      continue;
    }
    const r = Math.min(max, 3 + arr.length * 1.6);
    for (let i = 0; i < arr.length; i++) {
      const a = (i / arr.length) * Math.PI * 2;
      arr[i].jx = arr[i].x + Math.cos(a) * r;
      arr[i].jy = arr[i].y + Math.sin(a) * r;
    }
  }

  return points;
}

export function DistributorMap({
  partners,
  regions,
  className,
}: {
  partners: Partner[];
  regions: { id: RegionId; label: string }[];
  className?: string;
}) {
  const [world, setWorld] = useState<WorldTopo | null>(null);

  // ✅ 叙事式 Region 切换（默认 ALL）
  const [region, setRegion] = useState<RegionId | "all">("all");

  const [activeId, setActiveId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    partner: Partner;
  } | null>(null);

  const width = 1100;
  const height = 520;

  const projection = useMemo(() => {
    return geoEqualEarth()
      .translate([width / 2, height / 2])
      .scale(180);
  }, []);

  const path = useMemo(() => geoPath(projection), [projection]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/geo/world-50m.json", { cache: "force-cache" });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setWorld(json);
      } catch {
        // 允许无底图先跑
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const land = useMemo(() => {
    if (!world) return null;
    const obj =
      world.objects?.land ??
      world.objects?.countries ??
      world.objects?.ne_110m_admin_0_countries;
    if (!obj) return null;
    return feature(world, obj) as any;
  }, [world]);

  const graticule = useMemo(() => geoGraticule10(), []);

  // ✅ Region 过滤：只影响地图点位（“叙事切换”）
  const filteredPartners = useMemo(() => {
    return region === "all" ? partners : partners.filter((p) => p.region === region);
  }, [partners, region]);

  const points = useMemo(() => {
    const projected: MapPoint[] = filteredPartners
      .map((p) => {
        const pt = projection([p.lng, p.lat]);
        if (!pt) return null;
        const [x, y] = pt;
        return { ...p, x, y, jx: x, jy: y };
      })
      .filter(Boolean) as MapPoint[];

    return applyJitter(projected, 14, 10);
  }, [filteredPartners, projection]);

  function openTooltip(p: MapPoint, clientX?: number, clientY?: number) {
    const x = clientX ?? p.jx;
    const y = clientY ?? p.jy;
    setActiveId(p.id);
    setTooltip({ x, y, partner: p });
  }

  function closeTooltip() {
    setActiveId(null);
    setTooltip(null);
  }

  return (
    <div className={className}>
      {/* ✅ 极简 Region Switch：不做下拉，不像工具 */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setRegion("all")}
          className={`rounded-full border px-4 py-2 text-xs tracking-widest ${
            region === "all" ? "border-white/25 bg-white/5" : "border-white/10 hover:border-white/20"
          }`}
        >
          All
        </button>

        {regions.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRegion(r.id)}
            className={`rounded-full border px-4 py-2 text-xs tracking-widest ${
              region === r.id ? "border-white/25 bg-white/5" : "border-white/10 hover:border-white/20"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" onMouseLeave={closeTooltip}>
          {/* 海报式：低对比网格 */}
          <path d={path(graticule) ?? ""} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={0.7} />

          {/* 低对比陆块 */}
          {land ? (
            <path
              d={path(land) ?? ""}
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={0.8}
            />
          ) : null}

          {/* 点位 */}
          {points.map((p) => {
            const isActive = p.id === activeId;
            const tier = p.tier ?? "standard";

            // ✅ 视觉定稿：稀缺但克制
            const r = tier === "featured" ? 3.2 : 2.2;
            const dotFill = tier === "featured" ? "rgba(212,175,55,0.95)" : "rgba(255,255,255,0.65)";
            const dotOpacity = tier === "featured" ? 0.95 : 0.70;

            return (
              <g key={p.id}>
                {/* hit area（大，但透明） */}
                <circle
                  cx={p.jx}
                  cy={p.jy}
                  r={12}
                  fill="transparent"
                  onMouseMove={(e) => openTooltip(p, e.clientX, e.clientY)}
                  onMouseEnter={(e) => openTooltip(p, e.clientX, e.clientY)}
                  onClick={() => openTooltip(p)}
                />

                {/* featured 微光晕（非常克制） */}
                {tier === "featured" ? (
                  <circle
                    cx={p.jx}
                    cy={p.jy}
                    r={isActive ? r + 6 : r + 5}
                    fill="rgba(212,175,55,0.10)"
                    opacity={isActive ? 0.9 : 0.65}
                  />
                ) : null}

                {/* 主点 */}
                <circle
                  cx={p.jx}
                  cy={p.jy}
                  r={isActive ? r + 1 : r}
                  fill={dotFill}
                  opacity={dotOpacity}
                />
              </g>
            );
          })}
        </svg>

        {/* Tooltip：只放必要信息 */}
        {tooltip ? (
          <div
            className="pointer-events-none absolute left-0 top-0"
            style={{
              transform: `translate(${clamp(tooltip.x, 24, window.innerWidth - 260)}px, ${clamp(
                tooltip.y,
                24,
                window.innerHeight - 140
              )}px)`,
            }}
          >
            <div className="pointer-events-auto w-[240px] rounded-xl border border-white/15 bg-black/80 p-4 backdrop-blur">
              <div className="text-xs tracking-widest opacity-70">
                {tooltip.partner.city}, {tooltip.partner.country}
              </div>
              <div className="mt-2 text-sm font-medium">{tooltip.partner.name}</div>

              {tooltip.partner.url ? (
                <a className="mt-3 inline-flex text-xs opacity-80 hover:opacity-100" href={tooltip.partner.url} target="_blank" rel="noreferrer">
                  View partner →
                </a>
              ) : (
                <div className="mt-3 text-xs opacity-60">View partner →</div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-xs opacity-60">
        A curated view of selected partners. Full directory is listed below.
      </p>
    </div>
  );
}
