import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api } from 'src/api';
import { ExternalLinkDisplay } from 'src/common/components/external-link-display';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { Client } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminClientListContainer = React.memo(() => {
  const [clients, setClients] = useState<Client[]>([]);
  const { t } = useTranslation();

  const search = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value?.length > 2) {
      const matches = await Api.client.query({ query: evt.target.value });
      setClients(matches.data);
    } else {
      setClients([]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">{t('admin.client-list')}</h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.CLIENTS_NEW)}>{t('buttons.new')}</LinkButton.Primary>
      </div>
      <div className="w-1/2 mt-2 mb-2">
        <FormGroup>
          <Label htmlFor="search-term"></Label>
          <Input id="search-term" type="text" placeholder={t('placeholder.search')} onChange={search} />
        </FormGroup>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-1/4">{t('profile.name')}</td>
              <td className="w-1/4">{t('contact-email')}</td>
              <td className="w-1/4">{t('website')}</td>
              <td className="w-1/4">{t('projects')}</td>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => {
              return (
                <tr key={`client-${c.uuid}`}>
                  <td>
                    <div className="align-middle">
                      {c.logo && <img className="w-10 inline-block mr-4" src={c.logo} alt={c.name} />}
                      <Link to={generatePath(AdminRoutes.CLIENTS_SHOW, { clientUuid: c.uuid })}>{c.name}</Link>
                    </div>
                  </td>
                  <td>{c.contactEmail}</td>
                  <td>
                    <ExternalLinkDisplay href={c.websiteUrl}>{c.websiteUrl}</ExternalLinkDisplay>
                  </td>
                  <td>
                    <LinkButton.Primary small to={generatePath(AdminRoutes.PROJECTS_LIST, { clientUuid: c.uuid })}>
                      {t('buttons.view')}
                    </LinkButton.Primary>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Show show={clients.length === 0}>
          <div className="text-center">
            <h4>{t('admin.search-term-to-view-clients')}.</h4>
          </div>
        </Show>
      </div>
    </div>
  );
});
