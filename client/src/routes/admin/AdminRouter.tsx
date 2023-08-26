import { useTranslation } from 'react-i18next';
import { Route, Routes, generatePath } from 'react-router-dom';

import {
  SideNav,
  SideNavContentContainer,
  SideNavGroup,
  SideNavItem,
  SideNavLayout,
  SideNavNavigationContainer,
} from 'src/common/layout';
import { AdminApprovalContainer } from 'src/routes/admin/approvals/AdminApprovalContainer';
import { AdminClientListContainer } from 'src/routes/admin/clients/list/AdminClientListContainer';
import { AdminClientNewContainer } from 'src/routes/admin/clients/new/AdminClientNewContainer';
import { AdminClientShowContainer } from 'src/routes/admin/clients/show/AdminClientShowContainer';
import { AdminHomeContainer } from 'src/routes/admin/home/AdminHomeContainer';
import { AdminInitiativeListContainer } from 'src/routes/admin/initiatives/list/AdminInitiativeListContainer';
import { AdminInitiativeNewContainer } from 'src/routes/admin/initiatives/new/AdminInitiativeNewContainer';
import { AdminInitiativeShowContainer } from 'src/routes/admin/initiatives/show/AdminInitiativeShowContainer';
import { AdminPartnerListContainer } from 'src/routes/admin/partners/list/AdminPartnerListContainer';
import { AdminPartnerNewContainer } from 'src/routes/admin/partners/new/AdminPartnerNewContainer';
import { AdminPartnerShowContainer } from 'src/routes/admin/partners/show/AdminPartnerShowContainer';
import { AdminProjectTypeListContainer } from 'src/routes/admin/project-types/list/AdminProjectTypeListContainer';
import { AdminProjectTypeNewContainer } from 'src/routes/admin/project-types/new/AdminProjectTypeNewContainer';
import { AdminProjectTypeShowContainer } from 'src/routes/admin/project-types/show/AdminProjectTypeShowContainer';
import { AdminProjectListContainer } from 'src/routes/admin/projects/list/AdminProjectListContainer';
import { AdminProjectNewContainer } from 'src/routes/admin/projects/new/AdminProjectNewContainer';
import { AdminProjectShowContainer } from 'src/routes/admin/projects/show/AdminProjectShowContainer';
import { AdminRequirementTypeListContainer } from 'src/routes/admin/requirement-types/list/AdminRequirementTypeListContainer';
import { AdminRequirementTypeNewContainer } from 'src/routes/admin/requirement-types/new/AdminRequirementTypeNewContainer';
import { AdminRequirementTypeShowContainer } from 'src/routes/admin/requirement-types/show/AdminRequirementTypeShowContainer';
import { AdminRequirementListContainer } from 'src/routes/admin/requirements/list/AdminRequirementListContainer';
import { AdminRequirementNewContainer } from 'src/routes/admin/requirements/new/AdminRequirementNewContainer';
import { AdminRequirementShowContainer } from 'src/routes/admin/requirements/show/AdminRequirementShowContainer';
import { AdminRoutes as AdminAbsoluteRoutes } from 'src/routes/admin/routes';
import { AdminServiceListContainer } from 'src/routes/admin/services/list/AdminServiceListContainer';
import { AdminServiceNewContainer } from 'src/routes/admin/services/new/AdminServiceNewContainer';
import { AdminServiceShowContainer } from 'src/routes/admin/services/show/AdminServiceShowContainer';
import { AdminUserListContainer } from 'src/routes/admin/users/list/AdminUserListContainer';
import { AdminUserNewContainer } from 'src/routes/admin/users/new/AdminUserNewContainer';
import { AdminUserShowContainer } from 'src/routes/admin/users/show/AdminUserShowContainer';
import { AdminVerticalListContainer } from 'src/routes/admin/verticals/list/AdminVerticalListContainer';
import { AdminVerticalNewContainer } from 'src/routes/admin/verticals/new/AdminVerticalNewContainer';
import { AdminVerticalShowContainer } from 'src/routes/admin/verticals/show/AdminVerticalShowContainer';

import { AdminNftSaleContainer } from '../admin/nfts/sale/AdminNftSaleContainer';
import { AdminNftViewContainer } from '../admin/nfts/view/AdminNftViewContainer';
import { AdminCarbonCreditsContainer } from './nfts/list/AdminCarbonCreditsContainer';

