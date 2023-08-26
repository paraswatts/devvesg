import { useState } from 'react';

import { useQuery } from '@apollo/client';
import { generatePath, useNavigate } from 'react-router-dom';

import { Api, ClientNewParams, useLazyQuery } from 'src/api';
import { ClientForm, ClientFormInputValues } from 'src/common/components/page-forms/ClientForm';
import { Card, CardBody } from 'src/common/layout/cards';
import { locationsUnflatten } from 'src/common/util';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import {
  ClientProfileCompanyQuery_client as Client,
  ClientProfileCompanyQuery,
  ClientProfileCompanyQueryVariables,
} from 'src/routes/clients/profile/company/__gql__/ClientProfileCompanyQuery';
import { CLIENT_PROFILE_COMPANY_QUERY } from 'src/routes/clients/profile/company/ClientProfileCompanyContainer.query';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

export const ClientProfileCompanyContainer = () => {
  const navigate = useNavigate();
  const {
    client: { uuid: clientUuid },
    setClient,
  } = useClient();

  const [editableClient, setEditableClient] = useState<Client | undefined>();

  const { loading: fetchLoading } = useQuery<ClientProfileCompanyQuery, ClientProfileCompanyQueryVariables>(
    CLIENT_PROFILE_COMPANY_QUERY,
    {
      variables: {
        clientId: clientUuid,
      },
      onCompleted: (response) => {
        setEditableClient(response.client);
      },
    },
  );

  const [updateQuery, { status: updateStatus }] = useLazyQuery(Api.client.update, {
    enableSuccessToast: true,
    onSuccess(response) {
      setClient({
        uuid: response.data.uuid,
        name: response.data.name,
        description: response.data.description,
        logo: response.data.logo,
      });
      navigate(generatePath(ClientAbsoluteRoutes.LAUNCHPAD, { clientUuid: response.data.uuid }));
    },
  });

  const onSubmit = async (payload: ClientNewParams) => {
    updateQuery({ ...payload, clientUuid });
  };

  const loading = fetchLoading || updateStatus === 'loading';

  let client: ClientFormInputValues | undefined = undefined;
  if (editableClient) {
    client = {
      name: editableClient.name,
      description: editableClient.description,
      contactEmail: editableClient.contactEmail || '',
      websiteUrl: editableClient.websiteUrl || '',
      contactPhoneNumber: editableClient.contactPhoneNumber || undefined,
      linkedInUrl: editableClient.linkedInUrl || undefined,
      twitterUrl: editableClient.twitterUrl || undefined,
      vertical: editableClient.vertical || undefined,
      clientType: editableClient.clientType || undefined,
      clientLocations: locationsUnflatten(editableClient.locations),
    };
  }

  return (
    <Card>
      <CardBody>
        {editableClient && (
          <ClientForm
            defaultValue={client}
            existingLogo={editableClient?.logo || undefined}
            loading={loading}
            onSubmit={onSubmit}
          />
        )}
      </CardBody>
    </Card>
  );
};
