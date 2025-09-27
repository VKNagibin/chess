import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ch from './translations/ch.json';
import de from './translations/de.json';
import en from './translations/en.json';
import fr from './translations/fr.json';
import jp from './translations/jp.json';
import ru from './translations/ru.json';
import sp from './translations/sp.json';

export const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  de: {
    translation: de,
  },
  ch: {
    translation: ch,
  },
  fr: {
    translation: fr,
  },
  jp: {
    translation: jp,
  },
  sp: {
    translation: sp,
  },
};

export type LanguagesKeysType = keyof typeof resources;

i18n.use(initReactI18next).init({
  lng: 'ru',
  resources,
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
