import { ClientLocation } from '../../entities';

export const clientLocation1Fixture: Partial<ClientLocation> = {
  uuid: 'dd111111-1111-1111-1111-111111111111',
  country: 'country-1',
  province: 'province-1',
};

export const clientLocation2Fixture: Partial<ClientLocation> = {
  uuid: 'dd111111-1111-1111-1111-111111111112',
  country: 'country-2',
  province: 'province-2',
};

export const clientLocationFixtures = [clientLocation1Fixture, clientLocation2Fixture];
