import { Requirement, RequirementStatuses } from '../../entities';

export const requirement1Fixture: Partial<Requirement> = {
  uuid: '15555555-5555-5555-5555-555555555551',
  name: 'requirement-1',
  description: 'requirement-1 description',
  startDate: new Date('04-24-2022'),
  endDate: new Date('04-24-2022'),
  projectCode: '123',
  areaCode: '456',
  status: RequirementStatuses.DONE,
};

export const requirement2Fixture: Partial<Requirement> = {
  uuid: '15555555-5555-5555-5555-555555555552',
  name: 'requirement-2',
  description: 'requirement-2 description',
  startDate: new Date('04-25-2022'),
  endDate: new Date('04-25-2022'),
  projectCode: '123',
  areaCode: '456',
  hubspotDealId: 'mock-id',
  status: RequirementStatuses.IN_PROGRESS,
};

export const requirement3Fixture: Partial<Requirement> = {
  uuid: '15555555-5555-5555-5555-555555555553',
  name: 'requirement-3',
  description: 'requirement-3 description',
  startDate: new Date('04-26-2022'),
  endDate: new Date('04-26-2022'),
  projectCode: '789',
  areaCode: '012',
  status: RequirementStatuses.ON_HOLD,
};

export const requirement4Fixture: Partial<Requirement> = {
  uuid: '15555555-5555-5555-5555-555555555554',
  name: 'requirement-4',
  description: 'requirement-4 description',
  startDate: new Date('04-27-2022'),
  endDate: new Date('04-27-2022'),
  projectCode: '345',
  areaCode: '678',
  status: RequirementStatuses.DONE,
};

export const requirement5Fixture: Partial<Requirement> = {
  uuid: '15555555-5555-5555-5555-555555555555',
  name: 'requirement-5',
  description: 'requirement-5 description',
  startDate: new Date('04-26-2022'),
  endDate: new Date('04-26-2022'),
  projectCode: '789',
  areaCode: '012',
  status: RequirementStatuses.ON_HOLD,
};

export const requirement6Fixture: Partial<Requirement> = {
  uuid: '15555555-5555-5555-5555-555555555556',
  name: 'requirement-6',
  description: 'requirement-6 description',
  startDate: new Date('04-27-2022'),
  endDate: new Date('04-27-2022'),
  projectCode: '345',
  areaCode: '678',
  status: RequirementStatuses.DONE,
};

export const requirementFixtures = [
  requirement1Fixture,
  requirement2Fixture,
  requirement3Fixture,
  requirement4Fixture,
  requirement5Fixture,
  requirement6Fixture,
];
