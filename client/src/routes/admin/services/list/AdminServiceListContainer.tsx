import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { LinkButton } from 'src/common/interactions/Button';
import { Service } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminServiceListContainer = React.memo(() => {
  const { t } = useTranslation();
  const [servicesQuery, servicesResponse] = useLazyQuery<null, { data: Service[] }>(Api.service.list);

  useEffect(() => {
    servicesQuery(null);
  }, [servicesQuery]);

  const services = servicesResponse.response?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">{t('admin.service-list')}</h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.SERVICES_NEW)}>{t('buttons.new')}</LinkButton.Primary>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-full">{t('profile.name')}</td>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => {
              return (
                <tr key={`service-${s.uuid}`}>
                  <td>
                    <Link to={generatePath(AdminRoutes.SERVICES_SHOW, { serviceUuid: s.uuid })}>{s.name}</Link>
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
