import { ProjectType } from '../../entities';

export const projectType1Fixture: Partial<ProjectType> = {
  uuid: '33333333-3333-3333-3333-333333333331',
  name: 'project-type-1',
  objective: 'objective',
  logo: 'https://via.placeholder.com/150',
};

export const projectType2Fixture: Partial<ProjectType> = {
  uuid: '33333333-3333-3333-3333-333333333332',
  name: 'project-type-2',
  objective: 'objective',
  logo: 'https://via.placeholder.com/150',
};

export const projectType3Fixture: Partial<ProjectType> = {
  uuid: '33333333-3333-3333-3333-333333333333',
  name: 'project-type-3',
  objective: 'objective',
  logo: 'https://via.placeholder.com/150',
};

export const projectType4Fixture: Partial<ProjectType> = {
  uuid: '33333333-3333-3333-3333-333333333334',
  name: 'project-type-4',
  objective: 'objective',
  logo: 'https://via.placeholder.com/150',
};

export const projectTypeFixtures = [projectType1Fixture, projectType2Fixture, projectType3Fixture, projectType4Fixture];
