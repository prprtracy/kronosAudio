import { FooterContent } from "@/config/footer";
import { getContent } from "@/lib/content";
import type { Locale } from "@/i18n";

export async function getFooter(locale: Locale): Promise<FooterContent> {
  return getContent<FooterContent>(locale, "footer.json");
}
