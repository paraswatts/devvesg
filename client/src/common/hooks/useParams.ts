import { useParams as useReactRouterParams } from 'react-router-dom';

// Router v6 changed all params to be possibly undefined.
// We wrap their implementation to avoid having to check undefined everywhere
export const useParams = <T>(): Readonly<T> => {
  return useReactRouterParams() as unknown as Readonly<T>;
};
