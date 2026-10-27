// Astro.locals.runtime.env から Cloudflare のバインディング（D1 など）を型付きで使うための定義
type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
