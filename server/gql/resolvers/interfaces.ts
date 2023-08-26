import { GqlPaginationInfo } from '../types';

export interface PaginatedResource<T> {
  items: T[];
  pageInfo: GqlPaginationInfo;
}
