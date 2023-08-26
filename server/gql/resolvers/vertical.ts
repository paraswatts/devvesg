import { Vertical } from '../../entities';
import { VerticalModel } from '../../models';
import { PaginatedResource } from './interfaces';
import { ResolverFn } from './utils';

const resolveAll: ResolverFn<PaginatedResource<Vertical>> = async (_, __, { em }) => {
  const items = await new VerticalModel(em).fetchAll();

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
    verticals: resolveAll,
  },
  Mutation: {},
};
