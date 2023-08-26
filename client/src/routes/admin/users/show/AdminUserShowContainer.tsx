import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { Api, ResetPasswordRequestParams, UserFetchParams, UserUpdateParams, useLazyQuery } from 'src/api';
import { UserForm } from 'src/common/components/page-forms/UserForm';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { User, UserTypes } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/routes';

export const AdminUserShowContainer = React.memo(() => {
  const { userUuid } = useParams<{ userUuid: string }>();
  const { t } = useTranslation();
  const [userQuery, userResponse] = useLazyQuery<UserFetchParams, { data: User }>(Api.admin.user.fetch);
  const [updateQuery, updateResponse] = useLazyQuery<UserUpdateParams, { data: User }>(Api.admin.user.update);
  const [requestResetQuery, requestResetResponse] = useLazyQuery<ResetPasswordRequestParams, { data: boolean }>(
    Api.auth.requestResetPasswordLink,
  );
  const [selectedUserType, setSelectedUserType] = useState<UserTypes>(UserTypes.ADMIN);

  useEffect(() => {
    userQuery({ userUuid });
  }, [userQuery, userUuid]);

  useEffect(() => {
    if (userResponse.status === 'resolved') {
      setSelectedUserType(userResponse.response!.data.type);
    }
  }, [userResponse, setSelectedUserType]);

  const onSubmit = (data: Omit<UserUpdateParams, 'userUuid'>) => {
    if (updateResponse.status === 'loading') {
      return;
    }

    const payload: UserUpdateParams = {
      ...data,
      userUuid,
    };

    updateQuery(payload);
  };

  if (updateResponse.status === 'resolved') {
    return <Navigate to={AdminRoutes.USERS_LIST} />;
  }

  if (!userResponse.response?.data) {
    return null;
  }

  const user = userResponse.response.data;

  const resetPassword = () => {
    requestResetQuery({ email: user.email });
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <h2 className="font-bold mt-2">
          {user.firstName} {user.lastName}
        </h2>
        <div className="text-right">
          <Button.Warning type="button" disabled={requestResetResponse.status === 'loading'} onClick={resetPassword}>
            {t('buttons.reset-user-password')}
          </Button.Warning>
        </div>
      </div>

      <UserForm user={user} userType={selectedUserType} onSubmit={onSubmit} />
    </div>
  );
});
