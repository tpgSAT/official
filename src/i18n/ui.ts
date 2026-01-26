const baseOrigin = import.meta.env.SITE; // Astroでビルド時に自動設定

export const languages = {
    ja: '日本語',
    en: 'English',
};

export type Lang = keyof typeof languages;

export type Multilingual<T> = Record<Lang, T>;

export function useTranslations(lang: Lang) {
  return function t<T>(multilingual: Multilingual<T>): T {
    return multilingual[lang];
  };
}

type LocalePath = {
  path: string;
  lang: Lang;
  label: (typeof languages)[Lang];
};

export function generateLocalePaths(url: URL): LocalePath[] {
  const pathnames = url.pathname.split('/');

  return Object.keys(languages).map((lang) => {
    pathnames[1] = lang;
    return {
      path: pathnames.join('/').replace(/\/$/, ''),
      lang: lang as Lang,
      label: languages[lang as Lang],
    };
  });
}

export function generateLocaleUrls(url: URL): LocalePath[] {
  return generateLocalePaths(url).map((localePath) => ({
    ...localePath,
    path: baseOrigin + localePath.path,
  }));
}