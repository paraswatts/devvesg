import { Partner } from '../../entities';
import { ApprovalStatuses } from '../../enums';

export const partner1Fixture: Partial<Partner> = {
  uuid: '11111111-1111-1111-1111-111111111112',
  name: 'test-partner-1',
  description: 'Test Description',
  logo: 'https://via.placeholder.com/150',
  contactEmail: 'test@example.com',
  websiteUrl: 'www.partner1.com',
  approvalStatus: ApprovalStatuses.APPROVED,
  projectTimeline: 2,
  contactPhoneNumber: '111-111-1111',
  twitterUrl: 'www.twitter.com/partner1',
  linkedInUrl: 'www.linkedin.com/partner1',
  facebookUrl: 'www.facebook.com/partner1',
  country: 'testCountry',
  province: 'testProvince',
  hubspotId: 'def456',
};

export const partner2Fixture: Partial<Partner> = {
  uuid: '11111111-2222-1111-1111-111111111112',
  name: 'test-partner-2',
  description: 'Test Description',
  logo: 'https://via.placeholder.com/150',
  contactEmail: 'test@example.com',
  websiteUrl: 'www.partner2.com',
  approvalStatus: ApprovalStatuses.APPROVED,
  hubspotId: 'abc123',
};

export const partner3Fixture: Partial<Partner> = {
  uuid: '11111111-3333-1111-1111-111111111112',
  name: 'test-partner-3',
  description: 'Mutation partner',
  logo: 'https://via.placeholder.com/150',
  contactEmail: 'test@example.com',
  websiteUrl: 'www.partner3.com',
  approvalStatus: ApprovalStatuses.APPROVED,
  hubspotId: 'def456',
};
