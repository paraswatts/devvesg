import { memo } from 'react';

import { generatePath } from 'react-router-dom';

import { Tab, Tabs } from 'src/common/components/tabs';
import { useParams } from 'src/common/hooks';
import { usePartner } from 'src/routes/partners/PartnerProvider';
import { PartnerAbsoluteRoutes } from 'src/routes/partners/PartnerRouter';

export const RequirementNavigation = memo(() => {
  const { partner } = usePartner();
  const { requirementUuid } = useParams<{ requirementUuid: string }>();
  const pathParams = {
    partnerUuid: partner.uuid,
    requirementUuid,
  };

  return (
    <div className="mb-6">
      <Tabs>
        <Tab label="Overview" to={generatePath(PartnerAbsoluteRoutes.REQUIREMENT_DETAILS, pathParams)} />
        <Tab label="Documents" to={generatePath(PartnerAbsoluteRoutes.REQUIREMENT_DOCUMENTS, pathParams)} />
      </Tabs>
    </div>
  );
});
