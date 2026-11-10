import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { wpClient } from '../lib/api.ts';

export const addLike = defineAction({
    input: z.object({
      blogId: z.string()
    }),
    handler: async ({ blogId }) => {

    const mutation = `
      mutation AddBlogLike($id: ID!) {
        updatePostLike(input: { id: $id }) {
          likeCount
        }
      }
    `;
    const blogResponse = await wpClient.request(mutation, { id: blogId });
    
    const newLikeCount = (blogResponse as any)?.updatePostLike?.likeCount ?? 0;
    
    return { likeCount: newLikeCount };
    }
  })