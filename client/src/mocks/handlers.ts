import { MswClientFootprintCreateHandler } from 'src/routes/clients/analyze/carbon/calculator/CarbonCalculatorContainer.mocks';
import {
  MswClientFootprintDeleteHandler,
  MswGetCarbonImpactHistoryHandler,
} from 'src/routes/clients/analyze/carbon/impact-history/CarbonImpactHistoryContainer.mocks';
import { MswGetLatestFootprintHandler } from 'src/routes/clients/analyze/carbon/impact/CarbonImpactContainer.mocks';
import {
  MswDisconnectPartnerHandler,
  MswGetProjects,
} from 'src/routes/clients/initiatives/ClientProjectsContainer.mocks';
import { MswGetClientForProviderHandler } from 'src/routes/clients/providers/ClientProvider.mocks';
import { MswGetOnboardingServicesHandler } from 'src/routes/onboarding/partner/services/OnboardingPartnerServicesContainer.mocks';
import { MswGetRequestHandler } from 'src/routes/partners/requests/details/RequestDetailsContainer.mocks';
import { MswGetRequestsHandler } from 'src/routes/partners/requests/list/RequestsListContainer.mocks';
import { MswGetRequirementHandler } from 'src/routes/partners/requirements/details/RequirementDetailsContainer.mocks';
import { MswGetRequirementDocumentsHandler } from 'src/routes/partners/requirements/documents/RequirementDocumentsContainer.mocks';
import { MswGetRequirementsHandler } from 'src/routes/partners/requirements/list/RequirementsListContainer.mocks';

export const handlers = [
  MswClientFootprintCreateHandler,
  MswClientFootprintDeleteHandler,
  MswDisconnectPartnerHandler,
  MswGetCarbonImpactHistoryHandler,
  MswGetLatestFootprintHandler,
  MswGetClientForProviderHandler,
  MswGetOnboardingServicesHandler,
  MswGetProjects,
  MswGetRequestHandler,
  MswGetRequestsHandler,
  MswGetRequirementHandler,
  MswGetRequirementDocumentsHandler,
  MswGetRequirementsHandler,
];
