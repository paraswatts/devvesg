import { EntityManager } from '@mikro-orm/core';
import { createResolver } from 'apollo-resolvers';

import { PassportUser } from '../../config/passport';
import { UserTypes } from '../../entities';
import { ApolloAuthenticationError, ApolloForbiddenError } from '../../classes/errors';

interface DefaultContext {
  user: PassportUser;
  em: EntityManager;
}

export type ResolverFn<Response = any, Args = any, Parent = void, Context = DefaultContext> = (
  parent: Parent,
  args: Args,
  ctx: Context,
  info: any,
) => Promise<Response> | Response;

const isAuthenticated: ResolverFn = (_, __, { user }) => {
  // Extract the user from context (undefined if non-existent)
  if (!user) throw new ApolloAuthenticationError();
};
export const isAuthenticatedResolver = createResolver(isAuthenticated);

const isAdminResolver: ResolverFn = (_, __, { user }) => {
  /*
  If thrown, this error will bubble up to baseResolver's
  error callback (if present).  If unhandled, the error is returned to
  the client within the `errors` array in the response.
  */
  if (user.type !== UserTypes.ADMIN) {
    throw new ApolloForbiddenError();
  }
  /*
 Since we aren't returning anything from the
 request resolver, the request will continue on
 to the next child resolver or the response will
 return undefined if no child exists.
 */
};
export const isAdmin = isAuthenticatedResolver.createResolver(isAdminResolver);

const isPartnerResolver: ResolverFn = (_, __, { user }) => {
  if (user.type !== UserTypes.PARTNER) {
    throw new ApolloForbiddenError();
  }
};
export const isPartner = isAuthenticatedResolver.createResolver(isPartnerResolver);

const isClientResolver: ResolverFn = (_, __, { user }) => {
  if (user.type !== UserTypes.CLIENT) {
    throw new ApolloForbiddenError();
  }
};
export const isClient = isAuthenticatedResolver.createResolver(isClientResolver);

export const isTypeInPath = (path: any, typename: string): boolean => {
  let inPath = false;
  while (!inPath && path !== undefined) {
    if (path.typename === typename) {
      inPath = true;
    } else {
      path = path.prev;
    }
  }
  return inPath;
};
