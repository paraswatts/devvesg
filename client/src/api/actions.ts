import { destroy, get, post, put } from 'src/api/client';
import {
  Client,
  ClientPartnerLocation,
  ClientType,
  CreditType,
  Initiative,
  Nft,
  NftSale,
  NftType,
  PaginationParams,
  Partner,
  Project,
  ProjectRequirementStatuses,
  ProjectType,
  QuizHistory,
  Requirement,
  RequirementDocument,
  RequirementDocumentTypes,
  RequirementType,
  ResponseOK,
  RetireNFT,
  Service,
  TablePagination,
  User,
  UserTypes,
  Vertical,
  WalletRegistration,
} from 'src/interfaces';
import {
  CreateQuizInstance,
  QuizAnswersPayload,
  QuizInstance,
  QuizQuestionAnswer,
  QuizSubmitPayload,
} from 'src/routes/clients/analyze/baseline/common/__gql__/GetQuiz';

export type LoginParams = {
  email: string;
  password: string;
};

export type UpdateOnboardingParams = {
  userUuid: string;
};

export enum ApprovalStatuses {
  PENDING = 'Pending Approval',
  APPROVED = 'Approved',
  DENIED = 'Denied',
}

export enum NftStatuses {
  PENDING = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
  DENIED = 'DENIED',
  OWNED = 'OWNED',
  SOLD = 'SOLD',
  RETIRED = 'RETIRED',
  DECLINED = 'DECLINED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  LISTED_FOR_SALE = 'LISTED_FOR_SALE'
}

export enum WalletErrorStatus {
  CONNECTION_TIME_OUT = 'CONNECTION_TIME_OUT',
  EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',
  SERVER_ERROR = 'SERVER_ERROR',
  OK = 'OK',
  NO_WALLET = 'NO_WALLET'
}

export enum WalletEmailVerificationStatus {
  YES = 'YES',
  NO = 'NO'
}

export type UserWalletStatus = {
  status?: string;
  error?: string;
  message?: string;
  success?: boolean;
  isVerified?: string; // YES, NO
  isWalletSessionActive?: boolean;
}

export type LoginResponse = {
  token: string;
  expires: string;
  firstName: string;
  lastName: string;
  email: string;
  uuid: string;
  type: UserTypes;
  clientUuid: string;
  partnerUuid: string;
  userAgreementCompleted: boolean;
  onboardingComplete: boolean;
  code: string;
  approvalStatus?: ApprovalStatuses | null;
  userWallet: UserWalletStatus;
  clientWallet: UserWalletStatus;
  partnerWallet: UserWalletStatus;
};

export type RequirementFetchParams = ProjectFetchParams & { requirementUuid: string };

export type RequirementNewParams = ProjectFetchParams & {
  name: string;
  description: string;
  status: ProjectRequirementStatuses;
  partnerUuid: string;
  projectCode: string;
  areaCode: string;
  endDate?: Date | null;
  startDate?: Date | null;
};

export type RequirementUpdateParams = RequirementNewParams & { requirementUuid: string };

export type RequirementDocumentFetchParams = {
  partnerUuid: string;
  requirementUuid: string;
  requirementDocumentUuid: string;
};

export type RequirementDocumentNewParams = {
  name: string;
  file: string;
  type: RequirementDocumentTypes;
  requirementUuid: string;
  partnerUuid: string;
};

export type ClientFetchParams = {
  clientUuid: string;
};

export type ApiQueryParams = {
  query: string;
};

export type ClientNewParams = {
  name: string;
  description?: string;
  logo?: FormDataEntryValue | File | null;
  contactEmail: string;
  websiteUrl?: string;
  contactPhoneNumber?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  vertical?: Vertical | string;
  clientType?: ClientType | string;
  clientLocations?: ClientPartnerLocation[];
  code?: string;
};
export type ClientUpdateParams = ClientNewParams & { clientUuid: string };
export type ForgotPasswordFetchParams = { passwordToken: string };
export type ForgotPasswordUpdateParams = ForgotPasswordFetchParams & {
  newPassword: string;
  newPasswordConfirm: string;
};
export type ResetPasswordRequestParams = { email: string };
export type UnsubscribePartnerParams = { partnerId: string };
export type UnsubscribePartnerResponse = null;

