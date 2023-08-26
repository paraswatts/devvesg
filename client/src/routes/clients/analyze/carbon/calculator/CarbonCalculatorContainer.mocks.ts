import { graphql } from 'msw';

import {
  ClientFootprintCreate,
  ClientFootprintCreateVariables,
} from 'src/routes/clients/analyze/carbon/calculator/__gql__/ClientFootprintCreate';
import { CLIENT_FOOTPRINT_CREATE } from 'src/routes/clients/analyze/carbon/calculator/CarbonCalculatorContainer.query';

export const MswClientFootprintCreateHandler = graphql.mutation<ClientFootprintCreate, ClientFootprintCreateVariables>(
  CLIENT_FOOTPRINT_CREATE,
  (req, res, ctx) => {
    return res(
      ctx.data({
        clientFootprintCreate: {
          __typename: 'CarbonFootprint',
          total: req.variables.total,
          createdAt: new Date(2000, 0, 1),
        },
      }),
    );
  },
);
