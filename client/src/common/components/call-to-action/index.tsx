import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { ExternalLinkButton, LinkButton } from 'src/common/interactions/Button';
import { CallToActionCard } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import devvxMarketplaceCtaBgImage from 'src/assets/images/calls-to-action/devvxmarketplace.jpg';
import initiativeCtaBgImage from 'src/assets/images/calls-to-action/whatsaninitiative.jpg';
import carbonImpactCtaBgImage from 'src/assets/images/calls-to-action/whatscarbonimpact.jpg';

export const CtaCardCarbonFootprint = () => {
  const { client } = useClient();
  const { t } = useTranslation();

  return (
    <CallToActionCard
      image={carbonImpactCtaBgImage}
      title={t('launchpad.carbon-footprint-question')}
      body={t('launchpad.carbon-footprint-answer')}
      action={
        <LinkButton.Primary to={generatePath(ClientAbsoluteRoutes.REDUCE_IMPACT, { clientUuid: client.uuid })}>
          {t('launchpad.reduce-impact')}
        </LinkButton.Primary>
      }
    />
  );
};

export const CtaCardInitiative = () => {
  const { client } = useClient();
  const { t } = useTranslation();

  return (
    <CallToActionCard
      image={initiativeCtaBgImage}
      title={t('launchpad.initiative-question')}
      body={t('launchpad.initiative-answer')}
      action={
        <LinkButton.Primary to={generatePath(ClientAbsoluteRoutes.REDUCE_IMPACT, { clientUuid: client.uuid })}>
          {t('launchpad.create-initiative')}
        </LinkButton.Primary>
      }
    />
  );
};

export const CtaCardDevvXMarketplace = () => {
  const { t } = useTranslation();

  return (
    <CallToActionCard
      image={devvxMarketplaceCtaBgImage}
      title={t('launchpad.marketplace-devvx')}
      body={t('launchpad.marketplace-devvx-info')}
      action={<ExternalLinkButton.Primary href="https://glassblock.io">{t('launchpad.go-to-marketplace')}</ExternalLinkButton.Primary>}
    />
  );
};
