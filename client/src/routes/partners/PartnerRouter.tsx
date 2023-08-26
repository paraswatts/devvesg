import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, generatePath } from 'react-router-dom';

import { ApprovalStatuses } from 'src/api';
import {
  SideNav,
  SideNavContentContainer,
  SideNavGroup,
  SideNavItem,
  SideNavLayout,
  SideNavNavigationContainer,
} from 'src/common/layout';
import { useUser } from 'src/common/providers/UserProvider';
import { ConfirmationContainer } from 'src/routes/partners/confirmation/ConfirmationContainer';
import { PartnerEditContainer } from 'src/routes/partners/edit/PartnerEditContainer';
import { PartnerProvider, usePartner } from 'src/routes/partners/PartnerProvider';
import { RequestDetailsContainer } from 'src/routes/partners/requests/details';
import { RequestsListContainer } from 'src/routes/partners/requests/list';
import { RequirementDetailsContainer } from 'src/routes/partners/requirements/details';
import { RequirementDocumentsContainer } from 'src/routes/partners/requirements/documents';
import { RequirementsListContainer } from 'src/routes/partners/requirements/list';

export const PartnerRoutes = {
  SHOW: '',
  EDIT: 'edit',
  REQUIREMENTS: 'requirements',
  REQUIREMENT_DETAILS: 'requirements/:requirementUuid',
  REQUIREMENT_DOCUMENTS: 'requirements/:requirementUuid/documents',
  REQUESTS: 'requests',
  REQUEST_DETAILS: 'requests/:requestUuid',
};

type PartnerPath = `/partners/:partnerUuid${'/' | ''}${string}`;
export const PartnerAbsoluteRoutes: Record<keyof typeof PartnerRoutes, PartnerPath> = {
  SHOW: `/partners/:partnerUuid`,
  EDIT: `/partners/:partnerUuid/edit`,
  REQUIREMENTS: '/partners/:partnerUuid/requirements',
  REQUIREMENT_DETAILS: '/partners/:partnerUuid/requirements/:requirementUuid',
  REQUIREMENT_DOCUMENTS: '/partners/:partnerUuid/requirements/:requirementUuid/documents',
  REQUESTS: '/partners/:partnerUuid/requests',
  REQUEST_DETAILS: '/partners/:partnerUuid/requests/:requestUuid',
};

export const PartnerRouter = () => {
  const { user } = useUser();

  if (user.approvalStatus === ApprovalStatuses.APPROVED) {
    return (
      <PartnerProvider>
        <ApprovedRouter />
      </PartnerProvider>
    );
  } else {
    return <UnapprovedRouter />;
  }
};

const UnapprovedRouter = () => {
  return (
    <Routes>
      <Route path={PartnerRoutes.SHOW} element={<ConfirmationContainer />} />
      <Route path="*" element={<Navigate to={PartnerRoutes.SHOW} />} />
    </Routes>
  );
};

const ApprovedRouter = () => {
  const { partner } = usePartner();
  const { t } = useTranslation();

  if (partner.approvalStatus !== ApprovalStatuses.APPROVED) {
    return <UnapprovedRouter />;
  }

  return (
    <SideNavLayout>
      <SideNavNavigationContainer>
        <SideNav>
          <SideNavGroup label={t('launchpad.improve')}>
            <SideNavItem to={generatePath(PartnerAbsoluteRoutes.REQUIREMENTS, { partnerUuid: partner.uuid })}>
              {t('requirements')}
            </SideNavItem>
            <SideNavItem to={generatePath(PartnerAbsoluteRoutes.REQUESTS, { partnerUuid: partner.uuid })}>
              {t('partner.requests')}
            </SideNavItem>
          </SideNavGroup>
          <SideNavGroup label={t('global.header.settings')}>
            <SideNavItem to={generatePath(PartnerAbsoluteRoutes.EDIT, { partnerUuid: partner.uuid })}>
              {t('global.profile')}
            </SideNavItem>
          </SideNavGroup>
        </SideNav>
      </SideNavNavigationContainer>

      <SideNavContentContainer>
        <Routes>
          <Route path={PartnerRoutes.EDIT} element={<PartnerEditContainer />} />
          <Route path={PartnerRoutes.REQUIREMENTS} element={<RequirementsListContainer />} />
          <Route path={PartnerRoutes.REQUIREMENT_DETAILS} element={<RequirementDetailsContainer />} />
          <Route path={PartnerRoutes.REQUIREMENT_DOCUMENTS} element={<RequirementDocumentsContainer />} />
          <Route path={PartnerRoutes.REQUESTS} element={<RequestsListContainer />} />
          <Route path={PartnerRoutes.REQUEST_DETAILS} element={<RequestDetailsContainer />} />
          <Route
            path="*"
            element={<Navigate to={generatePath(PartnerRoutes.REQUIREMENTS, { partnerUuid: partner.uuid })} replace />}
          />
        </Routes>
      </SideNavContentContainer>
    </SideNavLayout>
  );
};
