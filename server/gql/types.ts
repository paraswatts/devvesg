export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type GqlCarbonFootprint = {
  __typename?: 'CarbonFootprint';
  createdAt: Scalars['Date'];
  total: Scalars['Float'];
  uuid: Scalars['ID'];
};

export type GqlCarbonFootprintList = {
  __typename?: 'CarbonFootprintList';
  items: Array<GqlCarbonFootprint>;
  pageInfo: GqlPaginationInfo;
};

export type GqlClient = GqlClientBase & {
  __typename?: 'Client';
  clientType?: Maybe<GqlClientType>;
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  footprints: GqlCarbonFootprintList;
  latestFootprint?: Maybe<GqlCarbonFootprint>;
  linkedInUrl?: Maybe<Scalars['String']>;
  locations: Array<GqlClientLocation>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  project: GqlProject;
  projects: GqlProjectList;
  report1?: Maybe<Scalars['String']>;
  report2?: Maybe<Scalars['String']>;
  stockTicker?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
  uuid: Scalars['ID'];
  vertical?: Maybe<GqlVertical>;
  websiteUrl?: Maybe<Scalars['String']>;
};


export type GqlClientProjectArgs = {
  projectId: Scalars['ID'];
};

export type GqlClientBase = {
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  linkedInUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  stockTicker?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
  uuid: Scalars['ID'];
  websiteUrl?: Maybe<Scalars['String']>;
};

export type GqlClientInfo = GqlClientBase & {
  __typename?: 'ClientInfo';
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  linkedInUrl?: Maybe<Scalars['String']>;
  locations: Array<GqlClientLocation>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  stockTicker?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
  uuid: Scalars['ID'];
  websiteUrl?: Maybe<Scalars['String']>;
};

export type GqlClientLocation = {
  __typename?: 'ClientLocation';
  country: Scalars['String'];
  province: Scalars['String'];
};

export type GqlClientType = {
  __typename?: 'ClientType';
  name: Scalars['String'];
  uuid: Scalars['ID'];
};

export type GqlInitiative = {
  __typename?: 'Initiative';
  logo: Scalars['String'];
  name: Scalars['String'];
  objective: Scalars['String'];
  onboardingLogo: Scalars['String'];
  projectTypes: Array<GqlProjectType>;
  uuid: Scalars['ID'];
};

export type GqlInitiativeList = {
  __typename?: 'InitiativeList';
  items: Array<GqlInitiative>;
  pageInfo: GqlPaginationInfo;
};

export type GqlMutation = {
  __typename?: 'Mutation';
  clientFootprintCreate?: Maybe<GqlCarbonFootprint>;
  clientFootprintDelete: Scalars['ID'];
  partnerUpdate: GqlPartner;
  ping: Scalars['String'];
  requirementDisconnectPartner?: Maybe<GqlRequirement>;
  requirementRequestStatusChange: GqlRequirementRequest;
  userDeactivate?: Maybe<Scalars['Boolean']>;
};


export type GqlMutationClientFootprintCreateArgs = {
  clientId: Scalars['ID'];
  total: Scalars['Float'];
};


export type GqlMutationClientFootprintDeleteArgs = {
  carbonFootprintId: Scalars['ID'];
  clientId: Scalars['ID'];
};


export type GqlMutationPartnerUpdateArgs = {
  companyInformation?: InputMaybe<GqlPartnerUpdateCompanyInformation>;
  id: Scalars['ID'];
  servicesInformation?: InputMaybe<GqlPartnerUpdateServiceInformation>;
};


export type GqlMutationRequirementDisconnectPartnerArgs = {
  clientId: Scalars['ID'];
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  reason: Scalars['String'];
};


export type GqlMutationRequirementRequestStatusChangeArgs = {
  id: Scalars['ID'];
  requestStatus: GqlRequirementRequestStatus;
};


export type GqlMutationUserDeactivateArgs = {
  id: Scalars['ID'];
};

