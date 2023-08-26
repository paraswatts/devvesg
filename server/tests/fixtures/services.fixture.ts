import { Service } from '../../entities';

export const service1Fixture: Partial<Service> = {
  uuid: 'e1111111-1111-1111-1111-111111111111',
  name: 'service-1',
};

export const service2Fixture: Partial<Service> = {
  uuid: 'e1111111-1111-1111-1111-111111111112',
  name: 'service-2',
};

export const service3Fixture: Partial<Service> = {
  uuid: 'e1111111-1111-1111-1111-111111111113',
  name: 'service-3',
};

export const service4Fixture: Partial<Service> = {
  uuid: 'e1111111-1111-1111-1111-111111111114',
  name: 'service-4',
};

export const serviceFixtures = [service1Fixture, service2Fixture, service3Fixture, service4Fixture];
