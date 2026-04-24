// src/config/systems.ts
export type SystemSlug = "discovery" | "perpetual" | "kronos-pro" | "sparta";

export type SystemFamily = {
  slug: SystemSlug;
  systemName: string; // Discovery System
  headline: string; // Discovery
  positioning: string; // 菜单/列表一句话
  copy: string[]; // 详情页 intro（2-3句）
  heroImage: string;

  modules: {
    turntable: { name: string; note?: string };
    powerSupply: { name: string; note?: string };
  };
};

export const SYSTEMS: SystemFamily[] = [
  {
    slug: "discovery",
    systemName: "Discovery System",
    headline: "Discovery",
    positioning: "Two tonearm platform. Exo-skeleton chassis. Isolation first.",
    copy: [
      "A flagship two tonearm platform.",
      "A radically new exo-skeleton chassis designed to minimize resonances and optimize isolation.",
    ],
    heroImage: "/media/home/discovery.jpg",
    modules: {
      turntable: { name: "Discovery" },
      powerSupply: { name: "SCPS-D", note: "External regulation and isolation for absolute stability and silence." },
    },
  },
  {
    slug: "perpetual",
    systemName: "Perpetual System",
    headline: "Perpetual",
    positioning: "One tonearm system with advanced resonance control.",
    copy: [
      "A one tonearm turntable focused on advanced resonance control.",
      "Composed, precise, and engineered for long-term evolution.",
    ],
    heroImage: "/media/home/perpetual.jpg",
    modules: {
      turntable: { name: "Perpetual" },
      powerSupply: { name: "SCPS-P", note: "Dedicated external system to isolate and regulate power." },
    },
  },
  {
    slug: "kronos-pro",
    systemName: "Kronos Pro System",
    headline: "Kronos Pro",
    positioning: "The original reference. Counter-rotation and overhead suspension.",
    copy: [
      "The original KRONOS reference system.",
      "Defined by counter-rotation and overhead suspension—designed to eliminate vibration and reveal absolute clarity.",
    ],
    heroImage: "/media/home/kronos-pro.jpg",
    modules: {
      turntable: { name: "Kronos Pro" },
      powerSupply: { name: "SCPS-1", note: "Power integrity, stability, and silence—treated as part of the system." },
    },
  },
  {
    slug: "sparta",
    systemName: "Sparta System",
    headline: "Sparta",
    positioning: "A no-frills entry to the world of Kronos.",
    copy: ["A no-frills platform.", "An entry to the world of KRONOS."],
    heroImage: "/media/home/sparta.jpg",
    modules: {
      turntable: { name: "Sparta" },
      powerSupply: { name: "SCPS-S", note: "Dedicated external stability for the analogue chain." },
    },
  },
];

export function getSystemBySlug(slug: string) {
  return SYSTEMS.find((s) => s.slug === slug);
}
