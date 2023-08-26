import { Service } from '../../entities';
import { ServiceModel } from '../../models';
import { PaginatedResource } from './interfaces';
import { ResolverFn } from './utils';

const resolveAll: ResolverFn<PaginatedResource<Service>> = async (_, __, { em }) => {
  const items = await new ServiceModel(em).fetchAll({});

  return {
    items,
    pageInfo: {
      page: 0,
      pageSize: items.length,
      totalCount: items.length,
    },
  };
};

export const resolvers = {
  Query: {
    services: resolveAll,
  },
  Mutation: {},
};
