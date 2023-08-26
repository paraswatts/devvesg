import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';

const i18n = () =>
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
      debug: true,
      backend: {
        loadPath: 'server/locales/{{lng}}/{{ns}}.json',
      },
      fallbackLng: 'en',
      preload: ['en', 'es', 'ja'],
    });

export default i18n;
