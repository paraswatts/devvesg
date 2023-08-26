import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { LinkButton } from 'src/common/interactions/Button';
import { Initiative } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminInitiativeListContainer = React.memo(() => {
  const { t } = useTranslation();
  const [initiativesQuery, initiativesResponse] = useLazyQuery<null, { data: Initiative[] }>(Api.initiative.list);

  useEffect(() => {
    initiativesQuery(null);
  }, [initiativesQuery]);

  const initiatives = initiativesResponse.response?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">{t('admin.initiative-list')}</h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.INITIATIVES_NEW)}>{t('buttons.new')}</LinkButton.Primary>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-1/2">{t('profile.name')}</td>
              <td className="w-1/2">{t('admin.project-types')}</td>
            </tr>
          </thead>
          <tbody>
            {initiatives.map((i) => {
              return (
                <tr key={`initiative-${i.uuid}`}>
                  <td>
                    <div className="align-middle">
                      <img className="w-10 inline-block mr-4" src={i.logo} alt={i.name} />
                      <Link to={generatePath(AdminRoutes.INITIATIVES_SHOW, { initiativeUuid: i.uuid })}>{i.name}</Link>
                    </div>
                  </td>
                  <td>
                    <LinkButton.Primary
                      to={generatePath(AdminRoutes.PROJECT_TYPES_LIST, { initiativeUuid: i.uuid })}
                      small
                    >
                      {t('buttons.view')}
                    </LinkButton.Primary>
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
