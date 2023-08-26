import { generatePath, useNavigate } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { UserAgreement } from 'src/common/components/user-agreement';
import { useParams } from 'src/common/hooks';
import { useUser } from 'src/common/providers/UserProvider';
import { ClientRoutes } from 'src/routes/clients';

export const UserAgreementContainer = () => {
  const { clientUuid } = useParams<{ clientUuid: string }>();
  const { setUser, user } = useUser();
  const navigate = useNavigate();

  const [agreementQuery, agreementResponse] = useLazyQuery<{}, { data: null }>(Api.auth.agreeToTerms, {
    onSuccess: () => {
      setUser({ userAgreementCompleted: true });
      if (!user.onboardingComplete)
        navigate(generatePath(ClientRoutes.PROFILE_COMPANY_EDIT, { clientUuid }));
      else
        navigate(generatePath(ClientRoutes.LAUNCHPAD, { clientUuid }));
    }
  });

  const handleAgree = () => {
    if (agreementResponse.status !== 'loading') {
      agreementQuery({});
    }
  };

  return <UserAgreement onAgree={handleAgree} loading={agreementResponse.status === 'loading'} />;
};
