import { GraphQLClient } from "graphql-request";

export const DIRECTUS_URL = "https://directus.tpgd.jp";

export const directusClient = new GraphQLClient(`${DIRECTUS_URL}/graphql`);

import { getSdk } from "./generated/graphql";
import type { PostFieldsFragment } from "./generated/graphql";

const sdk = getSdk(directusClient);

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  /** YYYY-MM-DD */
  date: string;
  /** サムネイル画像のURL（未設定なら null） */
  thumbnail: string | null;
  /** 記事のカテゴリ名と、その親カテゴリ名 */
  categories: string[];
  tags: string[];
}

/** Directus のファイルIDから画像URLを作る（width を指定するとリサイズされる） */
export function assetUrl(id: string, { width }: { width?: number } = {}) {
  const url = new URL(`/assets/${id}`, DIRECTUS_URL);
  if (width) url.searchParams.set("width", String(width));
  return url.toString();
}

/** 本文HTMLからタグを除いた先頭の文章（meta description 用） */
export function toExcerpt(html: string, length = 120) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > length ? `${text.slice(0, length)}…` : text;
}

export function toBlogPost(post: PostFieldsFragment): BlogPost {
  return {
    id: post.UUID,
    title: post.Title ?? "",
    content: post.Content ?? "",
    date: post.PublishedDate ?? "",
    // WP の medium_large と同じ幅
    thumbnail: post.Thumbnail ? assetUrl(post.Thumbnail.id, { width: 768 }) : null,
    categories: [post.Category?.name, post.Category?.parent?.name].filter(
      (name): name is string => !!name,
    ),
    tags: Array.isArray(post.Tags) ? post.Tags : [],
  };
}

export async function getAllPosts() {
  const res = await sdk.GetAllPosts();
  return res.Post.map(toBlogPost);
}

export async function getAllCategories() {
  const res = await sdk.GetAllCategories();
  return res.categories;
}
