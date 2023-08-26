import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, generatePath } from 'react-router-dom';

import {
  SideNav,
  SideNavContentContainer,
  SideNavGroup,
  SideNavItem,
  SideNavLaunchpad,
  SideNavLayout,
  SideNavNavigationContainer,
} from 'src/common/layout';
import { useUser } from 'src/common/providers/UserProvider';
import {
  BaselineFormContainer,
  BaselineHistoryContainer,
  BaselineHistoryInstanceContainer,
  BaselineOverviewContainer,
  BaselineQuestionaireContainer,
} from 'src/routes/clients/analyze/baseline';
import {
  CarbonCalculatorContainer,
  CarbonImpactContainer,
  CarbonImpactHistoryContainer,
} from 'src/routes/clients/analyze/carbon';
import { ConfirmationContainer } from 'src/routes/clients/confirmation/ConfirmationContainer';
import {
  CarbonCreditsAddContainer,
  CarbonCreditsCreditsContainer,
  CarbonCreditsOverviewContainer,
  ClientNftViewContainer,
} from 'src/routes/clients/improve/carbon-credits';
import { ReduceImpactContainer } from 'src/routes/clients/improve/reduce-impact/ReduceImpactContainer';
import { InitiativePartnerSelectContainer } from 'src/routes/clients/initiative/InitiativePartnerSelect';
import { InitiativeProjectSelectContainer } from 'src/routes/clients/initiative/InitiativeProjectSelect';
import { InitiativeSelectContainer } from 'src/routes/clients/initiative/InitiativeSelect';
import { ClientProjectsContainer } from 'src/routes/clients/initiatives/ClientProjectsContainer';
import { LaunchpadContainer } from 'src/routes/clients/launchpad/LaunchpadContainer';
import { ClientProfileCompanyContainer } from 'src/routes/clients/profile/company/ClientProfileCompanyContainer';
import { ClientProvider, useClient } from 'src/routes/clients/providers/ClientProvider';
import { UserAgreementContainer } from 'src/routes/clients/user-agreement/UserAgreementContainer';

export const ClientRoutes = {
  LAUNCHPAD: '',
  CONFIRMATION: 'confirmation',
  REPORT: 'report',
  INITIATIVES: 'initiatives',
  INITIATIVE_SELECT: 'initiatives/new',
  INITIATIVE_PROJECT_SELECT: 'initiatives/new/:initiativeUuid',
  INITIATIVE_PARTNER_SELECT: 'initiatives/new/:initiativeUuid/project/:projectUuid',

  // Analyze
  CARBON_IMPACT: '/analyze/carbon/impact',
  CARBON_IMPACT_HISTORY: '/analyze/carbon/impact-history',
  CARBON_CALCULATOR: '/analyze/carbon/calculator',

  // Improve
  REDUCE_IMPACT: '/improve/reduce-impact',
  CARBON_CREDITS_OVERVIEW: '/improve/credits',
  CARBON_CREDITS_CREDITS: '/improve/credits/carbon-credits',
  PLASTIC_CREDITS_CREDITS: '/improve/credits/plastic-credits',
  CARBON_CREDITS_ADD: '/improve/credits/add',
  CARBON_CREDITS_VIEW: '/improve/credits/view/:nftUuid/:type',

  // Settings
  PROFILE_COMPANY_EDIT: '/profile/company',
  // Baseline
  BASELINE_OVERVIEW: '/analyze/esg-score/overview',
  BASELINE_HISTORY: '/analyze/esg-score/history',
  BASELINE_QUESTIONAIRE: '/analyze/esg-score/questionnaire',
  BASELINE_FORM: '/analyze/esg-score/questionnaire/:quizUuid',
  BASELINE_HISTORY_INSTANCE: '/analyze/esg-score/history/:quizInstanceUuid',
};

