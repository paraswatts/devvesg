import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { Api, ClientFetchParams, ClientNewParams, ClientUpdateParams, useLazyQuery } from 'src/api';
import { ClientForm, ClientFormInputValues } from 'src/common/components/page-forms/ClientForm';
import { useParams } from 'src/common/hooks';
import { LinkButton } from 'src/common/interactions/Button';
import { Client } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminClientShowContainer = React.memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { clientUuid } = useParams<{ clientUuid: string }>();
  const [clientFormValues, setClientFormValues] = useState<ClientFormInputValues>();

  const [clientQuery, clientResponse] = useLazyQuery<ClientFetchParams, { data: Client }>(Api.admin.client.fetch, {
    onSuccess(response) {
      const client = response.data;
      setClientFormValues({
        name: client.name,
        description: client.description || '',
        contactEmail: client.contactEmail,
        websiteUrl: client.websiteUrl || '',
        contactPhoneNumber: client.contactPhoneNumber,
        twitterUrl: client.twitterUrl,
        linkedInUrl: client.linkedInUrl,
        clientLocations: client.clientLocations || [],
        clientType: client.clientType,
        vertical: client.vertical,
      });
    },
  });
  const [updateQuery, updateResponse] = useLazyQuery<ClientUpdateParams, { data: Client }>(Api.client.update, {
    onSuccess: () => {
      navigate(generatePath(AdminRoutes.CLIENTS_LIST));
    },
  });

  useEffect(() => {
    clientQuery({ clientUuid });
  }, [clientUuid, clientQuery]);

  const onSubmit = async (payload: ClientNewParams) => {
    updateQuery({ ...payload, clientUuid });
  };

  if (!clientFormValues) {
    return null;
  }

  const logo = clientResponse?.response?.data?.logo;
  const disabled = clientResponse.status === 'loading' || updateResponse.status === 'loading';

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{clientFormValues.name}</h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.PROJECTS_LIST, { clientUuid })}>
          {t('buttons.view-projects')}
        </LinkButton.Primary>
      </div>
      <ClientForm defaultValue={clientFormValues} existingLogo={logo} loading={disabled} onSubmit={onSubmit} />
    </div>
  );
});
