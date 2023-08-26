
import { Fragment, ReactNode } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import I18nSelect from 'src/common/components/i18n-select/I18nSelect';
import { Container } from 'src/common/layout/Container';

import devvioLogo from 'src/assets/images/devvio-logo.svg';

export const Footer = () => {
  const { t } = useTranslation();

  const FOOTER_LINKS = [
    [t('global.footer.terms-of-use'), '/terms'],
    [t('global.footer.privacy-policy'), '/'],
  ].map<ReactNode>(([label, url], index) => (
    <Fragment key={url}>
      {index !== 0 && <span>|</span>}
      <Link to={url} target="_blank" className="text-white">
        {label}
      </Link>
    </Fragment>
  ));

  return (
    <footer className="bg-blue-700 text-xs text-white">
      <Container>
        <div className="flex flex-col md:flex-row gap-4 px-4 py-2 items-center">
          <img src={devvioLogo} style={{ height: 34 }} alt="Devvio" />

          <div className="flex-grow" data-build-id={process.env.REACT_APP_BUILD_ID || ''}>
            {t('global.footer.powered-by-devvio')}
          </div>

          <I18nSelect />
          
          <div>&copy; {new Date().getFullYear()} {t('global.footer.copyright-reserved')}</div>

          <div className="flex gap-1">{FOOTER_LINKS}</div>
        </div>
      </Container>
    </footer>
  );
};
