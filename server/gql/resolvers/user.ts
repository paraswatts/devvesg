import { UserModel } from '../../models';
import { isAuthenticatedResolver, ResolverFn } from './utils';
import { ApolloForbiddenError, ApolloNotFoundError } from '../../classes/errors';

const resolveUserDeactivate: ResolverFn<null, { id: string }> = async (_, { id }, { em, user }) => {
  if (id != user.uuid) throw new ApolloForbiddenError();

  const userToDelete = await new UserModel(em).fetch({ userId: user.uuid });

  if (userToDelete == null) throw new ApolloNotFoundError(null, []);

  try {
    await em.removeAndFlush(userToDelete);
    return null;
  } catch (e) {
    // TODO: Make a "Couldn't delete the user" error
    throw new Error();
  }
};

export const resolvers = {
  Query: {},
  Mutation: {
    userDeactivate: isAuthenticatedResolver.createResolver(resolveUserDeactivate),
  },
};
