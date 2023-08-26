import React from 'react';

import { faCheck, faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CookieConsent from 'react-cookie-consent';
import { Trans, useTranslation } from 'react-i18next';

export const CookieBanner = () => {
  const { t } = useTranslation();
  return (
    <CookieConsent
      style={{ position: 'sticky', alignItems: 'center' }}
      buttonText={
        <div className="flex flex-row gap-2 items-center">
          {t('cookies.accept-cookies')} <FontAwesomeIcon icon={faCheck} />
        </div>
      }
    >
      <div className="flex flex-row gap-4 items-center">
        <FontAwesomeIcon icon={faCookieBite} className="flex-none" size="2x" />
        <div className="flex-1">
          <Trans i18nKey={'cookies.description'} components={[<br />]} />
        </div>
      </div>
    </CookieConsent>
  );
};
