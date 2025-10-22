// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    vite: {
        resolve: {
            alias: {
                '@layouts': '/src/layouts',
                '@components': '/src/components',
                '@lib': '/src/lib',
                '@assets': '/src/assets',
            },
        },
  },
});
