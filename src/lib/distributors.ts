// src/lib/distributors.ts
import type { Locale } from "@/i18n";
import fs from "fs/promises";
import path from "path";

/* =========================
   Types – 100% 对齐 JSON
   ========================= */

export type RegionId = "all" | "americas" | "europe" | "apac" | "mea";

export type DistributorRegion = {
  id: RegionId;
  label: string;
};

export type DistributorPartner = {
  id: string;
  name: string;
  city: string;
  country: string;
  region: RegionId;
  lat: number;
  lng: number;
  tier?: "featured" | "standard";
  url?: string;
};

export type DistributorsMeta = {
  title: string;
  eyebrow: string;
  headline: string;
  subhead: string;
};

export type DistributorsContent = {
  meta: DistributorsMeta;
  regions: DistributorRegion[];
  partners: DistributorPartner[];
};

/* =========================
   Server-only loader
   ========================= */

export async function getDistributors(
  locale: Locale
): Promise<DistributorsContent> {
  const filePath = path.join(
    process.cwd(),
    "content",
    locale,
    "distributors.json"
  );

  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as DistributorsContent;
}
