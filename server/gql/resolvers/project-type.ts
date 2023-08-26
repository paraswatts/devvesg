import { ProjectType, RequirementType } from '../../entities';
import { isAuthenticatedResolver, ResolverFn } from './utils';
import { ProjectTypeModel, RequirementTypeModel } from '../../models';
import { getSignedUrl } from '../../config/s3';
import { MediaEntityTypes } from '../../interfaces';

const resolveOneProjectType: ResolverFn<ProjectType, { projectTypeId: string }> = (_, { projectTypeId }, { em }) => {
  return new ProjectTypeModel(em).fetch({ projectTypeId });
};

const resolveAllRequirementTypes: ResolverFn<RequirementType[], any, ProjectType> = (parent, __, { em }) => {
  return new RequirementTypeModel(em).fetchAll({ projectTypeId: parent.uuid });
};

const resolveSignedLogo: ResolverFn<string, any, ProjectType> = (projectType) => {
  return getSignedUrl(projectType.logo, MediaEntityTypes.PROJECT_TYPE, 'logo', projectType.mediaUuid);
};

export const resolvers = {
  Query: {
    projectType: isAuthenticatedResolver.createResolver(resolveOneProjectType),
  },
  Mutation: {},
  ProjectType: {
    logo: resolveSignedLogo,
    requirementTypes: resolveAllRequirementTypes,
  },
};
