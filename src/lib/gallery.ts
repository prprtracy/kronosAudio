import { getContent } from "@/lib/content";
import type { GalleryContent } from "@/config/gallery";
import type { Locale } from "@/i18n";

export async function getGallery(locale: Locale): Promise<GalleryContent> {
  return getContent<GalleryContent>(locale, "gallery.json");
}
