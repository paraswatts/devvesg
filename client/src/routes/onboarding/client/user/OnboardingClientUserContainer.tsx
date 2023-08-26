import React from 'react';

import { generatePath, useNavigate } from 'react-router';

import { Api, ClientUpdateParams, UserNewParams, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { useOnboarding } from 'src/common/providers/onboarding.provider';
import { getDomainFromEmail } from 'src/common/util';
import { UserTypes } from 'src/interfaces';
import { OnboardingRoutes } from 'src/routes/onboarding';
import { CreateUserContainer } from 'src/routes/onboarding/CreateUserContainer';

export const OnboardingClientUserContainer = React.memo(() => {
  const { code } = useParams<{ code: string }>();

  // const { setToken } = useAuthentication();
  const navigate = useNavigate();
  const { setNewUserData } = useOnboarding();
  const [createAccountWithClientQuery] = useLazyQuery(async (user: UserNewParams) => {
    // They have an existing client- create the user and associate
    const createResp = await Api.user.new(user);
    // setToken(createResp.data.token);
    const fetchResponse = await Api.client.fetchClient({ clientUuid: createResp.data.clientUuid });
    const payload = fetchResponse.data;
    if (!payload.contactEmail) {
      payload.contactEmail = user.email;
    }
    if (!payload.websiteUrl) {
      payload.websiteUrl = getDomainFromEmail(user.email);
    }

    const params: ClientUpdateParams = {
      ...payload,
      clientUuid: payload.uuid,
      clientLocations: payload.clientLocations || [],
    };
    if (payload.vertical) {
      params.vertical = payload.vertical.uuid;
    }
    if (payload.clientType) {
      params.clientType = payload.clientType.uuid;
    }
    await Api.client.update(params);
    navigate(generatePath(OnboardingRoutes.VERIFY_ACCOUNT));
  });

  const onSubmit = (user: UserNewParams) => {
    const payload: UserNewParams = {
      ...user,
      type: UserTypes.CLIENT,
      code,
      userAgreementCompleted: true,
      dateAgreementCompleted: new Date(),
      onboardingComplete: false,
    };
    if (user.clientUuid) {
      createAccountWithClientQuery(payload);
    } else {
      // Means they are creating a new client
      // Would rather not get a type: Client without a client uuid in the DB, so we'll create the client and user on the next screen
      setNewUserData(payload);
      navigate(generatePath(OnboardingRoutes.CLIENT_COMPANY));
    }
  };
  return <CreateUserContainer userType={UserTypes.CLIENT} onSubmit={onSubmit} />;
});