const AdminClientRoutes = {
  CLIENTS_LIST: '',
  CLIENTS_NEW: 'new',
  CLIENTS_SHOW: ':clientUuid',
  PROJECTS_LIST: ':clientUuid/projects',
  PROJECTS_NEW: ':clientUuid/projects/new',
  PROJECTS_SHOW: ':clientUuid/projects/:projectUuid',
  REQUIREMENTS_LIST: ':clientUuid/projects/:projectUuid/requirements',
  REQUIREMENTS_NEW: ':clientUuid/projects/:projectUuid/requirements/new',
  REQUIREMENTS_SHOW: ':clientUuid/projects/:projectUuid/requirements/:requirementUuid',
};

const AdminInitiativeRoutes = {
  INITIATIVES_LIST: '',
  INITIATIVES_NEW: 'new',
  INITIATIVES_SHOW: ':initiativeUuid',
  PROJECT_TYPES_LIST: ':initiativeUuid/projectTypes',
  PROJECT_TYPES_NEW: ':initiativeUuid/projectTypes/new',
  PROJECT_TYPES_SHOW: ':initiativeUuid/projectTypes/:projectTypeUuid',
  REQUIREMENT_TYPES_LIST: ':initiativeUuid/projectTypes/:projectTypeUuid/requirementTypes',
  REQUIREMENT_TYPES_SHOW: ':initiativeUuid/projectTypes/:projectTypeUuid/requirementTypes/:requirementTypeUuid',
  REQUIREMENT_TYPES_NEW: ':initiativeUuid/projectTypes/:projectTypeUuid/requirementType/new',
};

const AdminPartnerRoutes = {
  PARTNERS_LIST: '',
  PARTNERS_NEW: 'new',
  PARTNERS_SHOW: ':partnerUuid',
};

const AdminServiceRoutes = {
  SERVICES_LIST: '',
  SERVICES_NEW: 'new',
  SERVICES_SHOW: ':serviceUuid',
};

const AdminUserRoutes = {
  USERS_LIST: '',
  USERS_NEW: 'new',
  USERS_SHOW: ':userUuid',
};

const AdminVertialRoutes = {
  VERTICALS_LIST: '',
  VERTICALS_NEW: 'new',
  VERTICALS_SHOW: ':verticalUuid',
};

const AdminNftsRoutes = {
  NFTS_LIST: '',
  NFTS_NEW: 'new',
  NFTS_VIEW: ':nftUuid/review',
  NFTS_SALE: ':nftUuid/sale',
};

