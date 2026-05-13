import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n";
import { getGallery } from "@/lib/gallery";
import { normalizeLocale } from "@/lib/content";
import {
  GALLERY_PRODUCT_ORDER,
  normalizeGallerySection,
} from "@/config/galleryProducts";
import { GalleryDownloadGrid } from "@/components/gallery/GalleryDownloadGrid";

export async function generateStaticParams() {
  return GALLERY_PRODUCT_ORDER.map((id) => ({ id }));
}

export default async function GalleryProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const safeLocale = normalizeLocale(locale);
  const content = await getGallery(safeLocale);
  const section = content.sections.find((item) => item.id === id);

  if (!section) {
    notFound();
  }

  const product = normalizeGallerySection(section);

  return (
    <main className="pt-28 pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/gallery"
          className="text-[11px] uppercase tracking-[0.24em] text-amber-400 transition-colors hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
        >
          &lt;- Back to Gallery
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/90">
            {product.copy.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {product.copy.name}
          </h1>
          <div className="mt-6 space-y-2 text-sm leading-6 text-neutral-300 sm:text-base">
            {product.copy.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                Download Gallery
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                High-Resolution Images
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              Click an image to preview, or use Download to save the original.
            </p>
          </div>

          <GalleryDownloadGrid items={product.allItems} />
        </div>
      </div>
    </main>
  );
}
