import React from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { Api, UserNewParams, UserUpdateParams, useLazyQuery } from 'src/api';
import { UserForm } from 'src/common/components/page-forms/UserForm';
import { AdminRoutes } from 'src/routes/admin/routes';

export const AdminUserNewContainer = React.memo(() => {
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<UserNewParams, { data: UserNewParams }>(Api.admin.user.new);

  const onSubmit = (data: Omit<UserUpdateParams, 'userUuid'>, password?: string) => {
    if (createResponse.status === 'loading') {
      return;
    }
    const payload: UserNewParams = {
      ...data,
    };

    createQuery(payload);
  };

  if (createResponse.status === 'resolved') {
    return <Navigate to={AdminRoutes.USERS_LIST} />;
  }
  return (
    <div>
      <h2 className="font-bold">{t('admin.new-user')}</h2>
      <UserForm onSubmit={onSubmit} />
    </div>
  );
});
