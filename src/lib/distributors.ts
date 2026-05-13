// src/lib/distributors.ts
import type { Locale } from "@/i18n";
import fs from "fs/promises";
import path from "path";
import { getContent } from "./content";

/* =========================
   Types – 100% 对齐 JSON
   ========================= */

export type RegionId =
  | "all"
  | "americas"
  | "europe"
  | "apac"
  | "middle-east"
  | "mea";

export type DistributorRegion = {
  id: RegionId;
  label: string;
};

export type DistributorPartner = {
  id: string;
  name: string;
  city: string;
  country: string;
  contactPerson?: string;
  address?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
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
  return getContent<DistributorsContent>(locale, "distributors.json");
}
