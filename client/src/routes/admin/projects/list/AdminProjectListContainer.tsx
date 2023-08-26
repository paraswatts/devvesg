import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { Button, LinkButton } from 'src/common/interactions/Button';
import { Client, Project } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminProjectListContainer = React.memo(() => {
  const { t } = useTranslation();
  const { clientUuid } = useParams<{ clientUuid: string }>();
  const [clientQuery, clientResponse] = useLazyQuery<{ clientUuid: string }, { data: Client }>(Api.admin.client.fetch);
  const [projectsQuery, projectsResponse] = useLazyQuery<{ clientUuid: string }, { data: Project[] }>(
    Api.admin.project.list,
  );
  const [deleteQuery, deleteResponse] = useLazyQuery<{ clientUuid: string; projectUuid: string }, { data: null }>(
    Api.admin.project.delete,
  );

  useEffect(() => {
    clientQuery({ clientUuid });
    projectsQuery({ clientUuid });
  }, [clientUuid, clientQuery, projectsQuery]);

  useEffect(() => {
    if (deleteResponse.status === 'resolved') {
      projectsQuery({ clientUuid });
    }
  }, [clientUuid, deleteResponse, projectsQuery]);

  const onDeleteProject = (projectUuid: string) => {
    if (deleteResponse.status === 'loading' || !window.confirm(t('admin.remove-project'))) {
      return;
    }

    deleteQuery({ clientUuid, projectUuid });
  };

  if (!projectsResponse.response?.data || !clientResponse.response?.data) {
    return null;
  }

  const client = clientResponse.response.data;
  const projects = projectsResponse.response.data;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">
          {client.name} {t('admin.project-list')}
        </h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.PROJECTS_NEW, { clientUuid })}>
          {t('buttons.new')}
        </LinkButton.Primary>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-1/6">{t('profile.name')}</td>
              <td className="w-1/6">{t('project.status')}</td>
              <td className="w-1/6">{t('requirements')}</td>
              <td className="w-1/6">{t('global.delete')}</td>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => {
              return (
                <tr key={`project-${p.uuid}`}>
                  <td>
                    <Link to={generatePath(AdminRoutes.PROJECTS_SHOW, { clientUuid, projectUuid: p.uuid })}>
                      {p.name}
                    </Link>
                  </td>
                  <td>{p.status}</td>
                  <td>
                    <LinkButton.Primary
                      small
                      to={generatePath(AdminRoutes.REQUIREMENTS_LIST, { clientUuid, projectUuid: p.uuid })}
                    >
                      {t('buttons.view')}
                    </LinkButton.Primary>
                  </td>
                  <td>
                    <Button.Warning
                      onClick={() => onDeleteProject(p.uuid)}
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
