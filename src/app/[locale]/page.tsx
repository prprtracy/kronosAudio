import type { Locale } from "@/i18n";
import { getHomeNarrative } from "@/lib/home";
import { HomeNarrative } from "@/components/home/HomeNarrative";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const sections = await getHomeNarrative(locale);

  return <HomeNarrative sections={sections} locale={locale} />;
}
