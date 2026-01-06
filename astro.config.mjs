// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://tpgd.jp',
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

  // allow cms.tpgd.jp for remote images
  image: {
      domains: ["cms.tpgd.jp"],
  },

  integrations: [mdx(), partytown()]
});