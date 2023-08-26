import { combineResolvers } from 'apollo-resolvers';
import { resolvers as clientResolvers } from './client';
import { resolvers as clientTypeResolvers } from './client-type';
import { resolvers as initiativeResolvers } from './initiative';
import { resolvers as partnerResolvers } from './partner';
import { resolvers as projectResolvers } from './project';
import { resolvers as projectTypeResolvers } from './project-type';
import { resolvers as quizTypeResolvers } from './quiz';
import { resolvers as requirementDocumentResolvers } from './requirement-document';
import { resolvers as requirementResolvers } from './requirement';
import { resolvers as serviceResolvers } from './service';
import { resolvers as userResolvers } from './user';
import { resolvers as verticalResolvers } from './vertical';

export const resolvers = combineResolvers([
  clientResolvers,
  clientTypeResolvers,
  initiativeResolvers,
  partnerResolvers,
  projectResolvers,
  projectTypeResolvers,
  quizTypeResolvers,
  requirementDocumentResolvers,
  requirementResolvers,
  serviceResolvers,
  userResolvers,
  verticalResolvers,
]);
