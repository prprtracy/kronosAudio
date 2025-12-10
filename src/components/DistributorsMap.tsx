// src/components/DistributorsMap.tsx
"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { distributorRegions } from "@/lib/distributors";

const geoUrl = "/world-110m.json"; // 放在 public 下

export function DistributorsMap() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-4">Global Distribution Network</h2>
        <p className="text-sm text-gray-300 mb-8">
          Kronos Audio is represented in more than 30 countries worldwide. Find your local distributor.
        </p>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* 左边：世界地图 */}
          <div className="bg-neutral-900 rounded-xl p-4">
            <ComposableMap projectionConfig={{ scale: 150 }}>
              {/* <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className="outline-none"
                      style={{
                        default: { fill: "#222", stroke: "#555", strokeWidth: 0.5 },
                        hover: { fill: "#fbbf24" },
                        pressed: { fill: "#f59e0b" },
                      }}
                    />
                  ))
                }
              </Geographies> */}
                <Geographies geography={geoUrl}>
                    {({ geographies }: { geographies: any }) =>
                        geographies.map((geo: any) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                            default: { fill: "#444", stroke: "#fff", strokeWidth: 0.5 },
                            hover: { fill: "#fbbf24" },
                            pressed: { fill: "#f59e0b" },
                            }}
                        />
                        ))
                    }
                </Geographies>
            </ComposableMap>
          </div>

          {/* 右边：区域和国家列表 */}
          <div className="space-y-4">
            {distributorRegions.map((region) => (
              <div
                key={region.id}
                className="border border-neutral-700 rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold mb-2">{region.label}</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {region.countries.map((c) => (
                    <li key={c.code}>
                      <span className="font-medium">{c.name}</span> — {c.city} (
                      {c.dealers} dealer{c.dealers > 1 ? "s" : ""})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href="/dealers"
              className="inline-block text-sm mt-2 underline underline-offset-4 text-gray-300 hover:text-white"
            >
              View full distributor list →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
