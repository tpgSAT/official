// @ts-check
import { defineConfig, envField } from 'astro/config';

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

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

  // サーバー側で使う秘密情報。Cloudflare の secret / ローカルは .dev.vars で設定する
  env: {
      schema: {
          // Apps Script から空き状況の API（/api/reserve, /api/sync）を呼ぶときの合言葉
          RESERVATION_API_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
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
  ],

  adapter: cloudflare()
});