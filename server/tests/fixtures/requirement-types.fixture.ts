import { RequirementType } from '../../entities';

export const requirementType1Fixture: Partial<RequirementType> = {
  uuid: '44444444-4444-4444-4444-444444444441',
  name: 'requirement-type-1',
  description: 'description',
};

export const requirementType2Fixture: Partial<RequirementType> = {
  uuid: '44444444-4444-4444-4444-444444444442',
  name: 'requirement-type-2',
  description: 'description',
};

export const requirementType3Fixture: Partial<RequirementType> = {
  uuid: '44444444-4444-4444-4444-444444444443',
  name: 'requirement-type-3',
  description: 'description',
};

export const requirementType4Fixture: Partial<RequirementType> = {
  uuid: '44444444-4444-4444-4444-444444444444',
  name: 'requirement-type-4',
  description: 'description',
};

export const requirementTypeFixtures = [
  requirementType1Fixture,
  requirementType2Fixture,
  requirementType3Fixture,
  requirementType4Fixture,
];
