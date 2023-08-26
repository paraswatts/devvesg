import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { CardTabBar, CardTabBarTab } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

export const CarbonCreditsTabBar = () => {
  const { client } = useClient();
  const { t } = useTranslation();
  return (
    <CardTabBar>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.CARBON_CREDITS_OVERVIEW, { clientUuid: client.uuid })} end>
        {t('improve.overview')}
      </CardTabBarTab>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.CARBON_CREDITS_CREDITS, { clientUuid: client.uuid })} end>
        {t('improve.carbon-credits')}
      </CardTabBarTab>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.PLASTIC_CREDITS_CREDITS, { clientUuid: client.uuid })} end>
        {t('improve.plastic-credits')}
      </CardTabBarTab>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.CARBON_CREDITS_ADD, { clientUuid: client.uuid })} end>
        {t('improve.add-credits')}
      </CardTabBarTab>
    </CardTabBar>
  );
};
