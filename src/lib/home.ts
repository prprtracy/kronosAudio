import "server-only";
import type { Locale } from "@/i18n";
import type { HomeNarrativeSection, HomeWhatsNew } from "@/types/home";
import { getContent } from "@/lib/content";

export type HomeContent = {
  narrative: HomeNarrativeSection[];
  whatsNew: HomeWhatsNew;
};

export async function getHome(locale: Locale): Promise<HomeContent> {
  return getContent<HomeContent>(locale, "home.json");
}

export async function getHomeNarrative(locale: Locale): Promise<HomeNarrativeSection[]> {
  const data = await getHome(locale);
  return data.narrative ?? [];
}
