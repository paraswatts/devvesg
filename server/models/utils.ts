import { QueryOrderMap } from '@mikro-orm/core';

export interface ModelSortOrder {
  field: string;
  direction?: 'ASC' | 'DESC';
  nestedSort?: ModelSortOrder[];
}

export const modelSortOrderToQueryOrderMap = (orderParams: ModelSortOrder[] = []): QueryOrderMap => {
  const orderMap: QueryOrderMap = {};

  orderParams.forEach(({ field, direction, nestedSort }) => {
    if (direction) {
      orderMap[field] = direction;
    }
    if (nestedSort) {
      orderMap[field] = modelSortOrderToQueryOrderMap(nestedSort);
    }
  });

  return orderMap;
};
