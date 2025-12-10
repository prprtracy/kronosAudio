// src/lib/distributors.ts
export type DistributorRegion = {
  id: string;
  label: string;
  countries: {
    code: string;
    name: string;
    city: string;
    dealers: number;
  }[];
};

export const distributorRegions: DistributorRegion[] = [
  {
    id: "north-america",
    label: "North America",
    countries: [
      { code: "US", name: "United States", city: "New York / Los Angeles", dealers: 4 },
      { code: "CA", name: "Canada", city: "Toronto / Montréal", dealers: 2 },
    ],
  },
  {
    id: "europe",
    label: "Europe",
    countries: [
      { code: "CH", name: "Switzerland", city: "Lausanne", dealers: 1 },
      { code: "FR", name: "France", city: "Paris / Lyon", dealers: 2 },
      { code: "DE", name: "Germany", city: "Berlin / Munich", dealers: 3 },
    ],
  },
  // 先写几个 demo，后面再从 GraphQL 拉真数据
];
