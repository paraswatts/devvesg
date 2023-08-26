import { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { CtaCardCarbonFootprint, CtaCardInitiative } from 'src/common/components/call-to-action';
import { Button, LinkButton } from 'src/common/interactions/Button';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import analyzeBgImage from 'src/assets/images/launchpad/analyze-bg-image.jpg';
import improveBgImage from 'src/assets/images/launchpad/improve-bg-image.jpg';
import reportBgImage from 'src/assets/images/launchpad/report-bg-image.jpg';

export const LaunchpadContainer = () => {
  const { t } = useTranslation();
  const { client } = useClient();
  return (
    <div className="grid md:grid-rows-6 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 md:row-span-2 md:order-1">
        <LaunchpadCard
          image={analyzeBgImage}
          title={t('launchpad.analyse')}
          body={t('launchpad.analyse-description')}
          actions={
            <LinkButton.Primary to={generatePath(ClientAbsoluteRoutes.CARBON_CALCULATOR, { clientUuid: client.uuid })}>
              {t('launchpad.calculate-footprint')}
            </LinkButton.Primary>
          }
        />
      </div>

      <div className="md:col-span-2 md:row-span-2 md:order-3">
        <LaunchpadCard
          image={improveBgImage}
          title={t('launchpad.improve')}
          body={t('launchpad.improve-description')}
          actions={
            <LinkButton.Primary to={generatePath(ClientAbsoluteRoutes.INITIATIVE_SELECT, { clientUuid: client.uuid })}>
              {t('launchpad.start-initiative')}
            </LinkButton.Primary>
          }
        />
      </div>

      <div className="md:col-span-2 md:row-span-2 md:order-5">
        <LaunchpadCard
          image={reportBgImage}
          title={t('launchpad.report')}
          body={t('launchpad.report-description')}
          actions={
            <Button.Primary type="button" disabled>
              {t('launchpad.coming-soon')}
            </Button.Primary>
          }
        />
      </div>

      <div className="md:col-span-1 md:row-span-3 md:order-2">
        <CtaCardCarbonFootprint />
      </div>

      <div className="md:col-span-1 md:row-span-3 md:order-4">
        <CtaCardInitiative />
      </div>
    </div>
  );
};

interface LaunchPadCardProps {
  image: string;
  title: ReactNode;
  body: ReactNode;
  actions: ReactNode;
}
const LaunchpadCard = ({ image, title, body, actions }: LaunchPadCardProps) => {
  return (
    <div className="bg-white rounded-xl flex flex-col lg:flex-row h-full">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="relative h-36 lg:h-auto lg:w-1/3 flex-shrink-0 bg-cover bg-center bg-no-repeat rounded-t-xl lg:rounded-tr-none lg:rounded-bl-xl bg-neutral-900 bg-opacity-25 bg-blend-overlay"
      >
        <span className="bg-blue-500 rounded-full absolute top-4 right-4 text-white text-xs font-bold uppercase px-2 py-1">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-grow pt-4 pl-4 pr-2 pb-2 lg:pt-10 lg:pl-10">
        <h2 className="m-0 text-5xl text-blue-900">{title}</h2>

        <div className="lg:w-2/3 flex-grow">{body}</div>

        <div className="text-right">{actions}</div>
      </div>
    </div>
  );
};
