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