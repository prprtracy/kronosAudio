// src/components/product/ProductIntro.tsx
import clsx from "clsx";
import { Section } from "@/components/section/Section";

export function ProductIntro({
  title = "Overview",
  paragraphs = [],
  eyebrow = "Design",
}: {
  title?: string;
  eyebrow?: string;
  paragraphs?: string[];
}) {
  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <Section className="pt-10 md:pt-14 lg:pt-16">
      <div
        className={clsx(
          "rounded-3xl overflow-hidden",
          "bg-zinc-950 ring-1 ring-white/10"
        )}
      >
        <div className="px-6 py-8 md:px-10 md:py-10 lg:px-14">
          {/* header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.24em] uppercase text-amber-300/80">
                {eyebrow}
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-white/90">
                {title}
              </h2>
            </div>

            {/* micro mark */}
            <div className="hidden md:block text-[11px] tracking-[0.22em] uppercase text-white/40">
              Kronos Audio
            </div>
          </div>

          {/* hairline */}
          <div className="mt-7 h-px w-full bg-white/10" />

          {/* copy */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* left: paragraphs */}
            <div className="md:col-span-8 lg:col-span-7">
              <div className="space-y-5 text-sm md:text-[15px] leading-7 text-white/75">
                {paragraphs.slice(0, 3).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* right: editorial note (optional but adds “逼格”) */}
            <div className="md:col-span-4 lg:col-span-5">
              <div
                className={clsx(
                  "rounded-2xl",
                  "border border-white/10 bg-black/30 backdrop-blur",
                  "p-5 md:p-6"
                )}
              >
                <p className="text-[11px] tracking-[0.22em] uppercase text-white/45">
                  Notes
                </p>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Built to disappear into silence—so the recording remains.
                  Every surface, every interface, every tolerance exists for one
                  purpose: to preserve time.
                </p>

                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

                <p className="mt-4 text-[11px] tracking-[0.22em] uppercase text-white/50">
                  Hand-finished · Reference platform
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom glow line */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />
      </div>
    </Section>
  );
}
