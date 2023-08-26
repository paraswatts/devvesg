import { graphql } from 'msw';

import {
  CarbonFootprintDelete,
  CarbonFootprintDeleteVariables,
} from 'src/routes/clients/analyze/carbon/impact-history/__gql__/CarbonFootprintDelete';
import {
  GetCarbonImpactHistory,
  GetCarbonImpactHistoryVariables,
} from 'src/routes/clients/analyze/carbon/impact-history/__gql__/GetCarbonImpactHistory';
import {
  CARBON_FOOTPRINT_DELETE,
  GET_CARBON_IMPACT_HISTORY,
} from 'src/routes/clients/analyze/carbon/impact-history/CarbonImpactHistoryContainer.query';

export const MswGetCarbonImpactHistoryHandler = graphql.query<GetCarbonImpactHistory, GetCarbonImpactHistoryVariables>(
  GET_CARBON_IMPACT_HISTORY,
  (req, res, ctx) => {
    return res(
      ctx.data({
        client: {
          __typename: 'Client',
          footprints: {
            __typename: 'CarbonFootprintList',
            items: [
              { __typename: 'CarbonFootprint', uuid: 'abc123', total: 12345, createdAt: new Date(2022, 3, 24) },
              { __typename: 'CarbonFootprint', uuid: 'def456', total: 67890, createdAt: new Date(2021, 3, 24) },
              { __typename: 'CarbonFootprint', uuid: 'ghi789', total: 12345.1, createdAt: new Date(2020, 3, 24) },
            ],
          },
        },
      }),
    );
  },
);

export const MswClientFootprintDeleteHandler = graphql.mutation<CarbonFootprintDelete, CarbonFootprintDeleteVariables>(
  CARBON_FOOTPRINT_DELETE,
  (req, res, ctx) => {
    return res(
      ctx.data({
        clientFootprintDelete: req.variables.carbonFootprintId,
      }),
    );
  },
);
