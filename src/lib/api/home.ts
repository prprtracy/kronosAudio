// src/lib/api/home.ts
import { graphqlClient } from "../graphql-client";

const HOME_QUERY = /* GraphQL */ `
  query HomePage($locale: String!) {
    homePage(locales: [$locale]) {
      heroTitle
      heroSubtitle
    }
  }
`;

export async function getHomePage(locale: string) {
  // demo: 如果还没有 CMS，可以暂时return mock
  if (!process.env.GRAPHQL_ENDPOINT || process.env.GRAPHQL_ENDPOINT === "https://your-graphql-endpoint.com/graphql") {
    return {
      heroTitle: locale === "zh" ? "Kronos 高端黑胶系统" : "Kronos High-End Turntables",
      heroSubtitle:
        locale === "zh"
          ? "精密工程与音乐表现力的结合。"
          : "Where mechanical precision meets musical emotion.",
    };
  }

  const data = await graphqlClient.request<{ homePage: { heroTitle: string; heroSubtitle: string } }>(
    HOME_QUERY,
    { locale }
  );

  return data.homePage;
}
