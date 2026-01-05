import Image from "next/image";
import clsx from "clsx";
import { Section } from "@/components/section/Section";

export type ProductHeroData = {
  eyebrow?: string;
  title: string;
  price?: { label?: string; value: string };
  dek?: string[];
  keyline?: string;
  highlights?: string[];
  cta?: { label: string; href: string };
  image: { src: string; alt: string; priority?: boolean };
};

export function ProductHero({ data }: { data: ProductHeroData }) {
  const { eyebrow, title, price, dek, keyline, highlights, cta, image } = data;

  return (
    <Section className="pt-[96px] md:pt-[112px] lg:pt-[128px]">
      <div
        className={clsx(
          "relative overflow-hidden rounded-3xl",
          "bg-zinc-950 ring-1 ring-white/10"
        )}
      >
        {/* subtle depth */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/40" />
        </div>

        <div className="relative grid grid-cols-1 gap-10 px-6 py-10 md:grid-cols-12 md:gap-8 md:px-10 md:py-14 lg:px-14 lg:py-16">
          {/* Copy */}
          <div className="md:col-span-6 lg:col-span-5">
            {eyebrow ? (
              <p className="text-xs tracking-[0.22em] text-yellow-200/70">
                {eyebrow.toUpperCase()}
              </p>
            ) : null}

            <div className="mt-4 flex items-end justify-between gap-4">
              <h1 className="text-3xl font-semibold leading-[1.06] text-white md:text-4xl lg:text-5xl">
                {title}
              </h1>

              {price?.value ? (
                <div className="text-right">
                  <div className="text-[10px] tracking-[0.24em] text-white/45">
                    {(price.label ?? "MSRP").toUpperCase()}
                  </div>
                  <div className="mt-1 text-sm tracking-[0.08em] text-white/85">
                    {price.value}
                  </div>
                </div>
              ) : null}
            </div>

            {dek && dek.length > 0 ? (
              <div className="mt-5 max-w-[60ch] space-y-4 text-sm leading-7 text-white/80 md:text-[15px]">
                {dek.slice(0, 2).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            ) : null}

            {keyline ? (
              <p className="mt-6 text-xs tracking-[0.20em] text-white/60">
                {keyline.toUpperCase()}
              </p>
            ) : null}

            {highlights && highlights.length > 0 ? (
              <div className="mt-7">
                <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs tracking-[0.14em] text-white/75">
                  {highlights.slice(0, 6).map((h) => (
                    <li key={h} className="flex items-center">
                      <span className="mr-2 inline-block h-1 w-1 rounded-full bg-yellow-200/60" />
                      {h.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {cta ? (
              <div className="mt-8">
                <a
                  href={cta.href}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-white/60 hover:text-white/85 transition-colors"
                >
                  {cta.label.toUpperCase()}
                  <span aria-hidden className="text-white/35">
                    →
                  </span>
                </a>
              </div>
            ) : null}
          </div>

          {/* Image */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
              {/* legibility / cinematic */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/35" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),rgba(0,0,0,0)_55%)]" />
              </div>

              <Image
                src={image.src}
                alt={image.alt}
                width={1600}
                height={1100}
                priority={image.priority ?? true}
                loading={image.priority ?? true ? "eager" : "lazy"}
                fetchPriority={image.priority ?? true ? "high" : "auto"}
                sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
                className="h-[320px] w-full object-cover md:h-[420px] lg:h-[520px]"
              />
            </div>

            <p className="mt-3 text-xs tracking-[0.18em] text-white/50">
              {(keyline ?? "COUNTER-ROTATION · SUSPENDED · HAND-FINISHED").toUpperCase()}
            </p>
          </div>
        </div>

        {/* Bottom hairline */}
        <div className="relative px-6 pb-7 md:px-10 lg:px-14">
          <div className="h-px w-full bg-white/10" />
        </div>
      </div>
    </Section>
  );
}
