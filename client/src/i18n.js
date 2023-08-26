/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    whitelist: ['en', 'ja', 'es'],
    defaultNS: 'translation',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'devvESGLng',
      lookupCookie: 'devvESGLng',
      lookupLocalStorage: 'devvESGLng',
      lookupSessionStorage: 'devvESGLng',
      caches: ['localStorage']
    },
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
  });

export default i18n;
