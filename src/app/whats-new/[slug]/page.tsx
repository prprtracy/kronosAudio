import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWhatsNew, getWhatsNewItemBySlug } from "@/lib/whats-new";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const content = await getWhatsNew("en");
  return content.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWhatsNewItemBySlug("en", slug);

  return item
    ? { title: `${item.title} | Kronos Audio`, description: item.summary }
    : { title: "What's New | Kronos Audio" };
}

export default async function WhatsNewDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getWhatsNewItemBySlug("en", slug);

  if (!item) notFound();

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-neutral-100">
      <article className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:px-8">
        <Link
          href="/whats-new"
          className="text-[11px] uppercase tracking-[0.24em] text-neutral-400 transition-colors hover:text-amber-200"
        >
          &larr; Back to What&apos;s New
        </Link>

        <header className="mt-12 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400/90">
            {item.category}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-300 sm:flex-row sm:items-center sm:gap-3">
            <span>{item.date}</span>
            {item.location ? (
              <>
                <span aria-hidden="true" className="hidden text-neutral-600 sm:inline">
                  &middot;
                </span>
                <span>{item.location}</span>
              </>
            ) : null}
          </div>
        </header>

        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-neutral-950">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            priority
            sizes="(max-width: 1200px) calc(100vw - 32px), 1152px"
            className="object-contain"
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] lg:gap-20">
          <div className="space-y-6 text-base leading-8 text-neutral-300 sm:text-lg sm:leading-9">
            {(item.body ?? [item.summary]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {item.venue ? (
            <aside className="border-y border-white/12 py-7 lg:self-start">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400/90">
                Event information
              </p>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm text-neutral-300">{item.date}</p>
              <div className="mt-6 space-y-1 text-sm leading-6 text-neutral-300">
                <p className="font-medium text-neutral-100">{item.venue.name}</p>
                <p>{item.venue.address}</p>
                <p>{item.venue.floor}</p>
                <p>Room: {item.venue.room}</p>
                {item.location ? <p>{item.location}</p> : null}
              </div>
            </aside>
          ) : null}
        </div>

        {item.gallery?.length ? (
          <section className="mt-20 border-t border-white/12 pt-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {item.gallery.map((galleryImage) => (
                <div
                  key={galleryImage.image}
                  className="relative aspect-square min-w-0 overflow-hidden bg-neutral-950"
                >
                  <Image
                    src={galleryImage.image}
                    alt={galleryImage.alt}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 32px), 560px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