export type InitiativeFetchParams = {
  initiativeUuid: string;
};

export type InitiativeNewParams = {
  name: string;
  objective: string;
  logo: FormDataEntryValue | null;
};
export type InitiativeUpdateParams = InitiativeNewParams & { initiativeUuid: string };
export type PartnerFetchParams = {
  partnerUuid: string;
};
export type PartnerNewParams = {
  name: string;
  description: string;
  logo: FormDataEntryValue | null;
  contactEmail: string;
  contactPhoneNumber: string;
  websiteUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  linkedInUrl: string;
  serviceIds: string[];
  country?: string;
  province?: string | null;
  verticalId?: string;
  serviceLocations?: ClientPartnerLocation[];
  clientTypes?: { uuid: string }[];
  projectTimeline?: number | null;
  hubspotId?: string | null;
};

export type PartnerUpdateParams = PartnerNewParams & { partnerUuid: string };
export type PartnerOnboardingParams = {
  initiatives: {
    initiativeUuid: string;
    projectTypeUuid: string;
    requirementTypeUuid: string;
  }[];
  partnerUuid: string;
};
export type PartnerApprovalParams = {
  partnerUuid: string;
  approvalStatus: ApprovalStatuses;
};
export type ProjectFetchParams = {
  projectUuid: string;
  clientUuid: string;
};
export type ProjectNewParams = {
  name: string;
  description: string;
  status: ProjectRequirementStatuses;
  startDate?: Date | null;
  endGoalDate?: Date | null;
  completionDate?: Date | null;
  clientUuid: string;
  projectTypeUuid: string;
};

export type ProjectUpdateParams = Omit<ProjectNewParams, 'projectTypeUuid'> & { projectUuid: string };
export type ProjectTypeFetchParams = {
  projectTypeUuid: string;
  initiativeUuid: string;
};
export type ClientProjectStatusUpdateParams = {
  status: ProjectRequirementStatuses;
  startDate?: Date | null;
  endGoalDate?: Date | null;
  completionDate?: Date | null;
  clientUuid: string;
  projectUuid: string;
};

export type ClientRequirementStatusUpdateParams = {
  status: ProjectRequirementStatuses;
  startDate?: Date | null;
  endDate?: Date | null;
  clientUuid: string;
  projectUuid: string;
  requirementUuid: string;
};
export type ProjectTypeNewParams = {
  name: string;
  objective: string;
  initiativeUuid: string;
  requirementTypes: string[];
  logo: FormDataEntryValue | null;
};
export type ProjectTypeUpdateParams = ProjectTypeNewParams & { projectTypeUuid: string };

export type RequirementTypeNewParams = {
  name: string;
  description: string;
  initiativeUuid: string;
  projectTypeUuid: string;
  partnerUuids: string[];
};
export type RequirementTypeFetchParams = {
  projectTypeUuid: string;
  initiativeUuid: string;
  requirementTypeUuid: string;
};
export type RequirementTypeUpdateParams = RequirementTypeNewParams & { requirementTypeUuid: string };
export type RequirementTypeSortOrderParams = {
  initiativeUuid: string;
  projectTypeUuid: string;
  requirementTypes: RequirementType[];
};

export type ServiceFetchParams = {
  serviceUuid: string;
};
export type ServiceNewParams = {
  name: string;
};
export type ServiceUpdateParams = ServiceNewParams & { serviceUuid: string };

export type VerticalFetchParams = {
  verticalUuid: string;
};
export type VerticalNewParams = {
  name: string;
};
export type VerticalUpdateParams = VerticalNewParams & { verticalUuid: string };
export type UpdatePasswordParams = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};
export type UserFetchParams = {
  userUuid: string;
};
export type UserNewParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: UserTypes;
  clientUuid?: string;
  partnerUuid?: string;
  password?: string;
  passwordConfirm?: string;
  code?: string;
  onboardingComplete?: boolean;
  userAgreementCompleted?: boolean;
  dateAgreementCompleted?: Date;
};

export type UserUpdateParams = UserNewParams & { userUuid: string };

export type UserCheckExistsParams = { email: string };

export type UserApprovalParams = {
  userUuid: string;
  approvalStatus: ApprovalStatuses;
};

export type VerifyCodeParams = {
  code: string;
};

