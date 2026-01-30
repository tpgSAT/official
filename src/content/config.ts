// `astro:content`からユーティリティをインポート
import { z, defineCollection } from 'astro:content';

// コレクションを定義
const newsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
    }),
});

export const collections = {
  'news-ja': newsCollection,
  'news-en': newsCollection,
};