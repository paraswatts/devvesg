import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { CardTabBar, CardTabBarTab } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

export const CarbonTabBar = () => {
  const { client } = useClient();
  const { t } = useTranslation();
  return (
    <CardTabBar>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.CARBON_IMPACT, { clientUuid: client.uuid })} end>
        {t('analyse.carbon-impact')}
      </CardTabBarTab>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.CARBON_CALCULATOR, { clientUuid: client.uuid })} end>
        {t('launchpad.carbon-calculator')}
      </CardTabBarTab>
      <CardTabBarTab to={generatePath(ClientAbsoluteRoutes.CARBON_IMPACT_HISTORY, { clientUuid: client.uuid })} end>
        {t('analyse.impact-history')}
      </CardTabBarTab>
    </CardTabBar>
  );
};
