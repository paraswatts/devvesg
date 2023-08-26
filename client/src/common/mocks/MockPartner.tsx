import { Partner } from 'src/interfaces';

export const MockPartner: Partner = {
  uuid: 'mock-partner-uuid',
  name: 'Mock Partner',
  description: 'Mock partner description',
  logo: 'https://mockpartner.com/logo.png',
  contactEmail: 'info@mockpartner.com',
  websiteUrl: 'https://www.mockpartner.com',
  contactPhoneNumber: '555-555-5555',
  twitterUrl: 'https://twitter.com/MockPartner',
  facebookUrl: 'https://www.facebook.com/MockPartner',
  linkedInUrl: 'https://www.linkedin.com/company/12345',
  // @ts-ignore
  approvalStatus: 'Approved',
  services: [],
  users: [],
  requirements: [],
  hubspotId: '',
};
