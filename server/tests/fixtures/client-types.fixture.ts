import { ClientType } from '../../entities';

export const clientType1Fixture: Partial<ClientType> = {
  uuid: 'c1111111-1111-1111-1111-111111111111',
  name: 'client-type-1',
};

export const clientType2Fixture: Partial<ClientType> = {
  uuid: 'c1111111-1111-1111-1111-111111111112',
  name: 'client-type-2',
};

export const clientType3Fixture: Partial<ClientType> = {
  uuid: 'c1111111-1111-1111-1111-111111111113',
  name: 'client-type-3',
};

export const clientTypeFixtures = [clientType1Fixture, clientType2Fixture, clientType3Fixture];
