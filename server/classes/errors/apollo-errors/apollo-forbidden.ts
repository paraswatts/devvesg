import { ApolloError } from 'apollo-server-errors';

export const APOLLO_FORBIDDEN_CODE = 'FORBIDDEN_ERROR';
const APOLLO_FORBIDDEN_NAME = 'ApolloForbiddenError';

export class ApolloForbiddenError extends ApolloError {
  constructor(message: string = 'You are not allowed to do this') {
    super(message, APOLLO_FORBIDDEN_CODE);
    Object.setPrototypeOf(this, ApolloForbiddenError.prototype);
    Object.defineProperty(this, 'name', { value: APOLLO_FORBIDDEN_NAME });
  }
}
