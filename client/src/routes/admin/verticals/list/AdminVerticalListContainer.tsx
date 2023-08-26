import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, VerticalFetchParams, useLazyQuery } from 'src/api';
import { Button, LinkButton } from 'src/common/interactions/Button';
import { Vertical } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminVerticalListContainer = React.memo(() => {
  const { t } = useTranslation();
  const [verticalsQuery, verticalsResponse] = useLazyQuery<null, { data: Vertical[] }>(Api.vertical.list);
  const [deleteQuery, deleteResponse] = useLazyQuery<VerticalFetchParams, { data: null }>(Api.admin.vertical.delete);

  useEffect(() => {
    verticalsQuery(null);
  }, [verticalsQuery]);

  useEffect(() => {
    if (deleteResponse.status === 'resolved') {
      verticalsQuery(null);
    }
  }, [verticalsQuery, deleteResponse]);

  const onDeleteVertical = (verticalUuid: string) => {
    if (deleteResponse.status === 'loading' || !window.confirm(t('admin.remove-vertical'))) {
      return;
    }

    deleteQuery({ verticalUuid });
  };

  const verticals = verticalsResponse.response?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">{t('admin.vertical-list')}</h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.VERTICALS_NEW)}>{t('buttons.new')}</LinkButton.Primary>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-3/4">{t('profile.name')}</td>
              <td>{t('global.delete')}</td>
            </tr>
          </thead>
          <tbody>
            {verticals.map((v) => {
              return (
                <tr key={`service-${v.uuid}`}>
                  <td>
                    <Link to={generatePath(AdminRoutes.VERTICALS_SHOW, { verticalUuid: v.uuid })}>{v.name}</Link>
                  </td>
                  <td>
                    <Button.Warning
                      onClick={() => onDeleteVertical(v.uuid)}
                      type="button"
                      small
                      className="font-bold px-2"
                      disabled={deleteResponse.status === 'loading'}
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
