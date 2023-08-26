import { PartnerLocation } from '../../entities';

export const partnerLocation1Fixture: Partial<PartnerLocation> = {
  uuid: '11111111-3333-1111-1111-111111111111',
  country: 'partner-country-1',
  province: 'partner-province-1',
};

export const partnerLocation2Fixture: Partial<PartnerLocation> = {
  uuid: '11111111-3333-1111-1111-111111111112',
  country: 'partner-country-2',
  province: 'partner-province-2',
};

export const partnerLocationFixtures = [partnerLocation1Fixture, partnerLocation2Fixture];
