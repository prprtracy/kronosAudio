import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export type Endorsement = {
  id: string;
  initials?: string;
  title?: string;
  source: string;
  quote: string;
  url: string;
  logoSrc?: string;
  subtitle?: string;
};

export function ProductEndorsements({
  title = "Press & Endorsements",
  kicker = "Selected citations and editorial mentions.",
  items,
}: {
  title?: string;
  kicker?: string;
  items: Endorsement[];
}) {
  if (!items?.length) return null;

  return (
    <section className="relative py-14 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-amber-200/80">
              Critical reception
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
              {kicker}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {items.map((it) => (
            <article
              key={it.id}
              className={clsx(
                "group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm",
                "px-6 py-6 sm:px-8 sm:py-7",
                "transition-colors hover:border-amber-400/30 hover:bg-white/[0.06]"
              )}
            >
              <div className="absolute bottom-6 left-0 top-6 w-px bg-gradient-to-b from-transparent via-amber-300/35 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <div className="absolute -left-2 -top-6 select-none text-6xl leading-none text-amber-200/15">
                  "
                </div>

                {it.title ? (
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-amber-200/75">
                    {it.title}
                  </p>
                ) : null}

                <blockquote className="text-base leading-relaxed text-neutral-100 sm:text-lg">
                  {it.quote}
                </blockquote>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {it.logoSrc ? (
                    <div className="relative h-8 w-24 opacity-80 grayscale">
                      <Image
                        src={it.logoSrc}
                        alt={`${it.source} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-xs text-neutral-300">
                      {(it.initials ?? it.source.slice(0, 2)).toUpperCase()}
                    </div>
                  )}

                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-neutral-100">
                      {it.source}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {it.subtitle ?? "Press citation"}
                    </div>
                  </div>
                </div>

                <Link
                  href={it.url}
                  target={it.url.startsWith("http") ? "_blank" : undefined}
                  rel={it.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={clsx(
                    "inline-flex items-center justify-center rounded-full border border-amber-200/20 bg-black/20 px-4 py-2",
                    "text-[11px] uppercase tracking-[0.28em] text-amber-200/80 transition-colors",
                    "hover:border-amber-200/35 hover:bg-black/30 hover:text-amber-200"
                  )}
                >
                  Read Full Article <span className="ml-2">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
