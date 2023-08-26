import { User, UserTypes } from '../../entities';
import { ApprovalStatuses } from '../../enums';

export const adminUserFixture: Partial<User> = {
  uuid: '11111111-1111-1111-1111-111111111113',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@devv.io',
  type: UserTypes.ADMIN,
  approvalStatus: ApprovalStatuses.APPROVED,
  userAgreementCompleted: true,
  dateAgreementCompleted: new Date(),
};

export const client1UserFixture: Partial<User> = {
  uuid: '11111111-1111-1111-1111-111111111114',
  firstName: 'Client1',
  lastName: 'User',
  email: 'client1@user.com',
  type: UserTypes.CLIENT,
  approvalStatus: ApprovalStatuses.APPROVED,
  userAgreementCompleted: true,
  dateAgreementCompleted: new Date(),
};

export const partner1UserFixture: Partial<User> = {
  uuid: '11111111-1111-1111-1111-111111111115',
  firstName: 'Partner1',
  lastName: 'User',
  email: 'partner1@user.com',
  type: UserTypes.PARTNER,
  approvalStatus: ApprovalStatuses.APPROVED,
  userAgreementCompleted: true,
  dateAgreementCompleted: new Date(),
};

export const client2UserFixture: Partial<User> = {
  uuid: '11111111-1111-1111-1111-111111111116',
  firstName: 'Client2',
  lastName: 'User',
  email: 'client2@user.com',
  type: UserTypes.CLIENT,
  approvalStatus: ApprovalStatuses.APPROVED,
  userAgreementCompleted: true,
  dateAgreementCompleted: new Date(),
};

export const partner2UserFixture: Partial<User> = {
  uuid: '11111111-1111-1111-1111-111111111117',
  firstName: 'Partner2',
  lastName: 'User',
  email: 'partner2@user.com',
  type: UserTypes.PARTNER,
  approvalStatus: ApprovalStatuses.APPROVED,
  userAgreementCompleted: true,
  dateAgreementCompleted: new Date(),
};

export const partner3UserFixture: Partial<User> = {
  uuid: '11111111-1111-1111-1111-111111111118',
  firstName: 'Partner3',
  lastName: 'User',
  email: 'partner3@user.com',
  type: UserTypes.PARTNER,
  approvalStatus: ApprovalStatuses.APPROVED,
  userAgreementCompleted: true,
  dateAgreementCompleted: new Date(),
};

export const deactivateUserFixture: Partial<User> = {
  uuid: '11111111-1111-1111-1111-111111111119',
  firstName: 'Deactivate',
  lastName: 'User',
  email: 'deactivate-me@devv.io',
  type: UserTypes.ADMIN,
  approvalStatus: ApprovalStatuses.APPROVED,
  userAgreementCompleted: true,
  dateAgreementCompleted: new Date(),
};
