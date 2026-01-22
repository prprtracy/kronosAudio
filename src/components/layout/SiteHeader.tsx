import type { Locale } from "@/i18n";
import { getNav } from "@/lib/nav";
import { HeaderHeroShell } from "./HeaderHeroShell";


export async function SiteHeader({ locale }: { locale: Locale }) {
  const navItems = await getNav(locale);
  return <HeaderHeroShell locale={locale} navItems={navItems} />;
}
