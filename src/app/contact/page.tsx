import type { Locale } from "@/i18n";
import { normalizeLocale } from "@/lib/content";
import { getContact } from "@/lib/contact";
import Link from "next/link";

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
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {content.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-neutral-800 bg-black/20 p-6 sm:p-7"
            >
              <h2 className="text-lg font-medium tracking-wide mb-6">
                {section.title}
              </h2>

              {section.body && (
                <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
                  {(Array.isArray(section.body) ? section.body : [section.body]).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              )}

              {section.items.length > 0 && (
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <div className="mb-3 text-xs uppercase tracking-[0.28em] text-neutral-400">
                        {item.label}
                      </div>
                      <ContactItemValue value={item.value} />
                    </li>
                  ))}
                </ul>
              )}

              {section.cta && (
                <Link
                  href={section.cta.href}
                  className="mt-5 inline-flex rounded-full border border-amber-400/60 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-400/10 hover:text-amber-200"
                >
                  {section.cta.label}
                </Link>
              )}
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

function ContactItemValue({ value }: { value: string }) {
  return (
    <div className="text-sm leading-7 text-neutral-200">
      {value.split("\n").map((line, index) => {
        const email = line.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0];

        if (!line) {
          return <br key={`blank-${index}`} />;
        }

        if (email) {
          return (
            <a
              key={`${email}-${index}`}
              href={`mailto:${email}`}
              className="block hover:underline"
            >
              {line}
            </a>
          );
        }

        return <p key={`${line}-${index}`}>{line}</p>;
      })}
    </div>
  );
}