export const AdminRoutes = {
  HOME: '',
  APPROVALS: 'approvals/*',
  ...AdminClientRoutes,
  ...AdminInitiativeRoutes,
  ...AdminPartnerRoutes,
  ...AdminServiceRoutes,
  ...AdminUserRoutes,
  ...AdminVertialRoutes,
  ...AdminNftsRoutes,
};
export const AdminRouter = () => {
  const { t } = useTranslation();

  return (
    <SideNavLayout>
      <SideNavNavigationContainer>
        <SideNav>
          <SideNavGroup label={t('admin.admin')}>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.HOME)} end>
              {t('home')}
            </SideNavItem>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.CLIENTS_LIST)}>{t('clients')}</SideNavItem>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.INITIATIVES_LIST)}>{t('initiatives')}</SideNavItem>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.PARTNERS_LIST)}>{t('partners')}</SideNavItem>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.SERVICES_LIST)}>{t('profile.services')}</SideNavItem>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.USERS_LIST)}>{t('users')}</SideNavItem>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.VERTICALS_LIST)}>{t('admin.verticals')}</SideNavItem>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.APPROVALS)}>{t('admin.approvals')}</SideNavItem>
            <SideNavItem to={generatePath(AdminAbsoluteRoutes.NFTS_LIST)}>{t('launchpad.esg-assets')}</SideNavItem>
          </SideNavGroup>
        </SideNav>
      </SideNavNavigationContainer>

      <SideNavContentContainer>
        <div className="px-8 py-10 bg-white shadow">
          <Routes>
            <Route path={AdminRoutes.HOME} element={<AdminHomeContainer />} />
            <Route path={AdminRoutes.APPROVALS} element={<AdminApprovalContainer />} />

            <Route path="clients/*">
              <Route path={AdminRoutes.CLIENTS_LIST} element={<AdminClientListContainer />} />
              <Route path={AdminRoutes.CLIENTS_NEW} element={<AdminClientNewContainer />} />
              <Route path={AdminRoutes.CLIENTS_SHOW} element={<AdminClientShowContainer />} />
              <Route path={AdminRoutes.PROJECTS_LIST} element={<AdminProjectListContainer />} />
              <Route path={AdminRoutes.PROJECTS_NEW} element={<AdminProjectNewContainer />} />
              <Route path={AdminRoutes.PROJECTS_SHOW} element={<AdminProjectShowContainer />} />
              <Route path={AdminRoutes.REQUIREMENTS_LIST} element={<AdminRequirementListContainer />} />
              <Route path={AdminRoutes.REQUIREMENTS_NEW} element={<AdminRequirementNewContainer />} />
              <Route path={AdminRoutes.REQUIREMENTS_SHOW} element={<AdminRequirementShowContainer />} />
            </Route>

            <Route path="initiatives/*">
              <Route path={AdminRoutes.INITIATIVES_LIST} element={<AdminInitiativeListContainer />} />
              <Route path={AdminRoutes.INITIATIVES_NEW} element={<AdminInitiativeNewContainer />} />
              <Route path={AdminRoutes.INITIATIVES_SHOW} element={<AdminInitiativeShowContainer />} />
              <Route path={AdminRoutes.PROJECT_TYPES_LIST} element={<AdminProjectTypeListContainer />} />
              <Route path={AdminRoutes.PROJECT_TYPES_NEW} element={<AdminProjectTypeNewContainer />} />
              <Route path={AdminRoutes.PROJECT_TYPES_SHOW} element={<AdminProjectTypeShowContainer />} />
              <Route path={AdminRoutes.REQUIREMENT_TYPES_LIST} element={<AdminRequirementTypeListContainer />} />
              <Route path={AdminRoutes.REQUIREMENT_TYPES_SHOW} element={<AdminRequirementTypeShowContainer />} />
              <Route path={AdminRoutes.REQUIREMENT_TYPES_NEW} element={<AdminRequirementTypeNewContainer />} />
            </Route>

            <Route path="partners/*">
              <Route path={AdminRoutes.PARTNERS_LIST} element={<AdminPartnerListContainer />} />
              <Route path={AdminRoutes.PARTNERS_NEW} element={<AdminPartnerNewContainer />} />
              <Route path={AdminRoutes.PARTNERS_SHOW} element={<AdminPartnerShowContainer />} />
            </Route>

            <Route path="services/*">
              <Route path={AdminRoutes.SERVICES_LIST} element={<AdminServiceListContainer />} />
              <Route path={AdminRoutes.SERVICES_NEW} element={<AdminServiceNewContainer />} />
              <Route path={AdminRoutes.SERVICES_SHOW} element={<AdminServiceShowContainer />} />
            </Route>

            <Route path="users/*">
              <Route path={AdminRoutes.USERS_LIST} element={<AdminUserListContainer />} />
              <Route path={AdminRoutes.USERS_NEW} element={<AdminUserNewContainer />} />
              <Route path={AdminRoutes.USERS_SHOW} element={<AdminUserShowContainer />} />
            </Route>

            <Route path="verticals/*">
              <Route path={AdminRoutes.VERTICALS_LIST} element={<AdminVerticalListContainer />} />
              <Route path={AdminRoutes.VERTICALS_NEW} element={<AdminVerticalNewContainer />} />
              <Route path={AdminRoutes.VERTICALS_SHOW} element={<AdminVerticalShowContainer />} />
            </Route>

            <Route path="nfts/*">
              <Route path={AdminRoutes.NFTS_LIST} element={<AdminCarbonCreditsContainer />} />
              <Route path={AdminRoutes.NFTS_VIEW} element={<AdminNftViewContainer />} />
              <Route path={AdminRoutes.NFTS_SALE} element={<AdminNftSaleContainer />} />
            </Route>
          </Routes>
        </div>
      </SideNavContentContainer>
    </SideNavLayout>
  );
};
