// // app/[locale]/page.tsx
// import { getHomePage } from "@/lib/api/home";
// import type { Locale } from "@/i18n";

// export const revalidate = 3600;

// export default async function HomePage({
//   params,
// }: {
//   params: Promise<{ locale: Locale }>;
// }) {
//   const { locale } = await params; // ✅ 这里也要 await

//   const homeData = await getHomePage(locale);

//   // 先用最简单的方式读翻译：直接 import 对应 JSON
//   const messages = (await import(`@/messages/${locale}.json`)).default as any;
//   const t = messages.Home;

//   return (
//     <main className="min-h-screen bg-black text-white">
//       <section className="max-w-6xl mx-auto px-6 py-24">
//         <h1 className="text-4xl md:text-5xl font-semibold mb-4">
//           {homeData.heroTitle ?? t.heroTitle}
//         </h1>
//         <p className="text-lg text-gray-300 mb-8">
//           {homeData.heroSubtitle ?? t.heroSubtitle}
//         </p>
//         <div className="flex gap-4">
//           <a
//             href={`/${locale}/products`}
//             className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold"
//           >
//             {t.ctaProducts}
//           </a>
//           <a
//             href={`/${locale}/dealers`}
//             className="px-6 py-3 rounded-full border border-gray-500 text-sm"
//           >
//             {t.ctaDealers}
//           </a>
//         </div>
//       </section>
//     </main>
//   );
// }


// app/[locale]/page.tsx
import { getHomePage } from "@/lib/api/home";
import type { Locale } from "@/i18n";

export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const homeData = await getHomePage(locale);

  // 直接导入 messages
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
        <div className="flex gap-4">
          <a
            href={`/${locale}/products`}
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold"
          >
            {t.ctaProducts}
          </a>
          <a
            href={`/${locale}/dealers`}
            className="px-6 py-3 rounded-full border border-gray-500 text-sm"
          >
            {t.ctaDealers}
          </a>
        </div>
      </section>
    </main>
  );
}
