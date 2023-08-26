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

export enum WalletType {
  WALLET_TYPE = 'RETIREMENT_WALLET'
}

export enum WalletErrorStatus {
  CONNECTION_TIME_OUT = 'CONNECTION_TIME_OUT',
  EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',
  SERVER_ERROR = 'SERVER_ERROR',
  NO_WALLET = 'NO_WALLET',
  OK = "OK",
  WALLET_PUBLIC_ADDRESS_NOT_FOUND = 'WALLET_PUBLIC_ADDRESS_NOT_FOUND',
  WALLET_USERNAME_MISMATCH = 'WALLET_USERNAME_MISMATCH'
}

export enum WalletEmailVerificationStatus {
  YES = 'YES',
  NO = 'NO'
}

export enum QuestionType {
  TEXT = 1,
  NUMBER = 2,
  RADIO = 3,
  MULTI_SELECT = 4,
  MULTI_SELECT_DROPDOWN = 5,
}

export enum ScoreType {
  NO_SCORE = 1,
  OPTION_SCORE = 2,
  PERCENTAGE = 3,
  OPTIONS_TOTAL_PERCENTAGE = 4,
  OPTION_SELECTED = 5,
}

export enum QuizStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}