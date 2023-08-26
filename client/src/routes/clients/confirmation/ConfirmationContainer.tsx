import React from 'react';

import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { useParams } from 'src/common/hooks';
import { LinkButton } from 'src/common/interactions/Button';
import { ClientRoutes } from 'src/routes/clients';

export const ConfirmationContainer = React.memo(() => {
  const { t } = useTranslation();
  const { clientUuid } = useParams<{ clientUuid: string }>();
  return (
    <div className="w-full bg-white px-8 md:py-20 shadow text-center">
      <div className="w-full md:w-1/2 mx-auto">
        <h1 className="text-blue-600 text-4xl mb-0 mt-8">{t('onboarding.new-user-congratulations')}</h1>
        <div className="text-blue-600 text-lg mt-8 mb-8">{t('onboarding.initiative-intro')}</div>
        <div className="grid grid-cols-1">
          <div className="mb-4 col-span-1">
            <LinkButton.Primary to={generatePath(ClientRoutes.INITIATIVE_SELECT, { clientUuid })}>
              {t('buttons.create-new-initiative')}
            </LinkButton.Primary>
          </div>
        </div>
      </div>
    </div>
  );
});