type ClientPath = `/clients/:clientUuid${'/' | ''}${string}`;
export const ClientAbsoluteRoutes: Record<keyof typeof ClientRoutes, ClientPath> = {
  LAUNCHPAD: `/clients/:clientUuid`,
  CONFIRMATION: `/clients/:clientUuid/confirmation`,
  REPORT: `/clients/:clientUuid/report`,
  INITIATIVES: `/clients/:clientUuid/initiatives`,
  INITIATIVE_SELECT: `/clients/:clientUuid/initiatives/new`,
  INITIATIVE_PROJECT_SELECT: `/clients/:clientUuid/initiatives/new/:initiativeUuid`,
  INITIATIVE_PARTNER_SELECT: `/clients/:clientUuid/initiatives/new/:initiativeUuid/project/:projectUuid`,

  // Analyze
  CARBON_IMPACT: '/clients/:clientUuid/analyze/carbon/impact',
  CARBON_IMPACT_HISTORY: '/clients/:clientUuid/analyze/carbon/impact-history',
  CARBON_CALCULATOR: '/clients/:clientUuid/analyze/carbon/calculator',

  // Improve
  REDUCE_IMPACT: '/clients/:clientUuid/improve/reduce-impact',
  CARBON_CREDITS_OVERVIEW: '/clients/:clientUuid/improve/credits',
  CARBON_CREDITS_CREDITS: '/clients/:clientUuid/improve/credits/carbon-credits',
  PLASTIC_CREDITS_CREDITS: '/clients/:clientUuid/improve/credits/plastic-credits',
  CARBON_CREDITS_ADD: '/clients/:clientUuid/improve/credits/add',

  // Settings
  PROFILE_COMPANY_EDIT: '/clients/:clientUuid/profile/company',
  CARBON_CREDITS_VIEW: '/clients/:clientUuid/improve/credits/view/:nftUuid/:type',
  // Baseline
  BASELINE_OVERVIEW: '/clients/:clientUuid/analyze/esg-score/overview',
  BASELINE_HISTORY: '/clients/:clientUuid/analyze/esg-score/history',
  BASELINE_QUESTIONAIRE: '/clients/:clientUuid/analyze/esg-score/questionnaire',
  BASELINE_FORM: '/clients/:clientUuid/analyze/esg-score/questionnaire/:quizUuid',
  BASELINE_HISTORY_INSTANCE: '/clients/:clientUuid/analyze/esg-score/history/:quizInstanceUuid',
};

export const ClientRouter = () => {
  const { user } = useUser();
  // Force a user to always sign the user agreement before accessing other routes
  if (!user.userAgreementCompleted) {
    return <UserAgreementRouter />;
  }

  return (
    <ClientProvider>
      <ApprovedRouter />
    </ClientProvider>
  );
};