export type GqlPaginationInfo = {
  __typename?: 'PaginationInfo';
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type GqlPartner = GqlPartnerBase & {
  __typename?: 'Partner';
  clientTypes: Array<GqlClientType>;
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  facebookUrl?: Maybe<Scalars['String']>;
  hubspotId?: Maybe<Scalars['String']>;
  linkedInUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  projectTimeline?: Maybe<Scalars['Int']>;
  province?: Maybe<Scalars['String']>;
  requirement: GqlRequirement;
  requirementRequest: GqlRequirementRequest;
  requirementRequests: GqlRequirementRequestList;
  requirementTypes: Array<GqlRequirementType>;
  requirements: GqlRequirementList;
  serviceLocations: Array<GqlPartnerLocation>;
  services: Array<GqlService>;
  twitterUrl?: Maybe<Scalars['String']>;
  uuid: Scalars['ID'];
  vertical?: Maybe<GqlVertical>;
  websiteUrl?: Maybe<Scalars['String']>;
};


export type GqlPartnerRequirementArgs = {
  requirementId: Scalars['ID'];
};


export type GqlPartnerRequirementRequestArgs = {
  requirementRequestId: Scalars['ID'];
};

export type GqlPartnerBase = {
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  facebookUrl?: Maybe<Scalars['String']>;
  linkedInUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  services: Array<GqlService>;
  twitterUrl?: Maybe<Scalars['String']>;
  uuid: Scalars['ID'];
  websiteUrl?: Maybe<Scalars['String']>;
};

export type GqlPartnerInfo = GqlPartnerBase & {
  __typename?: 'PartnerInfo';
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  facebookUrl?: Maybe<Scalars['String']>;
  linkedInUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  services: Array<GqlService>;
  twitterUrl?: Maybe<Scalars['String']>;
  uuid: Scalars['ID'];
  websiteUrl?: Maybe<Scalars['String']>;
};

export type GqlPartnerLocation = {
  __typename?: 'PartnerLocation';
  country: Scalars['String'];
  province: Scalars['String'];
};

export type GqlPartnerUpdateCompanyInformation = {
  contactEmail: Scalars['String'];
  contactPhoneNumber: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  facebookUrl?: InputMaybe<Scalars['String']>;
  linkedInUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  province: Scalars['String'];
  twitterUrl?: InputMaybe<Scalars['String']>;
  vertical: Scalars['String'];
  websiteUrl: Scalars['String'];
};

export type GqlPartnerUpdateServiceInformation = {
  clientTypeIds: Array<Scalars['ID']>;
  projectTimeline: Scalars['Int'];
  requirementTypeIds: Array<Scalars['ID']>;
  serviceLocations: Array<GqlServiceLocation>;
};

export type GqlProject = GqlProjectBase & {
  __typename?: 'Project';
  completionDate?: Maybe<Scalars['Date']>;
  description: Scalars['String'];
  endGoalDate?: Maybe<Scalars['Date']>;
  initiative: GqlInitiative;
  name: Scalars['String'];
  projectType: GqlProjectType;
  requirement?: Maybe<GqlRequirementForClient>;
  requirements: Array<GqlRequirementForClient>;
  startDate?: Maybe<Scalars['Date']>;
  status: GqlProjectStatus;
  uuid: Scalars['ID'];
};


export type GqlProjectRequirementArgs = {
  requirementId: Scalars['ID'];
};

export type GqlProjectBase = {
  completionDate?: Maybe<Scalars['Date']>;
  description: Scalars['String'];
  endGoalDate?: Maybe<Scalars['Date']>;
  initiative: GqlInitiative;
  name: Scalars['String'];
  projectType: GqlProjectType;
  startDate?: Maybe<Scalars['Date']>;
  status: GqlProjectStatus;
  uuid: Scalars['ID'];
};

export type GqlProjectForPartner = GqlProjectBase & {
  __typename?: 'ProjectForPartner';
  client?: Maybe<GqlClientInfo>;
  completionDate?: Maybe<Scalars['Date']>;
  description: Scalars['String'];
  endGoalDate?: Maybe<Scalars['Date']>;
  initiative: GqlInitiative;
  name: Scalars['String'];
  projectType: GqlProjectType;
  startDate?: Maybe<Scalars['Date']>;
  status: GqlProjectStatus;
  uuid: Scalars['ID'];
};

export type GqlProjectList = {
  __typename?: 'ProjectList';
  items: Array<GqlProject>;
  pageInfo: GqlPaginationInfo;
};

export enum GqlProjectStatus {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED',
  OnHold = 'ON_HOLD'
}

export type GqlProjectType = {
  __typename?: 'ProjectType';
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  objective: Scalars['String'];
  requirementTypes: Array<GqlRequirementType>;
  uuid: Scalars['ID'];
};

export type GqlQuery = {
  __typename?: 'Query';
  client: GqlClient;
  clientType: GqlClientType;
  clientTypes: Array<GqlClientType>;
  initiative: GqlInitiative;
  initiatives: GqlInitiativeList;
  partner: GqlPartner;
  projectType: GqlProjectType;
  services: GqlServiceList;
  verticals: GqlVerticalList;
};


export type GqlQueryClientArgs = {
  clientId: Scalars['ID'];
};


export type GqlQueryClientTypeArgs = {
  clientTypeId: Scalars['ID'];
};


export type GqlQueryInitiativeArgs = {
  initiativeId: Scalars['ID'];
};


export type GqlQueryPartnerArgs = {
  partnerId: Scalars['ID'];
};


export type GqlQueryProjectTypeArgs = {
  projectTypeId: Scalars['ID'];
};

export type GqlRequirement = GqlRequirementBase & {
  __typename?: 'Requirement';
  description: Scalars['String'];
  documents: Array<GqlRequirementDocument>;
  endDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  project: GqlProjectForPartner;
  requestStatus: GqlRequirementRequestStatus;
  requirementType: GqlRequirementType;
  startDate?: Maybe<Scalars['Date']>;
  status: GqlRequirementStatus;
  uuid: Scalars['ID'];
};

export type GqlRequirementBase = {
  description: Scalars['String'];
  endDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  requestStatus: GqlRequirementRequestStatus;
  requirementType: GqlRequirementType;
  startDate?: Maybe<Scalars['Date']>;
  status: GqlRequirementStatus;
  uuid: Scalars['ID'];
};

export type GqlRequirementDocument = {
  __typename?: 'RequirementDocument';
  createdAt: Scalars['Date'];
  file: Scalars['String'];
  name: Scalars['String'];
  type: GqlRequirementDocumentType;
  uuid: Scalars['ID'];
};

export enum GqlRequirementDocumentType {
  File = 'FILE',
  Url = 'URL'
}

export type GqlRequirementForClient = GqlRequirementBase & {
  __typename?: 'RequirementForClient';
  description: Scalars['String'];
  documents: Array<GqlRequirementDocument>;
  endDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  partner?: Maybe<GqlPartnerInfo>;
  requestStatus: GqlRequirementRequestStatus;
  requirementType: GqlRequirementType;
  startDate?: Maybe<Scalars['Date']>;
  status: GqlRequirementStatus;
  uuid: Scalars['ID'];
};

export type GqlRequirementForClientList = {
  __typename?: 'RequirementForClientList';
  items: Array<GqlRequirementForClient>;
  pageInfo: GqlPaginationInfo;
};

export type GqlRequirementList = {
  __typename?: 'RequirementList';
  items: Array<GqlRequirement>;
  pageInfo: GqlPaginationInfo;
};

export type GqlRequirementRequest = {
  __typename?: 'RequirementRequest';
  description: Scalars['String'];
  endDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  project: GqlProjectForPartner;
  requestStatus: GqlRequirementRequestStatus;
  requirementType: GqlRequirementType;
  startDate?: Maybe<Scalars['Date']>;
  status: GqlRequirementStatus;
  uuid: Scalars['ID'];
};

export type GqlRequirementRequestList = {
  __typename?: 'RequirementRequestList';
  items: Array<GqlRequirementRequest>;
  pageInfo: GqlPaginationInfo;
};

export enum GqlRequirementRequestStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Unassigned = 'UNASSIGNED'
}

