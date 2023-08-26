import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { ClientRoutes } from 'src/routes/clients';
import {
  GetClientWithReports_client as Client,
  GetClientWithReports,
  GetClientWithReportsVariables,
} from 'src/routes/clients/report/__gql__/GetClientWithReports';
import { GET_CLIENT_WITH_REPORTS } from 'src/routes/clients/report/ReportContainer.query';

import esgReport from 'src/assets/images/esg-report.png';

export const ReportContainer = React.memo(() => {
  const { t } = useTranslation();
  const { clientUuid } = useParams<{ clientUuid: string }>();
  const [client, setClient] = useState<Client>();
  const [reportRequestQuery] = useLazyQuery(Api.client.reportRequest);

  useQuery<GetClientWithReports, GetClientWithReportsVariables>(GET_CLIENT_WITH_REPORTS, {
    variables: { clientId: clientUuid },
    onCompleted: (response) => {
      setClient(response.client);
    },
  });

  useEffect(() => reportRequestQuery({ clientUuid }), [reportRequestQuery, clientUuid]);

  if (!client) {
    return null;
  }

  return (
    <div>
      <h1 className="text-white font-light">{t('report.your-report')}</h1>
      <div className="w-full bg-white px-8 py-10 shadow">
        <div className="md:grid md:grid-cols-4 mb-4 border-b border-gray-500 border-opacity-50 md:px-11">
          <div className="mb-6 md:hidden text-right">
            <LinkButton.Secondary className="w-full" to={generatePath(ClientRoutes.INITIATIVE_SELECT, { clientUuid })}>
              {t('new-initiative')} <FontAwesomeIcon icon={faPlusCircle} />
            </LinkButton.Secondary>
          </div>
          <div className="col-span-3">
            <div>
              <span className="text-blue-700 text-4xl mb-0">{client?.name}</span>
              <span className="text-xl"> - {client?.stockTicker}</span>
            </div>
            <h1 className="text-blue-700 text-4xl mb-2">{t('launchpad.esg-report')}</h1>

            {/*<p className="mb-4 font-light text-gray-500">Powered by Confluence Analytics</p>

            <p className="w-full md:w-3/4 font-light text-gray-500">
              This report shows how your company is doing against the goal of being NetZero. You can see your company's
              ESG score and trend over time, your total caron footprint as reported in the global markets, and how you
              compare to your peers based on 12 global KPIs.
            </p>*/}
          </div>
          <div className="hidden md:block text-right">
            <LinkButton.Secondary className="w-full" to={generatePath(ClientRoutes.INITIATIVE_SELECT, { clientUuid })}>
              {t('new-initiative')} <FontAwesomeIcon icon={faPlusCircle} />
            </LinkButton.Secondary>
          </div>
        </div>

        {client.report1 && (
          <div>
            <img className="w-full" src={client.report1} alt="ESG Report" />
          </div>
        )}

        {client.report2 && (
          <div>
            <img className="w-full" src={client.report2} alt="ESG Report" />
          </div>
        )}
        <Show show={false}>
          <div>
            <img className="w-full" src={esgReport} alt="ESG Report" />
          </div>
        </Show>

        <div className="pt-12 text-center">
          <p className="md:w-3/4 md:mx-auto mb-4 font-light text-gray-500">{t('report.thankyou-for-requesting-report')}</p>
          <p className="md:w-3/4 md:mx-auto mb-8 font-light text-gray-500">{t('report.did-you-know-that-majority')}</p>

          <div className="md:w-1/2 md:mx-auto">
            <LinkButton.Secondary className="w-1/2" to={generatePath(ClientRoutes.INITIATIVE_SELECT, { clientUuid })}>
              {t('new-initiative')} <FontAwesomeIcon icon={faPlusCircle} />
            </LinkButton.Secondary>
          </div>
        </div>
      </div>
    </div>
  );
});
