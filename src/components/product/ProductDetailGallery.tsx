import Image from "next/image";
import clsx from "clsx";
import { Section } from "@/components/section/Section";

export function ProductDetailGallery({
  images,
  caption,
}: {
  images: { src: string; alt: string }[];
  caption?: string;
}) {
  if (!images?.length) return null;

  return (
    <Section className="pt-6 md:pt-10">
      <div className="flex items-end justify-between gap-6">
        <p className="text-xs tracking-[0.22em] text-white/55 uppercase">
          Details
        </p>
        {caption ? (
          <p className="text-xs tracking-[0.18em] text-white/45 uppercase">
            {caption}
          </p>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-12">
        {images.slice(0, 3).map((img, idx) => {
          const span =
            idx === 0 ? "md:col-span-7" : idx === 1 ? "md:col-span-5" : "md:col-span-12";
          const height =
            idx === 2 ? "h-[260px] md:h-[320px]" : "h-[260px] md:h-[360px]";

          return (
            <div
              key={`${img.src}-${idx}`}
              className={clsx(
                "relative overflow-hidden rounded-2xl",
                "bg-white/5 ring-1 ring-white/10",
                "group",
                span
              )}
            >
              <div className={clsx("relative w-full", height)}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    idx === 0
                      ? "(min-width: 768px) 58vw, 100vw"
                      : idx === 1
                      ? "(min-width: 768px) 42vw, 100vw"
                      : "100vw"
                  }
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 h-px w-full bg-white/10" />
    </Section>
  );
}
