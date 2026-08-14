import Image from "next/image";
import Link from "next/link";
import type { HomeWhatsNew } from "@/types/home";
import type { WhatsNewItem } from "@/types/whats-new";

type HomeWhatsNewProps = {
  config: HomeWhatsNew;
  story: WhatsNewItem;
};

export function HomeWhatsNew({ config, story }: HomeWhatsNewProps) {
  const storyHref = `/whats-new/${story.slug}`;

  return (
    <section className="bg-black px-4 text-neutral-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl border-y border-white/12 py-8 sm:py-9 lg:py-10">
        <div className="grid items-center gap-7 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:gap-x-8 lg:grid-cols-[130px_260px_minmax(0,1fr)_auto] lg:gap-10">
          <p className="self-start text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400/90 sm:col-span-2 lg:col-span-1 lg:pt-1">
            {config.eyebrow}
          </p>

          <Link
            href={storyHref}
            aria-label={story.title}
            className="group relative block aspect-[16/9] w-full overflow-hidden bg-neutral-900 sm:aspect-[3/2]"
          >
            <Image
              src={story.image}
              alt={story.imageAlt}
              fill
              sizes="(max-width: 639px) calc(100vw - 32px), 240px"
              className="object-cover transition-opacity duration-300 group-hover:opacity-85"
            />
          </Link>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400 sm:text-[11px]">
              {story.date} <span aria-hidden="true">&middot;</span> {story.category}
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
              <Link href={storyHref} className="transition-colors hover:text-amber-200">
                {story.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
              {story.summary}
            </p>
          </div>

          <Link
            href={storyHref}
            className="group inline-flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400/90 transition-opacity hover:opacity-80 sm:col-start-2 lg:col-start-4"
          >
            {config.ctaLabel}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
