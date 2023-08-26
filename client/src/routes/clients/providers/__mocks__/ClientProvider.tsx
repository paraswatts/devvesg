import { PropsWithChildren, useMemo, useState } from 'react';

import { ProvidedClient } from 'src/routes/clients/providers/ClientProvider';

export const ClientProvider = ({ children }: PropsWithChildren<any>) => {
  return <>{children}</>;
};

export const useClient = () => {
  const [client, setClient] = useState<ProvidedClient>({
    uuid: 'mock-client-uuid',
    name: 'Mock Client',
    description: 'Mock client description',
    logo: null,
  });

  return useMemo(() => ({ client, setClient }), [client]);
};
