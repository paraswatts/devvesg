import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { Button, LinkButton } from 'src/common/interactions/Button';
import { Project, Requirement } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminRequirementListContainer = React.memo(() => {
  const { t } = useTranslation();
  const { clientUuid, projectUuid } = useParams<{ clientUuid: string; projectUuid: string }>();
  const [projectQuery, projectResponse] = useLazyQuery<{ clientUuid: string; projectUuid: string }, { data: Project }>(
    Api.admin.project.fetch,
  );
  const [requirementsQuery, requirementsResponse] = useLazyQuery<
    { clientUuid: string; projectUuid: string },
    { data: Requirement[] }
  >(Api.admin.requirement.list);
  const [deleteQuery, deleteResponse] = useLazyQuery<
    { clientUuid: string; projectUuid: string; requirementUuid: string },
    { data: null }
  >(Api.admin.requirement.delete);

  useEffect(() => {
    projectQuery({ clientUuid, projectUuid });
    requirementsQuery({ clientUuid, projectUuid });
  }, [clientUuid, projectUuid, projectQuery, requirementsQuery]);

  useEffect(() => {
    if (deleteResponse.status === 'resolved') {
      requirementsQuery({ clientUuid, projectUuid });
    }
  }, [clientUuid, deleteResponse, projectUuid, requirementsQuery]);

  const onDeleteRequirement = (requirementUuid: string) => {
    if (deleteResponse.status === 'loading' || !window.confirm('Are you sure you want to remove this requirement?')) {
      return;
    }

    deleteQuery({ clientUuid, projectUuid, requirementUuid });
  };

  if (!projectResponse.response?.data || !requirementsResponse.response?.data) {
    return null;
  }

  const project = projectResponse.response.data;
  const requirements = requirementsResponse.response.data;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">
          {project.name} {t('admin.requirement-list')}
        </h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.REQUIREMENTS_NEW, { clientUuid, projectUuid })}>
          {t('buttons.new')}
        </LinkButton.Primary>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-1/3">{t('profile.name')}</td>
              <td className="w-1/3">{t('project.status')}</td>
              <td className="w-1/3">{t('global.delete')}</td>
            </tr>
          </thead>
          <tbody>
            {requirements.map((r) => {
              return (
                <tr key={`requirement-${r.uuid}`}>
                  <td>
                    <Link
                      to={generatePath(AdminRoutes.REQUIREMENTS_SHOW, {
                        clientUuid,
                        projectUuid,
                        requirementUuid: r.uuid,
                      })}
                    >
                      {r.name}
                    </Link>
                  </td>
                  <td>{r.status}</td>
                  <td>
                    <Button.Warning
                      onClick={() => onDeleteRequirement(r.uuid)}
                      type="button"
                      small
                      className="font-bold px-2"
                    >
                      &times;
                    </Button.Warning>
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
