import clsx from "clsx";
import Link from "next/link";
import { Section } from "@/components/section/Section";

export type SystemModule = {
  label: string; // Tonearm / Power Supply / Rack
  title: string; // Discovery RS / SCPS-D ...
  href: string;
  description?: string;
};

export function ProductSystemModules({
  modules,
}: {
  modules: SystemModule[];
}) {
  if (!modules?.length) return null;

  return (
    <Section className="pt-8 md:pt-12">
      <div className="flex items-end justify-between gap-6">
        <p className="text-xs tracking-[0.22em] text-white/55 uppercase">
          System Modules
        </p>
        <p className="text-xs tracking-[0.18em] text-white/40 uppercase">
          Configurable components
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {modules.slice(0, 3).map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={clsx(
              "group rounded-2xl p-6",
              "bg-white/5 ring-1 ring-white/10",
              "hover:ring-yellow-200/25 hover:bg-white/7 transition-colors"
            )}
          >
            <div className="text-[11px] tracking-[0.22em] text-white/55 uppercase">
              {m.label}
            </div>

            <div className="mt-3 flex items-baseline justify-between gap-4">
              <div className="text-lg font-semibold text-white">
                {m.title}
              </div>
              <div className="text-[11px] tracking-[0.22em] text-yellow-200/70 uppercase">
                View →
              </div>
            </div>

            {m.description ? (
              <p className="mt-3 text-sm leading-6 text-white/65">
                {m.description}
              </p>
            ) : (
              <p className="mt-3 text-sm leading-6 text-white/50">
                Explore compatibility and configuration details.
              </p>
            )}

            <div className="mt-6 h-px w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
