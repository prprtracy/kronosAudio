import type { Locale } from "@/i18n";
import { normalizeLocale } from "@/lib/content";
import { getContact } from "@/lib/contact";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocale(locale);

  const content = await getContact(safeLocale);

  return (
    <main className="pt-28 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-2xl">
          {content.eyebrow && (
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-4">
              {content.eyebrow}
            </p>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            {content.headline}
          </h1>

          {content.intro && (
            <div className="mt-6 space-y-2">
              {content.intro.map((line) => (
                <p
                  key={line}
                  className="text-sm sm:text-base text-neutral-300 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Sections */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-12">
          {content.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-medium tracking-wide mb-6">
                {section.title}
              </h2>

              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <div className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-neutral-200">
                      {item.value}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Closing */}
        {content.closing && (
          <div className="mt-24 text-sm text-neutral-400">
            {content.closing}
          </div>
        )}
      </div>
    </main>
  );
}
