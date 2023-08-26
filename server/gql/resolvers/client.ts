import { wrap } from '@mikro-orm/core';
import { combineResolvers, or } from 'apollo-resolvers';

import { getSignedUrl } from '../../config/s3';
import { MediaEntityTypes } from '../../interfaces';
import { CarbonFootprint, Client, ClientLocation, ClientType, Project, Vertical } from '../../entities';
import {
  CarbonFootprintModel,
  ClientLocationModel,
  ClientModel,
  ClientTypeModel,
  ProjectModel,
  VerticalModel,
} from '../../models';
import { PaginatedResource } from './interfaces';
import { isAdmin, isClient, ResolverFn } from './utils';
import { ApolloForbiddenError } from '../../classes/errors';

const resolveOne: ResolverFn<Client, { clientId: string }> = (_, { clientId }, { em, user }) => {
  if (user.type === 'client' && user.clientUuid !== clientId) {
    throw new ApolloForbiddenError();
  }
  return new ClientModel(em).fetch({ id: clientId });
};

const resolveVertical: ResolverFn<Vertical, any, Client> = (client, __, { em }) => {
  if (!client.vertical) {
    return null;
  }
  return new VerticalModel(em).fetch({ verticalId: client.vertical.uuid });
};

const resolveClientType: ResolverFn<ClientType, any, Client> = (client, __, { em }) => {
  if (!client.clientType) {
    return null;
  }
  return new ClientTypeModel(em).fetch({ clientTypeId: client.clientType.uuid });
};

const resolveSignedLogo: ResolverFn<string, any, Client> = (client) => {
  return getSignedUrl(client.logo, MediaEntityTypes.CLIENT, 'logo', client.mediaUuid);
};

const resolveSignedReport1: ResolverFn<string, any, Client> = (client) => {
  return getSignedUrl(client.report1, MediaEntityTypes.CLIENT, 'report1', client.mediaUuid);
};

const resolveSignedReport2: ResolverFn<string, any, Client> = (client) => {
  return getSignedUrl(client.report2, MediaEntityTypes.CLIENT, 'report2', client.mediaUuid);
};

const resolveAllProjects: ResolverFn<PaginatedResource<Project>, any, Client> = async (client, __, { em }) => {
  const items = await new ProjectModel(em).fetchAll({
    clientId: client.uuid,
    orderBy: [{ field: 'createdAt', direction: 'ASC' }],
  });
  return {
    items,
    pageInfo: {
      page: 0,
      pageSize: items.length,
      totalCount: items.length,
    },
  };
};

const resolveOneProject: ResolverFn<Project, { projectId: string }, Client> = (client, { projectId }, { em }) => {
  return new ProjectModel(em).fetch({ projectId, clientId: client.uuid });
};

const resolveAllLocations: ResolverFn<ClientLocation[], any, Client> = async (client, __, { em }) => {
  return new ClientLocationModel(em).fetchAll({ clientId: client.uuid });
};

const resolveLatestCarbonFootprint: ResolverFn<CarbonFootprint, { clientId: string }, Client> = async (
  client,
  { clientId },
  { em },
) => {
  const latestArray = await new CarbonFootprintModel(em).fetchLatestForClient({ clientId: client.uuid });
  if (latestArray.length === 0) {
    return null;
  } else {
    return latestArray[0];
  }
};

const resolveAllCarbonFootprints: ResolverFn<PaginatedResource<CarbonFootprint>, any, Client> = async (
  client,
  __,
  { em },
) => {
  const items = await new CarbonFootprintModel(em).fetchAll({
    clientId: client.uuid,
    orderBy: [{ field: 'createdAt', direction: 'DESC' }],
  });
  return {
    items,
    pageInfo: {
      page: 0,
      pageSize: items.length,
      totalCount: items.length,
    },
  };
};

const resolveClientFootprintCreate: ResolverFn<CarbonFootprint, { total: number; clientId: string }> = async (
  _,
  { total, clientId },
  { em, user },
) => {
  if (user.type === 'client' && user.clientUuid !== clientId) {
    throw new ApolloForbiddenError();
  }

  const carbonFootprint = wrap(new CarbonFootprint()).assign({ total, client: clientId }, { em });

  await em.persistAndFlush(carbonFootprint);

  return carbonFootprint;
};

const resolveClientFootprintDelete: ResolverFn<string, { carbonFootprintId: string; clientId: string }> = async (
  _,
  { carbonFootprintId, clientId },
  { em, user },
) => {
  if (user.type === 'client' && user.clientUuid !== clientId) {
    throw new ApolloForbiddenError();
  }

  const carbonFootprint = await new CarbonFootprintModel(em).fetch({ carbonFootprintId, clientId });

  await em.removeAndFlush(carbonFootprint);

  return carbonFootprint.uuid;
};

export const resolvers = {
  Query: {
    client: combineResolvers([or(isAdmin, isClient)])(resolveOne),
  },
  Client: {
    projects: resolveAllProjects,
    project: resolveOneProject,
    logo: resolveSignedLogo,
    vertical: resolveVertical,
    clientType: resolveClientType,
    locations: resolveAllLocations,
    footprints: resolveAllCarbonFootprints,
    latestFootprint: resolveLatestCarbonFootprint,
    report1: resolveSignedReport1,
    report2: resolveSignedReport2,
  },
  ClientInfo: {
    logo: resolveSignedLogo,
    locations: resolveAllLocations,
  },
  Mutation: {
    clientFootprintCreate: combineResolvers([or(isAdmin, isClient)])(resolveClientFootprintCreate),
    clientFootprintDelete: combineResolvers([or(isAdmin, isClient)])(resolveClientFootprintDelete),
  },
};
