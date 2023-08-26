import { Route, Routes } from 'react-router-dom';

import { ProvideOnboarding } from 'src/common/providers/onboarding.provider';
import { OnboardingClientCodeContainer } from 'src/routes/onboarding/client/code/OnboardingClientCodeContainer';
import { OnboardingClientCompanyContainer } from 'src/routes/onboarding/client/company/OnboardingClientCompanyContainer';
import { OnboardingClientUserContainer } from 'src/routes/onboarding/client/user/OnboardingClientUserContainer';
import { OnboardingVerifyAccount } from 'src/routes/onboarding/common/OnboardingVerifyAccount';
import { OnboardingPartnerCompanyContainer } from 'src/routes/onboarding/partner/company/OnboardingPartnerCompanyContainer';
import { OnboardingPartnerServicesContainer } from 'src/routes/onboarding/partner/services/OnboardingPartnerServicesContainer';
import { OnboardingPartnerUserContainer } from 'src/routes/onboarding/partner/user/OnboardingPartnerUserContainer';

export const OnboardingRoutes = {
  CLIENT_CODE: 'code',
  CLIENT_USER: 'create-account/client/:code',
  CLIENT_COMPANY: 'create-client',
  PARTNER_USER: 'create-account/partner',
  PARTNER_COMPANY: 'create-partner',
  PARTNER_SERVICES: 'partner-services',
  VERIFY_ACCOUNT: 'verify-account'
};

type OnboardingPath = `/onboarding/${string}`;
export const OnboardingAbsoluteRoutes: Record<keyof typeof OnboardingRoutes, OnboardingPath> = {
  CLIENT_CODE: `/onboarding/code`,
  CLIENT_USER: `/onboarding/create-account/client/:code`,
  CLIENT_COMPANY: `/onboarding/create-client`,
  PARTNER_USER: `/onboarding/create-account/partner`,
  PARTNER_COMPANY: `/onboarding/create-partner`,
  PARTNER_SERVICES: `/onboarding/partner-services`,
  VERIFY_ACCOUNT: `/onboarding/verify-account`
};

export const OnboardingRouter = () => {
  return (
    <ProvideOnboarding>
      <Routes>
        <Route path={OnboardingRoutes.CLIENT_CODE} element={<OnboardingClientCodeContainer />} />
        <Route path={OnboardingRoutes.CLIENT_USER} element={<OnboardingClientUserContainer />} />
        <Route path={OnboardingRoutes.CLIENT_COMPANY} element={<OnboardingClientCompanyContainer />} />
        <Route path={OnboardingRoutes.PARTNER_USER} element={<OnboardingPartnerUserContainer />} />
        <Route path={OnboardingRoutes.PARTNER_COMPANY} element={<OnboardingPartnerCompanyContainer />} />
        <Route path={OnboardingRoutes.PARTNER_SERVICES} element={<OnboardingPartnerServicesContainer />} />
        <Route path={OnboardingRoutes.VERIFY_ACCOUNT} element={<OnboardingVerifyAccount />} />
      </Routes>
    </ProvideOnboarding>
  );
};
