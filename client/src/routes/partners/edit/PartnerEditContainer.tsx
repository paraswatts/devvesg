import React from 'react';

import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { Api, PartnerNewParams, PartnerUpdateParams, useLazyQuery } from 'src/api';
import { PartnersForm } from 'src/common/components/page-forms/PartnersForm';
import { Partner } from 'src/interfaces';
import { PartnerRoutes } from 'src/routes/partners';
import { usePartner } from 'src/routes/partners/PartnerProvider';

export const PartnerEditContainer = React.memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { partner, setPartner } = usePartner();

  const [updateQuery] = useLazyQuery<PartnerUpdateParams, { data: Partner }>(Api.partner.edit, {
    onSuccess: (response) => {
      setPartner(response.data);
      navigate(generatePath(PartnerRoutes.SHOW, { partnerUuid: partner.uuid }));
    },
  });

  const onSubmit = (newValue: PartnerNewParams) => {
    updateQuery({ partnerUuid: partner.uuid, ...newValue });
  };

  return (
    <div className="flex-grow min-w-0 px-8 py-10 bg-white shadow">
      <div className="w-1/2">
        <h1>
          {t('global.header.settings')} {'>'} {t('global.profile')}
        </h1>
        <PartnersForm onSubmit={onSubmit} currentValues={partner} />
      </div>
    </div>
  );
});
