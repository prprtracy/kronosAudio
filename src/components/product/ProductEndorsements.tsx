import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export type Endorsement = {
  id: string;
  source: string;       // 媒体名 / 作者名
  quote: string;        // 引用句
  url: string;          // 指向 news 页（内部或外部）
  logoSrc?: string;     // 可选：媒体logo（灰度）
  subtitle?: string;    // 可选：作者/刊物/年份，如 "Hi-Fi+ · 2023"
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

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-amber-200/80">
              Critical reception
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
              {title}
            </h2>
            <p className="mt-3 text-sm text-neutral-300 max-w-2xl leading-relaxed">
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
                "hover:bg-white/[0.06] hover:border-amber-400/30 transition-colors"
              )}
            >
              <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-amber-300/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="absolute -left-2 -top-6 text-6xl leading-none text-amber-200/15 select-none">
                  “
                </div>
                <blockquote className="text-base sm:text-lg leading-relaxed text-neutral-100">
                  {it.quote}
                </blockquote>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                    <div className="h-9 w-9 rounded-full border border-white/10 bg-black/30 flex items-center justify-center text-xs text-neutral-300">
                      {it.source.slice(0, 2).toUpperCase()}
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
                  rel={it.url.startsWith("http") ? "noreferrer" : undefined}
                  className={clsx(
                    "inline-flex items-center justify-center",
                    "text-[11px] uppercase tracking-[0.28em]",
                    "text-amber-200/80 hover:text-amber-200 transition-colors",
                    "rounded-full border border-amber-200/20 hover:border-amber-200/35",
                    "px-4 py-2 bg-black/20 hover:bg-black/30"
                  )}
                >
                  Read full article <span className="ml-2">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
