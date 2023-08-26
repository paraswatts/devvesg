import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { LinkButton } from 'src/common/interactions/Button';
import { CallToActionCard } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

interface InitiativeGridProps {
  initiatives: { uuid: string; name: string; objective: string; onboardingLogo: string }[];
}

export const InitiativeGrid = ({ initiatives }: InitiativeGridProps) => {
  const { t } = useTranslation();
  const { client } = useClient();

  const sortedInitiatives = useMemo(() => {
    // TODO: Add admin sorting for initiatives. For now, force Reduce Individual to the top.
    const reduceIndividual = initiatives.find((initiative) => initiative.name === 'Reduce Individual Carbon Emissions');
    let sorted = [...initiatives];
    sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (reduceIndividual) {
      sorted = [reduceIndividual, ...sorted.filter((initiative) => initiative !== reduceIndividual)];
    }
    return sorted;
  }, [initiatives]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-10 xl:gap-x-12">
      {sortedInitiatives.map((initiative) => (
        <CallToActionCard
          key={initiative.uuid}
          image={initiative.onboardingLogo}
          title={initiative.name}
          body={initiative.objective}
          action={
            <LinkButton.Primary
              to={generatePath(ClientAbsoluteRoutes.INITIATIVE_PROJECT_SELECT, {
                clientUuid: client.uuid,
                initiativeUuid: initiative.uuid,
              })}
            >
              {t('buttons.create-initiative')}
            </LinkButton.Primary>
          }
        />
      ))}
    </div>
  );
};
