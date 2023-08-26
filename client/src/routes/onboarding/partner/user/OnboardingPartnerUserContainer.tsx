import React from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { UserNewParams } from 'src/api';
import { OrderedActivitySteps } from 'src/common/components/ordered-activity-steps/OrderedActivitySteps';
import { useOnboarding } from 'src/common/providers/onboarding.provider';
import { UserTypes } from 'src/interfaces';
import { OnboardingRoutes } from 'src/routes/onboarding';
import { CreateUserContainer } from 'src/routes/onboarding/CreateUserContainer';
import { PARTNER_ONBOARDING_STEPS, PARTNER_ONBOARDING_STEP_USER } from 'src/routes/onboarding/partner/utils';

export const OnboardingPartnerUserContainer = React.memo(() => {
  const { setNewUserData } = useOnboarding();
  const navigate = useNavigate();

  const onSubmit = (user: UserNewParams) => {
    const payload: UserNewParams = {
      ...user,
      type: UserTypes.PARTNER,
      userAgreementCompleted: true,
      dateAgreementCompleted: new Date(),
      onboardingComplete: false,
    };
    // Would rather not get a type: Partner without a partner uuid in the DB, so we'll create the partner and user on the following screens
    setNewUserData(payload);
    navigate(generatePath(OnboardingRoutes.PARTNER_COMPANY));
  };

  return (
    <CreateUserContainer
      userType={UserTypes.PARTNER}
      steps={<OrderedActivitySteps active={PARTNER_ONBOARDING_STEP_USER} steps={PARTNER_ONBOARDING_STEPS} />}
      onSubmit={onSubmit}
    />
  );
});
