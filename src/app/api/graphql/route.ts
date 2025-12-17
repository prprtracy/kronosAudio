import { createSchema, createYoga } from "graphql-yoga";
import { NextRequest } from "next/server";
    // import { products } from "@/data/products";
import { products } from "@/data/products";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Money {
      amount: Int!
      currency: String!
      display: String!
    }

    type Download {
      label: String!
      url: String!
    }

    type Spec {
      key: String!
      value: String!
    }

    type Review {
      sourceName: String
      authorName: String
      sourceUrl: String
      quote: String
      imageUrl: String
    }

    type Product {
      id: ID!
      slug: String!
      name: String!
      tagline: String
      msrp: Money
      upgradeKit: Money
      description: [String!]!     # 旧站是 1~2 段，所以用段落数组最贴近
      gallery: [String!]!         # image urls
      downloads: [Download!]!
      specs: [Spec!]!
      reviews: [Review!]!
    }

    type Query {
      products: [Product!]!
      productBySlug(slug: String!): Product
    }
  `,
  resolvers: {
    Query: {
      products: () => products,
      productBySlug: (_: unknown, args: { slug: string }) =>
        products.find((p) => p.slug === args.slug) ?? null,
    },
  },
});

const yoga = createYoga<{ req: NextRequest }>({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
});

export { yoga as GET, yoga as POST };
