import { ApprovalStatuses, LoginResponse } from 'src/api';
import { UserTypes } from 'src/interfaces';

export const MockUser: LoginResponse = {
  token: '',
  expires: '',
  firstName: 'Foo',
  lastName: 'Bar',
  email: 'foo@bar.com',
  uuid: 'user-uuid',
  type: UserTypes.ADMIN,
  clientUuid: 'client-uuid',
  partnerUuid: 'partner-uuid',
  userAgreementCompleted: false,
  onboardingComplete: false,
  approvalStatus: ApprovalStatuses.APPROVED,
  code: 'NONE',
  userWallet: {},
  clientWallet: {},
  partnerWallet: {}
};
