/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../../public/locales/en/translation.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    resources: { en: { translation: enTranslation } },
  });

export default i18n;
