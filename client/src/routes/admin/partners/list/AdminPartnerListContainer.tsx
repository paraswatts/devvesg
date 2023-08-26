import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { ExternalLinkDisplay } from 'src/common/components/external-link-display';
import { LinkButton } from 'src/common/interactions/Button';
import { Partner } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminPartnerListContainer = React.memo(() => {
  const { t } = useTranslation();
  const [partnersQuery, partnersResponse] = useLazyQuery<null, { data: Partner[] }>(Api.partner.list);

  useEffect(() => {
    partnersQuery(null);
  }, [partnersQuery]);

  const partners = partnersResponse.response?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">{t('partner.list')}</h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.PARTNERS_NEW)}>{t('buttons.new')}</LinkButton.Primary>
      </div>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="w-1/3">{t('profile.name')}</td>
              <td className="w-1/3">{t('contact-email')}</td>
              <td className="w-1/3">{t('website')}</td>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => {
              return (
                <tr key={`partner-${p.uuid}`}>
                  <td>
                    <div className="align-middle">
                      {p.logo && <img className="w-10 inline-block mr-4" src={p.logo} alt={p.name} />}
                      <Link to={generatePath(AdminRoutes.PARTNERS_SHOW, { partnerUuid: p.uuid })}>{p.name}</Link>
                    </div>
                  </td>
                  <td>{p.contactEmail}</td>
                  <td>
                    <ExternalLinkDisplay href={p.websiteUrl}>{p.websiteUrl}</ExternalLinkDisplay>
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
