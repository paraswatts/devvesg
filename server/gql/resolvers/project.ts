import { Client, Initiative, Project, ProjectType, Requirement } from '../../entities';
import { ClientModel, InitiativeModel, ProjectTypeModel, RequirementModel } from '../../models';
import { isTypeInPath, ResolverFn } from './utils';

const resolveProjectType: ResolverFn<ProjectType, any, Project> = (project, __, { em }) => {
  return new ProjectTypeModel(em).fetch({ projectTypeId: project.projectType.uuid });
};

const resolveInitiative: ResolverFn<Initiative, any, Project> = (project, __, { em }) => {
  return new InitiativeModel(em).fetch({ projectTypeId: project.projectType.uuid });
};

const resolveClient: ResolverFn<Client, any, Project> = (project, __, { em }, info) => {
  // We want to obfuscate the client when viewing through a RequirementRequest
  if (isTypeInPath(info.path, 'RequirementRequest')) {
    return null;
  }
  return new ClientModel(em).fetch({ id: project.client.uuid });
};

const resolveAllRequirements: ResolverFn<Requirement[], any, Project> = async (project, __, { em }) => {
  return new RequirementModel(em).fetchAll({
    projectId: project.uuid,
    orderBy: [
      { field: 'requirementType', nestedSort: [{ field: 'sortOrder', direction: 'ASC' }] },
      { field: 'name', direction: 'ASC' },
    ],
  });
};

const resolveOneRequirement: ResolverFn<Requirement, { requirementId: string }, Project> = (
  project,
  { requirementId },
  { em },
) => {
  return new RequirementModel(em).fetch({ projectId: project.uuid, requirementId });
};

export const resolvers = {
  Query: {},
  Project: {
    projectType: resolveProjectType,
    initiative: resolveInitiative,
    requirements: resolveAllRequirements,
    requirement: resolveOneRequirement,
  },
  ProjectForPartner: {
    projectType: resolveProjectType,
    initiative: resolveInitiative,
    client: resolveClient,
  },
  ProjectStatus: {
    DONE: 'done',
    IN_PROGRESS: 'inprogress',
    NOT_STARTED: 'notstarted',
    ON_HOLD: 'onhold',
  },
};
