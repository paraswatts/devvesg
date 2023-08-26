import { Initiative, ProjectType, RequirementType } from '../../entities';
import { InitiativeModel, ProjectTypeModel, RequirementTypeModel } from '../../models';
import { PaginatedResource } from './interfaces';
import { isAuthenticatedResolver, ResolverFn } from './utils';
import { getSignedUrl } from '../../config/s3';
import { MediaEntityTypes } from '../../interfaces';

const resolveAllInitiatives: ResolverFn<PaginatedResource<Initiative>> = async (_, __, { em }) => {
  const initiatives = await new InitiativeModel(em).fetchAll();

  return {
    items: initiatives,
    pageInfo: {
      page: 0,
      pageSize: initiatives.length,
      totalCount: initiatives.length,
    },
  };
};

const resolveOneInitiative: ResolverFn<Initiative, { initiativeId: string }> = (_, { initiativeId }, { em }) => {
  return new InitiativeModel(em).fetch({ initiativeId });
};

const resolveAllProjectTypes: ResolverFn<ProjectType[], any, Initiative> = (parent, __, { em }) => {
  return new ProjectTypeModel(em).fetchAll({ initiativeId: parent.uuid });
};

const resolveAllRequirementTypes: ResolverFn<RequirementType[], any, ProjectType> = (parent, __, { em }) => {
  return new RequirementTypeModel(em).fetchAll({ projectTypeId: parent.uuid });
};

const resolveSignedLogo: ResolverFn<string, any, Initiative> = (initiative) => {
  return getSignedUrl(initiative.logo, MediaEntityTypes.INITIATIVE, 'logo', initiative.mediaUuid);
};

const resolveSignedOnboardingLogo: ResolverFn<string, any, Initiative> = (initiative) => {
  return getSignedUrl(initiative.onboardingLogo, MediaEntityTypes.INITIATIVE, 'onboardingLogo', initiative.mediaUuid);
};

export const resolvers = {
  Query: {
    initiatives: resolveAllInitiatives,
    initiative: isAuthenticatedResolver.createResolver(resolveOneInitiative),
  },
  Mutation: {},
  Initiative: {
    logo: resolveSignedLogo,
    onboardingLogo: resolveSignedOnboardingLogo,
    projectTypes: resolveAllProjectTypes,
  },
  ProjectType: {
    requirementTypes: resolveAllRequirementTypes,
  },
};
