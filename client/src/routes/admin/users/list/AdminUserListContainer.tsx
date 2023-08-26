import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, UserFetchParams, useLazyQuery } from 'src/api';
import { Button, LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { useUser } from 'src/common/providers/UserProvider';
import { User } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminUserListContainer = React.memo(() => {
  const { t } = useTranslation();
  const [usersQuery, usersResponse] = useLazyQuery<null, { data: User[] }>(Api.admin.user.list);
  const [deleteQuery, deleteResponse] = useLazyQuery<UserFetchParams, { data: null }>(Api.admin.user.delete);
  const { user } = useUser();

  useEffect(() => {
    usersQuery(null);
  }, [usersQuery]);

  useEffect(() => {
    if (deleteResponse.status === 'resolved') {
      usersQuery(null);
    }
  }, [deleteResponse, usersQuery]);

  const onDeleteUser = (userUuid: string) => {
    if (deleteResponse.status === 'loading' || !window.confirm(t('admin.remove-user'))) {
      return;
    }

    deleteQuery({ userUuid });
  };

  const users = usersResponse.response?.data || [];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">{t('admin.user-list')}</h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.USERS_NEW)}>{t('buttons.new')}</LinkButton.Primary>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-1/4">{t('profile.name')}</td>
              <td className="w-1/4">{t('profile.email')}</td>
              <td className="w-1/4">{t('improve.type-label')}</td>
              <td className="w-1/4">{t('global.delete')}</td>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              return (
                <tr key={`user-${u.uuid}`}>
                  <td>
                    <Link to={generatePath(AdminRoutes.USERS_SHOW, { userUuid: u.uuid })}>
                      {u.firstName} {u.lastName}
                    </Link>
                  </td>
                  <td>{u.email}</td>
                  <td className="capitalize">{u.type}</td>
                  <td>
                    <Show show={user.uuid !== u.uuid}>
                      <Button.Warning
                        onClick={() => onDeleteUser(u.uuid)}
                        type="button"
                        small
                        className="font-bold px-2"
                        disabled={deleteResponse.status === 'loading'}
                      >
                        &times;
                      </Button.Warning>
                    </Show>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});
