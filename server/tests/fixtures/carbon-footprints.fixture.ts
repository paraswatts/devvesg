import { CarbonFootprint } from '../../entities';

export const carbonFootprint1Fixture: Partial<CarbonFootprint> = {
  uuid: 'ff111111-1111-1111-1111-111111111111',
  total: 1234.567,
  createdAt: new Date('04-24-2122'),
};

export const carbonFootprint2Fixture: Partial<CarbonFootprint> = {
  uuid: 'ff111111-1111-1111-1111-111111111112',
  createdAt: new Date('04-24-2021'),
  total: 8901.234,
};

export const carbonFootprint3Fixture: Partial<CarbonFootprint> = {
  uuid: 'ff111111-1111-1111-1111-111111111113',
  createdAt: new Date('05-24-2021'),
  total: 1000,
};

export const carbonFootprintFixtures = [carbonFootprint1Fixture, carbonFootprint2Fixture, carbonFootprint3Fixture];
