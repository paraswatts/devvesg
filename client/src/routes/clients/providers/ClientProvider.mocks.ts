import { graphql } from 'msw';

import {
  GetClientForProvider,
  GetClientForProviderVariables,
} from 'src/routes/clients/providers/__gql__/GetClientForProvider';
import { GET_CLIENT_FOR_PROVIDER } from 'src/routes/clients/providers/ClientProvider.query';

export const MswGetClientForProviderHandler = graphql.query<GetClientForProvider, GetClientForProviderVariables>(
  GET_CLIENT_FOR_PROVIDER,
  (req, res, ctx) => {
    return res(
      ctx.data({
        client: {
          __typename: 'Client',
          uuid: 'client-uuid',
          name: 'Foo Bar',
          description: 'Test',
          logo: 'https://www.testimage.com/image.png',
        },
      }),
    );
  },
);
