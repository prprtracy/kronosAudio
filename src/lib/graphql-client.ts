import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_ENDPOINT as string;

if (!endpoint) {
    throw new Error(
        "GRAPHQL_ENDPOINT is not defined"
    );
}

// export const graphqlClient = new GraphQLClient(endpoint, {
//     headers: () => {
//         const token = process.env.GRAPHQL_TOKEN;

//         return token? {
//             Authorization : `Bearer ${token}`
//         }: {}
//     }
// })

const headers: Record<string, string> = {};

if (process.env.GRAPHQL_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GRAPHQL_TOKEN}`;
}

export const graphqlClient = new GraphQLClient(endpoint, {
  headers,
});