import { Client } from '../../entities';

export const client1Fixture: Partial<Client> = {
  uuid: '11111111-1111-1111-1111-111111111111',
  name: 'test-client-1',
  description: 'Test Description',
  logo: 'https://via.placeholder.com/150',
  contactEmail: 'testclient@example.com',
  websiteUrl: 'www.testclient.com',
  contactPhoneNumber: '123-123-1234',
  twitterUrl: 'www.twitter.com',
  linkedInUrl: 'www.linkedin.com',
  stockTicker: 'TST',
  report1: 'https://via.placeholder.com/150',
  report2: 'https://via.placeholder.com/150',
};

export const client2Fixture: Partial<Client> = {
  uuid: '11111111-2222-1111-1111-111111111111',
  name: 'test-client-2',
  contactEmail: 'testclient2@example.com',
  description: 'Test Client 2 Description',
  logo: 'https://via.placeholder.com/150',
  hubspotId: 'def456',
};