export type AdminDashboardResponse = {
  clients: number;
  initiatives: number;
  partners: number;
  users: number;
  projects: number;
  requirements: number;
};

export type NftReviewUpdateParams = {
  uuid?: string
  comment?: string,
  status?: string,
}

export type NftListParams = {
  uuid?: string,  //(string) (required) - session ID
  forSale?: boolean,   // (boolean) (optional) - if true, list only NFTs that are available for sale. If false or not set, list all NFTs.
  startTime?: number, // (integer)(optional)- exclude NFTs minted before this time
  endTime?: number// (integer)(optional)- exclude NFTs minted after this time
  sellerAddrs?: string[], // (list of strings)(optional)- only return NFTs with owner wallets that are in this list of publice addresses
  mintIds?: string[],//(list of strings)(optional)- only return NFTs from these minting runs
  sellerNames?: string[],// (list of strings)(optional)- only return NFTs with owners that are in this list of usernames
  minPrice?: number// (integer)(optional)- only return NFTs above this price
  maxPrice?: number// (integer)(optional)- only return NFTs below this price
  nftTypes?: string[], // (list of strings)(optional)- only return NFTs with one of the given types
  saleCurrencies?: string[], // (list of strings)(optional)- only return NFTs listed for sale with this currency
  nftUris?: string[], // (list of DevvURIs as strings)(optional)- only return these NFTs
  page?: number,  // (positive integer as string) (optional) - The page to request sorted from oldest on page 1 to newest on the highest page.(Defaults to 1).
  perPage?: number,  // (positive integer as string) (optional) - The number of elements to return in each page. (Defaults to 100, maximum 1000).
}
export type NftNewParams = {
  assetName?: string;
  creator?: string;
  assetDescription?: string;
  artist?: string;
  amount?: string;
  forSale?: boolean;
  salePrice?: string;
  saleCurrency?: string;
  saleDescription?: string;
  saleLocation?: string;
  saleLink?: string;
  nftType?: string;
  projectFromDate?: number;
  projectToDate?: number;
  methodology?: string;
  projectType?: string;
  projectName?: string;
  projectDescription?: string;
  projectActivity?: string;
  projectCode?: string;
  projectId?: string;
  projectBatchId?: string;
  projectTicker?: string;
  geography?: string;
  locationCoordinates?: string;
  projectStandard?: string;
  creditType?: { uuid: string, type?: string };
  projectVintage?: string;
  projectVerifier?: string;
  projectValidator?: string;
  publicRegistry?: string;
  publicRegistryLink?: string;
  nftTypeUuid?: string
  creditCount?: string,
  asset?: FormDataEntryValue | File | null;
  createdBy?: { uuid: string };
  creditTypeUuid?: string;
  type?: string;
};

export interface NftFormValues {
  assetName?: string;
  creator?: string;
  assetDescription?: string;
  artist?: string;
  amount?: string;
  forSale?: boolean;
  salePrice?: string;
  saleCurrency?: string;
  saleDescription?: string;
  saleLocation?: string;
  saleLink?: string;
  nftType?: string;
  projectFromDate?: Date;
  projectToDate?: Date;
  methodology?: string;
  projectType?: string;
  projectName?: string;
  projectDescription?: string;
  projectActivity?: string;
  projectCode?: string;
  projectId?: string;
  projectBatchId?: string;
  projectTicker?: string;
  geography?: string;
  locationCoordinates?: string;
  projectStandard?: string;
  creditType?: { uuid: string, type?: string };
  projectVintage?: string;
  projectVerifier?: string;
  projectValidator?: string;
  publicRegistry?: string;
  publicRegistryLink?: string;
  creditCount?: string;
  asset?: FormDataEntryValue | File | null;
  createdBy?: { uuid: string };
}

export interface NFTOverviewPageData {
  totalCreditImpact?: number;
  totalOwnedCredit?: number;
  totalCredisPurchased?: number;
}

