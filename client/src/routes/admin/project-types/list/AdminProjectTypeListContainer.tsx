import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, InitiativeFetchParams, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { Initiative, ProjectType } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminProjectTypeListContainer = React.memo(() => {
  const { initiativeUuid } = useParams<{ initiativeUuid: string }>();
  const { t } = useTranslation();
  const [projectTypesQuery, projectTypesResponse] = useLazyQuery<{ initiativeUuid: string }, { data: ProjectType[] }>(
    Api.projectType.list,
  );
  const [initiativeQuery, initiativeResponse] = useLazyQuery<InitiativeFetchParams, { data: Initiative }>(
    Api.admin.initiative.fetch,
  );

  useEffect(() => {
    projectTypesQuery({ initiativeUuid });
    initiativeQuery({ initiativeUuid });
  }, [initiativeQuery, initiativeUuid, projectTypesQuery]);

  if (!projectTypesResponse.response?.data || !initiativeResponse.response?.data) {
    return null;
  }

  const initiative = initiativeResponse.response.data;
  const projectTypes = projectTypesResponse.response.data;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">
          {initiative.name} {t('admin.project-type-list')}
        </h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.PROJECT_TYPES_NEW, { initiativeUuid })}>
          {t('buttons.new')}
        </LinkButton.Primary>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-2/3">{t('profile.name')}</td>
              <td>{t('admin.requirement-types')}</td>
            </tr>
          </thead>
          <tbody>
            {projectTypes.map((pt) => {
              return (
                <tr key={`project-type-${pt.uuid}`}>
                  <td>
                    <Show show={Boolean(pt.logo)}>
                      <img className="w-10 inline-block mr-4" src={pt.logo} alt={pt.name} />
                    </Show>
                    <Link
                      to={generatePath(AdminRoutes.PROJECT_TYPES_SHOW, { initiativeUuid, projectTypeUuid: pt.uuid })}
                    >
                      {pt.name}
                    </Link>
                  </td>
                  <td>
                    <LinkButton.Primary
                      to={generatePath(AdminRoutes.REQUIREMENT_TYPES_LIST, {
                        initiativeUuid,
                        projectTypeUuid: pt.uuid,
                      })}
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
