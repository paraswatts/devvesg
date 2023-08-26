import { NftStatuses } from "../enums";
import { UserTypes } from "../entities/user.entity";

export interface ApiRes<T> {
  data: T;
}

export enum MediaEntityTypes {
  CLIENT = 'clients',
  PARTNER = 'partners',
  INITIATIVE = 'initiatives',
  PROJECT_TYPE = 'projectTypes',
  REQUIREMENT_DOCUMENT = 'requirementDocuments',
  NFT = 'nft',
  QUIZ = 'quiz',
  QUIZ_SECTION = 'quizSection',
  QUIZ_QUESTION = 'quizQuestion',
  QUIZ_QUESTION_OPTIONS = 'quizQuestionOptions',
  QUIZ_SCORE_TYPES = 'quizScoreTypes'
}

export enum ResponseCode {
  UNAUTHORISED = 401,
  SUCCESS = 200,
  DONE = 201,
  UNKNOWN_ERROR = 500,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export type WalletDetails = {
  status?: string;
  success?: boolean;
  message?: string;
  isVerified?: string;
  isWalletSessionActive?: boolean;
}

export interface WalletRegistration {
  entityType?: UserTypes;
  uuid?: string;
  email: string;
  fullName: string;
  password: string;
  username?:string
}

export interface ResponseBody {
  message: string;
  status: ResponseCode;
  action?: string | NftStatuses;
  success: boolean;
  data?: any;
}
