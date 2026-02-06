// src/components/product/ProductIntro.tsx
import clsx from "clsx";
import { Section } from "@/components/section/Section";

type Variant = "dark" | "light";

export type ProductIntroNote = {
  label?: string;          // e.g. "Notes"
  copy?: string[];         // 多段文字
  signature?: string;      // e.g. "Hand-finished · Reference platform"
};

export function ProductIntro({
  title = "Overview",
  paragraphs = [],
  eyebrow = "Design",
  variant = "dark",
  note, // ✅ JSON 驱动的右侧 note（可选）
}: {
  title?: string;
  eyebrow?: string;
  paragraphs?: string[];
  variant?: Variant;
  note?: ProductIntroNote;
}) {
  if (!paragraphs || paragraphs.length === 0) return null;

  const isLight = variant === "light";

  const hasNote =
    !!note &&
    ((note.copy && note.copy.length > 0) ||
      (typeof note.signature === "string" && note.signature.length > 0) ||
      (typeof note.label === "string" && note.label.length > 0));

  return (
    <Section className="pt-10 md:pt-14 lg:pt-16">
      <div
        className={clsx(
          "rounded-3xl overflow-hidden",
          isLight
            ? "bg-white ring-1 ring-black/10"
            : "bg-zinc-950 ring-1 ring-white/10"
        )}
      >
        <div className="px-6 py-8 md:px-10 md:py-10 lg:px-14">
          {/* header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <p
                className={clsx(
                  "text-[11px] tracking-[0.24em] uppercase",
                  isLight ? "text-neutral-500" : "text-amber-300/80"
                )}
              >
                {eyebrow}
              </p>

              <h2
                className={clsx(
                  "mt-3 text-2xl md:text-3xl font-semibold tracking-tight",
                  isLight ? "text-black" : "text-white/90"
                )}
              >
                {title}
              </h2>
            </div>

            {/* micro mark */}
            <div
              className={clsx(
                "hidden md:block text-[11px] tracking-[0.22em] uppercase",
                isLight ? "text-black/40" : "text-white/40"
              )}
            >
              Kronos Audio
            </div>
          </div>

          {/* hairline */}
          <div
            className={clsx(
              "mt-7 h-px w-full",
              isLight ? "bg-black/10" : "bg-white/10"
            )}
          />

          {/* copy */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* left: paragraphs */}
            <div className={clsx(hasNote ? "md:col-span-8 lg:col-span-7" : "md:col-span-12")}>
              <div
                className={clsx(
                  "space-y-5 text-sm md:text-[15px] leading-7",
                  isLight ? "text-neutral-800" : "text-white/75"
                )}
              >
                {paragraphs.slice(0, 3).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* right: editorial note (JSON-driven, optional) */}
            {hasNote ? (
              <div className="md:col-span-4 lg:col-span-5">
                <div
                  className={clsx(
                    "rounded-2xl p-5 md:p-6",
                    isLight
                      ? "border border-black/10 bg-neutral-50"
                      : "border border-white/10 bg-black/30 backdrop-blur"
                  )}
                >
                  <p
                    className={clsx(
                      "text-[11px] tracking-[0.22em] uppercase",
                      isLight ? "text-neutral-500" : "text-white/45"
                    )}
                  >
                    {(note?.label ?? "Notes").toString()}
                  </p>

                  {note?.copy && note.copy.length > 0 ? (
                    <div
                      className={clsx(
                        "mt-3 space-y-3 text-sm leading-7",
                        isLight ? "text-neutral-700" : "text-white/70"
                      )}
                    >
                      {note.copy.slice(0, 4).map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  ) : null}

                  {note?.signature ? (
                    <>
                      <div
                        className={clsx(
                          "mt-6 h-px",
                          isLight
                            ? "bg-gradient-to-r from-transparent via-black/15 to-transparent"
                            : "bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"
                        )}
                      />
                      <p
                        className={clsx(
                          "mt-4 text-[11px] tracking-[0.22em] uppercase",
                          isLight ? "text-neutral-600" : "text-white/50"
                        )}
                      >
                        {note.signature}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* bottom divider */}
        <div
          className={clsx(
            "h-px",
            isLight
              ? "bg-gradient-to-r from-transparent via-black/15 to-transparent"
              : "bg-gradient-to-r from-transparent via-amber-400/25 to-transparent"
          )}
        />
      </div>
    </Section>
  );
}
