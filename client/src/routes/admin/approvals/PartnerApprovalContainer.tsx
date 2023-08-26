import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { Api, ApprovalStatuses, useLazyQuery } from 'src/api';
import { ExternalLinkDisplay } from 'src/common/components/external-link-display';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Select } from 'src/common/forms/Select';

import tableStyles from 'src/common/styles/Table.module.scss';

export const PartnerApprovalContainer = React.memo(() => {
  const { t } = useTranslation();
  const [unapprovedPartnersQuery, unapprovedPartnersResponse] = useLazyQuery(Api.admin.partner.unapproved);
  const [approveQuery] = useLazyQuery(Api.admin.partner.approve, {
    onSuccess: () => {
      unapprovedPartnersQuery(null);
    },
  });

  useEffect(() => {
    unapprovedPartnersQuery(null);
  }, [unapprovedPartnersQuery]);

  const changeStatus = (approvalStatus: ApprovalStatuses, partnerUuid: string) => {
    approveQuery({ partnerUuid, approvalStatus });
  };

  const partners = unapprovedPartnersResponse.response?.data;

  return (
    <div>
      {partners?.length ? (
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td>{t('profile.name')}</td>
              <td>{t('contact-email')}</td>
              <td>{t('website')}</td>
              <td>{t('project.action')}</td>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => {
              return (
                <tr key={partner.uuid}>
                  <td>{partner.name}</td>
                  <td>{partner.contactEmail}</td>
                  <td>
                    {<ExternalLinkDisplay href={partner.websiteUrl}>{partner.websiteUrl}</ExternalLinkDisplay> ||
                      t('placeholder.none')}
                  </td>
                  <td>
                    <FormGroup>
                      <Select
                        id={`action-${partner.uuid}`}
                        value={partner.approvalStatus}
                        data-testid="ApprovalSelect"
                        onChange={(event) => changeStatus(event.target.value as ApprovalStatuses, partner.uuid)}
                      >
                        <option value={ApprovalStatuses.APPROVED}>{ApprovalStatuses.APPROVED}</option>
                        <option value={ApprovalStatuses.PENDING}>{ApprovalStatuses.PENDING}</option>
                        <option value={ApprovalStatuses.DENIED}>{ApprovalStatuses.DENIED}</option>
                      </Select>
                    </FormGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center">{t('admin.no-pending-parnters')}</div>
      )}
    </div>
  );
});
