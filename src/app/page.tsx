import { getHome } from "@/lib/home";
import { getWhatsNewItem } from "@/lib/whats-new";
import { HomeNarrative } from "@/components/home/HomeNarrative";
import { HomeWhatsNew } from "@/components/home/HomeWhatsNew";

export default async function HomePage() {
  const { narrative: sections, whatsNew } = await getHome("en");
  const featuredStory = whatsNew.enabled
    ? await getWhatsNewItem("en", whatsNew.featuredId)
    : null;
  const splitIndex = Math.min(1, sections.length);

  return (
    <main>
      <HomeNarrative sections={sections.slice(0, splitIndex)} locale="en" />

      {featuredStory ? (
        <HomeWhatsNew config={whatsNew} story={featuredStory} />
      ) : null}

      <HomeNarrative
        sections={sections.slice(splitIndex)}
        locale="en"
        startIndex={splitIndex}
      />
    </main>
  );
}