const ApprovedRouter = () => {
  const {
    client: { uuid },
  } = useClient();
  const routeParams = useMemo(() => ({ clientUuid: uuid }), [uuid]);
  const { t } = useTranslation();

  return (
    <SideNavLayout>
      <SideNavNavigationContainer>
        <SideNav>
          <SideNavLaunchpad to={generatePath(ClientAbsoluteRoutes.LAUNCHPAD, routeParams)} end />
          <SideNavGroup label={t('launchpad.analyse')}>
            <SideNavItem to={generatePath(ClientAbsoluteRoutes.CARBON_IMPACT, routeParams)}>
              {t('launchpad.my-carbon-footprint')}
            </SideNavItem>
            <SideNavItem to={generatePath(ClientAbsoluteRoutes.CARBON_CALCULATOR, routeParams)}>
              {t('launchpad.carbon-calculator')}
            </SideNavItem>
            <SideNavItem to="" mock>
              {t('launchpad.my-esg-score')}
            </SideNavItem>
          </SideNavGroup>
          <SideNavGroup label={t('launchpad.improve')}>
            <SideNavItem to={generatePath(ClientAbsoluteRoutes.REDUCE_IMPACT, routeParams)}>
              {t('launchpad.reduce-my-impact')}
            </SideNavItem>
            <SideNavItem to={generatePath(ClientAbsoluteRoutes.INITIATIVES, routeParams)}>
              {t('launchpad.initiatives-and-projects')}
            </SideNavItem>
            <SideNavItem to={generatePath(ClientAbsoluteRoutes.CARBON_CREDITS_OVERVIEW, routeParams)}>
              {t('launchpad.esg-assets')}
            </SideNavItem>
          </SideNavGroup>
          <SideNavGroup label={t('questionnaire.baseline')}>
            <SideNavItem to={generatePath(ClientAbsoluteRoutes.BASELINE_OVERVIEW, routeParams)}>
              {t('questionnaire.esg-score')}
            </SideNavItem>
            <SideNavItem to={generatePath(ClientAbsoluteRoutes.BASELINE_QUESTIONAIRE, routeParams)}>
              {t('questionnaire.questionnaire')}
            </SideNavItem>
            <SideNavItem to={generatePath(ClientAbsoluteRoutes.BASELINE_HISTORY, routeParams)}>
              {t('questionnaire.history')}
            </SideNavItem>
          </SideNavGroup>
          <SideNavGroup label={t('launchpad.report')}>
            <SideNavItem to="" mock>
              {t('launchpad.esg-report')}
            </SideNavItem>
          </SideNavGroup>
        </SideNav>
      </SideNavNavigationContainer>

      <SideNavContentContainer>
        <Routes>
          <Route path={ClientRoutes.LAUNCHPAD} element={<LaunchpadContainer />} />
          <Route path={ClientRoutes.CONFIRMATION} element={<ConfirmationContainer />} />
          <Route path={ClientRoutes.INITIATIVES} element={<ClientProjectsContainer />} />
          <Route path={ClientRoutes.INITIATIVE_SELECT} element={<InitiativeSelectContainer />} />
          <Route path={ClientRoutes.INITIATIVE_PROJECT_SELECT} element={<InitiativeProjectSelectContainer />} />
          <Route path={ClientRoutes.INITIATIVE_PARTNER_SELECT} element={<InitiativePartnerSelectContainer />} />

          {/* Analyze */}
          <Route path={ClientRoutes.CARBON_IMPACT} element={<CarbonImpactContainer />} />
          <Route path={ClientRoutes.CARBON_IMPACT_HISTORY} element={<CarbonImpactHistoryContainer />} />
          <Route path={ClientRoutes.CARBON_CALCULATOR} element={<CarbonCalculatorContainer />} />

          {/* Improve */}
          <Route path={ClientRoutes.REDUCE_IMPACT} element={<ReduceImpactContainer />} />
          <Route path={ClientRoutes.CARBON_CREDITS_OVERVIEW} element={<CarbonCreditsOverviewContainer />} />
          <Route path={ClientRoutes.CARBON_CREDITS_CREDITS} element={<CarbonCreditsCreditsContainer type="1" />} />
          <Route path={ClientRoutes.PLASTIC_CREDITS_CREDITS} element={<CarbonCreditsCreditsContainer type="2" />} />
          <Route path={ClientRoutes.CARBON_CREDITS_ADD} element={<CarbonCreditsAddContainer />} />

          {/* Settings */}
          <Route path={ClientRoutes.PROFILE_COMPANY_EDIT} element={<ClientProfileCompanyContainer />} />

          {/* nft */}
          <Route path={ClientRoutes.PROFILE_COMPANY_EDIT} element={<ClientProfileCompanyContainer />} />
          <Route path={ClientRoutes.CARBON_CREDITS_VIEW} element={<ClientNftViewContainer />} />

          {/* Baseline */}
          <Route path={ClientRoutes.BASELINE_OVERVIEW} element={<BaselineOverviewContainer />} />
          <Route path={ClientRoutes.BASELINE_HISTORY} element={<BaselineHistoryContainer />} />
          <Route path={ClientRoutes.BASELINE_QUESTIONAIRE} element={<BaselineQuestionaireContainer />} />
          <Route path={ClientRoutes.BASELINE_FORM} element={<BaselineFormContainer />} />
          <Route path={ClientRoutes.BASELINE_HISTORY_INSTANCE} element={<BaselineHistoryInstanceContainer />} />
        </Routes>
      </SideNavContentContainer>
    </SideNavLayout>
  );
};

const UserAgreementRouter = () => (
  <Routes>
    <Route path={ClientRoutes.LAUNCHPAD} element={<UserAgreementContainer />} />
    <Route path="*" element={<Navigate to={ClientRoutes.LAUNCHPAD} />} />
  </Routes>
);
