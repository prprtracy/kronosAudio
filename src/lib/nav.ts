import type { Locale } from "@/i18n";
import { getContent } from "@/lib/content";
import type { NavItem } from "@/config/nav";

type SiteJson = { nav?: { items: NavItem[] } };

export async function getNav(locale: Locale): Promise<NavItem[]> {
  const site = await getContent<SiteJson>(locale, "site.json");
  return site.nav?.items ?? [];
}
