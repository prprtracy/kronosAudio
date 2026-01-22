import { getContent } from "@/lib/content";
import type { Locale } from "@/i18n";

export type RegionId = "all" | "americas" | "europe" | "apac" | "mea";

export type DistributorPartner = {
  id: string;
  name: string;
  city: string;
  country: string;
  region: Exclude<RegionId, "all">;
  lat: number;
  lng: number;
  url?: string;
  tier?: "featured" | "standard";
};

export type DistributorsContent = {
  meta: {
    title: string;
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  regions: { id: RegionId; label: string }[];
  partners: DistributorPartner[];
};

export async function getDistributors(locale: Locale) {
  return getContent<DistributorsContent>(locale, "distributors.json");
}
