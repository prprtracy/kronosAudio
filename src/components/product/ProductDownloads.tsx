import clsx from "clsx";
import { Section } from "@/components/section/Section";

type DownloadItem = {
  label: string;
  url?: string;
};

type Props = {
  title?: string;
  eyebrow?: string;
  items?: DownloadItem[];
};

export function ProductDownloads({
  title = "Documentation",
  eyebrow = "Resources",
  items = [],
}: Props) {
  const validItems = items.filter((i) => typeof i.url === "string" && i.url);

  if (validItems.length === 0) return null;

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

          {/* content */}
          <ul className="mt-7 space-y-3">
            {validItems.map((item) => (
              <li
                key={item.url}
                className={clsx(
                  "group flex items-center justify-between gap-6",
                  "rounded-2xl border border-white/10 bg-black/30 backdrop-blur",
                  "px-5 py-4",
                  "transition-colors hover:border-white/20"
                )}
              >
                <div className="min-w-0">
                  <div className="truncate text-sm text-white/85">
                    {item.label}
                  </div>
                  <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-white/45">
                    PDF document
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs tracking-[0.18em] uppercase text-white/55 group-hover:text-white/85 transition-colors"
                >
                  View →
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* bottom glow line */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />
      </div>
    </Section>
  );
}
