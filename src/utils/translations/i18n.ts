import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as EnglishTranslations from './languages/en.json';
import * as RussianTranslations from './languages/ru.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: EnglishTranslations },
    ru: { translation: RussianTranslations },
  },
});

type FlattenKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K & string}${'' extends FlattenKeys<T[K]> ? '' : '.'}${FlattenKeys<
            T[K]
          >}`
        : never;
    }[keyof T]
  : '';

type TranslationKey = FlattenKeys<typeof EnglishTranslations>;

export const translate = (key: TranslationKey): string => i18n.t(key);

export default i18n;
