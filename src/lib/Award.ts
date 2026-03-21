import { getContent } from "@/lib/content";
import type { AwardContent } from "@/config/Award";
import type { Locale } from "@/i18n";

export async function getAward(locale: Locale): Promise<AwardContent> {
  return getContent<AwardContent>(locale, "award.json");
}
