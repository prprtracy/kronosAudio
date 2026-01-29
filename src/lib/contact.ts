import { getContent } from "@/lib/content";
import type { ContactContent } from "@/config/contact";
import type { Locale } from "@/i18n";

export async function getContact(locale: Locale): Promise<ContactContent> {
  return getContent<ContactContent>(locale, "contact.json");
}
