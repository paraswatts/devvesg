import { ApprovalStatuses } from 'src/api';
import { RequirementRequestStatus } from 'src/gql';
import { QuizInstance } from 'src/routes/clients/analyze/baseline/common/__gql__/GetQuiz';

export enum RequirementDocumentTypes {
  URL = 'url',
  FILE = 'file',
}

export enum ProjectRequirementStatuses {
  DONE = 'done',
  IN_PROGRESS = 'inprogress',
  NOT_STARTED = 'notstarted',
  ON_HOLD = 'onhold',
}

export enum UserTypes {
  ADMIN = 'admin',
  CLIENT = 'client',
  PARTNER = 'partner',
}

export interface ClientPartnerLocation {
  country: string;
  provinces: string[];
}

export interface ResponseOK {
  message: string;
  status: number;
  action?: string;
  success: boolean;
}

export interface Client {
  uuid: string;
  name: string;
  description?: string;
  logo?: string;
  contactEmail: string;
  users?: User[];
  projects?: Project[];
  websiteUrl?: string;
  contactPhoneNumber?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  vertical?: Vertical;
  clientType?: ClientType;
  clientLocations?: ClientPartnerLocation[];
  report1?: string;
  report2?: string;
  stockTicker?: string;
}

export interface Initiative {
  uuid: string;
  name: string;
  objective: string;
  logo: string;
  onboardingLogo?: string;
  projectTypes: ProjectType[];
}

export interface Partner {
  name: string;
  description: string;
  contactEmail: string;
  uuid: string;
  users: User[];
  requirements: Requirement[];
  logo?: string;
  contactPhoneNumber: string;
  twitterUrl?: string;
  facebookUrl?: string;
  linkedInUrl?: string;
  websiteUrl?: string;
  services?: Service[];
  country?: string;
  province?: string;
  vertical?: Vertical;
  serviceLocations?: ClientPartnerLocation[];
  clientTypes?: ClientType[];
  projectTimeline?: number;
  approvalStatus: ApprovalStatuses;
  hubspotId?: string;
}

export interface Project {
  uuid: string;
  name: string;
  description: string;
  status: ProjectRequirementStatuses;
  startDate: Date;
  endGoalDate: Date;
  completionDate: Date;
  client: Client;
  projectType: ProjectType;
  requirements: Requirement[];
}

export interface ProjectType {
  uuid: string;
  name: string;
  objective: string;
  initiative: Initiative;
  logo: string;
  projects: Project[];
  requirementTypes: RequirementType[];
}

export interface Requirement {
  uuid: string;
  name: string;
  description: string;
  status: ProjectRequirementStatuses;
  startDate: Date;
  endDate: Date;
  projectCode: string;
  areaCode: string;
  partner: Partner;
  project: Project;
  requirementType: RequirementType;
  requirementDocuments: RequirementDocument[];
  requestStatus: RequirementRequestStatus;
}

export interface Service {
  uuid: string;
  name: string;
  partners: Partner[];
}

export interface ClientType {
  uuid: string;
  name: string;
  partners: Partner[];
}

export interface Vertical {
  uuid: string;
  name: string;
}

export interface User {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  type: UserTypes;
  client?: Client;
  partner?: Partner;
  approvalStatus?: ApprovalStatuses;
}

export interface RequirementType {
  uuid: string;
  name: string;
  description: string;
  partners: Partner[];
  sortOrder: number;
}

export interface RequirementDocument {
  uuid: string;
  name: string;
  file: string;
  type: RequirementDocumentTypes;
  createdAt: string;
}

export interface NftType {
  uuid: string;
  name: string;
  description: string;
}

export interface CreditType {
  uuid: string;
  name: string;
  description: string;
}

export interface Nft {
  uuid: string;
  assetName: string;
  assetReferenceUrlRaw: string;
  assetReferenceUrlHash: string;
  assetDescription: string;
  assetReferenceThumbnails: string[],
  nftType: string;
  amount: string;
  creditCount: string;
  status: string;
  createdAt: string
  updatedAt: string;
  creator: string;
  artist: string;
  forSale: string;
  salePrice: string;
  saleCurrency: string;
  saleDescription: string;
  saleLocation: string;
  saleLink: string;
  methodology: string;
  projectType: string;
  projectFromDate: string;
  projectToDate: string;
  projectName: string;
  projectDescription: string;
  projectActivity: string;
  projectCode: string;
  projectId: string;
  projectBatchId: string;
  projectTicker: string;
  projectStandard: string;
  creditType: string;
  projectVintage: string;
  projectVerifier: string;
  projectValidator: string;
  geography: string;
  locationCoordinates: string;
  publicRegistry: string;
  publicRegistryLink: string;
  createdBy?: User;
  mintId: string;
  notes: string;
  saleReceiptUri: string;
  nftClientName?: string;
}

export interface NftSale {
  uuid?: string;   //The wallet session ID from a /login operation for the wallet that owns this NFT.
  nftUri?: string;  //(DevvURI string) (required) - The minted NFT-17 that this wallet possesses and wishes to sell.
  saleLink?: string;
  salePrice?: string;
  marketWallet?: string;    //
  saleCurrency?: string;     //
  saleLocation?: string;     //
  saleDescription?: string;     //
  assetReferenceThumbnails?: string[] //(list) (optionals) - A list of thumbnail urls for the posting to use.
}


export interface PaginationParams {
  total: number,
  page: number,
  size: number,
  orderBy: QueryOrderMap,
  type?: string
}
export interface TableSort {
  name: string,
  order: string
}

export interface TablePagination {
  nfts: Nft[],
  pagination: PaginationParams,
  sort?: TableSort[]
}

export interface QuizHistory {
  instances: QuizInstance[],
  pagination: PaginationParams,
  sort?: TableSort[]
}

export interface Table {
  headers: TableHeader[];
  rows: TableRow[];
  paging: PaginationParams
  onSizeChange?: (current: number, size: number) => void;
  requestedPage?: (page: number, pageSize: number) => void;
  changeSorting?: (orderBy: QueryOrderMap) => void
}

export interface TableHeader {
  title: any;
  key: string;
  hasSorting?: boolean;
  ascending?: boolean;
  descending?: boolean;
  checkBox?: boolean
}

export interface TableCell {
  title: any;
  isLink?: boolean;
  link?: string;
  ischeckbox?: boolean

}

export interface TableRow {
  id: string;
  cells: TableCell[]
}

export interface QueryOrderMap {
  [x: string]: QueryOrder;
}

export enum QueryOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface RetireNFT {
  uuid?: string;
  credits?: string;
  nftRetireDate?: string;
}

export interface WalletRegistration {
  email?: string;
  userId?: string;
  password?:string;
}
