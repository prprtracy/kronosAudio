import Image from "next/image";
import Link from "next/link";
import { getWhatsNew } from "@/lib/whats-new";

export default async function WhatsNewPage() {
  const content = await getWhatsNew("en");

  return (
    <main className="min-h-[70vh] bg-black pt-28 text-neutral-100 sm:pt-32">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/90">
          {content.page.eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {content.page.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300">
          {content.page.description}
        </p>

        <div className="mt-16 border-t border-white/12">
          {content.items.map((item) => (
            <article
              key={item.id}
              className="grid gap-7 border-b border-white/12 py-8 sm:grid-cols-[240px_minmax(0,1fr)] sm:items-center sm:gap-10"
            >
              <Link
                href={`/whats-new/${item.slug}`}
                aria-label={item.title}
                className="relative block aspect-[3/2] overflow-hidden bg-neutral-900"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 32px), 240px"
                  className="object-cover"
                />
              </Link>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                  {item.date} <span aria-hidden="true">&middot;</span> {item.category}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Link
                    href={`/whats-new/${item.slug}`}
                    className="transition-colors hover:text-amber-200"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
