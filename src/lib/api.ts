import { GraphQLClient } from "graphql-request";

export const wpClient = new GraphQLClient("https://cms.tpgd.jp/graphql", {
  headers: {
    // 認証が必要ならここに token など
  },
});

import { getSdk } from "./generated/graphql";

const sdk = getSdk(wpClient);

export async function getAllPosts() {
  const res = await sdk.GetAllPosts();
  return res.posts?.edges;
}

export async function getAllCategories() {
  const res = await sdk.GetAllCategories();
  return res.categories?.nodes;
}
