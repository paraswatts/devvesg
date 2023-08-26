import React, { ReactNode, useState } from 'react';

import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { StatusIcon } from 'src/common/components';
import { LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { usePartner } from 'src/routes/partners/PartnerProvider';
import { PartnerAbsoluteRoutes } from 'src/routes/partners/PartnerRouter';
import {
  GetRequests,
  GetRequestsVariables,
  GetRequests_partner_requirementRequests_items as RequirementRequests,
} from 'src/routes/partners/requests/list/__gql__/GetRequests';
import { GET_REQUESTS } from 'src/routes/partners/requests/list/RequestsListContainer.query';

import tableStyles from 'src/common/styles/Table.module.scss';

export const RequestsListContainer = React.memo(() => {
  const { t } = useTranslation();
  const { partner } = usePartner();

  const [requests, setRequests] = useState<RequirementRequests[]>([]);

  const { loading, called } = useQuery<GetRequests, GetRequestsVariables>(GET_REQUESTS, {
    variables: {
      partnerId: partner.uuid,
    },
    onCompleted: (response) => {
      setRequests(response.partner.requirementRequests.items);
    },
  });

  return (
    <>
      <div className="px-8 py-10 bg-white shadow">
        <h1 className="font-bold mb-3">{t('partner.requests')}</h1>
        <p>{t('partner.requests-desc')}</p>

        <Show show={requests.length === 0 && called && !loading}>
          <EmptyMessage t={t} />
        </Show>

        <RequestsTable requests={requests} t={t} />
      </div>
    </>
  );
});

const EmptyMessage = ({ t }: { t: (p: string) => ReactNode }) => (
  <div className="flex flex-col items-center gap-6 my-8">
    <h1 className="mb-0">{t('partner.welcome')}</h1>
    <p className="mb-0">{t('partner.no-requests')}.</p>
  </div>
);

interface RequestsTableProps {
  requests: RequirementRequests[];
  t: (p: string) => ReactNode;
}
const RequestsTable = React.memo(({ requests, t }: RequestsTableProps) => {
  const { partner } = usePartner();

  if (requests.length === 0) {
    return null;
  }

  return (
    <div className={tableStyles.scrollXTableContainer}>
      <table className={tableStyles.devvEsgTable}>
        <thead>
          <tr>
            <th>{t('project.initiative')}</th>
            <th>{t('partner.project')}</th>
            <th>{t('project.requirement')}</th>
            <th>{t('project.status')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            const {
              uuid,
              name,
              status,
              project: { name: projectName, initiative, projectType },
            } = request;
            return (
              <tr key={uuid}>
                <td>{initiative.name}</td>
                <td>{projectName}</td>
                <td>
                  {projectType.name}: {name}
                </td>
                <td>
                  <StatusIcon status={status} />
                </td>
                <td>
                  <LinkButton.Primary
                    small
                    to={generatePath(PartnerAbsoluteRoutes.REQUEST_DETAILS, {
                      partnerUuid: partner.uuid,
                      requestUuid: request.uuid,
                    })}
                  >
                    {t('admin.review')}
                  </LinkButton.Primary>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
