import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useLazyQuery } from '@apollo/client';

import { useParams } from 'src/common/hooks';
import {
  GetClientForProvider,
  GetClientForProviderVariables,
} from 'src/routes/clients/providers/__gql__/GetClientForProvider';
import { GET_CLIENT_FOR_PROVIDER } from 'src/routes/clients/providers/ClientProvider.query';

export interface ProvidedClient {
  uuid: string;
  name: string;
  description: string;
  logo: string | null;
}

export interface ClientContextValues {
  client: ProvidedClient;
  setClient: (client: Partial<ProvidedClient>) => void;
}

const ClientContext = createContext<ClientContextValues>({
  client: {} as ProvidedClient,
  setClient: () => {},
});

export const ClientProvider = ({ children }: PropsWithChildren<any>) => {
  const { clientUuid } = useParams<{ clientUuid: string }>();
  const [client, setClient] = useState<ProvidedClient>({} as ProvidedClient);
  const [hasError, setHasError] = useState(false);
  const [fetchClient] = useLazyQuery<GetClientForProvider, GetClientForProviderVariables>(GET_CLIENT_FOR_PROVIDER, {
    variables: { clientId: clientUuid },
    onCompleted: (response) => {
      setClient(response.client);
      setHasError(false);
    },
    onError: () => {
      setHasError(true);
    },
  });

  useEffect(() => {
    fetchClient({ variables: { clientId: clientUuid } });
  }, [clientUuid, fetchClient]);

  const contextValue = useMemo(() => {
    return {
      client,
      setClient: (updatedClient: Partial<ProvidedClient>) => {
        setClient((prevValue) => ({ ...prevValue, ...updatedClient }));
      },
    };
  }, [client]);

  if (hasError) {
    // TODO redirect or error page?
    return null;
  } else if (client.uuid === clientUuid) {
    return <ClientContext.Provider value={contextValue}>{children}</ClientContext.Provider>;
  } else {
    // TODO show spinner?
    return null;
  }
};

export const useClient = () => useContext(ClientContext);
