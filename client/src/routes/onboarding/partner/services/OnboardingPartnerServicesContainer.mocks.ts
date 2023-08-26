import { graphql } from 'msw';

import {
  GetOnboardingPartnerServices,
  GetOnboardingPartnerServices_initiatives_items,
} from 'src/routes/onboarding/partner/services/__gql__/GetOnboardingPartnerServices';
import { GET_ONBOARDING_PARTNER_SERVICES } from 'src/routes/onboarding/partner/services/OnboardingPartnerServicesContainer.query';

const MockInitiative: GetOnboardingPartnerServices_initiatives_items = {
  __typename: 'Initiative',
  uuid: '9310c7ed-055b-446f-b124-8d0c0b164357',
  name: 'Energy Reduction',
  projectTypes: [
    {
      __typename: 'ProjectType',
      uuid: 'bd761012-967d-44d8-8cd8-2ea3a6e2c403',
      name: 'Determine Carbon Potential',
      requirementTypes: [
        {
          __typename: 'RequirementType',
          uuid: 'e6ef1938-0e04-4e3e-b44f-8e14edd32687',
          name: 'Carbon Management Service',
        },
      ],
    },
  ],
};

export const MswGetOnboardingServicesHandler = graphql.query<GetOnboardingPartnerServices>(
  GET_ONBOARDING_PARTNER_SERVICES,
  (req, res, ctx) => {
    return res(
      ctx.data({
        initiatives: { __typename: 'InitiativeList', items: [MockInitiative] },
        clientTypes: [{ __typename: 'ClientType', name: 'abcd', uuid: '123' }],
      }),
    );
  },
);
