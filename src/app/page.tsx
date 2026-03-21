import { getHomeNarrative } from "@/lib/home";
import { HomeNarrative } from "@/components/home/HomeNarrative";

export default async function HomePage() {
  const sections = await getHomeNarrative("en"); // 先临时写死

  return <HomeNarrative sections={sections} locale="en" />;
}