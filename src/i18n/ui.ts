export const languages = {
    ja: '日本語',
    en: 'English',
};

export type Lang = keyof typeof languages;

export type Multilingual = Record<Lang, string>;

export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual): string {
    return multilingual[lang];
  };
}