export enum GqlRequirementStatus {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED',
  OnHold = 'ON_HOLD'
}

export type GqlRequirementType = {
  __typename?: 'RequirementType';
  description: Scalars['String'];
  name: Scalars['String'];
  partners: Array<GqlPartnerInfo>;
  uuid: Scalars['ID'];
};

export type GqlService = {
  __typename?: 'Service';
  name: Scalars['String'];
  uuid: Scalars['ID'];
};

export type GqlServiceList = {
  __typename?: 'ServiceList';
  items: Array<GqlService>;
  pageInfo: GqlPaginationInfo;
};

export type GqlServiceLocation = {
  country: Scalars['String'];
  provinces: Array<Scalars['String']>;
};

export type GqlVertical = {
  __typename?: 'Vertical';
  name: Scalars['String'];
  uuid: Scalars['String'];
};

export type GqlVerticalList = {
  __typename?: 'VerticalList';
  items: Array<GqlVertical>;
  pageInfo: GqlPaginationInfo;
};

export interface GqlAnswer {
  __typename?: "QuizQuestionAnswer";
  answerValue?: string;
  quizInstance: Scalars['ID'];
  quizQuestion: Scalars['ID'];
  quizQuestionOption?: Scalars['ID'];
}

export type GqlMutationQuizInstanceCreateOrGetArgs = {
  id: Scalars['ID'];
};

