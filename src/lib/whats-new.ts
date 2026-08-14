import "server-only";
import type { Locale } from "@/i18n";
import { getContent } from "@/lib/content";
import type { WhatsNewContent, WhatsNewItem } from "@/types/whats-new";

export async function getWhatsNew(locale: Locale): Promise<WhatsNewContent> {
  return getContent<WhatsNewContent>(locale, "whats-new.json");
}

export async function getWhatsNewItem(
  locale: Locale,
  id: string
): Promise<WhatsNewItem | null> {
  const content = await getWhatsNew(locale);
  return content.items.find((item) => item.id === id) ?? null;
}

export async function getWhatsNewItemBySlug(
  locale: Locale,
  slug: string
): Promise<WhatsNewItem | null> {
  const content = await getWhatsNew(locale);
  return content.items.find((item) => item.slug === slug) ?? null;
}
