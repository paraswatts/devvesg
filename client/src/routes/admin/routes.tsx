export const AdminRoot = '/admin';

export const AdminRoutes = {
  HOME: `${AdminRoot}`,
  CLIENTS_LIST: `${AdminRoot}/clients`,
  CLIENTS_NEW: `${AdminRoot}/clients/new`,
  CLIENTS_SHOW: `${AdminRoot}/clients/:clientUuid`,
  INITIATIVES_LIST: `${AdminRoot}/initiatives`,
  INITIATIVES_NEW: `${AdminRoot}/initiatives/new`,
  INITIATIVES_SHOW: `${AdminRoot}/initiatives/:initiativeUuid`,
  PARTNERS_LIST: `${AdminRoot}/partners`,
  PARTNERS_NEW: `${AdminRoot}/partners/new`,
  PARTNERS_SHOW: `${AdminRoot}/partners/:partnerUuid`,
  PROJECTS_LIST: `${AdminRoot}/clients/:clientUuid/projects`,
  PROJECTS_NEW: `${AdminRoot}/clients/:clientUuid/projects/new`,
  PROJECTS_SHOW: `${AdminRoot}/clients/:clientUuid/projects/:projectUuid`,
  PROJECT_TYPES_LIST: `${AdminRoot}/initiatives/:initiativeUuid/projectTypes`,
  PROJECT_TYPES_NEW: `${AdminRoot}/initiatives/:initiativeUuid/projectTypes/new`,
  PROJECT_TYPES_SHOW: `${AdminRoot}/initiatives/:initiativeUuid/projectTypes/:projectTypeUuid`,
  REQUIREMENTS_LIST: `${AdminRoot}/clients/:clientUuid/projects/:projectUuid/requirements`,
  REQUIREMENTS_NEW: `${AdminRoot}/clients/:clientUuid/projects/:projectUuid/requirements/new`,
  REQUIREMENTS_SHOW: `${AdminRoot}/clients/:clientUuid/projects/:projectUuid/requirements/:requirementUuid`,
  REQUIREMENT_TYPES_LIST: `${AdminRoot}/initiatives/:initiativeUuid/projectTypes/:projectTypeUuid/requirementTypes`,
  REQUIREMENT_TYPES_SHOW: `${AdminRoot}/initiatives/:initiativeUuid/projectTypes/:projectTypeUuid/requirementTypes/:requirementTypeUuid`,
  REQUIREMENT_TYPES_NEW: `${AdminRoot}/initiatives/:initiativeUuid/projectTypes/:projectTypeUuid/requirementType/new`,
  SERVICES_LIST: `${AdminRoot}/services`,
  SERVICES_NEW: `${AdminRoot}/services/new`,
  SERVICES_SHOW: `${AdminRoot}/services/:serviceUuid`,
  USERS_LIST: `${AdminRoot}/users`,
  USERS_NEW: `${AdminRoot}/users/new`,
  USERS_SHOW: `${AdminRoot}/users/:userUuid`,
  VERTICALS_LIST: `${AdminRoot}/verticals/`,
  VERTICALS_NEW: `${AdminRoot}/verticals/new`,
  VERTICALS_SHOW: `${AdminRoot}/verticals/:verticalUuid`,
  APPROVALS: `${AdminRoot}/approvals`,
  NFTS_LIST: `${AdminRoot}/nfts`,
  NFTS_VIEW: `${AdminRoot}/nfts/:nftUuid/review`,
  NFTS_SALE: `${AdminRoot}/nfts/:nftUuid/sale`,
  NFTS_EDIT: `${AdminRoot}/nfts/:nftUuid/edit`,
  NFT_NEW: `${AdminRoot}/nfts/new`,
};
