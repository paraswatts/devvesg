import { useTranslation } from 'react-i18next';
import { Navigate, generatePath } from 'react-router-dom';

import { LinkButton } from 'src/common/interactions/Button';
import { useOnboarding } from 'src/common/providers/onboarding.provider';
import { AuthRoutes } from 'src/routes/auth/routes';
import {
  OnboardingCard,
  OnboardingFormContent,
  OnboardingHeader
} from 'src/routes/onboarding/common';

export const OnboardingVerifyAccount = () => {
  const { t } = useTranslation();
  const { newUserData } = useOnboarding();

  if (!newUserData) {
    return <Navigate to={generatePath(AuthRoutes.LOGIN)} />;
  }
  
  return (
    <div className="flex items-center justify-center w-full">
      <OnboardingCard>
        <OnboardingHeader>{t('onboarding.account-created-message')}</OnboardingHeader>
        <OnboardingFormContent>
          {t('onboarding.account-verify-message')}
          <div className="text-center mt-7">
            <LinkButton.Primary to="/auth/login">
              {t('onboarding.go-to-login')}
            </LinkButton.Primary>
          </div>
        </OnboardingFormContent>
      </OnboardingCard>
    </div>
  );  
};
