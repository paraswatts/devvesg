import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { CardTabBar, CardTabBarTab } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

export const BaselineTabBar = () => {
  const { client } = useClient();
  const { t } = useTranslation();

  return (
    <CardTabBar>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.BASELINE_OVERVIEW, { clientUuid: client.uuid })}>
        {t('questionnaire.esg-score')}
      </CardTabBarTab>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.BASELINE_QUESTIONAIRE, { clientUuid: client.uuid })}>
        {t('questionnaire.questionnaire')}
      </CardTabBarTab>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.BASELINE_HISTORY, { clientUuid: client.uuid })}>
        {t('questionnaire.history')}
      </CardTabBarTab>
    </CardTabBar>
  );
};
