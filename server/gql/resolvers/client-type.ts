import { ClientType } from '../../entities';
import { ClientTypeModel } from '../../models';
import { isAuthenticatedResolver, ResolverFn } from './utils';

const resolveAllClientTypes: ResolverFn<ClientType[]> = async (_, __, { em }) => {
  return new ClientTypeModel(em).fetchAll({ orderBy: [{ field: 'name', direction: 'ASC' }] });
};

const resolveOneClientType: ResolverFn<ClientType, { clientTypeId: string }> = (_, { clientTypeId }, { em }) => {
  return new ClientTypeModel(em).fetch({ clientTypeId });
};

export const resolvers = {
  Query: {
    clientTypes: resolveAllClientTypes,
    clientType: isAuthenticatedResolver.createResolver(resolveOneClientType),
  },
};
