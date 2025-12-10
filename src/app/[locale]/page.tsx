// app/[locale]/page.tsx
import { DistributorsMap } from "@/components/DistributorsMap";
import type { Locale } from "@/i18n";
import { getHomePage } from "@/lib/api/home";

export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const homeData = await getHomePage(locale);
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const t = messages.Home;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          {homeData.heroTitle ?? t.heroTitle}
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          {homeData.heroSubtitle ?? t.heroSubtitle}
        </p>
      </section>

      {/* 👇 一定要有这个 */}
      <DistributorsMap />
    </main>
  );
}
