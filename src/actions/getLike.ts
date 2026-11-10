import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { wpClient } from '../lib/api.ts';

export const getLike = defineAction({
    input: z.object({
      blogId: z.string()
    }),
    handler: async ({ blogId }) => {
        const query = `
      query GetBlogLikeBySlug($id: ID!) {
        post(id: $id, idType: SLUG) { 
          likeCount
        }
      }
    `;
    
    const blogResponse = await wpClient.request<{ post: { likeCount: number } | null }>(query, { id: blogId });      
    const likeCount = blogResponse?.post?.likeCount ?? 0;
      return { likeCount };
    }
  });