export const Api = {
  auth: {
    currentUser: () => {
      return get<{ data: LoginResponse }>('/api/auth/currentUser');
    },
    login: (params: LoginParams) => {
      return post<{ data: LoginResponse }>('/api/auth/login', { ...params });
    },
    updatePassword: (params: UpdatePasswordParams) => {
      return put<{ data: null }>('/api/auth/password', { ...params });
    },
    updateForgottenPassword: (params: ForgotPasswordUpdateParams) => {
      return put<{ data: User }>(`/api/auth/resetPassword/`, params);
    },
    requestResetPasswordLink: (params: ResetPasswordRequestParams) => {
      return post<{ data: boolean }>(`/api/auth/forgotPassword`, params);
    },
    agreeToTerms: (params: {}) => {
      return put<{ data: null }>(`/api/auth/agreeToTerms`, params);
    },
    unsubscribePartner: (params: UnsubscribePartnerParams) => {
      return post<{ data: UnsubscribePartnerResponse }>(`/api/email/unsubscribe/partner`, params);
    },
  },
  admin: {
    admin: {
      dashboardStats: () => {
        return get<{ data: AdminDashboardResponse }>(`/api/admin/admin/dashboard-stats`);
      },
    },
    client: {
      fetch: (params: ClientFetchParams) => {
        const { clientUuid } = params;

        return get<{ data: Client }>(`/api/admin/clients/${clientUuid}`);
      },
      new: (params: ClientNewParams) => {
        const formData = new FormData();
        Object.keys(params).forEach((k: string) => {
          if (params.hasOwnProperty(k)) {
            if (k === 'clientLocations') {
              formData.append(k, JSON.stringify(params[k as keyof ClientNewParams]));
            } else {
              formData.append(k, params[k as keyof ClientNewParams] as string | Blob);
            }
          }
        });
        return post<{ data: Client }>('/api/admin/clients', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
    },
    initiative: {
      fetch: (params: InitiativeFetchParams) => {
        const { initiativeUuid } = params;

        return get<{ data: Initiative }>(`/api/admin/initiatives/${initiativeUuid}`);
      },
      new: (params: InitiativeNewParams) => {
        const formData = new FormData();
        Object.keys(params).forEach((k: string) => {
          if (params.hasOwnProperty(k)) {
            formData.append(k, params[k as keyof InitiativeNewParams] as string | Blob);
          }
        });
        return post<{ data: Initiative }>('/api/admin/initiatives', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
      update: (params: InitiativeUpdateParams) => {
        const { initiativeUuid, ...rest } = params;
        const formData = new FormData();
        Object.keys(rest).forEach((k: string) => {
          if (rest.hasOwnProperty(k)) {
            formData.append(k, rest[k as keyof InitiativeNewParams] as string | Blob);
          }
        });
        return put<{ data: Initiative }>(`/api/admin/initiatives/${initiativeUuid}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
    },
    partner: {
      fetch: (params: PartnerFetchParams) => {
        const { partnerUuid } = params;

        return get<{ data: Partner }>(`/api/admin/partners/${partnerUuid}`);
      },
      update: (params: PartnerUpdateParams) => {
        const { partnerUuid, serviceIds, ...rest } = params;
        const formData = new FormData();
        Object.keys(rest).forEach((k: string) => {
          if (rest.hasOwnProperty(k)) {
            formData.append(k, rest[k as keyof Omit<PartnerNewParams, 'serviceIds'>] as string | Blob);
          }
        });
        formData.append('serviceIds', JSON.stringify(serviceIds));
        return put<{ data: Partner }>(`/api/admin/partners/${partnerUuid}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
      unapproved: () => {
        return get<{ data: Partner[] }>(`/api/admin/partners/unapproved`);
      },
      approve: (params: PartnerApprovalParams) => {
        const { partnerUuid, approvalStatus } = params;
        return put<{ data: Partner }>(`/api/admin/partners/approve/${partnerUuid}`, { approvalStatus });
      },
    },
    project: {
      delete: (params: ProjectFetchParams) => {
        const { clientUuid, projectUuid } = params;

        return destroy<{ data: null }>(`/api/admin/clients/${clientUuid}/projects/${projectUuid}`);
      },
      fetch: (params: ProjectFetchParams) => {
        const { clientUuid, projectUuid } = params;

        return get<{ data: Project }>(`/api/admin/clients/${clientUuid}/projects/${projectUuid}`);
      },
      list: (params: ClientFetchParams) => {
        const { clientUuid } = params;

        return get<{ data: Project[] }>(`/api/admin/clients/${clientUuid}/projects`);
      },
      update: (params: ProjectUpdateParams) => {
        const { clientUuid, projectUuid, ...rest } = params;

        return put<{ data: Project }>(`/api/admin/clients/${clientUuid}/projects/${projectUuid}`, rest);
      },
    },
    projectType: {
      fetch: (params: ProjectTypeFetchParams) => {
        const { initiativeUuid, projectTypeUuid } = params;

        return get<{ data: ProjectType }>(`/api/admin/initiatives/${initiativeUuid}/projectTypes/${projectTypeUuid}`);
      },
      new: (params: ProjectTypeNewParams) => {
        const { initiativeUuid, ...rest } = params;
        const formData = new FormData();
        Object.keys(rest).forEach((k: string) => {
          if (rest.hasOwnProperty(k)) {
            formData.append(k, rest[k as keyof Omit<ProjectTypeNewParams, 'initiativeUuid'>] as string | Blob);
          }
        });

        return post<{ data: ProjectType }>(`/api/admin/initiatives/${initiativeUuid}/projectTypes`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
      update: (params: ProjectTypeUpdateParams) => {
        const { initiativeUuid, projectTypeUuid, ...rest } = params;
        const formData = new FormData();
        Object.keys(rest).forEach((k: string) => {
          if (rest.hasOwnProperty(k)) {
            formData.append(k, rest[k as keyof Omit<ProjectTypeNewParams, 'initiativeUuid'>] as string | Blob);
          }
        });

        return put<{ data: ProjectType }>(
          `/api/admin/initiatives/${initiativeUuid}/projectTypes/${projectTypeUuid}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );
      },
    },
    requirement: {
      delete: (params: RequirementFetchParams) => {
        const { clientUuid, projectUuid, requirementUuid } = params;

        return destroy<{ data: null }>(
          `/api/admin/clients/${clientUuid}/projects/${projectUuid}/requirements/${requirementUuid}`,
        );
      },
      fetch: (params: RequirementFetchParams) => {
        const { clientUuid, projectUuid, requirementUuid } = params;

        return get<{ data: Requirement }>(
          `/api/admin/clients/${clientUuid}/projects/${projectUuid}/requirements/${requirementUuid}`,
        );
      },
      list: (params: ProjectFetchParams) => {
        const { clientUuid, projectUuid } = params;

        return get<{ data: Requirement[] }>(`/api/admin/clients/${clientUuid}/projects/${projectUuid}/requirements`);
      },
      new: (params: RequirementNewParams) => {
        const { clientUuid, projectUuid, ...rest } = params;

        return post<{ data: Requirement }>(
          `/api/admin/clients/${clientUuid}/projects/${projectUuid}/requirements`,
          rest,
        );
      },
      update: (params: RequirementUpdateParams) => {
        const { clientUuid, projectUuid, requirementUuid, ...rest } = params;

        return put<{ data: Requirement }>(
          `/api/admin/clients/${clientUuid}/projects/${projectUuid}/requirements/${requirementUuid}`,
          rest,
        );
      },
    },
    requirementType: {
      list: (params: ProjectTypeFetchParams) => {
        const { initiativeUuid, projectTypeUuid } = params;

        return get<{ data: RequirementType[] }>(
          `/api/admin/initiatives/${initiativeUuid}/projectTypes/${projectTypeUuid}/requirementTypes`,
        );
      },
      fetch: (params: RequirementTypeFetchParams) => {
        const { initiativeUuid, projectTypeUuid, requirementTypeUuid } = params;

        return get<{ data: RequirementType }>(
          `/api/admin/initiatives/${initiativeUuid}/projectTypes/${projectTypeUuid}/requirementTypes/${requirementTypeUuid}`,
        );
      },
      new: (params: RequirementTypeNewParams) => {
        const { initiativeUuid, projectTypeUuid, ...rest } = params;

        return post<{ data: RequirementType }>(
          `/api/admin/initiatives/${initiativeUuid}/projectTypes/${projectTypeUuid}/requirementTypes`,
          rest,
        );
      },
      update: (params: RequirementTypeUpdateParams) => {
        const { initiativeUuid, projectTypeUuid, requirementTypeUuid, ...rest } = params;

        return put<{ data: RequirementType }>(
          `/api/admin/initiatives/${initiativeUuid}/projectTypes/${projectTypeUuid}/requirementTypes/${requirementTypeUuid}`,
          rest,
        );
      },
      sortOrder: (params: RequirementTypeSortOrderParams) => {
        const { initiativeUuid, projectTypeUuid, requirementTypes } = params;

        return put<{ data: RequirementType[] }>(
          `/api/admin/initiatives/${initiativeUuid}/projectTypes/${projectTypeUuid}/requirement-type-sort`,
          requirementTypes,
        );
      },
    },
    service: {
      fetch: (params: ServiceFetchParams) => {
        const { serviceUuid } = params;

        return get<{ data: Service }>(`/api/admin/services/${serviceUuid}`);
      },

      new: (params: ServiceNewParams) => {
        return post<{ data: Service }>('/api/admin/services', params);
      },
      update: (params: ServiceUpdateParams) => {
        const { serviceUuid, ...rest } = params;
        return put<{ data: Service }>(`/api/admin/services/${serviceUuid}`, rest);
      },
    },
    user: {
      fetch: (params: UserFetchParams) => {
        const { userUuid } = params;

        return get<{ data: User }>(`/api/admin/users/${userUuid}`);
      },
      new: (params: UserNewParams) => {
        return post<{ data: UserNewParams }>('/api/admin/users', params);
      },
      update: (params: UserUpdateParams) => {
        const { userUuid, ...rest } = params;
        return put<{ data: User }>(`/api/admin/users/${userUuid}`, rest);
      },
      list: () => {
        return get<{ data: User[] }>('/api/admin/users');
      },
      delete: (params: UserFetchParams) => {
        const { userUuid } = params;
        return destroy<{ data: null }>(`/api/admin/users/${userUuid}`);
      },
      unapproved: () => {
        return get<{ data: User[] }>(`/api/admin/users/unapproved`);
      },
      approve: (params: UserApprovalParams) => {
        const { userUuid, approvalStatus } = params;
        return put<{ data: User }>(`/api/admin/users/approve/${userUuid}`, { approvalStatus });
      },
    },
    vertical: {
      fetch: (params: VerticalFetchParams) => {
        const { verticalUuid } = params;

        return get<{ data: Vertical }>(`/api/admin/verticals/${verticalUuid}`);
      },
      new: (params: VerticalNewParams) => {
        return post<{ data: Vertical }>('/api/admin/verticals', params);
      },
      update: (params: VerticalUpdateParams) => {
        const { verticalUuid, ...rest } = params;
        return put<{ data: Vertical }>(`/api/admin/verticals/${verticalUuid}`, rest);
      },
      delete: (params: VerticalFetchParams) => {
        const { verticalUuid } = params;
        return destroy<{ data: null }>(`/api/admin/verticals/${verticalUuid}`);
      },
    },
  },
  client: {
    fetchClient: (params: ClientFetchParams) => {
      const { clientUuid } = params;

      return get<{ data: Client }>(`/api/clients/${clientUuid}`);
    },
    list: () => {
      return get<{ data: Client[] }>('/api/clients');
    },
    query: (params: ApiQueryParams) => {
      const { query } = params;
      return get<{ data: Client[] }>(`/api/clients/query/${query}`);
    },
    verifyCode: (params: VerifyCodeParams) => {
      return post<{ data: boolean }>(`/api/clients/verify-code`, params);
    },
    reportRequest: (params: { clientUuid: string }) => {
      const { clientUuid } = params;
      return post<{ data: null }>(`/api/clients/${clientUuid}/report-request`, params);
    },
    new: (params: ClientNewParams) => {
      const formData = new FormData();
      Object.keys(params).forEach((k: string) => {
        if (params.hasOwnProperty(k)) {
          if (k === 'clientLocations') {
            formData.append(k, JSON.stringify(params[k as keyof ClientNewParams]));
          } else {
            formData.append(k, params[k as keyof ClientNewParams] as string | Blob);
          }
        }
      });
      return post<{ data: Client }>('/api/clients', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    update: (params: ClientUpdateParams) => {
      const { clientUuid, ...rest } = params;
      const formData = new FormData();
      Object.keys(rest).forEach((k: string) => {
        if (rest.hasOwnProperty(k)) {
          if (k === 'clientLocations') {
            formData.append(k, JSON.stringify(params[k as keyof ClientNewParams]));
          } else {
            formData.append(k, params[k as keyof ClientNewParams] as string | Blob);
          }
        }
      });
      return put<{ data: Client }>(`/api/clients/${clientUuid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  },
  clientType: {
    list: () => {
      return get<{ data: ClientType[] }>('/api/client-types');
    },
  },
  document: {
    delete: (params: RequirementDocumentFetchParams) => {
      const { partnerUuid, requirementUuid, requirementDocumentUuid } = params;
      return destroy<{ data: null }>(
        `/api/partners/${partnerUuid}/requirements/${requirementUuid}/documents/${requirementDocumentUuid}`,
      );
    },
    new: (params: RequirementDocumentNewParams) => {
      const { partnerUuid, requirementUuid, ...rest } = params;
      const formData = new FormData();
      Object.keys(rest).forEach((k: string) => {
        if (rest.hasOwnProperty(k)) {
          formData.append(k, params[k as keyof RequirementDocumentNewParams] as string | Blob);
        }
      });
      return post<{ data: RequirementDocument }>(
        `/api/partners/${partnerUuid}/requirements/${requirementUuid}/documents`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
    },
  },
  partner: {
    list: () => {
      return get<{ data: Partner[] }>('/api/partners');
    },
    fetchPartner: (params: PartnerFetchParams) => {
      const { partnerUuid } = params;
      return get<{ data: Partner }>(`/api/partners/${partnerUuid}`);
    },
    edit: (params: PartnerUpdateParams) => {
      const { serviceIds, ...rest } = params;
      const formData = new FormData();
      Object.keys(rest).forEach((k: string) => {
        if (rest.hasOwnProperty(k)) {
          formData.append(k, rest[k as keyof Omit<PartnerUpdateParams, 'serviceIds'>] as string | Blob);
        }
      });
      formData.append('serviceIds', JSON.stringify(serviceIds));
      return put<{ data: Partner }>(`/api/partners/${rest.partnerUuid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    query: (params: ApiQueryParams) => {
      const { query } = params;
      return get<{ data: Partner[] }>(`/api/partners/query/${query}`);
    },
    onboard: (params: PartnerOnboardingParams) => {
      const { partnerUuid, ...rest } = params;
      return post<{ data: null }>(`/api/partners/${partnerUuid}/onboard/`, rest);
    },
    new: (params: PartnerNewParams) => {
      const { serviceIds, serviceLocations, clientTypes, ...rest } = params;
      const formData = new FormData();
      Object.keys(rest).forEach((k: string) => {
        if (rest.hasOwnProperty(k)) {
          formData.append(
            k,
            rest[k as keyof Omit<PartnerNewParams, 'serviceIds' | 'serviceLocations' | 'clientTypes'>] as string | Blob,
          );
        }
      });
      formData.append('serviceIds', JSON.stringify(serviceIds));
      formData.append('serviceLocations', JSON.stringify(serviceLocations));
      formData.append('clientTypes', JSON.stringify(clientTypes));
      return post<{ data: Partner }>('/api/partners', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  },
  initiative: {
    list: () => {
      return get<{ data: Initiative[] }>('/api/initiatives');
    },
    fetch: (params: InitiativeFetchParams) => {
      const { initiativeUuid } = params;

      return get<{ data: { name: string } }>(`/api/initiatives/${initiativeUuid}`);
    },
  },
  projectType: {
    list: (params: InitiativeFetchParams) => {
      const { initiativeUuid } = params;

      return get<{ data: ProjectType[] }>(`/api/initiatives/${initiativeUuid}/projectTypes`);
    },
  },
  project: {
    new: (params: ProjectNewParams) => {
      const { clientUuid, ...rest } = params;

      return post<{ data: Project }>(`/api/clients/${clientUuid}/projects`, rest);
    },
    updateStatus: (params: ClientProjectStatusUpdateParams) => {
      const { clientUuid, projectUuid, ...rest } = params;

      return put<{ data: Project }>(`/api/clients/${clientUuid}/projects/${projectUuid}/update-status`, rest);
    },
  },
  requirement: {
    fetch: (params: RequirementFetchParams) => {
      const { clientUuid, projectUuid, requirementUuid } = params;

      return get<{ data: Requirement }>(
        `/api/clients/${clientUuid}/projects/${projectUuid}/requirements/${requirementUuid}`,
      );
    },
    assignPartner: (params: RequirementFetchParams & { partnerUuid: string }) => {
      const { clientUuid, projectUuid, requirementUuid, ...rest } = params;

      return put<{ data: Requirement }>(
        `/api/clients/${clientUuid}/projects/${projectUuid}/requirements/${requirementUuid}/assign-partner`,
        rest,
      );
    },
    updateStatus: (params: ClientRequirementStatusUpdateParams) => {
      const { clientUuid, projectUuid, requirementUuid, ...rest } = params;

      return put<{ data: Requirement }>(
        `/api/clients/${clientUuid}/projects/${projectUuid}/requirements/${requirementUuid}/update-status`,
        rest,
      );
    },
  },
  service: {
    list: () => {
      return get<{ data: Service[] }>('/api/service');
    },
  },
  user: {
    new: (params: UserNewParams) => {
      return post<{ data: LoginResponse }>('/api/users', params);
    },
    checkExists: (params: UserCheckExistsParams) => {
      return get<{ data: null }>(`/api/users/check-exists/${params.email}`);
    }
  },
  vertical: {
    list: () => {
      return get<{ data: Vertical[] }>('/api/verticals');
    },
  },
  test: {
    fetchApiEndpoint: () => {
      return get<{ data: string }>('/api/test');
    },
  },
  nft: {
    list: (params: PaginationParams) => {
      return post<{ data: TablePagination }>('/api/nft/all', params);
    },
    fetch: (uuid: string) => {
      return get<{ data: Nft }>(`/api/nft/${uuid}`);
    },
    view: (uuid: string) => {
      return get<{ data: Nft }>(`/api/nft/${uuid}/view`);
    },
    nftReviewUpdate: (params: NftReviewUpdateParams) => {
      let { uuid } = params;
      return put<{ data: ResponseOK }>(`/api/nft/${uuid}/verification`, params);
    },
    nftMint: (uuid: string) => {
      return post<{ data: ResponseOK }>(`/api/nft/${uuid}/mint`, {});
    },
    nftSale: (params: NftSale) => {
      const { uuid } = params;
      return put<{ data: ResponseOK }>(`/api/nft/${uuid}/sale`, params);
    },
    new: (params: NftNewParams) => {
      const rest = { ...params }
      const formData = new FormData();
      Object.keys(params).forEach((k: string) => {
        if (params.hasOwnProperty(k)) {
          if (k === 'asset') {
            formData.append(k, params[k as keyof NftNewParams] as string | Blob);
          }
        }
      });
      delete rest.asset
      formData.append("data", JSON.stringify(rest));
      return post<{ data: NftNewParams }>('/api/nft', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    retire: (params: RetireNFT) => {
      const { uuid } = params;
      return post<{ data: ResponseOK }>(`/api/nft/${uuid}/retire`, params);
    }
  },
  nftType: {
    list: () => {
      return get<{ data: NftType[] }>('/api/nft-types');
    },
  },
  creditType: {
    list: () => {
      return get<{ data: CreditType[] }>('/api/credit-types');
    },
  },
  wallet: {
    registerWallet: (params: WalletRegistration) => {
      return put<{ data: UserWalletStatus }>(`/api/wallet/register`, params);
    }
  },
  quiz: {
    saveOrModifyAnswers: (params: QuizAnswersPayload) => {
      const answers = params.answers
      return post<{ data: QuizQuestionAnswer[] }>(`/api/quiz/answers/${params.quizInstanceId}/${params.questionId}`, answers);
    },
    submitQuiz: (params: QuizSubmitPayload) => {
      const quizData = params.quizData
      return post<{ data: QuizQuestionAnswer[] }>(`/api/quiz/submit/${params.quizInstanceId}`, quizData);
    },
    getScores: () => get<{ data: CreateQuizInstance[] }>(`/api/quiz/scores`),
    getInstances: () => get<{ data: QuizInstance[] }>(`/api/quiz/instances`),
    getHistory: (params: PaginationParams) => get<{ data: QuizHistory }>(`/api/quiz/history/${params.page}/${params.size}`),
  },
  nftOverview: {
    getOverviewDetails: () => {
      return get<{ data: NFTOverviewPageData }>(`/api/nft/overview/data`);
    }
  }
};
