import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { AdminDashboardResponse, Api, useLazyQuery } from 'src/api';
import { LinkButton } from 'src/common/interactions/Button';
import { AdminRoutes } from 'src/routes/admin';

export const AdminHomeContainer = React.memo(() => {
  const routes: Partial<Record<keyof AdminDashboardResponse, string>> = {
    clients: AdminRoutes.CLIENTS_LIST,
    initiatives: AdminRoutes.INITIATIVES_LIST,
    partners: AdminRoutes.PARTNERS_LIST,
    users: AdminRoutes.USERS_LIST,
  };

  const { t } = useTranslation();
  const [dashboardStatsQuery, dashboardStatsResponse] = useLazyQuery<null, { data: AdminDashboardResponse }>(
    Api.admin.admin.dashboardStats,
  );

  useEffect(() => {
    dashboardStatsQuery(null);
  }, [dashboardStatsQuery]);

  if (dashboardStatsResponse.status !== 'resolved') {
    return null;
  }

  const data = dashboardStatsResponse.response!.data;

  return (
    <div>
      <h2 className="font-bold">{t('admin.admin-dashboard')}</h2>
      <div className="md:grid md:grid-cols-3">
        {Object.keys(data).map((key) => {
          const route = routes[key as keyof AdminDashboardResponse];
          return (
            <div className="mt-2 ml-2 mr-2 mb-6 md:mb-10 p-4 rounded-md text-center shadow-lg" key={key}>
              <h1 className="mb-0 text-4xl">{data[key as keyof AdminDashboardResponse]}</h1>
              <h2 className="uppercase">{t(`${key}`)}</h2>
              {route && (
                <LinkButton.Primary to={`/admin/${key}`} className="uppercase">
                  {t('buttons.view')} {t(`${key}`)}
                </LinkButton.Primary>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
