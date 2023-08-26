import { PropsWithChildren } from 'react';

import { generatePath } from 'react-router-dom';

import { LinkButton } from 'src/common/interactions/Button';
import { CallToActionCard } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import bgImage from 'src/assets/images/calls-to-action/whatscarbonimpact.jpg';

export const CarbonCallToActionWrapper = ({ children }: PropsWithChildren<any>) => {
  const { client } = useClient();

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <div className="flex-grow">{children}</div>

      <div className="w-full xl:w-80">
        <div>
          <CallToActionCard
            image={bgImage}
            title="What's Carbon Footprint?"
            body="Carbon footprint is the gross tonnage of carbon emissions coming from your company either directly or indirectly. Carbon is the most talked about Greenhouse Gas (GhG) but not the only one that impacts our planet."
            action={
              <LinkButton.Primary to={generatePath(ClientAbsoluteRoutes.REDUCE_IMPACT, { clientUuid: client.uuid })}>
                Reduce Impact
              </LinkButton.Primary>
            }
          />
        </div>
      </div>
    </div>
  );
};
