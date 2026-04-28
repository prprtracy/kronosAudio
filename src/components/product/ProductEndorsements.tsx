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

export type VideoReview = {
  id: string;
  title: string;
  channel: string;
  youtubeId: string;
  type: string;
};

function VideoReviewCard({ video }: { video: VideoReview }) {
  const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <Link
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]",
        "shadow-[0_22px_70px_rgba(0,0,0,0.24)] transition duration-300",
        "hover:-translate-y-1 hover:border-amber-200/25 hover:bg-white/[0.055]"
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-950">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={`${video.title} thumbnail`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="p-6 sm:p-7">
        <div className="inline-flex rounded-full border border-amber-200/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-amber-200/80">
          {video.type}
        </div>

        <h4 className="mt-5 text-lg font-semibold leading-snug text-neutral-50">
          {video.title}
        </h4>

        <p className="mt-3 text-sm text-neutral-400">{video.channel}</p>

        <span
          className={clsx(
            "mt-6 inline-flex items-center justify-center rounded-full border border-amber-200/20 bg-black/20 px-4 py-2",
            "text-[11px] uppercase tracking-[0.28em] text-amber-200/80 transition-colors",
            "group-hover:border-amber-200/35 group-hover:bg-black/30 group-hover:text-amber-200"
          )}
        >
          Watch Video <span className="ml-2">-&gt;</span>
        </span>
      </div>
    </Link>
  );
}

function VideoReviewsSection({ videos }: { videos: VideoReview[] }) {
  return (
    <div className="mb-14">
      <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-200">
        Video Reviews
      </h3>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {videos.map((video) => (
          <VideoReviewCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export function ProductEndorsements({
  title = "Press & Endorsements",
  kicker = "Selected citations and editorial mentions.",
  videoReviews,
  items,
}: {
  title?: string;
  kicker?: string;
  videoReviews?: VideoReview[];
  items: Endorsement[];
}) {
  if (!items?.length) return null;

  const hasVideoReviews = Boolean(videoReviews?.length);

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

        {hasVideoReviews ? (
          <VideoReviewsSection videos={videoReviews ?? []} />
        ) : null}

        {hasVideoReviews ? (
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-neutral-200">
            Written Reviews
          </h3>
        ) : null}

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
