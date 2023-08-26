import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { Api, ApprovalStatuses, useLazyQuery } from 'src/api';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Select } from 'src/common/forms/Select';

import tableStyles from 'src/common/styles/Table.module.scss';

export const UserApprovalContainer = React.memo(() => {
  
  const { t } = useTranslation();
  const [unapprovedUsersQuery, unapprovedUsersResponse] = useLazyQuery(Api.admin.user.unapproved);
  const [approveQuery] = useLazyQuery(Api.admin.user.approve, {
    onSuccess: () => {
      unapprovedUsersQuery(null);
    },
  });

  useEffect(() => {
    unapprovedUsersQuery(null);
  }, [unapprovedUsersQuery]);

  const changeStatus = (approvalStatus: ApprovalStatuses, userUuid: string) => {
    approveQuery({ approvalStatus, userUuid });
  };

  const users = unapprovedUsersResponse.response?.data;

  return (
    <div>
      {users?.length ? (
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td>{t('profile.name')}</td>
              <td>{t('profile.email')}</td>
              <td>{t('project.partner')}</td>
              <td>{t('project.action')}</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.uuid}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.partner?.name}</td>
                  <td>
                    <FormGroup>
                      <Select
                        id={`action-${user.uuid}`}
                        value={user.approvalStatus}
                        data-testid="ApprovalSelect"
                        onChange={(event) => changeStatus(event.target.value as ApprovalStatuses, user.uuid)}
                      >
                        <option value={ApprovalStatuses.APPROVED}>{ApprovalStatuses.APPROVED}</option>
                        <option value={ApprovalStatuses.PENDING}>{ApprovalStatuses.PENDING}</option>
                        <option value={ApprovalStatuses.DENIED}>{ApprovalStatuses.DENIED}</option>
                      </Select>
                    </FormGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center">{t('admin.no-pending-users')}</div>
      )}
    </div>
  );
});
