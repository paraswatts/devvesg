import React, { ReactNode, useRef, useState } from 'react';

import {  useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Api, UserCheckExistsParams, UserNewParams, useLazyQuery } from 'src/api';
import { UserForm } from 'src/common/components/page-forms';
import { UserTypes } from 'src/interfaces';
import {
  OnboardingCard,
  OnboardingFormContent,
  OnboardingHeader,
  OnboardingSubHeader,
} from 'src/routes/onboarding/common';
import { OnboardingPartnerUserForm } from 'src/routes/onboarding/partner/user/OnboardingPartnerUserForm';

interface CreateUserContainerProps {
  userType: UserTypes;
  steps?: ReactNode;
  onSubmit: (user: UserNewParams) => void;
}

export const CreateUserContainer = React.memo((props: CreateUserContainerProps) => {
  const { t } = useTranslation();
  const { userType, steps, onSubmit } = props;
  const [customErrors, setCustomErrors] = useState<{ USER_EXISTS: string }>();
  const userRef = useRef<UserNewParams & { clientName?: string }>();
  const [checkExistsQuery, checkExistsResponse] = useLazyQuery<UserCheckExistsParams, { data: null }>(
    Api.user.checkExists,
    {
      onSuccess: () => {
        setCustomErrors(undefined);
        onSubmit(userRef.current!);
      },
      onError: (errors) => {
        setCustomErrors({ USER_EXISTS: errors.message });
      },
      disableErrorToast: true,
    },
  );

  const prepareSubmit = (user: UserNewParams) => {
    userRef.current = user;
    checkExistsQuery({ email: user.email });
  };

  const loading = checkExistsResponse.status === 'loading';

  return (
    <>
      <OnboardingCard>
        <OnboardingHeader>{t('onboarding.welcome')}</OnboardingHeader>
        <OnboardingSubHeader>
          {t('onboarding.welcome-subheading')}{' '}
          <Link to="/terms" target="_blank">
            {t('onboarding.terms-of-service')}
          </Link>
          .
        </OnboardingSubHeader>

        {steps && <div className="my-8">{steps}</div>}

        <OnboardingFormContent>
          {userType === UserTypes.PARTNER && (
            <OnboardingPartnerUserForm loading={loading} customErrors={customErrors} onSubmit={prepareSubmit} />
          )}

          {userType === UserTypes.CLIENT && (
            <UserForm onboarding userType={UserTypes.CLIENT} customErrors={customErrors} onSubmit={prepareSubmit} />
          )}
        </OnboardingFormContent>
      </OnboardingCard>
    </>
  );
});
