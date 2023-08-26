import { graphql } from 'msw';

import { GetLatestFootprint, GetLatestFootprintVariables } from './__gql__/GetLatestFootprint';
import { GET_LATEST_FOOTPRINT } from './CarbonImpactContainer.query';

export const MswGetLatestFootprintHandler = graphql.query<GetLatestFootprint, GetLatestFootprintVariables>(
  GET_LATEST_FOOTPRINT,
  (req, res, ctx) => {
    return res(
      ctx.data({
        client: {
          __typename: 'Client',
          latestFootprint: {
            __typename: 'CarbonFootprint',
            total: 12345,
            createdAt: new Date(2000, 0, 1),
          },
        },
      }),
    );
  },
);
