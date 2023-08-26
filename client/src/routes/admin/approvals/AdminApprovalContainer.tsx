import React from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Tab, Tabs } from 'src/common/components/tabs';
import { PartnerApprovalContainer } from 'src/routes/admin/approvals/PartnerApprovalContainer';
import { UserApprovalContainer } from 'src/routes/admin/approvals/UserApprovalContainer';
import { AdminRoutes as AdminAbsoluteRoutes } from 'src/routes/admin/routes';

export const AdminApprovalContainer = React.memo(() => {
  const { t } = useTranslation();

  const TABS = [
    {
      label: t('users'),
      path: `${AdminAbsoluteRoutes.APPROVALS}/users`,
    },
    {
      label: t('project.partners'),
      path: `${AdminAbsoluteRoutes.APPROVALS}/partners`,
    },
  ];

  return (
    <div>
      <h1>{t('admin.approvals')}</h1>
      <Tabs>
        {TABS.map((tab) => {
          return <Tab label={tab.label} key={tab.label} to={tab.path} />;
        })}
      </Tabs>
      <Routes>
        <Route path="users" element={<UserApprovalContainer />} />
        <Route path="partners" element={<PartnerApprovalContainer />} />
        <Route path="*" element={<Navigate to={`${AdminAbsoluteRoutes.APPROVALS}/users`} replace />} />
      </Routes>
    </div>
  );
});
