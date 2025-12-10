// src/lib/api/distributors.ts
import { graphqlClient } from "../graphql-client";
import type { DistributorRegion } from "../distributors";
import { distributorRegions } from "../distributors";

const DISTRIBUTORS_QUERY = /* GraphQL */ `
  query Distributors($locale: String!) {
    distributors(locales: [$locale]) {
      region
      country
      city
      dealers
    }
  }
`;

export async function getDistributors(locale: string): Promise<DistributorRegion[]> {
  // 暂时用本地假数据；等接 CMS 只要把下面注释打开即可
  if (!process.env.GRAPHQL_ENDPOINT || process.env.GRAPHQL_ENDPOINT.includes("your-graphql-endpoint")) {
    return distributorRegions;
  }

  const data = await graphqlClient.request(DISTRIBUTORS_QUERY, { locale });
  // TODO: 把返回结果 map 成 DistributorRegion[]
  return distributorRegions;
}
