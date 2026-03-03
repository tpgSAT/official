// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tpgd.jp',
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
    fallback: {
      en: "ja"
    },
    routing: {
        prefixDefaultLocale: false,
        redirectToDefaultLocale: true,
        fallbackType: "redirect",
    }
  },
  vite: {
      resolve: {
          alias: {
              '@layouts': '/src/layouts',
              '@components': '/src/components',
              '@lib': '/src/lib',
              '@assets': '/src/assets',
              '@i18n': '/src/i18n',
          },
      },
  },

  // allow cms.tpgd.jp for remote images
  image: {
      domains: ["cms.tpgd.jp"],
  },

  integrations: [
    sitemap(),
    mdx(),
    partytown({
      config: {
        forward: [["dataLayer.push"],"gtm.push"],
      },
    })
  ]
});