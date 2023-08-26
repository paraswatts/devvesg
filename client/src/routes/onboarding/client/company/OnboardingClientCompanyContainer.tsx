import React, { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, generatePath, useNavigate } from 'react-router-dom';

import { Api, ClientNewParams, LoginResponse, UserNewParams, useLazyQuery } from 'src/api';
import { ClientForm } from 'src/common/components/page-forms';
import { ClientFormInputValues } from 'src/common/components/page-forms/ClientForm';
import { useOnboarding } from 'src/common/providers/onboarding.provider';
import { getDomainFromEmail } from 'src/common/util';
import { Client } from 'src/interfaces';
import { OnboardingRoutes } from 'src/routes/onboarding';
import {
  OnboardingCard,
  OnboardingFormContent,
  OnboardingHeader,
  OnboardingSubHeader,
} from 'src/routes/onboarding/common';

interface CreateClientParams {
  client: ClientNewParams;
  user: UserNewParams;
}
interface CreateClientResponse {
  client: Client;
  user: LoginResponse;
}
const createUserAndClient = async ({ client, user }: CreateClientParams): Promise<CreateClientResponse> => {
  const clientResponse = await Api.client.new(client);
  const userResponse = await Api.user.new({ ...user, clientUuid: clientResponse.data.uuid });
  return {
    user: userResponse.data,
    client: clientResponse.data,
  };
};

export const OnboardingClientCompanyContainer = React.memo(() => {
  const { t } = useTranslation();
  const { newUserData } = useOnboarding();
  // const { setToken } = useAuthentication();
  const navigate = useNavigate();
  const [createUserAndClientQuery, createUserAndClientResponse] = useLazyQuery<
    CreateClientParams,
    CreateClientResponse
  >(createUserAndClient, {
    onSuccess: async ({ client, user }) => {
      // setToken(user.token);
      navigate(generatePath(OnboardingRoutes.VERIFY_ACCOUNT));
    },
  });

  const onSubmit = (client: ClientNewParams) => {
    if (loading) {
      return;
    }

    if (newUserData) {
      if (newUserData.code) {
        client.code = newUserData.code;
      }
      createUserAndClientQuery({ client, user: newUserData });
    }
  };

  const loading = createUserAndClientResponse.status === 'loading';

  const email = newUserData?.email || '';
  const client = useMemo<ClientFormInputValues>(
    () => ({
      name: '',
      description: '',
      contactEmail: email,
      websiteUrl: getDomainFromEmail(email),
      clientLocations: [],
    }),
    [email],
  );

  // Edge case where they're pushing back buttons and getting into invalid states
  if (!newUserData) {
    return <Navigate to={generatePath(OnboardingRoutes.CLIENT_USER)} />;
  }

  return (
    <OnboardingCard>
      <OnboardingHeader>{t('onboarding.tell-us-more-about-organization')}</OnboardingHeader>
      <OnboardingSubHeader>{t('onboarding.tell-us-more-about-organization-sub')}</OnboardingSubHeader>

      <OnboardingFormContent>
        <ClientForm defaultValue={client} loading={loading} onboarding onSubmit={onSubmit} />
      </OnboardingFormContent>
    </OnboardingCard>
  );
});
