import { Project, ProjectStatuses } from '../../entities';

export const project1Fixture: Partial<Project> = {
  uuid: '55555555-5555-5555-5555-555555555551',
  name: 'project-1',
  description: 'project-1 description',
  status: ProjectStatuses.ON_HOLD,
  startDate: new Date('04-24-2022'),
  endGoalDate: new Date('04-24-2022'),
  completionDate: new Date('04-24-2022'),
};

export const project2Fixture: Partial<Project> = {
  uuid: '55555555-5555-5555-5555-555555555552',
  name: 'project-2',
  description: 'project-2 description',
  status: ProjectStatuses.IN_PROGRESS,
  startDate: new Date('04-25-2022'),
  endGoalDate: new Date('04-25-2022'),
  completionDate: new Date('04-25-2022'),
};

export const project3Fixture: Partial<Project> = {
  uuid: '55555555-5555-5555-5555-555555555553',
  name: 'project-3',
  description: 'project-3 description',
  status: ProjectStatuses.DONE,
  startDate: new Date('04-26-2022'),
  endGoalDate: new Date('04-26-2022'),
  completionDate: new Date('04-26-2022'),
};

export const project4Fixture: Partial<Project> = {
  uuid: '55555555-5555-5555-5555-555555555554',
  name: 'project-4',
  description: 'project-4 description',
  status: ProjectStatuses.NOT_STARTED,
  startDate: new Date('04-27-2022'),
  endGoalDate: new Date('04-27-2022'),
  completionDate: new Date('04-27-2022'),
};

export const projectFixtures = [project1Fixture, project2Fixture, project3Fixture, project4Fixture];
